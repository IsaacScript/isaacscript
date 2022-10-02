import { CollectibleType, ModCallback } from "isaac-typescript-definitions";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { isChildPlayer } from "../../functions/playerIndex";
import { getPlayerNumHitsRemaining } from "../../functions/players";
import { willPlayerRevive } from "../../functions/revive";
import { shouldFirePlayer } from "../../shouldFire";
import { CustomCallback } from "../private/CustomCallback";

export class PreBerserkDeath extends CustomCallback<ModCallbackCustom2.PRE_BERSERK_DEATH> {
  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_PEFFECT_UPDATE, [this.postPEffectUpdate]], // 4
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallback.POST_PEFFECT_UPDATE (4)
  private postPEffectUpdate = (player: EntityPlayer): void => {
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
