export const DEFAULT_TRANSFORMATION_NAME = "Unknown";

export const TRANSFORMATION_NAMES: { readonly [key in PlayerForm]: string } = {
  [PlayerForm.PLAYERFORM_GUPPY]: "Guppy", // 0
  [PlayerForm.PLAYERFORM_LORD_OF_THE_FLIES]: "Beelzebub", // 1
  [PlayerForm.PLAYERFORM_MUSHROOM]: "Fun Guy", // 2
  [PlayerForm.PLAYERFORM_ANGEL]: "Seraphim", // 3
  [PlayerForm.PLAYERFORM_BOB]: "Bob", // 4
  [PlayerForm.PLAYERFORM_DRUGS]: "Spun", // 5
  [PlayerForm.PLAYERFORM_MOM]: "Yes Mother?", // 6
  [PlayerForm.PLAYERFORM_BABY]: "Conjoined", // 7
  [PlayerForm.PLAYERFORM_EVIL_ANGEL]: "Leviathan", // 8
  [PlayerForm.PLAYERFORM_POOP]: "Oh Crap", // 9
  [PlayerForm.PLAYERFORM_BOOK_WORM]: "Bookworm", // 10
  [PlayerForm.PLAYERFORM_ADULTHOOD]: "Adult", // 11
  [PlayerForm.PLAYERFORM_SPIDERBABY]: "Spider Baby", // 12
  [PlayerForm.PLAYERFORM_STOMPY]: "Stompy", // 13
  [PlayerForm.PLAYERFORM_FLIGHT]: "Flight", // 14
  [PlayerForm.NUM_PLAYER_FORMS]: DEFAULT_TRANSFORMATION_NAME,
};
