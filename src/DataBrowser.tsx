import { NodeInfo } from "./types";
import { categoryColors } from "./chartFns";

interface Props {
  nodeInfo: NodeInfo | null;
  selectNode: (id: number) => void;
}

export function DataBrowser({ nodeInfo, selectNode }: Props) {
  if (!nodeInfo) return null;

  const { node, relatedNodes } = nodeInfo;

  return (
    <div className="fixed bottom-0 pt-2 w-screen border-t border-gray-500">
      <div className="flex flex-col items-center space-y-6 px-6">
        <div>
          {/* <span>CURRENT NODE</span>&nbsp;&nbsp;
          <span className="font-bold" style={{ color: categoryColors(String(node.category)) }}>
            {node.name}
          </span> */}
        </div>

        <div className="flex gap-4 p-6 rounded-lg" style={{ background: categoryColors(String(node.category)) }}>
          <div>
            <img src={node.avatar} width={50} height={50} className="rounded-full" />
          </div>
          <div>
            <div className="font-bold">{node.name}</div>
            <div>{node.company}</div>
            <div>favorite food: {node.favoriteFood}</div>
          </div>
        </div>

        <div className="text-left w-full">Neighbors</div>
        <ul className="flex gap-2 px-6 pb-8 w-screen overflow-x-auto">
          {relatedNodes.map((n) => (
            <li key={n.id}>
              <button style={{ background: categoryColors(String(n.category)) }} onClick={() => selectNode(n.id)}>
                {n.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
