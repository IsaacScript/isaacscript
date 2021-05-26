import path from "path";

const cwd = process.cwd();

// Miscellaneous
export const CURRENT_DIRECTORY_NAME = path.basename(cwd);
export const CWD = cwd;
export const FILE_SYNCED_MESSAGE = "File synced:";

// isaacscript
export const REPO_ROOT = path.join(__dirname, "..", "..");

// isaacscript/isaacscript-watcher
export const DISABLE_IT_FILE = "disable.it";
export const WATCHER_MOD_NAME = "isaacscript-watcher";
export const WATCHER_MOD_SOURCE_PATH = path.join(REPO_ROOT, WATCHER_MOD_NAME);

// isaacscript/file-templates
export const TEMPLATES_DIR = path.join(REPO_ROOT, "file-templates");

// isaacscript/file-templates/static
export const TEMPLATES_STATIC_DIR = path.join(TEMPLATES_DIR, "static");
export const VSCODE = ".vscode";
export const TEMPLATES_VSCODE_DIR = path.join(TEMPLATES_STATIC_DIR, VSCODE);

// isaacscript/file-templates/dynamic
export const TEMPLATES_DYNAMIC_DIR = path.join(TEMPLATES_DIR, "dynamic");
export const GITIGNORE = "gitignore"; // Not named ".gitignore" to prevent NPM from deleting it
export const GITIGNORE_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  GITIGNORE,
);
export const MAIN_TS = "main.ts";
export const MAIN_TS_TEMPLATE_PATH = path.join(TEMPLATES_DYNAMIC_DIR, MAIN_TS);
export const METADATA_XML = "metadata.xml";
export const METADATA_XML_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  METADATA_XML,
);
export const PACKAGE_JSON = "package.json";
export const PACKAGE_JSON_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  PACKAGE_JSON,
);
export const README_MD = "README.md";
export const README_MD_TEMPLATES_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  README_MD,
);

// project
export const CONFIG_FILE_NAME = "isaacscript.json";
export const CONFIG_FILE_PATH = path.join(CWD, CONFIG_FILE_NAME);
export const TSCONFIG_PATH = path.join(CWD, "tsconfig.json");
export const PACKAGE_JSON_PATH = path.join(CWD, "package.json");
export const CONSTANTS_TS_PATH = path.join(CWD, "src", "constants.ts");

// project/mod
export const MOD_SOURCE_PATH = path.join(CWD, "mod");
export const MAIN_LUA = "main.lua";
export const MAIN_LUA_SOURCE_PATH = path.join(MOD_SOURCE_PATH, MAIN_LUA);
export const METADATA_XML_PATH = path.join(MOD_SOURCE_PATH, "metadata.xml");
export const VERSION_TXT_PATH = path.join(MOD_SOURCE_PATH, "version.txt");

// project/scripts
export const PUBLISH_PRE_COPY_PY = "publish_pre_copy.py";
export const PUBLISH_PRE_COPY_PY_PATH = path.join(
  CWD,
  "scripts",
  PUBLISH_PRE_COPY_PY,
);
export const PUBLISH_POST_COPY_PY = "publish_post_copy.py";
export const PUBLISH_POST_COPY_PY_PATH = path.join(
  CWD,
  "scripts",
  PUBLISH_POST_COPY_PY,
);
