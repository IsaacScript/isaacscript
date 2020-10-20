import setupCode from "!!raw-loader!./setup.lua";
import type { Message as ConsoleMessage } from "console-feed/lib/definitions/Console";
import { interop, lauxlib, lua, lualib, to_luastring } from "fengari-web";

export type { ConsoleMessage };

const workerContext = globalThis as typeof globalThis & { printStream: any[] };

function transformLuaValue(rootValue: any) {
    const seenLuaValues = new Set<any>();
    function transform(luaValue: any): any {
        if (typeof luaValue !== "function") return luaValue;

        if (luaValue.toString().startsWith("function:")) {
            return "[Function]";
        }

        // TODO: Is there some way to get stable reference?
        if (seenLuaValues.has(luaValue.toString())) {
            return "[Circular]";
        }

        seenLuaValues.add(luaValue.toString());

        const object = Object.fromEntries([...luaValue].map(([key, value]) => [key, transform(value)]));

        const arrayLikeEntries = Object.entries(object).map(([key, value]) => [Number(key) - 1, value] as const);
        if (
            "____tstlArrayLength" in object ||
            (arrayLikeEntries.length > 0 &&
                arrayLikeEntries.sort(([a], [b]) => a - b).every(([key], index) => key === index))
        ) {
            const array = new Array(object.____tstlArrayLength || arrayLikeEntries.length).fill(undefined);

            for (const [key, value] of arrayLikeEntries) {
                array[key] = value;
            }

            return array;
        }

        return object;
    }

    return transform(rootValue);
}

function executeLua(code: string) {
    workerContext.printStream = [];

    const L = lauxlib.luaL_newstate();
    lualib.luaL_openlibs(L);
    lauxlib.luaL_requiref(L, to_luastring("js"), interop.luaopen_js, 1);
    lua.lua_pop(L, 1);
    lauxlib.luaL_dostring(L, to_luastring(setupCode));

    const status = lauxlib.luaL_dostring(L, to_luastring(code));
    const value = transformLuaValue(interop.tojs(L, -1));
    const messages: ConsoleMessage[] = workerContext.printStream.map(transformLuaValue);

    if (status === lua.LUA_OK) {
        if (value !== undefined) {
            messages.push({ method: "log", data: ["Module exports:", value] });
        }
    } else {
        messages.push({ method: "error", data: [value] });
    }

    return messages;
}

onmessage = (event: MessageEvent) => {
    postMessage({ messages: executeLua(event.data.code) });
};
