import { game, sfxManager } from "../../cachedClasses";
import { PILL_GIANT_FLAG } from "../../constants";
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
import { getPlayers } from "../../functions/player";
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
import v from "./v";

const DEFAULT_MOVE_UNITS = 0.5;

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

/** Warps to the Black Market for the floor. */
export function blackMarket(): void {
  changeRoom(GridRooms.ROOM_BLACK_MARKET_IDX);
}

/** Gives a bomb. Provide a number to give a custom amount of bombs. */
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

/** Gives 99 bombs. */
export function bombs(): void {
  const player = Isaac.GetPlayer();
  player.AddBombs(99);
}

/** Warps to the first Boss Room on the floor. */
export function boss(): void {
  warpToRoomType(RoomType.ROOM_BOSS, "Boss Room");
}

/** Alias for the "blackmarket" command. */
export function bm(): void {
  blackMarket();
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

  const num = tonumber(params);
  if (num !== undefined) {
    // Validate the card sub-type
    if (num < 1 || num >= Card.NUM_CARDS) {
      printConsole("That is an invalid card sub-type.");
      return;
    }

    Isaac.ExecuteCommand(`g k${num}`);
    printConsole(`Gave card: ${num}`);
    return;
  }

  const match = getMapPartialMatch(params, CARD_MAP);
  if (match === undefined) {
    printConsole(`Unknown card: ${params}`);
    return;
  }

  Isaac.ExecuteCommand(`g k${match}`);
  printConsole(`Gave card: ${match}`);
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

  const num = tonumber(params);
  if (num !== undefined) {
    // Validate the character sub-type
    if (num < 0 || num >= PlayerType.NUM_PLAYER_TYPES) {
      printConsole("That is an invalid player sub-type.");
      return;
    }

    printConsole(`Restarting as character: ${num}`);
    restart(num);
    return;
  }

  const match = getMapPartialMatch(params, CHARACTER_MAP);
  if (match === undefined) {
    printConsole(`Unknown character: ${params}`);
    return;
  }

  restart(match);
  printConsole(`Restarting as character: ${match}`);
}

/** Gives a coin. Provide a number to give a custom amount of coins. */
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

/** Gives 999 coins. */
export function coins(): void {
  const player = Isaac.GetPlayer();
  player.AddCoins(999);
}

/** Creates a crawlspace next to the player. */
export function crawlspace(): void {
  spawnTrapdoorOrCrawlspace(false);
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

/** Moves the player 0.5 units down. Provide a number to move a custom amount of units. */
export function down(params: string): void {
  movePlayer(params, Direction.DOWN);
}

/** Logs the player's current temporary effects to the "log.txt" file. */
export function effects(): void {
  const player = Isaac.GetPlayer();
  logTemporaryEffects(player);
  printConsole('Logged the player\'s effects to the "log.txt" file.');
}

/** Alias for the "iamerror" command. */
export function error(): void {
  IAMERROR();
}

/** Alias for the "startingroom" command. */
export function fool(): void {
  startingRoom();
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

/** Alias for the "goldenkey" command. */
export function goldKey(): void {
  goldenKey();
}

/** Gives the player a golden key. */
export function goldenKey(): void {
  const player = Isaac.GetPlayer();
  player.AddGoldenKey();
}

/** Warps to the I AM ERROR room for the floor. */
export function IAMERROR(): void {
  changeRoom(GridRooms.ROOM_ERROR_IDX);
}

/** Gives a key. Provide a number to give a custom amount of key. */
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

/** Gives 99 keys. */
export function keys(): void {
  const player = Isaac.GetPlayer();
  player.AddKeys(99);
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

  const num = tonumber(params);
  if (num !== undefined) {
    // Validate the pill ID
    if (num < 1 || num >= PillEffect.NUM_PILL_EFFECTS) {
      printConsole("That is an invalid pill effect ID.");
      return;
    }

    Isaac.ExecuteCommand(`g p${num}`);
    printConsole(`Gave pill: ${num}`);
    return;
  }

  const match = getMapPartialMatch(params, PILL_EFFECT_MAP);
  if (match === undefined) {
    printConsole(`Unknown pill effect: ${params}`);
    return;
  }

  Isaac.ExecuteCommand(`g p${match}`);
  printConsole(`Gave pill: ${match}`);
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
  warpToRoomType(RoomType.ROOM_PLANETARIUM, "Planetarium");
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

/** Prints the current position of all players. */
export function positionCommand(): void {
  for (const player of getPlayers()) {
    const character = player.GetPlayerType();
    printConsole(
      `Player position for character ${character}: (${player.Position.X}, ${player.Position.Y})`,
    );
  }
}

/** Logs information about the room to the "log.txt" file. */
export function roomCommand(): void {
  logRoom();
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

/** Logs all of the current run's seed effects to the "log.txt" file. */
export function seeds(): void {
  logAllSeedEffects();
  printConsole('Logged the seed effects to the "log.txt" file.');
}

/** Warps to the first shop on the floor. */
export function shop(): void {
  warpToRoomType(RoomType.ROOM_SHOP, "shop");
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
}

/** Toggles maximum movement speed and flight. */
export function speed(): void {
  const player = Isaac.GetPlayer();

  v.run.maxSpeed = !v.run.maxSpeed;

  if (
    v.run.maxSpeed &&
    !player.HasCollectible(CollectibleType.COLLECTIBLE_FATE)
  ) {
    const eternalHearts = player.GetEternalHearts();
    if (eternalHearts === 0) {
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

/** Creates a trapdoor next to the player. */
export function trapdoorCommand(): void {
  spawnTrapdoorOrCrawlspace(true);
}

/** Warps to the first Treasure Room on the floor. */
export function treasure(): void {
  warpToRoomType(RoomType.ROOM_TREASURE, "Treasure Room");
}

/** Warps to the first Ultra Secret Room on the floor. */
export function ultra(): void {
  warpToRoomType(RoomType.ROOM_ULTRASECRET, "Ultra Secret Room");
}

// -----------
// Subroutines
// -----------

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

function warpToRoomType(roomType: RoomType, roomTypeName: string) {
  const gridIndexes = getRoomGridIndexesForType(roomType);
  if (gridIndexes.length === 0) {
    printConsole(`There are no ${roomTypeName}s on this floor.`);
    return;
  }

  const firstGridIndex = gridIndexes[0];
  changeRoom(firstGridIndex);
}
