import {
  Dimension,
  DisplayFlag,
  ItemPoolType,
  TrinketSlot,
} from "isaac-typescript-definitions";
import { getEnumLength } from "../functions/enums";
import { addFlag } from "../functions/flag";
import { asCollectibleType } from "../functions/types";
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

/** This is the initial value of the `EntityPickup.Wait` field after a collectible is spawned. */
export const COLLECTIBLE_INITIAL_WAIT = 20;

export const DEFAULT_ITEM_POOL_TYPE = ItemPoolType.TREASURE;

/** This is also the distance that a player spawns from the door that they enter a room from. */
export const DISTANCE_OF_GRID_TILE = 40;

export const DOGMA_ROOM_GRID_INDEX = 109;

export const DOOR_HITBOX_RADIUS = 11;

/**
 * When Eggies take fatal damage, they go into NpcState.STATE_SUICIDE and spawn 14 Swarm Spiders
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
 */

export const FIRST_GLITCHED_COLLECTIBLE_TYPE = asCollectibleType((1 << 32) - 1);

/** Game frames are what is returned by the `Game.GetFrameCount` method. */
export const GAME_FRAMES_PER_SECOND = 30;

/** Render frames are what is returned by the `Isaac.GetFrameCount` method. */
export const RENDER_FRAMES_PER_SECOND = 60;

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
export const MAX_SPEED_STAT = 2.0;

/** This is in the center of the room. */
export const NEW_FLOOR_STARTING_POSITION_NORMAL_MODE = Vector(320, 280);

/** This is near the top door. */
export const NEW_FLOOR_STARTING_POSITION_GREED_MODE = Vector(320, 280);

/**
 * This is next to the bottom door. Presumably, the player does not start in the center of the room
 * (like they do when getting to a new stage) so that the controls graphic is more visible.
 */
export const NEW_RUN_PLAYER_STARTING_POSITION = Vector(320, 380);

/** Corresponds to the maximum value for `EntityPlayer.SamsonBerserkCharge`. */
export const MAX_TAINTED_SAMSON_BERSERK_CHARGE = 100000;

export const NUM_DIMENSIONS = getEnumLength(Dimension) - 1; // Account for "Dimension.CURRENT"

/**
 * The pill pool for each run is comprised of one effect for each unique pill color (minus gold and
 * horse pills.)
 */
export const NUM_PILLS_IN_POOL = NUM_NORMAL_PILL_COLORS;

export const SECOND_IN_MILLISECONDS = 1000;
export const MINUTE_IN_MILLISECONDS = 60 * SECOND_IN_MILLISECONDS;

export const ONE_BY_ONE_ROOM_GRID_SIZE = 135;

/** After taking damage, `EntityPlayer.SamsonBerserkCharge` is incremented by this amount. */
export const TAINTED_SAMSON_BERSERK_CHARGE_FROM_TAKING_DAMAGE = 10000;

/** For `GridEntityType.TELEPORTER` (23). */
export const TELEPORTER_ACTIVATION_DISTANCE = DISTANCE_OF_GRID_TILE / 2;

/**
 * This is the number of draw coordinates that each heart spans on the UI in the upper left hand
 * corner.
 */
export const UI_HEART_WIDTH = 12;

/**
 * This is a safe version of the `Vector.One` constant. (Other mods can mutate `Vector.One`, so it
 * is not safe to use.)
 */
export const VectorOne: Readonly<Vector> = Vector(1, 1);

/**
 * This is a safe version of the `Vector.Zero` constant. (Other mods can mutate `Vector.Zero`, so it
 * is not safe to use.)
 */
export const VectorZero: Readonly<Vector> = Vector(0, 0);

/**
 * This is a safe version of the `Color.Default` constant. (Other mods can mutate `Color.Default`,
 * so it is not safe to use.)
 *
 * If you need to mutate this, make a copy first with the `copyColor` helper function.
 */
export const ColorDefault: Readonly<Color> = Color(1, 1, 1);

/**
 * Equal to `KColor(1, 1, 1, 1)`.
 *
 * If you need to mutate this, make a copy first with the `copyKColor` helper function.
 */
export const KColorDefault: Readonly<KColor> = KColor(1, 1, 1, 1);
