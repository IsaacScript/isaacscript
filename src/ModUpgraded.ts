import CallbackParametersCustom from "./CallbackParametersCustom";
import * as itemPickup from "./itemPickup";
import ModCallbacksCustom from "./ModCallbacksCustom";
import * as postItemPickup from "./postItemPickup";
import * as preItemPickup from "./preItemPickup";
import * as saveDataManager from "./saveDataManager";
import { ensureAllCases } from "./util";

/** `isaacscript-common` allows for custom callbacks, so it provides an upgraded Mod object. */
export default class ModUpgraded implements Mod {
  // First, define stubs for all of the Mod functions and attributes

  /* eslint-disable-next-line class-methods-use-this */
  AddCallback<T extends keyof CallbackParameters>(
    _callbackID: T,
    ..._args: CallbackParameters[T]
  ): void {}

  /* eslint-disable-next-line class-methods-use-this */
  HasData(): boolean {
    return false;
  }

  /* eslint-disable-next-line class-methods-use-this */
  LoadData(): string {
    return "";
  }

  /* eslint-disable-next-line class-methods-use-this */
  RemoveCallback(_callbackID: ModCallbacks, _callback: () => void): void {}

  /* eslint-disable-next-line class-methods-use-this */
  RemoveData(): void {}

  /* eslint-disable-next-line class-methods-use-this */
  SaveData(_data: string): void {}

  Name: string;

  // Second, define custom functionality

  // eslint-disable-next-line class-methods-use-this
  AddCallbackCustom<T extends keyof CallbackParametersCustom>(
    customCallbackIDGeneric: T,
    ...args: CallbackParametersCustom[T]
  ): void {
    const customCallbackID = customCallbackIDGeneric as ModCallbacksCustom;
    switch (customCallbackID) {
      case ModCallbacksCustom.MC_PRE_ITEM_PICKUP: {
        preItemPickup.register(args[0], args[1], args[2]);
        break;
      }

      case ModCallbacksCustom.MC_POST_ITEM_PICKUP: {
        postItemPickup.register(args[0], args[1], args[2]);
        break;
      }

      default: {
        ensureAllCases(customCallbackID);
        error(`The custom callback ID of "${customCallbackID}" is not valid.`);
        break;
      }
    }
  }

  constructor(mod: Mod) {
    // Copy all attributes from the original
    this.AddCallback = mod.AddCallback; // eslint-disable-line @typescript-eslint/unbound-method
    this.HasData = mod.HasData; // eslint-disable-line @typescript-eslint/unbound-method
    this.LoadData = mod.LoadData; // eslint-disable-line @typescript-eslint/unbound-method
    this.RemoveCallback = mod.RemoveCallback; // eslint-disable-line @typescript-eslint/unbound-method
    this.RemoveData = mod.RemoveData; // eslint-disable-line @typescript-eslint/unbound-method
    this.SaveData = mod.SaveData; // eslint-disable-line @typescript-eslint/unbound-method
    this.Name = mod.Name;

    saveDataManager.init(this);
    this.initCustomCallbacks();
  }

  initCustomCallbacks(): void {
    itemPickup.init(this);
  }
}
