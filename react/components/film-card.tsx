import { useRouter } from 'next/navigation';
import React from 'react';

interface FilmCardProps {
  film: any;
}
export default function CardFilm({ film}: FilmCardProps) {
  return (
    <div className="overflow-hidden cursor-pointer">
      <img 
        src={film?.thumbNailsUrls} 
        alt="Film Card" 
        className="transition-transform duration-300 transform hover:scale-125 hover:brightness-110 hover:shadow-lg"
      />
    </div>
  );
}