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
    GetTaggedItems: (
      tags: ItemConfigTag | BitFlags<ItemConfigTag>,
    ) => ItemConfigItem[];

    /**
     * Returns whether the trinket is valid.
     *
     * @see https://github.com/TeamREPENTOGON/REPENTOGON/blob/db50daa92ff366565c699bf09641e8c5b9b2449c/repentogon/LuaInterfaces/LuaItemConfig.cpp#L241-L246
     * @see https://repentogon.com/ItemConfig.html?h=ItemConfig#isvalidtrinket
     * @deprecated Not currently exposed to Lua (hook commented out upstream), despite being
     *             documented.
     */
    IsValidTrinket: (trinketType: TrinketType) => boolean;
  }
}
