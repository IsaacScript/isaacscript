/** @noSelf */
declare module "sandbox" {
  function init(): void;
  function isSocketInitialized(): boolean;
  function connect(hostname: string, port: int, useTCP: boolean): SocketClient;
  function connectLocalhost(port: int, useTCP: boolean): SocketClient;
  function traceback(): void;
  function getTraceback(): string;
  function getParentFunctionDescription(levels: int): string;
}
