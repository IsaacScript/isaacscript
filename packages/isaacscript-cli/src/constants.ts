import { findPackageRoot, getPackageJSONFieldsMandatory } from "complete-node";
import os from "node:os";
import path from "node:path";

// Miscellaneous
export const CWD = process.cwd();
export const CURRENT_DIRECTORY_NAME = path.basename(CWD);
export const HOME_DIR = os.homedir();
export const FILE_SYNCED_MESSAGE = "File synced:";
export const COMPILATION_SUCCESSFUL_MESSAGE = "Compilation successful.";
export const MOD_UPLOADER_PATH = String.raw`C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\tools\ModUploader\ModUploader.exe`;

const packageRoot = findPackageRoot();
const { version, description } = getPackageJSONFieldsMandatory(
  packageRoot,
  "name",
  "version",
  "description",
);

export const PROJECT_NAME = "IsaacScript"; // We want to capitalize the name.
export const PROJECT_VERSION = version;
export const PROJECT_DESCRIPTION = description;

// `isaacscript`
export const REPO_ROOT = path.join(import.meta.dirname, "..");

// `isaacscript/custom-stage`
const CUSTOM_STAGE_PATH = path.join(REPO_ROOT, "custom-stage");
export const CUSTOM_STAGE_FILES_DIR = path.join(
  CUSTOM_STAGE_PATH,
  "isaacscript-custom-stage",
);
export const SHADERS_XML_PATH = path.join(CUSTOM_STAGE_PATH, "shaders.xml");
export const XML_CONVERTER_PATH = path.join(
  CUSTOM_STAGE_PATH,
  "xml-converter.exe",
);

// `isaacscript/isaacscript-watcher`
export const DISABLE_IT_FILE = "disable.it";
export const WATCHER_MOD_NAME = "isaacscript-watcher";
export const WATCHER_MOD_SOURCE_PATH = path.join(REPO_ROOT, WATCHER_MOD_NAME);

// `isaacscript/file-templates`
export const TEMPLATES_DIR = path.join(REPO_ROOT, "file-templates");

// `isaacscript/file-templates/static`
export const TEMPLATES_STATIC_DIR = path.join(TEMPLATES_DIR, "static");

// `isaacscript/file-templates/dynamic`
export const TEMPLATES_DYNAMIC_DIR = path.join(TEMPLATES_DIR, "dynamic");

export const ACTION_YML = "action.yml";
export const ACTION_YML_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  ".github",
  "workflows",
  "setup",
  ACTION_YML,
);

export const YARNRC_YML = ".yarnrc.yml";
export const YARNRC_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  YARNRC_YML,
);

const GITIGNORE = "_gitignore"; // Not named ".gitignore" to prevent npm from deleting it.
export const GITIGNORE_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  GITIGNORE,
);

export const MAIN_TS = "main.ts";
export const MAIN_TS_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  "src",
  MAIN_TS,
);
export const MAIN_DEV_TS_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  "src",
  "main-dev.ts",
);

export const METADATA_XML = "metadata.xml";
export const METADATA_XML_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  "mod",
  METADATA_XML,
);

export const README_MD = "README.md";

// `isaacscript/schemas`
const SCHEMAS_DIR = path.join(REPO_ROOT, "schemas");
export const ISAACSCRIPT_SCHEMA_PATH = path.join(
  SCHEMAS_DIR,
  "tsconfig-isaacscript-section-schema.json",
);

// `project`
export const CONFIG_FILE_NAME = "isaacscript.json";
export const CONFIG_FILE_PATH = path.join(CWD, CONFIG_FILE_NAME);
export const TSCONFIG_JSON = "tsconfig.json";
export const TSCONFIG_JSON_PATH = path.join(CWD, TSCONFIG_JSON);
export const CONSTANTS_TS_PATH = path.join(CWD, "src", "constants.ts");

// `project/mod`
export const MOD_SOURCE_PATH = path.join(CWD, "mod");
export const MAIN_LUA = "main.lua";
export const METADATA_XML_PATH = path.join(MOD_SOURCE_PATH, "metadata.xml");
export const VERSION_TXT_PATH = path.join(MOD_SOURCE_PATH, "version.txt");

// `project/scripts`
const SCRIPTS_PATH = path.join(CWD, "scripts");
export const PUBLISH_PRE_COPY_PY_PATH = path.join(
  SCRIPTS_PATH,
  "publish_pre_copy.py",
);
export const PUBLISH_POST_COPY_PY_PATH = path.join(
  SCRIPTS_PATH,
  "publish_post_copy.py",
);
