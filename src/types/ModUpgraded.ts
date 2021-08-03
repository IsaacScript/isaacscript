import * as itemPickup from "../callbacks/itemPickup";
import * as postItemPickup from "../callbacks/postItemPickup";
import * as preItemPickup from "../callbacks/preItemPickup";
import * as saveDataManager from "../features/saveDataManager";
import { ensureAllCases } from "../functions/util";
import CallbackParametersCustom from "./CallbackParametersCustom";
import ModCallbacksCustom from "./ModCallbacksCustom";

/** `isaacscript-common` allows for custom callbacks, so it provides an upgraded Mod object. */
export default class ModUpgraded implements Mod {
  /** We store a copy of the original mod object so that we can re-implement its functions. */
  Mod: Mod;

  // Re-implement all of the functions and attributes of Mod

  AddCallback<T extends keyof CallbackParameters>(
    callbackID: T,
    ...args: CallbackParameters[T]
  ): void {
    this.Mod.AddCallback(callbackID, ...args);
  }

  HasData(): boolean {
    return this.Mod.HasData();
  }

  LoadData(): string {
    return this.Mod.LoadData();
  }

  RemoveCallback(callbackID: ModCallbacks, callback: () => void): void {
    this.Mod.RemoveCallback(callbackID, callback);
  }

  RemoveData(): void {
    this.Mod.RemoveData();
  }

  SaveData(data: string): void {
    this.Mod.SaveData(data);
  }

  Name: string;

  // Define custom functionality

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
    this.Mod = mod;
    this.Name = mod.Name;

    saveDataManager.init(this);
    this.initCustomCallbacks();
  }

  initCustomCallbacks(): void {
    itemPickup.init(this);
  }
}
