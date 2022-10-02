import { HealthType } from "../../enums/HealthType";
import { ModCallbackCustom2 } from "../../enums/ModCallbackCustom2";
import { getEnumValues } from "../../functions/enums";
import { getPlayerHealthType } from "../../functions/playerHealth";
import { getPlayerIndex } from "../../functions/playerIndex";
import { shouldFirePlayer } from "../../shouldFire";
import { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

export class PostPlayerChangeHealth extends CustomCallback<ModCallbackCustom2.POST_PLAYER_CHANGE_HEALTH> {
  public override v = {
    run: {
      playersHealthMap: new DefaultMap<PlayerIndex, Map<HealthType, int>>(
        () => new Map(),
      ),
    },
  };

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED,
        [this.postPEffectReordered],
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom2.POST_PEFFECT_UPDATE_REORDERED
  private postPEffectReordered = (player: EntityPlayer) => {
    // We call the "getPlayerIndex" function with the "differentiateForgottenAndSoul" argument. If
    // we don't differentiate between The Forgotten and The Soul, the callback will fire every time
    // the player switches between the two.
    const playerIndex = getPlayerIndex(player, true);
    const playerHealthMap =
      this.v.run.playersHealthMap.getAndSetDefault(playerIndex);

    for (const healthType of getEnumValues(HealthType)) {
      const storedHealthValue = playerHealthMap.get(healthType);
      const currentHealthValue = getPlayerHealthType(player, healthType);
      playerHealthMap.set(healthType, currentHealthValue);

      if (
        storedHealthValue !== undefined &&
        storedHealthValue !== currentHealthValue
      ) {
        const difference = currentHealthValue - storedHealthValue;
        this.fire(
          player,
          healthType,
          difference,
          storedHealthValue,
          currentHealthValue,
        );
      }
    }
  };
}
