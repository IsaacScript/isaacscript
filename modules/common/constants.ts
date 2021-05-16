import os from "os";
import path from "path";

const cwd = process.cwd();
// https://stackoverflow.com/questions/9080085/node-js-find-home-directory-in-platform-agnostic-way
const homeDir = os.homedir();

export const BASH_PROFILE_PATH = path.join(homeDir, ".bash_profile");
export const CONFIG_FILE_NAME = "isaacscript.json";
export const CURRENT_DIRECTORY_NAME = path.basename(cwd);
export const CWD = cwd;
export const MODS_DIRECTORY_PATH = path.join(
  "C:",
  "Program Files (x86)",
  "Steam",
  "steamapps",
  "common",
  "The Binding of Isaac Rebirth",
  "mods",
);
export const REPO_ROOT = path.join(__dirname, "..", "..");
export const WINDOWS_CODE_PAGE = "65001";
