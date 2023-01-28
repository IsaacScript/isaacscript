import { PlayerForm } from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

/** Maps transformation names to the values of the `PlayerForm` enum. */
export const TRANSFORMATION_NAME_TO_PLAYER_FORM_MAP = new ReadonlyMap<
  string,
  PlayerForm
>([
  ["guppy", PlayerForm.GUPPY], // 0
  ["cat", PlayerForm.GUPPY], // 0
  ["beelzebub", PlayerForm.BEELZEBUB], // 1
  ["fly", PlayerForm.BEELZEBUB], // 1
  ["funGuy", PlayerForm.FUN_GUY], // 2
  ["mushroom", PlayerForm.FUN_GUY], // 2
  ["seraphim", PlayerForm.SERAPHIM], // 3
  ["angel", PlayerForm.SERAPHIM], // 3
  ["bob", PlayerForm.BOB], // 4
  ["poison", PlayerForm.BOB], // 4
  ["spun", PlayerForm.SPUN], // 5
  ["drugs", PlayerForm.SPUN], // 5
  ["needles", PlayerForm.SPUN], // 5
  ["yesMother", PlayerForm.YES_MOTHER], // 6
  ["mother", PlayerForm.YES_MOTHER], // 6
  ["mom", PlayerForm.YES_MOTHER], // 6
  ["conjoined", PlayerForm.CONJOINED], // 7
  ["triple", PlayerForm.CONJOINED], // 7
  ["leviathan", PlayerForm.LEVIATHAN], // 8
  ["devil", PlayerForm.LEVIATHAN], // 8
  ["ohCrap", PlayerForm.OH_CRAP], // 9
  ["crap", PlayerForm.OH_CRAP], // 9
  ["poop", PlayerForm.OH_CRAP], // 9
  ["bookWorm", PlayerForm.BOOKWORM], // 10
  ["adult", PlayerForm.ADULT], // 11
  ["spiderBaby", PlayerForm.SPIDER_BABY], // 12
  ["stompy", PlayerForm.STOMPY], // 13
]);
