import { ModCallbackCustomToClass } from "./callbacks";
import { CustomGridEntities } from "./classes/features/callbackLogic/CustomGridEntities";
import { CustomRevive } from "./classes/features/callbackLogic/CustomRevive";
import { EsauJrDetection } from "./classes/features/callbackLogic/EsauJrDetection";
import { FlipDetection } from "./classes/features/callbackLogic/FlipDetection";
import { GameReorderedCallbacks } from "./classes/features/callbackLogic/GameReorderedCallbacks";
import { GridEntityCollisionDetection } from "./classes/features/callbackLogic/GridEntityCollisionDetection";
import { GridEntityRenderDetection } from "./classes/features/callbackLogic/GridEntityRenderDetection";
import { GridEntityUpdateDetection } from "./classes/features/callbackLogic/GridEntityUpdateDetection";
import { ItemPickupDetection } from "./classes/features/callbackLogic/ItemPickupDetection";
import { PlayerCollectibleDetection } from "./classes/features/callbackLogic/PlayerCollectibleDetection";
import { PlayerReorderedCallbacks } from "./classes/features/callbackLogic/PlayerReorderedCallbacks";
import { SlotRenderDetection } from "./classes/features/callbackLogic/SlotRenderDetection";
import { SlotUpdateDetection } from "./classes/features/callbackLogic/SlotUpdateDetection";
import { RunInNFrames } from "./classes/features/other/RunInNFrames";
import { SaveDataManager } from "./classes/features/other/SaveDataManager";
import { ISCFeature } from "./enums/ISCFeature";
import { ModCallbackCustom } from "./enums/ModCallbackCustom";
import {
  newObjectWithEnumKeys,
  validateInterfaceMatchesEnum,
} from "./functions/utils";

export interface ISCFeatureToClass {
  // Callback logic
  [ISCFeature.CUSTOM_REVIVE]: CustomRevive;
  [ISCFeature.ESAU_JR_DETECTION]: EsauJrDetection;
  [ISCFeature.FLIP_DETECTION]: FlipDetection;
  [ISCFeature.GRID_ENTITY_COLLISION_DETECTION]: GridEntityCollisionDetection;
  [ISCFeature.GRID_ENTITY_RENDER_DETECTION]: GridEntityRenderDetection;
  [ISCFeature.GRID_ENTITY_UPDATE_DETECTION]: GridEntityUpdateDetection;
  [ISCFeature.GAME_REORDERED_CALLBACKS]: GameReorderedCallbacks;
  [ISCFeature.ITEM_PICKUP_DETECTION]: ItemPickupDetection;
  [ISCFeature.PLAYER_COLLECTIBLE_DETECTION]: PlayerCollectibleDetection;
  [ISCFeature.PLAYER_REORDERED_CALLBACKS]: PlayerReorderedCallbacks;
  [ISCFeature.SLOT_RENDER_DETECTION]: SlotRenderDetection;
  [ISCFeature.SLOT_UPDATE_DETECTION]: SlotUpdateDetection;

  // Extra features
  [ISCFeature.CUSTOM_GRID_ENTITIES]: CustomGridEntities;
  [ISCFeature.RUN_IN_N_FRAMES]: RunInNFrames;
  [ISCFeature.SAVE_DATA_MANAGER]: SaveDataManager;
}

validateInterfaceMatchesEnum<ISCFeatureToClass, ISCFeature>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getFeatures(mod: Mod, callbacks: ModCallbackCustomToClass) {
  // Some features rely on other features; we must initialize those first.
  const runInNFrames = new RunInNFrames();
  const customGridEntities = new CustomGridEntities(runInNFrames);

  return newObjectWithEnumKeys(ISCFeature, {
    // Callback logic
    [ISCFeature.CUSTOM_REVIVE]: new CustomRevive(
      callbacks[ModCallbackCustom.PRE_CUSTOM_REVIVE],
      callbacks[ModCallbackCustom.POST_CUSTOM_REVIVE],
    ),
    [ISCFeature.ESAU_JR_DETECTION]: new EsauJrDetection(
      callbacks[ModCallbackCustom.POST_ESAU_JR],
      callbacks[ModCallbackCustom.POST_FIRST_ESAU_JR],
    ),
    [ISCFeature.FLIP_DETECTION]: new FlipDetection(
      callbacks[ModCallbackCustom.POST_FLIP],
      callbacks[ModCallbackCustom.POST_FIRST_FLIP],
    ),
    [ISCFeature.GRID_ENTITY_COLLISION_DETECTION]:
      new GridEntityCollisionDetection(
        callbacks[ModCallbackCustom.POST_GRID_ENTITY_COLLISION],
        callbacks[ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_COLLISION],
        customGridEntities,
      ),
    [ISCFeature.GRID_ENTITY_UPDATE_DETECTION]: new GridEntityUpdateDetection(
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_INIT],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_INIT],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_UPDATE],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_REMOVE],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_REMOVE],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_STATE_CHANGED],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_BROKEN],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_BROKEN],
      customGridEntities,
    ),
    [ISCFeature.GRID_ENTITY_RENDER_DETECTION]: new GridEntityRenderDetection(
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_RENDER],
      callbacks[ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_RENDER],
      customGridEntities,
    ),
    [ISCFeature.GAME_REORDERED_CALLBACKS]: new GameReorderedCallbacks(
      callbacks[ModCallbackCustom.POST_GAME_STARTED_REORDERED],
      callbacks[ModCallbackCustom.POST_NEW_LEVEL_REORDERED],
      callbacks[ModCallbackCustom.POST_NEW_ROOM_REORDERED],
      callbacks[ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST],
    ),
    [ISCFeature.ITEM_PICKUP_DETECTION]: new ItemPickupDetection(
      callbacks[ModCallbackCustom.POST_ITEM_PICKUP],
      callbacks[ModCallbackCustom.PRE_ITEM_PICKUP],
    ),
    [ISCFeature.PLAYER_COLLECTIBLE_DETECTION]: new PlayerCollectibleDetection(
      callbacks[ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED],
      callbacks[ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED],
      runInNFrames,
    ),
    [ISCFeature.PLAYER_REORDERED_CALLBACKS]: new PlayerReorderedCallbacks(
      callbacks[ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED],
      callbacks[ModCallbackCustom.POST_PLAYER_RENDER_REORDERED],
      callbacks[ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED],
    ),
    [ISCFeature.SLOT_RENDER_DETECTION]: new SlotRenderDetection(
      callbacks[ModCallbackCustom.POST_SLOT_RENDER],
      callbacks[ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED],
    ),
    [ISCFeature.SLOT_UPDATE_DETECTION]: new SlotUpdateDetection(
      callbacks[ModCallbackCustom.POST_SLOT_INIT],
      callbacks[ModCallbackCustom.POST_SLOT_UPDATE],
    ),

    // Extra features
    [ISCFeature.CUSTOM_GRID_ENTITIES]: customGridEntities,
    [ISCFeature.RUN_IN_N_FRAMES]: runInNFrames,
    [ISCFeature.SAVE_DATA_MANAGER]: new SaveDataManager(mod),
  } as const);
}
