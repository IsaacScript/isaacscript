// This file handles drawing the walls and floors for custom stages.

// cspell:ignore LTRX,LTLX,LBRX,LBLX

import {
  EffectVariant,
  EntityFlag,
  RoomShape,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { VectorZero } from "../../core/constants";
import { getRandomArrayElement } from "../../functions/array";
import { spawnEffectWithSeed } from "../../functions/entitiesSpecific";
import { newRNG } from "../../functions/rng";
import { isLRoom, isNarrowRoom } from "../../functions/roomShape";
import { trimPrefix } from "../../functions/string";
import { erange, irange } from "../../functions/utils";
import { CustomStage } from "../../interfaces/private/CustomStage";
import { ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH } from "./customStageConstants";

enum BackdropKind {
  /** The "N" stands for narrow rooms. */
  N_FLOOR = "nFloors",

  /** The "L" stands for L rooms. */
  L_FLOOR = "lFloors",

  WALL = "walls",
  CORNER = "corners",
}

/** This is created by the vanilla Basement files. */
const DEFAULT_BACKDROP: NonNullable<CustomStage["backdropPNGPaths"]> = {
  nFloors: [`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/backdrop/nfloor.png`],
  lFloors: [`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/backdrop/lfloor.png`], // cspell:ignore lfloor
  walls: [`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/backdrop/wall.png`],
  corners: [`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/backdrop/corner.png`],
} as const;

const ROOM_SHAPE_WALL_ANM2_LAYERS: {
  readonly [key in RoomShape]: int;
} = {
  [RoomShape.SHAPE_1x1]: 44, // 1
  [RoomShape.IH]: 36, // 2
  [RoomShape.IV]: 28, // 3
  [RoomShape.SHAPE_1x2]: 58, // 4
  [RoomShape.IIV]: 42, // 5
  [RoomShape.SHAPE_2x1]: 63, // 6
  [RoomShape.IIH]: 62, // 7
  [RoomShape.SHAPE_2x2]: 63, // 8
  [RoomShape.LTL]: 63, // 9
  [RoomShape.LTR]: 63, // 10
  [RoomShape.LBL]: 63, // 11
  [RoomShape.LBR]: 63, // 12
} as const;

const ROOM_SHAPE_WALL_EXTRA_ANM2_LAYERS: {
  readonly [key in RoomShape]?: int;
} = {
  [RoomShape.SHAPE_2x1]: 7, // 6
  [RoomShape.SHAPE_2x2]: 21, // 8
  [RoomShape.LTL]: 19, // 9
  [RoomShape.LTR]: 19, // 10
  [RoomShape.LBL]: 19, // 11
  [RoomShape.LBR]: 19, // 12
} as const;

const WALL_OFFSET = Vector(-80, -80);

/** This corresponds to "floor-backdrop.anm2". */
const L_FLOOR_ANM2_LAYERS: readonly int[] = [16, 17];

/** This corresponds to "floor-backdrop.anm2". */
const N_FLOOR_ANM2_LAYERS: readonly int[] = [18, 19];

/**
 * Normally, we would make a custom entity to represent a backdrop effect, but we don't want to
 * interfere with the "entities2.xml" file in end-user mods. Thus, we must select a vanilla effect
 * to masquerade as a backdrop effect.
 *
 * We arbitrarily choose a ladder for this purpose because it will not automatically despawn after
 * time passes, like most other effects.
 */
const BACKDROP_EFFECT_VARIANT = EffectVariant.LADDER;
const BACKDROP_EFFECT_SUBTYPE = 101;

const BACKDROP_ROOM_TYPE_SET: ReadonlySet<RoomType> = new Set([
  RoomType.DEFAULT,
  RoomType.BOSS,
  RoomType.MINI_BOSS,
]);

export function setCustomStageBackdrop(customStage: CustomStage): void {
  const room = game.GetRoom();
  const roomType = room.GetType();
  const decorationSeed = room.GetDecorationSeed();
  const rng = newRNG(decorationSeed);

  // We do not want to set the backdrop inside shops, Curse Rooms, and so on.
  if (!BACKDROP_ROOM_TYPE_SET.has(roomType)) {
    return;
  }

  spawnWallEntity(customStage, rng, false);
  spawnSecondWallEntity(customStage, rng);
  spawnFloorEntity(customStage, rng);
}

function getBackdropPNGPath(
  customStage: CustomStage,
  backdropKind: BackdropKind,
  rng: RNG,
) {
  const backdrop =
    customStage.backdropPNGPaths === undefined
      ? DEFAULT_BACKDROP
      : customStage.backdropPNGPaths;

  const pathArray = backdrop[backdropKind];
  return getRandomArrayElement(pathArray, rng);
}

function spawnWallEntity(
  customStage: CustomStage,
  rng: RNG,
  isExtraWall: boolean,
) {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  // We spawn an effect instead of simply rendering a static sprite in order to emulate how vanilla
  // does this. (`EntityFlag.RENDER_WALL` is intended for this purpose.)
  const seed = 1 as Seed;
  const wallEffect = spawnEffectWithSeed(
    BACKDROP_EFFECT_VARIANT,
    BACKDROP_EFFECT_SUBTYPE,
    VectorZero,
    seed,
  );
  wallEffect.AddEntityFlags(EntityFlag.RENDER_WALL);

  const sprite = wallEffect.GetSprite();
  sprite.Load(`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/wall-backdrop.anm2`, false);

  const wallLayersArray = isExtraWall
    ? ROOM_SHAPE_WALL_EXTRA_ANM2_LAYERS
    : ROOM_SHAPE_WALL_ANM2_LAYERS;
  const numWallLayers = wallLayersArray[roomShape];
  if (numWallLayers === undefined) {
    error(
      `Failed to get the layers when creating the backdrop for custom stage: ${customStage.name}`,
    );
  }

  if (isLRoom(roomShape)) {
    const cornerPNGPath = getBackdropPNGPath(
      customStage,
      BackdropKind.CORNER,
      rng,
    );
    sprite.ReplaceSpritesheet(0, cornerPNGPath);
  }

  for (const layerID of irange(1, numWallLayers)) {
    const wallPNGPath = getBackdropPNGPath(customStage, BackdropKind.WALL, rng);
    sprite.ReplaceSpritesheet(layerID, wallPNGPath);
  }

  const topLeftPos = room.GetTopLeftPos();
  const renderPos = topLeftPos.add(WALL_OFFSET);
  const modifiedOffset = renderPos.div(40).mul(26);
  wallEffect.SpriteOffset = modifiedOffset;

  sprite.LoadGraphics();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const roomShapeName = RoomShape[roomShape]!;
  const animation = trimPrefix(roomShapeName, "SHAPE_");
  const modifiedAnimation = isExtraWall ? `${animation}X` : animation;
  sprite.Play(modifiedAnimation, true);
}

function spawnSecondWallEntity(customStage: CustomStage, rng: RNG) {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();
  const extraLayers = ROOM_SHAPE_WALL_EXTRA_ANM2_LAYERS[roomShape];
  const roomShapeHasExtraLayers = extraLayers !== undefined;
  if (roomShapeHasExtraLayers) {
    spawnWallEntity(customStage, rng, true);
  }
}

function spawnFloorEntity(customStage: CustomStage, rng: RNG) {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  // We spawn an effect instead of simply rendering a static sprite in order to emulate how vanilla
  // does this. (`EntityFlag.RENDER_FLOOR` is intended for this purpose.)
  const seed = 1 as Seed;
  const floorEffect = spawnEffectWithSeed(
    BACKDROP_EFFECT_VARIANT,
    0,
    VectorZero,
    seed,
  );
  floorEffect.AddEntityFlags(EntityFlag.RENDER_FLOOR);

  const sprite = floorEffect.GetSprite();
  sprite.Load(
    `${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/floor-backdrop.anm2`,
    false,
  );

  const numFloorLayers = getNumFloorLayers(roomShape);
  if (numFloorLayers !== undefined) {
    for (const layerID of erange(0, numFloorLayers)) {
      // The wall spritesheet is used for the "normal" floors.
      const wallPNGPath = getBackdropPNGPath(
        customStage,
        BackdropKind.WALL,
        rng,
      );
      sprite.ReplaceSpritesheet(layerID, wallPNGPath);
    }
  } else if (isLRoom(roomShape)) {
    for (const layerID of L_FLOOR_ANM2_LAYERS) {
      const LFloorPNGPath = getBackdropPNGPath(
        customStage,
        BackdropKind.L_FLOOR,
        rng,
      );
      sprite.ReplaceSpritesheet(layerID, LFloorPNGPath);
    }
  } else if (isNarrowRoom(roomShape)) {
    for (const layerID of N_FLOOR_ANM2_LAYERS) {
      const NFloorPNGPath = getBackdropPNGPath(
        customStage,
        BackdropKind.N_FLOOR,
        rng,
      );
      sprite.ReplaceSpritesheet(layerID, NFloorPNGPath);
    }
  }

  const topLeftPos = room.GetTopLeftPos();
  const renderPos = topLeftPos;
  const modifiedOffset = renderPos.div(40).mul(26); // The magic numbers are copied from StageAPI.
  floorEffect.SpriteOffset = modifiedOffset;

  sprite.LoadGraphics();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const roomShapeName = RoomShape[roomShape]!;
  const animation = trimPrefix(roomShapeName, "SHAPE_");
  sprite.Play(animation, true);
}

function getNumFloorLayers(roomShape: RoomShape) {
  switch (roomShape) {
    case RoomShape.SHAPE_1x1: {
      return 4;
    }

    case RoomShape.SHAPE_1x2:
    case RoomShape.SHAPE_2x1: {
      return 8;
    }

    case RoomShape.SHAPE_2x2: {
      return 16;
    }

    default: {
      // We have explicit logic elsewhere to handle narrow rooms and L rooms.
      return undefined;
    }
  }
}
