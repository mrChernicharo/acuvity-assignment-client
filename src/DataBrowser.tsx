import { INodeFull, NodeInfo } from "./types";
import { categoryColors } from "./chartFns";

interface Props {
  nodeInfo: NodeInfo | null;
  selectNode: (id: number) => void;
}

const dateIntl = new Intl.DateTimeFormat("en-us", { dateStyle: "medium" });

export function DataBrowser({ nodeInfo, selectNode }: Props) {
  if (!nodeInfo) return null;

  const { node: fullNode, relatedNodes } = nodeInfo;
  const node = fullNode as INodeFull;

  if (!node) return null;

  return (
    <div className="fixed bottom-0 w-screen border-t border-gray-500">
      <div className="flex flex-col items-center space-y-6 px-6">
        <div className="flex gap-4">
          <div className="p-2 rounded-lg" style={{ background: categoryColors(String(node.category)) }}>
            <img src={node.avatar} width={50} height={50} className="rounded-full" />
          </div>
          <div>
            <span className="font-bold text-xl" style={{ color: categoryColors(String(node.category)) }}>
              {node.name}
            </span>
            <div>{node.company}</div>
            <div>favorite food: {node.favoriteFood}</div>
            <div>registered at: {dateIntl.format(new Date(node.registeredAt))}</div>
          </div>
        </div>

        <div className="text-left w-full">{node.name}'s neighbors</div>
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
