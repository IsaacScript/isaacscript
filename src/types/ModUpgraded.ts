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
import { postNewRoomEarlyRegister } from "../callbacks/subscriptions/postNewRoomEarly";
import { postNewRoomReorderedRegister } from "../callbacks/subscriptions/postNewRoomReordered";
import { postNPCInitLateRegister } from "../callbacks/subscriptions/postNPCInitLate";
import { postPEffectUpdateReorderedRegister } from "../callbacks/subscriptions/postPEffectUpdateReordered";
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
import { postTearInitVeryLateRegister } from "../callbacks/subscriptions/postTearInitVeryLate";
import { postTransformationRegister } from "../callbacks/subscriptions/postTransformation";
import { postTrinketBreakRegister } from "../callbacks/subscriptions/postTrinketBreak";
import { preBerserkDeathRegister } from "../callbacks/subscriptions/preBerserkDeath";
import { preCustomReviveRegister } from "../callbacks/subscriptions/preCustomRevive";
import { preItemPickupRegister } from "../callbacks/subscriptions/preItemPickup";
import { preNewLevelRegister } from "../callbacks/subscriptions/PreNewLevel";
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
    const callbackRegisterFunction = getCallbackRegisterFunction(callbackID);
    if (callbackRegisterFunction === undefined) {
      error(
        `Failed to find a callback registration function for custom callback: ${callbackID}`,
      );
    }

    // Calling this properly with generics is difficult
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    callbackRegisterFunction(...args);
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

function getCallbackRegisterFunction(callbackID: ModCallbacksCustom) {
  switch (callbackID) {
    case ModCallbacksCustom.MC_POST_GAME_STARTED_REORDERED: {
      return postGameStartedReorderedRegister;
    }

    case ModCallbacksCustom.MC_POST_NEW_LEVEL_REORDERED: {
      return postNewLevelReorderedRegister;
    }

    case ModCallbacksCustom.MC_POST_NEW_ROOM_REORDERED: {
      return postNewRoomReorderedRegister;
    }

    case ModCallbacksCustom.MC_POST_PLAYER_INIT_REORDERED: {
      return postPlayerInitReorderedRegister;
    }

    case ModCallbacksCustom.MC_POST_PEFFECT_UPDATE_REORDERED: {
      return postPEffectUpdateReorderedRegister;
    }

    case ModCallbacksCustom.MC_POST_PLAYER_UPDATE_REORDERED: {
      return postPlayerUpdateReorderedRegister;
    }

    case ModCallbacksCustom.MC_POST_PLAYER_RENDER_REORDERED: {
      return postPlayerRenderReorderedRegister;
    }

    case ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY: {
      return postNewRoomEarlyRegister;
    }

    case ModCallbacksCustom.MC_PRE_NEW_LEVEL: {
      return preNewLevelRegister;
    }

    case ModCallbacksCustom.MC_POST_PLAYER_INIT_LATE: {
      return postPlayerInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_TEAR_INIT_LATE: {
      return postTearInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_TEAR_INIT_VERY_LATE: {
      return postTearInitVeryLateRegister;
    }

    case ModCallbacksCustom.MC_POST_FAMILIAR_INIT_LATE: {
      return postFamiliarInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_BOMB_INIT_LATE: {
      return postBombInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_PICKUP_INIT_LATE: {
      return postPickupInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_LASER_INIT_LATE: {
      return postLaserInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_KNIFE_INIT_LATE: {
      return postKnifeInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_PROJECTILE_INIT_LATE: {
      return postProjectileInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_NPC_INIT_LATE: {
      return postNPCInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_EFFECT_INIT_LATE: {
      return postEffectInitLateRegister;
    }

    case ModCallbacksCustom.MC_POST_PICKUP_COLLECT: {
      return postPickupCollectRegister;
    }

    case ModCallbacksCustom.MC_PRE_ITEM_PICKUP: {
      return preItemPickupRegister;
    }

    case ModCallbacksCustom.MC_POST_ITEM_PICKUP: {
      return postItemPickupRegister;
    }

    case ModCallbacksCustom.MC_POST_PLAYER_CHANGE_TYPE: {
      return postPlayerChangeTypeRegister;
    }

    case ModCallbacksCustom.MC_POST_PLAYER_CHANGE_HEALTH: {
      return postPlayerChangeHealthRegister;
    }

    case ModCallbacksCustom.MC_POST_PLAYER_FATAL_DAMAGE: {
      return postPlayerFatalDamageRegister;
    }

    case ModCallbacksCustom.MC_PRE_BERSERK_DEATH: {
      return preBerserkDeathRegister;
    }

    case ModCallbacksCustom.MC_PRE_CUSTOM_REVIVE: {
      return preCustomReviveRegister;
    }

    case ModCallbacksCustom.MC_POST_CUSTOM_REVIVE: {
      return postCustomReviveRegister;
    }

    case ModCallbacksCustom.MC_POST_FLIP: {
      return postFlipRegister;
    }

    case ModCallbacksCustom.MC_POST_FIRST_FLIP: {
      return postFirstFlipRegister;
    }

    case ModCallbacksCustom.MC_POST_ESAU_JR: {
      return postEsauJrRegister;
    }

    case ModCallbacksCustom.MC_POST_FIRST_ESAU_JR: {
      return postFirstEsauJrRegister;
    }

    case ModCallbacksCustom.MC_POST_TRANSFORMATION: {
      return postTransformationRegister;
    }

    case ModCallbacksCustom.MC_POST_PURCHASE: {
      return postPurchaseRegister;
    }

    case ModCallbacksCustom.MC_POST_SACRIFICE: {
      return postSacrificeRegister;
    }

    case ModCallbacksCustom.MC_POST_CURSED_TELEPORT: {
      return postCursedTeleportRegister;
    }

    case ModCallbacksCustom.MC_POST_TRINKET_BREAK: {
      return postTrinketBreakRegister;
    }

    case ModCallbacksCustom.MC_POST_SLOT_INIT: {
      return postSlotInitRegister;
    }

    case ModCallbacksCustom.MC_POST_SLOT_UPDATE: {
      return postSlotUpdateRegister;
    }

    case ModCallbacksCustom.MC_POST_SLOT_RENDER: {
      return postSlotRenderRegister;
    }

    case ModCallbacksCustom.MC_POST_SLOT_DESTROYED: {
      return postSlotDestroyedRegister;
    }

    case ModCallbacksCustom.MC_POST_GRID_ENTITY_INIT: {
      return postGridEntityInitRegister;
    }

    case ModCallbacksCustom.MC_POST_GRID_ENTITY_UPDATE: {
      return postGridEntityUpdateRegister;
    }

    case ModCallbacksCustom.MC_POST_GRID_ENTITY_REMOVE: {
      return postGridEntityRemoveRegister;
    }

    default: {
      ensureAllCases(callbackID);
      error(`The custom callback ID of "${callbackID}" is not valid.`);
      return () => {};
    }
  }
}
