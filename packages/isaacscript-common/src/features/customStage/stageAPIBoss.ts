/* eslint-disable */

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
  BossSprite: undefined as Sprite | undefined,
  BossSpriteBg: undefined as Sprite | undefined,
  BossSpriteDirt: undefined as Sprite | undefined,

  PlayingBossSprite: undefined as Sprite | undefined,
  PlayingBossSpriteBg: undefined as Sprite | undefined,
  PlayingBossSpriteDirt: undefined as Sprite | undefined,

  BossOffset: undefined as Vector | undefined,
};

/*

function playBossAnimationManual(
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
) {
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
    StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(
      2,
      paramTable.BossSpot || "gfx/ui/boss/bossspot.png",
    );
    StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(
      3,
      paramTable.PlayerSpot || "gfx/ui/boss/bossspot.png",
    );
    StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(
      4,
      paramTable.BossPortrait || "gfx/ui/boss/portrait_20.0_monstro.png",
    );
    StageAPILocal.PlayingBossSpriteDirt.ReplaceSpritesheet(
      13,
      paramTable.BossPortrait || "gfx/ui/boss/portrait_20.0_monstro.png",
    );
    StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(
      6,
      paramTable.PlayerName || "gfx/ui/boss/bossname_20.0_monstro.png",
    );
    StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(
      7,
      paramTable.BossName || "gfx/ui/boss/bossname_20.0_monstro.png",
    );
    if (paramTable.NoShake) {
      StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(5, "none.png");
      StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(
        12,
        paramTable.PlayerPortrait || "gfx/ui/boss/portrait_20.0_monstro.png",
      );
    } else {
      StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(
        5,
        paramTable.PlayerPortrait || "gfx/ui/boss/portrait_20.0_monstro.png",
      );
      StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(12, "none.png");
    }

    if (paramTable.BossPortraitTwo) {
      StageAPILocal.PlayingBossSprite.ReplaceSpritesheet(
        9,
        paramTable.BossPortraitTwo,
      );
      StageAPILocal.PlayingBossSpriteDirt.ReplaceSpritesheet(
        14,
        paramTable.BossPortraitTwo,
      );
      paramTable.Animation = paramTable.Animation || "DoubleTrouble";
    }

    StageAPILocal.PlayingBossSprite.Play(paramTable.Animation || "Scene", true);
    StageAPILocal.PlayingBossSprite.LoadGraphics();

    StageAPILocal.PlayingBossSpriteBg.Color =
      paramTable.BackgroundColor !== null || Color(0, 0, 0, 1, 0, 0, 0);
    StageAPILocal.PlayingBossSpriteBg.Play(
      paramTable.Animation || "Scene",
      true,
    );

    StageAPILocal.PlayingBossSpriteDirt.Color =
      paramTable.DirtColor !== null || Color(1, 1, 1, 1, 0, 0, 0);
    StageAPILocal.PlayingBossSpriteDirt.Play(
      paramTable.Animation || "Scene",
      true,
    );
    StageAPILocal.PlayingBossSpriteDirt.LoadGraphics();
  }

  if (paramTable.BossOffset !== null) {
    StageAPILocal.BossOffset = paramTable.BossOffset;
  } else {
    StageAPILocal.BossOffset = undefined;
  }
}

/*

function postRender() {
  const isPlaying = StageAPILocal.PlayingBossSprite && StageAPILocal.PlayingBossSprite.IsPlaying()

  if (isPlaying) {
      if StageAPILocal.IsOddRenderFrame then
          StageAPILocal.PlayingBossSprite:Update()
          StageAPILocal.PlayingBossSpriteBg:Update()
          StageAPILocal.PlayingBossSpriteDirt:Update()
      end

      local centerPos = StageAPILocal.GetScreenCenterPosition()
      local layerRenderOrder = [0,1,2,3,9,14,13,4,5,12,11,6,7,8,10]

      StageAPILocal.PlayingBossSpriteBg:RenderLayer(0, centerPos)

      for _, layer in ipairs(layerRenderOrder) do
          local pos = centerPos
          if StageAPILocal.BossOffset then
              local isDoubleTrouble = StageAPILocal.BossOffset.One or StageAPILocal.BossOffset.Two
              if isDoubleTrouble then  -- Double trouble, table {One = Vector, Two = Vector}
                  if layer == 4 or layer == 13 then
                      pos = pos + StageAPILocal.BossOffset.One or Vector.Zero
                  elseif layer == 9 or layer == 14 then
                      pos = pos + StageAPILocal.BossOffset.Two or Vector.Zero
                  end
              elseif layer == 4 or layer == 13 then
                  pos = pos + StageAPILocal.BossOffset
              end
          end

          if layer == 13 or layer == 14 then
              StageAPILocal.PlayingBossSpriteDirt:RenderLayer(layer, pos)
          else
              StageAPILocal.PlayingBossSprite:RenderLayer(layer, pos)
          end
      end
  } else if (isPlaying || StageAPILocal.PlayingBossSprite) {
      StageAPILocal.PlayingBossSprite:Stop()
      StageAPILocal.PlayingBossSprite = undefined
      StageAPILocal.PlayingBossSpriteBg:Stop()
      StageAPILocal.PlayingBossSpriteBg = undefined
      StageAPILocal.PlayingBossSpriteDirt:Stop()
      StageAPILocal.PlayingBossSpriteDirt = undefined
  }

  if (!isPlaying) {
      StageAPILocal.UnskippableBossAnim = undefined
      StageAPILocal.BossOffset = undefined
  }

  menuConfirmTriggered = undefined
  for _, player in ipairs(shared.Players) do
      if Input.IsActionTriggered(ButtonAction.ACTION_MENUCONFIRM, player.ControllerIndex) then
          menuConfirmTriggered = true
          break
      end
  end
}

  */
