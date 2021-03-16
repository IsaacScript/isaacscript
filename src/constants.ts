import os from "os";
import path from "path";

// https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
const homeDir = os.homedir();

// Constants based on homeDir
export const BASH_PROFILE_PATH = path.join(homeDir, ".bash_profile");
export const MOD_DIRECTORY_PATH = path.join(
  homeDir,
  "Documents",
  "My Games",
  "Binding of Isaac Afterbirth+ Mods",
);

// Constants based on CWD
export const CWD = process.cwd();
export const CURRENT_DIRECTORY_NAME = path.basename(CWD);
export const CONFIG_FILE_NAME = "isaacscript.json";
export const CONFIG_FILE_PATH = path.join(CWD, CONFIG_FILE_NAME);
export const TSCONFIG_PATH = path.join(CWD, "tsconfig.json");
export const MOD_SOURCE_PATH = path.join(CWD, "mod");
export const MAIN_LUA_SOURCE_PATH = path.join(MOD_SOURCE_PATH, "main.lua");
export const PACKAGE_JSON_PATH = path.join(CWD, "package.json");
export const CONSTANTS_TS_PATH = path.join(CWD, "src", "constants.ts");
export const METADATA_XML_PATH = path.join(MOD_SOURCE_PATH, "metadata.xml");
export const VERSION_TXT_PATH = path.join(MOD_SOURCE_PATH, "version.txt");

// Constants based on __dirname
const REPO_ROOT = path.join(__dirname, "..", "..");
export const WATCHER_MOD_NAME = "isaacscript-watcher";
export const WATCHER_MOD_SOURCE_PATH = path.join(REPO_ROOT, WATCHER_MOD_NAME);

// Other constants
export const DISABLE_IT_FILE = "disable.it";
export const MOD_UPLOADER_PATH = path.join(
  "C:",
  "Program Files (x86)",
  "Steam",
  "steamapps",
  "common",
  "The Binding of Isaac Rebirth",
  "tools",
  "ModUploader",
  "ModUploader.exe",
);
export const WINDOWS_CODE_PAGE = "65001";
