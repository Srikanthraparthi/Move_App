import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from 'axios';
import Pagination from './Pagination';

function Movies({ handleAddtoWatchlist, handleRemoveFromWatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=eb9536545fdb47fd3c8eee274b09d0e8&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
      });
  }, [pageNo]);

  const handlePageChange = (newPage) => {
    setPageNo(newPage);
  };

  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-5">
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.id} // Add a unique key
            movieObj={movieObj}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            handleAddtoWatchlist={handleAddtoWatchlist}
            handleRemoveFromWatchlist={handleRemoveFromWatchlist}
            watchList={watchlist} // Pass correct prop
          />
        ))}
      </div>
      <Pagination currentPage={pageNo} onPageChange={handlePageChange} />
    </div>
  );
}

export default Movies;
