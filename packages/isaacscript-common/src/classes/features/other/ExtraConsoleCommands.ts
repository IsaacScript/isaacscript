import {
  CacheFlag,
  CollectibleType,
  DamageFlag,
  LevelCurse,
  ModCallback,
  TearVariant,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { addFlag, bitFlags } from "../../../functions/flag";
import { getMapPartialMatch } from "../../../functions/map";
import { isVanillaConsoleCommand } from "../../../functions/utils";
import { Feature } from "../../private/Feature";
import * as commands from "./extraConsoleCommands/commands";
import { v } from "./extraConsoleCommands/v";

export class ExtraConsoleCommands extends Feature {
  /** @internal */
  public override v = v;

  private commandFunctionMap = new Map<string, (params: string) => void>();

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 1
      [ModCallback.POST_UPDATE, this.postUpdate],

      // 8
      [
        ModCallback.EVALUATE_CACHE,
        this.evaluateCacheDamage,
        [CacheFlag.DAMAGE], // 1 << 0
      ],

      // 8
      [
        ModCallback.EVALUATE_CACHE,
        this.evaluateCacheFireDelay,
        [CacheFlag.FIRE_DELAY], // 1 << 1
      ],

      // 8
      [
        ModCallback.EVALUATE_CACHE,
        this.evaluateCacheSpeed,
        [CacheFlag.SPEED], // 1 << 4
      ],

      // 8
      [
        ModCallback.EVALUATE_CACHE,
        this.evaluateCacheFlying,
        [CacheFlag.FLYING], // 1 << 7
      ],

      // 12
      [ModCallback.POST_CURSE_EVAL, this.postCurseEval],

      // 22
      [ModCallback.EXECUTE_CMD, this.executeCmd],

      // 61
      [ModCallback.POST_FIRE_TEAR, this.postFireTear],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER, this.entityTakeDmgPlayer],
    ];

    for (const [funcName, func] of Object.entries(commands)) {
      this.commandFunctionMap.set(funcName, func);
    }
  }

  // ModCallback.POST_UPDATE (1)
  private postUpdate = () => {
    if (this.v.persistent.spamBloodRights) {
      const player = Isaac.GetPlayer();
      player.UseActiveItem(CollectibleType.BLOOD_RIGHTS);
    }
  };

  // ModCallback.EVALUATE_CACHE (8)
  // CacheFlag.DAMAGE (1 << 0)
  private evaluateCacheDamage = (player: EntityPlayer) => {
    if (this.v.persistent.damage) {
      player.Damage = this.v.persistent.damageAmount;
    }
  };

  // ModCallback.EVALUATE_CACHE (8)
  // CacheFlag.FIRE_DELAY (1 << 1)
  private evaluateCacheFireDelay = (player: EntityPlayer) => {
    if (this.v.persistent.tears) {
      player.FireDelay = this.v.persistent.tearsAmount;
    }
  };

  // ModCallback.EVALUATE_CACHE (8)
  // CacheFlag.SPEED (1 << 4)
  private evaluateCacheSpeed = (player: EntityPlayer) => {
    if (this.v.persistent.speed) {
      player.MoveSpeed = this.v.persistent.speedAmount;
    }
  };

  // ModCallback.EVALUATE_CACHE (8)
  // CacheFlag.FLYING (1 << 7)
  private evaluateCacheFlying = (player: EntityPlayer) => {
    if (this.v.persistent.flight) {
      player.CanFly = true;
    }
  };

  // ModCallback.POST_CURSE_EVAL (12)
  private postCurseEval = (
    curses: BitFlags<LevelCurse>,
  ): BitFlags<LevelCurse> | undefined => {
    if (this.v.persistent.disableCurses) {
      return bitFlags(LevelCurse.NONE);
    }

    let newCurses = curses;

    // 1
    if (this.v.persistent.darkness) {
      newCurses = addFlag(newCurses, LevelCurse.DARKNESS);
    }

    // 2
    if (this.v.persistent.labyrinth) {
      newCurses = addFlag(newCurses, LevelCurse.LABYRINTH);
    }

    // 3
    if (this.v.persistent.lost) {
      newCurses = addFlag(newCurses, LevelCurse.LOST);
    }

    // 4
    if (this.v.persistent.unknown) {
      newCurses = addFlag(newCurses, LevelCurse.UNKNOWN);
    }

    // 5
    if (this.v.persistent.cursed) {
      newCurses = addFlag(newCurses, LevelCurse.CURSED);
    }

    // 6
    if (this.v.persistent.maze) {
      newCurses = addFlag(newCurses, LevelCurse.MAZE);
    }

    // 7
    if (this.v.persistent.blind) {
      newCurses = addFlag(newCurses, LevelCurse.BLIND);
    }

    // 8
    if (this.v.persistent.giant) {
      newCurses = addFlag(newCurses, LevelCurse.GIANT);
    }

    return curses === newCurses ? undefined : newCurses;
  };

  // ModCallback.EXECUTE_CMD (22)
  private executeCmd = (command: string, params: string) => {
    const resultTuple = getMapPartialMatch(command, this.commandFunctionMap);
    if (resultTuple === undefined) {
      print("That is an invalid console command.");
      return;
    }

    const [commandName, commandFunction] = resultTuple;
    print(`Command: ${commandName}`);
    commandFunction(params);
  };

  // ModCallback.POST_FIRE_TEAR (61)
  private postFireTear = (tear: EntityTear) => {
    if (this.v.persistent.chaosCardTears) {
      tear.ChangeVariant(TearVariant.CHAOS_CARD);
    }
  };

  // ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER
  private entityTakeDmgPlayer = (
    _player: EntityPlayer,
    _damageAmount: float,
    _damageFlags: BitFlags<DamageFlag>,
    _damageSource: EntityRef,
    _damageCountdownFrames: int,
  ) => {
    if (this.v.persistent.spamBloodRights) {
      return false;
    }

    return undefined;
  };

  /**
   * Helper function to add a custom console command.
   *
   * The standard library comes with many existing console commands that are useful for debugging,
   * but you can also add your own commands that are useful for your particular mod. It's easier to
   * add commands to the existing command system than to add your own logic manually to the
   * `EXECUTE_CMD` callback.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.EXTRA_CONSOLE_COMMANDS`.
   */
  @Exported
  public addConsoleCommand(
    commandName: string,
    commandFunction: (params: string) => void,
  ): void {
    if (isVanillaConsoleCommand(commandName)) {
      error(
        `Failed to add a new console command of "${commandName}" because that name already belongs to a vanilla command. You must pick a non-colliding name.`,
      );
    }

    if (this.commandFunctionMap.has(commandName)) {
      error(
        `Failed to add a new console command of "${commandName}" because there is already an existing custom command by that name. If you want to overwrite a command from the standard library, you can use the "removeExtraConsoleCommand" function.`,
      );
    }

    this.commandFunctionMap.set(commandName, commandFunction);
  }

  /**
   * Helper function to remove a custom console command.
   *
   * The standard library comes with many existing console commands that are useful for debugging.
   * If you want to disable one of them, use this function.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.EXTRA_CONSOLE_COMMANDS`.
   */
  @Exported
  public removeConsoleCommand(commandName: string): void {
    if (!this.commandFunctionMap.has(commandName)) {
      error(
        `Failed to remove the console command of "${commandName}", since it does not already exist in the map.`,
      );
    }

    this.commandFunctionMap.delete(commandName);
  }
}
