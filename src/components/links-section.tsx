"use client"

import { ExternalLink } from "lucide-react"

interface Link {
  title: string
  description: string
  url: string
}

interface LinksSectionProps {
  links: Link[]
}

export function LinksSection({ links }: LinksSectionProps) {
  return (
    <div className="py-12 border-t border-purple-500/30 animate-slide-in-up">
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
        Больше фильмов
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            style={{
              animation: `slide-in-up 0.6s ease-out ${index * 0.1}s both`,
            }}
          >
            <div className="p-6 rounded-xl border-2 border-purple-500/30 hover:border-orange-400/100 bg-gradient-to-br from-purple-900/30 to-pink-900/30 hover:from-purple-900/50 hover:to-pink-900/50 transition-all duration-300 h-full flex flex-col justify-between hover:shadow-2xl hover:shadow-orange-500/20 group-hover:scale-105">
              <div>
                <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-pink-300 transition-all duration-300">
                  {link.title}
                </h3>
                <p className="text-sm text-purple-200 group-hover:text-purple-100 transition-colors duration-300">
                  {link.description}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-sm font-semibold">Перейти</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
