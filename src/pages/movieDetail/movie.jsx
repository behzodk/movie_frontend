import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import axios from 'axios';

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      getData();
    });
  
    const getData = () => {
      // Replace the URL with your own Django backend API endpoint
      const apiUrl = `https://behzod2006.pythonanywhere.com/movies/${id}/`;
  
      axios
        .get(apiUrl)
        .then((response) => {
            const data = response.data;
            setMovie(data);
        })
        .catch((error) => {
          console.error('Error fetching movie data:', error);
        });
    };

    return (
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={currentMovieDetail ? `https://behzod2006.pythonanywhere.com${currentMovieDetail.poster_image}` : ""} alt='movie_name' />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={currentMovieDetail ? `https://behzod2006.pythonanywhere.com${currentMovieDetail.backdrop_image}` : ""} alt='movie_name' />
                    </div>
                    <div className="information">
                    <div className="movie__name">{currentMovieDetail ? currentMovieDetail.title : ""}</div>
                        <div className="movie__tagline"><b>Tagline: </b>{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            <b>Rating: </b>{currentMovieDetail ? currentMovieDetail.rating: ""} <i className="fas fa-star" />
                        </div>  
                        <div className="movie__runtime"><b>Runtime: </b>{currentMovieDetail ? currentMovieDetail.runtime_minutes + " mins" : ""}</div>
                        <div className="movie__releaseDate"><b>Release Date: </b>{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__director"><b>Director: </b>{currentMovieDetail ? "Director: " + currentMovieDetail.director : ""}</div>
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.rating: ""} <i className="fas fa-star" />
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime_minutes + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__director">{currentMovieDetail ? "Director: " + currentMovieDetail.director : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ?
                                currentMovieDetail.genres.map(genre =>(
                                    <><span className="movie__genre">{genre}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.synopsis : ""}</div><br /><br />
                        <div className="synopsisText">Trailer</div>
                        <iframe width="560" height="315" src={currentMovieDetail ? currentMovieDetail.trailer : ""} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movie
