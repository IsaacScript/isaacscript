declare module "json" {
  let encode: (this: void, data: unknown) => string;
  let decode: (this: void, data: string) => unknown;
}
