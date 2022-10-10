import React, { useEffect } from "react";
import MoviesRow from "./MoviesRow";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as ACTIONS from "../store/actions";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { animateScroll as scroll } from "react-scroll";
import { useScrollY } from "../hooks";

const ScrollToTop = () => {
  scroll.scrollToTop();
};

export default function Contents(props) {
  const dispatch = useDispatch();
  const [scrollY] = useScrollY();
  const {
    NetflixOriginals,
    TrendingMovies,
    TopRatedMovies,
    ActionMovies,
    ComedyMovies,
    HorrorMovies,
    RomanceMovies,
    Documentaries,
  } = useSelector((state) => state.infoMovies);

  useEffect(() => {
    dispatch(ACTIONS.getNetflixOriginals());
    dispatch(ACTIONS.getTrendingMovies());
    dispatch(ACTIONS.getTopRatedMovies());
    dispatch(ACTIONS.getActionMovies());
    dispatch(ACTIONS.getComedyMovies());
    dispatch(ACTIONS.getHorrorMovies());
    dispatch(ACTIONS.getRomanceMovies());
    dispatch(ACTIONS.getDocumentaries());
  }, [dispatch]);
  return (
    <div>
      <MoviesRow
        movies={NetflixOriginals}
        title="Netflix Originals"
        isNetflix={true}
        idSection="netflix"
      />
      <MoviesRow
        movies={TrendingMovies}
        title="Trending Movies"
        isNetflix={true}
        idSection="trending"
      />
      <MoviesRow
        movies={TopRatedMovies}
        title="Top Rated Movies"
        idSection="topRated"
      />
      <MoviesRow
        movies={ActionMovies}
        title="Action Movies"
        idSection="action"
      />
      <MoviesRow
        movies={ComedyMovies}
        title="Comedy Movies"
        idSection="comedy"
      />
      <MoviesRow
        movies={HorrorMovies}
        title="Horror Movies"
        idSection="horror"
      />
      <MoviesRow
        movies={RomanceMovies}
        title="Romance Movies"
        idSection="romance"
      />
      <MoviesRow
        movies={Documentaries}
        title="Documentaries"
        idSection="documentaries"
      />
      <div
        className="GoToTop"
        onClick={() => ScrollToTop()}
        style={{ visibility: `${scrollY > 600 ? "visible" : "hidden"}` }}
      >
        <BsFillArrowUpSquareFill />
      </div>
    </div>
  );
}
