import chalk from "chalk";
import { getTime } from "../misc";
import { sendMsgToSaveDatWriter } from "./spawnSaveDatWriter";

export function msg(data: string): void {
  // Just in case, trim whitespace
  let formattedData = data.trim();

  // Add a time prefix
  formattedData = `${getTime()}${data}`;

  // Replace Windows newlines with Unix newlines
  formattedData = formattedData.replace(/\r\n/g, "\n");

  // We also print the message to standard out so that the end-user can choose between reading tstl
  // errors from the IsaacScript terminal window or from looking at the in-game output
  printMsgToStandardOut(formattedData);

  sendMsgToSaveDatWriter({
    type: "msg",
    data: formattedData,
  });
}

function printMsgToStandardOut(data: string) {
  if (data === "Compilation successful.") {
    data = chalk.green(data);
  } else if (data.match(/Found \d+ errors./g)) {
    data = chalk.red(data);
  }

  console.log(data);
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
