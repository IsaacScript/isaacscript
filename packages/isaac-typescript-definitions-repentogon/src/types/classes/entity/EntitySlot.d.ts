import type { CollectibleType } from "isaac-typescript-definitions";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare global {
  interface EntitySlot extends Entity {
    /** Forces the slot to drop what it typically would drop if blown up. */
    CreateDropsFromExplosion: () => void;

    GetDonationValue: () => int;
    GetPrizeType: () => int;
    GetState: () => int;
    GetTimeout: () => int;

    /** Returns how many frames a player has been touching the slot. */
    GetTouch: () => int;

    RandomCoinJamAnim: () => string;
    SetDonationValue: (value: int) => void;

    /** Sets the prize collectible. Only used by Crane Game, Shell Game and Hell Game. */
    SetPrizeCollectible: (collectible: CollectibleType) => void;

    SetPrizeType: (prizeType: int) => void;
    SetState: (state: int) => void;
    SetTimeout: (timeout: int) => void;

    /** Sets how many frames a player has been touching the slot. */
    SetTouch: (duration: int) => void;
  }
}
