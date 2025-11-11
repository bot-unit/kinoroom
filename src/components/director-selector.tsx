"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DirectorSelectorProps {
  directors: Array<{ id: number; name: string }>
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
}

export function DirectorSelector({ directors, currentIndex, onPrevious, onNext }: DirectorSelectorProps) {
  const isAtStart = currentIndex === 0
  const isAtEnd = currentIndex === directors.length - 1

  return (
    <div className="flex items-center justify-center gap-6 py-12 animate-slide-in-down">
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={isAtEnd}
        className={`rounded-full transition-all duration-300 ${
          isAtEnd
            ? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
            : "bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 border-purple-400 text-white hover:text-white hover:scale-110 hover:shadow-lg"
        }`}

      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      <h1 className="text-3xl xl:text-5xl font-bold text-balance bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-slide-in-up">
        {directors[currentIndex].name}
      </h1>

      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={isAtStart}
        className={`rounded-full transition-all duration-300 ${
          isAtStart
            ? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
            : "bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 border-orange-400 text-white hover:text-white hover:scale-110 hover:shadow-lg"
        }`}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
