import type { PlayerType } from "isaac-typescript-definitions";
import {
  HeartSubType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { isRedHeart } from "../../../functions/pickups";
import type { ConversionHeartSubType } from "../../../types/ConversionHeartSubType";
import { Feature } from "../../private/Feature";

export class CharacterHealthConversion extends Feature {
  private readonly characterHealthReplacementMap = new Map<
    PlayerType,
    ConversionHeartSubType
  >();

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 38
      [
        ModCallback.PRE_PICKUP_COLLISION,
        this.prePickupCollisionHeart,
        [PickupVariant.HEART],
      ],
    ];

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];
  }

  // ModCallback.PRE_PICKUP_COLLISION (38)
  // PickupVariant.HEART (10)
  private readonly prePickupCollisionHeart = (
    pickup: EntityPickup,
    collider: Entity,
  ) => {
    if (!isRedHeart(pickup)) {
      return undefined;
    }

    const player = collider.ToPlayer();
    if (player === undefined) {
      return undefined;
    }

    const character = player.GetPlayerType();
    const conversionHeartSubType =
      this.characterHealthReplacementMap.get(character);
    if (conversionHeartSubType === undefined) {
      return undefined;
    }

    // Prevent internal code from running, which will prevent the player from picking up the heart,
    // but will still allow the heart to bounce off of the player.
    return false;
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    const character = player.GetPlayerType();
    const conversionHeartSubType =
      this.characterHealthReplacementMap.get(character);
    if (conversionHeartSubType === undefined) {
      return undefined;
    }

    convertRedHeartContainers(player, conversionHeartSubType);
    removeRedHearts(player);
  };

  /**
   * Helper function to make a character that has the same health mechanic as Blue Baby (red heart
   * containers --> soul hearts) or Dark Judas (red heart containers --> black hearts).
   *
   * Call this function once at the beginning of your mod to declare the health conversion type.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.CHARACTER_HEALTH_CONVERSION`.
   *
   * @public
   */
  @Exported
  public registerCharacterHealthConversion(
    playerType: PlayerType,
    conversionHeartSubType: ConversionHeartSubType,
  ): void {
    if (this.characterHealthReplacementMap.has(playerType)) {
      error(
        `Failed to register a character of type ${playerType} because there is already an existing registered character with that type.`,
      );
    }

    this.characterHealthReplacementMap.set(playerType, conversionHeartSubType);
  }
}

function convertRedHeartContainers(
  player: EntityPlayer,
  heartSubType: ConversionHeartSubType,
) {
  const maxHearts = player.GetMaxHearts();
  if (maxHearts === 0) {
    return;
  }

  player.AddMaxHearts(maxHearts * -1, false);

  switch (heartSubType) {
    case HeartSubType.SOUL: {
      player.AddSoulHearts(maxHearts);
      break;
    }

    case HeartSubType.BLACK: {
      player.AddBlackHearts(maxHearts);
      break;
    }
  }
}

/**
 * We also have to check for normal red hearts, so that the player is not able to fill bone hearts
 * (by e.g. picking up a healing item like Breakfast).
 */
function removeRedHearts(player: EntityPlayer) {
  const hearts = player.GetHearts();
  if (hearts > 0) {
    player.AddHearts(hearts * -1);
  }
}
