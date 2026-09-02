import type { ModCallbackCustomToClass } from "./callbacks";
import { CustomGridEntities } from "./classes/features/callbackLogic/CustomGridEntities";
import { CustomRevive } from "./classes/features/callbackLogic/CustomRevive";
import { EsauJrDetection } from "./classes/features/callbackLogic/EsauJrDetection";
import { FlipDetection } from "./classes/features/callbackLogic/FlipDetection";
import { GameReorderedCallbacks } from "./classes/features/callbackLogic/GameReorderedCallbacks";
import { GridEntityCollisionDetection } from "./classes/features/callbackLogic/GridEntityCollisionDetection";
import { GridEntityRenderDetection } from "./classes/features/callbackLogic/GridEntityRenderDetection";
import { GridEntityUpdateDetection } from "./classes/features/callbackLogic/GridEntityUpdateDetection";
import { ItemPickupDetection } from "./classes/features/callbackLogic/ItemPickupDetection";
import { PickupChangeDetection } from "./classes/features/callbackLogic/PickupChangeDetection";
import { PlayerCollectibleDetection } from "./classes/features/callbackLogic/PlayerCollectibleDetection";
import { PlayerReorderedCallbacks } from "./classes/features/callbackLogic/PlayerReorderedCallbacks";
import { SlotDestroyedDetection } from "./classes/features/callbackLogic/SlotDestroyedDetection";
import { SlotRenderDetection } from "./classes/features/callbackLogic/SlotRenderDetection";
import { SlotUpdateDetection } from "./classes/features/callbackLogic/SlotUpdateDetection";
import { CharacterHealthConversion } from "./classes/features/other/CharacterHealthConversion";
import { CharacterStats } from "./classes/features/other/CharacterStats";
import { CollectibleItemPoolType } from "./classes/features/other/CollectibleItemPoolType";
import { CustomHotkeys } from "./classes/features/other/CustomHotkeys";
import { CustomItemPools } from "./classes/features/other/CustomItemPools";
import { CustomPickups } from "./classes/features/other/CustomPickups";
import { CustomStages } from "./classes/features/other/CustomStages";
import { CustomTrapdoors } from "./classes/features/other/CustomTrapdoors";
import { DebugDisplay } from "./classes/features/other/DebugDisplay";
import { DeployJSONRoom } from "./classes/features/other/DeployJSONRoom";
import { DisableAllSound } from "./classes/features/other/DisableAllSound";
import { DisableInputs } from "./classes/features/other/DisableInputs";
import { EdenStartingStatsHealth } from "./classes/features/other/EdenStartingStatsHealth";
import { ExtraConsoleCommands } from "./classes/features/other/ExtraConsoleCommands";
import { FadeInRemover } from "./classes/features/other/FadeInRemover";
import { FastReset } from "./classes/features/other/FastReset";
import { FlyingDetection } from "./classes/features/other/FlyingDetection";
import { ForgottenSwitch } from "./classes/features/other/ForgottenSwitch";
import { ItemPoolDetection } from "./classes/features/other/ItemPoolDetection";
import { ModdedElementDetection } from "./classes/features/other/ModdedElementDetection";
import { ModdedElementSets } from "./classes/features/other/ModdedElementSets";
import { NoSirenSteal } from "./classes/features/other/NoSirenSteal";
import { Pause } from "./classes/features/other/Pause";
import { PersistentEntities } from "./classes/features/other/PersistentEntities";
import { PickupIndexCreation } from "./classes/features/other/PickupIndexCreation";
import { PlayerCollectibleTracking } from "./classes/features/other/PlayerCollectibleTracking";
import { PonyDetection } from "./classes/features/other/PonyDetection";
import { PressInput } from "./classes/features/other/PressInput";
import { PreventChildEntities } from "./classes/features/other/PreventChildEntities";
import { PreventGridEntityRespawn } from "./classes/features/other/PreventGridEntityRespawn";
import { RerunDetection } from "./classes/features/other/RerunDetection";
import { RoomClearFrame } from "./classes/features/other/RoomClearFrame";
import { RoomHistory } from "./classes/features/other/RoomHistory";
import { RunInNFrames } from "./classes/features/other/RunInNFrames";
import { RunNextRoom } from "./classes/features/other/RunNextRoom";
import { RunNextRun } from "./classes/features/other/RunNextRun";
import { SaveDataManager } from "./classes/features/other/SaveDataManager";
import { SpawnRockAltRewards } from "./classes/features/other/SpawnRockAltRewards";
import { StageHistory } from "./classes/features/other/StageHistory";
import { StartAmbush } from "./classes/features/other/StartAmbush";
import { TaintedLazarusPlayers } from "./classes/features/other/TaintedLazarusPlayers";
import { UnlockAchievementsDetection } from "./classes/features/other/UnlockAchievementsDetection";
import type { Feature } from "./classes/private/Feature";
import { ISCFeature } from "./enums/ISCFeature";
import { ModCallbackCustom } from "./enums/ModCallbackCustom";
import { interfaceSatisfiesEnum } from "./functions/enums";
import type { ModUpgradedInterface } from "./interfaces/private/ModUpgradedInterface";

export interface ISCFeatureToClass {
  // Callback logic
  readonly [ISCFeature.CUSTOM_REVIVE]: CustomRevive;
  readonly [ISCFeature.ESAU_JR_DETECTION]: EsauJrDetection;
  readonly [ISCFeature.FLIP_DETECTION]: FlipDetection;
  readonly [ISCFeature.GRID_ENTITY_COLLISION_DETECTION]: GridEntityCollisionDetection;
  readonly [ISCFeature.GRID_ENTITY_RENDER_DETECTION]: GridEntityRenderDetection;
  readonly [ISCFeature.GRID_ENTITY_UPDATE_DETECTION]: GridEntityUpdateDetection;
  readonly [ISCFeature.GAME_REORDERED_CALLBACKS]: GameReorderedCallbacks;
  readonly [ISCFeature.ITEM_PICKUP_DETECTION]: ItemPickupDetection;
  readonly [ISCFeature.PICKUP_CHANGE_DETECTION]: PickupChangeDetection;
  readonly [ISCFeature.PLAYER_COLLECTIBLE_DETECTION]: PlayerCollectibleDetection;
  readonly [ISCFeature.PLAYER_REORDERED_CALLBACKS]: PlayerReorderedCallbacks;
  readonly [ISCFeature.SLOT_DESTROYED_DETECTION]: SlotDestroyedDetection;
  readonly [ISCFeature.SLOT_RENDER_DETECTION]: SlotRenderDetection;
  readonly [ISCFeature.SLOT_UPDATE_DETECTION]: SlotUpdateDetection;

  // Extra features
  readonly [ISCFeature.CHARACTER_HEALTH_CONVERSION]: CharacterHealthConversion;
  readonly [ISCFeature.CHARACTER_STATS]: CharacterStats;
  readonly [ISCFeature.COLLECTIBLE_ITEM_POOL_TYPE]: CollectibleItemPoolType;
  readonly [ISCFeature.CUSTOM_GRID_ENTITIES]: CustomGridEntities;
  readonly [ISCFeature.CUSTOM_ITEM_POOLS]: CustomItemPools;
  readonly [ISCFeature.CUSTOM_HOTKEYS]: CustomHotkeys;
  readonly [ISCFeature.CUSTOM_PICKUPS]: CustomPickups;
  readonly [ISCFeature.CUSTOM_STAGES]: CustomStages;
  readonly [ISCFeature.CUSTOM_TRAPDOORS]: CustomTrapdoors;
  readonly [ISCFeature.DEBUG_DISPLAY]: DebugDisplay;
  readonly [ISCFeature.DEPLOY_JSON_ROOM]: DeployJSONRoom;
  readonly [ISCFeature.DISABLE_ALL_SOUND]: DisableAllSound;
  readonly [ISCFeature.DISABLE_INPUTS]: DisableInputs;
  readonly [ISCFeature.EDEN_STARTING_STATS_HEALTH]: EdenStartingStatsHealth;
  readonly [ISCFeature.FADE_IN_REMOVER]: FadeInRemover;
  readonly [ISCFeature.FAST_RESET]: FastReset;
  readonly [ISCFeature.FLYING_DETECTION]: FlyingDetection;
  readonly [ISCFeature.FORGOTTEN_SWITCH]: ForgottenSwitch;
  readonly [ISCFeature.EXTRA_CONSOLE_COMMANDS]: ExtraConsoleCommands;
  readonly [ISCFeature.ITEM_POOL_DETECTION]: ItemPoolDetection;
  readonly [ISCFeature.MODDED_ELEMENT_DETECTION]: ModdedElementDetection;
  readonly [ISCFeature.MODDED_ELEMENT_SETS]: ModdedElementSets;
  readonly [ISCFeature.NO_SIREN_STEAL]: NoSirenSteal;
  readonly [ISCFeature.PAUSE]: Pause;
  readonly [ISCFeature.PERSISTENT_ENTITIES]: PersistentEntities;
  readonly [ISCFeature.PICKUP_INDEX_CREATION]: PickupIndexCreation;
  readonly [ISCFeature.PLAYER_COLLECTIBLE_TRACKING]: PlayerCollectibleTracking;
  readonly [ISCFeature.PONY_DETECTION]: PonyDetection;
  readonly [ISCFeature.PRESS_INPUT]: PressInput;
  readonly [ISCFeature.PREVENT_CHILD_ENTITIES]: PreventChildEntities;
  readonly [ISCFeature.PREVENT_GRID_ENTITY_RESPAWN]: PreventGridEntityRespawn;
  readonly [ISCFeature.RERUN_DETECTION]: RerunDetection;
  readonly [ISCFeature.ROOM_CLEAR_FRAME]: RoomClearFrame;
  readonly [ISCFeature.ROOM_HISTORY]: RoomHistory;
  readonly [ISCFeature.RUN_IN_N_FRAMES]: RunInNFrames;
  readonly [ISCFeature.RUN_NEXT_ROOM]: RunNextRoom;
  readonly [ISCFeature.RUN_NEXT_RUN]: RunNextRun;
  readonly [ISCFeature.SAVE_DATA_MANAGER]: SaveDataManager;
  readonly [ISCFeature.SPAWN_ALT_ROCK_REWARDS]: SpawnRockAltRewards;
  readonly [ISCFeature.STAGE_HISTORY]: StageHistory;
  readonly [ISCFeature.START_AMBUSH]: StartAmbush;
  readonly [ISCFeature.TAINTED_LAZARUS_PLAYERS]: TaintedLazarusPlayers;
  readonly [ISCFeature.UNLOCK_ACHIEVEMENTS_DETECTION]: UnlockAchievementsDetection;
}

// eslint-disable-next-line unicorn/no-top-level-side-effects
interfaceSatisfiesEnum<ISCFeatureToClass, ISCFeature>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getFeatures(
  mod: ModUpgradedInterface,
  callbacks: ModCallbackCustomToClass,
) {
  // Some features rely on other features; we must initialize those first.
  const gameReorderedCallbacks = new GameReorderedCallbacks(
    callbacks[ModCallbackCustom.POST_GAME_STARTED_REORDERED],
    callbacks[ModCallbackCustom.POST_NEW_LEVEL_REORDERED],
    callbacks[ModCallbackCustom.POST_NEW_ROOM_REORDERED],
    callbacks[ModCallbackCustom.POST_GAME_STARTED_REORDERED_LAST],
  );

  const disableAllSound = new DisableAllSound();
  const disableInputs = new DisableInputs();
  const moddedElementDetection = new ModdedElementDetection();
  const ponyDetection = new PonyDetection();
  const pressInput = new PressInput();
  const roomClearFrame = new RoomClearFrame();
  const roomHistory = new RoomHistory();
  const runNextRoom = new RunNextRoom();
  const saveDataManager = new SaveDataManager(mod);
  const stageHistory = new StageHistory();

  const runInNFrames = new RunInNFrames(roomHistory);
  const pickupIndexCreation = new PickupIndexCreation(
    roomHistory,
    saveDataManager,
  );

  const customGridEntities = new CustomGridEntities(runInNFrames);
  const moddedElementSets = new ModdedElementSets(moddedElementDetection);
  const itemPoolDetection = new ItemPoolDetection(moddedElementSets);
  const pause = new Pause(disableInputs);
  const preventGridEntityRespawn = new PreventGridEntityRespawn(runInNFrames);

  const customTrapdoors = new CustomTrapdoors(
    customGridEntities,
    disableInputs,
    ponyDetection,
    roomClearFrame,
    runInNFrames,
    runNextRoom,
    stageHistory,
  );

  const features = {
    // Callback logic
    [ISCFeature.CUSTOM_REVIVE]: new CustomRevive(
      callbacks[ModCallbackCustom.PRE_CUSTOM_REVIVE],
      callbacks[ModCallbackCustom.POST_CUSTOM_REVIVE],
      runInNFrames,
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
    [ISCFeature.GAME_REORDERED_CALLBACKS]: gameReorderedCallbacks,
    [ISCFeature.ITEM_PICKUP_DETECTION]: new ItemPickupDetection(
      callbacks[ModCallbackCustom.POST_ITEM_PICKUP],
      callbacks[ModCallbackCustom.PRE_ITEM_PICKUP],
    ),
    [ISCFeature.PICKUP_CHANGE_DETECTION]: new PickupChangeDetection(
      callbacks[ModCallbackCustom.POST_PICKUP_CHANGED],
      pickupIndexCreation,
    ),
    [ISCFeature.PLAYER_COLLECTIBLE_DETECTION]: new PlayerCollectibleDetection(
      callbacks[ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED],
      callbacks[ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED],
      moddedElementSets,
      runInNFrames,
    ),
    [ISCFeature.PLAYER_REORDERED_CALLBACKS]: new PlayerReorderedCallbacks(
      callbacks[ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED],
      callbacks[ModCallbackCustom.POST_PLAYER_RENDER_REORDERED],
      callbacks[ModCallbackCustom.POST_PLAYER_UPDATE_REORDERED],
    ),
    [ISCFeature.SLOT_DESTROYED_DETECTION]: new SlotDestroyedDetection(
      callbacks[ModCallbackCustom.POST_SLOT_DESTROYED],
      roomHistory,
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
    [ISCFeature.CHARACTER_HEALTH_CONVERSION]: new CharacterHealthConversion(),
    [ISCFeature.CHARACTER_STATS]: new CharacterStats(),
    [ISCFeature.COLLECTIBLE_ITEM_POOL_TYPE]: new CollectibleItemPoolType(
      pickupIndexCreation,
    ),
    [ISCFeature.CUSTOM_GRID_ENTITIES]: customGridEntities,
    [ISCFeature.CUSTOM_ITEM_POOLS]: new CustomItemPools(),
    [ISCFeature.CUSTOM_HOTKEYS]: new CustomHotkeys(),
    [ISCFeature.CUSTOM_PICKUPS]: new CustomPickups(),
    [ISCFeature.CUSTOM_STAGES]: new CustomStages(
      customGridEntities,
      customTrapdoors,
      disableAllSound,
      gameReorderedCallbacks,
      pause,
      runInNFrames,
    ),
    [ISCFeature.CUSTOM_TRAPDOORS]: customTrapdoors,
    [ISCFeature.DEBUG_DISPLAY]: new DebugDisplay(mod),
    [ISCFeature.DEPLOY_JSON_ROOM]: new DeployJSONRoom(preventGridEntityRespawn),
    [ISCFeature.DISABLE_ALL_SOUND]: disableAllSound,
    [ISCFeature.DISABLE_INPUTS]: disableInputs,
    [ISCFeature.EDEN_STARTING_STATS_HEALTH]: new EdenStartingStatsHealth(),
    [ISCFeature.FADE_IN_REMOVER]: new FadeInRemover(),
    [ISCFeature.FAST_RESET]: new FastReset(),
    [ISCFeature.FLYING_DETECTION]: new FlyingDetection(moddedElementSets),
    [ISCFeature.FORGOTTEN_SWITCH]: new ForgottenSwitch(pressInput),
    [ISCFeature.EXTRA_CONSOLE_COMMANDS]: new ExtraConsoleCommands(),
    [ISCFeature.ITEM_POOL_DETECTION]: itemPoolDetection,
    [ISCFeature.MODDED_ELEMENT_DETECTION]: moddedElementDetection,
    [ISCFeature.MODDED_ELEMENT_SETS]: moddedElementSets,
    [ISCFeature.NO_SIREN_STEAL]: new NoSirenSteal(),
    [ISCFeature.PAUSE]: pause,
    [ISCFeature.PERSISTENT_ENTITIES]: new PersistentEntities(roomHistory),
    [ISCFeature.PICKUP_INDEX_CREATION]: pickupIndexCreation,
    [ISCFeature.PLAYER_COLLECTIBLE_TRACKING]: new PlayerCollectibleTracking(),
    [ISCFeature.PONY_DETECTION]: ponyDetection,
    [ISCFeature.PRESS_INPUT]: pressInput,
    [ISCFeature.PREVENT_CHILD_ENTITIES]: new PreventChildEntities(),
    [ISCFeature.PREVENT_GRID_ENTITY_RESPAWN]: preventGridEntityRespawn,
    [ISCFeature.RERUN_DETECTION]: new RerunDetection(),
    [ISCFeature.ROOM_CLEAR_FRAME]: roomClearFrame,
    [ISCFeature.ROOM_HISTORY]: roomHistory,
    [ISCFeature.RUN_IN_N_FRAMES]: runInNFrames,
    [ISCFeature.RUN_NEXT_ROOM]: runNextRoom,
    [ISCFeature.RUN_NEXT_RUN]: new RunNextRun(),
    [ISCFeature.SAVE_DATA_MANAGER]: saveDataManager,
    [ISCFeature.SPAWN_ALT_ROCK_REWARDS]: new SpawnRockAltRewards(
      itemPoolDetection,
    ),
    [ISCFeature.STAGE_HISTORY]: stageHistory,
    [ISCFeature.START_AMBUSH]: new StartAmbush(runInNFrames),
    [ISCFeature.TAINTED_LAZARUS_PLAYERS]: new TaintedLazarusPlayers(),
    [ISCFeature.UNLOCK_ACHIEVEMENTS_DETECTION]:
      new UnlockAchievementsDetection(),
  } as const satisfies Record<ISCFeature, Feature>;

  return features;
}
