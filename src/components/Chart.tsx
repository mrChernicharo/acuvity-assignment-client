import { debounce, throttle } from "lodash";
import { useState, useEffect } from "react";
import { drawChart, resetChart } from "../utils/chartFns";

export function Chart({ data, onNodeClick }: { data: any; onNodeClick: any }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  function handleDrawChart() {
    if (data) {
      const { node, links, relatedNodes } = data;
      // drawChart("#canvas", { nodes: [], links: [] }, node, onNodeClick);
      // setTimeout(() => {
      drawChart("#canvas", { nodes: [node, ...relatedNodes], links }, node, onNodeClick);
      // }, 200);
    }
  }

  function onResize() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    handleDrawChart();
  }

  useEffect(() => {
    handleDrawChart();
    return () => {
      resetChart("#canvas");
    };
  }, [data]);

  useEffect(() => {
    window.addEventListener("resize", debounce(onResize, 1200));
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <svg id="canvas" width={windowWidth} height={windowHeight - 336} />;
}
