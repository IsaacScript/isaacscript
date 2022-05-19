import {
  ActiveSlot,
  CacheFlag,
  Card,
  CollectibleType,
  Direction,
  DisplayFlag,
  GameStateFlag,
  GridRoom,
  PillColor,
  PillEffect,
  PlayerType,
  RoomType,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "../../cachedClasses";
import {
  MAX_LEVEL_GRID_INDEX,
  MAX_ROOM_TYPE,
  MAX_STAGE,
  MAX_VANILLA_CHARACTER,
} from "../../constants";
import { MAX_CARD, MAX_PILL_EFFECT } from "../../constantsMax";
import { HealthType } from "../../enums/HealthType";
import { getCardName } from "../../functions/cards";
import { getCharacterName } from "../../functions/character";
import { getNPCs } from "../../functions/entitySpecific";
import { getEnumValues, getLastEnumValue } from "../../functions/enums";
import { addFlag } from "../../functions/flag";
import {
  logEffects,
  logRoom,
  logSeedEffects,
  logSounds,
} from "../../functions/log";
import { getMapPartialMatch } from "../../functions/map";
import { spawnCard, spawnPill, spawnTrinket } from "../../functions/pickups";
import { getHorsePillColor, getPillEffectName } from "../../functions/pills";
import { getPlayerName, useActiveItemTemp } from "../../functions/player";
import { getPlayers } from "../../functions/playerIndex";
import { gridCoordinatesToWorldPosition } from "../../functions/roomGrid";
import { changeRoom, getRoomGridIndexesForType } from "../../functions/rooms";
import { restart } from "../../functions/run";
import { getGoldenTrinketType } from "../../functions/trinkets";
import { irange, printConsole, printEnabled } from "../../functions/utils";
import { CARD_MAP } from "../../maps/cardMap";
import { CHARACTER_MAP } from "../../maps/characterMap";
import { PILL_EFFECT_MAP } from "../../maps/pillEffectMap";
import { ROOM_TYPE_MAP } from "../../maps/roomTypeMap";
import {
  addHeart,
  devilAngel,
  listEntities,
  listGridEntities,
  movePlayer,
  spawnTrapdoorOrCrawlspace,
  warpToRoomType,
} from "./commandsSubroutines";
import v from "./v";

/**
 * Adds a single charge to the player's specified active item. You must provide the active slot
 * number. Provide a second number to give a custom amount of charges. (You can use negative numbers
 * to remove charge.)
 */
export function addCharges(params: string): void {
  if (params === "") {
    printConsole(
      "You must specify a slot number. (Use 0 for the primary slot, 1 for the Schoolbag slot, 2 for the pocket item slot, and 3 for the Dice Bag slot.)",
    );
    return;
  }

  const args = params.split(" ");

  if (args.length !== 1 && args.length !== 2) {
    printConsole("That is an invalid amount of arguments.");
    return;
  }

  const [activeSlotString, chargeString] = args;

  const activeSlot = tonumber(activeSlotString);
  if (activeSlot === undefined) {
    printConsole(`The provided slot number is invalid: ${activeSlotString}`);
    return;
  }

  if (
    activeSlot < ActiveSlot.PRIMARY ||
    activeSlot > ActiveSlot.POCKET_SINGLE_USE
  ) {
    printConsole(`The provided slot number is invalid: ${activeSlot}`);
    return;
  }

  let chargeNum = 1;
  if (chargeString !== undefined) {
    const chargeNumAttempt = tonumber(chargeString);
    if (chargeNumAttempt === undefined) {
      printConsole(`The provided charge amount is invalid: ${chargeString}`);
      return;
    }
    chargeNum = chargeNumAttempt;
  }

  const player = Isaac.GetPlayer();
  const currentCharge = player.GetActiveCharge(activeSlot);
  const newCharge = currentCharge + chargeNum;
  player.SetActiveCharge(newCharge, activeSlot);
}

/**
 * Warps to the Angel Room for the floor. If the Devil Room has already been visited or initialized,
 * this will uninitialize it and make an Angel Room instead.
 */
export function angel(): void {
  devilAngel(false);
}

/** Activates the flags for the Ascent (i.e. Backwards Path). */
export function ascent(): void {
  game.SetStateFlag(GameStateFlag.BACKWARDS_PATH_INIT, true);
  game.SetStateFlag(GameStateFlag.BACKWARDS_PATH, true);

  printConsole("Set Ascent flags.");
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

  printConsole("There are no Clean Bedrooms or Dirty Bedrooms on this floor.");
}

/** Alias for the "blackhearts" command. */
export function bh(params: string): void {
  blackHearts(params);
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

/**
 * Gives a blood charge. This only affects Bethany. Provide a number to give a custom amount of
 * charges. (You can use negative numbers to remove charges.)
 */
export function bloodCharges(params: string): void {
  let charges = 1;
  if (params !== "") {
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of charges to add.");
      return;
    }

    charges = num;
  }

  const player = Isaac.GetPlayer();
  player.AddBloodCharge(charges);
}

/** Alias for the "blackmarket" command. */
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
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of bombs to add.");
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
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of bombs to add.");
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

/** Warps to the first Boss Room on the floor. */
export function boss(): void {
  warpToRoomType(RoomType.BOSS);
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
 * Gives the specified card. Accepts either the card sub-type or the partial name of the card.
 *
 * For example:
 * - card 5 - Gives The Emperor.
 * - card spa - Gives 2 of Spades.
 */
export function card(params: string): void {
  if (params === "") {
    printConsole("You must specify a card name or number.");
    return;
  }

  let cardNum: Card;
  const num = tonumber(params);
  if (num === undefined) {
    const match = getMapPartialMatch(params, CARD_MAP);
    if (match === undefined) {
      printConsole(`Unknown card: ${params}`);
      return;
    }

    cardNum = match[1];
  } else {
    if (num <= Card.NULL || num > MAX_CARD) {
      printConsole(`Invalid card sub-type: ${num}`);
      return;
    }

    cardNum = num;
  }

  const cardName = getCardName(cardNum);
  Isaac.ExecuteCommand(`g k${cardNum}`);
  printConsole(`Gave card: ${cardName} (${cardNum})`);
}

/** Spawns every card on the ground, starting at the top-left-most tile. */
export function cards(): void {
  let cardType = 1;
  for (let y = 0; y <= 6; y++) {
    for (let x = 0; x <= 12; x++) {
      if (cardType === MAX_CARD) {
        return;
      }

      const position = gridCoordinatesToWorldPosition(x, y);
      spawnCard(cardType, position);
      cardType += 1;
    }
  }
}

/** Alias for the "chaoscardtears" command. */
export function cc(): void {
  chaosCardTears();
}

/** Toggles Chaos Card tears. Useful for killing enemies very fast without using "debug 10". */
export function chaosCardTears(): void {
  v.run.chaosCardTears = !v.run.chaosCardTears;
  printEnabled(v.run.chaosCardTears, "Chaos Card tears");
}

/**
 * Restart as the specified character. Accepts either the character sub-type or the partial name of
 * the character.
 *
 * For example:
 * - character 2 - Restarts as Cain.
 * - character ta - Restarts as Tainted Azazel.
 */
export function characterCommand(params: string): void {
  if (params === "") {
    printConsole("You must specify a character name or number.");
    return;
  }

  let character: PlayerType;
  const num = tonumber(params);
  if (num === undefined) {
    const match = getMapPartialMatch(params, CHARACTER_MAP);
    if (match === undefined) {
      printConsole(`Unknown character: ${params}`);
      return;
    }

    character = match[1];
  } else {
    if (num < 0 || num > MAX_VANILLA_CHARACTER) {
      printConsole(`Invalid player sub-type: ${num}`);
      return;
    }

    character = num;
  }

  const characterName = getCharacterName(character);
  restart(character);
  printConsole(`Restarting as character: ${characterName} (${character})`);
}

/** Alias for the "addcharges" command. */
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
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of coins to add.");
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
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of coins to add.");
      return;
    }

    numCoins = num;
  }

  const player = Isaac.GetPlayer();
  player.AddCoins(numCoins);
}

/** Creates a crawlspace next to the player. */
export function crawlspace(): void {
  spawnTrapdoorOrCrawlspace(false);
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

/** Toggles extremely high-damage tears. */
export function damage(): void {
  v.run.maxDamage = !v.run.maxDamage;
  printEnabled(v.run.maxDamage, "debug damage");
}

/** Alias for the "devil" command. */
export function dd(): void {
  devil();
}

/**
 * Warps to the Devil Room for the floor. If the Angel Room has already been visited or initialized,
 * this will uninitialize it and make an Devil Room instead.
 */
export function devil(): void {
  devilAngel(true);
}

/** Warps to the first Dirty Bedroom on the floor. */
export function dirtyBedroom(): void {
  warpToRoomType(RoomType.DIRTY_BEDROOM);
}

/** Toggles whether or not curses can appear. */
export function disableCurses(): void {
  v.persistent.disableCurses = !v.persistent.disableCurses;
  printEnabled(!v.persistent.disableCurses, "curses");
}

/** Moves the player 0.5 units down. Provide a number to move a custom amount of units. */
export function down(params: string): void {
  movePlayer(params, Direction.DOWN);
}

/** Warps to the Dungeon (i.e. Crawlspace) for the floor. */
export function dungeon(): void {
  changeRoom(GridRoom.DUNGEON);
}

/** Logs the player's current temporary effects to the "log.txt" file. */
export function effects(): void {
  const player = Isaac.GetPlayer();
  logEffects(player);
  printConsole('Logged the player\'s effects to the "log.txt" file.');
}

/** Alias for the "eternalhearts" command. */
export function eh(params: string): void {
  eternalHearts(params);
}

/** Alias for the "iamerror" command. */
export function error(): void {
  iAmError();
}

/**
 * Gives an eternal heart. Provide a number to give a custom amount of hearts. (You can use negative
 * numbers to remove hearts.)
 */
export function eternalHearts(params: string): void {
  addHeart(params, HealthType.ETERNAL);
}

/** Alias for the "startingroom" command. */
export function fool(): void {
  startingRoom();
}

/** Prints the current position of all players. */
export function getPosition(): void {
  for (const player of getPlayers()) {
    const playerName = getPlayerName(player);
    printConsole(
      `Player position for ${playerName}: (${player.Position.X}, ${player.Position.Y})`,
    );
  }
}

/**
 * Gives a Giga Bomb. Provide a number to give a custom amount of Giga Bombs. (You can use negative
 * numbers to remove bombs.)
 */
export function gigaBomb(params: string): void {
  let numBombs = 1;
  if (params !== "") {
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of Giga Bombs to add.");
      return;
    }

    numBombs = num;
  }

  const player = Isaac.GetPlayer();
  player.AddGigaBombs(numBombs);
}

/** Alias for the "goldenbomb" command. */
export function goldBomb(): void {
  goldenBomb();
}

/** Alias for the "goldenhearts" command. */
export function goldHearts(params: string): void {
  goldenHearts(params);
}

/** Alias for the "goldenkey" command. */
export function goldKey(): void {
  goldenKey();
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

/** Alias for the "debug 2" command. */
export function grid(): void {
  Isaac.ExecuteCommand("debug 2");
}

/** Alias for the "debug 11" command. */
export function grid2(): void {
  Isaac.ExecuteCommand("debug 11");
}

/** Alias for the "hearts" command. */
export function h(params: string): void {
  hearts(params);
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

/** Warps to the I AM ERROR room for the floor. */
export function iAmError(): void {
  changeRoom(GridRoom.ERROR);
}

/**
 * Gives a key. Provide a number to give a custom amount of key. (You can use negative numbers to
 * remove keys.)
 */
export function key(params: string): void {
  let numKeys = 1;
  if (params !== "") {
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of keys to add.");
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
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of keys to add.");
      return;
    }

    numKeys = num;
  }

  const player = Isaac.GetPlayer();
  player.AddKeys(numKeys);
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
 * "listall" command instead.
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
 * By default, this command will exclude walls. If that is not desired, use the "listgridall"
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

/** Alias for the "1hp" command. */
export function lowHP(): void {
  oneHP();
}

/** Alias for "debug 9". */
export function luck(): void {
  Isaac.ExecuteCommand("debug 9");
}

/** Completely reveals the entire map, including the Ultra Secret Room. */
export function map(): void {
  const level = game.GetLevel();

  const displayFlags = addFlag(
    DisplayFlag.VISIBLE, // 1 << 0
    DisplayFlag.SHADOW, // 1 << 1
    DisplayFlag.SHOW_ICON, // 1 << 2
  );

  for (const roomGridIndex of irange(MAX_LEVEL_GRID_INDEX)) {
    const roomDesc = level.GetRoomByIdx(roomGridIndex);
    roomDesc.DisplayFlags = displayFlags;
  }

  // Setting the display flag will not actually update the map.
  level.UpdateVisibility();
}

/**
 * Gives a heart container. Provide a number to give a custom amount of heart containers. (You can
 * use negative numbers to remove heart containers.)
 */
export function maxHearts(params: string): void {
  addHeart(params, HealthType.MAX_HEARTS);
}

/** Alias for the "maxhearts" command. */
export function mh(params: string): void {
  maxHearts(params);
}

/** Warps to the first Miniboss Room on the floor. */
export function miniboss(): void {
  warpToRoomType(RoomType.MINI_BOSS);
}

/** Alias for the "disablecurses" command. */
export function noCurses(): void {
  disableCurses();
}

/** Sets every NPC in the room to 1 HP. */
export function oneHP(): void {
  for (const npc of getNPCs()) {
    npc.HitPoints = 1;
  }

  printConsole("Set every NPC to 1 HP.");
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
export function pill(params: string): void {
  if (params === "") {
    printConsole("You must specify a pill name or number.");
    return;
  }

  let pillEffect: PillEffect;
  const num = tonumber(params);
  if (num === undefined) {
    const match = getMapPartialMatch(params, PILL_EFFECT_MAP);
    if (match === undefined) {
      printConsole(`Unknown pill effect: ${params}`);
      return;
    }

    pillEffect = match[1];
  } else {
    if (num < 0 || num > MAX_PILL_EFFECT) {
      printConsole(`Invalid pill effect ID: ${num}`);
      return;
    }

    pillEffect = num;
  }

  const pillEffectName = getPillEffectName(pillEffect);
  Isaac.ExecuteCommand(`g p${pillEffect}`);
  printConsole(`Gave pill: ${pillEffectName} (${pillEffect})`);
}

/** Spawns every pill on the ground, starting at the top-left-most tile. */
export function pills(): void {
  const maxPillColor = getLastEnumValue(PillColor);

  let pillColor = 1;
  let horse = false;
  for (let y = 0; y <= 6; y++) {
    for (let x = 0; x <= 12; x++) {
      if (pillColor === maxPillColor) {
        if (horse) {
          return;
        }
        horse = true;
        pillColor = 1;
      }

      const horsePillColor = getHorsePillColor(pillColor);
      const pillColorToUse = horse ? horsePillColor : pillColor;
      const position = gridCoordinatesToWorldPosition(x, y);
      spawnPill(pillColorToUse, position);

      pillColor += 1;
    }
  }
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
    printConsole(
      "You must supply a collectible type to put as the pocket item.",
    );
    return;
  }

  const num = tonumber(params);
  if (num === undefined) {
    printConsole("That is an invalid collectible type.");
    return;
  }

  const player = Isaac.GetPlayer();
  player.SetPocketActiveItem(num, ActiveSlot.POCKET);
}

/**
 * Gives a poop mana charge. This only affects Tainted Blue Baby. Provide a number to give a custom
 * amount of charges. (You can use negative numbers to remove charges.)
 */
export function poopMana(params: string): void {
  let charges = 1;
  if (params !== "") {
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of mana to add.");
      return;
    }

    charges = num;
  }

  const player = Isaac.GetPlayer();
  player.AddPoopMana(charges);
}

/** Alias for the "getposition" command. */
export function positionCommand(): void {
  getPosition();
}

/** Alias for the "hearts" command. */
export function redHearts(params: string): void {
  hearts(params);
}

/** Alias for the "redhearts" command. */
export function rh(params: string): void {
  redHearts(params);
}

/** Moves the player 0.5 units right. Provide a number to move a custom amount of units. */
export function right(params: string): void {
  movePlayer(params, Direction.RIGHT);
}

/** Logs information about the room to the "log.txt" file. */
export function roomCommand(): void {
  logRoom();
}

/**
 * Gives a rotten heart. Provide a number to give a custom amount of hearts. (You can use negative
 * numbers to remove hearts.)
 */
export function rottenHearts(params: string): void {
  addHeart(params, HealthType.ROTTEN);
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
    printConsole("You must specify a stage number.");
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
    stageString = params.slice(0, params.length - 1);
    stageTypeLetter = finalCharacter;
  } else {
    // e.g. "s 11" for going to the Dark Room
    stageString = params;
    stageTypeLetter = "";
  }

  const stage = tonumber(stageString);
  if (stage === undefined) {
    printConsole(`That is an invalid stage number: ${stage}`);
    return;
  }

  const minStage = 1;
  if (stage < minStage || stage > MAX_STAGE) {
    printConsole(
      `Invalid stage number; must be between ${minStage} and ${MAX_STAGE}.`,
    );
    return;
  }

  Isaac.ExecuteCommand(`stage ${stage}${stageTypeLetter}`);
}

/** Warps to the first Sacrifice Room on the floor. */
export function sacrifice(): void {
  warpToRoomType(RoomType.SACRIFICE);
}

/** Warps to the first Secret Room on the floor. */
export function secret(): void {
  warpToRoomType(RoomType.SECRET);
}

/** Changes to a seeded run, using the seed of the current run. */
export function seedStick(): void {
  const seeds = game.GetSeeds();
  const startSeedString = seeds.GetStartSeedString();
  Isaac.ExecuteCommand(`seed ${startSeedString}`);
}

/** Logs all of the current run's seed effects to the "log.txt" file. */
export function seedsCommand(): void {
  logSeedEffects();
  printConsole('Logged the seed effects to the "log.txt" file.');
}

/**
 * Sets a charge to the player's specified active item. You must provide the active slot number and
 * the number of charges to set.
 */
export function setCharges(params: string): void {
  if (params === "") {
    printConsole(
      "You must specify a slot number and a charge amount. (Use 0 for the primary slot, 1 for the Schoolbag slot, 2 for the pocket item slot, and 3 for the Dice Bag slot.)",
    );
    return;
  }

  const args = params.split(" ");

  if (args.length === 1) {
    printConsole("You must specify the amount of charge to set.");
    return;
  }

  if (args.length !== 2) {
    printConsole("That is an invalid amount of arguments.");
    return;
  }

  const [activeSlotString, chargeString] = args;

  const activeSlot = tonumber(activeSlotString);
  if (activeSlot === undefined) {
    printConsole(`The provided slot number is invalid: ${activeSlotString}`);
    return;
  }

  const activeSlots = getEnumValues(ActiveSlot);
  if (!activeSlots.includes(activeSlot)) {
    printConsole(`The provided slot number is invalid: ${activeSlot}`);
    return;
  }

  const chargeNum = tonumber(chargeString);
  if (chargeNum === undefined) {
    printConsole(`The provided charge amount is invalid: ${chargeString}`);
    return;
  }

  if (chargeNum < 0) {
    printConsole(`The provided charge amount is invalid: ${chargeNum}`);
    return;
  }

  const player = Isaac.GetPlayer();
  player.SetActiveCharge(chargeNum, activeSlot);
}

/**
 * Moves the first player to the specified position.
 *
 * For example:
 * - setposition 100 50
 */
export function setPosition(params: string): void {
  if (params === "") {
    printConsole('You must specify a position. (e.g. "setposition 100 50")');
    return;
  }

  const args = params.split(" ");
  if (args.length !== 2) {
    printConsole('You must specify a position. (e.g. "setposition 100 50")');
    return;
  }

  const [xString, yString] = args;

  const x = tonumber(xString);
  if (x === undefined) {
    printConsole(`That is an invalid x value: ${xString}`);
    return;
  }

  const y = tonumber(yString);
  if (y === undefined) {
    printConsole(`That is an invalid y value: ${yString}`);
    return;
  }

  const player = Isaac.GetPlayer();
  const position = Vector(x, y);
  player.Position = position;
}

/** Alias for the "soulhearts" command. */
export function sh(params: string): void {
  soulHearts(params);
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
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of charges to add.");
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
  const soundEffect = tonumber(params);
  if (soundEffect === undefined) {
    printConsole("That is an invalid sound effect ID.");
    return;
  }

  sfxManager.Play(soundEffect);
}

/** Logs all of the currently playing sound effects to the "log.txt" file. */
export function sounds(): void {
  logSounds();
  printConsole(
    'Logged the currently playing sound effects to the "log.txt" file.',
  );
}

/**
 * Toggles spamming Blood Rights on every frame. Useful for killing enemies very fast without using
 * "debug 10".
 */
export function spam(): void {
  v.run.spamBloodRights = !v.run.spamBloodRights;
  printEnabled(v.run.maxSpeed, "spamming Blood Rights");
}

/** Spawns a golden version of the specified trinket type. */
export function spawnGoldenTrinket(params: string): void {
  if (params === "") {
    printConsole(
      "You must specify the number corresponding to the trinket type.",
    );
    return;
  }

  const trinketType = tonumber(params);
  if (trinketType === undefined) {
    printConsole(`That is an invalid trinket type: ${params}`);
    return;
  }

  const goldenTrinketType = getGoldenTrinketType(trinketType);
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();
  spawnTrinket(goldenTrinketType, centerPos);
}

/** Toggles maximum movement speed and flight. */
export function speed(): void {
  const player = Isaac.GetPlayer();

  v.run.maxSpeed = !v.run.maxSpeed;

  if (v.run.maxSpeed && !player.CanFly) {
    const numEternalHearts = player.GetEternalHearts();
    if (numEternalHearts === 0) {
      player.AddCollectible(CollectibleType.FATE);
      player.AddEternalHearts(-1);
    } else {
      player.AddEternalHearts(-1);
      player.AddCollectible(CollectibleType.FATE);
    }
  }

  player.AddCacheFlags(CacheFlag.SPEED);
  player.EvaluateItems();

  printEnabled(v.run.maxSpeed, "max speed");
}

/** Warps to the starting room of the floor. */
export function startingRoom(): void {
  const level = game.GetLevel();
  const startingRoomIndex = level.GetStartingRoomIndex();
  changeRoom(startingRoomIndex);
}

/** Warps to the first Super Secret Room on the floor. */
export function superSecret(): void {
  warpToRoomType(RoomType.SUPER_SECRET);
}

/** Toggles extremely high tears stat (e.g. fire rate), equivalent of that to soy milk. */
export function tears(): void {
  v.run.maxTears = !v.run.maxTears;

  const player = Isaac.GetPlayer();
  player.AddCacheFlags(CacheFlag.FIRE_DELAY);
  player.EvaluateItems();

  printEnabled(v.run.maxDamage, "debug tear-rate");
}

/** Creates a trapdoor next to the player. */
export function trapdoorCommand(): void {
  spawnTrapdoorOrCrawlspace(true);
}

/** Warps to the first Treasure Room on the floor. */
export function treasure(): void {
  warpToRoomType(RoomType.TREASURE);
}

/** Warps to the first Ultra Secret Room on the floor. */
export function ultraSecret(): void {
  warpToRoomType(RoomType.ULTRA_SECRET);
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
    printConsole("You must specify a room type name or number.");
    return;
  }

  let roomType: RoomType;
  const num = tonumber(params);
  if (num === undefined) {
    const match = getMapPartialMatch(params, ROOM_TYPE_MAP);
    if (match === undefined) {
      printConsole(`Unknown room type: ${params}`);
      return;
    }

    roomType = match[1];
  } else {
    if (num < 1 || num > MAX_ROOM_TYPE) {
      printConsole(`Invalid room type: ${num}`);
      return;
    }

    roomType = num;
  }

  warpToRoomType(roomType);
}
