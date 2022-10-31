import { logError } from "./logMisc";

const HEX_STRING_LENGTH = 6;

/**
 * Converts a hex string like "#33aa33" to a KColor object.
 *
 * @param hexString A hex string like "#ffffff" or "ffffff". (The "#" character is optional.)
 */
export function hexToColor(hexString: string, alpha: float): Color {
  const [r, g, b] = hexToRGB(hexString);

  // Color values should be between 0 and 1.
  const base = 255;
  return Color(r / base, g / base, b / base, alpha);
}

/**
 * Converts a hex string like "#33aa33" to a Color object.
 *
 * @param hexString A hex string like "#ffffff" or "ffffff". (The "#" character is optional.)
 */
export function hexToKColor(hexString: string, alpha: float): KColor {
  const [r, g, b] = hexToRGB(hexString);

  // KColor values should be between 0 and 1.
  const base = 255;
  return KColor(r / base, g / base, b / base, alpha);
}

function hexToRGB(hexString: string): [r: float, g: float, b: float] {
  hexString = hexString.replace("#", "");
  if (hexString.length !== HEX_STRING_LENGTH) {
    logError(`Hex strings must be of length: ${HEX_STRING_LENGTH}`);
    return [0, 0, 0];
  }

  const rString = hexString.substring(0, 2);
  const r = tonumber(`0x${rString}`);
  if (r === undefined) {
    logError(`Failed to convert \`0x${rString}\` to a number.`);
    return [0, 0, 0];
  }

  const gString = hexString.substring(2, 4);
  const g = tonumber(`0x${gString}`);
  if (g === undefined) {
    logError(`Failed to convert \`0x${gString}\` to a number.`);
    return [0, 0, 0];
  }

  const bString = hexString.substring(4, 6);
  const b = tonumber(`0x${bString}`);
  if (b === undefined) {
    logError(`Failed to convert \`0x${bString}\` to a number.`);
    return [0, 0, 0];
  }

  return [r, g, b];
}
