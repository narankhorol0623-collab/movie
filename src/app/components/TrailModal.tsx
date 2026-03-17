"use client";
import Link from "next/link";
import { Movie } from "../page";

type Props = {
  youtubeKey: string;
  onClose: () => void;
  movieId: number;

};

export const TrailerModal = ({ youtubeKey, onClose, movieId }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-lg cursor-pointer"
        >
          ✕
        </button>
       

        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeKey}`}
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  );
};
