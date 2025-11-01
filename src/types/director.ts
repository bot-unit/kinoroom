import { Movie } from './movie'

export interface Director {
  id: number
  name: string
  image: string
  bio: string
  filmLink?: string
  films: Movie[]
}

export interface DirectorsData {
  directors: Director[]
}