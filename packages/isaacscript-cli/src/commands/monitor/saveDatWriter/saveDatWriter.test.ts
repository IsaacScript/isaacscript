import { deepStrictEqual, strictEqual } from "node:assert/strict";
import { fork } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import test from "node:test";
import { SAVE_DAT_WRITER_READY_MESSAGE } from "./types.js";
import type { SaveDatMessage } from "./types.js";

const NUM_READ_RETRIES = 100;
const READ_RETRY_DELAY_MILLISECONDS = 10;

test("serializes save.dat messages", async (t) => {
  const directory = await mkdtemp(
    path.join(tmpdir(), "isaacscript-save-dat-writer-"),
  );
  t.after(async () => {
    await rm(directory, {
      force: true,
      recursive: true,
    });
  });

  const saveDatPath = path.join(directory, "save1.dat");
  await writeFile(saveDatPath, "[]\n");

  const processPath = path.join(import.meta.dirname, "saveDatWriter.ts");
  const saveDatWriter = fork(processPath, [saveDatPath], {
    stdio: ["ignore", "ignore", "ignore", "ipc"],
  });
  t.after(() => {
    saveDatWriter.kill();
  });

  const readyMessage: unknown = await new Promise((resolve, reject) => {
    saveDatWriter.once("message", resolve);
    saveDatWriter.once("error", reject);
  });
  strictEqual(readyMessage, SAVE_DAT_WRITER_READY_MESSAGE);

  const messages: readonly SaveDatMessage[] = [
    {
      type: "msg",
      data: "File synced: /main.lua",
    },
    {
      type: "command",
      data: "luamod test-mod",
    },
    {
      type: "command",
      data: "restart",
    },
    {
      type: "msg",
      data: "Reloaded the mod.",
    },
  ];

  for (const message of messages) {
    saveDatWriter.send(message);
  }

  const writtenMessages = await waitForMessages(
    saveDatPath,
    "Reloaded the mod.",
  );
  deepStrictEqual(writtenMessages, messages);
});

async function waitForMessages(
  saveDatPath: string,
  finalMessage: string,
): Promise<unknown> {
  for (let i = 0; i < NUM_READ_RETRIES; i++) {
    // eslint-disable-next-line no-await-in-loop
    const saveDatRaw = await readFile(saveDatPath, "utf8");
    if (saveDatRaw.includes(finalMessage)) {
      try {
        return JSON.parse(saveDatRaw) as unknown;
      } catch (error) {
        if (!(error instanceof SyntaxError)) {
          throw error;
        }
      }
    }

    // eslint-disable-next-line no-await-in-loop
    await sleep(READ_RETRY_DELAY_MILLISECONDS);
  }

  throw new Error("Timed out waiting for the save.dat messages to be written.");
}
