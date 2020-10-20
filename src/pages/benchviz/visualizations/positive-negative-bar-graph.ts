import * as d3 from "d3";

interface CategoryData {
    name: string;
    value: number;
}

const GRAPH_MARGIN = { left: 50, top: 5, right: 1 };

export function positiveNegativeBarGraph(
    selection: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: CategoryData[],
    width: number,
    height: number,
) {
    const minValue = d3.min(data.map((bm) => bm.value))!;
    const maxValue = d3.max(data.map((bm) => bm.value))!;

    const yScale = d3
        .scaleLinear()
        .domain([minValue * 1.2, maxValue * 1.2])
        .range([0, height - 10]);

    const yAxis = d3.axisLeft(yScale);

    const xScale = d3
        .scaleBand()
        .domain(data.map((bm) => bm.name))
        .range([GRAPH_MARGIN.left, width - GRAPH_MARGIN.right]);

    const bandWidth = xScale.bandwidth();
    const barWidth = 25;

    const xAxis = d3.axisBottom(xScale);

    selection
        .append("g")
        .attr("transform", `translate(0, ${yScale(0)! + 5})`)
        .call(xAxis);

    selection.append("g").attr("transform", `translate(${GRAPH_MARGIN.left}, ${GRAPH_MARGIN.top})`).call(yAxis);

    const barSize = (val: number) => Math.abs(height / 2 - yScale(val)!);

    const bars = selection.selectAll("rect").data(data).enter();

    bars.append("rect")
        .attr("width", barWidth)
        .attr("x", (d) => xScale(d.name)! + 0.5 * bandWidth - 0.5 * barWidth)
        .attr("height", (d) => barSize(d.value) - 1)
        .attr("y", (d) => (d.value > 0 ? height / 2 + 10 : height / 2 + 10 - barSize(d.value)))
        .style("fill", (d) => (d.value > 0 ? "red" : "green"));
    //.style("stroke", "currentColor");

    bars.append("text")
        .text((d) => `${d.value > 0 ? "+" : ""}${Math.round(d.value * 100) / 100}%`)
        .attr("x", (d) => xScale(d.name)! + 0.5 * bandWidth)
        .attr("y", (d) => (d.value > 0 ? height / 2 + barSize(d.value) + 30 : height / 2 - barSize(d.value)))
        .style("fill", "currentColor")
        .style("text-anchor", "middle");
    //.style("stroke", "currentColor");

    return selection;
}
