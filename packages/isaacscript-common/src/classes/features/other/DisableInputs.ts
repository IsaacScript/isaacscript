import type { ButtonAction } from "isaac-typescript-definitions";
import { InputHook, ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import {
  MOVEMENT_BUTTON_ACTIONS_SET,
  SHOOTING_BUTTON_ACTIONS_SET,
} from "../../../functions/input";
import { ReadonlySet } from "../../../types/ReadonlySet";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    /**
     * Glowing Hour Glass support is disabled by default since it can cause bugs with extra-gameplay
     * features. (For example, whether the player should be able to move is not something that
     * should be reset by the Glowing Hour Glass.)
     */
    __ignoreGlowingHourGlass: true,

    /** Indexed by the requesting feature key. */
    disableInputs: new Map<string, ReadonlySet<ButtonAction>>(),

    /** Indexed by the requesting feature key. */
    enableAllInputsWithBlacklistMap: new Map<
      string,
      ReadonlySet<ButtonAction>
    >(),

    /** Indexed by the requesting feature key. */
    disableAllInputsWithWhitelistMap: new Map<
      string,
      ReadonlySet<ButtonAction>
    >(),
  },
};

export class DisableInputs extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 13
      [
        ModCallback.INPUT_ACTION,
        this.isActionPressed,
        [InputHook.IS_ACTION_PRESSED], // 0
      ],

      // 13
      [
        ModCallback.INPUT_ACTION,
        this.isActionTriggered,
        [InputHook.IS_ACTION_TRIGGERED], // 1
      ],

      // 13
      [
        ModCallback.INPUT_ACTION,
        this.getActionValue,
        [InputHook.GET_ACTION_VALUE], // 2
      ],
    ];
  }

  // InputHook.IS_ACTION_PRESSED (0)
  private readonly isActionPressed = (
    _entity: Entity | undefined,
    _inputHook: InputHook,
    buttonAction: ButtonAction,
  ) => this.getReturnValue(buttonAction, true);

  // InputHook.IS_ACTION_TRIGGERED (1)
  private readonly isActionTriggered = (
    _entity: Entity | undefined,
    _inputHook: InputHook,
    buttonAction: ButtonAction,
  ) => this.getReturnValue(buttonAction, true);

  // InputHook.GET_ACTION_VALUE (2)
  private readonly getActionValue = (
    _entity: Entity | undefined,
    _inputHook: InputHook,
    buttonAction: ButtonAction,
  ) => this.getReturnValue(buttonAction, false);

  private getReturnValue(buttonAction: ButtonAction, booleanCallback: boolean) {
    const disableValue = booleanCallback ? false : 0;

    for (const blacklist of v.run.disableInputs.values()) {
      if (blacklist.has(buttonAction)) {
        return disableValue;
      }
    }

    for (const whitelist of v.run.disableAllInputsWithWhitelistMap.values()) {
      if (!whitelist.has(buttonAction)) {
        return disableValue;
      }
    }

    for (const blacklist of v.run.enableAllInputsWithBlacklistMap.values()) {
      if (blacklist.has(buttonAction)) {
        return disableValue;
      }
    }

    return undefined;
  }

  /**
   * Helper function to check if the `ISCFeature.DISABLE_INPUTS` feature is turned on in some
   * capacity.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_INPUTS`.
   *
   * @public
   */
  @Exported
  public areInputsEnabled(): boolean {
    return (
      v.run.disableInputs.size === 0
      && v.run.enableAllInputsWithBlacklistMap.size === 0
      && v.run.disableAllInputsWithWhitelistMap.size === 0
    );
  }

  /**
   * Helper function to enable all inputs. Use this function to set things back to normal after
   * having used one of the other helper functions to disable inputs.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_INPUTS`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   * @public
   */
  @Exported
  public enableAllInputs(key: string): void {
    v.run.disableAllInputsWithWhitelistMap.delete(key);
    v.run.enableAllInputsWithBlacklistMap.delete(key);
  }

  /**
   * Helper function to disable specific inputs, like opening the console.
   *
   * This function is variadic, meaning that you can specify as many inputs as you want to disable.
   * (To disable all inputs, see the `disableAllInputs` function.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_INPUTS`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   * @param buttonActions An array of the actions to action.
   * @public
   */
  @Exported
  public disableInputs(
    key: string,
    ...buttonActions: readonly ButtonAction[]
  ): void {
    const buttonActionsSet = new ReadonlySet(buttonActions);
    v.run.disableInputs.set(key, buttonActionsSet);
  }

  /**
   * Helper function to disable all inputs. This is useful because `EntityPlayer.ControlsEnabled`
   * can be changed by the game under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_INPUTS`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   * @public
   */
  @Exported
  public disableAllInputs(key: string): void {
    v.run.disableAllInputsWithWhitelistMap.set(key, new ReadonlySet());
    v.run.enableAllInputsWithBlacklistMap.delete(key);
  }

  /**
   * Helper function to enable all inputs besides the ones provided. This is useful because
   * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_INPUTS`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   * @param blacklist A set of ButtonActions to disallow.
   * @public
   */
  @Exported
  public enableAllInputsExceptFor(
    key: string,
    blacklist: ReadonlySet<ButtonAction>,
  ): void {
    v.run.disableAllInputsWithWhitelistMap.delete(key);
    v.run.enableAllInputsWithBlacklistMap.set(key, blacklist);
  }

  /**
   * Helper function to disable all inputs besides the ones provided. This is useful because
   * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_INPUTS`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   * @param whitelist A set of ButtonActions to allow.
   * @public
   */
  @Exported
  public disableAllInputsExceptFor(
    key: string,
    whitelist: ReadonlySet<ButtonAction>,
  ): void {
    v.run.disableAllInputsWithWhitelistMap.set(key, whitelist);
    v.run.enableAllInputsWithBlacklistMap.delete(key);
  }

  /**
   * Helper function to disable only the inputs used for moving the character (or moving the cursor
   * in the UI). This is useful because `EntityPlayer.ControlsEnabled` can be changed by the game
   * under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_INPUTS`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   * @public
   */
  @Exported
  public disableMovementInputs(key: string): void {
    this.enableAllInputsExceptFor(key, MOVEMENT_BUTTON_ACTIONS_SET);
  }

  /**
   * Helper function to disable only the inputs used for shooting tears. This is useful because
   * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DISABLE_INPUTS`.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. For example, if
   *            this was part of the code for a custom enemy called "Super Gaper", then you could
   *            use a key of "SuperGaper". The name is necessary so that multiple mod features can
   *            work in tandem.
   * @public
   */
  @Exported
  public disableShootingInputs(key: string): void {
    this.enableAllInputsExceptFor(key, SHOOTING_BUTTON_ACTIONS_SET);
  }
}
