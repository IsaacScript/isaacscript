declare module "json" {
  let decode: (this: void, data: string) => unknown;
  let encode: (this: void, data: unknown) => string;
}
