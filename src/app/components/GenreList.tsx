import Link from "next/link";
import { getGenres } from "@/lib/getGenres";

export const GenreList = async () => {
  const genres = await getGenres();

  return (
    <>
      {genres.map((genre: any) => (
        <Link
          key={genre.id}
          href={`/genre/${genre.id}`}
          className="px-3 py-1 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
        >
          {genre.name}
        </Link>
      ))}
    </>
  );
};
