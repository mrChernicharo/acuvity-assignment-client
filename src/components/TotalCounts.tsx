import type { EntryCounts } from "../utils/types";

const intl = new Intl.NumberFormat("en-us", { notation: "compact" });

export function TotalCounts({ entryCounts }: { entryCounts: EntryCounts | null }) {
  if (!entryCounts?.nodes || !entryCounts?.edges) return null;

  return (
    <div className="flex flex-col items-end gap-1 absolute p-1 right-0">
      <small className="bg-gray-400 text-gray-900 rounded-lg w-min whitespace-nowrap px-1">
        {intl.format(entryCounts.nodes)} nodes
      </small>
      <small className="bg-gray-400 text-gray-900 rounded-lg w-min whitespace-nowrap px-1">
        {intl.format(entryCounts.edges)} links
      </small>
    </div>
  );
}
