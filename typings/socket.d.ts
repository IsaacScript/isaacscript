// The "socket.lua" module exists at:
// C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\scripts\socket.lua
// It is intended to be consumed by mods via:
// local socket = require("socket")
// (but it requires that the "--luadebug" flag is enabled)

declare interface Socket {
  tcp(this: void): SocketClient;
  udp(this: void): SocketClient;
}

declare interface SocketClient {
  connect(
    host: string,
    port: int,
  ): LuaMultiReturn<[returnCode: int, errMsg: string]>;
  receive(): LuaMultiReturn<[data: string | undefined, errMsg: string]>;
  send(
    msg: string,
  ): LuaMultiReturn<[sentBytes: int | undefined, errMsg: string]>;
  settimeout(timeout: int): void;
}
