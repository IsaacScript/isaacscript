import * as d3 from "d3";
import { addLegend } from "./d3-util";

interface ComparisonData {
    name: string;
    oldValue: number;
    newValue: number;
}

const GRAPH_MARGIN = { left: 50, top: 5, right: 1 };

const COLOR_OLD = "#888888";
const COLOR_NEW = "#007ACC";

export function barComparisonGraph(
    selection: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    data: ComparisonData[],
    width: number,
    height: number,
) {
    const barMaxHeight = height - 50;

    // Create X scale and axis
    const xScale = d3
        .scaleBand()
        .domain(data.map((bm) => bm.name))
        .range([GRAPH_MARGIN.left, width - GRAPH_MARGIN.right]);

    const bandWidth = xScale.bandwidth();
    const barWidth = 25;

    const xAxis = d3.axisBottom(xScale);
    selection.append("g").attr("transform", `translate(0, ${barMaxHeight})`).call(xAxis);

    // Create Y scale and axis
    const maxValue = d3.max(data.map((bm) => Math.max(bm.oldValue, bm.newValue)))!;
    const maxAxisValue = Math.pow(10, Math.ceil(Math.log10(maxValue)));

    const yScale = d3
        .scaleLog()
        .domain([1, maxAxisValue])
        .range([barMaxHeight - GRAPH_MARGIN.top, 0]);

    const yAxis = d3.axisLeft(yScale);
    selection.append("g").attr("transform", `translate(${GRAPH_MARGIN.left}, ${GRAPH_MARGIN.top})`).call(yAxis);

    // Create bars for each entry
    const entries = selection.selectAll("rect").data(data).enter();

    entries
        .append("rect")
        .attr("width", barWidth)
        .attr("x", (d) => xScale(d.name)! + 0.5 * bandWidth - barWidth - 1)
        .attr("height", (d) => barMaxHeight - yScale(d.oldValue)!)
        .attr("y", (d) => yScale(d.oldValue)!)
        .style("fill", COLOR_OLD);
    //.style("stroke", "currentColor");

    entries
        .append("rect")
        .attr("width", barWidth)
        .attr("x", (d) => xScale(d.name)! + 0.5 * bandWidth + 1)
        .attr("height", (d) => barMaxHeight - yScale(d.newValue)!)
        .attr("y", (d) => yScale(d.newValue)!)
        .style("fill", COLOR_NEW);
    //.style("stroke", "currentColor");

    // Add legend
    const legendEntries: Array<[string, string]> = [
        ["Master", COLOR_OLD],
        ["Commit", COLOR_NEW],
    ];
    addLegend(selection, legendEntries).attr(
        "transform",
        `translate(${width - 100 * legendEntries.length - GRAPH_MARGIN.right}, ${height - 20})`,
    );

    return selection;
}
