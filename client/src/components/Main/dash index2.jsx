import { useEffect, useState, useRef } from "react";
import * as React from "react";

const { tableau } = window;
const InitDash2 = () => {
  var viz, containerDiv, url, options;
  containerDiv = document.getElementById("vizContainer");
  url =
    "https://public.tableau.com/views/ideaspark/Dashboard2?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link";
  options = {
    hideTabs: true,
    height: "140vh",
    width: "105vw",
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
};

export default InitDash2;
