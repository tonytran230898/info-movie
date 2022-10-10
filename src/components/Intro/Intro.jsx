import React, { useState } from "react";
import ReactPlayer from "react-player";
import { VscMute, VscUnmute } from "react-icons/vsc";
// import Video from "../../assets/videos/spiderman.mp4";
import "./intro.scss";

export default function Intro(props) {
  const [isUnMute, setIsUnMute] = useState(true);
  return (
    <div className="introContainer">
      <ReactPlayer
        className="introVideo"
        playing={true}
        width="100%"
        height="100%"
        volume={1}
        muted={isUnMute}
        url="https://www.youtube.com/embed/iaD2f2O9wGk?controls=0&autoplay=1&loop=1"
        loop={true}
        controls={true}
      />

      <div className="infoIntro">
        <h1 className="titleIntro">Người Nhện: Vô Gia Cư</h1>
        <p className="overviewIntro">
          We started getting visitors… from every universe. Watch the official
          trailer for #SpiderManNoWayHome, exclusively in movie theaters
          December 17.
        </p>
      </div>
      {isUnMute ? (
        <VscMute
          className="btnVolume"
          onClick={() => setIsUnMute((prev) => !prev)}
        />
      ) : (
        <VscUnmute
          className="btnVolume"
          onClick={() => setIsUnMute((prev) => !prev)}
        />
      )}
      <div className="fadeBottom"></div>
    </div>
  );
}
