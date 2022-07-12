import { CustomStageTSConfig } from "./CustomStageTSConfig";

/**
 * An object that represents a custom stage. The "metadata.lua" file contains an array of these
 * objects. Besides the room metadata, the data is the same as what is specified inside the
 * "tsconfig.json" file.
 */
export interface CustomStage extends CustomStageTSConfig {
  roomsMetadata: CustomStageRoomMetadata[];
}

/**
 * Metadata about a custom stage room. Each custom stage object contains an array with metadata for
 * each room.
 */
// ts-prune-ignore-next
export interface CustomStageRoomMetadata {
  variant: number;
  shape: number;
  weight: number;
}
