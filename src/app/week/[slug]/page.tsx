import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DirectorWeekPage } from "@/components/director-week-page"
import { directors, getDirectorBySlug, getDirectorPath, getDirectorSlug } from "@/lib/directors"

interface DirectorWeekPageParams {
  slug: string
}

export function generateStaticParams(): DirectorWeekPageParams[] {
  return directors.map((director) => ({ slug: getDirectorSlug(director) }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<DirectorWeekPageParams>
}): Promise<Metadata> {
  const { slug } = await params
  const director = getDirectorBySlug(slug)

  if (!director) {
    return {
      title: "Неделя не найдена",
      description: "Такой подборки в истории нет.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const pagePath = getDirectorPath(director)
  const pageTitle = `${director.name}: фильмы на неделю`
  const filmsList = director.films.map((film) => film.title).join(", ")
  const pageDescription = `${director.bio} Подборка недели: ${filmsList}.`

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pagePath,
    },
    keywords: [
      director.name,
      ...director.films.map((film) => film.title),
      "фильмы на неделю",
      "что посмотреть",
      "подборка фильмов",
      "kinoroom",
    ],
    openGraph: {
      type: "article",
      url: pagePath,
      title: pageTitle,
      description: pageDescription,
      images: [
        {
          url: director.image,
          alt: director.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [director.image],
    },
  }
}

export default async function DirectorWeekSlugPage({
  params,
}: {
  params: Promise<DirectorWeekPageParams>
}) {
  const { slug } = await params
  const director = getDirectorBySlug(slug)

  if (!director) {
    notFound()
  }

  const currentIndex = directors.findIndex((item) => item.id === director.id)

  if (currentIndex === -1) {
    notFound()
  }

  const previousDirector = currentIndex > 0 ? directors[currentIndex - 1] : undefined
  const nextDirector = currentIndex < directors.length - 1 ? directors[currentIndex + 1] : undefined

  return (
    <DirectorWeekPage
      directors={directors}
      currentIndex={currentIndex}
      previousUrl={previousDirector ? getDirectorPath(previousDirector) : undefined}
      nextUrl={nextDirector ? getDirectorPath(nextDirector) : undefined}
    />
  )
}
