import path from "path";
import { TEMPLATES_DYNAMIC_DIR } from "./constants";
import * as file from "./file";
import { getCustomStageOption } from "./tsconfig";
import { error } from "./utils";

const ROOMS_DIRECTORY_PARTIAL_PATH = path.join("content", "rooms");
const SPECIAL_ROOMS_STB_PARTIAL_PATH = path.join(
  ROOMS_DIRECTORY_PARTIAL_PATH,
  "00.special rooms.stb",
);
const SPECIAL_ROOMS_STB_TEMPLATE_PATH = path.join(
  TEMPLATES_DYNAMIC_DIR,
  "mod",
  SPECIAL_ROOMS_STB_PARTIAL_PATH,
);

export function copyCustomStageRooms(
  modSourcePath: string,
  modTargetPath: string,
  verbose: boolean,
): void {
  const customStageOption = getCustomStageOption(verbose);
  if (!customStageOption) {
    return;
  }

  if (!file.exists(SPECIAL_ROOMS_STB_TEMPLATE_PATH, verbose)) {
    error("Failed to find the template file for the custom rooms feature.");
  }
  const templateHash = file.hash(SPECIAL_ROOMS_STB_TEMPLATE_PATH);

  // First, validate that the mod itself does not have a "00.special rooms.stb" file.
  const specialRoomsPath = path.join(
    modSourcePath,
    SPECIAL_ROOMS_STB_PARTIAL_PATH,
  );
  if (file.exists(specialRoomsPath, verbose)) {
    const existingHash = file.hash(specialRoomsPath);
    if (existingHash === templateHash) {
      return;
    }

    error(
      'Currently, custom stages do not work with mods that have an existing "content/rooms/00.special rooms.stb" file. If this is a problem for your mod, you can request this feature in the IsaacScript Discord server.',
    );
  }

  const roomsPath = path.join(modTargetPath, ROOMS_DIRECTORY_PARTIAL_PATH);
  if (!file.isDir(roomsPath, verbose)) {
    file.makeDir(roomsPath, verbose);
  }

  file.copy(SPECIAL_ROOMS_STB_TEMPLATE_PATH, specialRoomsPath, verbose);
}
