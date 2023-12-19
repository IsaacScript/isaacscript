// cspell:ignore addcharges

/*
eslint "sort-exports/sort-exports": [
  "error",
  {
    sortDir: "asc",
  },
],
*/

/* eslint "jsdoc/require-jsdoc": "error" */

/**
 * __DOCS_LINE_THAT_WILL_BE_AUTOMATICALLY_REMOVED__
 *
 * This is a list of custom console commands that are included with the standard library. By
 * default, they will not be enabled. You can enable them by upgrading your mod with
 * `ISCFeature.EXTRA_CONSOLE_COMMANDS`. (Also see the [Extra Console Commands](ExtraConsoleCommands)
 * feature documentation.)
 *
 * As a quality of life feature, you do not have to match the casing of the command. For example,
 * you can type the "addCharges" command as "addcharges", and it will still work the same.
 *
 * Additionally, you can also abbreviate any command by omitting letters that do not overlap with
 * any other command. For example, the command of "c" will be interpreted as the "card" command.
 *
 * In order for the custom console commands to work, you first have to enable
 * `ISCFeature.EXTRA_CONSOLE_COMMANDS` when upgrading your mod. (See the "Extra Console Commands
 * (Init)" page for more details.)
 *
 * Each command has a corresponding function of the same name, but these functions are not exported
 * for end-user consumption. (This is to cut down on namespace conflicts and because the names of
 * the functions are not very descriptive.)
 *
 * @module
 */

import type {
  CardType,
  PillEffect,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  ActiveSlot,
  BossID,
  CacheFlag,
  Challenge,
  CollectibleType,
  Direction,
  DisplayFlag,
  GameStateFlag,
  GridEntityType,
  GridRoom,
  LevelStage,
  PillColor,
  PlayerType,
  PocketItemSlot,
  RoomType,
  SoundEffect,
  StageType,
} from "isaac-typescript-definitions";
import { GRID_ENTITY_TYPE_VALUES } from "../../../../cachedEnumValues";
import { game, sfxManager } from "../../../../core/cachedClasses";
import {
  DOGMA_ROOM_GRID_INDEX,
  MAX_LEVEL_GRID_INDEX,
  MAX_NUM_FAMILIARS,
} from "../../../../core/constants";
import {
  FIRST_CARD_TYPE,
  FIRST_HORSE_PILL_COLOR,
  FIRST_PILL_COLOR,
  LAST_VANILLA_CARD_TYPE,
} from "../../../../core/constantsFirstLast";
import { HealthType } from "../../../../enums/HealthType";
import { getCardName, isValidCardType } from "../../../../functions/cards";
import { getCharacterName } from "../../../../functions/characters";
import { addCharge, getTotalCharge } from "../../../../functions/charge";
import { isValidCollectibleType } from "../../../../functions/collectibles";
import { printEnabled } from "../../../../functions/console";
import { runDeepCopyTests } from "../../../../functions/deepCopyTests";
import { getNPCs } from "../../../../functions/entitiesSpecific";
import { isEnumValue } from "../../../../functions/enums";
import { addFlag } from "../../../../functions/flag";
import { spawnGridEntity } from "../../../../functions/gridEntities";
import { getRoomGridIndexesForType } from "../../../../functions/levelGrid";
import {
  logMusic,
  logPlayerEffects,
  logRoom,
  logSeedEffects,
  logSounds,
} from "../../../../functions/logMisc";
import { runMergeTests } from "../../../../functions/mergeTests";
import {
  spawnCard,
  spawnPill,
  spawnTrinket as spawnTrinketFunction,
} from "../../../../functions/pickupsSpecific";
import {
  getHorsePillColor,
  getPillEffectName,
  isValidPillEffect,
} from "../../../../functions/pills";
import {
  addCollectibleCostume,
  removeCollectibleCostume,
  useActiveItemTemp,
} from "../../../../functions/playerCollectibles";
import { getPlayers } from "../../../../functions/playerIndex";
import { getPlayerName } from "../../../../functions/players";
import { getRoomData } from "../../../../functions/roomData";
import { gridCoordinatesToWorldPosition } from "../../../../functions/roomGrid";
import { reloadRoom as reloadRoomFunction } from "../../../../functions/roomTransition";
import { changeRoom } from "../../../../functions/rooms";
import { onSetSeed, restart, setUnseeded } from "../../../../functions/run";
import { spawnCollectible as spawnCollectibleFunc } from "../../../../functions/spawnCollectible";
import { onStage, setStage } from "../../../../functions/stage";
import { getMapPartialMatch } from "../../../../functions/string";
import {
  getGoldenTrinketType,
  isValidTrinketType,
} from "../../../../functions/trinkets";
import { parseIntSafe } from "../../../../functions/types";
import { iRange } from "../../../../functions/utils";
import { CARD_NAME_TO_TYPE_MAP } from "../../../../maps/cardNameToTypeMap";
import { CHARACTER_NAME_TO_TYPE_MAP } from "../../../../maps/characterNameToTypeMap";
import { COLLECTIBLE_NAME_TO_TYPE_MAP } from "../../../../maps/collectibleNameToTypeMap";
import { PILL_NAME_TO_EFFECT_MAP } from "../../../../maps/pillNameToEffectMap";
import { ROOM_NAME_TO_TYPE_MAP } from "../../../../maps/roomNameToTypeMap";
import { TRINKET_NAME_TO_TYPE_MAP } from "../../../../maps/trinketNameToTypeMap";
import { ROOM_TYPE_NAMES } from "../../../../objects/roomTypeNames";
import {
  addHeart,
  devilAngel,
  listEntities,
  listGridEntities,
  movePlayer,
  spawnTrapdoorOrCrawlSpace,
  warpNextToRoomType,
  warpToRoomType,
} from "./subroutines";
import { v } from "./v";

/**
 * Adds a single charge to the player's specified active item. You must provide the active slot
 * number. Provide a second number to give a custom amount of charges. (You can use negative numbers
 * to remove charge.)
 */
export function addCharges(params: string): void {
  if (params === "") {
    print(
      "You must specify a slot number. (Use 0 for the primary slot, 1 for the Schoolbag slot, 2 for the pocket item slot, and 3 for the Dice Bag slot.)",
    );
    return;
  }

  const args = params.split(" ");

  if (args.length !== 1 && args.length !== 2) {
    print(`Invalid amount of arguments: ${args.length}`);
    return;
  }

  const [activeSlotString, numChargeString] = args;

  if (activeSlotString === undefined) {
    return;
  }

  const activeSlot = parseIntSafe(activeSlotString);
  if (activeSlot === undefined || !isEnumValue(activeSlot, ActiveSlot)) {
    print(`Invalid slot number: ${activeSlot}`);
    return;
  }

  let numCharges = 1;
  if (numChargeString !== undefined) {
    const numChargesAttempt = parseIntSafe(numChargeString);
    if (numChargesAttempt === undefined) {
      print(`Invalid charge amount: ${numChargeString}`);
      return;
    }
    numCharges = numChargesAttempt;
  }

  const player = Isaac.GetPlayer();
  addCharge(player, activeSlot, numCharges);
}

/**
 * Warps to the Angel Room for the floor. If the Devil Room has already been visited or initialized,
 * this will uninitialize it and make an Angel Room instead.
 */
export function angelRoom(): void {
  devilAngel(false);
}

/** Activates the flags for the Ascent (i.e. Backwards Path). */
export function ascent(): void {
  game.SetStateFlag(GameStateFlag.BACKWARDS_PATH_INIT, true);
  game.SetStateFlag(GameStateFlag.BACKWARDS_PATH, true);

  print("Set Ascent flags.");
}

/** Warps to the first Clean Bedroom or Dirty Bedroom on the floor. */
export function bedroom(): void {
  const cleanBedroomGridIndexes = getRoomGridIndexesForType(
    RoomType.CLEAN_BEDROOM,
  );
  if (cleanBedroomGridIndexes.length > 0) {
    warpToRoomType(RoomType.CLEAN_BEDROOM);
    return;
  }

  const dirtyBedroomGridIndexes = getRoomGridIndexesForType(
    RoomType.DIRTY_BEDROOM,
  );
  if (dirtyBedroomGridIndexes.length > 0) {
    warpToRoomType(RoomType.DIRTY_BEDROOM);
    return;
  }

  print("There are no Clean Bedrooms or Dirty Bedrooms on this floor.");
}

/**
 * Gives a half black heart. Provide a number to give a custom amount of hearts. (You can use
 * negative numbers to remove hearts.)
 */
export function blackHearts(params: string): void {
  addHeart(params, HealthType.BLACK);
}

/** Warps to the Black Market for the floor. */
export function blackMarket(): void {
  changeRoom(GridRoom.BLACK_MARKET);
}

/** Toggles permanent Curse of the Blind. */
export function blind(): void {
  v.persistent.blind = !v.persistent.blind;
  printEnabled(v.persistent.blind, "permanent Curse of the Blind");
}

/**
 * Gives a blood charge. This only affects Bethany. Provide a number to give a custom amount of
 * charges. (You can use negative numbers to remove charges.)
 */
export function bloodCharges(params: string): void {
  let charges = 1;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid charge amount: ${num}`);
      return;
    }

    charges = num;
  }

  const player = Isaac.GetPlayer();
  player.AddBloodCharge(charges);
}

/** Alias for the "blackMarket" command. */
export function bm(): void {
  blackMarket();
}

/**
 * Gives a bomb. Provide a number to give a custom amount of bombs. (You can use negative numbers to
 * remove bombs.)
 */
export function bomb(params: string): void {
  let numBombs = 1;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid bomb amount: ${num}`);
      return;
    }

    numBombs = num;
  }

  const player = Isaac.GetPlayer();
  player.AddBombs(numBombs);
}

/**
 * Gives 99 bombs. Provide a number to give a custom amount of bombs. (You can use negative numbers
 * to remove bombs.)
 */
export function bombs(params: string): void {
  let numBombs = 99;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid bomb amount: ${num}`);
      return;
    }

    numBombs = num;
  }

  const player = Isaac.GetPlayer();
  player.AddBombs(numBombs);
}

/**
 * Gives a bone heart. Provide a number to give a custom amount of hearts. (You can use negative
 * numbers to remove hearts.)
 */
export function boneHearts(params: string): void {
  addHeart(params, HealthType.BONE);
}

/** Alias for the "bossRoom" command. */
export function boss(): void {
  bossRoom();
}

/** Warps to the room next to the first Boss Room on the floor. */
export function bossNextRoom(): void {
  warpNextToRoomType(RoomType.BOSS);
}

/** Warps to the first Boss Room on the floor (or the Delirium Boss Room if on The Void). */
export function bossRoom(): void {
  // Most of the logic here is copied from the "warpToRoomType" function.
  const roomType = RoomType.BOSS;
  const roomGridIndexes = getRoomGridIndexesForType(roomType);

  let roomGridIndex = roomGridIndexes[0];

  if (onStage(LevelStage.VOID)) {
    roomGridIndex = roomGridIndexes.find(
      (thisRoomGridIndex) =>
        getRoomData(thisRoomGridIndex)?.Subtype === BossID.DELIRIUM,
    );
  }

  const roomTypeName = ROOM_TYPE_NAMES[RoomType.BOSS];
  if (roomGridIndex === undefined) {
    print(`There are no ${roomTypeName}s on this floor.`);
    return;
  }

  changeRoom(roomGridIndex);
  print(`Warped to room type: ${roomTypeName} (${roomType})`);
}

/** Warps to the Boss Rush for the floor. */
export function bossRush(): void {
  changeRoom(GridRoom.BOSS_RUSH);
}

/**
 * Gives a broken heart. Provide a number to give a custom amount of hearts. (You can use negative
 * numbers to remove hearts.)
 */
export function brokenHearts(params: string): void {
  addHeart(params, HealthType.BROKEN);
}

/**
 * Gives the specified card. Accepts either the card type or the partial name of the card.
 *
 * For example:
 * - card 5 - Gives The Emperor.
 * - card spa - Gives 2 of Spades.
 */
export function card(params: string): void {
  if (params === "") {
    print("You must specify a card name or number.");
    return;
  }

  let cardType: CardType;
  const num = parseIntSafe(params);
  if (num === undefined) {
    const match = getMapPartialMatch(params, CARD_NAME_TO_TYPE_MAP);
    if (match === undefined) {
      print(`Unknown card: ${params}`);
      return;
    }

    cardType = match[1];
  } else {
    if (!isValidCardType(num)) {
      print(`Invalid card type: ${num}`);
      return;
    }

    cardType = num;
  }

  const cardName = getCardName(cardType);
  Isaac.ExecuteCommand(`g k${cardType}`);
  print(`Gave card: ${cardName} (${cardType})`);
}

/** Spawns every card on the ground, starting at the top-left-most tile. */
export function cards(): void {
  let cardType = FIRST_CARD_TYPE;
  for (let y = 0; y <= 6; y++) {
    for (let x = 0; x <= 12; x++) {
      if (cardType > LAST_VANILLA_CARD_TYPE) {
        return;
      }

      const worldPosition = gridCoordinatesToWorldPosition(x, y);
      spawnCard(cardType, worldPosition);
      cardType++; // eslint-disable-line isaacscript/strict-enums
    }
  }
}

/** Alias for the "chaosCardTears" command. */
export function cc(): void {
  chaosCardTears();
}

/**
 * Toggles Chaos Card tears for the player. Useful for killing enemies very fast without using
 * "debug 10".
 */
export function chaosCardTears(): void {
  v.persistent.chaosCardTears = !v.persistent.chaosCardTears;
  printEnabled(v.persistent.chaosCardTears, "Chaos Card tears");
}

/**
 * Restart as the specified character. Accepts either the character sub-type or the partial name of
 * the character.
 *
 * For example:
 * - character 2 - Restarts as Cain.
 * - character ta - Restarts as Tainted Azazel.
 */
export function character(params: string): void {
  if (params === "") {
    print("You must specify a character name or number.");
    return;
  }

  let playerType: PlayerType;
  const num = parseIntSafe(params);
  if (num === undefined) {
    const match = getMapPartialMatch(params, CHARACTER_NAME_TO_TYPE_MAP);
    if (match === undefined) {
      print(`Unknown character: ${params}`);
      return;
    }

    playerType = match[1];
  } else {
    if (!isEnumValue(num, PlayerType) || num === PlayerType.POSSESSOR) {
      print(`Invalid character number: ${num}`);
      return;
    }

    playerType = num;
  }

  const characterName = getCharacterName(playerType);
  restart(playerType);
  print(`Restarting as character: ${characterName} (${playerType})`);
}

/** Alias for the "addCharges" command. */
export function charge(params: string): void {
  addCharges(params);
}

/** Warps to the first Clean Bedroom on the floor. */
export function cleanBedroom(): void {
  warpToRoomType(RoomType.CLEAN_BEDROOM);
}

/**
 * Gives a coin. Provide a number to give a custom amount of coins. (You can use negative numbers to
 * remove coins.)
 */
export function coin(params: string): void {
  let numCoins = 1;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid coin amount: ${num}`);
      return;
    }

    numCoins = num;
  }

  const player = Isaac.GetPlayer();
  player.AddCoins(numCoins);
}

/**
 * Gives 999 coins. Provide a number to give a custom amount of coins. (You can use negative numbers
 * to remove coins.)
 */
export function coins(params: string): void {
  let numCoins = 999;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid coin amount: ${num}`);
      return;
    }

    numCoins = num;
  }

  const player = Isaac.GetPlayer();
  player.AddCoins(numCoins);
}

/** Alias for the "spawnCollectible" command. */
export function collectible(params: string): void {
  spawnCollectible(params);
}

/** Creates a crawl space next to the player. */
export function crawlSpace(): void {
  spawnTrapdoorOrCrawlSpace(false);
}

/** Toggles permanent Curse of the Cursed. */
export function cursed(): void {
  v.persistent.cursed = !v.persistent.cursed;
  printEnabled(v.persistent.cursed, "permanent Curse of the Cursed");
}

/** Uses the D20. */
export function d20(): void {
  const player = Isaac.GetPlayer();
  useActiveItemTemp(player, CollectibleType.D20);
}

/** Uses the D6. */
export function d6(): void {
  const player = Isaac.GetPlayer();
  useActiveItemTemp(player, CollectibleType.D6);
}

/** Warps to the Mausoleum 2 Boss Room that has Dad's Note in it. */
export function dadsNote(): void {
  game.SetStateFlag(GameStateFlag.BACKWARDS_PATH_INIT, true);
  setStage(LevelStage.DEPTHS_2, StageType.REPENTANCE);
  bossRoom();
}

/**
 * Toggles a set damage stat for the player. You can provide an optional argument to this command in
 * order to set the damage to a specific amount. Default is 500.
 */
export function damage(params: string): void {
  if (params !== "") {
    const num = tonumber(params); // Can be a float.
    if (num === undefined) {
      print(`Invalid damage amount: ${params}`);
      return;
    }

    v.persistent.damageAmount = num;
  }

  v.persistent.damage = !v.persistent.damage;

  const player = Isaac.GetPlayer();
  player.AddCacheFlags(CacheFlag.DAMAGE);
  player.EvaluateItems();

  printEnabled(v.persistent.damage, "set damage");
}

/** Toggles permanent Curse of Darkness. */
export function darkness(): void {
  v.persistent.darkness = !v.persistent.darkness;
  printEnabled(v.persistent.darkness, "permanent Curse of Darkness");
}

/** Alias for the "devil" command. */
export function dd(): void {
  devilRoom();
}

/**
 * Warps to the Devil Room for the floor. If the Angel Room has already been visited or initialized,
 * this will uninitialize it and make an Devil Room instead.
 */
export function devilRoom(): void {
  devilAngel(true);
}

/** Warps to the first Dirty Bedroom on the floor. */
export function dirtyBedroom(): void {
  warpToRoomType(RoomType.DIRTY_BEDROOM);
}

/** Toggles whether curses can appear. */
export function disableCurses(): void {
  v.persistent.disableCurses = !v.persistent.disableCurses;
  printEnabled(!v.persistent.disableCurses, "curses");
}

/** Warps to the Dogma Boss Room. */
export function dogma(): void {
  setStage(LevelStage.HOME, StageType.WRATH_OF_THE_LAMB);
  changeRoom(DOGMA_ROOM_GRID_INDEX);
}

/** Moves the player 0.5 units down. Provide a number to move a custom amount of units. */
export function down(params: string): void {
  movePlayer(params, Direction.DOWN);
}

/** Warps to the Dungeon (i.e. the crawl space room) for the floor. */
export function dungeon(): void {
  changeRoom(GridRoom.DUNGEON);
}

/** Logs the player's current temporary effects to the "log.txt" file. */
export function effects(): void {
  const player = Isaac.GetPlayer();
  logPlayerEffects(player);
  print('Logged the player\'s effects to the "log.txt" file.');
}

/** Alias for the "iAmError" command. */
export function errorRoom(): void {
  iAmErrorRoom();
}

/**
 * Gives an eternal heart. Provide a number to give a custom amount of hearts. (You can use negative
 * numbers to remove hearts.)
 */
export function eternalHearts(params: string): void {
  addHeart(params, HealthType.ETERNAL);
}

/** Grants the maximum amount of blue flies to the player. */
export function flies(): void {
  const player = Isaac.GetPlayer();
  player.AddBlueFlies(MAX_NUM_FAMILIARS, player.Position, undefined);
}

/** Toggles flight for the player. */
export function flight(params: string): void {
  const player = Isaac.GetPlayer();

  v.persistent.flight = !v.persistent.flight;

  // Optionally, allow the toggle to be overridden by a parameter.
  if (params === "true") {
    v.persistent.flight = true;
  } else if (params === "false") {
    v.persistent.flight = false;
  }

  player.AddCacheFlags(CacheFlag.FLYING);
  player.EvaluateItems();

  const collectibleUsedToShowFlight = CollectibleType.FATE;
  if (v.persistent.flight) {
    addCollectibleCostume(player, collectibleUsedToShowFlight);
  } else {
    removeCollectibleCostume(player, collectibleUsedToShowFlight);
  }

  printEnabled(v.persistent.flight, "flight");
}

/** Alias for the "startingRoom" command. */
export function fool(): void {
  startingRoom();
}

/** Displays the current challenge, if any. */
export function getChallenge(): void {
  const challenge = Isaac.GetChallenge();
  const challengeName = Challenge[challenge];
  const challengeDescription =
    // Handle modded challenges.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    challengeName === undefined
      ? `${challenge} (custom)`
      : `Challenge.${challengeName} (${challenge})`;
  print(`The current challenge is: ${challengeDescription}`);
}

/** Prints the charge for the specified slot. By default, will use `ActiveSlot.PRIMARY`. */
export function getCharge(params: string): void {
  let activeSlot = ActiveSlot.PRIMARY;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined || !isEnumValue(num, ActiveSlot)) {
      print(`Invalid slot number: ${params}`);
      return;
    }

    activeSlot = num;
  }

  const player = Isaac.GetPlayer();
  const totalCharge = getTotalCharge(player, activeSlot);
  print(
    `Total charge for ActiveSlot.${ActiveSlot[activeSlot]} (${activeSlot}) is: ${totalCharge}`,
  );
}

/** Prints the current position of all players. */
export function getPosition(): void {
  for (const player of getPlayers()) {
    const playerName = getPlayerName(player);
    print(
      `Player position for ${playerName}: (${player.Position.X}, ${player.Position.Y})`,
    );
  }
}

/** Toggles permanent Curse of the Giant. */
export function giant(): void {
  v.persistent.giant = !v.persistent.giant;
  printEnabled(v.persistent.giant, "permanent Curse of the Giant");
}

/**
 * Gives a Giga Bomb. Provide a number to give a custom amount of Giga Bombs. (You can use negative
 * numbers to remove bombs.)
 */
export function gigaBomb(params: string): void {
  let numBombs = 1;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid Giga Bomb amount: ${num}`);
      return;
    }

    numBombs = num;
  }

  const player = Isaac.GetPlayer();
  player.AddGigaBombs(numBombs);
}

/** Alias for the "goldenBomb" command. */
export function goldBomb(): void {
  goldenBomb();
}

/** Alias for the "goldenHearts" command. */
export function goldHearts(params: string): void {
  goldenHearts(params);
}

/** Alias for the "goldenKey" command. */
export function goldKey(): void {
  goldenKey();
}

/** Alias for the "spawnGoldenTrinket" command. */
export function goldTrinket(params: string): void {
  spawnGoldenTrinket(params);
}

/** Gives the player a golden bomb. */
export function goldenBomb(): void {
  const player = Isaac.GetPlayer();
  player.AddGoldenBomb();
}

/**
 * Gives a golden heart. Provide a number to give a custom amount of hearts. (You can use negative
 * numbers to remove hearts.)
 */
export function goldenHearts(params: string): void {
  addHeart(params, HealthType.GOLDEN);
}

/** Gives the player a golden key. */
export function goldenKey(): void {
  const player = Isaac.GetPlayer();
  player.AddGoldenKey();
}

/** Alias for the "spawnGoldenTrinket" command. */
export function goldenTrinket(params: string): void {
  spawnGoldenTrinket(params);
}

/**
 * Alias for the "debug 11" command. Useful for seeing the coordinates and grid index of each tile
 * in the room.
 */
export function grid(): void {
  Isaac.ExecuteCommand("debug 11");
}

/** Alias for the "gridCosts" command. */
export function grid2(): void {
  gridCosts();
}

/** Alias for the "debug 2" command. Useful for seeing the grid costs of each tile in the room. */
export function gridCosts(): void {
  Isaac.ExecuteCommand("debug 2");
}

/** Spawns every grid entity, starting at the top-left-most tile. */
export function gridEntities(): void {
  let gridEntityTypeIndex = -1;
  for (let y = 0; y <= 6; y++) {
    for (let x = 0; x <= 12; x++) {
      gridEntityTypeIndex++;
      const gridEntityType = GRID_ENTITY_TYPE_VALUES[gridEntityTypeIndex];
      if (gridEntityType === undefined) {
        return;
      }

      const worldPosition = gridCoordinatesToWorldPosition(x, y);
      spawnGridEntity(gridEntityType, worldPosition);
    }
  }
}

/**
 * Gives a half red heart. Provide a number to give a custom amount of hearts. (You can use negative
 * numbers to remove hearts.)
 */
export function hearts(params: string): void {
  addHeart(params, HealthType.RED);
}

/** Alias for the "debug 6" command. */
export function hitboxes(): void {
  Isaac.ExecuteCommand("debug 6");
}

/** The same thing as the `pill` command, but gives a horse pill instead of a normal pill. */
export function horse(params: string): void {
  pill(params, true);
}

/** Warps to the Blue Womb Boss Room. */
export function hush(): void {
  setStage(LevelStage.BLUE_WOMB, StageType.ORIGINAL);
  bossRoom();
}

/** Warps to the I AM ERROR room for the floor. */
export function iAmErrorRoom(): void {
  changeRoom(GridRoom.ERROR);
}

/**
 * Gives a key. Provide a number to give a custom amount of key. (You can use negative numbers to
 * remove keys.)
 */
export function key(params: string): void {
  let numKeys = 1;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid key amount: ${num}`);
      return;
    }

    numKeys = num;
  }

  const player = Isaac.GetPlayer();
  player.AddKeys(numKeys);
}

/**
 * Gives 99 keys. Provide a number to give a custom amount of coins. (You can use negative numbers
 * to remove keys.)
 */
export function keys(params: string): void {
  let numKeys = 99;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid key amount: ${num}`);
      return;
    }

    numKeys = num;
  }

  const player = Isaac.GetPlayer();
  player.AddKeys(numKeys);
}

/** Toggles permanent Curse of the Labyrinth. */
export function labyrinth(): void {
  v.persistent.labyrinth = !v.persistent.labyrinth;
  printEnabled(v.persistent.labyrinth, "permanent Curse of the Labyrinth");
}

/** Moves the player 0.5 units left. Provide a number to move a custom amount of units. */
export function left(params: string): void {
  movePlayer(params, Direction.LEFT);
}

/** Warps to the first Library on the floor. */
export function library(): void {
  warpToRoomType(RoomType.LIBRARY);
}

/**
 * Logs the entities in the room to the "log.txt" file. Provide a number to only log that specific
 * `EntityType`.
 *
 * By default, this command will exclude background effects. If that is not desired, use the
 * "listAll" command instead.
 */
export function list(params: string): void {
  listEntities(params, false);
}

/**
 * Logs the entities in the room to the "log.txt" file. Provide a number to only log that specific
 * `EntityType`.
 */
export function listAll(params: string): void {
  listEntities(params, true);
}

/**
 * Logs the grid entities in the room to the "log.txt" file. Provide a number to only log that
 * specific `GridEntityType`.
 *
 * By default, this command will exclude walls. If that is not desired, use the "listGridAll"
 * command instead.
 */
export function listGrid(params: string): void {
  listGridEntities(params, false);
}

/**
 * Logs the grid entities in the room to the "log.txt" file. Provide a number to only log that
 * specific `GridEntityType`.
 */
export function listGridAll(params: string): void {
  listGridEntities(params, true);
}

/** Toggles permanent Curse of the Lost. */
export function lost(): void {
  v.persistent.lost = !v.persistent.lost;
  printEnabled(v.persistent.lost, "permanent Curse of the Lost");
}

/** Alias for the "1hp" command. */
export function lowHP(): void {
  oneHP();
}

/** Alias for "debug 9". */
export function luck(): void {
  Isaac.ExecuteCommand("debug 9");
}

/** Alias for the "poopMana" command. */
export function mana(params: string): void {
  poopMana(params);
}

/** Completely reveals the entire map, including the Ultra Secret Room. */
export function map(): void {
  const level = game.GetLevel();

  const displayFlags = addFlag(
    DisplayFlag.VISIBLE, // 1 << 0
    DisplayFlag.SHADOW, // 1 << 1
    DisplayFlag.SHOW_ICON, // 1 << 2
  );

  for (const roomGridIndex of iRange(MAX_LEVEL_GRID_INDEX)) {
    const roomDesc = level.GetRoomByIdx(roomGridIndex);
    roomDesc.DisplayFlags = displayFlags;
  }

  // We must call the "Level.UpdateVisibility" method for the changes to be visible.
  level.UpdateVisibility();
}

/**
 * Gives a heart container. Provide a number to give a custom amount of heart containers. (You can
 * use negative numbers to remove heart containers.)
 */
export function maxHearts(params: string): void {
  addHeart(params, HealthType.MAX_HEARTS);
}

/** Toggles permanent Curse of the Maze. */
export function maze(): void {
  v.persistent.maze = !v.persistent.maze;
  printEnabled(v.persistent.maze, "permanent Curse of the Maze");
}

/** Warps to the first Miniboss Room on the floor. */
export function miniboss(): void {
  warpToRoomType(RoomType.MINI_BOSS);
}

/** Logs the currently playing music track to the "log.txt" file. */
export function music(): void {
  logMusic();
  print('Logged the currently playing music track to the "log.txt" file.');
}

/** Alias for the "disableCurses" command. */
export function noCurses(): void {
  disableCurses();
}

/** Sets every NPC in the room to 1 HP. */
export function oneHP(): void {
  for (const npc of getNPCs()) {
    npc.HitPoints = 1;
  }

  print("Set every NPC to 1 HP.");
}

/**
 * Gives a pill with the specified pill effect. Accepts either the effect ID or the partial name of
 * the effect.
 *
 * For example:
 *
 * - `pill 5` - Gives a "Full Health" pill.
 * - `pill suns` - Gives a "Feels like I'm walking on sunshine" pill.
 */
export function pill(params: string, isHorse = false): void {
  if (params === "") {
    print("You must specify a pill name or number.");
    return;
  }

  let pillEffect: PillEffect;
  const num = parseIntSafe(params);
  if (num === undefined) {
    const match = getMapPartialMatch(params, PILL_NAME_TO_EFFECT_MAP);
    if (match === undefined) {
      print(`Unknown pill effect: ${params}`);
      return;
    }

    pillEffect = match[1];
  } else {
    if (!isValidPillEffect(num)) {
      print(`Invalid pill effect ID: ${num}`);
      return;
    }

    pillEffect = num;
  }

  const pillEffectName = getPillEffectName(pillEffect);
  Isaac.ExecuteCommand(`g p${pillEffect}`);

  if (isHorse) {
    const player = Isaac.GetPlayer();
    const pillColor = player.GetPill(PocketItemSlot.SLOT_1);
    const horsePillColor = getHorsePillColor(pillColor);
    player.SetPill(PocketItemSlot.SLOT_1, horsePillColor);
  }

  if (isHorse) {
    print(`Gave horse pill: ${pillEffectName} (${pillEffect})`);
  } else {
    print(`Gave pill: ${pillEffectName} (${pillEffect})`);
  }
}

/** Spawns every pill on the ground, starting at the top-left-most tile. */
export function pills(): void {
  let y: int;
  let pillColor: PillColor;

  y = 1;
  pillColor = FIRST_PILL_COLOR;
  for (let x = 0; x <= 12; x++) {
    if (pillColor >= PillColor.GOLD) {
      break;
    }

    const worldPosition = gridCoordinatesToWorldPosition(x, y);
    spawnPill(pillColor, worldPosition);
    pillColor++; // eslint-disable-line isaacscript/strict-enums
  }

  y = 2;
  pillColor = FIRST_HORSE_PILL_COLOR;
  for (let x = 0; x <= 12; x++) {
    if (pillColor >= PillColor.HORSE_GOLD) {
      break;
    }

    const worldPosition = gridCoordinatesToWorldPosition(x, y);
    spawnPill(pillColor, worldPosition);
    pillColor++; // eslint-disable-line isaacscript/strict-enums
  }

  y = 3;
  const worldPosition1 = gridCoordinatesToWorldPosition(0, y);
  spawnPill(PillColor.GOLD, worldPosition1);
  const worldPosition2 = gridCoordinatesToWorldPosition(1, y);
  spawnPill(PillColor.HORSE_GOLD, worldPosition2);
}

/** Warps to the first Planetarium on the floor. */
export function planetarium(): void {
  warpToRoomType(RoomType.PLANETARIUM);
}

/** Alias for the "sound" command. */
export function playSound(params: string): void {
  sound(params);
}

/** Sets the player's pocket item to the specified collectible type. */
export function pocket(params: string): void {
  if (params === "") {
    print("You must supply a collectible type to put as the pocket item.");
    return;
  }

  const collectibleType = parseIntSafe(params);
  if (
    collectibleType === undefined ||
    !isValidCollectibleType(collectibleType)
  ) {
    print(`Invalid collectible type: ${collectibleType}`);
    return;
  }

  const player = Isaac.GetPlayer();
  player.SetPocketActiveItem(collectibleType, ActiveSlot.POCKET);
}

/** Creates a poop grid entity next to the player. */
export function poop(): void {
  const roomClass = game.GetRoom();
  const player = Isaac.GetPlayer();
  const tilePosition = roomClass.FindFreeTilePosition(player.Position, 0);

  spawnGridEntity(GridEntityType.POOP, tilePosition);
}

/**
 * Gives a poop mana charge. This only affects Tainted Blue Baby. Provide a number to give a custom
 * amount of charges. (You can use negative numbers to remove charges.)
 */
export function poopMana(params: string): void {
  let charges = 1;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid mana amount: ${num}`);
      return;
    }

    charges = num;
  }

  const player = Isaac.GetPlayer();
  player.AddPoopMana(charges);
}

/** Alias for the "getPosition" command. */
export function position(): void {
  getPosition();
}

/** Alias for the "hearts" command. */
export function redHearts(params: string): void {
  hearts(params);
}

/** Starts a room transition to the same room that you are already in. */
export function reloadRoom(): void {
  reloadRoomFunction();
}

/** Moves the player 0.5 units right. Provide a number to move a custom amount of units. */
export function right(params: string): void {
  movePlayer(params, Direction.RIGHT);
}

/** Logs information about the room to the "log.txt" file. */
export function room(): void {
  logRoom();
  print('Logged room information to the "log.txt" file.');
}

/**
 * Gives a rotten heart. Provide a number to give a custom amount of hearts. (You can use negative
 * numbers to remove hearts.)
 */
export function rottenHearts(params: string): void {
  addHeart(params, HealthType.ROTTEN);
}

/**
 * Run the suite of tests that prove that the "deepCopy" helper function and the "merge" function
 * work properly. For more information, see the `runDeepCopyTests` and the `runMergeTests`
 * functions.
 *
 * In general, running the tests is only useful if you are troubleshooting the save data manager.
 */
export function runTests(): void {
  runDeepCopyTests();
  runMergeTests();
}

/**
 * Alias for the "stage" command.
 *
 * For example:
 * - s 3 - Warps to Caves 1.
 * - s 1c - Warps to Downpour 1.
 */
export function s(params: string): void {
  if (params === "") {
    print("You must specify a stage number.");
    return;
  }

  const finalCharacter = params.slice(-1);
  let stageString: string;
  let stageTypeLetter: string;
  if (
    finalCharacter === "a" ||
    finalCharacter === "b" ||
    finalCharacter === "c" ||
    finalCharacter === "d"
  ) {
    // e.g. "s 11a" for going to The Chest
    stageString = params.slice(0, -1);
    stageTypeLetter = finalCharacter;
  } else {
    // e.g. "s 11" for going to the Dark Room
    stageString = params;
    stageTypeLetter = "";
  }

  const stage = parseIntSafe(stageString);
  if (stage === undefined || !isEnumValue(stage, StageType)) {
    print(`Invalid stage number: ${stage}`);
    return;
  }

  Isaac.ExecuteCommand(`stage ${stage}${stageTypeLetter}`);
}

/** Warps to the first Sacrifice Room on the floor. */
export function sacrificeRoom(): void {
  warpToRoomType(RoomType.SACRIFICE);
}

/** Warps to the first Secret Room on the floor. */
export function secretRoom(): void {
  warpToRoomType(RoomType.SECRET);
}

/** Warps to the Secret Shop that you would normally get to with a Member Card. */
export function secretShop(): void {
  changeRoom(GridRoom.SECRET_SHOP);
}

/** Changes to a seeded run, using the seed of the current run. */
export function seedStick(): void {
  const seedsClass = game.GetSeeds();
  const startSeedString = seedsClass.GetStartSeedString();
  Isaac.ExecuteCommand(`seed ${startSeedString}`);
  print(`Sticking to seed: ${startSeedString}`);
}

/** Logs all of the current run's seed effects to the "log.txt" file. */
export function seeds(): void {
  logSeedEffects();
  print('Logged the seed effects to the "log.txt" file.');
}

/**
 * Sets a charge to the player's specified active item. You must provide the active slot number and
 * the number of charges to set.
 */
export function setCharges(params: string): void {
  if (params === "") {
    print(
      "You must specify a slot number and a charge amount. (Use 0 for the primary slot, 1 for the Schoolbag slot, 2 for the pocket item slot, and 3 for the Dice Bag slot.)",
    );
    return;
  }

  const args = params.split(" ");

  if (args.length === 1) {
    print("You must specify the amount of charge to set.");
    return;
  }

  if (args.length !== 2) {
    print(`Invalid amount of arguments: ${args.length}`);
    return;
  }

  const [activeSlotString, chargeString] = args;

  if (activeSlotString === undefined || chargeString === undefined) {
    return;
  }

  const activeSlot = parseIntSafe(activeSlotString);
  if (activeSlot === undefined || !isEnumValue(activeSlot, ActiveSlot)) {
    print(`Invalid slot number: ${activeSlotString}`);
    return;
  }

  const chargeNum = parseIntSafe(chargeString);
  if (chargeNum === undefined) {
    print(`Invalid charge amount: ${chargeString}`);
    return;
  }

  if (chargeNum < 0) {
    print(`Invalid charge amount: ${chargeNum}`);
    return;
  }

  const player = Isaac.GetPlayer();
  player.SetActiveCharge(chargeNum, activeSlot);
}

/**
 * Moves the first player to the specified position.
 *
 * For example:
 * - setPosition 100 50
 */
export function setPosition(params: string): void {
  if (params === "") {
    print('You must specify a position. (e.g. "setPosition 100 50")');
    return;
  }

  const args = params.split(" ");
  if (args.length !== 2) {
    print('You must specify a position. (e.g. "setPosition 100 50")');
    return;
  }

  const [xString, yString] = args;

  if (xString === undefined || yString === undefined) {
    return;
  }

  const x = parseIntSafe(xString);
  if (x === undefined) {
    print(`Invalid x value: ${xString}`);
    return;
  }

  const y = parseIntSafe(yString);
  if (y === undefined) {
    print(`Invalid y value: ${yString}`);
    return;
  }

  const player = Isaac.GetPlayer();
  const newPosition = Vector(x, y);
  player.Position = newPosition;
}

/** Warps to the first shop on the floor. */
export function shop(): void {
  warpToRoomType(RoomType.SHOP);
}

/** Uses the Smelter to smelt the current player's trinket. */
export function smelt(): void {
  const player = Isaac.GetPlayer();
  useActiveItemTemp(player, CollectibleType.SMELTER);
}

/**
 * Gives a soul charge. This only affects Tainted Bethany. Provide a number to give a custom amount
 * of charges. (You can use negative numbers to remove charges.)
 */
export function soulCharges(params: string): void {
  let charges = 1;
  if (params !== "") {
    const num = parseIntSafe(params);
    if (num === undefined) {
      print(`Invalid charges amount: ${num}`);
      return;
    }

    charges = num;
  }

  const player = Isaac.GetPlayer();
  player.AddSoulCharge(charges);
}

/**
 * Gives a half soul heart. Provide a number to give a custom amount of hearts. (You can use
 * negative numbers to remove hearts.)
 */
export function soulHearts(params: string): void {
  addHeart(params, HealthType.SOUL);
}

/**
 * Play the supplied sound effect.
 *
 * For example:
 * - sound 1 - Plays the 1-Up sound effect.
 */
export function sound(params: string): void {
  const soundEffect = parseIntSafe(params);
  if (soundEffect === undefined || !isEnumValue(soundEffect, SoundEffect)) {
    print(`Invalid sound effect ID: ${soundEffect}.`);
    return;
  }

  sfxManager.Play(soundEffect);
}

/** Logs all of the currently playing sound effects to the "log.txt" file. */
export function sounds(): void {
  logSounds();
  print('Logged the currently playing sound effects to the "log.txt" file.');
}

/**
 * Toggles spamming Blood Rights on every frame. Useful for killing enemies very fast without using
 * "debug 10".
 */
export function spam(): void {
  v.persistent.spamBloodRights = !v.persistent.spamBloodRights;
  printEnabled(v.persistent.spamBloodRights, "spamming Blood Rights");
}

/**
 * Spawns a collectible in the center of the room. You must specify the collectible name or the
 * number corresponding to the collectible type.
 *
 * For example, all of the following commands would spawn Spoon Bender:
 *
 * ```text
 * spawnCollectible spoon bender
 * spawnCollectible spoon
 * spawnCollectible spo
 * spawnCollectible 3
 * ```
 */
export function spawnCollectible(params: string): void {
  if (params === "") {
    print(
      "You must specify the collectible name or the number corresponding to the collectible type.",
    );
    return;
  }

  const num = parseIntSafe(params);
  let collectibleType: CollectibleType;
  if (num === undefined) {
    const match = getMapPartialMatch(params, COLLECTIBLE_NAME_TO_TYPE_MAP);
    if (match === undefined) {
      print(`Unknown collectible: ${params}`);
      return;
    }

    collectibleType = match[1];
  } else {
    if (!isValidCollectibleType(num)) {
      print(`Invalid collectible type: ${num}`);
    }
    collectibleType = num;
  }

  const roomClass = game.GetRoom();
  const centerPos = roomClass.GetCenterPos();
  spawnCollectibleFunc(collectibleType, centerPos, undefined);
}

/**
 * Spawns a collectible at a specific grid tile location. You must specify the number corresponding
 * to the collectible type and the number corresponding to the grid tile location.
 *
 * For example, this would spawn Spoon Bender in the top-left corner of a 1x1 room:
 *
 * ```text
 * spawnCollectibleAt 3 16
 * ```
 *
 * (You can use the "grid" command to toggle displaying the numerical grid indexes corresponding to
 * a grid tile.)
 */
export function spawnCollectibleAt(params: string): void {
  if (params === "") {
    print(
      "You must specify the number corresponding to the collectible type and the number corresponding to the grid tile location.",
    );
    return;
  }

  const args = params.split(" ");
  if (args.length !== 2) {
    print(
      "You must specify the number corresponding to the collectible type and the number corresponding to the grid tile location.",
    );
    return;
  }

  const [collectibleTypeString, gridIndexString] = args;

  if (collectibleTypeString === undefined || gridIndexString === undefined) {
    return;
  }

  const collectibleType = parseIntSafe(collectibleTypeString);
  if (
    collectibleType === undefined ||
    !isValidCollectibleType(collectibleType)
  ) {
    print(`Invalid collectible type: ${args[0]}`);
    return;
  }

  const gridIndex = parseIntSafe(gridIndexString);
  if (gridIndex === undefined || gridIndex < 0) {
    print(`Failed to parse the grid index of: ${args[1]}`);
    return;
  }

  spawnCollectibleFunc(collectibleType, gridIndex, undefined);
}

/** Alias for the `spawnGoldenTrinket` command. */
export function spawnGoldTrinket(params: string): void {
  spawnGoldenTrinket(params);
}

/**
 * The same thing as the `spawnTrinket` command but spawns a golden version of the specified
 * trinket.
 */
export function spawnGoldenTrinket(params: string): void {
  spawnTrinket(params, true);
}

/**
 * The same thing as the `spawnTrinketAt` command but spawns a golden version of the specified
 * trinket.
 */
export function spawnGoldenTrinketAt(params: string): void {
  spawnTrinketAt(params, true);
}

/**
 * Spawns a trinket in the center of the room. You must specify the trinket name or the number
 * corresponding to the trinket type.
 *
 * For example, all of the following commands would spawn the Wiggle Worm trinket:
 *
 * ```text
 * spawnTrinket wiggle worm
 * spawnTrinket wiggle
 * spawnTrinket wig
 * spawnTrinket 10
 * ```
 *
 * Also see the `spawnGoldenTrinket` command.
 */
export function spawnTrinket(params: string, golden = false): void {
  if (params === "") {
    print(
      "You must specify the name or number corresponding to the trinket type.",
    );
    return;
  }

  const num = parseIntSafe(params);
  let trinketType: TrinketType;
  if (num === undefined) {
    const match = getMapPartialMatch(params, TRINKET_NAME_TO_TYPE_MAP);
    if (match === undefined) {
      print(`Unknown trinket: ${params}`);
      return;
    }

    trinketType = match[1];
  } else {
    if (!isValidTrinketType(num)) {
      print(`Invalid trinket type: ${num}`);
      return;
    }
    trinketType = num;
  }

  const roomClass = game.GetRoom();
  const centerPos = roomClass.GetCenterPos();
  const goldenTrinketType = getGoldenTrinketType(trinketType);
  const trinketTypeToSpawn = golden ? goldenTrinketType : trinketType;
  spawnTrinketFunction(trinketTypeToSpawn, centerPos);
}

/**
 * Spawns a trinket at a specific grid tile location. You must specify the number corresponding to
 * the trinket type and the number corresponding to the grid tile location.
 *
 * For example, this would spawn Wiggle Worm in the top-left corner of a 1x1 room:
 *
 * ```text
 * spawnTrinketAt 10 16
 * ```
 *
 * (You can use the "grid" command to toggle displaying the numerical grid indexes corresponding to
 * a grid tile.)
 */
export function spawnTrinketAt(params: string, golden = false): void {
  if (params === "") {
    print(
      "You must specify the number corresponding to the trinket type and the number corresponding to the grid tile location.",
    );
    return;
  }

  const args = params.split(" ");
  if (args.length !== 2) {
    print(
      "You must specify the number corresponding to the trinket type and the number corresponding to the grid tile location.",
    );
    return;
  }

  const [trinketTypeString, gridIndexString] = args;

  if (trinketTypeString === undefined || gridIndexString === undefined) {
    return;
  }

  const trinketType = parseIntSafe(trinketTypeString);
  if (trinketType === undefined || !isValidTrinketType(trinketType)) {
    print(`Invalid trinket type: ${trinketTypeString}`);
    return;
  }

  const gridIndex = parseIntSafe(gridIndexString);
  if (gridIndex === undefined || gridIndex < 0) {
    print(`Failed to parse the grid index of: ${args[1]}`);
    return;
  }

  const goldenTrinketType = getGoldenTrinketType(trinketType);
  const trinketTypeToSpawn = golden ? goldenTrinketType : trinketType;
  spawnTrinketFunction(trinketTypeToSpawn, gridIndex);
}

/**
 * Toggles a set movement speed and flight for the player. You can provide an optional argument to
 * this command in order to set the speed to a specific amount. Default is 2.0 (which is the maximum
 * that the stat can be set to).
 */
export function speed(params: string): void {
  const player = Isaac.GetPlayer();

  if (params !== "") {
    const num = tonumber(params); // Can be a float.
    if (num === undefined) {
      print(`Invalid speed amount: ${params}`);
      return;
    }

    v.persistent.damageAmount = num;
  }

  v.persistent.speed = !v.persistent.speed;

  player.AddCacheFlags(CacheFlag.SPEED);
  player.EvaluateItems();

  const value = tostring(v.persistent.speed);
  flight(value);

  printEnabled(v.persistent.speed, "set speed");
}

/** Creates a spikes grid entity next to the player. */
export function spikes(): void {
  const roomClass = game.GetRoom();
  const player = Isaac.GetPlayer();
  const tilePosition = roomClass.FindFreeTilePosition(player.Position, 0);

  spawnGridEntity(GridEntityType.SPIKES, tilePosition);
}

/** Alias for the "startingRoom" command. */
export function startRoom(): void {
  startingRoom();
}

/** Warps to the starting room of the floor. */
export function startingRoom(): void {
  const level = game.GetLevel();
  const startingRoomIndex = level.GetStartingRoomIndex();
  changeRoom(startingRoomIndex);
}

/** Warps to the first Super Secret Room on the floor. */
export function superSecretRoom(): void {
  warpToRoomType(RoomType.SUPER_SECRET);
}

/**
 * Toggles a set tear delay (e.g. fire rate) for the player. You can provide an optional argument to
 * this command in order to set the tear delay to a specific amount. Default is 1 (which is
 * equivalent to the Soy Milk tear rate).
 */
export function tears(params: string): void {
  if (params !== "") {
    const num = tonumber(params); // Can be a float.
    if (num === undefined) {
      print(`Invalid tear delay amount: ${params}`);
      return;
    }

    v.persistent.tearsAmount = num;
  }

  v.persistent.tears = !v.persistent.tears;

  const player = Isaac.GetPlayer();
  player.AddCacheFlags(CacheFlag.FIRE_DELAY);
  player.EvaluateItems();

  printEnabled(v.persistent.damage, "set tear delay");
}

/** Alias for the "runTests" command. */
export function tests(): void {
  runTests();
}

/** Creates a trapdoor next to the player. */
export function trapdoor(): void {
  spawnTrapdoorOrCrawlSpace(true);
}

/** Warps to the first Treasure Room on the floor. */
export function treasureRoom(): void {
  warpToRoomType(RoomType.TREASURE);
}

/** Alias for the "spawnTrinket" command. */
export function trinket(params: string): void {
  spawnTrinket(params);
}

/** Warps to the first Ultra Secret Room on the floor. */
export function ultraSecretRoom(): void {
  warpToRoomType(RoomType.ULTRA_SECRET);
}

/** Toggles permanent Curse of the Unknown. */
export function unknown(): void {
  v.persistent.unknown = !v.persistent.unknown;
  printEnabled(v.persistent.unknown, "permanent Curse of the Unknown");
}

/** If currently on a set seed, changes to an unseeded state and restarts the game. */
export function unseed(): void {
  if (!onSetSeed()) {
    print("You are not on a set seed, so you cannot unseed the run.");
    return;
  }

  setUnseeded();
  restart();
}

/** Moves the player 0.5 units up. Provide a number to move a custom amount of units. */
export function up(params: string): void {
  movePlayer(params, Direction.UP);
}

/**
 * Warps to the specified room type. Accepts either the room type number or the partial name of the
 * room type.
 *
 * For example:
 * - warp 5 - Warps to the first Boss Room on the floor, if any.
 * - warp tr - Warps to the first Treasure Room on the floor, if any.
 */
export function warp(params: string): void {
  if (params === "") {
    print("You must specify a room type name or number.");
    return;
  }

  let roomType: RoomType;
  const num = parseIntSafe(params);
  if (num === undefined) {
    const match = getMapPartialMatch(params, ROOM_NAME_TO_TYPE_MAP);
    if (match === undefined) {
      print(`Unknown room type: ${params}`);
      return;
    }

    roomType = match[1];
  } else {
    if (!isEnumValue(num, RoomType)) {
      print(`Invalid room type: ${num}`);
      return;
    }

    roomType = num;
  }

  warpToRoomType(roomType);
}

/** Alias for the "labyrinth" command. */
export function xl(): void {
  labyrinth();
}
