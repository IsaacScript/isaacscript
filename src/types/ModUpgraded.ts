import * as postGameStarted from "../callbacks/subscriptions/postGameStarted";
import * as postItemPickup from "../callbacks/subscriptions/postItemPickup";
import * as postNewLevel from "../callbacks/subscriptions/postNewLevel";
import * as postNewRoom from "../callbacks/subscriptions/postNewRoom";
import * as preItemPickup from "../callbacks/subscriptions/preItemPickup";
import { ensureAllCases } from "../functions/util";
import ModCallbacksCustom, {
  CallbackParametersCustom,
} from "./ModCallbacksCustom";

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
  AddCallbackCustom(data: CallbackParametersCustom): void {
    switch (data.type) {
      case ModCallbacksCustom.MC_POST_GAME_STARTED: {
        postGameStarted.register(data);
        break;
      }

      case ModCallbacksCustom.MC_POST_NEW_LEVEL: {
        postNewLevel.register(data);
        break;
      }

      case ModCallbacksCustom.MC_POST_NEW_ROOM: {
        postNewRoom.register(data);
        break;
      }

      case ModCallbacksCustom.MC_PRE_ITEM_PICKUP: {
        preItemPickup.register(data);
        break;
      }

      case ModCallbacksCustom.MC_POST_ITEM_PICKUP: {
        postItemPickup.register(data);
        break;
      }

      default: {
        ensureAllCases(data);
        error(`The custom callback ID of "${data}" is not valid.`);
        break;
      }
    }
  }

  constructor(mod: Mod) {
    this.Mod = mod;
    this.Name = mod.Name;
  }
}
