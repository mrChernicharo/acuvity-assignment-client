import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { EntryCounts, INode, NodeInfo } from "./utils/types";
import { DataBrowser } from "./components/DataBrowser";
import { Header } from "./components/Header";
import { Chart } from "./components/Chart";
import { TotalCount } from "./components/TotalCount";

function App() {
  const [nodeId, setNodeId] = useState(1);
  const [nodeInfo, setNodeInfo] = useState<NodeInfo | null>(null);
  const [entryCounts, setEntryCounts] = useState<EntryCounts | null>(null);

  const { data } = useQuery({
    queryKey: [`node-${nodeId}`],
    queryFn: () => fetch(`http://localhost:3333/node/${nodeId}`).then((res) => res.json()),
  });

  function onNodeClick(node: INode) {
    setNodeId(node.id);
  }

  useEffect(() => {
    if (nodeId && data?.payload) {
      const { node, relatedNodes, nodeCount, edgeCount } = data.payload;
      setNodeInfo({ node, relatedNodes });
      if (!entryCounts) {
        setEntryCounts({ nodes: nodeCount, edges: edgeCount });
      }
    }
  }, [data, nodeId, entryCounts]);

  return (
    <div className="w-screen">
      <Header />

      <TotalCount entryCounts={entryCounts} />

      <Chart data={data?.payload} onNodeClick={onNodeClick} />

      <DataBrowser nodeInfo={nodeInfo} selectNode={setNodeId} />
    </div>
  );
}

export default App;
