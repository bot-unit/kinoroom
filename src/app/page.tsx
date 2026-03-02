"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { getDirectorPath, getLatestDirector } from "@/lib/directors"

export default function HomePage() {
  const router = useRouter()
  const latestDirector = getLatestDirector()

  useEffect(() => {
    if (latestDirector) {
      router.replace(getDirectorPath(latestDirector))
    }
  }, [latestDirector, router])

  if (!latestDirector) {
    return null
  }

  const latestDirectorPath = getDirectorPath(latestDirector)

  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-center">
      <p>
        Переход к последней подборке…{" "}
        <Link href={latestDirectorPath} className="underline">
          открыть вручную
        </Link>
      </p>
    </main>
  )
}
