import type {
  CollectibleType,
  ItemConfigTag,
} from "isaac-typescript-definitions";

declare global {
  interface ItemConfig extends IsaacAPIClass {
    /** Returns whether the specified collectible can be rerolled. */
    CanRerollCollectible: (collectible: CollectibleType) => boolean;

    /** Returns an array of `ItemConfigItem` that match the specified tags. */
    GetTaggedItems: (
      tags: ItemConfigTag | BitFlags<ItemConfigTag>,
    ) => ItemConfigItem[];

    // IsValidTrinket seems to be commented out for some reason in the API yet is documented as
    // existing.
  }
}
