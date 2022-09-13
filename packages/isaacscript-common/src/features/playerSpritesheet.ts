import { ModCallback, PlayerSpriteLayer } from "isaac-typescript-definitions";
import { mapGetPlayer, mapSetPlayer } from "../functions/playerDataStructures";
import { PlayerIndex } from "../types/PlayerIndex";

/**
 * Player sprite layers which are linked to the main player spritesheet in "001.000_player.anm2".
 */
const PLAYER_SPRITE_LAYER_NO: PlayerSpriteLayer[] = [
  PlayerSpriteLayer.BODY,
  PlayerSpriteLayer.BODY_0,
  PlayerSpriteLayer.BODY_1,
  PlayerSpriteLayer.HEAD,
  PlayerSpriteLayer.HEAD_0,
  PlayerSpriteLayer.HEAD_1,
  PlayerSpriteLayer.HEAD_2,
  PlayerSpriteLayer.HEAD_3,
  PlayerSpriteLayer.HEAD_4,
  PlayerSpriteLayer.HEAD_5,
  PlayerSpriteLayer.TOP_0,
  PlayerSpriteLayer.EXTRA,
];

const v = {
  run: {
    /**
     * Tracks overridden player spritesheets. Overridden spritesheets need to be tracked as
     * saving/continuing and removing costumes defaults the player back to the original spritesheet.
     */
    overriddenSpritesheetPath: new Map<PlayerIndex, string>(),
  },
};

/**
 * Replaces a players sprite sheet, which resides in "001.000_player.anm2". Does not replace layers
 * not present in the main player sprite sheet file; e.g Death sprite. Keeps track of the replaced
 * spritesheet and automatically reapplies it in instances when it would be removed.
 */
export function replacePlayerSpritesheet(
  player: EntityPlayer,
  pngPath: string,
): void {
  mapSetPlayer(v.run.overriddenSpritesheetPath, player, pngPath);
  const sprite = player.GetSprite();
  PLAYER_SPRITE_LAYER_NO.forEach((layer) => {
    sprite.ReplaceSpritesheet(layer, pngPath);
  });
  sprite.LoadGraphics();
}

export function playerSpritesheetPostPlayerInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, postPlayerInit);
}

/** If player has overridden spritesheet, replace it. */
function postPlayerInit(player: EntityPlayer) {
  const overriddenSpritesheet = mapGetPlayer(
    v.run.overriddenSpritesheetPath,
    player,
  );
  if (overriddenSpritesheet !== undefined) {
    replacePlayerSpritesheet(player, overriddenSpritesheet);
  }
}
