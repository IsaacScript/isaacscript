import {
  CacheFlag,
  CollectibleType,
  EntityType,
  LevelCurse,
  ModCallback,
  TearVariant,
} from "isaac-typescript-definitions";
import { ModUpgraded } from "../../classes/ModUpgraded";
import { MAX_SPEED_STAT } from "../../constants";
import { getMapPartialMatch } from "../../functions/map";
import { printConsole } from "../../functions/utils";
import { debugDisplayInit } from "../debugDisplay/debugDisplay";
import { saveDataManager } from "../saveDataManager/exports";
import * as commandsDisplay from "./commandsDisplay";
import * as commands from "./listCommands";
import v from "./v";

const commandFunctionsMap = new Map<string, (params: string) => void>();

// Most features are turned on via invoking the "upgradeMod" function. However, this feature is
// turned on via invoking "enableExtraConsoleCommands", so we need a separate variable to track
// whether it is initialized.
let initialized = false;

/**
 * Enables extra console commands which are useful for debugging. See [the
 * docs](https://isaacscript.github.io/isaacscript-common/features/extraConsoleCommands_listCommands)
 * for the specific commands that are added.
 */
export function enableExtraConsoleCommands(mod: ModUpgraded): void {
  initialized = true;
  saveDataManager("extraConsoleCommands", v, featureEnabled);
  debugDisplayInit(mod);

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
    ModCallback.ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.PLAYER,
  ); // 11
  mod.AddCallback(ModCallback.POST_CURSE_EVAL, postCurseEval); // 12
  mod.AddCallback(ModCallback.EXECUTE_CMD, executeCmd); // 22
  mod.AddCallback(ModCallback.POST_FIRE_TEAR, postFireTear); // 61
}

function featureEnabled() {
  return initialized;
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

// ModCallback.ENTITY_TAKE_DMG (11)
// EntityType.PLAYER (1)
function entityTakeDmgPlayer() {
  if (v.run.spamBloodRights) {
    return false;
  }

  return undefined;
}

// ModCallback.POST_CURSE_EVAL (12)
function postCurseEval(curses: int) {
  return v.persistent.disableCurses ? LevelCurse.NONE : curses;
}

// ModCallback.EXECUTE_CMD (22)
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

commandFunctionsMap.set("1hp", commands.oneHP);
commandFunctionsMap.set("addCharges", commands.addCharges);
commandFunctionsMap.set("angel", commands.angel);
commandFunctionsMap.set("ascent", commands.ascent);
commandFunctionsMap.set("bedroom", commands.bedroom);
commandFunctionsMap.set("bh", commands.bh);
commandFunctionsMap.set("blackhearts", commands.blackHearts);
commandFunctionsMap.set("blackMarket", commands.blackMarket);
commandFunctionsMap.set("bloodCharges", commands.bloodCharges);
commandFunctionsMap.set("bm", commands.bm);
commandFunctionsMap.set("bomb", commands.bomb);
commandFunctionsMap.set("bombDisplay", commandsDisplay.bombDisplay);
commandFunctionsMap.set("bombsDisplay", commandsDisplay.bombsDisplay);
commandFunctionsMap.set("bombs", commands.bombs);
commandFunctionsMap.set("boneHearts", commands.boneHearts);
commandFunctionsMap.set("boss", commands.boss);
commandFunctionsMap.set("bossRush", commands.bossRush);
commandFunctionsMap.set("brokenHearts", commands.brokenHearts);
commandFunctionsMap.set("card", commands.card);
commandFunctionsMap.set("cards", commands.cards);
commandFunctionsMap.set("cc", commands.cc);
commandFunctionsMap.set("chaosCardTears", commands.chaosCardTears);
commandFunctionsMap.set("character", commands.characterCommand);
commandFunctionsMap.set("charge", commands.charge);
commandFunctionsMap.set("cleanBedroom", commands.cleanBedroom);
commandFunctionsMap.set("coin", commands.coin);
commandFunctionsMap.set("coins", commands.coins);
commandFunctionsMap.set("crawlSpace", commands.crawlSpace);
commandFunctionsMap.set("d20", commands.d20);
commandFunctionsMap.set("d6", commands.d6);
commandFunctionsMap.set("damage", commands.damage);
commandFunctionsMap.set("dd", commands.dd);
commandFunctionsMap.set("devil", commands.devil);
commandFunctionsMap.set("dirtyBedroom", commands.dirtyBedroom);
commandFunctionsMap.set("disableCurses", commands.disableCurses);
commandFunctionsMap.set("doorDisplay", commandsDisplay.doorDisplay);
commandFunctionsMap.set("doorsDisplay", commandsDisplay.doorsDisplay);
commandFunctionsMap.set("down", commands.down);
commandFunctionsMap.set("dungeon", commands.dungeon);
commandFunctionsMap.set("effectDisplay", commandsDisplay.effectDisplay);
commandFunctionsMap.set("effects", commands.effects);
commandFunctionsMap.set("effectsDisplay", commandsDisplay.effectsDisplay);
commandFunctionsMap.set("eh", commands.eh);
commandFunctionsMap.set("error", commands.error);
commandFunctionsMap.set("eternalHearts", commands.eternalHearts);
commandFunctionsMap.set("familiarDisplay", commandsDisplay.familiarDisplay);
commandFunctionsMap.set("familiarsDisplay", commandsDisplay.familiarsDisplay);
commandFunctionsMap.set("fool", commands.fool);
commandFunctionsMap.set("getPosition", commands.getPosition);
commandFunctionsMap.set("gigaBomb", commands.gigaBomb);
commandFunctionsMap.set("goldBomb", commands.goldBomb);
commandFunctionsMap.set("goldHearts", commands.goldHearts);
commandFunctionsMap.set("goldKey", commands.goldKey);
commandFunctionsMap.set("goldenBomb", commands.goldenBomb);
commandFunctionsMap.set("goldenHearts", commands.goldenHearts);
commandFunctionsMap.set("goldenKey", commands.goldenKey);
commandFunctionsMap.set("grid", commands.grid);
commandFunctionsMap.set("grid2", commands.grid2);
commandFunctionsMap.set("gridEntities", commands.gridEntities);
commandFunctionsMap.set("h", commands.h);
commandFunctionsMap.set("hearts", commands.hearts);
commandFunctionsMap.set("hitboxes", commands.hitboxes);
commandFunctionsMap.set("iAmError", commands.iAmError);
commandFunctionsMap.set("key", commands.key);
commandFunctionsMap.set("keys", commands.keys);
commandFunctionsMap.set("knifeDisplay", commandsDisplay.knifeDisplay);
commandFunctionsMap.set("knivesDisplay", commandsDisplay.knivesDisplay);
commandFunctionsMap.set("laserDisplay", commandsDisplay.laserDisplay);
commandFunctionsMap.set("lasersDisplay", commandsDisplay.lasersDisplay);
commandFunctionsMap.set("left", commands.left);
commandFunctionsMap.set("library", commands.library);
commandFunctionsMap.set("list", commands.list);
commandFunctionsMap.set("listAll", commands.listAll);
commandFunctionsMap.set("listGrid", commands.listGrid);
commandFunctionsMap.set("listGridAll", commands.listGridAll);
commandFunctionsMap.set("lowHP", commands.lowHP);
commandFunctionsMap.set("luck", commands.luck);
commandFunctionsMap.set("mana", commands.mana);
commandFunctionsMap.set("map", commands.map);
commandFunctionsMap.set("maxHearts", commands.maxHearts);
commandFunctionsMap.set("mh", commands.mh);
commandFunctionsMap.set("miniboss", commands.miniboss);
commandFunctionsMap.set("noCurses", commands.noCurses);
commandFunctionsMap.set("npcDisplay", commandsDisplay.npcDisplay);
commandFunctionsMap.set("npcsDisplay", commandsDisplay.npcsDisplay);
commandFunctionsMap.set("pickupDisplay", commandsDisplay.pickupDisplay);
commandFunctionsMap.set("pickupsDisplay", commandsDisplay.pickupsDisplay);
commandFunctionsMap.set("pill", commands.pill);
commandFunctionsMap.set("pills", commands.pills);
commandFunctionsMap.set("pitDisplay", commandsDisplay.pitDisplay);
commandFunctionsMap.set("pitsDisplay", commandsDisplay.pitsDisplay);
commandFunctionsMap.set("planetarium", commands.planetarium);
commandFunctionsMap.set("playerDisplay", commandsDisplay.playerDisplay);
commandFunctionsMap.set("playersDisplay", commandsDisplay.playersDisplay);
commandFunctionsMap.set("playSound", commands.playSound);
commandFunctionsMap.set("pocket", commands.pocket);
commandFunctionsMap.set("poopDisplay", commandsDisplay.poopDisplay);
commandFunctionsMap.set("poopMana", commands.poopMana);
commandFunctionsMap.set("poopsDisplay", commandsDisplay.poopsDisplay);
commandFunctionsMap.set("position", commands.positionCommand);
commandFunctionsMap.set(
  "pressurePlateDisplay",
  commandsDisplay.pressurePlateDisplay,
);
commandFunctionsMap.set(
  "pressurePlatesDisplay",
  commandsDisplay.pressurePlatesDisplay,
);
commandFunctionsMap.set("projectileDisplay", commandsDisplay.projectileDisplay);
commandFunctionsMap.set(
  "projectilesDisplay",
  commandsDisplay.projectilesDisplay,
);
commandFunctionsMap.set("redHearts", commands.redHearts);
commandFunctionsMap.set("rh", commands.rh);
commandFunctionsMap.set("right", commands.right);
commandFunctionsMap.set("rockDisplay", commandsDisplay.rockDisplay);
commandFunctionsMap.set("rocksDisplay", commandsDisplay.rocksDisplay);
commandFunctionsMap.set("room", commands.roomCommand);
commandFunctionsMap.set("rottenHearts", commands.rottenHearts);
commandFunctionsMap.set("s", commands.s);
commandFunctionsMap.set("sacrifice", commands.sacrifice);
commandFunctionsMap.set("secret", commands.secret);
commandFunctionsMap.set("seedStick", commands.seedStick);
commandFunctionsMap.set("seeds", commands.seedsCommand);
commandFunctionsMap.set("setCharges", commands.setCharges);
commandFunctionsMap.set("setPosition", commands.setPosition);
commandFunctionsMap.set("sh", commands.sh);
commandFunctionsMap.set("shop", commands.shop);
commandFunctionsMap.set("slotDisplay", commandsDisplay.slotDisplay);
commandFunctionsMap.set("slotsDisplay", commandsDisplay.slotsDisplay);
commandFunctionsMap.set("smelt", commands.smelt);
commandFunctionsMap.set("soulCharges", commands.soulCharges);
commandFunctionsMap.set("soulHearts", commands.soulHearts);
commandFunctionsMap.set("sound", commands.sound);
commandFunctionsMap.set("sounds", commands.sounds);
commandFunctionsMap.set("spam", commands.spam);
commandFunctionsMap.set("spawnGoldenTrinket", commands.spawnGoldenTrinket);
commandFunctionsMap.set("speed", commands.speed);
commandFunctionsMap.set("spikeDisplay", commandsDisplay.spikeDisplay);
commandFunctionsMap.set("spikesDisplay", commandsDisplay.spikesDisplay);
commandFunctionsMap.set("supersecret", commands.superSecret);
commandFunctionsMap.set("startingRoom", commands.startingRoom);
commandFunctionsMap.set("tearDisplay", commandsDisplay.tearDisplay);
commandFunctionsMap.set("tears", commands.tears);
commandFunctionsMap.set("tearsDisplay", commandsDisplay.tearsDisplay);
commandFunctionsMap.set("tntDisplay", commandsDisplay.tntDisplay);
commandFunctionsMap.set("tntsDisplay", commandsDisplay.tntsDisplay);
commandFunctionsMap.set("trapdoor", commands.trapdoorCommand);
commandFunctionsMap.set("treasure", commands.treasure);
commandFunctionsMap.set("ultraSecret", commands.ultraSecret);
commandFunctionsMap.set("up", commands.up);
commandFunctionsMap.set("warp", commands.warp);
