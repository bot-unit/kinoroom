"use client"

import Image from "next/image"
import Link from "next/link"
import { Movie } from '@/types/movie'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { getMovieWatchStatus, setMovieWatchStatus } from '@/services/watchedMoviesService'
import { LogIn } from 'lucide-react'

interface MovieCardProps {
  movie: Movie
  index: number
}

export function MovieCard({ movie, index }: MovieCardProps) {
  const { user, loading: authLoading } = useAuth()
  const [watchedState, setWatchedState] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  // Загрузка статуса просмотра из Firebase при монтировании (если авторизован)
  useEffect(() => {
    const loadWatchStatus = async () => {
      if (!user) {
        setInitialLoadDone(true)
        return
      }

      try {
        const status = await getMovieWatchStatus(user.uid, movie.id)
        setWatchedState(status?.watched || false)
      } catch (error) {
        console.error(`Ошибка загрузки статуса для фильма ${movie.id}:`, error)
      } finally {
        setInitialLoadDone(true)
      }
    }

    loadWatchStatus()
  }, [user, movie.id])

  const handleWatchedToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (loading || !user) return

    const newWatchedState = !watchedState
    setLoading(true)
    
    // Сначала обновляем UI для быстрого отклика
    setWatchedState(newWatchedState)

    try {
      await setMovieWatchStatus(user.uid, movie.id, newWatchedState, movie.title)
      console.log(`Фильм "${movie.title}" (ID: ${movie.id}) отмечен как ${newWatchedState ? 'просмотренный' : 'непросмотренный'}`)
    } catch (error) {
      console.error(`Ошибка сохранения статуса для фильма ${movie.id}:`, error)
      // В случае ошибки откатываем состояние
      setWatchedState(!newWatchedState)
    } finally {
      setLoading(false)
    }
  }

  // Показываем плейсхолдер кнопки входа, если не авторизован
  const showLoginPrompt = initialLoadDone && !user && !authLoading

  return (
    <div 
      className="relative"
      style={{
        animation: `slide-in-up 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      {/* Watch toggle button or login prompt */}
      {authLoading ? (
        <div className="absolute top-2 right-2 z-40 h-10 w-10 bg-gray-700/90 rounded-full animate-pulse" />
      ) : showLoginPrompt ? (
        <div
          className="absolute top-2 right-2 z-40 p-2 rounded-full backdrop-blur-sm shadow-lg bg-blue-500/90 text-white group cursor-help"
          title="Войдите, чтобы отмечать просмотренные фильмы"
        >
          <LogIn size={16} />
        </div>
      ) : (
        <button
          onClick={handleWatchedToggle}
          disabled={loading}
          className={`absolute top-2 right-2 z-40 p-1.5 rounded-full backdrop-blur-sm shadow-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
            loading 
              ? 'bg-blue-500/90 text-white'
              : watchedState 
                ? 'bg-green-500/90 text-white hover:bg-green-600/90' 
                : 'bg-gray-500/90 text-white hover:bg-gray-600/90'
          }`}
          title={loading ? 'Сохранение...' : watchedState ? 'Отметить как непросмотренный' : 'Отметить как просмотренный'}
        >
          {loading ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      )}

      <Link
        href={movie.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group cursor-pointer block"
      >
        <div className={`relative mb-3 aspect-2/3 overflow-hidden rounded-xl shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl ${
          watchedState ? 'opacity-75 saturate-50' : ''
        }`}>
          <div className="absolute inset-0 z-10 bg-linear-to-br from-purple-500 via-pink-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
          <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center z-20">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-lg">
              Смотреть
            </span>
          </div>
          <div className="absolute inset-0 z-30 rounded-xl border-2 border-purple-400/0 transition-all duration-300 group-hover:border-orange-400" />
        </div>
        <h3 className={`font-semibold text-sm line-clamp-2 transition-colors duration-300 ${
          watchedState 
            ? 'text-purple-300 group-hover:text-orange-200 line-through' 
            : 'text-purple-100 group-hover:text-orange-300'
        }`}>
          {movie.title}
        </h3>
        <p className={`text-xs transition-colors duration-300 ${
          watchedState 
            ? 'text-purple-500 group-hover:text-orange-300' 
            : 'text-purple-400 group-hover:text-orange-400'
        }`}>
          {movie.year}
        </p>
      </Link>
    </div>
  )
}