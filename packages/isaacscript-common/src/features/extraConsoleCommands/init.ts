import {
  CacheFlag,
  CollectibleType,
  DamageFlag,
  EntityType,
  LevelCurse,
  ModCallback,
  TearVariant,
} from "isaac-typescript-definitions";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { MAX_SPEED_STAT } from "../../core/constants";
import { addFlag, bitFlags, hasFlag } from "../../functions/flag";
import { getMapPartialMatch } from "../../functions/map";
import { printConsole } from "../../functions/utils";
import { debugDisplayInit } from "../debugDisplay/debugDisplay";
import { saveDataManager } from "../saveDataManager/exports";
import * as commandsDisplay from "./commandsDisplay";
import * as commands from "./listCommands";
import v, { extraConsoleCommandsFunctionMap } from "./v";

export function extraConsoleCommandsInit(mod: ModUpgraded): void {
  saveDataManager("extraConsoleCommands", v, false);
  initCommandMap();
  initCallbacks(mod);
  debugDisplayInit(mod);
}

function initCommandMap() {
  for (const [funcName, func] of Object.entries(commands)) {
    extraConsoleCommandsFunctionMap.set(funcName, func);
  }

  for (const [funcName, func] of Object.entries(commandsDisplay)) {
    extraConsoleCommandsFunctionMap.set(funcName, func);
  }
}

function initCallbacks(mod: ModUpgraded) {
  mod.AddCallback(ModCallback.POST_UPDATE, postUpdate); // 1
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCacheFireDelay,
    CacheFlag.FIRE_DELAY, // 1 << 1
  ); // 8
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCacheSpeed,
    CacheFlag.SPEED, // 1 << 4
  ); // 8
  mod.AddCallback(
    ModCallback.EVALUATE_CACHE,
    evaluateCacheFlying,
    CacheFlag.FLYING, // 1 << 7
  );
  mod.AddCallback(
    ModCallback.ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.PLAYER,
  ); // 11
  mod.AddCallback(ModCallback.POST_CURSE_EVAL, postCurseEval); // 12
  mod.AddCallback(ModCallback.EXECUTE_CMD, executeCmd); // 22
  mod.AddCallback(ModCallback.POST_FIRE_TEAR, postFireTear); // 61
}

// ModCallback.POST_UPDATE (1)
function postUpdate() {
  if (v.run.spamBloodRights) {
    const player = Isaac.GetPlayer();
    player.UseActiveItem(CollectibleType.BLOOD_RIGHTS);
  }
}

// ModCallback.EVALUATE_CACHE (8)
// CacheFlag.FIRE_DELAY (1 << 1)
function evaluateCacheFireDelay(player: EntityPlayer) {
  if (v.run.maxTears) {
    player.FireDelay = 1; // Equivalent to Soy Milk
  }
}

// ModCallback.EVALUATE_CACHE (8)
// CacheFlag.SPEED (1 << 4)
function evaluateCacheSpeed(player: EntityPlayer) {
  if (v.run.maxSpeed) {
    player.MoveSpeed = MAX_SPEED_STAT;
  }
}

// ModCallback.EVALUATE_CACHE (8)
// CacheFlag.FLYING (1 << 7)
function evaluateCacheFlying(player: EntityPlayer) {
  if (v.run.flight) {
    player.CanFly = true;
  }
}

// ModCallback.ENTITY_TAKE_DMG (11)
// EntityType.PLAYER (1)
function entityTakeDmgPlayer(
  _entity: Entity,
  _damageAmount: float,
  _damageFlags: BitFlags<DamageFlag>,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
) {
  if (v.run.spamBloodRights) {
    return false;
  }

  return undefined;
}

// ModCallback.POST_CURSE_EVAL (12)
function postCurseEval(
  curses: BitFlags<LevelCurse>,
): BitFlags<LevelCurse> | undefined {
  if (v.persistent.disableCurses) {
    return bitFlags(LevelCurse.NONE);
  }

  // 1
  if (v.persistent.darkness && !hasFlag(curses, LevelCurse.DARKNESS)) {
    curses = addFlag(curses, LevelCurse.DARKNESS);
  }

  // 2
  if (v.persistent.labyrinth && !hasFlag(curses, LevelCurse.LABYRINTH)) {
    curses = addFlag(curses, LevelCurse.LABYRINTH);
  }

  // 3
  if (v.persistent.lost && !hasFlag(curses, LevelCurse.LOST)) {
    curses = addFlag(curses, LevelCurse.LOST);
  }

  // 4
  if (v.persistent.unknown && !hasFlag(curses, LevelCurse.UNKNOWN)) {
    curses = addFlag(curses, LevelCurse.UNKNOWN);
  }

  // 5
  if (v.persistent.cursed && !hasFlag(curses, LevelCurse.CURSED)) {
    curses = addFlag(curses, LevelCurse.CURSED);
  }

  // 6
  if (v.persistent.maze && !hasFlag(curses, LevelCurse.MAZE)) {
    curses = addFlag(curses, LevelCurse.MAZE);
  }

  // 7
  if (v.persistent.blind && !hasFlag(curses, LevelCurse.BLIND)) {
    curses = addFlag(curses, LevelCurse.BLIND);
  }

  // 8
  if (v.persistent.giant && !hasFlag(curses, LevelCurse.GIANT)) {
    curses = addFlag(curses, LevelCurse.GIANT);
  }

  return curses;
}

// ModCallback.EXECUTE_CMD (22)
function executeCmd(command: string, params: string) {
  const resultTuple = getMapPartialMatch(
    command,
    extraConsoleCommandsFunctionMap,
  );
  if (resultTuple === undefined) {
    printConsole("That is an invalid console command.");
    return;
  }

  const [commandName, commandFunction] = resultTuple;
  printConsole(`Command: ${commandName}`);
  commandFunction(params);
}

// ModCallback.POST_FIRE_TEAR (61)
function postFireTear(tear: EntityTear) {
  if (v.run.chaosCardTears) {
    tear.ChangeVariant(TearVariant.CHAOS_CARD);
  }

  if (v.run.maxDamage) {
    // If we increase the damage stat too high, then the tears will become bigger than the screen.
    // Instead, increase the collision damage of the tear.
    tear.CollisionDamage *= 1000;

    // Change the visual of the tear so that it is more clear that we have debug-damage turned on.
    tear.ChangeVariant(TearVariant.TOOTH);
  }
}
