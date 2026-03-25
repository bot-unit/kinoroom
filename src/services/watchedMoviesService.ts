import { db } from '@/lib/firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'

export interface WatchedMovie {
  movieId: number
  movieTitle: string
  watched: boolean
  watchedAt: Date | null
}

/**
 * Get all watched movies for a user
 */
export async function getUserWatchedMovies(userId: string): Promise<Map<number, WatchedMovie>> {
  const watchedRef = collection(db, 'users', userId, 'watchedMovies')
  const snapshot = await getDocs(watchedRef)

  const movies = new Map<number, WatchedMovie>()
  snapshot.forEach((movieDoc) => {
    const data = movieDoc.data()
    movies.set(Number(movieDoc.id), {
      movieId: Number(movieDoc.id),
      movieTitle: data.movieTitle,
      watched: data.watched,
      watchedAt: data.watchedAt?.toDate?.() || null,
    })
  })

  return movies
}

/**
 * Get watch status for a specific movie
 */
export async function getMovieWatchStatus(
  userId: string,
  movieId: number
): Promise<WatchedMovie | null> {
  const movieRef = doc(db, 'users', userId, 'watchedMovies', movieId.toString())
  const snapshot = await getDoc(movieRef)

  if (!snapshot.exists()) {
    return null
  }

  const data = snapshot.data()
  return {
    movieId,
    movieTitle: data.movieTitle,
    watched: data.watched,
    watchedAt: data.watchedAt?.toDate?.() || null,
  }
}

/**
 * Set watch status for a movie
 */
export async function setMovieWatchStatus(
  userId: string,
  movieId: number,
  watched: boolean,
  movieTitle: string
): Promise<void> {
  const movieRef = doc(db, 'users', userId, 'watchedMovies', movieId.toString())

  if (watched) {
    await setDoc(movieRef, {
      movieId,
      movieTitle,
      watched: true,
      watchedAt: new Date(),
    })
  } else {
    // Delete the document if unmarking as watched
    await deleteDoc(movieRef)
  }
}

/**
 * Clear all watched movies for a user
 */
export async function clearAllWatchedMovies(userId: string): Promise<void> {
  const watchedRef = collection(db, 'users', userId, 'watchedMovies')
  const snapshot = await getDocs(watchedRef)

  const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref))
  await Promise.all(deletePromises)
}
