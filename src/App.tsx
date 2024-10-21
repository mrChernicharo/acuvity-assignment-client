import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { INode, NodeInfo } from "./types";
import { DataBrowser } from "./DataBrowser";
import { Header } from "./Header";
import { Chart } from "./Chart";

function App() {
  const [nodeId, setNodeId] = useState(1);
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);

  const { data } = useQuery({
    queryKey: [`node-${nodeId}`],
    queryFn: () => fetch(`http://localhost:3333/node/${nodeId}`).then((res) => res.json()),
  });

  function onNodeClick(node: INode) {
    setNodeId(node.id);
  }

  useEffect(() => {
    if (nodeId && data?.payload) {
      const { node, relatedNodes } = data.payload;
      setNodeInfo({ node, relatedNodes });
    }
  }, [data, nodeId]);

  return (
    <div className="w-screen">
      <Header />

      <Chart data={data} onNodeClick={onNodeClick} />

      <DataBrowser nodeInfo={nodeInfo} selectNode={setNodeId} />
    </div>
  );
}

export default App;
