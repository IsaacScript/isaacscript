import { CollectibleType, EntityFlag } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { hasFlag } from "../../../functions/flag";
import {
  setAddPlayer,
  setDeletePlayer,
  setHasPlayer,
} from "../../../functions/playerDataStructures";
import { getPlayers } from "../../../functions/playerIndex";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import { Feature } from "../../private/Feature";

const FLAGS_WHEN_PONY_IS_ACTIVE = [
  EntityFlag.NO_KNOCKBACK, // 1 << 26
  EntityFlag.NO_PHYSICS_KNOCKBACK, // 1 << 30
  EntityFlag.NO_DAMAGE_BLINK, // 1 << 36
] as const;

const v = {
  run: {
    playersIsPonyActive: new Set<PlayerIndex>(),
  },
};

export class PonyDetection extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];
  }

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    const effects = player.GetEffects();
    const entityFlags = player.GetEntityFlags();
    const hasPonyCollectibleEffect =
      effects.HasCollectibleEffect(CollectibleType.PONY)
      || effects.HasCollectibleEffect(CollectibleType.WHITE_PONY);
    const isPonyActiveOnPreviousFrame = setHasPlayer(
      v.run.playersIsPonyActive,
      player,
    );
    const hasPonyFlags = hasFlag(entityFlags, ...FLAGS_WHEN_PONY_IS_ACTIVE);

    const isPonyActiveNow =
      hasPonyCollectibleEffect || (isPonyActiveOnPreviousFrame && hasPonyFlags);
    if (isPonyActiveNow) {
      setAddPlayer(v.run.playersIsPonyActive, player);
    } else {
      setDeletePlayer(v.run.playersIsPonyActive, player);
    }
  };

  /**
   * Helper function to see if the player is under the effects of A Pony or White Pony charge.
   * Detecting this is difficult, as the temporary effect will disappear upon entering a new room.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PONY_DETECTION`.
   *
   * @public
   */
  @Exported
  public isPlayerUsingPony(player: EntityPlayer): boolean {
    return setHasPlayer(v.run.playersIsPonyActive, player);
  }

  /**
   * Helper function to see if any player is under the effects of A Pony or White Pony charge.
   * Detecting this is difficult, as the temporary effect will disappear upon entering a new room.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.PONY_DETECTION`.
   *
   * @public
   */
  @Exported
  public anyPlayerUsingPony(): boolean {
    const players = getPlayers();
    return players.some((player) => this.isPlayerUsingPony(player));
  }
}
