import type { DamageFlag } from "isaac-typescript-definitions";
import {
  CacheFlag,
  CollectibleType,
  LevelCurse,
  ModCallback,
  TearVariant,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { isVanillaConsoleCommand } from "../../../functions/console";
import { addFlag, bitFlags } from "../../../functions/flag";
import { logError } from "../../../functions/log";
import { getMapPartialMatch } from "../../../functions/string";
import { assertDefined } from "../../../functions/utils";
import { Feature } from "../../private/Feature";
import * as commands from "./extraConsoleCommands/commands";
import { v } from "./extraConsoleCommands/v";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare let __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE:
  | ExtraConsoleCommands
  | undefined;

/**
 * When you enable this feature, many custom commands will be added to the in-game console. See the
 * [dedicated command list](/isaacscript-common/features/ExtraConsoleCommandsList) for more
 * information about them.
 *
 * Note that in order to avoid conflicts, if two or more mods enable this feature, then the first
 * loaded one will control all of the command logic. When this occurs, a global variable of
 * `__ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE` will be created and will automatically be
 * used by the non-main instances. For this reason, if you use multiple mods with
 * `isaacscript-common` and a custom command from the standard library is not working properly, then
 * you might need to get another mod author to update their version of `isaacscript-common`.
 */
export class ExtraConsoleCommands extends Feature {
  /** @internal */
  public override v = v;

  private readonly isMainFeature: boolean;

  private readonly commandFunctionMap = new Map<
    string,
    (params: string) => void
  >();

  /** @internal */
  constructor() {
    super();

    // Only one instance of this feature can be instantiated across all mods.
    this.isMainFeature =
      __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE === undefined;
    if (!this.isMainFeature) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias, consistent-this
    __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE = this;

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
  private readonly postUpdate = () => {
    if (v.persistent.spamBloodRights) {
      const player = Isaac.GetPlayer();
      player.UseActiveItem(CollectibleType.BLOOD_RIGHTS);
    }
  };

  // ModCallback.EVALUATE_CACHE (8)
  // CacheFlag.DAMAGE (1 << 0)
  private readonly evaluateCacheDamage = (player: EntityPlayer) => {
    if (v.persistent.damage) {
      player.Damage = v.persistent.damageAmount;
    }
  };

  // ModCallback.EVALUATE_CACHE (8)
  // CacheFlag.FIRE_DELAY (1 << 1)
  private readonly evaluateCacheFireDelay = (player: EntityPlayer) => {
    if (v.persistent.tears) {
      player.FireDelay = v.persistent.tearsAmount;
    }
  };

  // ModCallback.EVALUATE_CACHE (8)
  // CacheFlag.SPEED (1 << 4)
  private readonly evaluateCacheSpeed = (player: EntityPlayer) => {
    if (v.persistent.speed) {
      player.MoveSpeed = v.persistent.speedAmount;
    }
  };

  // ModCallback.EVALUATE_CACHE (8)
  // CacheFlag.FLYING (1 << 7)
  private readonly evaluateCacheFlying = (player: EntityPlayer) => {
    if (v.persistent.flight) {
      player.CanFly = true;
    }
  };

  // ModCallback.POST_CURSE_EVAL (12)
  private readonly postCurseEval = (
    curses: BitFlags<LevelCurse>,
  ): BitFlags<LevelCurse> | LevelCurse | undefined => {
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
  };

  // ModCallback.EXECUTE_CMD (22)
  private readonly executeCmd = (command: string, params: string) => {
    const resultTuple = getMapPartialMatch(command, this.commandFunctionMap);
    if (resultTuple === undefined) {
      // We opt to not print an error message because a non-IsaacScript mod may have configured a
      // custom console command.
      return;
    }

    const [commandName, commandFunction] = resultTuple;
    print(`Command: ${commandName}`);
    commandFunction(params);
  };

  // ModCallback.POST_FIRE_TEAR (61)
  private readonly postFireTear = (tear: EntityTear) => {
    if (v.persistent.chaosCardTears) {
      tear.ChangeVariant(TearVariant.CHAOS_CARD);
    }
  };

  // ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER
  private readonly entityTakeDmgPlayer = (
    _player: EntityPlayer,
    _damageAmount: float,
    _damageFlags: BitFlags<DamageFlag>,
    _damageSource: EntityRef,
    _damageCountdownFrames: int,
  ) => {
    if (v.persistent.spamBloodRights) {
      return false;
    }

    return undefined;
  };

  /**
   * Helper function to add a custom console command.
   *
   * The standard library comes with [many existing console
   * commands](/isaacscript-common/features/ExtraConsoleCommandsList) that are useful for debugging,
   * but you can also add your own commands that are useful for your particular mod. It's easier to
   * add commands to the existing command system than to add your own logic manually to the
   * `EXECUTE_CMD` callback.
   *
   * This function is intended to be called when your mod is first loading.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.EXTRA_CONSOLE_COMMANDS`.
   *
   * @public
   */
  @Exported
  public addConsoleCommand(
    commandName: string,
    commandFunction: (params: string) => void,
  ): void {
    if (!this.isMainFeature) {
      assertDefined(
        __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE,
        "Failed to find the non-main isaacscript-common extra console commands feature in the global variable.",
      );
      __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE.addConsoleCommand(
        commandName,
        commandFunction,
      );
      return;
    }

    if (isVanillaConsoleCommand(commandName)) {
      logError(
        `Failed to add a new console command of "${commandName}" because that name already belongs to a vanilla command. You must pick a non-colliding name.`,
      );
      return;
    }

    if (this.commandFunctionMap.has(commandName)) {
      logError(
        `Failed to add a new console command of "${commandName}" because there is already an existing custom command by that name. If you want to overwrite a command from the standard library, you can use the "removeExtraConsoleCommand" function.`,
      );
      return;
    }

    this.commandFunctionMap.set(commandName, commandFunction);
  }

  /**
   * Helper function to remove a custom console command.
   *
   * The standard library comes with [many existing console
   * commands](/isaacscript-common/features/ExtraConsoleCommandsList) that are useful for debugging.
   * If you want to disable one of them, use this function.
   *
   * This function is intended to be called when your mod is first loading.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.EXTRA_CONSOLE_COMMANDS`.
   *
   * @public
   */
  @Exported
  public removeConsoleCommand(commandName: string): void {
    if (!this.isMainFeature) {
      assertDefined(
        __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE,
        "Failed to find the non-main isaacscript-common extra console commands feature in the global variable.",
      );
      __ISAACSCRIPT_COMMON_EXTRA_CONSOLE_COMMANDS_FEATURE.removeConsoleCommand(
        commandName,
      );
      return;
    }

    if (!this.commandFunctionMap.has(commandName)) {
      error(
        `Failed to remove the console command of "${commandName}", since it does not already exist in the command map.`,
      );
    }

    this.commandFunctionMap.delete(commandName);
  }

  /**
   * Helper function to remove all custom console commands.
   *
   * The standard library comes with [many existing console
   * commands](/isaacscript-common/features/ExtraConsoleCommandsList) that are useful for debugging.
   * If you want to disable all of them after this feature has already been initialized, use this
   * function.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.EXTRA_CONSOLE_COMMANDS`.
   *
   * @public
   */
  @Exported
  public removeAllConsoleCommands(): void {
    this.commandFunctionMap.clear();
  }
}
