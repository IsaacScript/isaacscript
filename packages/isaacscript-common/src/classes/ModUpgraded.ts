import {
  LevelStage,
  ModCallback,
  StageType,
} from "isaac-typescript-definitions";
import { IsaacScriptCommonFeature } from "../enums/IsaacScriptCommonFeature";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { ModCallbackCustom2 } from "../enums/ModCallbackCustom2";
import {
  saveDataManager,
  saveDataManagerRemove,
} from "../features/saveDataManager/exports";
import { getTime } from "../functions/debugFunctions";
import { getParentFunctionDescription } from "../functions/log";
import { getTSTLClassName } from "../functions/tstlClass";
import { newObjectWithEnumKeys } from "../functions/utils";
import { AddCallbackParametersCustom } from "../interfaces/private/AddCallbackParametersCustom";
import { AddCallbackParametersCustom2 } from "../interfaces/private/AddCallbackParametersCustom2";
import { CALLBACK_REGISTER_FUNCTIONS } from "../objects/callbackRegisterFunctions";
import { PostAmbushFinished } from "./callbacks/PostAmbushFinished";
import { PostAmbushStarted } from "./callbacks/PostAmbushStarted";
import { PostBombExploded } from "./callbacks/PostBombExploded";
import { PostBombInitLate } from "./callbacks/PostBombInitLate";
import { PostBoneSwing } from "./callbacks/PostBoneSwing";
import { PostCollectibleEmpty } from "./callbacks/PostCollectibleEmpty";
import { PostCollectibleInitFirst } from "./callbacks/PostCollectibleInitFirst";
import { PostCursedTeleport } from "./callbacks/PostCursedTeleport";
import { PostCustomRevive } from "./callbacks/PostCustomRevive";
import { PostDiceRoomActivated } from "./callbacks/PostDiceRoomActivated";
import { PostDoorRender } from "./callbacks/PostDoorRender";
import { PostDoorUpdate } from "./callbacks/PostDoorUpdate";
import { PostEffectInitLate } from "./callbacks/PostEffectInitLate";
import { PostEffectStateChanged } from "./callbacks/PostEffectStateChanged";
import { PostEsauJr } from "./callbacks/PostEsauJr";
import { PostFamiliarInitLate } from "./callbacks/PostFamiliarInitLate";
import { PostFamiliarStateChanged } from "./callbacks/PostFamiliarStateChanged";
import { PostFirstEsauJr } from "./callbacks/PostFirstEsauJr";
import { PostFirstFlip } from "./callbacks/PostFirstFlip";
import { PostFlip } from "./callbacks/PostFlip";
import { PostGameStartedReordered } from "./callbacks/PostGameStartedReordered";
import { PostGameStartedReorderedLast } from "./callbacks/PostGameStartedReorderedLast";
import { PostGreedModeWave } from "./callbacks/PostGreedModeWave";
import { PostGridEntityBroken } from "./callbacks/PostGridEntityBroken";
import { PostGridEntityCollision } from "./callbacks/PostGridEntityCollision";
import { PostGridEntityCustomBroken } from "./callbacks/PostGridEntityCustomBroken";
import { PostGridEntityCustomCollision } from "./callbacks/PostGridEntityCustomCollision";
import { PostGridEntityCustomInit } from "./callbacks/PostGridEntityCustomInit";
import { PostGridEntityCustomRemove } from "./callbacks/PostGridEntityCustomRemove";
import { PostGridEntityCustomStateChanged } from "./callbacks/PostGridEntityCustomStateChanged";
import { PostGridEntityCustomUpdate } from "./callbacks/PostGridEntityCustomUpdate";
import { PostGridEntityInit } from "./callbacks/PostGridEntityInit";
import { PostGridEntityRemove } from "./callbacks/PostGridEntityRemove";
import { PostGridEntityStateChanged } from "./callbacks/PostGridEntityStateChanged";
import { PostGridEntityUpdate } from "./callbacks/PostGridEntityUpdate";
import { PostHolyMantleRemoved } from "./callbacks/PostHolyMantleRemoved";
import { PostKnifeInitLate } from "./callbacks/PostKnifeInitLate";
import { PostNewLevelReordered } from "./callbacks/PostNewLevelReordered";
import { PostNewRoomEarly } from "./callbacks/PostNewRoomEarly";
import { PostNewRoomReordered } from "./callbacks/PostNewRoomReordered";
import { PostPEffectUpdateReordered } from "./callbacks/PostPEffectUpdateReordered";
import { PostPitRender } from "./callbacks/PostPitRender";
import { PostPlayerFatalDamage } from "./callbacks/PostPlayerFatalDamage";
import { PostPlayerRenderReordered } from "./callbacks/PostPlayerRenderReordered";
import { PostPlayerUpdateReordered } from "./callbacks/PostPlayerUpdateReordered";
import { PostRoomClearChanged } from "./callbacks/PostRoomClearChanged";
import { PostSpikesRender } from "./callbacks/PostSpikesRender";
import { PreBerserkDeath } from "./callbacks/PreBerserkDeath";
import { PreCustomRevive } from "./callbacks/PreCustomRevive";
import { CustomGridEntities } from "./features/callbackLogic/CustomGridEntities";
import { CustomRevive } from "./features/callbackLogic/CustomRevive";
import { EsauJrDetection } from "./features/callbackLogic/EsauJrDetection";
import { FlipDetection } from "./features/callbackLogic/FlipDetection";
import { GameReorderedCallbacks } from "./features/callbackLogic/GameReorderedCallbacks";
import { GridEntityCollisionDetection } from "./features/callbackLogic/GridEntityCollisionDetection";
import { GridEntityDetection } from "./features/callbackLogic/GridEntityDetection";
import { PlayerReorderedCallbacks } from "./features/callbackLogic/PlayerReorderedCallbacks";
import { RunInNFrames } from "./features/other/RunInNFrames";
import { CustomCallback } from "./private/CustomCallback";
import { Feature } from "./private/Feature";

/**
 * `isaacscript-common` has many custom callbacks that you can use in your mods. Instead of
 * hijacking the vanilla `Mod` object, we provide a `ModUpgraded` object for you to use, which
 * extends the base class and adds a new method of `AddCallbackCustom`.
 *
 * To upgrade your mod, use the `upgradeMod` helper function.
 */
export class ModUpgraded implements Mod {
  // -----------------
  // Vanilla variables
  // -----------------

  /**
   * The vanilla mod object stores the name of the mod for some reason. (It is never used or
   * referenced. (We match the casing of the vanilla variable.)
   */
  Name: string;

  // ----------------
  // Custom variables
  // ----------------

  /** We store a copy of the original mod object so that we can re-implement its functions. */
  private mod: Mod;

  private debug: boolean;
  private timeThreshold: float | undefined;

  private callbacks: {
    readonly [key in ModCallbackCustom2]: CustomCallback<key>;
  } = {
    [ModCallbackCustom2.POST_AMBUSH_FINISHED]: new PostAmbushFinished(),
    [ModCallbackCustom2.POST_AMBUSH_STARTED]: new PostAmbushStarted(),
    [ModCallbackCustom2.POST_BOMB_EXPLODED]: new PostBombExploded(),
    [ModCallbackCustom2.POST_BOMB_INIT_LATE]: new PostBombInitLate(),
    [ModCallbackCustom2.POST_BONE_SWING]: new PostBoneSwing(),
    [ModCallbackCustom2.POST_COLLECTIBLE_EMPTY]: new PostCollectibleEmpty(),
    [ModCallbackCustom2.POST_COLLECTIBLE_INIT_FIRST]:
      new PostCollectibleInitFirst(),
    [ModCallbackCustom2.POST_CURSED_TELEPORT]: new PostCursedTeleport(),
    [ModCallbackCustom2.POST_CUSTOM_REVIVE]: new PostCustomRevive(),
    [ModCallbackCustom2.POST_DICE_ROOM_ACTIVATED]: new PostDiceRoomActivated(),
    [ModCallbackCustom2.POST_DOOR_RENDER]: new PostDoorRender(),
    [ModCallbackCustom2.POST_DOOR_UPDATE]: new PostDoorUpdate(),
    [ModCallbackCustom2.POST_EFFECT_INIT_LATE]: new PostEffectInitLate(),
    [ModCallbackCustom2.POST_EFFECT_STATE_CHANGED]:
      new PostEffectStateChanged(),
    [ModCallbackCustom2.POST_ESAU_JR]: new PostEsauJr(),
    [ModCallbackCustom2.POST_FAMILIAR_INIT_LATE]: new PostFamiliarInitLate(),
    [ModCallbackCustom2.POST_FAMILIAR_STATE_CHANGED]:
      new PostFamiliarStateChanged(),
    [ModCallbackCustom2.POST_FIRST_FLIP]: new PostFirstFlip(),
    [ModCallbackCustom2.POST_FIRST_ESAU_JR]: new PostFirstEsauJr(),
    [ModCallbackCustom2.POST_FLIP]: new PostFlip(),
    [ModCallbackCustom2.POST_GAME_STARTED_REORDERED]:
      new PostGameStartedReordered(),
    [ModCallbackCustom2.POST_GAME_STARTED_REORDERED_LAST]:
      new PostGameStartedReorderedLast(),
    [ModCallbackCustom2.POST_GREED_MODE_WAVE]: new PostGreedModeWave(),
    [ModCallbackCustom2.POST_GRID_ENTITY_BROKEN]: new PostGridEntityBroken(),
    [ModCallbackCustom2.POST_GRID_ENTITY_COLLISION]:
      new PostGridEntityCollision(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_BROKEN]:
      new PostGridEntityCustomBroken(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_COLLISION]:
      new PostGridEntityCustomCollision(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_INIT]:
      new PostGridEntityCustomInit(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_REMOVE]:
      new PostGridEntityCustomRemove(),
    // [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_RENDER]: new PostGridEntityCustomRender(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED]:
      new PostGridEntityCustomStateChanged(),
    [ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_UPDATE]:
      new PostGridEntityCustomUpdate(),
    [ModCallbackCustom2.POST_GRID_ENTITY_INIT]: new PostGridEntityInit(),
    [ModCallbackCustom2.POST_GRID_ENTITY_REMOVE]: new PostGridEntityRemove(),
    // [ModCallbackCustom2.POST_GRID_ENTITY_RENDER]: new PostGridEntityRender(),
    [ModCallbackCustom2.POST_GRID_ENTITY_STATE_CHANGED]:
      new PostGridEntityStateChanged(),
    [ModCallbackCustom2.POST_GRID_ENTITY_UPDATE]: new PostGridEntityUpdate(),
    [ModCallbackCustom2.POST_HOLY_MANTLE_REMOVED]: new PostHolyMantleRemoved(),

    // ----------------

    [ModCallbackCustom2.POST_KNIFE_INIT_LATE]: new PostKnifeInitLate(),
    [ModCallbackCustom2.POST_NEW_LEVEL_REORDERED]: new PostNewLevelReordered(),
    [ModCallbackCustom2.POST_NEW_ROOM_EARLY]: new PostNewRoomEarly(),
    [ModCallbackCustom2.POST_NEW_ROOM_REORDERED]: new PostNewRoomReordered(),
    [ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED]:
      new PostPEffectUpdateReordered(),
    [ModCallbackCustom2.POST_PIT_RENDER]: new PostPitRender(),
    [ModCallbackCustom2.POST_PLAYER_FATAL_DAMAGE]: new PostPlayerFatalDamage(),
    [ModCallbackCustom2.POST_PLAYER_RENDER_REORDERED]:
      new PostPlayerRenderReordered(),
    [ModCallbackCustom2.POST_PLAYER_UPDATE_REORDERED]:
      new PostPlayerUpdateReordered(),
    [ModCallbackCustom2.POST_ROOM_CLEAR_CHANGED]: new PostRoomClearChanged(),
    [ModCallbackCustom2.POST_SPIKES_RENDER]: new PostSpikesRender(),
    [ModCallbackCustom2.PRE_BERSERK_DEATH]: new PreBerserkDeath(),
    [ModCallbackCustom2.PRE_CUSTOM_REVIVE]: new PreCustomRevive(),
  } as const;

  // Features must be marked as internal to prevent TypeDoc from complaining.
  /** @internal */
  private features;

  // -----------
  // Constructor
  // -----------

  constructor(mod: Mod, debug: boolean, timeThreshold?: float) {
    this.Name = mod.Name;
    this.mod = mod;
    this.debug = debug;
    this.timeThreshold = timeThreshold;

    // Next, we initialize the extra features that the upgraded mod provides. Some features rely on
    // other features; we must initialize those first.
    const runInNFrames = new RunInNFrames();
    const customGridEntities = new CustomGridEntities(runInNFrames);

    this.features = newObjectWithEnumKeys(IsaacScriptCommonFeature, {
      // Callback logic
      [IsaacScriptCommonFeature.CUSTOM_REVIVE]: new CustomRevive(
        this.callbacks[ModCallbackCustom2.PRE_CUSTOM_REVIVE],
        this.callbacks[ModCallbackCustom2.POST_CUSTOM_REVIVE],
      ),
      [IsaacScriptCommonFeature.ESAU_JR_DETECTION]: new EsauJrDetection(
        this.callbacks[ModCallbackCustom2.POST_ESAU_JR],
        this.callbacks[ModCallbackCustom2.POST_FIRST_ESAU_JR],
      ),
      [IsaacScriptCommonFeature.FLIP_DETECTION]: new FlipDetection(
        this.callbacks[ModCallbackCustom2.POST_FLIP],
        this.callbacks[ModCallbackCustom2.POST_FIRST_FLIP],
      ),
      [IsaacScriptCommonFeature.GRID_ENTITY_COLLISION_DETECTION]:
        new GridEntityCollisionDetection(
          this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_COLLISION],
          this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_COLLISION],
          customGridEntities,
        ),
      [IsaacScriptCommonFeature.GRID_ENTITY_DETECTION]: new GridEntityDetection(
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_INIT],
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_INIT],
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_UPDATE],
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_UPDATE],
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_REMOVE],
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_REMOVE],
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_STATE_CHANGED],
        this.callbacks[
          ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_STATE_CHANGED
        ],
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_BROKEN],
        this.callbacks[ModCallbackCustom2.POST_GRID_ENTITY_CUSTOM_BROKEN],
        customGridEntities,
      ),
      [IsaacScriptCommonFeature.GAME_REORDERED_CALLBACKS]:
        new GameReorderedCallbacks(
          this.callbacks[ModCallbackCustom2.POST_GAME_STARTED_REORDERED],
          this.callbacks[ModCallbackCustom2.POST_NEW_LEVEL_REORDERED],
          this.callbacks[ModCallbackCustom2.POST_NEW_ROOM_REORDERED],
          this.callbacks[ModCallbackCustom2.POST_GAME_STARTED_REORDERED_LAST],
        ),
      [IsaacScriptCommonFeature.PLAYER_REORDERED_CALLBACKS]:
        new PlayerReorderedCallbacks(
          this.callbacks[ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED],
          this.callbacks[ModCallbackCustom2.POST_PLAYER_RENDER_REORDERED],
          this.callbacks[ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED],
        ),

      // Extra features
      [IsaacScriptCommonFeature.CUSTOM_GRID_ENTITIES]: customGridEntities,
      [IsaacScriptCommonFeature.RUN_IN_N_FRAMES]: runInNFrames,
    } as const);
  }

  // ---------------
  // Vanilla methods
  // ---------------

  AddCallback<T extends ModCallback>(
    modCallback: T,
    ...args: AddCallbackParameters[T]
  ): void {
    if (this.debug) {
      const callback = args[0];
      const optionalArg = args[1];

      const parentFunctionDescription = getParentFunctionDescription();
      const callbackName = `ModCallback.${ModCallback[modCallback]}`;
      const signature =
        parentFunctionDescription === undefined
          ? callbackName
          : `${parentFunctionDescription} - ${callbackName}`;

      /**
       * We don't use the "log" helper function here since it will always show the same "unknown"
       * prefix.
       */
      const callbackWithLogger: typeof callback = (
        ...callbackArgs: Parameters<typeof callback>
      ) => {
        const startTime = getTime();
        Isaac.DebugString(`${signature} - START`);

        // @ts-expect-error The compiler is not smart enough to know that the callback args should
        // match the callback.
        const returnValue = callback(...callbackArgs);

        const endTime = getTime();
        const elapsedTime = endTime - startTime;
        if (
          this.timeThreshold === undefined ||
          this.timeThreshold <= elapsedTime
        ) {
          Isaac.DebugString(`${signature} - END - time: ${elapsedTime}`);
        } else {
          Isaac.DebugString(`${signature} - END`);
        }

        return returnValue;
      };

      const newArgs = [
        callbackWithLogger,
        optionalArg,
      ] as unknown as AddCallbackParameters[T];
      this.mod.AddCallback(modCallback, ...newArgs);
    } else {
      this.mod.AddCallback(modCallback, ...args);
    }
  }

  HasData(): boolean {
    return this.mod.HasData();
  }

  LoadData(): string {
    return this.mod.LoadData();
  }

  /**
   * This method does not care about the tertiary argument. Regardless of the conditions of how you
   * registered the callback, it will be removed.
   */
  RemoveCallback<T extends ModCallback>(
    modCallback: T,
    callback: AddCallbackParameters[T][0],
  ): void {
    this.mod.RemoveCallback(modCallback, callback);
  }

  RemoveData(): void {
    this.mod.RemoveData();
  }

  SaveData(data: string): void {
    this.mod.SaveData(data);
  }

  // ---------------------
  // Custom public methods
  // ---------------------

  // eslint-disable-next-line class-methods-use-this
  AddCallbackCustom<T extends ModCallbackCustom>(
    modCallbackCustom: T,
    ...args: AddCallbackParametersCustom[T]
  ): void {
    const callbackRegisterFunction =
      CALLBACK_REGISTER_FUNCTIONS[modCallbackCustom];
    callbackRegisterFunction(...args);
  }

  /** Add a callback in the new callback system format. This method is only temporary. */
  AddCallbackCustom2<T extends ModCallbackCustom2>(
    modCallbackCustom: T,
    ...args: AddCallbackParametersCustom2[T]
  ): void {
    const callbackClass = this.callbacks[modCallbackCustom];
    this.initFeature(callbackClass);
    callbackClass.add(...args);
  }

  /**
   * This method does not care about the tertiary argument. Regardless of the conditions of how you
   * registered the callback, it will be removed.
   */
  RemoveCallbackCustom<T extends ModCallbackCustom2>(
    modCallback: T,
    callback: AddCallbackParametersCustom2[T][0],
  ): void {
    // TODO
    print(this, modCallback, callback);
  }

  forceNewLevelCallback(): void {
    const gameReorderedCallbacks =
      this.features[IsaacScriptCommonFeature.GAME_REORDERED_CALLBACKS];
    gameReorderedCallbacks.forceNewLevelCallback();
  }

  forceNewRoomCallback(): void {
    const gameReorderedCallbacks =
      this.features[IsaacScriptCommonFeature.GAME_REORDERED_CALLBACKS];
    gameReorderedCallbacks.forceNewRoomCallback();
  }

  reorderedCallbacksSetStage(stage: LevelStage, stageType: StageType): void {
    const gameReorderedCallbacks =
      this.features[IsaacScriptCommonFeature.GAME_REORDERED_CALLBACKS];
    gameReorderedCallbacks.reorderedCallbacksSetStage(stage, stageType);
  }

  // ----------------------
  // Custom private methods
  // ----------------------

  private initFeature(feature: Feature): void {
    if (feature.initialized) {
      return;
    }
    feature.initialized = true;

    if (feature.featuresUsed !== undefined) {
      for (const featureUsed of feature.featuresUsed) {
        const featureClass = this.features[featureUsed];
        this.initFeature(featureClass);
      }
    }

    if (feature.callbacksUsed !== undefined) {
      for (const callbackTuple of feature.callbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        this.AddCallback(modCallback, ...callbackArgs);
      }
    }

    if (feature.customCallbacksUsed !== undefined) {
      for (const callbackTuple of feature.customCallbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        this.AddCallbackCustom2(modCallback, ...callbackArgs);
      }
    }

    if (feature.v !== undefined) {
      const className = getTSTLClassName(feature);
      if (className === undefined) {
        error("Failed to get the name of a feature.");
      }
      saveDataManager(className, feature.v);
    }
  }

  private uninitFeature(feature: Feature): void {
    if (!feature.initialized) {
      return;
    }
    feature.initialized = false;

    if (feature.featuresUsed !== undefined) {
      for (const featureUsed of feature.featuresUsed) {
        const featureClass = this.features[featureUsed];
        this.uninitFeature(featureClass);
      }
    }

    if (feature.callbacksUsed !== undefined) {
      for (const callbackTuple of feature.callbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        const callback = callbackArgs[0];
        this.RemoveCallback(modCallback, callback);
      }
    }

    if (feature.customCallbacksUsed !== undefined) {
      for (const callbackTuple of feature.customCallbacksUsed) {
        const [modCallback, callbackArgs] = callbackTuple;
        const callback = callbackArgs[0];
        this.RemoveCallbackCustom(modCallback, callback);
      }
    }

    if (feature.v !== undefined) {
      const className = getTSTLClassName(feature);
      if (className === undefined) {
        error("Failed to get the name of a feature.");
      }
      saveDataManagerRemove(className);
    }
  }
}
