/**
 * The distance of the laser when Azazel does not have any range up items yet.
 * For more info, see the documentation for the `getAzazelBrimstoneDistance()` function.
 */
export const AZAZEL_DEFAULT_BRIMSTONE_DISTANCE = 75.125;

/**
 * The path to the png file for collectible items during Curse of the Blind, making them appear with
 * a red question mark.
 */
export const BLIND_ITEM_PNG_PATH = "gfx/items/collectibles/questionmark.png";

/** Bombs explode when their frame count is equal to this value. */
export const BOMB_EXPLODE_FRAME = 45;

export const CHARACTERS_WITH_AN_ACTIVE_ITEM = new Set<PlayerType>([
  PlayerType.PLAYER_ISAAC, // 0
  PlayerType.PLAYER_MAGDALENE, // 1
  PlayerType.PLAYER_JUDAS, // 3
  PlayerType.PLAYER_BLUEBABY, // 4
  PlayerType.PLAYER_EVE, // 5
  PlayerType.PLAYER_EDEN, // 9
  PlayerType.PLAYER_THELOST, // 10
  PlayerType.PLAYER_LILITH, // 13
  PlayerType.PLAYER_KEEPER, // 14
  PlayerType.PLAYER_APOLLYON, // 15
  PlayerType.PLAYER_EDEN_B, // 30
]);

export const CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART =
  new Set<PlayerType>([
    PlayerType.PLAYER_BLACKJUDAS, // 12
    PlayerType.PLAYER_JUDAS_B, // 24
  ]);

export const CHARACTERS_WITH_FREE_DEVIL_DEALS = new Set<PlayerType>([
  PlayerType.PLAYER_THELOST,
  PlayerType.PLAYER_THELOST_B,
  PlayerType.PLAYER_JACOB2_B,
]);

/**
 * The set of characters where red heart containers will be turned into soul hearts (e.g. Blue
 * Baby). This includes The Lost and Tainted Lost. This does not include Keeper or Tainted Keeper.
 */
export const CHARACTERS_WITH_NO_RED_HEARTS = new Set<PlayerType>([
  PlayerType.PLAYER_BLUEBABY, // 4
  PlayerType.PLAYER_THELOST, // 10
  PlayerType.PLAYER_BLACKJUDAS, // 12
  PlayerType.PLAYER_JUDAS_B, // 24
  PlayerType.PLAYER_BLUEBABY_B, // 25
  PlayerType.PLAYER_THELOST_B, // 31
  PlayerType.PLAYER_THEFORGOTTEN_B, // 35
  PlayerType.PLAYER_BETHANY_B, // 36
]);

/**
 * The set of characters where soul hearts will be automatically stripped away (e.g. Bethany). This
 * includes The Lost and Tainted Lost.
 */
export const CHARACTERS_WITH_NO_SOUL_HEARTS = new Set<PlayerType>([
  PlayerType.PLAYER_THELOST, // 10
  PlayerType.PLAYER_KEEPER, // 14
  PlayerType.PLAYER_BETHANY, // 18
  PlayerType.PLAYER_THELOST_B, // 31
  PlayerType.PLAYER_KEEPER_B, // 33
]);

/**
 * A collection of common colors that can be reused. Note that if you want to further modify these
 * colors, you should copy them first with the `copyColor` function.
 */
export const COLORS = {
  Black: Color(1, 1, 1),
  Red: Color(1, 0, 0),
  Green: Color(0, 1, 0),
  Blue: Color(0, 0, 1),
  Yellow: Color(1, 1, 0),
  Pink: Color(1, 0, 1),
  Cyan: Color(0, 1, 1),
  White: Color(1, 1, 1),
};

export const DEFAULT_ITEM_POOL_TYPE = ItemPoolType.POOL_TREASURE;

/** This is also the distance that a player spawns from the door that they enter a room from. */
export const DISTANCE_OF_GRID_TILE = 40;

export const DOOR_HITBOX_DISTANCE = 11;

/**
 * When Eggies take fatal damage, they go into NpcState.STATE_SUICIDE and spawn 14 Swarm Spiders
 * while their StateFrame ticks upwards. The 14th spider appears when the StateFrame is at this
 * value.
 */
export const EGGY_STATE_FRAME_OF_FINAL_SPIDER = 45;

/**
 * A non-existent or completely transparent PNG file for use in clearing sprites. For more
 * information, see the documentation for the `clearSprite()` helper function.
 */
export const EMPTY_PNG_PATH = "gfx/none.png";

export const FAMILIARS_THAT_SHOOT_PLAYER_TEARS = new Set([
  FamiliarVariant.SCISSORS,
  FamiliarVariant.INCUBUS,
  FamiliarVariant.FATES_REWARD,
  FamiliarVariant.SPRINKLER,
  FamiliarVariant.LOST_SOUL,
  FamiliarVariant.TWISTED_BABY,
  FamiliarVariant.BLOOD_BABY,
  FamiliarVariant.DECAP_ATTACK,
]);

/** As of Repentance, the final stage is floor 13 (which is the Home floor). */
export const FINAL_STAGE = LevelStage.NUM_STAGES - 1;

/**
 * The random items that appear when the player has TMTRAINER are generated on the fly as they are
 * encountered by the player. The first TMTRAINER item takes the final possible 32 bit number. The
 * second TMTRAINER item subtracts one from that, and so on.
 */
export const FIRST_GLITCHED_COLLECTIBLE_TYPE = (1 << 32) - 1;

export const GENESIS_ROOM_VARIANT = -1;
export const GENESIS_ROOM_SUBTYPE = -1;
export const GOLDEN_TRINKET_SHIFT = 1 << 15;
export const GRID_INDEX_CENTER_OF_1X1_ROOM = 67;
export const GAME_FRAMES_PER_SECOND = 30;
export const ISAAC_FRAMES_PER_SECOND = 60;

/**
 * This is the set of characters that look like The Lost and play the "LostDeath" animation when
 * they die.
 */
export const LOST_STYLE_PLAYER_TYPES = new Set([
  PlayerType.PLAYER_THELOST, // 10
  PlayerType.PLAYER_THESOUL, // 17
  PlayerType.PLAYER_THELOST_B, // 31
  PlayerType.PLAYER_JACOB2_B, // 39
  PlayerType.PLAYER_THESOUL_B, // 40
]);

/** In a 2x2 room, there can be 8 doors. */
export const MAX_NUM_DOORS = 8;

/**
 * The game has a limit on the number of currently spawned familiars and will refuse to spawn any
 * more if it reaches the limit. Blue flies and blue spiders have a lower priority and will be
 * deleted to make room for other familiars.
 */
export const MAX_NUM_FAMILIARS = 64;

/** The game can only handle up to four different players. */
export const MAX_NUM_INPUTS = 4;

/** With Birthright, it is possible for Magdalene to have 18 heart containers. */
export const MAX_PLAYER_HEART_CONTAINERS = 18;

export const MAX_PLAYER_POCKET_ITEM_SLOTS = 4;

/**
 * As the player continues to move in a direction, they will accelerate. When going from one wall to
 * another in a 2x2 room at 2.0 speed (the maximum that the speed stat can rise to), the amount of
 * units moved per update frame will climb to around 9.797 as they hit the opposite wall. The
 * constant specifies a value of 9.8 to be safe.
 */
export const MAX_PLAYER_SPEED_IN_UNITS = 9.8;

export const MAX_PLAYER_TRINKET_SLOTS = 2;

/**
 * The floor is represented by a 13x13 grid. Room indexes start at 0. The first row is represented
 * by grid indexes from 0 to 12. The second row is represented by grid indexes from 13 to 25, and so
 * on. The maximum room index possible is 168. (It is not 169 because we start at 0 instead of 1.)
 */
export const MAX_ROOM_INDEX = 168;

export const MAX_VANILLA_CHARACTER = PlayerType.PLAYER_THESOUL_B;
export const MAX_VANILLA_COLLECTIBLE_TYPE =
  CollectibleType.COLLECTIBLE_MOMS_RING;

export const SECOND_IN_MILLISECONDS = 1000;
export const MINUTE_IN_MILLISECONDS = 60 * SECOND_IN_MILLISECONDS;

export const MOVEMENT_ACTIONS = new Set<ButtonAction>([
  ButtonAction.ACTION_LEFT, // 0
  ButtonAction.ACTION_RIGHT, // 1
  ButtonAction.ACTION_UP, // 2
  ButtonAction.ACTION_DOWN, // 3
]);

export const ONE_BY_ONE_ROOM_GRID_SIZE = 135;

export const SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES = new Set<CollectibleType>([
  CollectibleType.COLLECTIBLE_FORGET_ME_NOW, // 127
  CollectibleType.COLLECTIBLE_EDENS_SOUL, // 490
  CollectibleType.COLLECTIBLE_ALABASTER_BOX, // 585
  CollectibleType.COLLECTIBLE_PLAN_C, // 475
  CollectibleType.COLLECTIBLE_MAMA_MEGA, // 483
  CollectibleType.COLLECTIBLE_SACRIFICIAL_ALTAR, // 536
  CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE, // 628
  CollectibleType.COLLECTIBLE_R_KEY, // 636
]);

export const SHOOTING_ACTIONS = new Set<ButtonAction>([
  ButtonAction.ACTION_SHOOTLEFT, // 4
  ButtonAction.ACTION_SHOOTRIGHT, // 5
  ButtonAction.ACTION_SHOOTUP, // 6
  ButtonAction.ACTION_SHOOTDOWN, // 7
]);

export const STORY_BOSSES = new Set<EntityType>([
  EntityType.ENTITY_MOM, // 45
  EntityType.ENTITY_MOMS_HEART, // 78
  EntityType.ENTITY_SATAN, // 84
  EntityType.ENTITY_ISAAC, // 102
  EntityType.ENTITY_THE_LAMB, // 273
  EntityType.ENTITY_MEGA_SATAN, // 274
  EntityType.ENTITY_MEGA_SATAN_2, // 275
  EntityType.ENTITY_ULTRA_GREED, // 406
  EntityType.ENTITY_HUSH, // 407
  EntityType.ENTITY_DELIRIUM, // 412
  EntityType.ENTITY_MOTHER, // 912
  EntityType.ENTITY_DOGMA, // 950
  EntityType.ENTITY_BEAST, // 951
]);

/**
 * This is the number of draw coordinates that each heart spans on the UI in the upper left hand
 * corner.
 */
export const UI_HEART_WIDTH = 12;
