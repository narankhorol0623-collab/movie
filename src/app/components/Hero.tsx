
import { nowPalying } from "../page";

import { CarouselComponent } from "./CarouselComponent";

const fetchfromNowPlayingMovieDB = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_TOKEN_KEY}`,
      },
    },
  );
  const data = await response.json();

  return data.results;
};
type Params = {
  movie: number;
};
export const Hero = async ({ movie }: Params) => {
  const nowPlayingMovie: nowPalying[] = await fetchfromNowPlayingMovieDB();
  return <CarouselComponent nowPlayingMovie={nowPlayingMovie} />;
};
