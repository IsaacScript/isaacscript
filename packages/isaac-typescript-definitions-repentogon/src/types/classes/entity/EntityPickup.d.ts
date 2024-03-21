import type {
  CollectiblePedestalType,
  CollectibleType,
} from "isaac-typescript-definitions";

declare global {
  interface EntityPickup extends Entity {
    /** Adds a collectible to the cycle, if the pickup is a pedestal. */
    AddCollectibleCycle: (collectible: CollectibleType) => boolean;

    /** Returns whether the pickup can be rerolled. */
    CanReroll: () => boolean;

    GetAlternatePedestal: () => int;

    /**
     * Returns an array of all of the collectibles being used in the pickup's collectible cycle, if
     * it is a pedestal.
     */
    GetCollectibleCycle: () => CollectibleType[];

    GetDropDelay: () => int;

    /** Returns sprite used by the pickup's price label. */
    GetPriceSprite: () => Sprite;

    GetVarData: () => int;

    /**
     * Returns whether the collectible is hidden or not.
     *
     * This method does not account for Curse of the Blind, it only reflects the blind state of
     * pickups that are normally blind without curses involved, such as the extra item in the alt
     * path treasure rooms.
     */
    IsBlind: () => boolean;

    MakeShopItem: (shopItemID: int) => void;
    RemoveCollectibleCycle: () => void;

    /** Sets the graphics of the item pedestal. Does nothing if the pickup is not a collectible. */
    SetAlternatePedestal: (pedestalType: CollectiblePedestalType) => void;

    SetDropDelay: (delay: int) => void;

    /**
     * Hides the collectible on the pedestal similarly to Curse of the Blind. Does nothing if the
     * pickup is not a collectible.
     */
    SetForceBlind: (blind: boolean) => void;

    SetNewOptionsIndex: () => int;

    /**
     * Attempts to flip the collectible, akin to using the Flip collectible.
     *
     * Returns true if successful. Returns false if flipping the collectible failed or the pickup is
     * not a pedestal.
     */
    TryFlip: () => boolean;

    TryInitOptionCycle: (numCycle: int) => boolean;

    /**
     * Attempts to remove the collectible from the pedestal.
     *
     * Returns true if the collectible was successfully removed. Returns false if the pedestal is
     * already empty or the pickup is not a collectible.
     */
    TryRemoveCollectible: () => boolean;
  }

  namespace EntityPickup {
    /**
     * @param position
     * @param rng Optional. Default is undefined.
     * @param velocityType Optional. Default is 0.
     */
    function GetRandomPickupVelocity(
      position: Vector,
      rng: RNG,
      velocityType: int,
    ): Vector;
  }
}
