import { copyFileOrDirectory, deleteFileOrDirectory } from "complete-node";
import path from "node:path";

const packageRoot = path.resolve(import.meta.dirname, "..");
const stagedContent = path.join(packageRoot, "src", "content", "docs");

await deleteFileOrDirectory(stagedContent);
await copyFileOrDirectory(
  path.join(packageRoot, "content", "main"),
  path.join(stagedContent, "main"),
);
await copyFileOrDirectory(
  path.join(packageRoot, "content", "homepage.mdx"),
  path.join(stagedContent, "index.mdx"),
);
