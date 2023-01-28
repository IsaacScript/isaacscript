import { ItemConfigCardType } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

/** The set of all `ItemConfigCardType` values that are not a rune or special object. */
export const ITEM_CONFIG_CARD_TYPES_FOR_CARDS_SET =
  new ReadonlySet<ItemConfigCardType>([
    ItemConfigCardType.TAROT,
    ItemConfigCardType.SUIT,
    ItemConfigCardType.SPECIAL,
    ItemConfigCardType.TAROT_REVERSE,
  ]);
