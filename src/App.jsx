import './App.css';
import Movies from './components/Movies';
import Navbar from './components/Navbar';
import WatchList from './components/WatchList';
import Banner from './components/Banner'; // Importing Banner

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {
  // Load watchlist from localStorage on page load
  const loadWatchlist = () => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist'));
    return savedWatchlist || [];
  };

  const [watchlist, setWatchlist] = useState(loadWatchlist); // Initialize from localStorage

  // Function to add movie to the watchlist
  const handleAddtoWatchlist = (movieObj) => {
    const newWatchlist = [...watchlist, movieObj];
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist)); // Save to localStorage
  };

  // Function to remove movie from the watchlist
  const handleRemoveFromWatchlist = (movieObj) => {
    const filteredWatchlist = watchlist.filter((movie) => movie.id !== movieObj.id);
    setWatchlist(filteredWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(filteredWatchlist)); // Save to localStorage
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Banner /><Movies watchlist={watchlist} handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} /></>} />
          <Route path='/watchlist' element={<WatchList watchList={watchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
