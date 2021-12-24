// This is the Racing+ sandbox provided by the Electron client

/** @noSelf */
declare interface Sandbox {
  connect(hostname: string, port: int, useTCP: boolean): SocketClient;
  connectLocalhost(port: int, useTCP: boolean): SocketClient;
  getDate(format?: string): string;
  getParentFunctionDescription(levels: int): string;
  getTraceback(): string;
  init(): void;
  isSocketInitialized(): boolean;
  traceback(): void;
}
