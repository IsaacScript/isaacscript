import path from "path";
import { REPO_ROOT } from "../common/constants";

// File/directory names
export const MAIN_TS = "main.ts";
export const METADATA_XML = "metadata.xml";
export const PACKAGE_JSON = "package.json";
export const README_MD = "README.md";

// repo/templates
export const TEMPLATES_DIR = path.join(REPO_ROOT, "templates");
export const TEMPLATES_DIR_STATIC = path.join(TEMPLATES_DIR, "static");
export const MAIN_TS_TEMPLATE_PATH = path.join(TEMPLATES_DIR);
export const METADATA_XML_TEMPLATE_PATH = path.join(
  TEMPLATES_DIR,
  "metadata.xml",
);
export const README_MD_TEMPLATES_PATH = path.join(TEMPLATES_DIR, "README.md");

// From: https://gist.github.com/doctaphred/d01d05291546186941e1b7ddc02034d3
export const ILLEGAL_CHARACTERS_FOR_WINDOWS_FILENAMES = [
  "<",
  ">",
  ":",
  '"',
  "/",
  "\\",
  "|",
  "?",
  "*",
];
