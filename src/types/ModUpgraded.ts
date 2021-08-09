import * as postCursedTeleport from "../callbacks/subscriptions/postCursedTeleport";
import * as postEsauJr from "../callbacks/subscriptions/postEsauJr";
import * as postFirstEsauJr from "../callbacks/subscriptions/postFirstEsauJr";
import * as postFirstFlip from "../callbacks/subscriptions/postFirstFlip";
import * as postFlip from "../callbacks/subscriptions/postFlip";
import * as postGameStartedReordered from "../callbacks/subscriptions/postGameStartedReordered";
import * as postGridEntityInit from "../callbacks/subscriptions/postGridEntityInit";
import * as postGridEntityRemove from "../callbacks/subscriptions/postGridEntityRemove";
import * as postGridEntityUpdate from "../callbacks/subscriptions/postGridEntityUpdate";
import * as postItemPickup from "../callbacks/subscriptions/postItemPickup";
import * as postNewLevelReordered from "../callbacks/subscriptions/postNewLevelReordered";
import * as postNewRoomReordered from "../callbacks/subscriptions/postNewRoomReordered";
import * as postPlayerChangeType from "../callbacks/subscriptions/postPlayerChangeType";
import * as postSacrifice from "../callbacks/subscriptions/postSacrifice";
import * as postTransformation from "../callbacks/subscriptions/postTransformation";
import * as preItemPickup from "../callbacks/subscriptions/preItemPickup";
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
    callbackID: T,
    ...args: CallbackParametersCustom[T]
  ): void {
    switch (callbackID) {
      case ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED: {
        postGameStartedReordered.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED: {
        postNewLevelReordered.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED: {
        postNewRoomReordered.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_PRE_ITEM_PICKUP: {
        preItemPickup.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_PRE_ITEM_PICKUP]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_ITEM_PICKUP: {
        postItemPickup.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_ITEM_PICKUP]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE: {
        postPlayerChangeType.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_FLIP: {
        postFlip.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_FLIP]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_FIRST_FLIP: {
        postFirstFlip.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_FIRST_FLIP]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_ESAU_JR: {
        postEsauJr.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_ESAU_JR]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_FIRST_ESAU_JR: {
        postFirstEsauJr.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_FIRST_ESAU_JR]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_TRANSFORMATION: {
        postTransformation.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_TRANSFORMATION]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_SACRIFICE: {
        postSacrifice.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_SACRIFICE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_CURSED_TELEPORT: {
        postCursedTeleport.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_CURSED_TELEPORT]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT: {
        postGridEntityInit.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE: {
        postGridEntityUpdate.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE: {
        postGridEntityRemove.register(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE]),
        );
        break;
      }

      default: {
        ensureAllCases(callbackID);
        error(`The custom callback ID of "${callbackID}" is not valid.`);
      }
    }
  }

  constructor(mod: Mod) {
    this.Mod = mod;
    this.Name = mod.Name;
  }
}
