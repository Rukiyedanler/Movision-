// TMDB API wrapper functions

const TMDB_API_KEY = "44a3623f88e8e631f4368a5ce760fa57"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

// Image sizes: w92, w154, w185, w342, w500, w780, original
export const getImageUrl = (path: string | null, size = "w500") => {
  if (!path) return "/placeholder.svg?height=450&width=300"
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

// Fetch trending movies and TV shows
export async function getTrending(mediaType: "all" | "movie" | "tv" = "all", timeWindow: "day" | "week" = "week") {
  const response = await fetch(
    `${TMDB_BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${TMDB_API_KEY}&language=tr-TR`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch trending content")
  }

  return response.json()
}

// Fetch movie details
export async function getMovieDetails(movieId: number) {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=tr-TR&append_to_response=credits,videos,recommendations`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch movie details")
  }

  return response.json()
}

// Fetch TV show details
export async function getTvDetails(tvId: number) {
  const response = await fetch(
    `${TMDB_BASE_URL}/tv/${tvId}?api_key=${TMDB_API_KEY}&language=tr-TR&append_to_response=credits,videos,recommendations`,
  )

  if (!response.ok) {
    throw new Error("Failed to fetch TV show details")
  }

  return response.json()
}

// Search for movies and TV shows
export async function searchMulti(query: string, page = 1) {
  const response = await fetch(
    `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=tr-TR&query=${encodeURIComponent(query)}&page=${page}`,
  )

  if (!response.ok) {
    throw new Error("Failed to search")
  }

  return response.json()
}

// Get movie videos (trailers, teasers, etc.)
export async function getMovieVideos(movieId: number) {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=tr-TR`)

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos")
  }

  return response.json()
}

// Get TV show videos
export async function getTvVideos(tvId: number) {
  const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}/videos?api_key=${TMDB_API_KEY}&language=tr-TR`)

  if (!response.ok) {
    throw new Error("Failed to fetch TV videos")
  }

  return response.json()
}

// Get movie cast
export async function getMovieCredits(movieId: number) {
  const response = await fetch(`${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=tr-TR`)

  if (!response.ok) {
    throw new Error("Failed to fetch movie credits")
  }

  return response.json()
}

// Get TV show cast
export async function getTvCredits(tvId: number) {
  const response = await fetch(`${TMDB_BASE_URL}/tv/${tvId}/credits?api_key=${TMDB_API_KEY}&language=tr-TR`)

  if (!response.ok) {
    throw new Error("Failed to fetch TV credits")
  }

  return response.json()
}

// Format movie data for our app
export function formatMovieData(movie: any) {
  return {
    id: movie.id,
    title: movie.title,
    posterUrl: getImageUrl(movie.poster_path),
    backdropUrl: getImageUrl(movie.backdrop_path, "original"),
    releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A",
    director: movie.credits?.crew?.find((person: any) => person.job === "Director")?.name || "N/A",
    studio: movie.production_companies?.[0]?.name || "N/A",
    duration: movie.runtime ? `${movie.runtime} dakika` : "N/A",
    rating: movie.vote_average?.toFixed(1) || "N/A",
    description: movie.overview || "Açıklama bulunamadı.",
    trailerUrl:
      movie.videos?.results?.find((video: any) => video.type === "Trailer" && video.site === "YouTube")?.key || null,
    cast:
      movie.credits?.cast?.slice(0, 8).map((actor: any) => ({
        name: actor.name,
        character: actor.character,
        imageUrl: getImageUrl(actor.profile_path, "w185"),
      })) || [],
  }
}

// Format TV show data for our app
export function formatTvData(tv: any) {
  return {
    id: tv.id,
    title: tv.name,
    posterUrl: getImageUrl(tv.poster_path),
    backdropUrl: getImageUrl(tv.backdrop_path, "original"),
    releaseYear: tv.first_air_date ? new Date(tv.first_air_date).getFullYear() : "N/A",
    creator: tv.created_by?.[0]?.name || "N/A",
    studio: tv.networks?.[0]?.name || "N/A",
    seasons: tv.number_of_seasons || "N/A",
    episodes: tv.number_of_episodes || "N/A",
    rating: tv.vote_average?.toFixed(1) || "N/A",
    description: tv.overview || "Açıklama bulunamadı.",
    trailerUrl:
      tv.videos?.results?.find((video: any) => video.type === "Trailer" && video.site === "YouTube")?.key || null,
    cast:
      tv.credits?.cast?.slice(0, 8).map((actor: any) => ({
        name: actor.name,
        character: actor.character,
        imageUrl: getImageUrl(actor.profile_path, "w185"),
      })) || [],
  }
}

// Format search results
export function formatSearchResult(item: any) {
  if (item.media_type === "movie") {
    return {
      id: item.id,
      title: item.title,
      posterUrl: getImageUrl(item.poster_path),
      releaseYear: item.release_date ? new Date(item.release_date).getFullYear() : "N/A",
      type: "movie",
      rating: item.vote_average?.toFixed(1) || "N/A",
    }
  } else if (item.media_type === "tv") {
    return {
      id: item.id,
      title: item.name,
      posterUrl: getImageUrl(item.poster_path),
      releaseYear: item.first_air_date ? new Date(item.first_air_date).getFullYear() : "N/A",
      type: "tv",
      rating: item.vote_average?.toFixed(1) || "N/A",
    }
  }
  return null
}
