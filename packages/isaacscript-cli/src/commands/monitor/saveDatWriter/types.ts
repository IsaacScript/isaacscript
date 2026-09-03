export const SAVE_DAT_WRITER_READY_MESSAGE = "saveDatWriterReady";

export type SaveDatMessageType = "command" | "msg" | "ping";

export interface SaveDatMessage {
  readonly type: SaveDatMessageType;
  readonly data: string;
}
