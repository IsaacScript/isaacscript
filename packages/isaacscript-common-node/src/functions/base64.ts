/** Helper function to decode a base64-encoded string to a utf8 string. */
export function decodeBase64(base64String: string): string {
  const buffer = Buffer.from(base64String, "base64");
  return buffer.toString("utf8");
}
