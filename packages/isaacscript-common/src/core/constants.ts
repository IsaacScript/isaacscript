import {
  CollectibleType,
  Dimension,
  DisplayFlag,
  ItemPoolType,
  PickupVariant,
  PlayerType,
  TrinketSlot,
} from "isaac-typescript-definitions";
import { getEnumLength } from "../functions/enums";
import { addFlag } from "../functions/flag";
import {
  newReadonlyColor,
  newReadonlyKColor,
  newReadonlyVector,
} from "../functions/readOnly";
import { asCollectibleType } from "../functions/types";
import { eRange } from "../functions/utils";
import { ReadonlySet } from "../types/ReadonlySet";
import { NUM_NORMAL_PILL_COLORS } from "./constantsFirstLast";

/**
 * The combination of the following flags:
 * - `DisplayFlag.VISIBLE` (1 << 0)
 * - `DisplayFlag.SHADOW` (1 << 1)
 * - `DisplayFlag.SHOW_ICON` (1 << 2)
 */
export const ALL_DISPLAY_FLAGS = addFlag(
  DisplayFlag.VISIBLE,
  DisplayFlag.SHADOW,
  DisplayFlag.SHOW_ICON,
);

/**
 * The distance of the laser when Azazel does not have any range up items yet. For more info, see
 * the documentation for the `getAzazelBrimstoneDistance` function.
 */
export const AZAZEL_DEFAULT_BRIMSTONE_DISTANCE = 75.125;

/**
 * The path to the png file for collectible items during Curse of the Blind, making them appear with
 * a red question mark.
 */
export const BLIND_ITEM_PNG_PATH = "gfx/items/collectibles/questionmark.png";

/** Bombs explode when their frame count is equal to this value. */
export const BOMB_EXPLODE_FRAME = 45;

export const CHEST_PICKUP_VARIANTS = [
  PickupVariant.CHEST, // 50
  PickupVariant.BOMB_CHEST, // 51
  PickupVariant.SPIKED_CHEST, // 52
  PickupVariant.ETERNAL_CHEST, // 53
  PickupVariant.MIMIC_CHEST, // 54
  PickupVariant.OLD_CHEST, // 55
  PickupVariant.WOODEN_CHEST, // 56
  PickupVariant.MEGA_CHEST, // 57
  PickupVariant.HAUNTED_CHEST, // 58
  PickupVariant.LOCKED_CHEST, // 60
  PickupVariant.RED_CHEST, // 360
  PickupVariant.MOMS_CHEST, // 390
] as const;

export const CHEST_PICKUP_VARIANTS_SET = new ReadonlySet<PickupVariant>(
  CHEST_PICKUP_VARIANTS,
);

/** This is the initial value of the `EntityPickup.Wait` field after a collectible is spawned. */
export const COLLECTIBLE_INITIAL_WAIT = 20;

export const DEFAULT_ITEM_POOL_TYPE = ItemPoolType.TREASURE;

/** This is also the distance that a player spawns from the door that they enter a room from. */
export const DISTANCE_OF_GRID_TILE = 40;

export const DOGMA_ROOM_GRID_INDEX = 109;

export const DOOR_HITBOX_RADIUS = 11;

/**
 * When Eggies take fatal damage, they go into NPCState.STATE_SUICIDE and spawn 14 Swarm Spiders
 * while their StateFrame ticks upwards. The 14th spider appears when the StateFrame is at this
 * value.
 */
export const EGGY_STATE_FRAME_OF_FINAL_SPIDER = 45;

/**
 * A non-existent or completely transparent PNG file for use in clearing sprites. For more
 * information, see the documentation for the `clearSprite` helper function.
 */
export const EMPTY_PNG_PATH = "gfx/none.png";

/**
 * The random items that appear when the player has TMTRAINER are generated on the fly as they are
 * encountered by the player. The first TMTRAINER item takes the final possible 32 bit number. The
 * second TMTRAINER item subtracts one from that, and so on.
 *
 * This is equal to 4294967295.
 */

export const FIRST_GLITCHED_COLLECTIBLE_TYPE = asCollectibleType((1 << 32) - 1);

/**
 * An array containing every flying character. This includes non-main characters such as The Soul.
 */
export const FLYING_CHARACTERS = [
  PlayerType.AZAZEL, // 7
  PlayerType.LOST, // 10
  PlayerType.SOUL, // 17
  PlayerType.LOST_B, // 31
  PlayerType.JACOB_2_B, // 39
  PlayerType.SOUL_B, // 40
] as const;

/** Game frames are what is returned by the `Game.GetFrameCount` method. */
export const GAME_FRAMES_PER_SECOND = 30;

/** Game frames are what is returned by the `Game.GetFrameCount` method. */
export const GAME_FRAMES_PER_MINUTE = GAME_FRAMES_PER_SECOND * 60;

/**
 * An array containing every character that is selectable from the main menu (and has achievements
 * related to completing the various bosses and so on).
 */
export const MAIN_CHARACTERS = [
  PlayerType.ISAAC, // 0
  PlayerType.MAGDALENE, // 1
  PlayerType.CAIN, // 2
  PlayerType.JUDAS, // 3
  PlayerType.BLUE_BABY, // 4
  PlayerType.EVE, // 5
  PlayerType.SAMSON, // 6
  PlayerType.AZAZEL, // 7
  PlayerType.LAZARUS, // 8
  PlayerType.EDEN, // 9
  PlayerType.LOST, // 10
  PlayerType.LILITH, // 13
  PlayerType.KEEPER, // 14
  PlayerType.APOLLYON, // 15
  PlayerType.FORGOTTEN, // 16
  PlayerType.BETHANY, // 18
  PlayerType.JACOB, // 19
  PlayerType.ISAAC_B, // 21
  PlayerType.MAGDALENE_B, // 22
  PlayerType.CAIN_B, // 23
  PlayerType.JUDAS_B, // 24
  PlayerType.BLUE_BABY_B, // 25
  PlayerType.EVE_B, // 26
  PlayerType.SAMSON_B, // 27
  PlayerType.AZAZEL_B, // 28
  PlayerType.LAZARUS_B, // 29
  PlayerType.EDEN_B, // 30
  PlayerType.LOST_B, // 31
  PlayerType.LILITH_B, // 32
  PlayerType.KEEPER_B, // 33
  PlayerType.APOLLYON_B, // 34
  PlayerType.FORGOTTEN_B, // 35
  PlayerType.BETHANY_B, // 36
  PlayerType.JACOB_B, // 37
] as const;

/** Render frames are what is returned by the `Isaac.GetFrameCount` method. */
export const RENDER_FRAMES_PER_SECOND = 60;

/** Render frames are what is returned by the `Isaac.GetFrameCount` method. */
export const RENDER_FRAMES_PER_MINUTE = RENDER_FRAMES_PER_SECOND * 60;

export const GRID_INDEX_CENTER_OF_1X1_ROOM = 67;

/**
 * The floor is represented by a 13x13 grid. Room indexes start at 0. The first column is
 * represented by grid indexes 0, 13, 26, and so on.
 */
export const LEVEL_GRID_COLUMN_HEIGHT = 13;

/**
 * The floor is represented by a 13x13 grid. Room indexes start at 0. The first row is represented
 * by grid indexes from 0 to 12. The second row is represented by grid indexes from 13 to 25, and so
 * on.
 */
export const LEVEL_GRID_ROW_WIDTH = 13;

/**
 * All of the collectibles that grant vision on the map.
 *
 * Note that:
 * - Spelunker Hat is included. Historically, Spelunker Hat was not considered to be mapping, but it
 *   was buffed in Repentance to show rooms two or more away.
 * - Book of Secrets is included, which is an "active mapping" instead of passive.
 * - Luna is included, even though it is not a very powerful mapping item.
 * - Cracked Orb is included, even though it requires the player to be damaged in order for it to be
 *   activated.
 */
export const MAPPING_COLLECTIBLES = [
  CollectibleType.COMPASS, // 21
  CollectibleType.TREASURE_MAP, // 54
  CollectibleType.SPELUNKER_HAT, // 91
  CollectibleType.CRYSTAL_BALL, // 158
  CollectibleType.BLUE_MAP, // 246
  CollectibleType.BOOK_OF_SECRETS, // 287
  CollectibleType.MIND, // 333
  CollectibleType.SOL, // 588
  CollectibleType.LUNA, // 589
  CollectibleType.CRACKED_ORB, // 675
] as const;

/**
 * The floor is represented by a 13x13 grid. Room indexes start at 0. The first row is represented
 * by grid indexes from 0 to 12. The second row is represented by grid indexes from 13 to 25, and so
 * on. The maximum room index possible is 168. (It is not 169 because we start at 0 instead of 1.)
 */
export const MAX_LEVEL_GRID_INDEX = 168;

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

/**
 * As the player continues to move in a direction, they will accelerate. When going from one wall to
 * another in a 2x2 room at 2.0 speed (the maximum that the speed stat can rise to), the amount of
 * units moved per update frame will climb to around 9.797 as they hit the opposite wall. The
 * constant specifies a value of 9.8 to be safe.
 */
export const MAX_PLAYER_SPEED_IN_UNITS = 9.8;

export const MAX_PLAYER_TRINKET_SLOTS = getEnumLength(TrinketSlot);

/** If you set `EntityPlayer.ShotSpeed` lower than this value, it will have no effect. */
export const MIN_PLAYER_SHOT_SPEED_STAT = 0.6;

/** If you set `EntityPlayer.Speed` lower than this value, it will have no effect. */
export const MIN_PLAYER_SPEED_STAT = 0.1;

/**
 * The maximum speed stat that a player can have. Any additional speed beyond this will not take
 * effect.
 */
export const MAX_SPEED_STAT = 2;

/** This is in the center of the room. */
export const NEW_FLOOR_STARTING_POSITION_NORMAL_MODE = newReadonlyVector(
  320,
  280,
);

/** This is near the top door. */
export const NEW_FLOOR_STARTING_POSITION_GREED_MODE = newReadonlyVector(
  320,
  280,
);

/**
 * This is next to the bottom door. Presumably, the player does not start in the center of the room
 * (like they do when getting to a new stage) so that the controls graphic is more visible.
 */
export const NEW_RUN_PLAYER_STARTING_POSITION = newReadonlyVector(320, 380);

/** Corresponds to the maximum value for `EntityPlayer.SamsonBerserkCharge`. */
export const MAX_TAINTED_SAMSON_BERSERK_CHARGE = 100_000;

/**
 * The number of dimensions, not including `Dimension.CURRENT`. (This is derived from the
 * `Dimension` enum.)
 */
export const NUM_DIMENSIONS = getEnumLength(Dimension) - 1;

/**
 * An array containing every valid `Dimension`, not including `Dimension.CURRENT`. (This is derived
 * from the `NUM_DIMENSIONS` constant.)
 */
export const DIMENSIONS: readonly Dimension[] = eRange(
  NUM_DIMENSIONS,
) as Dimension[];

/**
 * The pill pool for each run is comprised of one effect for each unique pill color (minus gold and
 * horse pills.)
 */
// TypeDoc will not work properly with the preferred export form.
// eslint-disable-next-line unicorn/prefer-export-from
export const NUM_PILL_COLORS_IN_POOL = NUM_NORMAL_PILL_COLORS;

export const ONE_BY_ONE_ROOM_GRID_SIZE = 135;

/**
 * An array representing every valid collectible type quality. Specifically, this is: `[0, 1, 2, 3,
 * 4]`
 */
// eslint-disable-next-line complete/require-capital-const-assertions
export const QUALITIES: readonly Quality[] = [0, 1, 2, 3, 4];
export const MAX_QUALITY: Quality = 4;

export const SECOND_IN_MILLISECONDS = 1000;
export const MINUTE_IN_MILLISECONDS = 60 * SECOND_IN_MILLISECONDS;

/** This is equivalent to the bottom-right screen position when the game is in full screen mode. */
export const RESOLUTION_FULL_SCREEN = Vector(480, 270);

/**
 * This is equivalent to the bottom-right screen position when the game is in windowed mode in a
 * 1600x900 resolution.
 */
export const RESOLUTION_1600_900 = Vector(533, 300);

/**
 * The starting room of the floor is always at the same grid index, which is in the middle of the
 * 13x13 grid.
 */
export const STARTING_ROOM_GRID_INDEX = 84;

/** After taking damage, `EntityPlayer.SamsonBerserkCharge` is incremented by this amount. */
export const TAINTED_SAMSON_BERSERK_CHARGE_FROM_TAKING_DAMAGE = 10_000;

/** For `GridEntityType.TELEPORTER` (23). */
export const TELEPORTER_ACTIVATION_DISTANCE = DISTANCE_OF_GRID_TILE / 2;

/** In milliseconds, as reported by the `Isaac.GetTime` method. */
export const TIME_GAME_OPENED = Isaac.GetTime();

/**
 * This is the number of draw coordinates that each heart spans on the UI in the upper left hand
 * corner.
 */
export const UI_HEART_WIDTH = 12;

/**
 * Equal to `Vector(1, 1)`.
 *
 * This is a safe version of the `Vector.One` constant. (Other mods can mutate `Vector.One`, so it
 * is not safe to use.)
 */
export const VectorOne = newReadonlyVector(1, 1);

/**
 * Equal to `Vector(0, 0)`.
 *
 * This is a safe version of the `Vector.Zero` constant. (Other mods can mutate `Vector.Zero`, so it
 * is not safe to use.)
 */
export const VectorZero = newReadonlyVector(0, 0);

/**
 * Equal to `Color(1, 1, 1)`.
 *
 * This is a safe version of the `Color.Default` constant. (Other mods can mutate `Color.Default`,
 * so it is not safe to use.)
 *
 * If you need to mutate this, make a copy first with the `copyColor` helper function.
 */
export const ColorDefault = newReadonlyColor(1, 1, 1);

/**
 * Equal to `KColor(1, 1, 1, 1)`.
 *
 * If you need to mutate this, make a copy first with the `copyKColor` helper function.
 */
export const KColorDefault = newReadonlyKColor(1, 1, 1, 1);
