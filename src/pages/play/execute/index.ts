import FengariWorker from "worker-loader?filename=fengari.worker.js!./fengari.worker";
import type { ConsoleMessage } from "./fengari.worker";

export type { ConsoleMessage };

let fengariWorker = new FengariWorker();
export async function executeLua(code: string) {
    return new Promise<ConsoleMessage[]>((resolve) => {
        const timeout = setTimeout(() => {
            resolve([{ method: "log", data: ["%cLua code execution timed out", "font-style: italic"] }]);
            fengariWorker.terminate();
            fengariWorker = new FengariWorker();
        }, 2500);

        fengariWorker.postMessage({ code });
        fengariWorker.addEventListener("message", (event) => {
            clearTimeout(timeout);
            resolve(event.data.messages);
        });
    });
}
