import {
  CollectibleType,
  DamageFlag,
  PlayerVariant,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { hasFlag } from "../../functions/flag";
import { onGameFrame } from "../../functions/frames";
import {
  mapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { getPlayerNumHitsRemaining } from "../../functions/players";
import { shouldFirePlayer } from "../../shouldFire";
import type { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    playersDamageFrameMap: new Map<
      PlayerIndex,
      [lastDamageFrame: int, callbackFiredOnThisFrame: boolean]
    >(),
  },

  level: {
    numSacrifices: 0,
  },
};

export class PostCursedTeleport extends CustomCallback<ModCallbackCustom.POST_CURSED_TELEPORT> {
  public override v = v;

  protected override shouldFire = shouldFirePlayer;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER, this.entityTakeDmgPlayer],
      [
        ModCallbackCustom.POST_PLAYER_RENDER_REORDERED,
        this.postPlayerRenderReorderedPlayer,
        [PlayerVariant.PLAYER], // Co-op babies cannot perform Cursed Eye teleports.
      ],
    ];
  }

  // ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER
  private readonly entityTakeDmgPlayer = (
    player: EntityPlayer,
    _amount: float,
    damageFlags: BitFlags<DamageFlag>,
    _source: EntityRef,
    _countdownFrames: int,
  ): boolean | undefined => {
    this.incrementNumSacrifices(damageFlags); // Has to be before setting the damage frame.
    this.setDamageFrame(player, damageFlags);

    return undefined;
  };

  private incrementNumSacrifices(damageFlags: BitFlags<DamageFlag>): void {
    const room = game.GetRoom();
    const roomType = room.GetType();
    const isSpikeDamage = hasFlag(damageFlags, DamageFlag.SPIKES);

    if (roomType === RoomType.SACRIFICE && isSpikeDamage) {
      v.level.numSacrifices++;
    }
  }

  private setDamageFrame(
    player: EntityPlayer,
    damageFlags: BitFlags<DamageFlag>,
  ): void {
    const gameFrameCount = game.GetFrameCount();

    // Don't do anything if we already activated the callback on this frame.
    const trackingArray = mapGetPlayer(v.run.playersDamageFrameMap, player);
    if (trackingArray !== undefined) {
      const [lastDamageFrame, callbackFiredOnThisFrame] = trackingArray;
      if (lastDamageFrame === gameFrameCount && callbackFiredOnThisFrame) {
        return;
      }
    }

    // Don't do anything if this could be a Sacrifice Room teleport.
    if (this.isPotentialNaturalTeleportFromSacrificeRoom(damageFlags)) {
      return;
    }

    const newTrackingArray = [gameFrameCount, false];
    mapSetPlayer(v.run.playersDamageFrameMap, player, newTrackingArray);
  }

  private isPotentialNaturalTeleportFromSacrificeRoom(
    damageFlags: BitFlags<DamageFlag>,
  ): boolean {
    const room = game.GetRoom();
    const roomType = room.GetType();
    const isSpikeDamage = hasFlag(damageFlags, DamageFlag.SPIKES);

    // Don't record the frame if we are potentially going to the Angel Room or the Dark Room from a
    // Sacrifice Room.
    return (
      roomType === RoomType.SACRIFICE &&
      isSpikeDamage &&
      (v.level.numSacrifices === 6 || v.level.numSacrifices >= 12)
    );
  }

  // ModCallbackCustom.POST_PLAYER_RENDER_REORDERED
  // PlayerVariant.PLAYER (0)
  private readonly postPlayerRenderReorderedPlayer = (
    player: EntityPlayer,
    _renderOffset: Vector,
  ): void => {
    // Retrieve information about this player.
    const trackingArray = mapGetPlayer(v.run.playersDamageFrameMap, player);
    if (trackingArray === undefined) {
      return;
    }
    const [lastDamageFrame, callbackActivatedOnThisFrame] = trackingArray;

    if (!this.playerIsTeleportingFromCursedTeleport(player, lastDamageFrame)) {
      return;
    }

    // Do nothing if the callback already fired on this frame.
    if (callbackActivatedOnThisFrame) {
      return;
    }

    const gameFrameCount = game.GetFrameCount();
    const newTrackingArray = [gameFrameCount, true];
    mapSetPlayer(v.run.playersDamageFrameMap, player, newTrackingArray);

    this.fire(player);
  };

  private playerIsTeleportingFromCursedTeleport(
    player: EntityPlayer,
    lastDamageFrame: int,
  ) {
    // Check to see if this is the frame that we last took damage.
    if (!onGameFrame(lastDamageFrame)) {
      return false;
    }

    // Check to see if this is the 1st frame that we are teleporting.
    const sprite = player.GetSprite();
    if (
      !sprite.IsPlaying("TeleportUp") ||
      sprite.GetFrame() !== 1 // The 0th frame never fires
    ) {
      return false;
    }

    if (player.HasCollectible(CollectibleType.CURSED_EYE)) {
      return true;
    }

    const numHitsRemaining = getPlayerNumHitsRemaining(player);
    if (player.HasTrinket(TrinketType.CURSED_SKULL) && numHitsRemaining === 1) {
      return true;
    }

    return false;
  }
}
