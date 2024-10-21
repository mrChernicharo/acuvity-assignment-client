import { throttle } from "lodash";
import { useState, useEffect } from "react";
import { drawChart } from "./chartFns";

export function Chart({ data, onNodeClick }: { data: any; onNodeClick: any }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  function handleDrawChart() {
    if (data?.payload) {
      const { node, links, relatedNodes } = data.payload;
      drawChart("#canvas", { nodes: [node, ...relatedNodes], links }, node, onNodeClick);
    }
  }

  function onResize() {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    setTimeout(() => {
      handleDrawChart();
    }, 200);
  }

  useEffect(() => {
    handleDrawChart();
  }, [data]);

  useEffect(() => {
    window.addEventListener("resize", throttle(onResize, 400));
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <svg id="canvas" width={windowWidth} height={windowHeight - 368} />;
}
