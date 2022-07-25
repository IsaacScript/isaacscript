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
import { bitFlags } from "../../functions/flag";
import { getMapPartialMatch } from "../../functions/map";
import { printConsole } from "../../functions/utils";
import { debugDisplayInit } from "../debugDisplay/debugDisplay";
import { saveDataManager } from "../saveDataManager/exports";
import * as commandsDisplay from "./commandsDisplay";
import * as commands from "./listCommands";
import v, { extraConsoleCommandsFunctionMap } from "./v";

export function extraConsoleCommandsInit(mod: ModUpgraded): void {
  saveDataManager("extraConsoleCommands", v, () => false);
  initMap();
  initCallbacks(mod);
  debugDisplayInit(mod);
}

function initMap() {
  extraConsoleCommandsFunctionMap.set("1hp", commands.oneHP);
  extraConsoleCommandsFunctionMap.set("addCharges", commands.addCharges);
  extraConsoleCommandsFunctionMap.set("angelRoom", commands.angelRoom);
  extraConsoleCommandsFunctionMap.set("ascent", commands.ascent);
  extraConsoleCommandsFunctionMap.set("bedroom", commands.bedroom);
  extraConsoleCommandsFunctionMap.set("bh", commands.bh);
  extraConsoleCommandsFunctionMap.set("blackhearts", commands.blackHearts);
  extraConsoleCommandsFunctionMap.set("blackMarket", commands.blackMarket);
  extraConsoleCommandsFunctionMap.set("bloodCharges", commands.bloodCharges);
  extraConsoleCommandsFunctionMap.set("bm", commands.bm);
  extraConsoleCommandsFunctionMap.set("bomb", commands.bomb);
  extraConsoleCommandsFunctionMap.set(
    "bombDisplay",
    commandsDisplay.bombDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "bombsDisplay",
    commandsDisplay.bombsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("bombs", commands.bombs);
  extraConsoleCommandsFunctionMap.set("boneHearts", commands.boneHearts);
  extraConsoleCommandsFunctionMap.set("bossRoom", commands.bossRoom);
  extraConsoleCommandsFunctionMap.set("bossRush", commands.bossRush);
  extraConsoleCommandsFunctionMap.set("brokenHearts", commands.brokenHearts);
  extraConsoleCommandsFunctionMap.set("card", commands.card);
  extraConsoleCommandsFunctionMap.set("cards", commands.cards);
  extraConsoleCommandsFunctionMap.set("cc", commands.cc);
  extraConsoleCommandsFunctionMap.set(
    "chaosCardTears",
    commands.chaosCardTears,
  );
  extraConsoleCommandsFunctionMap.set("character", commands.characterCommand);
  extraConsoleCommandsFunctionMap.set("charge", commands.charge);
  extraConsoleCommandsFunctionMap.set("cleanBedroom", commands.cleanBedroom);
  extraConsoleCommandsFunctionMap.set("coin", commands.coin);
  extraConsoleCommandsFunctionMap.set("coins", commands.coins);
  extraConsoleCommandsFunctionMap.set("crawlSpace", commands.crawlSpace);
  extraConsoleCommandsFunctionMap.set("d20", commands.d20);
  extraConsoleCommandsFunctionMap.set("d6", commands.d6);
  extraConsoleCommandsFunctionMap.set("damage", commands.damage);
  extraConsoleCommandsFunctionMap.set("dd", commands.dd);
  extraConsoleCommandsFunctionMap.set("devilRoom", commands.devilRoom);
  extraConsoleCommandsFunctionMap.set("dirtyBedroom", commands.dirtyBedroom);
  extraConsoleCommandsFunctionMap.set("disableCurses", commands.disableCurses);
  extraConsoleCommandsFunctionMap.set(
    "doorDisplay",
    commandsDisplay.doorDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "doorsDisplay",
    commandsDisplay.doorsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("down", commands.down);
  extraConsoleCommandsFunctionMap.set("dungeon", commands.dungeon);
  extraConsoleCommandsFunctionMap.set(
    "effectDisplay",
    commandsDisplay.effectDisplay,
  );
  extraConsoleCommandsFunctionMap.set("effects", commands.effects);
  extraConsoleCommandsFunctionMap.set(
    "effectsDisplay",
    commandsDisplay.effectsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("eh", commands.eh);
  extraConsoleCommandsFunctionMap.set("errorRoom", commands.errorRoom);
  extraConsoleCommandsFunctionMap.set("eternalHearts", commands.eternalHearts);
  extraConsoleCommandsFunctionMap.set(
    "familiarDisplay",
    commandsDisplay.familiarDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "familiarsDisplay",
    commandsDisplay.familiarsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("flight", commands.flight);
  extraConsoleCommandsFunctionMap.set("fool", commands.fool);
  extraConsoleCommandsFunctionMap.set("getPosition", commands.getPosition);
  extraConsoleCommandsFunctionMap.set("gigaBomb", commands.gigaBomb);
  extraConsoleCommandsFunctionMap.set("goldBomb", commands.goldBomb);
  extraConsoleCommandsFunctionMap.set("goldHearts", commands.goldHearts);
  extraConsoleCommandsFunctionMap.set("goldKey", commands.goldKey);
  extraConsoleCommandsFunctionMap.set("goldenBomb", commands.goldenBomb);
  extraConsoleCommandsFunctionMap.set("goldenHearts", commands.goldenHearts);
  extraConsoleCommandsFunctionMap.set("goldenKey", commands.goldenKey);
  extraConsoleCommandsFunctionMap.set("grid", commands.grid);
  extraConsoleCommandsFunctionMap.set("grid2", commands.grid2);
  extraConsoleCommandsFunctionMap.set("gridCosts", commands.gridCosts);
  extraConsoleCommandsFunctionMap.set("gridEntities", commands.gridEntities);
  extraConsoleCommandsFunctionMap.set("hearts", commands.hearts);
  extraConsoleCommandsFunctionMap.set("hitboxes", commands.hitboxes);
  extraConsoleCommandsFunctionMap.set("iAmErrorRoom", commands.iAmErrorRoom);
  extraConsoleCommandsFunctionMap.set("key", commands.key);
  extraConsoleCommandsFunctionMap.set("keys", commands.keys);
  extraConsoleCommandsFunctionMap.set(
    "knifeDisplay",
    commandsDisplay.knifeDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "knivesDisplay",
    commandsDisplay.knivesDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "laserDisplay",
    commandsDisplay.laserDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "lasersDisplay",
    commandsDisplay.lasersDisplay,
  );
  extraConsoleCommandsFunctionMap.set("left", commands.left);
  extraConsoleCommandsFunctionMap.set("library", commands.library);
  extraConsoleCommandsFunctionMap.set("list", commands.list);
  extraConsoleCommandsFunctionMap.set("listAll", commands.listAll);
  extraConsoleCommandsFunctionMap.set("listGrid", commands.listGrid);
  extraConsoleCommandsFunctionMap.set("listGridAll", commands.listGridAll);
  extraConsoleCommandsFunctionMap.set("lowHP", commands.lowHP);
  extraConsoleCommandsFunctionMap.set("luck", commands.luck);
  extraConsoleCommandsFunctionMap.set("mana", commands.mana);
  extraConsoleCommandsFunctionMap.set("map", commands.map);
  extraConsoleCommandsFunctionMap.set("maxHearts", commands.maxHearts);
  extraConsoleCommandsFunctionMap.set("miniboss", commands.miniboss);
  extraConsoleCommandsFunctionMap.set("noCurses", commands.noCurses);
  extraConsoleCommandsFunctionMap.set("npcDisplay", commandsDisplay.npcDisplay);
  extraConsoleCommandsFunctionMap.set(
    "npcsDisplay",
    commandsDisplay.npcsDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "pickupDisplay",
    commandsDisplay.pickupDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "pickupsDisplay",
    commandsDisplay.pickupsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("pill", commands.pill);
  extraConsoleCommandsFunctionMap.set("pills", commands.pills);
  extraConsoleCommandsFunctionMap.set("pitDisplay", commandsDisplay.pitDisplay);
  extraConsoleCommandsFunctionMap.set(
    "pitsDisplay",
    commandsDisplay.pitsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("planetarium", commands.planetarium);
  extraConsoleCommandsFunctionMap.set(
    "playerDisplay",
    commandsDisplay.playerDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "playersDisplay",
    commandsDisplay.playersDisplay,
  );
  extraConsoleCommandsFunctionMap.set("playSound", commands.playSound);
  extraConsoleCommandsFunctionMap.set("pocket", commands.pocket);
  extraConsoleCommandsFunctionMap.set(
    "poopDisplay",
    commandsDisplay.poopDisplay,
  );
  extraConsoleCommandsFunctionMap.set("poopMana", commands.poopMana);
  extraConsoleCommandsFunctionMap.set(
    "poopsDisplay",
    commandsDisplay.poopsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("position", commands.positionCommand);
  extraConsoleCommandsFunctionMap.set(
    "pressurePlateDisplay",
    commandsDisplay.pressurePlateDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "pressurePlatesDisplay",
    commandsDisplay.pressurePlatesDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "projectileDisplay",
    commandsDisplay.projectileDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "projectilesDisplay",
    commandsDisplay.projectilesDisplay,
  );
  extraConsoleCommandsFunctionMap.set("redHearts", commands.redHearts);
  extraConsoleCommandsFunctionMap.set("right", commands.right);
  extraConsoleCommandsFunctionMap.set(
    "rockDisplay",
    commandsDisplay.rockDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "rocksDisplay",
    commandsDisplay.rocksDisplay,
  );
  extraConsoleCommandsFunctionMap.set("room", commands.roomCommand);
  extraConsoleCommandsFunctionMap.set("rottenHearts", commands.rottenHearts);
  extraConsoleCommandsFunctionMap.set("runTests", commands.runTests);
  extraConsoleCommandsFunctionMap.set("s", commands.s);
  extraConsoleCommandsFunctionMap.set("sacrificeRoom", commands.sacrificeRoom);
  extraConsoleCommandsFunctionMap.set("secretRoom", commands.secretRoom);
  extraConsoleCommandsFunctionMap.set("seedStick", commands.seedStick);
  extraConsoleCommandsFunctionMap.set("seeds", commands.seedsCommand);
  extraConsoleCommandsFunctionMap.set("setCharges", commands.setCharges);
  extraConsoleCommandsFunctionMap.set("setPosition", commands.setPosition);
  extraConsoleCommandsFunctionMap.set("shop", commands.shop);
  extraConsoleCommandsFunctionMap.set(
    "slotDisplay",
    commandsDisplay.slotDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "slotsDisplay",
    commandsDisplay.slotsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("smelt", commands.smelt);
  extraConsoleCommandsFunctionMap.set("soulCharges", commands.soulCharges);
  extraConsoleCommandsFunctionMap.set("soulHearts", commands.soulHearts);
  extraConsoleCommandsFunctionMap.set("sound", commands.sound);
  extraConsoleCommandsFunctionMap.set("sounds", commands.sounds);
  extraConsoleCommandsFunctionMap.set("spam", commands.spam);
  extraConsoleCommandsFunctionMap.set(
    "spawnGoldenTrinket",
    commands.spawnGoldenTrinket,
  );
  extraConsoleCommandsFunctionMap.set("speed", commands.speed);
  extraConsoleCommandsFunctionMap.set(
    "spikeDisplay",
    commandsDisplay.spikeDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "spikesDisplay",
    commandsDisplay.spikesDisplay,
  );
  extraConsoleCommandsFunctionMap.set(
    "superSecretRoom",
    commands.superSecretRoom,
  );
  extraConsoleCommandsFunctionMap.set("startingRoom", commands.startingRoom);
  extraConsoleCommandsFunctionMap.set("startRoom", commands.startRoom);
  extraConsoleCommandsFunctionMap.set(
    "tearDisplay",
    commandsDisplay.tearDisplay,
  );
  extraConsoleCommandsFunctionMap.set("tears", commands.tears);
  extraConsoleCommandsFunctionMap.set(
    "tearsDisplay",
    commandsDisplay.tearsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("tntDisplay", commandsDisplay.tntDisplay);
  extraConsoleCommandsFunctionMap.set(
    "tntsDisplay",
    commandsDisplay.tntsDisplay,
  );
  extraConsoleCommandsFunctionMap.set("trapdoor", commands.trapdoorCommand);
  extraConsoleCommandsFunctionMap.set("treasureRoom", commands.treasureRoom);
  extraConsoleCommandsFunctionMap.set(
    "ultraSecretRoom",
    commands.ultraSecretRoom,
  );
  extraConsoleCommandsFunctionMap.set("unseed", commands.unseed);
  extraConsoleCommandsFunctionMap.set("up", commands.up);
  extraConsoleCommandsFunctionMap.set("warp", commands.warp);
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
function entityTakeDmgPlayer() {
  if (v.run.spamBloodRights) {
    return false;
  }

  return undefined;
}

// ModCallback.POST_CURSE_EVAL (12)
function postCurseEval(
  curses: BitFlags<LevelCurse>,
): BitFlags<LevelCurse> | undefined {
  return v.persistent.disableCurses ? bitFlags(LevelCurse.NONE) : curses;
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
