import React from 'react'
import { useEffect, useState } from 'react'

import MovieCard from './MovieCard'

import './App.css';


const API_URL= 'https://www.omdbapi.com?apikey=849b2afd'

const movie1= {
    "Title": "Shrek 2",
    "Year": "2004",
    "imdbID": "tt0298148",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMDJhMGRjN2QtNDUxYy00NGM3LThjNGQtMmZiZTRhNjM4YzUxL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [movies, setMovies] = useState([])

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search);
    }
    useEffect( () => {
        searchMovies('Shrek')
    }, []);
    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input 
                    placeholder = "Search Movies"
                    value={searchTerm}
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                />
                <button onClick={()=> {searchMovies(searchTerm)}}>Search</button>
            </div>
            { movies?.length>0  ?
                (<div className='container'>
                    { movies.map((movie) => (
                        <MovieCard movie={movie} />))}
                 </div>):(
                     <div className="empty">
                     <h2>No movies found</h2>
                   </div>
                )}
        </div>
    )
}

export default App;
