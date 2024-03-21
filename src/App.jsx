import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
        if (!response.ok) {
          throw new Error('Pokémon not found.');
        }
        const data = await response.json();
        setSearchResults([{ name: data.name, image: data.sprites.front_default }]);
        setError(null);
      } catch (error) {
        setError('An error occurred while fetching the Pokémon');
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchPokemon();
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchTerm} onChange={handleChange} placeholder='Search Pokémon' />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {searchResults.length > 0 && (
        <div className='results'>
          <h2>{searchResults[0].name}</h2>
          <img src={searchResults[0].image} alt={searchResults[0].name} />
        </div>
      )}
    </div>
  )



  // <></>
};

export default App;
