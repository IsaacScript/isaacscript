import { ItemConfigCardType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

/** The set of all `ItemConfigCardType` values that are not a rune or special object. */
export const ITEM_CONFIG_CARD_TYPES_FOR_CARDS =
  new ReadonlySet<ItemConfigCardType>([
    ItemConfigCardType.TAROT, // 0
    ItemConfigCardType.SUIT, // 1
    // - ItemConfigCardType.RUNE (2)
    ItemConfigCardType.SPECIAL, // 3
    // - ItemConfigCardType.SPECIAL_OBJECT (4)
    ItemConfigCardType.TAROT_REVERSE, // 5
  ]);
