import path from "node:path";
import { ReflectionKind } from "typedoc";
import { MarkdownPageEvent } from "typedoc-plugin-markdown";

export function load(application) {
  application.renderer.on(
    MarkdownPageEvent.BEGIN,
    (event) => {
      if (
        event.frontmatter === undefined
        || !event.model.kindOf(ReflectionKind.Module)
      ) {
        return;
      }

      const { frontmatter } = event;
      frontmatter.title = getModuleTitle(event.model.name);
    },
    -100,
  );
}

function getModuleTitle(rawName) {
  const moduleName = path.posix.basename(rawName);
  return moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
}
