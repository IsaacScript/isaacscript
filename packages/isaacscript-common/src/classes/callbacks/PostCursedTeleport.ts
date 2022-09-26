import {
  CollectibleType,
  DamageFlag,
  EntityType,
  ModCallback,
  PlayerVariant,
  RoomType,
  TrinketType,
} from "isaac-typescript-definitions";
import { game } from "../../core/cachedClasses";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { hasFlag } from "../../functions/flag";
import {
  mapGetPlayer,
  mapSetPlayer,
} from "../../functions/playerDataStructures";
import { getPlayerNumHitsRemaining } from "../../functions/players";
import { PlayerIndex } from "../../types/PlayerIndex";
import { CustomCallbackPlayer } from "./validation/CustomCallbackPlayer";

export class PostCursedTeleport extends CustomCallbackPlayer<ModCallbackCustom2.POST_CURSED_TELEPORT> {
  public override v = {
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

  constructor() {
    super();

    this.callbacksUsed = [
      [
        ModCallback.ENTITY_TAKE_DMG,
        [this.entityTakeDmgPlayer, EntityType.PLAYER],
      ], // 11
      [
        ModCallback.POST_PLAYER_RENDER,
        // Co-op babies cannot perform Cursed Eye teleports.
        [this.postPlayerRenderPlayer, PlayerVariant.PLAYER],
      ], // 32
    ];
  }

  // ModCallback.ENTITY_TAKE_DMG (11)
  // EntityType.PLAYER (1)
  private entityTakeDmgPlayer = (
    entity: Entity,
    _amount: float,
    damageFlags: BitFlags<DamageFlag>,
    _source: EntityRef,
    _countdownFrames: int,
  ): boolean | undefined => {
    this.incrementNumSacrifices(damageFlags); // Has to be before setting the damage frame.
    this.setDamageFrame(entity, damageFlags);

    return undefined;
  };

  private setDamageFrame(
    entity: Entity,
    damageFlags: BitFlags<DamageFlag>,
  ): void {
    const gameFrameCount = game.GetFrameCount();

    const player = entity.ToPlayer();
    if (player === undefined) {
      return;
    }

    // Don't do anything if we already activated the callback on this frame.
    const trackingArray = mapGetPlayer(
      this.v.run.playersDamageFrameMap,
      player,
    );
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
    mapSetPlayer(this.v.run.playersDamageFrameMap, player, newTrackingArray);
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
      (this.v.level.numSacrifices === 6 || this.v.level.numSacrifices >= 12)
    );
  }

  private incrementNumSacrifices(damageFlags: BitFlags<DamageFlag>): void {
    const room = game.GetRoom();
    const roomType = room.GetType();
    const isSpikeDamage = hasFlag(damageFlags, DamageFlag.SPIKES);

    if (roomType === RoomType.SACRIFICE && isSpikeDamage) {
      this.v.level.numSacrifices++;
    }
  }

  // ModCallback.POST_PLAYER_RENDER (32)
  // PlayerVariant.PLAYER (0)
  private postPlayerRenderPlayer = (
    player: EntityPlayer,
    _renderOffset: Vector,
  ): void => {
    // Retrieve information about this player.
    const trackingArray = mapGetPlayer(
      this.v.run.playersDamageFrameMap,
      player,
    );
    if (trackingArray === undefined) {
      return;
    }
    const [lastDamageFrame, callbackActivatedOnThisFrame] = trackingArray;

    if (!playerIsTeleportingFromCursedTeleport(player, lastDamageFrame)) {
      return;
    }

    // Do nothing if the callback already fired on this frame.
    if (callbackActivatedOnThisFrame) {
      return;
    }

    const gameFrameCount = game.GetFrameCount();
    const newTrackingArray = [gameFrameCount, true];
    mapSetPlayer(this.v.run.playersDamageFrameMap, player, newTrackingArray);

    this.fire(player);
  };
}

function playerIsTeleportingFromCursedTeleport(
  player: EntityPlayer,
  lastDamageFrame: int,
) {
  // Check to see if this is the frame that we last took damage.
  const gameFrameCount = game.GetFrameCount();
  if (gameFrameCount !== lastDamageFrame) {
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
