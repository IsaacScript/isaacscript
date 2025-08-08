/**
 * This is the Racing+ sandbox provided by the Electron client.
 *
 * @noSelf
 * @see https://isaacracing.net/
 */
declare interface Sandbox {
  connect: (
    hostname: string,
    port: int,
    useTCP: boolean,
  ) => SocketClient | undefined;
  connectLocalhost: (port: int, useTCP: boolean) => SocketClient | undefined;
  getDate: (format?: string) => string;
  getParentFunctionDescription: (levels: int) => string;
  getTime: () => float;
  getTraceback: () => string;
  init: () => void;
  isSocketInitialized: () => boolean;
  traceback: () => void;
}
