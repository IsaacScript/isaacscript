import { customReviveCallbacksInit } from "./callbacks/customRevive";
import { itemPickupCallbacksInit } from "./callbacks/itemPickup";
import { postBombInitLateCallbackInit } from "./callbacks/postBombInitLate";
import { postBoneSwingCallbackInit } from "./callbacks/postBoneSwing";
import { postCursedTeleportCallbackInit } from "./callbacks/postCursedTeleport";
import { postCustomDoorEnterCallbackInit } from "./callbacks/postCustomDoorEnter";
import { postEffectInitLateCallbackInit } from "./callbacks/postEffectInitLate";
import { postEsauJrCallbacksInit } from "./callbacks/postEsauJr";
import { postFamiliarInitLateCallbackInit } from "./callbacks/postFamiliarInitLate";
import { postFlipCallbacksInit } from "./callbacks/postFlip";
import { postGridEntityCallbacksInit } from "./callbacks/postGridEntity";
import { postGridEntityCollisionInit } from "./callbacks/postGridEntityCollision";
import { postKnifeInitLateCallbackInit } from "./callbacks/postKnifeInitLate";
import { postLaserInitLateCallbackInit } from "./callbacks/postLaserInitLate";
import { postNewRoomEarlyCallbackInit } from "./callbacks/postNewRoomEarly";
import { postNPCInitLateCallbackInit } from "./callbacks/postNPCInitLate";
import { postPickupCollectCallbackInit } from "./callbacks/postPickupCollect";
import { postPickupInitLateCallbackInit } from "./callbacks/postPickupInitLate";
import { postPlayerChangeHealthCallbackInit } from "./callbacks/postPlayerChangeHealth";
import { postPlayerChangeTypeCallbackInit } from "./callbacks/postPlayerChangeType";
import { postPlayerFatalDamageCallbackInit } from "./callbacks/postPlayerFatalDamage";
import { postPlayerInitLateCallbackInit } from "./callbacks/postPlayerInitLate";
import { postPlayerReorderedCallbacksInit } from "./callbacks/postPlayerReordered";
import { postProjectileInitLateCallbackInit } from "./callbacks/postProjectileInitLate";
import { postPurchaseCallbackInit } from "./callbacks/postPurchase";
import { postSacrificeCallbackInit } from "./callbacks/postSacrifice";
import { postSlotInitUpdateCallbacksInit } from "./callbacks/postSlotInitUpdate";
import { postSlotRenderCallbacksInit } from "./callbacks/postSlotRender";
import { postTearInitLateCallbackInit } from "./callbacks/postTearInitLate";
import { postTearInitVeryLateCallbackInit } from "./callbacks/postTearInitVeryLate";
import { postTransformationCallbackInit } from "./callbacks/postTransformation";
import { postTrinketBreakCallbackInit } from "./callbacks/postTrinketBreak";
import { preBerserkDeathCallbackInit } from "./callbacks/preBerserkDeath";
import { preNewLevelCallbackInit } from "./callbacks/preNewLevel";
import { reorderedCallbacksInit } from "./callbacks/reorderedCallbacks";
import { roomClearChangeCallbackInit } from "./callbacks/roomClearChange";
import { ModUpgraded } from "./classes/ModUpgraded";
import { deployJSONRoomInit } from "./features/deployJSONRoom";
import { disableInputsInit } from "./features/disableInputs";
import { disableSoundsInit } from "./features/disableSound";
import { forgottenSwitchInit } from "./features/forgottenSwitch";
import { getCollectibleItemPoolTypeInit } from "./features/getCollectibleItemPoolType";
import { isPonyActiveInit } from "./features/isPonyActive";
import { playerInventoryInit } from "./features/playerInventory";
import { preventCollectibleRotateInit } from "./features/preventCollectibleRotate";
import { runInNFramesInit } from "./features/runInNFrames";
import { saveDataManagerInit } from "./features/saveDataManager/main";
import { sirenHelpersInit } from "./features/sirenHelpers";
import { taintedLazarusPlayersInit } from "./features/taintedLazarusPlayers";
import {
  areFeaturesInitialized,
  setFeaturesInitialized,
} from "./featuresInitialized";
import { patchErrorFunction } from "./patchErrorFunctions";

/**
 * Use this function to enable the custom features and callbacks provided by `isaacscript-common`.
 *
 * Example:
 * ```
 * const modVanilla = RegisterMod("My Mod", 1);
 * const mod = upgradeMod(modVanilla);
 *
 * // Subscribe to vanilla callbacks
 * mod.AddCallback(ModCallbacks.MC_POST_UPDATE, postUpdate);
 *
 * // Subscribe to custom callbacks
 * mod.AddCallbackCustom(ModCallbacksCustom.MC_POST_ITEM_PICKUP, postItemPickup);
 * ```
 *
 * For a list of all custom callbacks, check out the
 * [Function Signatures](https://isaacscript.github.io/docs/function-signatures#custom-callbacks).
 *
 * @param modVanilla The mod object returned by the `RegisterMod` function.
 * @param verbose Enables verbose logging for the purposes of crash troubleshooting.
 * Defaults to false.
 * @returns The upgraded mod object.
 */
export function upgradeMod(modVanilla: Mod, verbose = false): ModUpgraded {
  patchErrorFunction();

  const mod = new ModUpgraded(modVanilla, verbose);

  if (!areFeaturesInitialized()) {
    setFeaturesInitialized();

    // We initialize the PostNewRoomEarly callback first since it is used by the save data manager
    postNewRoomEarlyCallbackInit(mod);

    // We initialized the save data manager second since it is used by the other custom callbacks
    // and features
    saveDataManagerInit(mod);

    // We initialize custom callbacks next since some features use custom callbacks
    initCustomCallbacks(mod);

    initFeatures(mod);
  }

  return mod;
}

function initCustomCallbacks(mod: ModUpgraded) {
  reorderedCallbacksInit(mod);
  preNewLevelCallbackInit(mod);
  roomClearChangeCallbackInit(mod);
  postPlayerReorderedCallbacksInit(mod);
  postPlayerInitLateCallbackInit(mod); // 1
  postTearInitLateCallbackInit(mod); // 2
  postTearInitVeryLateCallbackInit(mod); // 2
  postFamiliarInitLateCallbackInit(mod); // 3
  postBombInitLateCallbackInit(mod); // 4
  postPickupInitLateCallbackInit(mod); // 5
  postLaserInitLateCallbackInit(mod); // 7
  postKnifeInitLateCallbackInit(mod); // 8
  postProjectileInitLateCallbackInit(mod); // 9
  postNPCInitLateCallbackInit(mod);
  postEffectInitLateCallbackInit(mod); // 1000
  postPickupCollectCallbackInit(mod);
  itemPickupCallbacksInit(mod);
  postPlayerChangeTypeCallbackInit(mod);
  postPlayerChangeHealthCallbackInit(mod);
  postPlayerFatalDamageCallbackInit(mod);
  preBerserkDeathCallbackInit(mod);
  customReviveCallbacksInit(mod);
  postFlipCallbacksInit(mod);
  postEsauJrCallbacksInit(mod);
  postTransformationCallbackInit(mod);
  postPurchaseCallbackInit(mod);
  postSacrificeCallbackInit(mod);
  postTrinketBreakCallbackInit(mod);
  postCursedTeleportCallbackInit(mod);
  postSlotInitUpdateCallbacksInit(mod);
  postSlotRenderCallbacksInit(mod);
  postGridEntityCallbacksInit(mod);
  postGridEntityCollisionInit(mod);
  postBoneSwingCallbackInit(mod);
  postCustomDoorEnterCallbackInit();
}

function initFeatures(mod: ModUpgraded) {
  deployJSONRoomInit(mod);
  disableInputsInit(mod);
  disableSoundsInit(mod);
  forgottenSwitchInit(mod);
  getCollectibleItemPoolTypeInit(mod);
  preventCollectibleRotateInit(mod);
  runInNFramesInit(mod);
  sirenHelpersInit(mod);
  isPonyActiveInit(mod);
  playerInventoryInit(mod);
  taintedLazarusPlayersInit(mod);
}
