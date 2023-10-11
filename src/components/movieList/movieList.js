import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"
import axios from 'axios';

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        const apiUrl = `https://behzod2006.pythonanywhere.com/movies/${type ? type : "popular"}`
        axios
        .get(apiUrl)
        .then((response) => {
          const data = response.data;
          setMovieList(data);
        })
        .catch((error) => {
          console.error('Error fetching movie data:', error);
        });
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList