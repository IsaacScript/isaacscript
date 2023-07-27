/**
 * The "socket.lua" module exists at:
 *
 * ```text
 * C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\resources\scripts\socket.lua
 * ```
 *
 * It can only be used if the "--luadebug" launch option is enabled. For more information, see [the
 * wiki](https://bindingofisaacrebirth.fandom.com/wiki/Launch_Options).
 *
 * IsaacScript mods can import it like this:
 *
 * ```ts
 * let socket: Socket | null = null;
 * const [ok, requiredSocket] = pcall(require, "socket");
 * if (ok) {
 *   socket = requiredSocket as Socket;
 * } else {
 *   // The "--luadebug" launch option is not enabled. Handle the error case.
 * }
 * ```
 *
 * Also see the [documentation for the socket
 * library](https://web.tecgraf.puc-rio.br/luasocket/old/luasocket-2.0-beta/tcp.html).
 *
 * @noSelf
 */
declare interface Socket {
  /**
   * Returns the epoch timestamp in seconds, with four decimal places of precision (e.g.
   * `1640320492.5779`).
   */
  gettime: () => float;

  /**
   * Creates and returns a TCP master object. A master object can be transformed into a server
   * object with the method listen (after a call to bind) or into a client object with the method
   * connect. The only other method supported by a master object is the close method.
   *
   * In case of success, a new master object is returned. In case of error, nil is returned,
   * followed by an error message.
   */
  tcp: () => SocketClient;

  /**
   * Creates and returns an unconnected UDP object. Unconnected objects support the sendto, receive,
   * receivefrom, getsockname, setoption, settimeout, setpeername, setsockname, and close. The
   * setpeername is used to connect the object.
   *
   * In case of success, a new unconnected UDP object returned. In case of error, nil is returned,
   * followed by an error message.
   */
  udp: () => SocketClient;
}

declare interface SocketClient {
  /**
   * Closes a TCP object. The internal socket used by the object is closed and the local address to
   * which the object was bound is made available to other applications. No further operations
   * (except for further calls to the close method) are allowed on a closed socket.
   */
  close: () => void;

  /**
   * Attempts to connect a master object to a remote host, transforming it into a client object.
   * Client objects support methods `send`, `receive`, `getsockname`, `getpeername`, `settimeout`,
   * and close.
   *
   * Address can be an IP address or a host name. Port must be an integer number.
   *
   * In case of error, the method returns undefined followed by a string describing the error. In
   * case of success, the method returns 1.
   */
  connect: (
    host: string,
    port: int,
  ) => LuaMultiReturn<[returnCode: int, errMsg: string]>;

  /**
   * Reads data from a client object, according to the specified read pattern. Patterns follow the
   * Lua file I/O format, and the difference in performance between all patterns is negligible.
   *
   * Pattern can be any of the following:
   *
   * - '*a': reads from the socket until the connection is closed. No end-of-line translation is
   *   performed.
   * - '*l': reads a line of text from the socket. The line is terminated by a LF character (ASCII
   *   10), optionally preceded by a CR character (ASCII 13). The CR and LF characters are not
   *   included in the returned line. In fact, all CR characters are ignored by the pattern. This is
   *   the default pattern.
   * - number: causes the method to read a specified number of bytes from the socket.
   *
   * Prefix is an optional string to be concatenated to the beginning of any received data before
   * return.
   *
   * If successful, the method returns the received pattern. In case of error, the method returns
   * undefined followed by an error message which can be the string "closed" in case the connection
   * was closed before the transmission was completed or the string "timeout" in case there was a
   * timeout during the operation. Also, after the error message, the function returns the partial
   * result of the transmission.
   */
  receive: () => LuaMultiReturn<[data: string | undefined, errMsg: string]>;

  /**
   * Sends data through client object.
   *
   * Data is the string to be sent. The optional arguments i and j work exactly like the standard
   * string.sub Lua function to allow the selection of a substring to be sent.
   *
   * If successful, the method returns the index of the last byte within [i, j] that has been sent.
   * Notice that, if i is 1 or absent, this is effectively the total number of bytes sent. In case
   * of error, the method returns undefined, followed by an error message, followed by the index of
   * the last byte within [i, j] that has been sent. You might want to try again from the byte
   * following that. The error message can be "closed" in case the connection was closed before the
   * transmission was completed or the string 'timeout' in case there was a timeout during the
   * operation.
   */
  send: (
    msg: string,
  ) => LuaMultiReturn<[sentBytes: int | undefined, errMsg: string]>;

  /**
   * Changes the peer of a UDP object. This method turns an unconnected UDP object into a connected
   * UDP object or vice versa.
   *
   * For connected objects, outgoing datagrams will be sent to the specified peer, and datagrams
   * received from other peers will be discarded by the OS. Connected UDP objects must use the
   * `send` and `receive` methods instead of `sendto` and `receivefrom`.
   *
   * Address can be an IP address or a host name. Port is the port number. If address is "*" and the
   * object is connected, the peer association is removed and the object becomes an unconnected
   * object again. In that case, the port argument is ignored.
   *
   * In case of error the method returns undefined followed by an error message. In case of success,
   * the method returns 1.
   */
  setpeername: (
    host: string,
    port: int,
  ) => LuaMultiReturn<[returnCode: int, errMsg: string]>;

  /**
   * Changes the timeout values for the object. By default, all I/O operations are blocking. That
   * is, any call to the methods send, receive, and accept will block indefinitely, until the
   * operation completes. The settimeout method defines a limit on the amount of time the I/O
   * methods can block. When a timeout is set and the specified amount of time has elapsed, the
   * affected methods give up and fail with an error code.
   *
   * The amount of time to wait is specified as the value parameter, in seconds. There are two
   * timeout modes and both can be used together for fine tuning:
   *
   * - 'b': block timeout. Specifies the upper limit on the amount of time LuaSocket can be blocked
   *   by the operating system while waiting for completion of any single I/O operation. This is the
   *   default mode.
   * - 't': total timeout. Specifies the upper limit on the amount of time LuaSocket can block a Lua
   *   script before returning from a call.
   *
   * The nil timeout value allows operations to block indefinitely. Negative timeout values have the
   * same effect.
   */
  settimeout: (timeout: int) => void;
}
