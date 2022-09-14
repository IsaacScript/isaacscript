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
import { addFlag, bitFlags } from "../../functions/flag";
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
    evaluateCacheDamage,
    CacheFlag.DAMAGE, // 1 << 0
  ); // 8
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
  if (v.persistent.spamBloodRights) {
    const player = Isaac.GetPlayer();
    player.UseActiveItem(CollectibleType.BLOOD_RIGHTS);
  }
}

// ModCallback.EVALUATE_CACHE (8)
// CacheFlag.DAMAGE (1 << 0)
function evaluateCacheDamage(player: EntityPlayer) {
  if (v.persistent.damage) {
    player.Damage = v.persistent.damageAmount;
  }
}

// ModCallback.EVALUATE_CACHE (8)
// CacheFlag.FIRE_DELAY (1 << 1)
function evaluateCacheFireDelay(player: EntityPlayer) {
  if (v.persistent.tears) {
    player.FireDelay = v.persistent.tearsAmount; // Equivalent to Soy Milk
  }
}

// ModCallback.EVALUATE_CACHE (8)
// CacheFlag.SPEED (1 << 4)
function evaluateCacheSpeed(player: EntityPlayer) {
  if (v.persistent.speed) {
    player.MoveSpeed = v.persistent.speedAmount;
  }
}

// ModCallback.EVALUATE_CACHE (8)
// CacheFlag.FLYING (1 << 7)
function evaluateCacheFlying(player: EntityPlayer) {
  if (v.persistent.flight) {
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
  if (v.persistent.spamBloodRights) {
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

  let newCurses = curses;

  // 1
  if (v.persistent.darkness) {
    newCurses = addFlag(newCurses, LevelCurse.DARKNESS);
  }

  // 2
  if (v.persistent.labyrinth) {
    newCurses = addFlag(newCurses, LevelCurse.LABYRINTH);
  }

  // 3
  if (v.persistent.lost) {
    newCurses = addFlag(newCurses, LevelCurse.LOST);
  }

  // 4
  if (v.persistent.unknown) {
    newCurses = addFlag(newCurses, LevelCurse.UNKNOWN);
  }

  // 5
  if (v.persistent.cursed) {
    newCurses = addFlag(newCurses, LevelCurse.CURSED);
  }

  // 6
  if (v.persistent.maze) {
    newCurses = addFlag(newCurses, LevelCurse.MAZE);
  }

  // 7
  if (v.persistent.blind) {
    newCurses = addFlag(newCurses, LevelCurse.BLIND);
  }

  // 8
  if (v.persistent.giant) {
    newCurses = addFlag(newCurses, LevelCurse.GIANT);
  }

  return curses === newCurses ? undefined : newCurses;
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
  if (v.persistent.chaosCardTears) {
    tear.ChangeVariant(TearVariant.CHAOS_CARD);
  }
}
