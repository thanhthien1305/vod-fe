import { useRouter } from 'next/navigation';
import React from 'react';

interface FilmCardProps {
  film: any;
}

export default function CardFilm({ film }: FilmCardProps) {
  return (
    <div className="relative overflow-hidden cursor-pointer group w-fit">
      <img 
        src={film?.thumbNailsUrls} 
        alt="Film Card" 
        className="transition-transform duration-300 transform group-hover:scale-125 group-hover:brightness-110 group-hover:shadow-lg"
      />
      <div className="absolute text-bold-title2 font-bold bottom-0 left-0 w-full  bg-opacity-60 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
        {film?.title || 'Tên phim'}
      </div>
    </div>
  );
}
