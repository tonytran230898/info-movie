import React, { useEffect, useRef, useState } from "react";
import "./contents.scss";
import styled from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SmoothScroll } from "../../utils/index";
import { useViewport } from "../hooks";
import { useDispatch } from "react-redux";
import { setMovieDetail } from "../store/actions";

export default function MoviesRow(props) {
  const { movies, title, isNetflix, idSection } = props;
  const SliderRef = useRef();
  const movieRef = useRef();
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);
  const [windowWidth] = useViewport();

  const dispatch = useDispatch();

  const handleSetMovie = (movie) => {
    dispatch(setMovieDetail(movie));
  };

  const handleScrollRight = () => {
    const maxScrollLeft =
      SliderRef.current.scrollWidth - SliderRef.current.clientWidth;
    if (SliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothScroll(
        SliderRef.current,
        200,
        movieRef.current.clientWidth * 2,
        SliderRef.current.scrollLeft
      );
    }
  };

  const handleScrollLeft = () => {
    if (SliderRef.current.scrollLeft > 0) {
      SmoothScroll(
        SliderRef.current,
        200,
        -movieRef.current.clientWidth * 2,
        SliderRef.current.scrollLeft
      );
    }
  };

  useEffect(() => {
    if (isDrag) {
      if (dragMove < dragDown) handleScrollRight();
      if (dragMove > dragDown) handleScrollLeft();
    }
  }, [dragDown, dragMove, isDrag]);

  const onDragStart = (e) => {
    setIsDrag(true);
    setDragDown(e.screenX);
  };

  const onDragEnd = (e) => {
    setIsDrag(false);
  };

  const onDragEnter = (e) => {
    setDragMove(e.screenX);
  };

  return (
    <div className="moviesRowContainer" draggable="false" id={idSection}>
      <h1 className="titleContent">{title}</h1>
      <MoviesSlider
        draggable="true"
        className="moviesSlider"
        ref={SliderRef}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragEnter={onDragEnter}
        style={
          movies && movies.length > 0
            ? {
                gridTemplateColumns: `repeat(${movies.length},
            ${
              windowWidth > 1200
                ? "250px"
                : windowWidth > 992
                ? "200px"
                : windowWidth > 768
                ? "150px"
                : "100px"
            })`,
              }
            : {}
        }
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie, index) => {
            if (movie.poster_path && movie.backdrop_path !== null) {
              let imageUrl = isNetflix
                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                : `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
              return (
                <div
                  key={index}
                  className="moviesItem"
                  ref={movieRef}
                  draggable="false"
                  onClick={() => handleSetMovie(movie)}
                >
                  <img src={imageUrl} alt="" draggable="false" />
                  <div className="moviesName">{movie.title || movie.name}</div>
                </div>
              );
            }
          })}
      </MoviesSlider>
      <div
        className={`btnLeft ${isNetflix && "isNetflix"}`}
        onClick={handleScrollLeft}
      >
        <FiChevronLeft />
      </div>
      <div
        className={`btnRight ${isNetflix && "isNetflix"}`}
        onClick={handleScrollRight}
      >
        <FiChevronRight />
      </div>
    </div>
  );
}

const MoviesSlider = styled.div``;
