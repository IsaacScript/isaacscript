export type SaveDatMessageType = "command" | "msg" | "ping";

export interface SaveDatMessage {
  type: SaveDatMessageType;
  data: string;
}
