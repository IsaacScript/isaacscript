declare module "json" {
  function encode(this: void, data: unknown): string;
  function decode(this: void, data: string): unknown;
}
