/* eslint-disable */

import { game } from "../../cachedClasses";
import { irange } from "../../functions/utils";

// cspell:disable

interface ParamTable {
  BossPortrait?: string;
  BossPortraitTwo?: string;
  BossName?: string;
  BossSpot?: string;
  PlayerPortrait?: string;
  PlayerName?: string;
  PlayerSpot?: string;
  Unskippable?: boolean;
  BackgroundColor?: Color;
  DirtColor?: Color;
  NoShake?: boolean;
  Animation?: string;

  Sprite?: Sprite;
  NoLoadGraphics?: boolean;
  BossOffset?: Vector;
}

const StageAPILocal = {
  BossSprite: Sprite(),
  BossSpriteBg: Sprite(),
  BossSpriteDirt: Sprite(),

  PlayingBossSprite: Sprite(),
  PlayingBossSpriteBg: Sprite(),
  PlayingBossSpriteDirt: Sprite(),

  BossOffset: undefined as Vector | undefined,
};

StageAPILocal.BossSprite.Load("gfx/ui/boss/versusscreen.anm2", false);
StageAPILocal.BossSprite.ReplaceSpritesheet(0, "none.png");
StageAPILocal.BossSprite.ReplaceSpritesheet(11, "stageapi/boss/overlay.png");
StageAPILocal.BossSprite.LoadGraphics();

StageAPILocal.BossSpriteBg.Load("gfx/ui/boss/versusscreen.anm2", false);
for (const i of irange(1, 14)) {
  StageAPILocal.BossSpriteBg.ReplaceSpritesheet(i, "none.png");
}
StageAPILocal.BossSpriteBg.LoadGraphics();

StageAPILocal.BossSpriteDirt.Load("gfx/ui/boss/versusscreen.anm2", false);
for (const i of irange(1, 14)) {
  StageAPILocal.BossSpriteDirt.ReplaceSpritesheet(i, "none.png");
}
StageAPILocal.BossSpriteDirt.LoadGraphics();

export function playBossAnimationManual(
  portrait: string,
  name: string,
  spot: string,
  playerPortrait: unknown,
  playerName: string,
  playerSpot: unknown,
  portraitTwo: unknown,
  unskippable: boolean,
  bgColor: unknown,
  dirtColor: unknown,
  noShake: boolean,
): void {
  const paramTable: ParamTable =
    type(portrait) === "table"
      ? (portrait as ParamTable)
      : ({
          BossPortrait: portrait,
          BossPortraitTwo: portraitTwo,
          BossName: name,
          BossSpot: spot,
          PlayerPortrait: playerPortrait,
          PlayerName: playerName,
          PlayerSpot: playerSpot,
          Unskippable: unskippable,
          BackgroundColor: bgColor,
          DirtColor: dirtColor,
          NoShake: noShake,
        } as ParamTable);

  if (paramTable.Sprite !== undefined) {
    StageAPILocal.PlayingBossSprite = paramTable.Sprite;
  } else {
    StageAPILocal.PlayingBossSprite = StageAPILocal.BossSprite;
    StageAPILocal.PlayingBossSpriteBg = StageAPILocal.BossSpriteBg;
    StageAPILocal.PlayingBossSpriteDirt = StageAPILocal.BossSpriteDirt;
  }

  if (paramTable.NoLoadGraphics !== true) {
    StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(
      2,
      paramTable.BossSpot || "gfx/ui/boss/bossspot.png",
    );
    StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(
      3,
      paramTable.PlayerSpot || "gfx/ui/boss/bossspot.png",
    );
    StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(
      4,
      paramTable.BossPortrait || "gfx/ui/boss/portrait_20.0_monstro.png",
    );
    StageAPILocal.PlayingBossSpriteDirt!.ReplaceSpritesheet(
      13,
      paramTable.BossPortrait || "gfx/ui/boss/portrait_20.0_monstro.png",
    );
    StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(
      6,
      paramTable.PlayerName || "gfx/ui/boss/bossname_20.0_monstro.png",
    );
    StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(
      7,
      paramTable.BossName || "gfx/ui/boss/bossname_20.0_monstro.png",
    );
    if (paramTable.NoShake) {
      StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(5, "none.png");
      StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(
        12,
        paramTable.PlayerPortrait || "gfx/ui/boss/portrait_20.0_monstro.png",
      );
    } else {
      StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(
        5,
        paramTable.PlayerPortrait || "gfx/ui/boss/portrait_20.0_monstro.png",
      );
      StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(12, "none.png");
    }

    if (paramTable.BossPortraitTwo) {
      StageAPILocal.PlayingBossSprite!.ReplaceSpritesheet(
        9,
        paramTable.BossPortraitTwo,
      );
      StageAPILocal.PlayingBossSpriteDirt!.ReplaceSpritesheet(
        14,
        paramTable.BossPortraitTwo,
      );
      paramTable.Animation = paramTable.Animation || "DoubleTrouble";
    }

    StageAPILocal.PlayingBossSprite!.LoadGraphics();
    StageAPILocal.PlayingBossSprite!.Play(
      paramTable.Animation || "Scene",
      true,
    );
    StageAPILocal.PlayingBossSprite!.PlaybackSpeed = 0.5;

    StageAPILocal.PlayingBossSpriteBg!.Color =
      paramTable.BackgroundColor || Color(0, 0, 0, 1, 0, 0, 0);
    StageAPILocal.PlayingBossSpriteBg!.Play(
      paramTable.Animation || "Scene",
      true,
    );

    StageAPILocal.PlayingBossSpriteDirt!.Color =
      paramTable.DirtColor || Color(1, 1, 1, 1, 0, 0, 0);
    StageAPILocal.PlayingBossSpriteDirt!.Play(
      paramTable.Animation || "Scene",
      true,
    );
    StageAPILocal.PlayingBossSpriteDirt!.LoadGraphics();
  }

  if (paramTable.BossOffset !== undefined) {
    StageAPILocal.BossOffset = paramTable.BossOffset;
  } else {
    StageAPILocal.BossOffset = undefined;
  }
}

export function stageAPIBossPostRender(): void {
  const isPlaying =
    StageAPILocal.PlayingBossSprite &&
    StageAPILocal.PlayingBossSprite.IsPlaying();

  if (isPlaying) {
    StageAPILocal.PlayingBossSprite!.Update();
    StageAPILocal.PlayingBossSpriteBg!.Update();
    StageAPILocal.PlayingBossSpriteDirt!.Update();

    const room = game.GetRoom();
    const centerPosGame = room.GetCenterPos();
    const centerPos = Isaac.WorldToRenderPosition(centerPosGame);
    const layerRenderOrder = [0, 1, 2, 3, 9, 14, 13, 4, 5, 12, 11, 6, 7, 8, 10];

    StageAPILocal.PlayingBossSpriteBg!.RenderLayer(0, centerPos);

    for (const layer of layerRenderOrder) {
      let pos = centerPos;
      if (StageAPILocal.BossOffset) {
        pos = pos.add(StageAPILocal.BossOffset);
      }

      if (layer === 13 || layer === 14) {
        StageAPILocal.PlayingBossSpriteDirt!.RenderLayer(layer, pos);
      } else {
        StageAPILocal.PlayingBossSprite!.RenderLayer(layer, pos);
      }
    }
  } else if (isPlaying || StageAPILocal.PlayingBossSprite) {
    StageAPILocal.PlayingBossSprite!.Stop();
    StageAPILocal.PlayingBossSprite = undefined as unknown as Sprite;
    StageAPILocal.PlayingBossSpriteBg!.Stop();
    StageAPILocal.PlayingBossSpriteBg = undefined as unknown as Sprite;
    StageAPILocal.PlayingBossSpriteDirt!.Stop();
    StageAPILocal.PlayingBossSpriteDirt = undefined as unknown as Sprite;
  }

  if (!isPlaying) {
    StageAPILocal.BossOffset = undefined;
  }
}
