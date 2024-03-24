import type {
  CollectibleType,
  ItemConfigTag,
  TrinketType,
} from "isaac-typescript-definitions";

declare global {
  interface ItemConfig extends IsaacAPIClass {
    /** Returns whether the specified collectible can be rerolled. */
    CanRerollCollectible: (collectible: CollectibleType) => boolean;

    /** Returns an array of `ItemConfigItem` that match the specified tags. */
    GetTaggedItems: (tags: BitFlags<ItemConfigTag>) => ItemConfigItem[];

    IsValidTrinket: (trinketType: TrinketType) => boolean;
  }
}
