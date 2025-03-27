import React from 'react';

export default function CardFilm() {
  return (
    <div className="overflow-hidden">
      <img 
        src="./card-film.png" 
        alt="Film Card" 
        className="transition-transform duration-300 transform hover:scale-125 hover:brightness-110 hover:shadow-lg"
      />
    </div>
  );
}