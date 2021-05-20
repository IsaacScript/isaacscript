import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import pako from "pako";
import { BenchmarkResult, MemoryBenchmarkCategory } from "./benchmark-types";
import { joinOnProperty, JoinResult } from "./util";
import { barComparisonGraph } from "./visualizations/bar-comparison-graph";
import { positiveNegativeBarGraph } from "./visualizations/positive-negative-bar-graph";

const garbageCreatedComparisonGraphWidth = 1000;
const garbageCreatedComparisonGraphHeight = 300;

const garbageCreatedChangeGraphWidth = 1000;
const garbageCreatedChangeGraphHeight = 300;

// Utility functions
const formatBenchmarkName = (benchmarkName: string) => benchmarkName.replace(".lua", "").split("/").pop()!;
const formatMemory = (value: number) => `${Math.round(value / 10) / 100} Mb`;

const benchmarkGarbage = (bm: BenchmarkResult) => bm.categories[MemoryBenchmarkCategory.Garbage];
const garbagePercentChange = (result: JoinResult<BenchmarkResult>) =>
    (benchmarkGarbage(result.right!) - benchmarkGarbage(result.left!)) / benchmarkGarbage(result.left!);

export default function Benchmark() {
    let garbageCreatedChangeSvgRef = useRef<SVGSVGElement>(null!);
    let garbageCreatedComparisonSvgRef = useRef<SVGSVGElement>(null!);

    const benchmarkData = decodeBenchmarkData(window.location.search.split("?d=")[1]);
    // Sort by percentage change of garbage created
    const benchmarksSortedByPercentDifference = benchmarkData.sort(
        (a, b) => garbagePercentChange(a) - garbagePercentChange(b),
    );

    // Populate graph with benchmark results
    const benchmarkResultsTable = benchmarksSortedByPercentDifference.map((bm, i) => {
        const change = garbagePercentChange(bm);
        const rowColor = change === 0 ? "currentColor" : change > 0 ? "red" : "green";

        return (
            <tr key={i} style={{ color: rowColor }}>
                <td>{bm.left!.benchmarkName}</td>
                <td>{formatMemory(benchmarkGarbage(bm.left!))}</td>
                <td>{formatMemory(benchmarkGarbage(bm.right!))}</td>
                <td>{change}</td>
            </tr>
        );
    });

    // Comparison data master garbage created vs commit garbate created (PERCENTAGE CHANGE)
    const generatedGarbageChangeData = benchmarksSortedByPercentDifference.map((bm) => {
        const oldValue = bm.left!.categories[MemoryBenchmarkCategory.Garbage]!;
        const newValue = bm.right!.categories[MemoryBenchmarkCategory.Garbage]!;

        return {
            name: formatBenchmarkName(bm.left!.benchmarkName || bm.right!.benchmarkName!),
            value: (100 * (newValue - oldValue)) / oldValue,
        };
    });

    // Comparison data master garbage created vs commit garbate created (ABSOLUTE)
    const generatedGarbageData = benchmarksSortedByPercentDifference.map((bm) => ({
        name: formatBenchmarkName(bm.left!.benchmarkName || bm.right!.benchmarkName!),
        oldValue: bm.left!.categories[MemoryBenchmarkCategory.Garbage] || 0,
        newValue: bm.right!.categories[MemoryBenchmarkCategory.Garbage] || 0,
    }));

    useEffect(() => {
        // Populate graph showing percentual change in garbage created
        positiveNegativeBarGraph(
            d3.select(garbageCreatedChangeSvgRef.current),
            generatedGarbageChangeData,
            garbageCreatedChangeGraphWidth,
            garbageCreatedChangeGraphHeight,
        );

        // Populate graph showing absolute garbage created numbers
        barComparisonGraph(
            d3.select(garbageCreatedComparisonSvgRef.current),
            generatedGarbageData,
            garbageCreatedComparisonGraphWidth,
            garbageCreatedComparisonGraphHeight,
        );
    });

    return (
        <>
            <h2>Benchmark results</h2>
            {/* Results table */}
            <table>
                <thead>
                    <tr style={{ fontWeight: "bold" }}>
                        <td>Benchmark</td>
                        <td>Garbage Master</td>
                        <td>Garbage Commit</td>
                        <td>% Change</td>
                    </tr>
                </thead>
                <tbody>{benchmarkResultsTable}</tbody>
            </table>

            <h2>Garbage created change</h2>
            {/* [% Delta] Gerbage created */}
            <svg
                ref={garbageCreatedChangeSvgRef}
                width={garbageCreatedChangeGraphWidth}
                height={garbageCreatedChangeGraphHeight}
            ></svg>

            <h2>Garbage created</h2>
            {/* [Absolute] Garbage created comparison */}
            <svg
                ref={garbageCreatedComparisonSvgRef}
                width={garbageCreatedComparisonGraphWidth}
                height={garbageCreatedComparisonGraphHeight}
            ></svg>
        </>
    );
}

function decodeBenchmarkData(encodedData: string) {
    const results = JSON.parse(pako.inflate(atob(encodedData)).toString());

    const dataMaster = results.old as BenchmarkResult[];
    const dataCommit = results.new as BenchmarkResult[];

    // Match old/new results by name
    return joinOnProperty(dataMaster, dataCommit, (bm) => bm.benchmarkName);
}
