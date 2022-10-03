import {
  ButtonAction,
  InputHook,
  ModCallback,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { getMoveActions, getShootActions } from "../../../functions/input";
import { Feature } from "../../private/Feature";

export class DisableInputs extends Feature {
  public override v = {
    run: {
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

  constructor() {
    super();

    this.callbacksUsed = [
      [
        ModCallback.INPUT_ACTION,
        [this.isActionPressed, InputHook.IS_ACTION_PRESSED],
      ], // 13
      [
        ModCallback.INPUT_ACTION,
        [this.isActionTriggered, InputHook.IS_ACTION_TRIGGERED],
      ], // 13
      [
        ModCallback.INPUT_ACTION,
        [this.getActionValue, InputHook.GET_ACTION_VALUE],
      ], // 13
    ];
  }

  // InputHook.IS_ACTION_PRESSED (0)
  private isActionPressed = (
    _entity: Entity | undefined,
    _inputHook: InputHook,
    buttonAction: ButtonAction,
  ) => this.getReturnValue(buttonAction, true);

  // InputHook.IS_ACTION_TRIGGERED (1)
  private isActionTriggered = (
    _entity: Entity | undefined,
    _inputHook: InputHook,
    buttonAction: ButtonAction,
  ) => this.getReturnValue(buttonAction, true);

  // InputHook.GET_ACTION_VALUE (2)
  private getActionValue = (
    _entity: Entity | undefined,
    _inputHook: InputHook,
    buttonAction: ButtonAction,
  ) => this.getReturnValue(buttonAction, false);

  private getReturnValue(buttonAction: ButtonAction, booleanCallback: boolean) {
    const disableValue = booleanCallback ? false : 0;

    for (const blacklist of this.v.run.disableInputs.values()) {
      if (blacklist.has(buttonAction)) {
        return disableValue;
      }
    }

    for (const whitelist of this.v.run.disableAllInputsWithWhitelistMap.values()) {
      if (!whitelist.has(buttonAction)) {
        return disableValue;
      }
    }

    for (const blacklist of this.v.run.enableAllInputsWithBlacklistMap.values()) {
      if (blacklist.has(buttonAction)) {
        return disableValue;
      }
    }

    return undefined;
  }

  /**
   * Helper function to enable all inputs. Use this function to set things back to normal after
   * having used one of the other helper functions to disable inputs.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   */
  @Exported
  public enableAllInputs(key: string): void {
    this.v.run.disableAllInputsWithWhitelistMap.delete(key);
    this.v.run.enableAllInputsWithBlacklistMap.delete(key);
  }

  /**
   * Helper function to disable specific inputs, like opening the console.
   *
   * This function is variadic, meaning that you can pass as many inputs as you want to disable. (To
   * disable all inputs, see the `disableAllInputs` function.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   * @param buttonActions An array of the actions to action.
   */
  @Exported
  public disableInputs(key: string, ...buttonActions: ButtonAction[]): void {
    const buttonActionsSet = new Set(buttonActions);
    this.v.run.disableInputs.set(key, buttonActionsSet);
  }

  /**
   * Helper function to disable all inputs. This is useful because `EntityPlayer.ControlsEnabled`
   * can be changed by the game under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   */
  @Exported
  public disableAllInputs(key: string): void {
    this.v.run.disableAllInputsWithWhitelistMap.set(key, new Set());
    this.v.run.enableAllInputsWithBlacklistMap.delete(key);
  }

  /**
   * Helper function to enable all inputs besides the ones provided. This is useful because
   * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   * @param blacklist A set of ButtonActions to disallow.
   */
  @Exported
  public enableAllInputsExceptFor(
    key: string,
    blacklist: Set<ButtonAction> | ReadonlySet<ButtonAction>,
  ): void {
    this.v.run.disableAllInputsWithWhitelistMap.delete(key);
    this.v.run.enableAllInputsWithBlacklistMap.set(key, blacklist);
  }

  /**
   * Helper function to disable all inputs besides the ones provided. This is useful because
   * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   * @param whitelist A set of ButtonActions to allow.
   */
  @Exported
  public disableAllInputsExceptFor(
    key: string,
    whitelist: Set<ButtonAction> | ReadonlySet<ButtonAction>,
  ): void {
    this.v.run.disableAllInputsWithWhitelistMap.set(key, whitelist);
    this.v.run.enableAllInputsWithBlacklistMap.delete(key);
  }

  /**
   * Helper function to disable only the inputs used for moving the character (or moving the cursor
   * in the UI). This is useful because `EntityPlayer.ControlsEnabled` can be changed by the game
   * under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   */
  @Exported
  public disableMovementInputs(key: string): void {
    const moveActions = getMoveActions();
    this.enableAllInputsExceptFor(key, moveActions);
  }

  /**
   * Helper function to disable only the inputs used for shooting tears. This is useful because
   * `EntityPlayer.ControlsEnabled` can be changed by the game under certain conditions.
   *
   * Use the `enableAllInputs` helper function to set things back to normal.
   *
   * @param key The name of the mod feature that is requesting the enable/disable. This is needed so
   *            that multiple mod features can work in tandem.
   */
  @Exported
  public disableShootingInputs(key: string): void {
    const shootActions = getShootActions();
    this.enableAllInputsExceptFor(key, shootActions);
  }
}
