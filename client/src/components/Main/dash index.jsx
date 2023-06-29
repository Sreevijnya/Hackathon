import "./styles2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
const { tableau } = window;

const Main2 = () => {
  const handleLogout = () => {
    localStorage.removeItem("token1");
    window.location.reload();
  };

  const [open, setOpen] = React.useState(false);

  //

  const url = "https://<tableau-dashboard-url>/views/testing/map";
  const ref = useRef(null);
  console.log(ref);
  function initViz() {
    new tableau.Viz(ref.current, url);
  }
  useEffect(() => {
    initViz();
  }, []);

  function InitDash() {
    var viz, containerDiv, url, options;
    containerDiv = document.getElementById("vizContainer");
    url =
      "https://public.tableau.com/views/ideaspark/Dashboard2?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";
    options = {
      height: "150vh",
      width: "103vw",
      onFirstInteractive: function () {
        console.log("Run this code when the viz has finished loading.");
      },
      onFirstVizSizeKnown: function () {
        console.log("Viz Size Loaded");
      },
    };

    loadViz(containerDiv, url, options);

    function loadViz(containerDiv, url, options) {
      if (viz) {
        viz.dispose();
      }
      viz = new tableau.Viz(containerDiv, url, options);
    }
  }

  function InitDash2() {
    var viz, containerDiv, url, options;
    containerDiv = document.getElementById("vizContainer");
    url =
      "https://public.tableau.com/views/Hospital_Hackathon/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";
    options = {
      hideTabs: true,
      height: "100vh",
      width: "120vw",
      onFirstInteractive: function () {
        console.log("Run this code when the viz has finished loading.");
      },
      onFirstVizSizeKnown: function () {
        console.log("Viz Size Loaded");
      },
    };

    loadViz(containerDiv, url, options);

    function loadViz(containerDiv, url, options) {
      if (viz) {
        viz.dispose();
      }
      viz = new tableau.Viz(containerDiv, url, options);
    }
  }

  return (
    <div className="main_container">
      <nav className="navbar">
        <h1>Home</h1>
        <button className="white_btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div>
        <button>select</button>
        {InitDash}
      </div>
    </div>
  );
};

export default Main2;
