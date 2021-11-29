import { postBombInitLateRegister } from "../callbacks/subscriptions/postBombInitLate";
import { postCursedTeleportRegister } from "../callbacks/subscriptions/postCursedTeleport";
import { postCustomReviveRegister } from "../callbacks/subscriptions/postCustomRevive";
import { postEffectInitLateRegister } from "../callbacks/subscriptions/postEffectInitLate";
import { postEsauJrRegister } from "../callbacks/subscriptions/postEsauJr";
import { postFamiliarInitLateRegister } from "../callbacks/subscriptions/postFamiliarInitLate";
import { postFirstEsauJrRegister } from "../callbacks/subscriptions/postFirstEsauJr";
import { postFirstFlipRegister } from "../callbacks/subscriptions/postFirstFlip";
import { postFlipRegister } from "../callbacks/subscriptions/postFlip";
import { postGameStartedReorderedRegister } from "../callbacks/subscriptions/postGameStartedReordered";
import { postGridEntityInitRegister } from "../callbacks/subscriptions/postGridEntityInit";
import { postGridEntityRemoveRegister } from "../callbacks/subscriptions/postGridEntityRemove";
import { postGridEntityUpdateRegister } from "../callbacks/subscriptions/postGridEntityUpdate";
import { postItemPickupRegister } from "../callbacks/subscriptions/postItemPickup";
import { postKnifeInitLateRegister } from "../callbacks/subscriptions/postKnifeInitLate";
import { postLaserInitLateRegister } from "../callbacks/subscriptions/postLaserInitLate";
import { postNewLevelReorderedRegister } from "../callbacks/subscriptions/postNewLevelReordered";
import { postNewRoomReorderedRegister } from "../callbacks/subscriptions/postNewRoomReordered";
import { postNPCInitLateRegister } from "../callbacks/subscriptions/postNPCInitLate";
import { postPickupCollectRegister } from "../callbacks/subscriptions/postPickupCollect";
import { postPickupInitLateRegister } from "../callbacks/subscriptions/postPickupInitLate";
import { postPlayerChangeHealthRegister } from "../callbacks/subscriptions/postPlayerChangeHealth";
import { postPlayerChangeTypeRegister } from "../callbacks/subscriptions/postPlayerChangeType";
import { postPlayerFatalDamageRegister } from "../callbacks/subscriptions/postPlayerFatalDamage";
import { postPlayerInitLateRegister } from "../callbacks/subscriptions/postPlayerInitLate";
import { postPlayerInitReorderedRegister } from "../callbacks/subscriptions/postPlayerInitReordered";
import { postPlayerRenderReorderedRegister } from "../callbacks/subscriptions/postPlayerRenderReordered";
import { postPlayerUpdateReorderedRegister } from "../callbacks/subscriptions/postPlayerUpdateReordered";
import { postProjectileInitLateRegister } from "../callbacks/subscriptions/postProjectileInitLate";
import { postPurchaseRegister } from "../callbacks/subscriptions/postPurchase";
import { postSacrificeRegister } from "../callbacks/subscriptions/postSacrifice";
import { postSlotDestroyedRegister } from "../callbacks/subscriptions/postSlotDestroyed";
import { postSlotInitRegister } from "../callbacks/subscriptions/postSlotInit";
import { postSlotRenderRegister } from "../callbacks/subscriptions/postSlotRender";
import { postSlotUpdateRegister } from "../callbacks/subscriptions/postSlotUpdate";
import { postTearInitLateRegister } from "../callbacks/subscriptions/postTearInitLate";
import { postTransformationRegister } from "../callbacks/subscriptions/postTransformation";
import { preCustomReviveRegister } from "../callbacks/subscriptions/preCustomRevive";
import { preItemPickupRegister } from "../callbacks/subscriptions/preItemPickup";
import { getDebugPrependString } from "../functions/log";
import { ensureAllCases } from "../functions/util";
import { CallbackParametersCustom } from "./CallbackParametersCustom";
import { ModCallbacksCustom } from "./ModCallbacksCustom";

/** `isaacscript-common` allows for custom callbacks, so it provides an upgraded Mod object. */
export class ModUpgraded implements Mod {
  /** We store a copy of the original mod object so that we can re-implement its functions. */
  Mod: Mod;

  /** End-users can optionally enable verbose-mode, which helps troubleshoot crashes. */
  Verbose: boolean;

  // Re-implement all of the functions and attributes of Mod

  AddCallback<T extends keyof CallbackParameters>(
    callbackID: T,
    ...args: CallbackParameters[T]
  ): void {
    if (this.Verbose) {
      const callback = args[0] as any; // eslint-disable-line
      const optionalArg = args[1] as any; // eslint-disable-line

      const callbackName = getCallbackName(callbackID);
      const debugMsg = getDebugPrependString(callbackName);

      const callbackWithLogger = (...callbackArgs: unknown[]) => {
        Isaac.DebugString(`${debugMsg} - START`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const value = callback(...callbackArgs) as unknown;
        Isaac.DebugString(`${debugMsg} - END - ${value}`);
        return value;
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.Mod.AddCallback(callbackID, callbackWithLogger, optionalArg); // eslint-disable-line
    } else {
      this.Mod.AddCallback(callbackID, ...args);
    }
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
        postGameStartedReorderedRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED: {
        postNewLevelReorderedRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED: {
        postNewRoomReorderedRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED: {
        postPlayerInitReorderedRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED: {
        postPlayerUpdateReorderedRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED: {
        postPlayerRenderReorderedRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE: {
        postPlayerInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_TEAR_INIT_LATE: {
        postTearInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_TEAR_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_FAMILIAR_INIT_LATE: {
        postFamiliarInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_FAMILIAR_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_BOMB_INIT_LATE: {
        postBombInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_BOMB_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE: {
        postPickupInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_LASER_INIT_LATE: {
        postLaserInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_LASER_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_KNIFE_INIT_LATE: {
        postKnifeInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_KNIFE_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PROJECTILE_INIT_LATE: {
        postProjectileInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PROJECTILE_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_NPC_INIT_LATE: {
        postNPCInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_NPC_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_EFFECT_INIT_LATE: {
        postEffectInitLateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_EFFECT_INIT_LATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PICKUP_COLLECT: {
        postPickupCollectRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PICKUP_COLLECT]),
        );
        break;
      }

      case ModCallbacksCustom.MC_PRE_ITEM_PICKUP: {
        preItemPickupRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_PRE_ITEM_PICKUP]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_ITEM_PICKUP: {
        postItemPickupRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_ITEM_PICKUP]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE: {
        postPlayerChangeTypeRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH: {
        postPlayerChangeHealthRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE: {
        postPlayerFatalDamageRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE: {
        preCustomReviveRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_CUSTOM_REVIVE: {
        postCustomReviveRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_CUSTOM_REVIVE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_FLIP: {
        postFlipRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_FLIP]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_FIRST_FLIP: {
        postFirstFlipRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_FIRST_FLIP]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_ESAU_JR: {
        postEsauJrRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_ESAU_JR]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_FIRST_ESAU_JR: {
        postFirstEsauJrRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_FIRST_ESAU_JR]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_TRANSFORMATION: {
        postTransformationRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_TRANSFORMATION]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_PURCHASE: {
        postPurchaseRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_PURCHASE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_SACRIFICE: {
        postSacrificeRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_SACRIFICE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_CURSED_TELEPORT: {
        postCursedTeleportRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_CURSED_TELEPORT]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_SLOT_INIT: {
        postSlotInitRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_SLOT_INIT]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_SLOT_UPDATE: {
        postSlotUpdateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_SLOT_UPDATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_SLOT_RENDER: {
        postSlotRenderRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_SLOT_RENDER]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_SLOT_DESTROYED: {
        postSlotDestroyedRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_SLOT_DESTROYED]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT: {
        postGridEntityInitRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE: {
        postGridEntityUpdateRegister(
          ...(args as CallbackParametersCustom[ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE]),
        );
        break;
      }

      case ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE: {
        postGridEntityRemoveRegister(
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

  constructor(mod: Mod, verbose: boolean) {
    this.Mod = mod;
    this.Verbose = verbose;
    this.Name = mod.Name;
  }
}

function getCallbackName(callbackID: int) {
  for (const [key, value] of Object.entries(ModCallbacks)) {
    if (value === callbackID) {
      return key;
    }
  }

  return "MC_UNKNOWN";
}
