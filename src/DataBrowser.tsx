import { NodeInfo } from "./types";
import { categoryColors } from "./Chart";

interface Props {
  nodeInfo: NodeInfo | null;
  selectNode: (id: number) => void;
}

export function DataBrowser({ nodeInfo, selectNode }: Props) {
  if (!nodeInfo) return null;

  const { node, relatedNodes } = nodeInfo;

  return (
    <div className="flex flex-col items-center space-y-6">
      <div>CURRENT NODE</div>

      <div className="flex gap-4 p-6 rounded-lg" style={{ background: categoryColors(String(node.category)) }}>
        <div>name: {node.name}</div>
        <div>id: {node.id}</div>
        <div>category: {node.category}</div>
      </div>

      <div>Neighbors</div>
      <ul className="flex gap-2">
        {relatedNodes.map((n) => (
          <li key={n.id}>
            <button style={{ background: categoryColors(String(n.category)) }} onClick={() => selectNode(n.id)}>
              {n.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
