import { HEALTH_TYPE_VALUES } from "../../arrays/cachedEnumValues";
import type { HealthType } from "../../enums/HealthType";
import { ModCallbackCustom } from "../../enums/ModCallbackCustom";
import { getPlayerHealthType } from "../../functions/playerHealth";
import { getPlayerIndex } from "../../functions/playerIndex";
import { shouldFirePlayer } from "../../shouldFire";
import type { PlayerIndex } from "../../types/PlayerIndex";
import { DefaultMap } from "../DefaultMap";
import { CustomCallback } from "../private/CustomCallback";

const v = {
  run: {
    playersHealthMap: new DefaultMap<PlayerIndex, Map<HealthType, int>>(
      () => new Map(),
    ),
  },
};

export class PostPlayerChangeHealth extends CustomCallback<ModCallbackCustom.POST_PLAYER_CHANGE_HEALTH> {
  public override v = v;

  constructor() {
    super();

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectReordered,
      ],
    ];
  }

  protected override shouldFire = shouldFirePlayer;

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectReordered = (player: EntityPlayer) => {
    // We call the "getPlayerIndex" function with the "differentiateForgottenAndSoul" argument. If
    // we don't differentiate between The Forgotten and The Soul, the callback will fire every time
    // the player switches between the two.
    const playerIndex = getPlayerIndex(player, true);
    const playerHealthMap =
      v.run.playersHealthMap.getAndSetDefault(playerIndex);

    for (const healthType of HEALTH_TYPE_VALUES) {
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
