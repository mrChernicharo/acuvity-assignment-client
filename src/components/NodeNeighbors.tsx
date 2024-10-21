import { categoryColors } from "../utils/chartFns";
import { INode } from "../utils/types";

export function NodeNeighbors({
  node,
  neighbors,
  selectNode,
}: {
  node: INode;
  neighbors: INode[];
  selectNode: (id: number) => void;
}) {
  return (
    <>
      <div className="text-left w-full translate-y-2">{node.name}'s neighbors</div>
      <ul className="flex gap-2 px-6 pb-8 pt-1 w-screen overflow-x-auto">
        {neighbors
          .filter((n) => n.directNeighbor)
          .map((n) => (
            <li key={n.id}>
              <button style={{ background: categoryColors(String(n.category)) }} onClick={() => selectNode(n.id)}>
                {n.name}
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
