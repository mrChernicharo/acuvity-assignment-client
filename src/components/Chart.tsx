import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { drawChart, resetChart } from "../utils/chartFns";
import { ChartData, INode } from "../utils/types";

export function Chart({ data, onNodeClick }: { data: ChartData | null; onNodeClick: (node: INode) => void }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleDrawChart = useCallback(() => {
    if (data) {
      const { node, links, relatedNodes } = data;
      drawChart("#canvas", { nodes: [node, ...relatedNodes], links }, node, onNodeClick);
    }
  }, [data, drawChart, onNodeClick]);

  const onResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
    setTimeout(handleDrawChart, 200);
  }, [handleDrawChart]);

  useEffect(() => {
    handleDrawChart();
    return () => {
      resetChart("#canvas");
    };
  }, [data]);

  useEffect(() => {
    window.addEventListener("resize", debounce(onResize, 600));
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return <svg id="canvas" width={windowWidth} height={windowHeight - 336} />;
}
