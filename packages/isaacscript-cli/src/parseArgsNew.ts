import { command, run, subcommands } from "cmd-ts";

export async function parseArgsNew(): Promise<boolean> {
  const monitorCommand = command({
    name: "monitor",
    args: {},
    handler: monitor,
  });
  const initCommand = command({
    name: "init",
    args: {},
    handler: init,
  });

  const commands = subcommands({
    name: "foo",
    cmds: { monitor: monitorCommand, initCommand },
  });

  await run(commands, process.argv.slice(2));

  return true;
}

function monitor() {
  console.log("LOL monitor LOL");
}

function init() {
  console.log("LOL init LOL");
}
