import { RoomShape } from "isaac-typescript-definitions";
import { game } from "../../cachedClasses";
import { VectorZero } from "../../constants";
import { getRandomArrayElement } from "../../functions/array";
import { CustomStage } from "../../interfaces/CustomStage";
import { ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH } from "./customStageConstants";
import v from "./v";

type ShadowAnimation = "1x1" | "1x2" | "2x1" | "2x2";

/** The animation comes from StageAPI. */
const ROOM_SHAPE_TO_SHADOW_ANIMATION: {
  readonly [key in RoomShape]: ShadowAnimation;
} = {
  [RoomShape.SHAPE_1x1]: "1x1", // 1
  [RoomShape.IH]: "1x1", // 2
  [RoomShape.IV]: "1x1", // 3
  [RoomShape.SHAPE_1x2]: "1x2", // 4
  [RoomShape.IIV]: "1x2", // 5
  [RoomShape.SHAPE_2x1]: "2x1", // 6
  [RoomShape.IIH]: "2x1", // 7
  [RoomShape.SHAPE_2x2]: "2x2", // 8
  [RoomShape.LTL]: "2x2", // 9
  [RoomShape.LTR]: "2x2", // 10
  [RoomShape.LBL]: "2x2", // 11
  [RoomShape.LBR]: "2x2", // 12
} as const;

const shadowSprite = Sprite();
shadowSprite.Load(
  `${ISAACSCRIPT_CUSTOM_STAGE_GFX_PATH}/stage-shadow.anm2`,
  true,
);

export function setShadows(customStage: CustomStage): void {
  if (customStage.shadowPNGPaths === undefined) {
    return;
  }

  const room = game.GetRoom();
  const roomShape = room.GetRoomShape();
  const animation = ROOM_SHAPE_TO_SHADOW_ANIMATION[roomShape];
  const shadowPNGPaths = customStage.shadowPNGPaths[animation];
  if (shadowPNGPaths === undefined) {
    return;
  }

  const decorationSeed = room.GetDecorationSeed();
  const shadowPNGPath = getRandomArrayElement(shadowPNGPaths, decorationSeed);
  shadowSprite.ReplaceSpritesheet(0, shadowPNGPath);
  shadowSprite.SetFrame(animation, 0);
  v.room.showingShadows = true;
}

export function shadowsPostRender(_customStage: CustomStage): void {
  if (!v.room.showingShadows) {
    return;
  }

  const room = game.GetRoom();
  const renderPosition = Isaac.WorldToRenderPosition(VectorZero);
  const renderScrollOffset = room.GetRenderScrollOffset();
  const position = renderPosition.add(renderScrollOffset);
  shadowSprite.Render(position);
}
