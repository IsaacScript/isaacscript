import {
  ButtonAction,
  Direction,
  EntityCollisionClass,
  EntityGridCollisionClass,
  EntityPartition,
  GridCollisionClass,
  LevelStage,
  ModCallback,
  PlayerType,
  RoomTransitionAnim,
  RoomType,
  StageType,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { VectorZero } from "../../../core/constants";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { GridEntityTypeCustom } from "../../../enums/private/GridEntityTypeCustom";
import { StageTravelState } from "../../../enums/private/StageTravelState";
import { TrapdoorAnimation } from "../../../enums/private/TrapdoorAnimation";
import { easeOutSine } from "../../../functions/easing";
import {
  isAfterRoomFrame,
  isBeforeRenderFrame,
  onOrAfterRenderFrame,
} from "../../../functions/frames";
import { log } from "../../../functions/log";
import { movePlayersToCenter } from "../../../functions/playerCenter";
import {
  getAllPlayers,
  getOtherPlayers,
  isChildPlayer,
} from "../../../functions/playerIndex";
import { isCharacter } from "../../../functions/players";
import { anyPlayerCloserThan } from "../../../functions/positionVelocity";
import {
  getRoomGridIndex,
  getRoomListIndex,
} from "../../../functions/roomData";
import { teleport } from "../../../functions/roomTransition";
import { setStage } from "../../../functions/stage";
import { getTSTLClassName } from "../../../functions/tstlClass";
import { assertDefined } from "../../../functions/utils";
import { isVector } from "../../../functions/vector";
import type { CustomTrapdoorDescription } from "../../../interfaces/private/CustomTrapdoorDescription";
import { ReadonlySet } from "../../../types/ReadonlySet";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";
import type { CustomGridEntities } from "../callbackLogic/CustomGridEntities";
import type { DisableInputs } from "./DisableInputs";
import type { PonyDetection } from "./PonyDetection";
import type { RoomClearFrame } from "./RoomClearFrame";
import type { RunInNFrames } from "./RunInNFrames";
import type { RunNextRoom } from "./RunNextRoom";
import type { StageHistory } from "./StageHistory";
import { CUSTOM_FLOOR_STAGE } from "./customStages/constants";

const DEBUG = false as boolean;

/** This also applies to crawl spaces. The value was determined through trial and error. */
const TRAPDOOR_OPEN_DISTANCE = 60;

const TRAPDOOR_OPEN_DISTANCE_AFTER_BOSS = TRAPDOOR_OPEN_DISTANCE * 2.5;
const TRAPDOOR_BOSS_REACTION_FRAMES = 30;

const TRAPDOOR_TOUCH_DISTANCE = 16.5;

const ANIMATIONS_THAT_PREVENT_STAGE_TRAVEL = new ReadonlySet<string>([
  "Death",
  "Happy",
  "Sad",
  "Jump",
]);

const PIXELATION_TO_BLACK_FRAMES = 60;

const OTHER_PLAYER_TRAPDOOR_JUMP_DELAY_GAME_FRAMES = 6;
const OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES = 5;

const v = {
  run: {
    state: StageTravelState.NONE,

    /** The render frame that this state was reached. */
    stateRenderFrame: null as int | null,

    customTrapdoorActivated: null as CustomTrapdoorDescription | null,
  },

  level: {
    /** Indexed by room list index and grid index. */
    trapdoors: new DefaultMap<int, Map<int, CustomTrapdoorDescription>>(
      () => new Map(),
    ),
  },
};

export class CustomTrapdoors extends Feature {
  /** Indexed by custom trapdoor ID. */
  private readonly destinationFuncMap = new Map<
    string,
    (
      destinationName: string | undefined,
      destinationStage: LevelStage,
      destinationStageType: StageType,
    ) => void
  >();

  /** @internal */
  public override v = v;

  /**
   * In order to represent a black sprite, we just use the first frame of the boss versus screen
   * animation. However, we must lazy load the sprite in order to prevent issues with mods that
   * replace the vanilla files. (For some reason, loading the sprites will cause the overwrite to no
   * longer apply on the second and subsequent runs.)
   */
  private readonly blackSprite = Sprite();

  private readonly customGridEntities: CustomGridEntities;
  private readonly disableInputs: DisableInputs;
  private readonly ponyDetection: PonyDetection;
  private readonly roomClearFrame: RoomClearFrame;
  private readonly runInNFrames: RunInNFrames;
  private readonly runNextRoom: RunNextRoom;
  private readonly stageHistory: StageHistory;

  /** @internal */
  constructor(
    customGridEntities: CustomGridEntities,
    disableInputs: DisableInputs,
    ponyDetection: PonyDetection,
    roomClearFrame: RoomClearFrame,
    runInNFrames: RunInNFrames,
    runNextRoom: RunNextRoom,
    stageHistory: StageHistory,
  ) {
    super();

    this.featuresUsed = [
      ISCFeature.CUSTOM_GRID_ENTITIES,
      ISCFeature.DISABLE_INPUTS,
      ISCFeature.PONY_DETECTION,
      ISCFeature.ROOM_CLEAR_FRAME,
      ISCFeature.RUN_IN_N_FRAMES,
      ISCFeature.RUN_NEXT_ROOM,
      ISCFeature.STAGE_HISTORY,
    ];

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE,
        this.postGridEntityCustomUpdateTrapdoor,
        [GridEntityTypeCustom.TRAPDOOR_CUSTOM],
      ],
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];

    this.customGridEntities = customGridEntities;
    this.disableInputs = disableInputs;
    this.ponyDetection = ponyDetection;
    this.roomClearFrame = roomClearFrame;
    this.runInNFrames = runInNFrames;
    this.runNextRoom = runNextRoom;
    this.stageHistory = stageHistory;
  }

  // ModCallback.POST_RENDER (2)
  private readonly postRender = () => {
    this.checkAllPlayersJumpComplete();
    this.checkPixelationToBlackComplete();
    this.checkSecondPixelationHalfWay();
    this.checkAllPlayersLayingDownComplete();
    this.drawBlackSprite();
  };

  private checkAllPlayersJumpComplete() {
    if (v.run.state !== StageTravelState.PLAYERS_JUMPING_DOWN) {
      return;
    }

    if (anyPlayerPlayingExtraAnimation()) {
      return;
    }

    const renderFrameCount = Isaac.GetFrameCount();
    const roomGridIndex = getRoomGridIndex();

    v.run.state = StageTravelState.PIXELATION_TO_BLACK;
    v.run.stateRenderFrame = renderFrameCount;
    this.logStateChanged();

    // In order to display the pixelation effect that should happen when we go to a new floor, we
    // need to start a room transition. We arbitrarily pick the current room for this purpose. (We
    // do not have to worry about Curse of the Maze here, because even if we are taken to a
    // different room, it will not matter, since we will be traveling to a new floor after the
    // screen fades to black.)
    teleport(
      roomGridIndex,
      Direction.NO_DIRECTION,
      RoomTransitionAnim.PIXELATION,
    );

    // Next, we wait a certain amount of render frames for the pixelation to fade the screen to
    // black.
  }

  private checkPixelationToBlackComplete() {
    if (
      v.run.state !== StageTravelState.PIXELATION_TO_BLACK ||
      v.run.stateRenderFrame === null
    ) {
      return;
    }

    const renderFrameScreenBlack =
      v.run.stateRenderFrame + PIXELATION_TO_BLACK_FRAMES;
    if (isBeforeRenderFrame(renderFrameScreenBlack)) {
      return;
    }

    v.run.state = StageTravelState.WAITING_FOR_FIRST_PIXELATION_TO_END;
    this.logStateChanged();

    // Now, we display a black sprite on top of the pixelation effect, to prevent showing the rest
    // of the animation.
    const hud = game.GetHUD();
    hud.SetVisible(false);

    // If the pixelation effect is not fully allowed to complete, the game's internal buffer will
    // not be flushed. The consequence of this is that after 11 custom stage transitions, the
    // "log.txt" starts to become become spammed with: [ASSERT] - PushRenderTarget: stack overflow!

    // In order to work around this, we fully let the animation complete by only continuing the
    // stage transition on the next game frame.
    this.runInNFrames.runNextGameFrame(() => {
      const level = game.GetLevel();
      const startingRoomIndex = level.GetStartingRoomIndex();
      const futureRenderFrameCount = Isaac.GetFrameCount();

      v.run.state =
        StageTravelState.WAITING_FOR_SECOND_PIXELATION_TO_GET_HALF_WAY;
      v.run.stateRenderFrame = futureRenderFrameCount;

      this.goToCustomTrapdoorDestination();

      // Start another pixelation effect. This time, we will keep the screen black with the sprite,
      // and then remove the black sprite once the pixelation effect is halfway complete.
      teleport(
        startingRoomIndex,
        Direction.NO_DIRECTION,
        RoomTransitionAnim.PIXELATION,
      );
    });
  }

  private goToCustomTrapdoorDestination() {
    // This should never be null. Regardless, we provide some sane default values.
    v.run.customTrapdoorActivated ??= {
      destinationName: undefined,
      destinationStage: LevelStage.BASEMENT_1,
      destinationStageType: StageType.ORIGINAL,
      open: true,
      firstSpawn: true,
    };

    const destinationFunc = this.getDestinationFunc(
      v.run.customTrapdoorActivated,
    );
    destinationFunc(
      v.run.customTrapdoorActivated.destinationName,
      v.run.customTrapdoorActivated.destinationStage,
      v.run.customTrapdoorActivated.destinationStageType,
    );
  }

  private getDestinationFunc(
    customTrapdoorDescription: CustomTrapdoorDescription,
  ): (
    destinationName: string | undefined,
    destinationStage: LevelStage,
    destinationStageType: StageType,
  ) => void {
    if (customTrapdoorDescription.destinationName === undefined) {
      return goToVanillaStage;
    }

    const destinationFunc = this.destinationFuncMap.get(
      customTrapdoorDescription.destinationName,
    );
    if (destinationFunc === undefined) {
      return goToVanillaStage;
    }

    return destinationFunc;
  }

  private checkSecondPixelationHalfWay() {
    if (
      v.run.state !==
        StageTravelState.WAITING_FOR_SECOND_PIXELATION_TO_GET_HALF_WAY ||
      v.run.stateRenderFrame === null
    ) {
      return;
    }

    const renderFrameScreenBlack =
      v.run.stateRenderFrame + PIXELATION_TO_BLACK_FRAMES;
    if (isBeforeRenderFrame(renderFrameScreenBlack)) {
      return;
    }

    v.run.state = StageTravelState.PIXELATION_TO_ROOM;
    this.logStateChanged();

    const hud = game.GetHUD();
    hud.SetVisible(true);

    this.runNextRoom.runNextRoom(() => {
      v.run.state = StageTravelState.PLAYERS_LAYING_DOWN;
      this.logStateChanged();

      // After the room transition, the players will be placed next to a door, but they should be in
      // the center of the room to emulate what happens on a vanilla stage.
      movePlayersToCenter();

      for (const player of getAllPlayers()) {
        player.AnimateAppear();

        // We need to restore the original collision classes.
        player.EntityCollisionClass = EntityCollisionClass.ALL;
        player.GridCollisionClass = EntityGridCollisionClass.GROUND;
      }

      const level = game.GetLevel();
      const stage = level.GetStage();
      if (stage !== CUSTOM_FLOOR_STAGE) {
        // The vanilla streak text shows just before the player stands up, which is a few frames
        // from now. We arbitrarily play it now instead of waiting to avoid the extra complexity.
        level.ShowName(false);
      }
    });
  }

  private checkAllPlayersLayingDownComplete() {
    if (v.run.state !== StageTravelState.PLAYERS_LAYING_DOWN) {
      return;
    }

    if (anyPlayerPlayingExtraAnimation()) {
      return;
    }

    v.run.state = StageTravelState.NONE;
    this.logStateChanged();

    const tstlClassName = getTSTLClassName(this);
    assertDefined(
      tstlClassName,
      "Failed to find get the class name for the custom trapdoor feature.",
    );

    this.disableInputs.enableAllInputs(tstlClassName);
  }

  private drawBlackSprite(): void {
    if (
      v.run.state !== StageTravelState.WAITING_FOR_FIRST_PIXELATION_TO_END &&
      v.run.state !==
        StageTravelState.WAITING_FOR_SECOND_PIXELATION_TO_GET_HALF_WAY
    ) {
      return;
    }

    if (!this.blackSprite.IsLoaded()) {
      this.blackSprite.Load("gfx/ui/boss/versusscreen.anm2", true);
      this.blackSprite.SetFrame("Scene", 0);
      this.blackSprite.Scale = Vector(100, 100);
    }

    this.blackSprite.RenderLayer(0, VectorZero);
  }

  // ModCallbackCustom.POST_GRID_ENTITY_CUSTOM_UPDATE
  // GridEntityTypeCustom.TRAPDOOR_CUSTOM
  private readonly postGridEntityCustomUpdateTrapdoor = (
    gridEntity: GridEntity,
  ) => {
    const roomListIndex = getRoomListIndex();
    const gridIndex = gridEntity.GetGridIndex();

    const roomTrapdoorMap = v.level.trapdoors.getAndSetDefault(roomListIndex);
    const trapdoorDescription = roomTrapdoorMap.get(gridIndex);
    if (trapdoorDescription === undefined) {
      return;
    }

    this.checkCustomTrapdoorOpenClose(gridEntity, trapdoorDescription);
    this.checkCustomTrapdoorPlayerTouched(gridEntity, trapdoorDescription);
  };

  private checkCustomTrapdoorOpenClose(
    gridEntity: GridEntity,
    trapdoorDescription: CustomTrapdoorDescription,
  ): void {
    /** By default, trapdoors will never close if they are already open. */
    if (trapdoorDescription.open) {
      return;
    }

    if (this.shouldTrapdoorOpen(gridEntity, trapdoorDescription.firstSpawn)) {
      openCustomTrapdoor(gridEntity, trapdoorDescription);
    }
  }

  private shouldTrapdoorOpen(
    gridEntity: GridEntity,
    firstSpawn: boolean,
  ): boolean {
    const room = game.GetRoom();
    const roomClear = room.IsClear();

    return (
      !anyPlayerCloserThan(gridEntity.Position, TRAPDOOR_OPEN_DISTANCE) &&
      !this.isPlayerCloseAfterBoss(gridEntity.Position) &&
      !shouldBeClosedFromStartingInRoomWithEnemies(firstSpawn, roomClear)
    );
  }

  private isPlayerCloseAfterBoss(position: Vector) {
    const room = game.GetRoom();
    const roomType = room.GetType();
    const roomClearGameFrame = this.roomClearFrame.getRoomClearGameFrame();

    // In order to prevent a player from accidentally entering a freshly-spawned trapdoor after
    // killing the boss of the floor, we use a wider open distance for a short amount of frames.
    if (
      roomType !== RoomType.BOSS ||
      roomClearGameFrame === undefined ||
      onOrAfterRenderFrame(roomClearGameFrame + TRAPDOOR_BOSS_REACTION_FRAMES)
    ) {
      return false;
    }

    return anyPlayerCloserThan(position, TRAPDOOR_OPEN_DISTANCE_AFTER_BOSS);
  }

  private checkCustomTrapdoorPlayerTouched(
    gridEntity: GridEntity,
    trapdoorDescription: CustomTrapdoorDescription,
  ): void {
    if (v.run.state !== StageTravelState.NONE) {
      return;
    }

    if (!trapdoorDescription.open) {
      return;
    }

    const playersTouching = Isaac.FindInRadius(
      gridEntity.Position,
      TRAPDOOR_TOUCH_DISTANCE,
      EntityPartition.PLAYER,
    );
    for (const playerEntity of playersTouching) {
      const player = playerEntity.ToPlayer();
      if (player === undefined) {
        continue;
      }

      if (
        // We don't want a Pony dash to transition to a new floor or a crawl space.
        !this.ponyDetection.isPlayerUsingPony(player) &&
        !isChildPlayer(player) &&
        canPlayerInteractWithTrapdoor(player)
      ) {
        this.playerTouchedCustomTrapdoor(
          gridEntity,
          trapdoorDescription,
          player,
        );
        return; // Prevent two players from touching the same entity.
      }
    }
  }

  private playerTouchedCustomTrapdoor(
    gridEntity: GridEntity,
    trapdoorDescription: CustomTrapdoorDescription,
    player: EntityPlayer,
  ) {
    v.run.state = StageTravelState.PLAYERS_JUMPING_DOWN;
    v.run.customTrapdoorActivated = trapdoorDescription;
    this.logStateChanged();

    const tstlClassName = getTSTLClassName(this);
    assertDefined(
      tstlClassName,
      "Failed to find get the class name for the custom trapdoor feature.",
    );

    // We don't want to allow pausing, since that will allow render frames to pass without advancing
    // the stage traveling logic. (We track how many render frames have passed to know when to move
    // to the next step.)
    const whitelist = new ReadonlySet([ButtonAction.CONSOLE]);
    this.disableInputs.disableAllInputsExceptFor(tstlClassName, whitelist);
    setPlayerAttributes(player, gridEntity.Position);
    dropTaintedForgotten(player);

    player.PlayExtraAnimation("Trapdoor");

    const otherPlayers = getOtherPlayers(player);
    for (const [i, otherPlayer] of otherPlayers.entries()) {
      const gameFramesToWaitBeforeJumping =
        OTHER_PLAYER_TRAPDOOR_JUMP_DELAY_GAME_FRAMES * (i + 1);
      const otherPlayerPtr = EntityPtr(otherPlayer);
      this.runInNFrames.runInNGameFrames(() => {
        this.startDelayedJump(otherPlayerPtr, gridEntity.Position);
      }, gameFramesToWaitBeforeJumping);
    }
  }

  private startDelayedJump(entityPtr: EntityPtr, trapdoorPosition: Vector) {
    const entity = entityPtr.Ref;
    if (entity === undefined) {
      return;
    }

    const player = entity.ToPlayer();
    if (player === undefined) {
      return;
    }

    player.PlayExtraAnimation("Trapdoor");

    this.adjustPlayerPositionToTrapdoor(
      entityPtr,
      player.Position,
      trapdoorPosition,
    );
  }

  private adjustPlayerPositionToTrapdoor(
    entityPtr: EntityPtr,
    startPos: Vector,
    endPos: Vector,
  ) {
    if (v.run.state !== StageTravelState.PLAYERS_JUMPING_DOWN) {
      return;
    }

    const entity = entityPtr.Ref;
    if (entity === undefined) {
      return;
    }

    const player = entity.ToPlayer();
    if (player === undefined) {
      return;
    }

    this.runInNFrames.runNextRenderFrame(() => {
      this.adjustPlayerPositionToTrapdoor(entityPtr, startPos, endPos);
    });

    const sprite = player.GetSprite();
    if (sprite.IsFinished("Trapdoor")) {
      player.Position = endPos;
      player.Velocity = VectorZero;
      return;
    }

    const frame = sprite.GetFrame();
    if (frame >= OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES) {
      // We have already arrived at the trapdoor.
      player.Position = endPos;
      player.Velocity = VectorZero;
      return;
    }

    // Make the player jump towards the trapdoor. We use an easing function so that the distance
    // traveled is not linear, emulating what the game does.
    const totalDifference = endPos.sub(startPos);
    const progress = frame / OTHER_PLAYER_TRAPDOOR_JUMP_DURATION_GAME_FRAMES;
    const easeProgress = easeOutSine(progress);
    const differenceForThisFrame = totalDifference.mul(easeProgress);
    const targetPosition = startPos.add(differenceForThisFrame);

    player.Position = targetPosition;
    player.Velocity = VectorZero;
  }

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    this.checkJumpComplete(player);
  };

  private checkJumpComplete(player: EntityPlayer) {
    if (v.run.state !== StageTravelState.PLAYERS_JUMPING_DOWN) {
      return;
    }

    // In this state, the players are jumping down the hole (i.e. playing the "Trapdoor" animation).
    // When it completes, they will return to normal (i.e. just standing on top of the trapdoor).
    // Thus, make them invisible at the end of the animation. (They will automatically be set to
    // visible again once we travel to the next floor.)
    const sprite = player.GetSprite();
    if (sprite.IsFinished("Trapdoor")) {
      player.Visible = false;
    }
  }

  private shouldTrapdoorSpawnOpen(
    gridEntity: GridEntity,
    firstSpawn: boolean,
  ): boolean {
    const room = game.GetRoom();
    const roomClear = room.IsClear();

    // Trapdoors created after a room has already initialized should spawn closed by default:
    // - Trapdoors created after bosses should spawn closed so that players do not accidentally jump
    //   into them.
    // - Trapdoors created by We Need to Go Deeper should spawn closed because the player will be
    //   standing on top of them.
    if (isAfterRoomFrame(0)) {
      return false;
    }

    // If we just entered a new room with enemies in it, spawn the trapdoor closed so that the
    // player has to defeat the enemies first before using the trapdoor.
    if (!roomClear) {
      return false;
    }

    // If we just entered a new room that is already cleared, spawn the trapdoor closed if we are
    // standing close to it, and open otherwise.
    return this.shouldTrapdoorOpen(gridEntity, firstSpawn);
  }

  private logStateChanged(): void {
    if (DEBUG) {
      log(
        `Custom trapdoors state changed: ${StageTravelState[v.run.state]} (${
          v.run.state
        })`,
      );
    }
  }

  /**
   * Helper function to specify where your custom trapdoor should take the player. Call this once at
   * the beginning of your mod for each kind of custom trapdoor that you want to have. The provided
   * `destinationFunc` will be executed when the player jumps into the trapdoor and the pixelation
   * effect fades to black.
   *
   * Registration is needed so that custom trapdoors can be serializable when the player saves and
   * quits.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.CUSTOM_TRAPDOORS`.
   *
   * @param destinationName The name that identifies the type of custom trapdoor. It should
   *                        correspond to a local `CustomTrapdoorType` enum in your mod. It can be
   *                        any unique value and can safely overlap with values chosen by other
   *                        mods.
   * @param destinationFunc A function that takes the player to the destination that you want.
   *                        Inside this function, use the `setStage` or `setCustomStage` helper
   *                        functions, or do something completely custom.
   */
  @Exported
  public registerCustomTrapdoorDestination(
    destinationName: string,
    destinationFunc: (
      destinationName: string | undefined,
      destinationStage: LevelStage,
      destinationStageType: StageType,
    ) => void,
  ): void {
    if (this.destinationFuncMap.has(destinationName)) {
      error(
        `Failed to register a custom trapdoor type of ${destinationName} since this custom trapdoor type has already been registered.`,
      );
    }

    this.destinationFuncMap.set(destinationName, destinationFunc);
  }

  /**
   * Helper function to spawn a trapdoor grid entity that will take a player to a vanilla stage or
   * custom location.
   *
   * - If you want to create a custom trapdoor that goes to a vanilla stage, pass `undefined` for
   *   the `destinationName` parameter.
   * - If you want to create a custom trapdoor that takes the player to a custom location, you must
   *   have registered the corresponding `destinationName` at the beginning of your mod with the
   *   `registerCustomTrapdoorDestination` function. (This is necessary so that custom trapdoors can
   *   be serializable when the player saves and quits.)
   *
   * Under the hood, the custom trapdoor is represented by a decoration grid entity and is manually
   * respawned every time the player re-enters the room.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.CUSTOM_TRAPDOORS`.
   *
   * @param gridIndexOrPosition The location in the room to spawn the trapdoor.
   * @param destinationName Optional. A string representing the name of the of destination that the
   *                        custom trapdoor will take the player to. Default is undefined, which
   *                        will take the player to a vanilla stage.
   * @param destinationStage Optional. The first argument that will be passed to the
   *                         `destinationFunc` corresponding to this custom trapdoor. This is
   *                         essentially metadata for the custom trapdoor. Leave this undefined if
   *                         your corresponding custom trapdoor function does not care what the
   *                         destination stage should be. Default is the "normal" next vanilla
   *                         stage.
   * @param destinationStageType Optional. The second argument that will be passed to the
   *                             `destinationFunc` corresponding to this custom trapdoor. This is
   *                             essentially metadata for the custom trapdoor. Leave this undefined
   *                             if your corresponding custom trapdoor function does not care what
   *                             the destination stage type should be. Default is the "normal" next
   *                             vanilla stage type.
   * @param anm2Path Optional. The path to the anm2 file to use. By default, the vanilla trapdoor
   *                 anm2 of "gfx/grid/door_11_trapdoor.anm2" will be used. The specified anm2 file
   *                 must have animations called "Opened", "Closed", and "Open Animation".
   * @param spawnOpen Optional. Whether to spawn the trapdoor in an open state. By default, behavior
   *                  will be used that emulates a vanilla trapdoor.
   */
  @Exported
  public spawnCustomTrapdoor(
    gridIndexOrPosition: int | Vector,
    destinationName?: string,
    destinationStage?: LevelStage,
    destinationStageType?: StageType,
    anm2Path = "gfx/grid/door_11_trapdoor.anm2",
    spawnOpen?: boolean,
  ): GridEntity {
    if (
      destinationName !== undefined &&
      !this.destinationFuncMap.has(destinationName)
    ) {
      error(
        `Failed to spawn a custom trapdoor with a destination of "${destinationName}" since a destination with that name has not been registered with the "registerCustomTrapdoorDestination" function. (If you are trying to go to a custom stage, the custom stage library should automatically do this for you when your mod first boots.)`,
      );
    }

    destinationStage ??= this.stageHistory.getNextStageWithHistory();
    destinationStageType ??= this.stageHistory.getNextStageTypeWithHistory();

    const room = game.GetRoom();
    const roomListIndex = getRoomListIndex();
    const gridIndex = isVector(gridIndexOrPosition)
      ? room.GetGridIndex(gridIndexOrPosition)
      : gridIndexOrPosition;

    const gridEntity = this.customGridEntities.spawnCustomGridEntity(
      GridEntityTypeCustom.TRAPDOOR_CUSTOM,
      gridIndexOrPosition,
      GridCollisionClass.NONE,
      anm2Path,
      TrapdoorAnimation.OPENED,
    );

    const firstSpawn = isAfterRoomFrame(0);
    const open =
      spawnOpen ?? this.shouldTrapdoorSpawnOpen(gridEntity, firstSpawn);

    const roomTrapdoorMap = v.level.trapdoors.getAndSetDefault(roomListIndex);
    const customTrapdoorDescription: CustomTrapdoorDescription = {
      destinationName,
      destinationStage,
      destinationStageType,
      open,
      firstSpawn,
    };
    roomTrapdoorMap.set(gridIndex, customTrapdoorDescription);

    const sprite = gridEntity.GetSprite();
    const animation = open
      ? TrapdoorAnimation.OPENED
      : TrapdoorAnimation.CLOSED;
    sprite.Play(animation, true);

    return gridEntity;
  }
}

function anyPlayerPlayingExtraAnimation() {
  const players = getAllPlayers();
  return players.some((player) => !player.IsExtraAnimationFinished());
}

function shouldBeClosedFromStartingInRoomWithEnemies(
  firstSpawn: boolean,
  roomClear: boolean,
) {
  return firstSpawn && !roomClear;
}

function openCustomTrapdoor(
  gridEntity: GridEntity,
  trapdoorDescription: CustomTrapdoorDescription,
) {
  trapdoorDescription.open = true;

  const sprite = gridEntity.GetSprite();
  sprite.Play(TrapdoorAnimation.OPEN_ANIMATION, true);
}

function canPlayerInteractWithTrapdoor(player: EntityPlayer) {
  // Players cannot interact with stage travel entities when items are queued or while playing
  // certain animations.
  const sprite = player.GetSprite();
  const animation = sprite.GetAnimation();
  return (
    !player.IsHoldingItem() &&
    !ANIMATIONS_THAT_PREVENT_STAGE_TRAVEL.has(animation)
  );
}

function setPlayerAttributes(trapdoorPlayer: EntityPlayer, position: Vector) {
  // Snap the player to the exact position of the trapdoor so that they cleanly jump down the hole.
  trapdoorPlayer.Position = position;

  for (const player of getAllPlayers()) {
    // Disable the controls to prevent the player from moving, shooting, and so on. (We also disable
    // the inputs in the `INPUT_ACTION` callback, but that does not prevent mouse inputs.)
    player.ControlsEnabled = false;

    // Freeze all players.
    player.Velocity = VectorZero;

    // We don't want enemy attacks to move the players.
    player.EntityCollisionClass = EntityCollisionClass.NONE;
    player.GridCollisionClass = EntityGridCollisionClass.NONE;

    player.StopExtraAnimation();
  }
}

function dropTaintedForgotten(player: EntityPlayer) {
  if (isCharacter(player, PlayerType.FORGOTTEN_B)) {
    const taintedSoul = player.GetOtherTwin();
    if (taintedSoul !== undefined) {
      taintedSoul.ThrowHeldEntity(VectorZero);
    }
  }
}

/** The default `destinationFunc` for a custom trapdoor. */
function goToVanillaStage(
  _destinationName: string | undefined,
  destinationStage: LevelStage,
  destinationStageType: StageType,
) {
  setStage(destinationStage, destinationStageType);
}
