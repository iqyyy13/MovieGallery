import axios from "axios";
import {apiKey, accessToken} from '../constants'

//endpoints
const apiBaseUrl = "https://api.themoviedb.org/3"
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated`

const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar`

export const image500 = path=> path? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path=> path? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path=> path? `https://image.tmdb.org/t/p/w185${path}` : null

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params? params: {},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  }

  try{
    const response = await axios.request(options)
    return response.data
  } catch(error) {
    console.log('error', error)
    return {}
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint)
}


export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint)
}

export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = id => {
  return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id => {
  return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = id => {
  return apiCall(similarMoviesEndpoint(id))
}
