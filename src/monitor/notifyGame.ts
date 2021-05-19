import { sendMsgToSaveDatWriter } from "./spawnSaveDatWriter";

export function msg(data: string, addTime: boolean): void {
  sendMsgToSaveDatWriter({
    type: "msg",
    data,
    addTime,
  });
}

export function command(data: string): void {
  sendMsgToSaveDatWriter({
    type: "command",
    data,
    addTime: false,
  });
}

export function ping(): void {
  sendMsgToSaveDatWriter({
    type: "ping",
    data: "",
    addTime: false,
  });
}
