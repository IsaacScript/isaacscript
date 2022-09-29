import { ModCallbackCustomToClass } from "./callbacks";
import { CustomGridEntities } from "./classes/features/callbackLogic/CustomGridEntities";
import { CustomRevive } from "./classes/features/callbackLogic/CustomRevive";
import { EsauJrDetection } from "./classes/features/callbackLogic/EsauJrDetection";
import { FlipDetection } from "./classes/features/callbackLogic/FlipDetection";
import { GameReorderedCallbacks } from "./classes/features/callbackLogic/GameReorderedCallbacks";
import { GridEntityCollisionDetection } from "./classes/features/callbackLogic/GridEntityCollisionDetection";
import { GridEntityDetection } from "./classes/features/callbackLogic/GridEntityDetection";
import { PlayerReorderedCallbacks } from "./classes/features/callbackLogic/PlayerReorderedCallbacks";
import { RunInNFrames } from "./classes/features/other/RunInNFrames";
import { SaveDataManager } from "./classes/features/other/SaveDataManager";
import { ISCFeature } from "./enums/ISCFeature";
import { ModCallbackCustom2 } from "./enums/ModCallbackCustom2";
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
  [ISCFeature.GRID_ENTITY_DETECTION]: GridEntityDetection;
  [ISCFeature.GAME_REORDERED_CALLBACKS]: GameReorderedCallbacks;
  [ISCFeature.PLAYER_REORDERED_CALLBACKS]: PlayerReorderedCallbacks;

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
      callbacks[ModCallbackCustom2.PRE_CUSTOM_REVIVE],
      callbacks[ModCallbackCustom2.POST_CUSTOM_REVIVE],
    ),
    [ISCFeature.ESAU_JR_DETECTION]: new EsauJrDetection(
      callbacks[ModCallbackCustom2.POST_ESAU_JR],
      callbacks[ModCallbackCustom2.POST_FIRST_ESAU_JR],
    ),
    [ISCFeature.FLIP_DETECTION]: new FlipDetection(
      callbacks[ModCallbackCustom2.POST_FLIP],
      callbacks[ModCallbackCustom2.POST_FIRST_FLIP],
    ),
    [ISCFeature.GRID_ENTITY_COLLISION_DETECTION]:
      new GridEntityCollisionDetection(
        callbacks[ModCallbackCustom2.POST_GRID_ENTITY_COLLISION],
        callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_COLLISION],
        customGridEntities,
      ),
    [ISCFeature.GRID_ENTITY_DETECTION]: new GridEntityDetection(
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_INIT],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_INIT],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_UPDATE],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_UPDATE],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_REMOVE],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_REMOVE],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_STATE_CHANGED],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_BROKEN],
      callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_BROKEN],
      customGridEntities,
    ),
    [ISCFeature.GAME_REORDERED_CALLBACKS]: new GameReorderedCallbacks(
      callbacks[ModCallbackCustom2.POST_GAME_STARTED_REORDERED],
      callbacks[ModCallbackCustom2.POST_NEW_LEVEL_REORDERED],
      callbacks[ModCallbackCustom2.POST_NEW_ROOM_REORDERED],
      callbacks[ModCallbackCustom2.POST_GAME_STARTED_REORDERED_LAST],
    ),
    [ISCFeature.PLAYER_REORDERED_CALLBACKS]: new PlayerReorderedCallbacks(
      callbacks[ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED],
      callbacks[ModCallbackCustom2.POST_PLAYER_RENDER_REORDERED],
      callbacks[ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED],
    ),

    // Extra features
    [ISCFeature.CUSTOM_GRID_ENTITIES]: customGridEntities,
    [ISCFeature.RUN_IN_N_FRAMES]: runInNFrames,
    [ISCFeature.SAVE_DATA_MANAGER]: new SaveDataManager(mod),
  } as const);
}
