import chalk from "chalk";
import { getTime } from "../misc";
import { sendMsgToSaveDatWriter } from "./spawnSaveDatWriter";

export function msg(data: string): void {
  const formattedData = data
    .replace(/\r\n/g, "\n") // Replace Windows newlines with Unix newlines
    .trim(); // Trim whitespace

  for (const line of formattedData.split("\n")) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") {
      continue;
    }

    // Add a time prefix
    const formattedLine = `[${getTime()}] ${line}`;

    sendMsgToSaveDatWriter({
      type: "msg",
      data: formattedLine,
    });

    // We also print the message to standard out so that the end-user can choose between reading
    // tstl errors from the IsaacScript terminal window or from looking at the in-game output
    printMsgToStandardOut(formattedLine);
  }
}

function printMsgToStandardOut(data: string) {
  let coloredData = data;

  if (data.match(/Compilation successful./g)) {
    coloredData = chalk.green(data);
  } else if (data.match(/error/g)) {
    coloredData = chalk.red(data);
  }

  console.log(coloredData);
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
