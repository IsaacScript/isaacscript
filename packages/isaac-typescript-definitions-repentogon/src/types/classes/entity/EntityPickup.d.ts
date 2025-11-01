import type {
  CollectiblePedestalType,
  CollectibleType,
} from "isaac-typescript-definitions";

declare global {
  interface EntityPickup extends Entity {
    /** Adds a collectible to the cycle if the pickup is a collectible pedestal. */
    AddCollectibleCycle: (collectible: CollectibleType) => boolean;

    /** Returns whether the pickup can be rerolled. */
    CanReroll: () => boolean;

    /** Returns the pickup's `CollectiblePedestalType`. */
    GetAlternatePedestal: () => CollectiblePedestalType;

    /**
     * Returns an array of all of the collectibles being used in the pickup's collectible cycle, if
     * it is a pedestal.
     */
    GetCollectibleCycle: () => CollectibleType[];

    /** Returns the pickup's drop delay. */
    GetDropDelay: () => int;

    /**
     * Returns the pickup's flipped collectible. Returns undefined if it does not have a flipped
     * collectible.
     */
    GetFlipCollectible: () => CollectibleType | undefined;

    /**
     * Returns a read-only version of the pickup's `LootList`.
     *
     * @param shouldAdvance Optional. Default is false.
     */
    GetLootList: (shouldAdvance?: boolean) => Readonly<LootList>;

    GetMegaChestLeftCollectible: () => EntityPickup | undefined;
    GetMegaChestOtherCollectible: () => LuaMultiReturn<
      [otherCollectible: EntityPickup | undefined, isRight: boolean | undefined]
    >;
    GetMegaChestRightCollectible: () => EntityPickup | undefined;

    /**
     * Returns the ghost effect that is visible if a player has Guppy's Eye. Returns undefined if
     * the ghost isn't visible.
     */
    GetPickupGhost: () => EntityEffect | undefined;

    /** Returns sprite used by the pickup's price label. */
    GetPriceSprite: () => Sprite;

    /** Returns the pickup's `VarData`. */
    GetVarData: () => int;

    HasFlipData: () => boolean;

    /**
     * @param collectible Optional. Default is `CollectibleType.COLLECTIBLE_NULL`.
     * @param loadGraphics Optional. Default is true.
     */
    InitFlipState: (
      collectible?: CollectibleType,
      loadGraphics?: boolean,
    ) => void;

    /**
     * Returns whether the collectible is hidden or not.
     *
     * This method does not account for Curse of the Blind, it only reflects the blind state of
     * pickups that are normally blind without curses involved, such as the extra item in the alt
     * path treasure rooms.
     *
     * @param checkForcedBlindOnly Optional. Default is true.
     */
    IsBlind: (checkForcedBlindOnly?: boolean) => boolean;

    /** Turns the pickup into a shop item, automatically assigning its price. */
    MakeShopItem: (shopItemID: int) => void;

    /** Stops the collectible cycle if the pickup is a collectible pedestal. */
    RemoveCollectibleCycle: () => void;

    /** Sets the graphics of the item pedestal. Does nothing if the pickup is not a collectible. */
    SetAlternatePedestal: (pedestalType: CollectiblePedestalType) => void;

    /** Sets the pickup's drop delay. */
    SetDropDelay: (delay: int) => void;

    /**
     * Hides the collectible on the pedestal similarly to Curse of the Blind. Does nothing if the
     * pickup is not a collectible.
     */
    SetForceBlind: (blind: boolean) => void;

    /** Sets the pickup's Options index and returns the new pickup index. */
    SetNewOptionsPickupIndex: () => int;

    SetVarData: (varData: int) => void;

    /**
     * Triggers the effect of the "Theres Options" collectible and removes all pickups in the room
     * with the same `OptionsPickupIndex` as this pickup.
     */
    TriggerTheresOptionsPickup: () => void;

    /**
     * Attempts to flip the collectible, akin to using the Flip collectible.
     *
     * Returns true if successful. Returns false if flipping the collectible failed or the pickup is
     * not a pedestal.
     */
    TryFlip: () => boolean;

    /**
     * Causes the pedestal to start cycling through the provided amount of collectibles, including
     * its own collectible type.
     */
    TryInitOptionCycle: (numCycle: int) => boolean;

    /**
     * Attempts to remove the collectible from the pedestal.
     *
     * Returns true if the collectible was successfully removed. Returns false if the pedestal is
     * already empty or the pickup is not a collectible.
     */
    TryRemoveCollectible: () => boolean;

    /** Updates the ghost entity effect in accordance to the pickup's `LootList`. */
    UpdatePickupGhosts: () => void;
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
