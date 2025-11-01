"use client"

import Image from "next/image"
import Link from "next/link"

interface DirectorInfoProps {
  name: string
  bio: string
  image: string
  filmLink?: string
}

export function DirectorInfo({ name, bio, image, filmLink }: DirectorInfoProps) {
  return (
    <div className="py-12 border-y border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl animate-slide-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="flex justify-center md:justify-end">
          <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-2xl animate-float group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
            <div className="absolute inset-0 rounded-xl border-2 border-purple-400/50 group-hover:border-orange-400/50 transition-colors duration-300" />
          </div>
        </div>

        <div className="md:col-span-2 px-4 md:pr-8">
          {filmLink ? (
            <Link href={filmLink} target="_blank" rel="noopener noreferrer">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent hover:from-orange-300 hover:to-pink-300 transition-all duration-300 cursor-pointer">
                {name}
              </h2>
            </Link>
          ) : (
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              {name}
            </h2>
          )}
          <p className="text-foreground/90 leading-relaxed text-lg text-purple-100">{bio}</p>
        </div>
      </div>
    </div>
  )
}
