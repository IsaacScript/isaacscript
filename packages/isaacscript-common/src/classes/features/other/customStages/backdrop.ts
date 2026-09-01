// This file handles drawing the walls and floors for custom stages.

import {
  EffectVariant,
  EntityFlag,
  RoomShape,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../../../../core/cachedClasses";
import { VectorZero } from "../../../../core/constants";
import { LadderSubTypeCustom } from "../../../../enums/LadderSubTypeCustom";
import { getRandomArrayElement } from "../../../../functions/array";
import { spawnEffectWithSeed } from "../../../../functions/entitiesSpecific";
import { newRNG } from "../../../../functions/rng";
import { isLRoomShape, isNarrowRoom } from "../../../../functions/roomShape";
import {
  removeCharactersBefore,
  trimPrefix,
} from "../../../../functions/string";
import { assertDefined, eRange, iRange } from "../../../../functions/utils";
import type { CustomStage } from "../../../../interfaces/private/CustomStage";
import { ReadonlySet } from "../../../../types/ReadonlySet";
import { ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH } from "./constants";

enum BackdropKind {
  /** The "N" stands for narrow rooms. */
  N_FLOOR = "nFloors",

  /** The "L" stands for L rooms. */
  L_FLOOR = "lFloors",

  WALL = "walls",
  CORNER = "corners",
}

/** This is created by the vanilla Basement files. */
const DEFAULT_BACKDROP = {
  nFloors: [`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/backdrop/nfloor.png`],
  lFloors: [`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/backdrop/lfloor.png`], // cspell:ignore lfloor
  walls: [`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/backdrop/wall.png`],
  corners: [`${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/backdrop/corner.png`],
} as const satisfies NonNullable<CustomStage["backdropPNGPaths"]>;

const ROOM_SHAPE_WALL_ANM2_LAYERS = {
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
} as const satisfies Record<RoomShape, int>;

// We don't use `as const` since we need the object to be indexable by all `RoomShape`.
// eslint-disable-next-line complete/require-capital-const-assertions
const ROOM_SHAPE_WALL_EXTRA_ANM2_LAYERS: Readonly<
  Partial<Record<RoomShape, int>>
> = {
  [RoomShape.SHAPE_2x1]: 7, // 6
  [RoomShape.SHAPE_2x2]: 21, // 8
  [RoomShape.LTL]: 19, // 9
  [RoomShape.LTR]: 19, // 10
  [RoomShape.LBL]: 19, // 11
  [RoomShape.LBR]: 19, // 12
};

const WALL_OFFSET = Vector(-80, -80);

/** Corresponds to "floor-backdrop.anm2". */
const L_FLOOR_ANM2_LAYERS = [16, 17] as const;

/** Corresponds to "floor-backdrop.anm2". */
const N_FLOOR_ANM2_LAYERS = [18, 19] as const;

/**
 * Normally, we would make a custom entity to represent a backdrop effect, but we don't want to
 * interfere with the "entities2.xml" file in end-user mods. Thus, we must select a vanilla effect
 * to masquerade as a backdrop effect.
 *
 * We arbitrarily choose a ladder for this purpose because it will not automatically despawn after
 * time passes, like most other effects.
 */
const BACKDROP_EFFECT_VARIANT = EffectVariant.LADDER;
const BACKDROP_EFFECT_SUB_TYPE = LadderSubTypeCustom.CUSTOM_BACKDROP;

const BACKDROP_ROOM_TYPE_SET = new ReadonlySet<RoomType>([
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
  const backdrop = customStage.backdropPNGPaths ?? DEFAULT_BACKDROP;
  const pathArray = backdrop[backdropKind];
  const randomPath = getRandomArrayElement(pathArray, rng);
  return removeCharactersBefore(randomPath, "gfx/");
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
    BACKDROP_EFFECT_SUB_TYPE,
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
  assertDefined(
    numWallLayers,
    `Failed to get the layers when creating the backdrop for custom stage: ${customStage.name}`,
  );

  if (isLRoomShape(roomShape)) {
    const cornerPNGPath = getBackdropPNGPath(
      customStage,
      BackdropKind.CORNER,
      rng,
    );
    sprite.ReplaceSpritesheet(0, cornerPNGPath);
  }

  for (const layerID of iRange(1, numWallLayers)) {
    const wallPNGPath = getBackdropPNGPath(customStage, BackdropKind.WALL, rng);
    sprite.ReplaceSpritesheet(layerID, wallPNGPath);
  }

  const topLeftPos = room.GetTopLeftPos();
  const renderPos = topLeftPos.add(WALL_OFFSET);
  const modifiedOffset = renderPos.div(40).mul(26);
  wallEffect.SpriteOffset = modifiedOffset;

  sprite.LoadGraphics();
  const roomShapeName = RoomShape[roomShape];
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
    for (const layerID of eRange(numFloorLayers)) {
      // The wall spritesheet is used for the "normal" floors.
      const wallPNGPath = getBackdropPNGPath(
        customStage,
        BackdropKind.WALL,
        rng,
      );
      sprite.ReplaceSpritesheet(layerID, wallPNGPath);
    }
  } else if (isLRoomShape(roomShape)) {
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
  const roomShapeName = RoomShape[roomShape];
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
