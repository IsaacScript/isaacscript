export interface SaveDatWriterMsg {
  type: SaveDatMessageType;
  data: string;
  addTime: boolean;
}

export type SaveDatMessageType = "command" | "msg" | "ping";

export interface SaveDatMessage {
  type: SaveDatMessageType;
  data: string;
}
