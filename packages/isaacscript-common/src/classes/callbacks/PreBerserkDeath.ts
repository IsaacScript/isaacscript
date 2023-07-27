import { CollectibleType } from "isaac-typescript-definitions";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { isChildPlayer } from "../../functions/playerIndex";
import { getPlayerNumHitsRemaining } from "../../functions/players";
import { willPlayerRevive } from "../../functions/revive";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreBerserkDeath extends CustomCallback<ModCallbackCustom.PRE_BERSERK_DEATH> {
  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (
    player: EntityPlayer,
  ): void => {
    // This callback should not trigger for the Strawman Keeper and other players that are "child"
    // players.
    if (isChildPlayer(player)) {
      return;
    }

    const effects = player.GetEffects();
    const berserkEffect = effects.GetCollectibleEffect(CollectibleType.BERSERK);
    const numHitsRemaining = getPlayerNumHitsRemaining(player);

    // If the Berserk effect will end on the next frame and we have no hearts left.
    if (
      berserkEffect !== undefined &&
      berserkEffect.Cooldown === 1 &&
      numHitsRemaining === 0 &&
      !willPlayerRevive(player)
    ) {
      this.fire(player);
    }
  };
}
