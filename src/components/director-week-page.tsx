import { DirectorSelector } from "@/components/director-selector"
import { DirectorInfo } from "@/components/director-info"
import { LinksSection } from "@/components/links-section"
import { MovieGrid } from "@/components/movie-grid"
import { Director } from "@/types/director"

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

interface DirectorWeekPageProps {
  directors: Director[]
  currentIndex: number
  previousUrl?: string
  nextUrl?: string
}

export function DirectorWeekPage({ directors, currentIndex, previousUrl, nextUrl }: DirectorWeekPageProps) {
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
        <DirectorSelector
          directors={directors}
          currentIndex={currentIndex}
          previousUrl={previousUrl}
          nextUrl={nextUrl}
        />

        <DirectorInfo
          name={currentDirector.name}
          bio={currentDirector.bio}
          image={currentDirector.image}
          filmLink={currentDirector.filmLink}
        />

        <MovieGrid movies={currentDirector.films} />

        <LinksSection links={externalLinks} />

        <footer className="mt-12 pt-8 border-t border-purple-500/30 text-center text-sm">
          <p className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent font-semibold">
            © 2025 Еженедельный кинопросмотр. Все права защищены.
          </p>
        </footer>
      </div>
    </main>
  )
}
