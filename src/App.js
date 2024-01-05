import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './movieCard';

// 8961a6d5
const API_URL = 'http://www.omdbapi.com?apikey=8961a6d5';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();  
    setMovies(data.Search); 
  }

  const handleSearch = () =>{
    searchMovies(searchTerm);
  }
  const handleKeyDown = (e) =>{
    if (e.key === 'Enter'){
      handleSearch();
    }
  } 

  useEffect(() => {
    searchMovies('batman');
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={handleSearch}
        />
      </div>
      <div className="container">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;
