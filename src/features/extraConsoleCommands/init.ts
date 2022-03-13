import { MAX_SPEED_STAT } from "../../constants";
import { getMapPartialMatch } from "../../functions/map";
import { printConsole } from "../../functions/utils";
import { saveDataManager } from "../saveDataManager/exports";
import * as commands from "./commands";
import v from "./v";

const commandFunctionsMap = new Map<string, (params: string) => void>();

let initialized = false;

/**
 * Enables extra console commands which are useful for debugging. See the `isaacscript-common`
 * documentation for details on the commands that are added.
 */
export function enableExtraConsoleCommands(mod: Mod): void {
  initialized = true;
  saveDataManager("extraConsoleCommands", v);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(
    ModCallbacks.MC_EVALUATE_CACHE,
    evaluateCacheSpeed,
    CacheFlag.CACHE_SPEED,
  ); // 8
  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  ); // 11
  mod.AddCallback(ModCallbacks.MC_EXECUTE_CMD, executeCmd); // 22
  mod.AddCallback(ModCallbacks.MC_POST_FIRE_TEAR, postFireTear); // 61
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (v.run.spamBloodRights) {
    const player = Isaac.GetPlayer();
    player.UseActiveItem(CollectibleType.COLLECTIBLE_BLOOD_RIGHTS);
  }
}

// ModCallbacks.MC_EVALUATE_CACHE (8)
// CacheFlag.CACHE_SPEED (1 << 4)
function evaluateCacheSpeed(player: EntityPlayer) {
  if (v.run.maxSpeed) {
    player.MoveSpeed = MAX_SPEED_STAT;
  }
}

// ModCallbacks.MC_ENTITY_TAKE_DMG (11)
// EntityType.ENTITY_PLAYER (1)
function entityTakeDmgPlayer() {
  if (v.run.spamBloodRights) {
    return false;
  }

  return undefined;
}

// ModCallbacks.MC_EXECUTE_CMD (22)
function executeCmd(command: string, params: string) {
  const commandFunction = getMapPartialMatch(command, commandFunctionsMap);
  if (commandFunction === undefined) {
    printConsole("That is an invalid console command.");
  } else {
    commandFunction(params);
  }
}

// ModCallbacks.MC_POST_FIRE_TEAR (61)
function postFireTear(tear: EntityTear) {
  if (v.run.chaosCardTears) {
    tear.ChangeVariant(TearVariant.CHAOS_CARD);
  }

  if (v.run.maxDamage) {
    // If we increase the damage stat too high, then the tears will become bigger than the screen
    // Instead, increase the collision damage of the tear
    tear.CollisionDamage *= 1000;

    // Change the visual of the tear so that it is more clear that we have debug-damage turned on
    tear.ChangeVariant(TearVariant.TOOTH);
  }
}

/**
 * Helper function to add a custom console command.
 *
 * The standard library comes with many existing console commands that are useful for debugging, but
 * you can also add your own commands that are useful for your particular mod. It's easier to add
 * commands to the existing command system than to add logic manually to the ExecuteCmd callback.
 *
 * Before using this function, you must first invoke `enableExtraConsoleCommands`.
 */
export function addConsoleCommand(
  commandName: string,
  commandFunction: (params: string) => void,
): void {
  if (!initialized) {
    error(
      'Before adding extra console commands, you must first enable the feature by invoking the "enableExtraConsoleCommands" function.',
    );
  }

  if (commandFunctionsMap.has(commandName)) {
    error(
      `You cannot add a new console command of "${commandName}" because there is already an existing command by that name. If you want to overwrite a command from the standard library, you can use the "removeExtraConsoleCommand" function.`,
    );
  }

  commandFunctionsMap.set(commandName, commandFunction);
}

/**
 * Helper function to remove a custom console command.
 *
 * The standard library comes with many existing console commands that are useful for debugging. If
 * you want to disable one of them, use this function.
 *
 * Before using this function, you must first invoke `enableExtraConsoleCommands`.
 */
export function removeConsoleCommand(commandName: string): void {
  if (!initialized) {
    error(
      'Before removing console commands, you must first enable the feature by invoking the "enableExtraConsoleCommands" function.',
    );
  }

  if (!commandFunctionsMap.has(commandName)) {
    error(
      `The console command of "${commandName}" does not exist, so you cannot remove it.`,
    );
  }

  commandFunctionsMap.delete(commandName);
}

commandFunctionsMap.set("angel", commands.angel);
commandFunctionsMap.set("ascent", commands.ascent);
commandFunctionsMap.set("blackmarket", commands.blackMarket);
commandFunctionsMap.set("bomb", commands.bomb);
commandFunctionsMap.set("bombs", commands.bombs);
commandFunctionsMap.set("boss", commands.boss);
commandFunctionsMap.set("bm", commands.bm);
commandFunctionsMap.set("card", commands.card);
commandFunctionsMap.set("cards", commands.cards);
commandFunctionsMap.set("cc", commands.cc);
commandFunctionsMap.set("chaoscardtears", commands.chaosCardTears);
commandFunctionsMap.set("character", commands.characterCommand);
commandFunctionsMap.set("coin", commands.coin);
commandFunctionsMap.set("coins", commands.coins);
commandFunctionsMap.set("crawlspace", commands.crawlspace);
commandFunctionsMap.set("damage", commands.damage);
commandFunctionsMap.set("dd", commands.dd);
commandFunctionsMap.set("devil", commands.devil);
commandFunctionsMap.set("down", commands.down);
commandFunctionsMap.set("effects", commands.effects);
commandFunctionsMap.set("error", commands.error);
commandFunctionsMap.set("fool", commands.fool);
commandFunctionsMap.set("goldbomb", commands.goldBomb);
commandFunctionsMap.set("goldenbomb", commands.goldenBomb);
commandFunctionsMap.set("goldkey", commands.goldKey);
commandFunctionsMap.set("goldenkey", commands.goldenKey);
commandFunctionsMap.set("iamerror", commands.IAMERROR);
commandFunctionsMap.set("key", commands.key);
commandFunctionsMap.set("keys", commands.keys);
commandFunctionsMap.set("list", commands.list);
commandFunctionsMap.set("listall", commands.listAll);
commandFunctionsMap.set("listgrid", commands.listGrid);
commandFunctionsMap.set("listgridall", commands.listGridAll);
commandFunctionsMap.set("lowhp", commands.lowHP);
commandFunctionsMap.set("luck", commands.luck);
commandFunctionsMap.set("pill", commands.pill);
commandFunctionsMap.set("pills", commands.pills);
commandFunctionsMap.set("planetarium", commands.planetarium);
commandFunctionsMap.set("pocket", commands.pocket);
commandFunctionsMap.set("position", commands.positionCommand);
commandFunctionsMap.set("room", commands.roomCommand);
commandFunctionsMap.set("s", commands.s);
commandFunctionsMap.set("seeds", commands.seeds);
commandFunctionsMap.set("shop", commands.shop);
commandFunctionsMap.set("sound", commands.sound);
commandFunctionsMap.set("sounds", commands.sounds);
commandFunctionsMap.set("spam", commands.spam);
commandFunctionsMap.set("speed", commands.speed);
commandFunctionsMap.set("startingroom", commands.startingRoom);
commandFunctionsMap.set("trapdoor", commands.trapdoorCommand);
commandFunctionsMap.set("treasure", commands.treasure);
commandFunctionsMap.set("ultra", commands.ultra);
