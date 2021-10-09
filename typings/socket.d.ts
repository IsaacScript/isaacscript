// The "socket.lua" module exists at:
// C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\scripts\socket.lua
// It is intended to be consumed by mods via:
// local socket = require("socket")
// (but it requires that the "--luadebug" flag is enabled)
// We need to specify the "@noResolution" tstl compiler annotation,
// since the "json.lua" file is not supposed to exist inside of end-user mods

/** @noResolution */
declare module "socket" {
  function tcp(this: void): SocketClient;
  function udp(this: void): SocketClient;
}

declare interface SocketClient {
  receive(): LuaMultiReturn<[data: string | undefined, errMsg: string]>;
  send(
    msg: string,
  ): LuaMultiReturn<[sentBytes: int | undefined, errMsg: string]>;
  settimeout(timeout: int): void;
}
