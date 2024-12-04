import React from 'react';

function Banner() {
  return (
    <>
      <div
        className="h-[40vh] md:h-[70vh] bg-cover bg-center flex items-end justify-center"
        style={{
          backgroundImage: 'url(https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg)',
        }}
      >
        <div className="text-white text-xl bg-gray-900/60 p-4 text-center w-full">
          Avengers Endgame
        </div>
      </div>
    </>
  );
}

export default Banner;
