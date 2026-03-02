import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface DirectorSelectorProps {
  directors: Array<{ id: number; name: string }>
  currentIndex: number
  previousUrl?: string
  nextUrl?: string
}

export function DirectorSelector({ directors, currentIndex, previousUrl, nextUrl }: DirectorSelectorProps) {
  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex === directors.length - 1

  return (
    <div className="relative py-12 animate-slide-in-down">
      <Button
        variant="outline"
        size="icon"
        disabled={isAtEnd}
        asChild={!isAtEnd && Boolean(nextUrl)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          isAtEnd
            ? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
            : "bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 border-purple-400 text-white hover:text-white hover:scale-110 hover:shadow-lg"
        }`}
      >
        {isAtEnd || !nextUrl ? (
          <span>
            <ChevronLeft className="h-5 w-5" />
          </span>
        ) : (
          <Link href={nextUrl} aria-label="Следующий режиссер">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
      </Button>

      <h1 className="px-12 text-center text-3xl xl:text-5xl font-bold text-balance bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-slide-in-up">
        {directors[currentIndex].name}
      </h1>

      <Button
        variant="outline"
        size="icon"
        disabled={isAtStart}
        asChild={!isAtStart && Boolean(previousUrl)}
        className={`absolute right-0 top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          isAtStart
            ? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
            : "bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 border-orange-400 text-white hover:text-white hover:scale-110 hover:shadow-lg"
        }`}
      >
        {isAtStart || !previousUrl ? (
          <span>
            <ChevronRight className="h-5 w-5" />
          </span>
        ) : (
          <Link href={previousUrl} aria-label="Предыдущий режиссер">
            <ChevronRight className="h-5 w-5" />
          </Link>
        )}
      </Button>
    </div>
  )
}
