import "./styles2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Cookies from "universal-cookie";

const Sub = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const cookies = new Cookies();

  const [data, setData] = useState([]);
  const [id, setid] = useState([""]);
  const [fname, setFname] = useState([""]);
  const [lname, setLname] = useState([""]);
  const [email, setemail] = useState([""]);
  const [add, setAdd] = useState([""]);
  const [mob, setMob] = useState([""]);
  const [mk, setmark] = useState([""]);

  const toki = localStorage.getItem("token");
  useEffect(() => {}, []);

  return (
    <div className="main_container">
      <nav className="navbar">
        <h1>Home</h1>
        <button className="white_btn" onClick={handleLogout}>
          Logout
        </button>
        <div>hello</div>
      </nav>
    </div>
  );
};

export default Sub;
