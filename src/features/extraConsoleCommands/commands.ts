import { game, sfxManager } from "../../cachedClasses";
import { PILL_GIANT_FLAG, TRINKET_GOLDEN_FLAG } from "../../constants";
import { HealthType } from "../../enums/HealthType";
import { getCardName } from "../../functions/cards";
import { spawnGridEntityWithVariant } from "../../functions/gridEntity";
import {
  logAllSeedEffects,
  logEntities,
  logGridEntities,
  logRoom,
  logSounds,
  logTemporaryEffects,
} from "../../functions/log";
import { getMapPartialMatch } from "../../functions/map";
import { getNPCs } from "../../functions/npc";
import { getPillEffectName } from "../../functions/pills";
import {
  getCharacterName,
  getPlayers,
  useActiveItemTemp,
} from "../../functions/player";
import { addPlayerHealthType } from "../../functions/playerHealth";
import {
  changeRoom,
  getRoomData,
  getRoomGridIndexesForType,
  gridToPos,
} from "../../functions/rooms";
import { restart } from "../../functions/run";
import { printConsole } from "../../functions/utils";
import { directionToVector } from "../../functions/vector";
import { CARD_MAP } from "../../maps/cardMap";
import { CHARACTER_MAP } from "../../maps/characterMap";
import { PILL_EFFECT_MAP } from "../../maps/pillEffectMap";
import { ROOM_TYPE_MAP } from "../../maps/roomTypeMap";
import {
  DEFAULT_ROOM_TYPE_NAME,
  ROOM_TYPE_NAMES,
} from "../../objects/roomTypeNames";
import v from "./v";

const DEFAULT_MOVE_UNITS = 0.5;

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
    activeSlot < ActiveSlot.SLOT_PRIMARY ||
    activeSlot > ActiveSlot.SLOT_POCKET2
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
  game.SetStateFlag(GameStateFlag.STATE_BACKWARDS_PATH_INIT, true);
  game.SetStateFlag(GameStateFlag.STATE_BACKWARDS_PATH, true);

  printConsole("Set Ascent flags.");
}

/** Warps to the first Clean Bedroom or Dirty Bedroom on the floor. */
export function bedroom(): void {
  const cleanBedroomGridIndexes = getRoomGridIndexesForType(
    RoomType.ROOM_ISAACS,
  );
  if (cleanBedroomGridIndexes.length > 0) {
    warpToRoomType(RoomType.ROOM_ISAACS);
    return;
  }

  const dirtyBedroomGridIndexes = getRoomGridIndexesForType(
    RoomType.ROOM_BARREN,
  );
  if (dirtyBedroomGridIndexes.length > 0) {
    warpToRoomType(RoomType.ROOM_BARREN);
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
  changeRoom(GridRooms.ROOM_BLACK_MARKET_IDX);
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
  warpToRoomType(RoomType.ROOM_BOSS);
}

/** Warps to the Boss Rush for the floor. */
export function bossRush(): void {
  changeRoom(GridRooms.ROOM_BOSSRUSH_IDX);
}

/** Alias for the "blackmarket" command. */
export function bm(): void {
  blackMarket();
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
 * Example:
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
    if (num < 1 || num >= Card.NUM_CARDS) {
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
      if (cardType === Card.NUM_CARDS) {
        return;
      }

      const position = gridToPos(x, y);
      Isaac.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_TAROTCARD,
        cardType,
        position,
        Vector.Zero,
        undefined,
      );
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
 * Example:
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
    if (num < 0 || num >= PlayerType.NUM_PLAYER_TYPES) {
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
  warpToRoomType(RoomType.ROOM_ISAACS);
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

/** Uses the D6. */
export function d6(): void {
  const player = Isaac.GetPlayer();
  useActiveItemTemp(player, CollectibleType.COLLECTIBLE_D6);
}

/** Uses the D20. */
export function d20(): void {
  const player = Isaac.GetPlayer();
  useActiveItemTemp(player, CollectibleType.COLLECTIBLE_D20);
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
  warpToRoomType(RoomType.ROOM_BARREN);
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
  changeRoom(GridRooms.ROOM_DUNGEON_IDX);
}

/** Logs the player's current temporary effects to the "log.txt" file. */
export function effects(): void {
  const player = Isaac.GetPlayer();
  logTemporaryEffects(player);
  printConsole('Logged the player\'s effects to the "log.txt" file.');
}

/** Alias for the "eternalhearts" command. */
export function eh(params: string): void {
  eternalHearts(params);
}

/** Alias for the "iamerror" command. */
export function error(): void {
  IAMERROR();
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
    const character = player.GetPlayerType();
    printConsole(
      `Player position for character ${character}: (${player.Position.X}, ${player.Position.Y})`,
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

/** Alias for the "goldenhearts" command. */
export function goldHearts(params: string): void {
  goldenHearts(params);
}

/** Alias for the "goldenkey" command. */
export function goldKey(): void {
  goldenKey();
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
 * Gives a half red heart. Provide a number to give a custom amount of hearts. (You can use
 * negative numbers to remove hearts.)
 */
export function hearts(params: string): void {
  addHeart(params, HealthType.RED);
}

/** Alias for the "debug 6" command. */
export function hitboxes(): void {
  Isaac.ExecuteCommand("debug 6");
}

/** Warps to the I AM ERROR room for the floor. */
export function IAMERROR(): void {
  changeRoom(GridRooms.ROOM_ERROR_IDX);
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

/** Warps to the first Library on the floor. */
export function library(): void {
  warpToRoomType(RoomType.ROOM_LIBRARY);
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

/** Sets every NPC in the room to 1 HP. */
export function lowHP(): void {
  for (const npc of getNPCs()) {
    npc.HitPoints = 1;
  }

  printConsole("Set every NPC to 1 HP.");
}

/** Alias for "debug 9". */
export function luck(): void {
  Isaac.ExecuteCommand("debug 9");
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
  warpToRoomType(RoomType.ROOM_MINIBOSS);
}

/** Alias for the "disablecurses" command. */
export function noCurses(): void {
  disableCurses();
}

/**
 * Gives a pill with the specified pill effect. Accepts either the effect ID or the partial name of
 * the effect.
 *
 * Example:
 * - pill 5 - Gives a Full Health pill.
 * - pill suns - Gives a Feels like I'm walking on sunshine! pill.
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
    if (num < 1 || num >= PillEffect.NUM_PILL_EFFECTS) {
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
  let pillColor = 1;
  let horse = false;
  for (let y = 0; y <= 6; y++) {
    for (let x = 0; x <= 12; x++) {
      if (pillColor === PillColor.NUM_PILLS) {
        if (horse) {
          return;
        }
        horse = true;
        pillColor = 1;
      }

      const horsePillColor = pillColor + PILL_GIANT_FLAG;
      const subType = horse ? horsePillColor : pillColor;
      const position = gridToPos(x, y);
      Isaac.Spawn(
        EntityType.ENTITY_PICKUP,
        PickupVariant.PICKUP_PILL,
        subType,
        position,
        Vector.Zero,
        undefined,
      );

      pillColor += 1;
    }
  }
}

/** Warps to the first Planetarium on the floor. */
export function planetarium(): void {
  warpToRoomType(RoomType.ROOM_PLANETARIUM);
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
  player.SetPocketActiveItem(num, ActiveSlot.SLOT_POCKET);
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
 * Example:
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
  const maxStage = 13;
  if (stage < minStage || stage > maxStage) {
    printConsole(
      `Invalid stage number; must be between ${minStage} and ${maxStage}.`,
    );
    return;
  }

  Isaac.ExecuteCommand(`stage ${stage}${stageTypeLetter}`);
}

/** Warps to the first Sacrifice Room on the floor. */
export function sacrifice(): void {
  warpToRoomType(RoomType.ROOM_SACRIFICE);
}

/** Warps to the first Secret Room on the floor. */
export function secret(): void {
  warpToRoomType(RoomType.ROOM_SECRET);
}

/** Logs all of the current run's seed effects to the "log.txt" file. */
export function seedsCommand(): void {
  logAllSeedEffects();
  printConsole('Logged the seed effects to the "log.txt" file.');
}

/** Changes to a seeded run, using the seed of the current run. */
export function seedStick(): void {
  const seeds = game.GetSeeds();
  const startSeedString = seeds.GetStartSeedString();
  Isaac.ExecuteCommand(`seed ${startSeedString}`);
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

  if (
    activeSlot < ActiveSlot.SLOT_PRIMARY ||
    activeSlot > ActiveSlot.SLOT_POCKET2
  ) {
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
 * Example:
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
  warpToRoomType(RoomType.ROOM_SHOP);
}

/** Uses the Smelter to smelt the current player's trinket. */
export function smelt(): void {
  const player = Isaac.GetPlayer();
  useActiveItemTemp(player, CollectibleType.COLLECTIBLE_SMELTER);
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
 * Example:
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

  const goldenTrinketType = trinketType + TRINKET_GOLDEN_FLAG;
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();
  Isaac.Spawn(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_TRINKET,
    goldenTrinketType,
    centerPos,
    Vector.Zero,
    undefined,
  );
}

/** Toggles maximum movement speed and flight. */
export function speed(): void {
  const player = Isaac.GetPlayer();

  v.run.maxSpeed = !v.run.maxSpeed;

  if (
    v.run.maxSpeed &&
    !player.HasCollectible(CollectibleType.COLLECTIBLE_FATE)
  ) {
    const numEternalHearts = player.GetEternalHearts();
    if (numEternalHearts === 0) {
      player.AddCollectible(CollectibleType.COLLECTIBLE_FATE);
      player.AddEternalHearts(-1);
    } else {
      player.AddEternalHearts(-1);
      player.AddCollectible(CollectibleType.COLLECTIBLE_FATE);
    }
  }

  player.AddCacheFlags(CacheFlag.CACHE_SPEED);
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
  warpToRoomType(RoomType.ROOM_SUPERSECRET);
}

/** Toggles extremely high tears stat (e.g. fire rate), equivalent of that to soy milk. */
export function tears(): void {
  v.run.maxTears = !v.run.maxTears;

  const player = Isaac.GetPlayer();
  player.AddCacheFlags(CacheFlag.CACHE_FIREDELAY);
  player.EvaluateItems();

  printEnabled(v.run.maxDamage, "debug tear-rate");
}

/** Creates a trapdoor next to the player. */
export function trapdoorCommand(): void {
  spawnTrapdoorOrCrawlspace(true);
}

/** Warps to the first Treasure Room on the floor. */
export function treasure(): void {
  warpToRoomType(RoomType.ROOM_TREASURE);
}

/** Warps to the first Ultra Secret Room on the floor. */
export function ultraSecret(): void {
  warpToRoomType(RoomType.ROOM_ULTRASECRET);
}

/**
 * Warps to the specified room type. Accepts either the room type number or the partial name of the
 * room type.
 *
 * Example:
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
    if (num < 1 || num >= RoomType.NUM_ROOMTYPES) {
      printConsole(`Invalid room type: ${num}`);
      return;
    }

    roomType = num;
  }

  warpToRoomType(roomType);
}

// -----------
// Subroutines
// -----------

function addHeart(params: string, healthType: HealthType) {
  let numHearts = healthType === HealthType.MAX_HEARTS ? 2 : 1;
  if (params !== "") {
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of hearts to add.");
      return;
    }

    numHearts = num;
  }

  const player = Isaac.GetPlayer();
  addPlayerHealthType(player, healthType, numHearts);
}

function devilAngel(useDevil: boolean) {
  const level = game.GetLevel();

  const devilAngelRoomData = getRoomData(GridRooms.ROOM_DEVIL_IDX);
  if (devilAngelRoomData !== undefined) {
    const roomType = devilAngelRoomData.Type;
    const conflictingType = useDevil
      ? RoomType.ROOM_ANGEL
      : RoomType.ROOM_DEVIL;
    if (roomType === conflictingType) {
      // Delete the room data, which will allow the "Level.InitializeDevilAngelRoom" method to work
      const roomDesc = level.GetRoomByIdx(GridRooms.ROOM_DEVIL_IDX);
      roomDesc.Data = undefined;
    }
  }

  if (useDevil) {
    level.InitializeDevilAngelRoom(false, true);
  } else {
    level.InitializeDevilAngelRoom(true, false);
  }

  changeRoom(GridRooms.ROOM_DEVIL_IDX);
}

function listEntities(params: string, includeBackgroundEffects: boolean) {
  let entityTypeFilter: int | undefined;
  if (params !== "") {
    entityTypeFilter = tonumber(params);
    if (entityTypeFilter === undefined) {
      printConsole("That is an invalid entity type to filter by.");
      return;
    }
  }

  logEntities(includeBackgroundEffects, entityTypeFilter);
  printConsole('Logged the entities in the room to the "log.txt" file.');
}

function listGridEntities(params: string, includeWalls: boolean) {
  let gridEntityTypeFilter: int | undefined;
  if (params !== "") {
    gridEntityTypeFilter = tonumber(params);
    if (gridEntityTypeFilter === undefined) {
      printConsole("That is an invalid grid entity type to filter by.");
      return;
    }
  }

  logGridEntities(includeWalls, gridEntityTypeFilter);
  printConsole('Logged the grid entities in the room to the "log.txt" file.');
}

function movePlayer(params: string, direction: Direction) {
  let amount = DEFAULT_MOVE_UNITS;
  if (params !== "") {
    const num = tonumber(params);
    if (num === undefined) {
      printConsole("That is an invalid amount of units to move.");
      return;
    }

    amount = num;
  }

  const player = Isaac.GetPlayer();
  const vector = directionToVector(direction);
  const modifiedVector = vector.mul(amount);
  player.Position = player.Position.add(modifiedVector);
}

function printEnabled(enabled: boolean, description: string) {
  const enabledText = enabled ? "Enabled" : "Disabled";
  printConsole(`${enabledText} ${description}.`);
}

function spawnTrapdoorOrCrawlspace(trapdoor: boolean) {
  const room = game.GetRoom();
  const player = Isaac.GetPlayer();
  const position = room.FindFreeTilePosition(player.Position, 0);
  const gridIndex = room.GetGridIndex(position);
  const gridEntityType = trapdoor
    ? GridEntityType.GRID_TRAPDOOR
    : GridEntityType.GRID_STAIRS;

  spawnGridEntityWithVariant(gridEntityType, 0, gridIndex);
}

function warpToRoomType(roomType: RoomType) {
  const roomTypeName = ROOM_TYPE_NAMES[roomType];
  if (roomTypeName === undefined || roomTypeName === DEFAULT_ROOM_TYPE_NAME) {
    printConsole(`Invalid room type: ${roomType}`);
  }

  const gridIndexes = getRoomGridIndexesForType(roomType);
  if (gridIndexes.length === 0) {
    printConsole(`There are no ${roomTypeName}s on this floor.`);
    return;
  }

  const firstGridIndex = gridIndexes[0];
  changeRoom(firstGridIndex);
  printConsole(`Warped to room type: ${roomTypeName} (${roomType})`);
}
