/** From: https://github.com/typescript-eslint/typescript-eslint/pull/6679/files */
export interface CodePath {
  id: string;
  initialSegment: CodePathSegment;
  finalSegments: CodePathSegment[];
  returnedSegments: CodePathSegment[];
  thrownSegments: CodePathSegment[];
  currentSegments: CodePathSegment[];
  upper: CodePath | null;
  childCodePaths: CodePath[];
}

/** From: https://github.com/typescript-eslint/typescript-eslint/pull/6679/files */
export interface CodePathSegment {
  id: string;
  nextSegments: CodePathSegment[];
  prevSegments: CodePathSegment[];
  reachable: boolean;
}
