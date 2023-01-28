import { PlayerForm } from "isaac-typescript-definitions";

export const TRANSFORMATION_NAMES = {
  [PlayerForm.GUPPY]: "Guppy", // 0
  [PlayerForm.BEELZEBUB]: "Beelzebub", // 1
  [PlayerForm.FUN_GUY]: "Fun Guy", // 2
  [PlayerForm.SERAPHIM]: "Seraphim", // 3
  [PlayerForm.BOB]: "Bob", // 4
  [PlayerForm.SPUN]: "Spun", // 5
  [PlayerForm.YES_MOTHER]: "Yes Mother?", // 6
  [PlayerForm.CONJOINED]: "Conjoined", // 7
  [PlayerForm.LEVIATHAN]: "Leviathan", // 8
  [PlayerForm.OH_CRAP]: "Oh Crap", // 9
  [PlayerForm.BOOKWORM]: "Bookworm", // 10
  [PlayerForm.ADULT]: "Adult", // 11
  [PlayerForm.SPIDER_BABY]: "Spider Baby", // 12
  [PlayerForm.STOMPY]: "Stompy", // 13
} as const satisfies Record<PlayerForm, string>;
