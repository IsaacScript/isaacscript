import os from "os";
import path from "path";

const cwd = process.cwd();

/**
 * From:
 * https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
 */
const homeDir = os.homedir();

// Miscellaneous
export const CURRENT_DIRECTORY_NAME = path.basename(cwd);
export const CWD = cwd;
export const HOME_DIR = homeDir;
export const FILE_SYNCED_MESSAGE = "File synced:";
export const MOD_UPLOADER_PATH =
  "C:\\Program Files (x86)\\Steam\\steamapps\\common\\The Binding of Isaac Rebirth\\tools\\ModUploader\\ModUploader.exe";
export const PROJECT_NAME = "IsaacScript";

// `isaacscript`
const REPO_ROOT = path.join(__dirname, "..");

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
const TEMPLATES_DIR = path.join(REPO_ROOT, "file-templates");

// `isaacscript/file-templates/static`
export const TEMPLATES_STATIC_DIR = path.join(TEMPLATES_DIR, "static");

// `isaacscript/file-templates/dynamic`
const TEMPLATES_DYNAMIC_DIR = path.join(TEMPLATES_DIR, "dynamic");
export const CI_YML = "ci.yml";
export const CI_YML_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  ".github",
  "workflows",
  CI_YML,
);

export const GITIGNORE = "gitignore"; // Not named ".gitignore" to prevent npm from deleting it.
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
export const METADATA_XML = "metadata.xml";
export const METADATA_XML_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  "mod",
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
export const PACKAGE_JSON_PATH = path.join(CWD, "package.json");
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
