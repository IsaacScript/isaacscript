import { CollectibleType } from "../../enums/collections/subTypes";

declare global {
  type ZodiacCollectibles =
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
