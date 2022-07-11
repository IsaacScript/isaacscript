import { CustomStageRoomMetadata } from "./CustomStageRoomMetadata";

/** Metadata about a custom stage. The "metadata.lua" file contains an array of these objects. */
export interface CustomStageMetadata {
  name: number;
  rooms: CustomStageRoomMetadata[];
}
