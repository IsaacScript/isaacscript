/*
// These are shared functions for stage-travel entities.

import {
  CrawlSpaceVariant,
  EntityPartition,
  GameStateFlag,
  GridRoom,
  LevelStage,
  RoomType,
  TrapdoorVariant,
} from "isaac-typescript-definitions";
import {
  getPlayers,
  getRoomGridIndex,
  isChildPlayer,
  isPonyActive,
  log,
  onRepentanceStage,
} from "isaacscript-common";
import { FastTravelEntityState } from "../../../../enums/FastTravelEntityState";
import { FastTravelEntityType } from "../../../../enums/FastTravelEntityType";
import { FastTravelState } from "../../../../enums/FastTravelState";
import { game } from "../../cachedClasses";
import {
  ANIMATIONS_THAT_PREVENT_FAST_TRAVEL,
  TRAPDOOR_TOUCH_DISTANCE,
} from "./constants";
import * as state from "./state";
import v from "./v";

export function stageTravelInit(
  entity: GridEntity | EntityEffect,
  fastTravelEntityType: FastTravelEntityType,
  // This must be passed a function instead of a boolean because we need to initialize the
  // description before checking whether or not it should open.
  shouldSpawnOpen: (entity: GridEntity | EntityEffect) => boolean,
): void {
  const gameFrameCount = game.GetFrameCount();

  const sprite = entity.GetSprite();
  const fileName = sprite.GetFilename();
  const customFileName = getCustomSpriteFilename(entity, fastTravelEntityType);
  if (fileName === customFileName) {
    return;
  }

  log(
    `Initializing a ${FastTravelEntityType[fastTravelEntityType]} fast-travel entity on game frame: ${gameFrameCount}`,
  );

  sprite.Load(customFileName, true);
  state.initDescription(entity, fastTravelEntityType);

  if (shouldSpawnOpen(entity)) {
    state.open(entity, fastTravelEntityType, true);
  } else {
    state.close(entity, fastTravelEntityType);
  }
}

function getCustomSpriteFilename(
  entity: GridEntity | EntityEffect,
  fastTravelEntityType: FastTravelEntityType,
): string {
  const isGreedMode = game.IsGreedMode();
  const mausoleumHeartKilled = game.GetStateFlag(
    GameStateFlag.MAUSOLEUM_HEART_KILLED,
  );
  const stage = level.GetStage();
  const roomGridIndex = getRoomGridIndex();
  const roomType = room.GetType();
  const repentanceStage = onRepentanceStage();

  switch (fastTravelEntityType) {
    case FastTravelEntityType.TRAPDOOR: {
      const gridEntity = entity as GridEntity;
      const variant = gridEntity.GetVariant();

      if (variant === (TrapdoorVariant.VOID_PORTAL as int)) {
        return "gfx/grid/voidtrapdoor_custom.anm2";
      }

      // -8
      if (roomGridIndex === (GridRoom.BLUE_WOMB as int)) {
        return "gfx/grid/door_11_wombhole_blue_custom.anm2";
      }

      // -10
      if (roomGridIndex === (GridRoom.SECRET_EXIT as int)) {
        if (
          !repentanceStage &&
          (stage === LevelStage.BASEMENT_1 || stage === LevelStage.BASEMENT_2)
        ) {
          return "gfx/grid/trapdoor_downpour_custom.anm2";
        }

        if (
          (!repentanceStage &&
            (stage === LevelStage.CAVES_1 || stage === LevelStage.CAVES_2)) ||
          (repentanceStage && stage === LevelStage.BASEMENT_2)
        ) {
          return "gfx/grid/trapdoor_mines_custom.anm2";
        }

        if (
          (!repentanceStage &&
            (stage === LevelStage.DEPTHS_1 || stage === LevelStage.DEPTHS_2)) ||
          (repentanceStage && stage === LevelStage.CAVES_2)
        ) {
          return "gfx/grid/trapdoor_mausoleum_custom.anm2";
        }
      }

      if (
        roomType === RoomType.BOSS &&
        g.race.status === RaceStatus.IN_PROGRESS &&
        g.race.myStatus === RacerStatus.RACING &&
        g.race.goal === RaceGoal.THE_BEAST &&
        !repentanceStage &&
        stage === LevelStage.DEPTHS_2
      ) {
        return "gfx/grid/trapdoor_mausoleum_custom.anm2";
      }

      if (
        (repentanceStage &&
          stage === LevelStage.DEPTHS_2 &&
          mausoleumHeartKilled) ||
        (repentanceStage && stage === LevelStage.WOMB_1)
      ) {
        return "gfx/grid/door_11_corpsehole_custom.anm2"; // cspell:ignore corpsehole
      }

      if (
        (isGreedMode && stage === LevelStage.CAVES_1) ||
        (!isGreedMode &&
          (stage === LevelStage.DEPTHS_2 || stage === LevelStage.WOMB_1))
      ) {
        return "gfx/grid/door_11_wombhole_custom.anm2";
      }

      return "gfx/grid/door_11_trapdoor_custom.anm2";
    }

    case FastTravelEntityType.CRAWLSPACE: {
      const gridEntity = entity as GridEntity;
      const variant = gridEntity.GetVariant();

      if (variant === (CrawlSpaceVariant.SECRET_SHOP as int)) {
        return "gfx/grid/door_20_secrettrapdoor_shop_custom.anm2";
      }

      return "gfx/grid/door_20_secrettrapdoor_custom.anm2";
    }

    case FastTravelEntityType.HEAVEN_DOOR: {
      return "gfx/1000.039_heaven door custom.anm2";
    }
  }
}

export function checkShouldOpen(
  entity: GridEntity | EntityEffect,
  fastTravelEntityType: FastTravelEntityType,
): void {
  const entityState = state.get(entity, fastTravelEntityType);
  if (
    entityState === FastTravelEntityState.CLOSED &&
    state.shouldOpen(entity, fastTravelEntityType) &&
    // TODO: Remove this after the next vanilla patch in 2022 when Crawlspaces are decoupled from
    // sprites.
    !anyPlayerUsingPony()
  ) {
    state.open(entity, fastTravelEntityType);
  }
}

// TODO: Remove this after the next vanilla patch in 2022 when Crawlspaces are decoupled from
// sprites.
export function anyPlayerUsingPony(): boolean {
  const players = getPlayers();
  return players.some((player) => isPonyActive(player));
}

export function checkPlayerTouched(
  entity: GridEntity | EntityEffect,
  fastTravelEntityType: FastTravelEntityType,
  touchedFunction: (
    effect: GridEntity | EntityEffect,
    player: EntityPlayer,
  ) => void,
): void {
  if (v.run.state !== FastTravelState.DISABLED) {
    return;
  }

  const entityState = state.get(entity, fastTravelEntityType);
  if (entityState === FastTravelEntityState.CLOSED) {
    return;
  }

  const playersTouching = Isaac.FindInRadius(
    entity.Position,
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
      !isPonyActive(player) &&
      !isChildPlayer(player) &&
      canInteractWith(player)
    ) {
      touchedFunction(entity, player);
      return; // Prevent two players from touching the same entity.
    }
  }
}

function canInteractWith(player: EntityPlayer) {
  // Players cannot interact with fast travel entities while playing certain animations.
  const sprite = player.GetSprite();
  const animation = sprite.GetAnimation();
  return (
    !player.IsHoldingItem() &&
    !ANIMATIONS_THAT_PREVENT_FAST_TRAVEL.has(animation)
  );
}
*/
