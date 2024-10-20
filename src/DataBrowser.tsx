import { NodeInfo } from "./types";

interface Props {
  nodeInfo: NodeInfo | null;
  selectNode: (id: number) => void;
}

export function DataBrowser({ nodeInfo, selectNode }: Props) {
  if (!nodeInfo) return null;

  const { node, relatedNodes } = nodeInfo;

  return (
    <div>
      <div>data browser</div>
      <div>id: {node.id}</div>
      <div>name: {node.name}</div>
      <div>category: {node.category}</div>

      {relatedNodes.map((n) => (
        <div key={n.id}>
          <button onClick={() => selectNode(n.id)}>{n.name}</button>
        </div>
      ))}
    </div>
  );
}
