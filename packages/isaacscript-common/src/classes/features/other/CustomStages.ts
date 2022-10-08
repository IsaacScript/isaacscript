import {
  ControllerIndex,
  DoorSlot,
  DoorSlotFlag,
  GridEntityType,
  LevelCurse,
  LevelStage,
  ModCallback,
  RoomShape,
  RoomType,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import * as metadataJSON from "../../../customStageMetadata.json"; // This will correspond to "customStageMetadata.lua" at run-time.
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { isArray } from "../../../functions/array";
import { doorSlotFlagsToDoorSlots } from "../../../functions/doors";
import { hasFlag, removeFlag } from "../../../functions/flag";
import { logError } from "../../../functions/logMisc";
import { newRNG } from "../../../functions/rng";
import { removeUrnRewards } from "../../../functions/rockAlt";
import {
  getRoomDataForTypeVariant,
  getRoomsInsideGrid,
} from "../../../functions/rooms";
import { setStage } from "../../../functions/stage";
import { asNumber } from "../../../functions/types";
import {
  CustomStageLua,
  CustomStageRoomMetadata,
} from "../../../interfaces/CustomStageTSConfig";
import {
  CustomStage,
  RoomTypeMap,
} from "../../../interfaces/private/CustomStage";
import { Feature } from "../../private/Feature";
import { CustomGridEntities } from "../callbackLogic/CustomGridEntities";
import { GameReorderedCallbacks } from "../callbackLogic/GameReorderedCallbacks";
import { setCustomStageBackdrop } from "./customStages/backdrop";
import {
  CUSTOM_FLOOR_STAGE,
  CUSTOM_FLOOR_STAGE_TYPE,
  DEFAULT_BASE_STAGE,
  DEFAULT_BASE_STAGE_TYPE,
  UIStreakAnimation,
} from "./customStages/constants";
import {
  convertVanillaTrapdoors,
  setCustomDecorationGraphics,
  setCustomDoorGraphics,
  setCustomPitGraphics,
  setCustomRockGraphics,
} from "./customStages/gridEntities";
import { setShadows } from "./customStages/shadows";
import {
  streakTextGetShaderParams,
  streakTextPostRender,
  topStreakTextStart,
} from "./customStages/streakText";
import {
  getRandomBossRoomFromPool,
  getRandomCustomStageRoom,
} from "./customStages/utils";
import {
  playVersusScreenAnimation,
  versusScreenPostRender,
} from "./customStages/versusScreen";
import { CustomTrapdoors } from "./CustomTrapdoors";
import { DisableAllSound } from "./DisableAllSound";
import { Pause } from "./Pause";
import { RunInNFrames } from "./RunInNFrames";

export class CustomStages extends Feature {
  public override v = {
    run: {
      currentCustomStage: null as CustomStage | null,

      /** Whether we are on e.g. Caves 1 or Caves 2. */
      firstFloor: true,

      showingBossVersusScreen: false,

      /** Values are the render frame that the controller first pressed the map button. */
      controllerIndexPushingMapRenderFrame: new Map<ControllerIndex, int>(),

      topStreakTextStartedRenderFrame: null as int | null,

      topStreakText: {
        animation: UIStreakAnimation.NONE,
        frame: 0,
        pauseFrame: false,
      },

      bottomStreakText: {
        animation: UIStreakAnimation.NONE,
        frame: 0,
        pauseFrame: false,
      },
    },
  };

  /** Indexed by custom stage name. */
  private customStagesMap = new Map<string, CustomStage>();

  /** Indexed by room variant. */
  private customStageCachedRoomData = new Map<int, Readonly<RoomConfig>>();

  private customGridEntities: CustomGridEntities;
  private customTrapdoors: CustomTrapdoors;
  private disableAllSound: DisableAllSound;
  private gameReorderedCallbacks: GameReorderedCallbacks;
  private pause: Pause;
  private runInNFrames: RunInNFrames;

  constructor(
    customGridEntities: CustomGridEntities,
    customTrapdoors: CustomTrapdoors,
    disableAllSound: DisableAllSound,
    gameReorderedCallbacks: GameReorderedCallbacks,
    pause: Pause,
    runInNFrames: RunInNFrames,
  ) {
    super();

    this.featuresUsed = [
      ISCFeature.CUSTOM_GRID_ENTITIES,
      ISCFeature.CUSTOM_TRAPDOORS,
      ISCFeature.DISABLE_ALL_SOUND,
      ISCFeature.GAME_REORDERED_CALLBACKS,
      ISCFeature.PAUSE,
      ISCFeature.RUN_IN_N_FRAMES,
    ];

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
      [ModCallback.POST_CURSE_EVAL, [this.postCurseEval]], // 12
      [ModCallback.GET_SHADER_PARAMS, [this.getShaderParams]], // 21
    ];

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_GRID_ENTITY_BROKEN,
        [this.postGridEntityBrokenRockAlt, GridEntityType.ROCK_ALT],
      ],
      [ModCallbackCustom.POST_GRID_ENTITY_INIT, [this.postGridEntityInit]],
      [ModCallbackCustom.POST_NEW_ROOM_REORDERED, [this.postNewRoomReordered]],
    ];

    this.customGridEntities = customGridEntities;
    this.customTrapdoors = customTrapdoors;
    this.disableAllSound = disableAllSound;
    this.gameReorderedCallbacks = gameReorderedCallbacks;
    this.pause = pause;
    this.runInNFrames = runInNFrames;

    this.initCustomStageMetadata();
  }

  private initCustomStageMetadata() {
    if (!isArray(metadataJSON)) {
      error(
        'The IsaacScript standard library attempted to read the custom stage metadata from the "customStageMetadata.lua" file, but it was not an array.',
      );
    }
    const customStagesLua = metadataJSON as CustomStageLua[];

    for (const customStageLua of customStagesLua) {
      this.initRoomTypeMap(customStageLua);
      this.initCustomTrapdoorDestination(customStageLua);
    }
  }

  private initRoomTypeMap(customStageLua: CustomStageLua) {
    const roomTypeMap = getRoomTypeMap(customStageLua);
    const customStage: CustomStage = {
      ...customStageLua,
      roomTypeMap,
    };
    this.customStagesMap.set(customStage.name, customStage);
  }

  private initCustomTrapdoorDestination(customStageLua: CustomStageLua) {
    this.customTrapdoors.registerCustomTrapdoorDestination(
      customStageLua.name,
      this.goToCustomStage,
    );
  }

  private goToCustomStage = (
    destinationStage: LevelStage,
    _destinationStageType: StageType,
  ) => {
    const firstFloor = destinationStage === LevelStage.BASEMENT_1;
    this.setCustomStage("Slaughterhouse", firstFloor);
  };

  // ModCallback.POST_RENDER (2)
  private postRender = () => {
    const customStage = this.v.run.currentCustomStage;
    if (customStage === null) {
      return;
    }

    streakTextPostRender(this.v);
    versusScreenPostRender(this.v, this.pause, this.disableAllSound);
  };

  // ModCallback.POST_CURSE_EVAL (12)
  private postCurseEval = (
    curses: BitFlags<LevelCurse>,
  ): BitFlags<LevelCurse> | undefined => {
    const customStage = this.v.run.currentCustomStage;
    if (customStage === null) {
      return undefined;
    }

    // Prevent XL floors on custom stages, since the streak text will not work properly.
    if (hasFlag(curses, LevelCurse.LABYRINTH)) {
      return removeFlag(curses, LevelCurse.LABYRINTH);
    }

    return undefined;
  };

  // ModCallback.GET_SHADER_PARAMS (22)
  private getShaderParams = (
    shaderName: string,
  ): Record<string, unknown> | undefined => {
    const customStage = this.v.run.currentCustomStage;
    if (customStage === null) {
      return;
    }

    streakTextGetShaderParams(this.v, customStage, shaderName);
    return undefined;
  };

  // ModCallbackCustom.POST_GRID_ENTITY_BROKEN
  // GridEntityType.ROCK_ALT
  private postGridEntityBrokenRockAlt = (gridEntity: GridEntity) => {
    const customStage = this.v.run.currentCustomStage;
    if (customStage === null) {
      return;
    }

    // Assume that if the end-user does not have custom rock graphics specified, they want to keep
    // the vanilla urn reward functionality.
    if (customStage.rocksPNGPath === undefined) {
      return;
    }

    // On the bugged stage of -1, only urns will spawn, so we do not have to handle the case of
    // mushroom rewards, skull rewards, and so on.
    removeUrnRewards(gridEntity);
  };

  // ModCallbackCustom.POST_GRID_ENTITY_INIT
  private postGridEntityInit = (gridEntity: GridEntity) => {
    const customStage = this.v.run.currentCustomStage;
    if (customStage === null) {
      return;
    }

    // We only want to modify vanilla grid entities.
    if (this.customGridEntities.isCustomGridEntity(gridEntity)) {
      return;
    }

    setCustomDecorationGraphics(customStage, gridEntity);
    setCustomRockGraphics(customStage, gridEntity);
    setCustomPitGraphics(customStage, gridEntity);
    setCustomDoorGraphics(customStage, gridEntity);
    convertVanillaTrapdoors(
      customStage,
      gridEntity,
      this.v.run.firstFloor,
      this.customTrapdoors,
    );
  };

  // ModCallbackCustom.POST_NEW_ROOM_REORDERED
  private postNewRoomReordered = () => {
    const customStage = this.v.run.currentCustomStage;
    if (customStage === null) {
      return;
    }

    setCustomStageBackdrop(customStage);
    setShadows(customStage);
    playVersusScreenAnimation(
      this.v,
      customStage,
      this.disableAllSound,
      this.pause,
      this.runInNFrames,
    );
  };

  /** Pick a custom room for each vanilla room. */
  private setStageRoomsData(
    customStage: CustomStage,
    rng: RNG,
    verbose: boolean,
  ) {
    const level = game.GetLevel();
    const startingRoomGridIndex = level.GetStartingRoomIndex();

    for (const room of getRoomsInsideGrid()) {
      // The starting floor of each room should stay empty.
      if (room.SafeGridIndex === startingRoomGridIndex) {
        continue;
      }

      if (room.Data === undefined) {
        continue;
      }

      const roomType = room.Data.Type;
      const roomShapeMap = customStage.roomTypeMap.get(roomType);
      if (roomShapeMap === undefined) {
        // Only show errors for non-default room types. (We do not require that end-users provide
        // custom rooms for shops and other special rooms inside of their XML file.)
        if (roomType === RoomType.DEFAULT) {
          logError(
            `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) for custom stage: ${customStage.name}`,
          );
        }
        continue;
      }

      const roomShape = room.Data.Shape;
      const roomDoorSlotFlagMap = roomShapeMap.get(roomShape);
      if (roomDoorSlotFlagMap === undefined) {
        logError(
          `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) + RoomShape.${RoomShape[roomShape]} (${roomShape}) for custom stage: ${customStage.name}`,
        );
        continue;
      }

      const doorSlotFlags = room.Data.Doors;
      const roomsMetadata = roomDoorSlotFlagMap.get(doorSlotFlags);
      if (roomsMetadata === undefined) {
        logError(
          `Failed to find any custom rooms for RoomType.${RoomType[roomType]} (${roomType}) + RoomShape.${RoomShape[roomShape]} (${roomShape}) + DoorSlotFlags ${doorSlotFlags} for custom stage: ${customStage.name}`,
        );

        const header = `For reference, a DoorSlotFlags of ${doorSlotFlags} is equal to the following doors being enabled:\n`;
        const doorSlots = doorSlotFlagsToDoorSlots(doorSlotFlags);
        const doorSlotLines = doorSlots.map(
          (doorSlot) => `- DoorSlot.${DoorSlot[doorSlot]} (${doorSlot})`,
        );
        const explanation = header + doorSlotLines.join("\n");
        logError(explanation);
        continue;
      }

      let randomRoom: CustomStageRoomMetadata;
      if (roomType === RoomType.BOSS) {
        if (customStage.bossPool === undefined) {
          continue;
        }

        randomRoom = getRandomBossRoomFromPool(
          roomsMetadata,
          customStage.bossPool,
          rng,
          verbose,
        );
      } else {
        randomRoom = getRandomCustomStageRoom(roomsMetadata, rng, verbose);
      }

      let newRoomData = this.customStageCachedRoomData.get(randomRoom.variant);
      if (newRoomData === undefined) {
        // We do not already have the room data for this room cached.
        newRoomData = getRoomDataForTypeVariant(
          roomType,
          randomRoom.variant,
          false,
        );
        if (newRoomData === undefined) {
          logError(
            `Failed to get the room data for room variant ${randomRoom.variant} for custom stage: ${customStage.name}`,
          );
          continue;
        }

        this.customStageCachedRoomData.set(randomRoom.variant, newRoomData);
      }

      room.Data = newRoomData;
    }
  }

  /**
   * Helper function to warp to a custom stage/level.
   *
   * Custom stages/levels must first be defined in the "tsconfig.json" file. See the documentation
   * for
   * more details: https://isaacscript.github.io/main/custom-stages/
   *
   * @param name The name of the custom stage, corresponding to what is in the "tsconfig.json" file.
   * @param firstFloor Optional. Whether to go to the first floor or the second floor. For example,
   *                   if you have a custom stage emulating Caves, then the first floor would be
   *                   Caves 1, and the second floor would be Caves 2. Default is true.
   * @param streakText Optional. Whether to show the streak text at the top of the screen that
   *                   announces the name of the level. Default is true.
   * @param verbose Optional. Whether to log additional information about the rooms that are chosen.
   *                Default is false.
   */
  @Exported
  public setCustomStage(
    name: string,
    firstFloor = true,
    streakText = true,
    verbose = false,
  ): void {
    const customStage = this.customStagesMap.get(name);
    if (customStage === undefined) {
      error(
        `Failed to set the custom stage of "${name}" because it was not found in the custom stages map. (Try restarting IsaacScript / recompiling the mod / restarting the game, and try again. If that does not work, you probably forgot to define it in your "tsconfig.json" file.) See the website for more details on how to set up custom stages.`,
      );
    }

    const level = game.GetLevel();
    const stage = level.GetStage();
    const seeds = game.GetSeeds();
    const startSeed = seeds.GetStartSeed();
    const rng = newRNG(startSeed);

    this.v.run.currentCustomStage = customStage;
    this.v.run.firstFloor = firstFloor;

    // Before changing the stage, we have to revert the bugged stage, if necessary. This prevents
    // the bug where the backdrop will not spawn.
    if (stage === CUSTOM_FLOOR_STAGE) {
      level.SetStage(LevelStage.BASEMENT_1, StageType.ORIGINAL);
    }

    let baseStage =
      customStage.baseStage === undefined
        ? DEFAULT_BASE_STAGE
        : customStage.baseStage;
    if (!firstFloor) {
      baseStage++;
    }

    const baseStageType =
      customStage.baseStageType === undefined
        ? DEFAULT_BASE_STAGE_TYPE
        : customStage.baseStageType;

    const reseed = asNumber(stage) >= baseStage;

    setStage(baseStage as LevelStage, baseStageType as StageType, reseed);

    this.setStageRoomsData(customStage, rng, verbose);

    // Set the stage to an invalid value, which will prevent the walls and floors from loading.
    const targetStage = CUSTOM_FLOOR_STAGE;
    const targetStageType = CUSTOM_FLOOR_STAGE_TYPE;
    level.SetStage(targetStage, targetStageType);
    this.gameReorderedCallbacks.reorderedCallbacksSetStage(
      targetStage,
      targetStageType,
    );

    // In vanilla, the streak text appears about when the pixelation has faded and while Isaac is
    // still laying on the ground. Unfortunately, we cannot exactly replicate the vanilla timing,
    // because the level text will bug out and smear the background if we play it from a
    // `POST_RENDER` callback. Thus, we run it on the next game frame as a workaround.
    if (streakText) {
      this.runInNFrames.runNextGameFrame(() => {
        topStreakTextStart(this.v);
      });
    }

    // We must reload the current room in order for the `Level.SetStage` method to take effect.
    // Furthermore, we need to cancel the queued warp to the `GridRoom.DEBUG` room. We can
    // accomplish both of these things by initiating a room transition to an arbitrary room.
    // However, we rely on the parent function to do this, since for normal purposes, we need to
    // initiate a room transition for the pixelation effect.
  }

  /**
   * Helper function to disable the custom stage. This is typically called before taking the player
   * to a vanilla floor.
   */
  @Exported
  public disableCustomStage(): void {
    this.v.run.currentCustomStage = null;
  }
}

function getRoomTypeMap(customStageLua: CustomStageLua): RoomTypeMap {
  const roomTypeMap = new Map<
    RoomType,
    Map<RoomShape, Map<DoorSlotFlag, CustomStageRoomMetadata[]>>
  >();

  for (const roomMetadata of customStageLua.roomsMetadata) {
    const roomType = roomMetadata.type as RoomType;

    let roomShapeMap = roomTypeMap.get(roomType);
    if (roomShapeMap === undefined) {
      roomShapeMap = new Map<
        RoomShape,
        Map<DoorSlotFlag, CustomStageRoomMetadata[]>
      >();
      roomTypeMap.set(roomType, roomShapeMap);
    }

    const roomShape = roomMetadata.shape as RoomShape;

    let roomDoorSlotFlagMap = roomShapeMap.get(roomShape);
    if (roomDoorSlotFlagMap === undefined) {
      roomDoorSlotFlagMap = new Map<
        BitFlags<DoorSlotFlag>,
        CustomStageRoomMetadata[]
      >();
      roomShapeMap.set(roomShape, roomDoorSlotFlagMap);
    }

    const doorSlotFlags = roomMetadata.doorSlotFlags as BitFlags<DoorSlotFlag>;
    let rooms = roomDoorSlotFlagMap.get(doorSlotFlags);
    if (rooms === undefined) {
      rooms = [];
      roomDoorSlotFlagMap.set(doorSlotFlags, rooms);
    }

    rooms.push(roomMetadata);
  }

  return roomTypeMap;
}
