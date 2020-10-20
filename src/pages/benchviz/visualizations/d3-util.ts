import * as d3 from "d3";

export function addLegend(
    selection: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    items: Array<[string, string]>,
) {
    const legend = selection.append("g");

    for (const [index, [name, color]] of items.entries()) {
        legend
            .append("rect")
            .attr("width", 15)
            .attr("height", 15)
            .attr("x", 100 * index)
            .style("fill", color)
            .style("stroke", "currentColor");

        legend
            .append("text")
            .attr("x", 100 * index + 20)
            .attr("y", 13)
            .text(name)
            .attr("fill", "currentColor");
    }

    return legend;
}
