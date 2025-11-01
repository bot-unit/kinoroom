"use client"

import { useState, useEffect } from "react"
import { DirectorSelector } from "@/components/director-selector"
import { DirectorInfo } from "@/components/director-info"
import { MovieGrid } from "@/components/movie-grid"
import { LinksSection } from "@/components/links-section"
import { Director, DirectorsData } from "@/types/director"

const externalLinks = [
  {
    title: "Кинопоиск",
    description: "Российская база данных кино с рецензиями и рейтингами",
    url: "https://www.kinopoisk.ru",
  },  
  {
    title: "IMDb",
    description: "Полная база данных фильмов и информация о режиссёрах",
    url: "https://www.imdb.com",
  },
  {
    title: "Rotten Tomatoes",
    description: "Критические оценки и рецензии на фильмы",
    url: "https://www.rottentomatoes.com",
  },
]

export default function Home() {
  const [directors, setDirectors] = useState<Director[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDirectors = async () => {
      try {
        const response = await fetch("/data/directors.json")
        const data: DirectorsData = await response.json()
        setDirectors(data.directors)
        if (data.directors.length > 0) {
          setCurrentIndex(data.directors.length - 1)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error loading directors:", error)
        setLoading(false)
      }
    }

    fetchDirectors()
  }, [])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? directors.length - 1 : prev - 1)) 
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === directors.length - 1 ? 0 : prev + 1))
  }

  if (loading || directors.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500/30 border-t-orange-400 mx-auto mb-6 shadow-lg shadow-orange-500/50"></div>
          <p className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            Загрузка данных...
          </p>
        </div>
      </div>
    )
  }

  const currentDirector = directors[currentIndex]

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {/* Section 1: Director Selector */}
        <DirectorSelector
          directors={directors}
          currentIndex={currentIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* Section 2: Director Info */}
        <DirectorInfo
          name={currentDirector.name}
          bio={currentDirector.bio}
          image={currentDirector.image}
          filmLink={currentDirector.filmLink}
        />

        {/* Section 3: Movie Grid */}
        <MovieGrid movies={currentDirector.films} />

        {/* Section 4: External Links */}
        <LinksSection links={externalLinks} />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-purple-500/30 text-center text-sm">
          <p className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent font-semibold">
            © 2025 Еженедельный кинопросмотр. Все права защищены.
          </p>
        </footer>
      </div>
    </main>
  )
}
