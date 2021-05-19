import { getTime } from "../misc";
import { sendMsgToSaveDatWriter } from "./spawnSaveDatWriter";

export function msg(data: string, addTime: boolean): void {
  // Format the message
  const prefix = addTime ? `${getTime()} - ` : "";
  // Replace Windows newlines with Unix newlines
  const formattedData = `${prefix}${data}`.replace(/\r\n/g, "\n");

  // We also print the message to standard out so that the end-user can choose between reading tstl
  // errors from the IsaacScript terminal window or from looking at the in-game output
  console.log(formattedData);

  sendMsgToSaveDatWriter({
    type: "msg",
    data: formattedData,
  });
}

export function command(data: string): void {
  sendMsgToSaveDatWriter({
    type: "command",
    data,
  });
}

export function ping(): void {
  sendMsgToSaveDatWriter({
    type: "ping",
    data: "",
  });
}
