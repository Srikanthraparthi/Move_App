import React, { useState, useEffect } from 'react';

function WatchList({ watchList = [], handleRemoveFromWatchlist }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [genres, setGenres] = useState({}); // Initialize genres as an object
  const [currGenre, setCurrGenre] = useState('All Genres'); // Track current selected genre

  // Fetch genres from TMDB API
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/genre/movie/list?api_key=eb9536545fdb47fd3c8eee274b09d0e8'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Check if 'genres' exists in the response data
        if (data && data.genres) {
          const genreMap = data.genres.reduce((acc, genre) => {
            acc[genre.id] = genre.name;
            return acc;
          }, {});
          setGenres(genreMap); // Set the genres state to the genreMap
        } else {
          console.error('Genres data not found in response');
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Map genres to each movie based on their genre_ids
  const getGenresForMovie = (genreIds) => {
    return genreIds
      .map((id) => genres[id] || 'Unknown') // Get genre names from the genre IDs
      .join(', '); // Join genres by a comma
  };

  // Filter watchlist by search query and current genre
  const filteredWatchList = watchList.filter((movieObj) => {
    const movieTitle = movieObj.name || movieObj.title || '';
    const matchesSearch = movieTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = currGenre === 'All Genres' || movieObj.genre_ids.some(id => genres[id] === currGenre);

    return matchesSearch && matchesGenre;
  });

  const sortedWatchList = [...filteredWatchList].sort((a, b) => {
    if (sortOrder === 'asc') {
      return (a.vote_average || 0) - (b.vote_average || 0);
    } else if (sortOrder === 'desc') {
      return (b.vote_average || 0) - (a.vote_average || 0);
    }
    return 0;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const setSortingOrder = (order) => {
    setSortOrder(order);
  };

  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex justify-center flex-wrap m-4 gap-4">
        {/* Render genres dynamically */}
        <div
          onClick={() => handleFilter('All Genres')}
          className={`flex justify-center gap-4 h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center ${currGenre === 'All Genres' ? 'bg-blue-400' : 'bg-gray-400/50'} mx-4 cursor-pointer`}
        >
          All Genres
        </div>
        {Object.values(genres).map((genre, index) => (
          <div
            key={index}
            onClick={() => handleFilter(genre)}
            className={`flex justify-center gap-4 h-[3rem] w-[9rem] rounded-xl text-white font-bold items-center ${currGenre === genre ? 'bg-blue-400' : 'bg-gray-400/50'} mx-4 cursor-pointer`}
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="h-[2rem] w-[18rem] bg-gray-200 outline-none px-2"
          placeholder="Search for Movies"
        />
      </div>

      {/* Movie Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th>
                <div className="flex items-center justify-center gap-2">
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setSortingOrder('asc')}
                    title="Sort by Lowest Rating"
                  >
                    <i className="fa-solid fa-arrow-down"></i>
                  </button>
                  <span>Rating</span>
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => setSortingOrder('desc')}
                    title="Sort by Highest Rating"
                  >
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedWatchList && sortedWatchList.length > 0 ? (
              sortedWatchList.map((movieObj) => (
                <tr className="border-b-2" key={movieObj.id}>
                  <td className="flex items-center px-6 py-4">
                    <img
                      className="h-[8rem] w-[5rem] object-cover rounded-lg"
                      src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                      alt={movieObj.name || 'Movie Poster'}
                    />
                    <div className="mx-10 mb-4 mt-4">{movieObj.name || movieObj.title || 'N/A'}</div>
                  </td>
                  <td>{movieObj.vote_average || 'N/A'}</td>
                  <td>{movieObj.popularity || 'N/A'}</td>
                  <td>
                    {movieObj.genre_ids
                      ? getGenresForMovie(movieObj.genre_ids)
                      : 'N/A'}
                  </td>
                  <td
                    className="text-red-800 cursor-pointer hover:underline"
                    onClick={() => handleRemoveFromWatchlist(movieObj)}
                  >
                    Delete
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-gray-500 text-center py-4">
                  No movies in the watchlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
