import React from "react";
import { FaHotjar, FaStar, FaFighterJet } from "react-icons/fa";
import { MdTheaterComedy } from "react-icons/md";
import { SiNetflix } from "react-icons/si";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GiGhost, GiBandageRoll } from "react-icons/gi";
import "./menus.scss";
import MenuItem from "./MenuItem";

export default function Menus(props) {
  return (
    <div className="MenusPane">
      <MenuItem name="Netflix" Icon={SiNetflix} to="netflix" />
      <MenuItem name="Trending" Icon={FaHotjar} to="trending" />
      <MenuItem name="Top rate" Icon={FaStar} to="topRated" />
      <MenuItem name="Actions Movies" Icon={FaFighterJet} to="action" />
      <MenuItem name="Comedy Movies" Icon={MdTheaterComedy} to="comedy" />
      <MenuItem name="Horror Movies" Icon={GiGhost} to="horror" />
      <MenuItem name="Romance Movies" Icon={BsFillSuitHeartFill} to="romance" />
      <MenuItem name="Documentaries" Icon={GiBandageRoll} to="documentaries" />
    </div>
  );
}
