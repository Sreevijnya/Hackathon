import { useEffect, useState, useRef } from "react";
import * as React from "react";

const { tableau } = window;
const InitDash = () => {
  var viz, containerDiv, url, options;
  containerDiv = document.getElementById("vizContainer");
  url =
    "https://public.tableau.com/views/Hospital_Hackathon/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";
  options = {
    hideTabs: true,
    height: "100vh",
    width: "100vw",
    onFirstInteractive: function () {
      console.log("Run this code when the viz has finished loading.");
    },
    onFirstVizSizeKnown: function () {
      console.log("Viz Size Loaded");
    },
  };

  const loadViz = (containerDiv, url, options) => {
    if (viz) {
      viz.dispose();
    }
    viz = new tableau.Viz(containerDiv, url, options);
  };
  loadViz(containerDiv, url, options);
  return <div>{InitDash()}</div>;
};

export default InitDash;
