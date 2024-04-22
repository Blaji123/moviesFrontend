import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import api from "../../api/axiosConfig";
import { useState } from "react";

const Hero = ({ movies }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  const saveMovieInWatchList = async (imdbId, watch) => {
    try {
      const response = await api.post(`watchlist/${imdbId}/save`, watch, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  const saveMovie = async (imdbId, movie) => {
    const email = localStorage.getItem("userId");
    if (email === null) {
      setError("You must be logged in order to save movies");
    }
    const newWatch = { email: email, movies: movie };
    try {
      await saveMovieInWatchList(imdbId, newWatch);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="movie-carousel-container">
      {error && <div className="text text-danger">Error : {error}</div>}
      <Carousel>
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={{ "--img": `url(${movie.backdrops[0]})` }}
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className="movie-title">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                      <Link
                        to={`/Trailer/${movie.trailerLink.substring(
                          movie.trailerLink.length - 11
                        )}`}
                      >
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>
                      <div
                        className="play-button-icon-container"
                        onClick={() => saveMovie(movie.imdbId, movie)}
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="play-button-icon"
                        />
                      </div>
                      <div className="movie-review-button-container">
                        <Button
                          variant="info"
                          onClick={() => reviews(movie.imdbId)}
                        >
                          Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Hero;
