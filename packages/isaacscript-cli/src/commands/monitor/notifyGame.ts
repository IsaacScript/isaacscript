import chalk from "chalk";
import { COMPILATION_SUCCESSFUL_MESSAGE } from "../../constants.js";
import { getTime } from "../../utils.js";
import { sendMsgToSaveDatWriter } from "./spawnSaveDatWriter.js";

export function notifyGameMsg(data: string): void {
  const formattedData = data
    .replaceAll("/\r\n", "\n") // Replace Windows newlines with Unix newlines
    .trim(); // Trim whitespace

  for (const line of formattedData.split("\n")) {
    const trimmedLine = line.trim();
    if (trimmedLine === "") {
      continue;
    }

    // Ignore the final message from tstl upon exiting the program.
    if (trimmedLine === "Terminate batch job (Y/N)?") {
      return;
    }

    // Add a time prefix.
    const formattedLine = `[${getTime()}] ${trimmedLine}`;

    sendMsgToSaveDatWriter({
      type: "msg",
      data: formattedLine,
    });

    // We also print the message to standard out so that the end-user can choose between reading
    // tstl errors from the IsaacScript terminal window or from looking at the in-game output.
    printMsgToStandardOut(formattedLine);
  }
}

function printMsgToStandardOut(data: string) {
  let coloredData = data;

  if (data.includes(COMPILATION_SUCCESSFUL_MESSAGE)) {
    coloredData = chalk.green(data);
  } else if (data.match(/error/g) !== null) {
    coloredData = chalk.red(data);
  }

  console.log(coloredData);
}

export function notifyGameCommand(data: string): void {
  sendMsgToSaveDatWriter({
    type: "command",
    data,
  });
}

export function notifyGamePing(): void {
  sendMsgToSaveDatWriter({
    type: "ping",
    data: "",
  });
}
