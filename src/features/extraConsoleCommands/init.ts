/* eslint-disable sort-exports/sort-exports */

import { MAX_SPEED_STAT } from "../../constants";
import { getMapPartialMatch } from "../../functions/map";
import { printConsole } from "../../functions/utils";
import { saveDataManager } from "../saveDataManager/exports";
import * as commands from "./commands";
import v from "./v";

const commandFunctionsMap = new Map<string, (params: string) => void>();

// Most features are turned on via invoking the "upgradeMod" function
// However, this feature is turned on via invoking "enableExtraConsoleCommands",
// so we need a separate variable to track whether it is initialized
let initialized = false;

/**
 * Enables extra console commands which are useful for debugging. See the `isaacscript-common`
 * documentation for details on the commands that are added.
 */
export function enableExtraConsoleCommands(mod: Mod): void {
  initialized = true;
  saveDataManager("extraConsoleCommands", v, featureEnabled);

  mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate); // 1
  mod.AddCallback(
    ModCallbacks.MC_EVALUATE_CACHE,
    evaluateCacheFireDelay,
    CacheFlag.CACHE_FIREDELAY, // 1 << 1
  ); // 8
  mod.AddCallback(
    ModCallbacks.MC_EVALUATE_CACHE,
    evaluateCacheSpeed,
    CacheFlag.CACHE_SPEED, // 1 << 4
  ); // 8
  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  ); // 11
  mod.AddCallback(ModCallbacks.MC_POST_CURSE_EVAL, postCurseEval); // 12
  mod.AddCallback(ModCallbacks.MC_EXECUTE_CMD, executeCmd); // 22
  mod.AddCallback(ModCallbacks.MC_POST_FIRE_TEAR, postFireTear); // 61
}

function featureEnabled() {
  return initialized;
}

// ModCallbacks.MC_POST_UPDATE (1)
function postUpdate() {
  if (v.run.spamBloodRights) {
    const player = Isaac.GetPlayer();
    player.UseActiveItem(CollectibleType.COLLECTIBLE_BLOOD_RIGHTS);
  }
}

// ModCallbacks.MC_EVALUATE_CACHE (8)
// CacheFlag.CACHE_FIREDELAY (1 << 1)
function evaluateCacheFireDelay(player: EntityPlayer) {
  if (v.run.maxTears) {
    player.FireDelay = 1; // Equivalent to Soy Milk
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

// ModCallbacks.MC_POST_CURSE_EVAL (12)
function postCurseEval(curses: int) {
  return v.persistent.disableCurses ? LevelCurse.CURSE_NONE : curses;
}

// ModCallbacks.MC_EXECUTE_CMD (22)
function executeCmd(command: string, params: string) {
  const resultTuple = getMapPartialMatch(command, commandFunctionsMap);
  if (resultTuple === undefined) {
    printConsole("That is an invalid console command.");
    return;
  }

  const [commandName, commandFunction] = resultTuple;
  printConsole(`Command: ${commandName}`);
  commandFunction(params);
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

commandFunctionsMap.set("addcharges", commands.addCharges);
commandFunctionsMap.set("angel", commands.angel);
commandFunctionsMap.set("ascent", commands.ascent);
commandFunctionsMap.set("bedroom", commands.bedroom);
commandFunctionsMap.set("bh", commands.bh);
commandFunctionsMap.set("blackhearts", commands.blackHearts);
commandFunctionsMap.set("blackmarket", commands.blackMarket);
commandFunctionsMap.set("bloodcharges", commands.bloodCharges);
commandFunctionsMap.set("bm", commands.bm);
commandFunctionsMap.set("bomb", commands.bomb);
commandFunctionsMap.set("bombs", commands.bombs);
commandFunctionsMap.set("bonehearts", commands.boneHearts);
commandFunctionsMap.set("boss", commands.boss);
commandFunctionsMap.set("bossrush", commands.bossRush);
commandFunctionsMap.set("brokenhearts", commands.brokenHearts);
commandFunctionsMap.set("card", commands.card);
commandFunctionsMap.set("cards", commands.cards);
commandFunctionsMap.set("cc", commands.cc);
commandFunctionsMap.set("chaoscardtears", commands.chaosCardTears);
commandFunctionsMap.set("character", commands.characterCommand);
commandFunctionsMap.set("charge", commands.charge);
commandFunctionsMap.set("cleanbedroom", commands.cleanBedroom);
commandFunctionsMap.set("coin", commands.coin);
commandFunctionsMap.set("coins", commands.coins);
commandFunctionsMap.set("crawlspace", commands.crawlspace);
commandFunctionsMap.set("d20", commands.d20);
commandFunctionsMap.set("d6", commands.d6);
commandFunctionsMap.set("damage", commands.damage);
commandFunctionsMap.set("dd", commands.dd);
commandFunctionsMap.set("devil", commands.devil);
commandFunctionsMap.set("dirtybedroom", commands.dirtyBedroom);
commandFunctionsMap.set("disablecurses", commands.disableCurses);
commandFunctionsMap.set("down", commands.down);
commandFunctionsMap.set("dungeon", commands.dungeon);
commandFunctionsMap.set("effects", commands.effects);
commandFunctionsMap.set("eh", commands.eh);
commandFunctionsMap.set("error", commands.error);
commandFunctionsMap.set("eternalhearts", commands.eternalHearts);
commandFunctionsMap.set("fool", commands.fool);
commandFunctionsMap.set("getposition", commands.getPosition);
commandFunctionsMap.set("gigabomb", commands.gigaBomb);
commandFunctionsMap.set("goldbomb", commands.goldBomb);
commandFunctionsMap.set("goldhearts", commands.goldHearts);
commandFunctionsMap.set("goldkey", commands.goldKey);
commandFunctionsMap.set("goldenbomb", commands.goldenBomb);
commandFunctionsMap.set("goldenhearts", commands.goldenHearts);
commandFunctionsMap.set("goldenkey", commands.goldenKey);
commandFunctionsMap.set("grid", commands.grid);
commandFunctionsMap.set("grid2", commands.grid2);
commandFunctionsMap.set("h", commands.h);
commandFunctionsMap.set("hearts", commands.hearts);
commandFunctionsMap.set("hitboxes", commands.hitboxes);
commandFunctionsMap.set("iamerror", commands.iAmError);
commandFunctionsMap.set("key", commands.key);
commandFunctionsMap.set("keys", commands.keys);
commandFunctionsMap.set("library", commands.library);
commandFunctionsMap.set("list", commands.list);
commandFunctionsMap.set("listall", commands.listAll);
commandFunctionsMap.set("listgrid", commands.listGrid);
commandFunctionsMap.set("listgridall", commands.listGridAll);
commandFunctionsMap.set("lowhp", commands.lowHP);
commandFunctionsMap.set("luck", commands.luck);
commandFunctionsMap.set("maxhearts", commands.maxHearts);
commandFunctionsMap.set("mh", commands.mh);
commandFunctionsMap.set("miniboss", commands.miniboss);
commandFunctionsMap.set("nocurses", commands.noCurses);
commandFunctionsMap.set("pill", commands.pill);
commandFunctionsMap.set("pills", commands.pills);
commandFunctionsMap.set("planetarium", commands.planetarium);
commandFunctionsMap.set("playsound", commands.playSound);
commandFunctionsMap.set("pocket", commands.pocket);
commandFunctionsMap.set("poopMana", commands.poopMana);
commandFunctionsMap.set("position", commands.positionCommand);
commandFunctionsMap.set("redhearts", commands.redHearts);
commandFunctionsMap.set("rh", commands.rh);
commandFunctionsMap.set("room", commands.roomCommand);
commandFunctionsMap.set("rottenhearts", commands.rottenHearts);
commandFunctionsMap.set("s", commands.s);
commandFunctionsMap.set("sacrifice", commands.sacrifice);
commandFunctionsMap.set("secret", commands.secret);
commandFunctionsMap.set("seedstick", commands.seedStick);
commandFunctionsMap.set("seeds", commands.seedsCommand);
commandFunctionsMap.set("setcharges", commands.setCharges);
commandFunctionsMap.set("setposition", commands.setPosition);
commandFunctionsMap.set("sh", commands.sh);
commandFunctionsMap.set("shop", commands.shop);
commandFunctionsMap.set("smelt", commands.smelt);
commandFunctionsMap.set("soulcharges", commands.soulCharges);
commandFunctionsMap.set("soulhearts", commands.soulHearts);
commandFunctionsMap.set("sound", commands.sound);
commandFunctionsMap.set("sounds", commands.sounds);
commandFunctionsMap.set("spam", commands.spam);
commandFunctionsMap.set("spawngoldentrinket", commands.spawnGoldenTrinket);
commandFunctionsMap.set("speed", commands.speed);
commandFunctionsMap.set("supersecret", commands.superSecret);
commandFunctionsMap.set("startingroom", commands.startingRoom);
commandFunctionsMap.set("tears", commands.tears);
commandFunctionsMap.set("trapdoor", commands.trapdoorCommand);
commandFunctionsMap.set("treasure", commands.treasure);
commandFunctionsMap.set("ultrasecret", commands.ultraSecret);
commandFunctionsMap.set("warp", commands.warp);
