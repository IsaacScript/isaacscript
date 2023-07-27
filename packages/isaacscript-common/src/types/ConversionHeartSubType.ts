import type { HeartSubType } from "isaac-typescript-definitions";

/**
 * This is the type that is fed to `registerCharacterHealthConversion` helper function to signify
 * the kind of health conversion that is desired.
 */
export type ConversionHeartSubType = HeartSubType.SOUL | HeartSubType.BLACK;
