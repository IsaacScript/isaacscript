export type SaveDatMessageType = "command" | "msg" | "ping";

export interface SaveDatMessage {
  readonly type: SaveDatMessageType;
  readonly data: string;
}
