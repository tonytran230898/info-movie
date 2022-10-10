import Navbar from "../Navbar/Navbar";

import React from "react";
import { Outlet } from "react-router-dom";

export default function Layouts() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
