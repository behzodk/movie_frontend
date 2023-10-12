import React, { useEffect, useState } from "react"
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import axios from 'axios';

const Home = () => {
    const [movies, setMovies] = useState([]); // Initialize movies state as an empty array

    useEffect(() => {
        // Define a function to fetch a list of movies
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://behzod2006.pythonanywhere.com/movies/ten');
                const moviesData = response.data;
                // Update the movies state with the fetched data
                setMovies(moviesData);
                console.log('Fetched movies:', moviesData);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
        console.log(movies)
    });

    return (
        <>
            <div className="poster">
                <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        movies.map(movie => (
                            <Link key={movie.id} style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={movie ? movie.poster_image : ""} alt='movie_name' />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.rating :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.tagline : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
                <MovieList />
            </div>
        </>
    )
}

export default Home
