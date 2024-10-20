import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";

import { categoryColors, drawChart } from "./Chart";
import { INode, NodeInfo } from "./types";
import { DataBrowser } from "./DataBrowser";

function App() {
  const [nodeId, setNodeId] = useState(1);
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { data } = useQuery({
    queryKey: [nodeId],
    queryFn: () => fetch(`http://localhost:3333/node/${nodeId}`).then((res) => res.json()),
  });

  function onNodeClick(node: INode) {
    setNodeId(node.id);
  }

  function handleDrawChart() {
    if (nodeId && data?.payload) {
      const { node, links, relatedNodes } = data.payload;
      drawChart("#canvas", { nodes: [node, ...relatedNodes], links }, node, onNodeClick);
    }
  }

  function onResize() {
    setWindowWidth(window.innerWidth);
    setTimeout(() => {
      handleDrawChart();
    }, 200);
  }

  useEffect(() => {
    if (nodeId && data?.payload) {
      const { node, relatedNodes } = data.payload;
      setNodeInfo({ node, relatedNodes });
    }
    handleDrawChart();
  }, [data, nodeId]);

  useEffect(() => {
    console.log(nodeId, data?.payload);

    window.addEventListener("resize", throttle(onResize, 400));
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [nodeId, data]);

  return (
    <div className="w-screen">
      <h1 className="text-center" style={{ color: categoryColors("0") }}>
        Acuvity
      </h1>

      <svg id="canvas" width={windowWidth} height={400} />

      <DataBrowser nodeInfo={nodeInfo} selectNode={setNodeId} />
    </div>
  );
}

export default App;
