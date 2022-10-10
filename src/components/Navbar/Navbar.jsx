import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NetflixLogo from "../../assets/images/netflix-logo.png";
import { MdSearch } from "react-icons/md";
import "./navbar.scss";
import { useScrollY } from "../hooks";
// import styled from "styled-components";

export default function Navbar(props) {
  const [scrollY] = useScrollY();
  const [keywords, setKeywords] = useState("");
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    let keywords = e.target.value;
    setKeywords(keywords);
    keywords.length > 0
      ? navigate(`/search?keywords=${keywords.trim()}`)
      : navigate("/");
  };

  const handleClickSignIn = (e) => {
    navigate("/signin");
  };

  const handleClickSignUp = (e) => {
    navigate("/signup");
  };

  const goHome = () => {
    navigate("/");
    setKeywords("");
  };

  return (
    <div
      className="navigation"
      style={
        scrollY < 50
          ? { backgroundColor: "transparent" }
          : { backgroundColor: "var(--color-background)" }
      }
    >
      <div
        // style={navigate("/login") ? { display: "none" } : { display: "flex" }}
        className="navContainer"
      >
        <div className="navContainerLeft">
          <div className="logo" onClick={goHome}>
            <img src={NetflixLogo} alt="Netflix-logo" />
          </div>
          <div className="navSearch">
            <MdSearch className="iconSearch" />
            <input
              type="text"
              placeholder="Input title, genres, people,..."
              onChange={handleChangeInput}
              value={keywords}
            />
          </div>
        </div>
        <div className="navContainerRight">
          <div className="signIn">
            <h3 onClick={(e) => handleClickSignIn(e)}>Đăng Nhập</h3>
          </div>
          <div className="signUp">
            <h3 onClick={(e) => handleClickSignUp(e)}>Đăng Ký</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
