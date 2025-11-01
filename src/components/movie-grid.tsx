"use client"

import { MovieCard } from './movie-card'
import { Movie } from '@/types/movie'

interface MovieGridProps {
  movies: Movie[]
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="py-12 animate-slide-in-up">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
        Рекомендуемые фильмы на неделю
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
