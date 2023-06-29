import "./styles2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import Adduser from "../add";

import { Link, useNavigate } from "react-router-dom";
const { tableau } = window;
const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token1");
    window.location.reload();
  };
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  return (
    <div className="main_container">
      <nav className="navbar">
        <h1>Home</h1>
        <button className="white_btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div>
        <button
          className="white_btn"
          style={{ marginLeft: "500px", marginTop: "10px" }}
          onClick={() => {
            navigate("dash2");
          }}
        >
          Emergency Room Info
        </button>
        <button
          className="white_btn"
          style={{ marginLeft: "120px", marginTop: "10px" }}
          onClick={() => {
            navigate("dash");
          }}
        >
          Doctor Info
        </button>
      </div>
    </div>
  );
};

export default Main;
