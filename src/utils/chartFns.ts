import * as d3 from "d3";
import { IEdge, INode } from "./types";

type d3Node = INode & d3.SimulationNodeDatum;
type d3Link = d3.SimulationLinkDatum<IEdge & any>;

const categoryColors = d3.scaleOrdinal(d3.schemeCategory10);

function resetChart(selector: string) {
  const canvas = document.querySelector(selector);
  if (canvas) {
    canvas.innerHTML = "";
  }
}

const drawChart = (
  selector: string,
  data: { nodes: INode[]; links: IEdge[] },
  currentNode: INode,
  onNodeClick: (node: INode) => void
) => {
  resetChart(selector);

  const svg = d3.select(selector);
  const width = +svg.attr("width");
  const height = +svg.attr("height");
  const nodeRadius = 8;

  const simulation = d3
    .forceSimulation()
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("collide", d3.forceCollide(10).strength(0.9))
    .force(
      "link",
      d3.forceLink().id((d) => (d as any).id)
    );

  const nodes: d3Node[] = data.nodes.map((d) => ({ ...d }));
  const links: d3Link[] = data.links.map((d) => ({ ...d, target: d.destination }));

  const link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", "#ffffff45")
    .attr("stroke-width", 2);

  const node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", nodeRadius)
    .attr("fill", (d) => categoryColors(String(d.category)))
    .attr("stroke", (d) => (d.name === currentNode.name ? "#fff" : ""))
    .attr("stroke-dasharray", 4)
    .attr("stroke-width", (d) => (d.name === currentNode.name ? 2 : 1))
    .style("cursor", "pointer")
    .on("click", (ev) => {
      const { id, name, category } = ev.target["__data__"];
      const node: INode = { id, name, category };
      onNodeClick(node);
    });

  const text = svg
    .append("g")
    .attr("class", "text")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr("stroke", "#fff")
    .attr("fill", "#000")
    .style("font-size", 12)
    .style("pointer-events", "none")
    .style("font-family", "monospace")
    .text((d) => d.name);

  node.call(d3.drag().on("start", dragStart).on("drag", drag).on("end", dragEnd) as any);

  simulation.nodes(nodes).on("tick", tick);

  (simulation.force("link") as any).links(links);

  function tick() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
    // text.attr("x", (d) => d.x!).attr("y", (d) => d.y!);
    text.attr("x", (d) => d.x!).attr("y", (d) => d.y! - nodeRadius * 0.25);
  }

  function dragStart(event: d3.D3DragEvent<SVGCircleElement, INode, d3Node>) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function drag(event: d3.D3DragEvent<SVGCircleElement, INode, d3Node>) {
    if (event.x > nodeRadius && event.x < width - nodeRadius) {
      event.subject.fx = event.x;
    }
    if (event.y > nodeRadius && event.y < height - nodeRadius) {
      event.subject.fy = event.y;
    }
  }

  function dragEnd(event: d3.D3DragEvent<SVGCircleElement, INode, d3Node>) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
};

export { categoryColors, drawChart, resetChart };
