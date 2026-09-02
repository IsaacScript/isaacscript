/**
 * This is the Racing+ sandbox provided by the Electron client.
 *
 * @noSelf
 * @see https://isaacracing.net/
 */
declare interface Sandbox {
  readonly connect: (
    hostname: string,
    port: int,
    useTCP: boolean,
  ) => SocketClient | undefined;
  readonly connectLocalhost: (
    port: int,
    useTCP: boolean,
  ) => SocketClient | undefined;
  readonly getDate: (format?: string) => string;
  readonly getParentFunctionDescription: (levels: int) => string;
  readonly getTime: () => float;
  readonly getTraceback: () => string;
  readonly init: () => void;
  readonly isSocketInitialized: () => boolean;
  readonly traceback: () => void;
}
