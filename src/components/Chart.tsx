import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { drawChart, resetChart } from "../utils/chartFns";
import { ChartData, INode } from "../utils/types";

export function Chart({ data, onNodeClick }: { data: ChartData | null; onNodeClick: (node: INode) => void }) {
  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [chartHeight, setChartHeight] = useState(window.innerHeight - 335);

  const handleDrawChart = useCallback(() => {
    if (data) {
      const { node, links, relatedNodes } = data;
      drawChart("#canvas", { nodes: [node, ...relatedNodes], links }, node, onNodeClick);
    }
  }, [data, drawChart, onNodeClick]);

  const onResize = useCallback(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    setChartHeight(
      () =>
        window.innerHeight -
        ((getElementRect("#app-header")?.height || 57) + (getElementRect("#data-browser")?.height || 278))
    );

    setTimeout(handleDrawChart, 200);
  }, [handleDrawChart]);

  useEffect(() => {
    setTimeout(handleDrawChart, 200);
    return () => {
      resetChart("#canvas");
    };
  }, [data]);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", debounce(onResize, 600));
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return <svg id="canvas" width={windowDimensions.width} height={chartHeight} />;
}

const getElementRect = (selector: string) => document.querySelector(selector)?.getBoundingClientRect();
