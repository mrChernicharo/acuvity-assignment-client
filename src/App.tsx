import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { categoryColors, drawChart, resetChart } from "./Chart";
import { INode, NodeInfo } from "./types";
import { DataBrowser } from "./DataBrowser";

function App() {
  const [nodeId, setNodeId] = useState(1);
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

  const { data } = useQuery({
    queryKey: [nodeId],
    queryFn: () => fetch(`http://localhost:3333/node/${nodeId}`).then((res) => res.json()),
  });

  function onNodeClick(node: INode) {
    setNodeId(node.id);
  }

  useEffect(() => {
    if (nodeId && data?.payload) {
      const { node, links, relatedNodes } = data.payload;
      setNodeInfo({ node, relatedNodes });
      drawChart("#canvas", { nodes: [node, ...relatedNodes], links }, node, onNodeClick);
    }

    return () => {
      resetChart("#canvas");
    };
  }, [data, nodeId]);

  useEffect(() => {
    console.log(nodeId, data?.payload);
  }, [nodeId, data]);

  return (
    <div className="w-screen">
      <h1 className="text-center" style={{ color: categoryColors("0") }}>
        Acuvity
      </h1>

      <svg id="canvas" width={600} height={400} />

      <DataBrowser nodeInfo={nodeInfo} selectNode={setNodeId} />
    </div>
  );
}

export default App;
