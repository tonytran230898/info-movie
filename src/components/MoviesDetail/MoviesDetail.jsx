import React from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { setMovieDetail } from "../store/actions";
import "./MoviesDetailModal.scss";

export default function MoviesDetail(props) {
  const { movie, showModal } = props;
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setMovieDetail(null));
  };
  return (
    <div className="MoviesDetailModal">
      <div
        className={`backdrop ${showModal ? "showBackdrop" : "hideBackdrop"}`}
        onClick={handleCloseModal}
      ></div>
      <div
        className={`modal ${showModal ? "showModal" : "hideModal"}`}
        style={
          movie
            ? {
                backgroundImage:
                  `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` ||
                  `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
                backgroundSize: "cover",
              }
            : {}
        }
      >
        <div className="container">
          <div className="movieInfo">
            <h1 className="movieTitle">
              {movie && (movie.title || movie.name)}
            </h1>
            <p className="statistical">
              <span className="rating">
                Rating: {movie && movie.vote_average * 10}%
              </span>
              <span className="popularity">
                Popularity: {movie && movie.popularity}
              </span>
            </p>
            <p className="releaseDate">
              Release date:
              {movie && moment(movie.release_date).format(" DD/MM/YYYY")}
            </p>
            <p className="runtime">Runtime: {movie && movie.runtiem}</p>
            <p className="overview" style={{}}>
              {movie && movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
