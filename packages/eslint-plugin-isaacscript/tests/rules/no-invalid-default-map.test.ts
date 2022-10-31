import { TSESLint } from "@typescript-eslint/utils";
import {
  noInvalidDefaultMap,
  NoInvalidDefaultMapMessageIds,
  Options,
} from "../../src/rules/no-invalid-default-map";
import { ruleTester } from "../utils";

const valid: Array<TSESLint.ValidTestCase<Options>> = [];
const invalid: Array<
  TSESLint.InvalidTestCase<NoInvalidDefaultMapMessageIds, Options>
> = [];

valid.push({
  name: "DefaultMap with boolean literal",
  code: `
const defaultMap = new DefaultMap<string, boolean>(false);
  `,
});

valid.push({
  name: "DefaultMap with boolean variable",
  code: `
const defaultValue = false;
const defaultMap = new DefaultMap<string, boolean>(defaultValue);
  `,
});

valid.push({
  name: "DefaultMap with number literal",
  code: `
const defaultMap = new DefaultMap<string, number>(0);
  `,
});

valid.push({
  name: "DefaultMap with number variable",
  code: `
const defaultValue = 0;
const defaultMap = new DefaultMap<string, number>(defaultValue);
  `,
});

valid.push({
  name: "DefaultMap with string literal",
  code: `
const defaultMap = new DefaultMap<string, string>("foo");
  `,
});

valid.push({
  name: "DefaultMap with string variable",
  code: `
const defaultValue = "foo";
const defaultMap = new DefaultMap<string, string>(defaultValue);
  `,
});

valid.push({
  name: "DefaultMap with factory function",
  code: `
const factoryFunction = () => [];
const defaultMap = new DefaultMap<string, string[]>(factoryFunction);
  `,
});

invalid.push({
  name: "DefaultMap with array",
  code: `
const defaultMap = new DefaultMap<string, string[]>([]);
  `,
  errors: [{ messageId: "invalidType" }],
});

invalid.push({
  name: "DefaultMap with map",
  code: `
const defaultMap = new DefaultMap<string, string[]>(new Map());
  `,
  errors: [{ messageId: "invalidType" }],
});

ruleTester.run("no-invalid-default-map", noInvalidDefaultMap, {
  valid,
  invalid,
});
