import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function App() {
  const [nodeId, setNodeId] = useState(1);

  const { isPending, data: nodesData } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetch(`http://localhost:3333/node/${nodeId}`).then((res) => res.json()),
  });

  return (
    <div className="w-screen">
      <h1 className="text-emerald-500 text-center">Acuvity</h1>

      <pre>{isPending ? "Loading..." : JSON.stringify(nodesData.payload, null, 2)}</pre>
    </div>
  );
}

export default App;
