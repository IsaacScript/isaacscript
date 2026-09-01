import type {
  InvalidTestCase,
  ValidTestCase,
} from "@typescript-eslint/rule-tester";
import type {
  NoInvalidDefaultMapMessageIds,
  Options,
} from "../../src/rules/no-invalid-default-map.js";
import { noInvalidDefaultMap } from "../../src/rules/no-invalid-default-map.js";
import { ruleTester } from "../utils.js";

const valid: Array<ValidTestCase<Options>> = [];
const invalid: Array<InvalidTestCase<NoInvalidDefaultMapMessageIds, Options>> =
  [];

valid.push({
  code: `
const defaultMap = new DefaultMap<string, boolean>(false);
  `,
  name: "DefaultMap with boolean literal",
});

valid.push({
  code: `
const defaultValue = false;
const defaultMap = new DefaultMap<string, boolean>(defaultValue);
  `,
  name: "DefaultMap with boolean variable",
});

valid.push({
  code: `
const defaultMap = new DefaultMap<string, number>(0);
  `,
  name: "DefaultMap with number literal",
});

valid.push({
  code: `
const defaultValue = 0;
const defaultMap = new DefaultMap<string, number>(defaultValue);
  `,
  name: "DefaultMap with number variable",
});

valid.push({
  code: `
const defaultMap = new DefaultMap<string, string>("foo");
  `,
  name: "DefaultMap with string literal",
});

valid.push({
  code: `
const defaultValue = "foo";
const defaultMap = new DefaultMap<string, string>(defaultValue);
  `,
  name: "DefaultMap with string variable",
});

valid.push({
  code: `
const factoryFunction = () => [];
const defaultMap = new DefaultMap<string, string[]>(factoryFunction);
  `,
  name: "DefaultMap with factory function",
});

invalid.push({
  errors: [{ messageId: "invalidType" }],
  code: `
const defaultMap = new DefaultMap<string, string[]>([]);
  `,
  name: "DefaultMap with array",
});

invalid.push({
  errors: [{ messageId: "invalidType" }],
  code: `
const defaultMap = new DefaultMap<string, string[]>(new Map());
  `,
  name: "DefaultMap with map",
});

valid.push({
  code: `
declare type int = number & {};
const defaultValue = 0 as int;
const defaultMap = new DefaultMap<string, int>(defaultValue);
  `,
  name: "DefaultMap with int",
});

valid.push({
  code: `
declare type float = number & {};
const defaultValue = 0.1 as float;
const defaultMap = new DefaultMap<string, float>(defaultValue);
  `,
  name: "DefaultMap with float",
});

ruleTester.run("no-invalid-default-map", noInvalidDefaultMap, {
  invalid,
  valid,
});
