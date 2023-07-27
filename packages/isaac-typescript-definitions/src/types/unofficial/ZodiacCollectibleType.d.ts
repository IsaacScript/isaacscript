import type { CollectibleType } from "../../enums/collections/subTypes";

declare global {
  type ZodiacCollectibleType =
    | CollectibleType.CANCER
    | CollectibleType.ARIES
    | CollectibleType.LEO
    | CollectibleType.SCORPIO
    | CollectibleType.AQUARIUS
    | CollectibleType.PISCES
    | CollectibleType.TAURUS
    | CollectibleType.GEMINI
    | CollectibleType.CAPRICORN
    | CollectibleType.SAGITTARIUS
    | CollectibleType.LIBRA
    | CollectibleType.VIRGO;
}
