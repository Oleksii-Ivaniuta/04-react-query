import axios from "axios";
import { type TMDBHTTPResponse } from "../types/movie";

interface TMDBSearchParams {
    params: {
        query: string,
      },
    headers: {
        Authorization: string,
      },
}


export default async function fetchMovies(movieName: string): Promise<TMDBHTTPResponse> {
    const myToken = import.meta.env.VITE_TMDB_TOKEN;
    const TMDBSearchParams: TMDBSearchParams = {
        params: {
            query: movieName,
          },
        headers: {
            Authorization: `Bearer ${myToken}`,
          },
    }
    const response = await axios.get<TMDBHTTPResponse>(`https://api.themoviedb.org/3/search/movie`, TMDBSearchParams);
    console.log(response.data);
    
    return response.data;
}