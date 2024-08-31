// `Buffer` only exists in Node.js.

/** Helper function to decode a base64-encoded string to a utf8 string. */
export function decodeBase64(base64String: string): string {
  const buffer = Buffer.from(base64String, "base64");
  return buffer.toString("utf8");
}

/** Helper function to encode a string into a base64-encoded string. */
export function encodeBase64(string: string): string {
  const buffer = Buffer.from(string);
  return buffer.toString("base64");
}
