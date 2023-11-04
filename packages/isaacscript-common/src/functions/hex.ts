import { logError } from "./log";

const HEX_STRING_LENGTH = 6;

/**
 * Converts a hex string like "#33aa33" to a KColor object.
 *
 * @param hexString A hex string like "#ffffff" or "ffffff". (The "#" character is optional.)
 * @param alpha Optional. Range is from 0 to 1. Default is 1. (The same as the `Color` constructor.)
 */
export function hexToColor(hexString: string, alpha = 1): Readonly<Color> {
  const { r, g, b } = hexToRGB(hexString);

  // Color values should be between 0 and 1.
  const base = 255;
  return Color(r / base, g / base, b / base, alpha);
}

/**
 * Converts a hex string like "#33aa33" to a Color object.
 *
 * @param hexString A hex string like "#ffffff" or "ffffff". (The "#" character is optional.)
 * @param alpha Range is from 0 to 1. Default is 1.
 */
export function hexToKColor(hexString: string, alpha = 1): Readonly<KColor> {
  const { r, g, b } = hexToRGB(hexString);

  // KColor values should be between 0 and 1.
  const base = 255;
  return KColor(r / base, g / base, b / base, alpha);
}

function hexToRGB(hexString: string): { r: float; g: float; b: float } {
  hexString = hexString.replace("#", "");
  if (hexString.length !== HEX_STRING_LENGTH) {
    logError(`Hex strings must be of length: ${HEX_STRING_LENGTH}`);
    return { r: 0, g: 0, b: 0 };
  }

  const rString = hexString.slice(0, 2);
  const r = tonumber(`0x${rString}`);
  if (r === undefined) {
    logError(`Failed to convert \`0x${rString}\` to a number.`);
    return { r: 0, g: 0, b: 0 };
  }

  const gString = hexString.slice(2, 4);
  const g = tonumber(`0x${gString}`);
  if (g === undefined) {
    logError(`Failed to convert \`0x${gString}\` to a number.`);
    return { r: 0, g: 0, b: 0 };
  }

  const bString = hexString.slice(4, 6);
  const b = tonumber(`0x${bString}`);
  if (b === undefined) {
    logError(`Failed to convert \`0x${bString}\` to a number.`);
    return { r: 0, g: 0, b: 0 };
  }

  return { r, g, b };
}
