export enum BenchmarkKind {
    Memory = "memory",
}

export type BenchmarkResult = MemoryBenchmarkResult;

export enum MemoryBenchmarkCategory {
    TotalMemory = "totalMemory",
    Garbage = "garbage",
}

export interface MemoryBenchmarkResult {
    kind: string;
    categories: Record<MemoryBenchmarkCategory, number>;
    benchmarkName: string;
}
