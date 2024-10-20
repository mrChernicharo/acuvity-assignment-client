import * as d3 from "d3";
import { IEdge, INode } from "./types";

type d3Node = INode & d3.SimulationNodeDatum;
type d3Link = d3.SimulationLinkDatum<IEdge & any>;

export const chart = (data: { nodes: INode[]; links: IEdge[] }) => {
  const svg = d3.select("svg#canvas");
  const width = +svg.attr("width");
  const height = +svg.attr("height");

  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Add "forces" to the simulation here
  const simulation = d3
    .forceSimulation()
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("collide", d3.forceCollide(10).strength(0.9))
    .force(
      "link",
      d3.forceLink().id(function (d) {
        return d.id;
      })
    );

  const nodes: d3Node[] = data.nodes.map((d) => ({ ...d }));
  const links: d3Link[] = data.links.map((d) => ({ ...d, target: d.destination }));

  // Add lines for every link in the dataset
  const link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2);

  // Add circles for every node in the dataset
  const node = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", (d) => color(String(d.category)))
    .call(d3.drag().on("start", dragStart).on("drag", drag).on("end", dragEnd) as any);

  // Basic tooltips
  node.append("title").text(function (d) {
    return d.name;
  });

  // Attach nodes to the simulation, add listener on the "tick" event
  simulation.nodes(nodes).on("tick", ticked);

  // Associate the lines with the "link" force
  (simulation.force("link") as any).links(links);

  // Dynamically update the position of the nodes/links as time passes
  function ticked() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x!).attr("cy", (d) => d.y!);
  }

  function dragStart(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  function drag(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  function dragEnd(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }
};
