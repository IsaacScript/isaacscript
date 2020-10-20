import os from "os";
import path from "path";

const homeDir = os.homedir();
export const CWD = process.cwd();

// https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
export const BASH_PROFILE_PATH = path.join(homeDir, ".bash_profile");
export const CONFIG_FILE_NAME = "isaacconfig.json";
export const CONFIG_FILE_PATH = path.join(CWD, CONFIG_FILE_NAME);
export const MOD_SOURCE_PATH = path.join(CWD, "mod");
export const MOD_DIRECTORY_PATH = path.join(
  homeDir,
  "Documents",
  "My Games",
  "Binding of Isaac Afterbirth+ Mods",
);
export const TEMPLATES_DIR = path.join(__dirname, "..", "templates");
export const TSCONFIG_PATH = path.join(CWD, "tsconfig.json");
export const WATCHER_MOD_NAME = "isaacscript-watcher";
export const WATCHER_MOD_SOURCE_PATH = path.join(
  __dirname,
  "..",
  WATCHER_MOD_NAME,
);
export const WINDOWS_CODE_PAGE = "65001";
