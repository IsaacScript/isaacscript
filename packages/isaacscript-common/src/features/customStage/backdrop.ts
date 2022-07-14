// cspell:ignore LTRX,LTLX,LBRX,LBLX

import {
  EffectVariant,
  EntityFlag,
  RoomShape,
} from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { VectorZero } from "../../constants";
import { getRandomArrayElement } from "../../functions/array";
import { spawnEffectWithSeed } from "../../functions/entitySpecific";
import { log } from "../../functions/log";
import { newRNG } from "../../functions/rng";
import { isLRoom, isNarrowRoom } from "../../functions/roomShape";
import { trimPrefix } from "../../functions/string";
import { erange, irange } from "../../functions/utils";
import { CustomStage } from "../../interfaces/CustomStage";

enum BackdropKind {
  /** The "N" stands for narrow rooms. */
  N_FLOOR = "nFloors",

  /** The "L" stands for L rooms. */
  L_FLOOR = "lFloors",

  WALL = "walls",
  CORNER = "corners",
}

enum BackdropEntitySubType {
  VANILLA_LADDER = 0,
  WALL = 1,
  WALL_EXTRA = 2,
  FLOOR = 3,
}

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

/**
 * Normally, we would make a custom entity to represent a backdrop effect, but we don't want to
 * interfere with the "entities2.xml" file in end-user mods. Thus, we must select a vanilla effect
 * to masquerade as a backdrop effect.
 *
 * We arbitrarily choose a ladder for this purpose because it will not automatically despawn after
 * time passes, like most other effects.
 */
const BACKDROP_EFFECT_VARIANT = EffectVariant.LADDER;

export function setBackdrop(customStage: CustomStage): void {
  const room = game.GetRoom();
  const decorationSeed = room.GetDecorationSeed();
  const rng = newRNG(decorationSeed);

  spawnWallEntity(customStage, rng, false);
  spawnSecondWallEntity(customStage, rng);
  spawnFloorEntity(customStage, rng);

  log("Spawned backdrop entities.");
}

function getBackdropPNGPath(
  customStage: CustomStage,
  backdropKind: BackdropKind,
  rng: RNG,
) {
  const pathArray = customStage.backdrop[backdropKind];
  const path = getRandomArrayElement(pathArray, rng);

  return customStage.backdrop.prefix + path + customStage.backdrop.suffix;
}

function spawnWallEntity(
  customStage: CustomStage,
  rng: RNG,
  isExtraWall: boolean,
) {
  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();

  const subType = isExtraWall
    ? BackdropEntitySubType.WALL_EXTRA
    : BackdropEntitySubType.WALL;
  const wallEffect = spawnEffectWithSeed(
    BACKDROP_EFFECT_VARIANT,
    subType,
    VectorZero,
    1 as Seed,
  );

  wallEffect.AddEntityFlags(EntityFlag.RENDER_WALL);

  const sprite = wallEffect.GetSprite();
  sprite.Load("gfx/isaacscript-custom-stage/wall-backdrop.anm2", false);

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

  const floorEffect = spawnEffectWithSeed(
    BACKDROP_EFFECT_VARIANT,
    BackdropEntitySubType.FLOOR,
    VectorZero,
    1 as Seed,
  );

  floorEffect.AddEntityFlags(EntityFlag.RENDER_FLOOR);

  const sprite = floorEffect.GetSprite();
  sprite.Load("gfx/isaacscript-custom-stage/floor-backdrop.anm2", false);

  const numFloorLayers = getNumFloorLayers(roomShape);
  if (numFloorLayers !== undefined) {
    for (const layerID of erange(0, numFloorLayers)) {
      // The Wall spritesheet is used for the "normal" floors.
      const wallPNGPath = getBackdropPNGPath(
        customStage,
        BackdropKind.WALL,
        rng,
      );
      sprite.ReplaceSpritesheet(layerID, wallPNGPath);
    }
  }

  if (isLRoom(roomShape)) {
    // The magic numbers are copied from StageAPI.
    for (const layerID of [16, 17]) {
      const LFloorPNGPath = getBackdropPNGPath(
        customStage,
        BackdropKind.L_FLOOR,
        rng,
      );
      sprite.ReplaceSpritesheet(layerID, LFloorPNGPath);
    }
  }

  if (isNarrowRoom(roomShape)) {
    // The magic numbers are copied from StageAPI.
    for (const layerID of [18, 19]) {
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
      return undefined;
    }
  }
}
