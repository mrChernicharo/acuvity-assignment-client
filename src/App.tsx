import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { chart } from "./Chart";

function App() {
  const [nodeId, setNodeId] = useState(1);
  // const [chartSvg, setChartSvg] = useState<SVGSVGElement | null>(null);

  const { isPending, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(`http://localhost:3333/node/${nodeId}`).then((res) => res.json()),
  });

  useEffect(() => {
    if (data?.payload) {
      const { node, links, relatedNodes } = data.payload;
      const nodes = [node, ...relatedNodes];

      const chartData = { nodes, links };
      console.log({ chartData });

      const chartSVG = chart({ nodes, links });

      if (chartSVG) {
        const canvas = document.querySelector("#canvas");
        if (canvas) {
          canvas.innerHTML = chartSVG;
        }
      }
      // setChartSvg(res);
    }
  }, [data]);

  return (
    <div className="w-screen">
      <h1 className="text-emerald-500 text-center">Acuvity</h1>

      {/* <pre>{isPending ? "Loading..." : JSON.stringify(data.payload, null, 2)}</pre> */}

      {/* <>{chartSvg}</> */}
      <svg id="canvas" />
    </div>
  );
}

export default App;
