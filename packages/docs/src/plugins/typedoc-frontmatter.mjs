import path from "node:path";
import { ReflectionKind } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

const FUNCTION_TITLE_OVERRIDES = new Map([
  ["arrayLua", "Array (in Lua)"],
  ["bitSet128", "BitSet128"],
  ["jsonHelpers", "JSON"],
  ["jsonRoom", "JSON Room"],
  ["kColor", "KColor"],
  ["npcs", "NPCs"],
  ["rng", "RNG"],
  ["tstlClass", "TSTL Class"],
  ["ui", "UI"],
]);

export function load(application) {
  application.renderer.on(
    MarkdownPageEvent.BEGIN,
    (event) => {
      if (event.frontmatter === undefined) {
        return;
      }

      const { frontmatter } = event;
      frontmatter.head = [
        {
          content: ":root { --sl-content-width: 80rem; }",
          tag: "style",
        },
      ];
      frontmatter.tableOfContents = false;

      if (event.model.kindOf(ReflectionKind.Module)) {
        frontmatter.title = getModuleTitle(event.model.name, event.url);
      }
    },
    -100,
  );
}

function getModuleTitle(rawName, url) {
  const moduleName = path.posix.basename(rawName);

  if (path.posix.dirname(url) === "functions") {
    return (
      FUNCTION_TITLE_OVERRIDES.get(moduleName)
      ?? pascalCaseToTitleCase(moduleName)
    );
  }

  return moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
}

function pascalCaseToTitleCase(value) {
  return value
    .replaceAll(/(?<=[A-Z])(?=[A-Z][a-z])/gv, " ")
    .replaceAll(/(?<=[\da-z])(?=[A-Z])/gv, " ")
    .replaceAll(/(?<=[A-Za-z])(?=\d)/gv, " ")
    .replace(/^./v, (character) => character.toUpperCase())
    .trim();
}
