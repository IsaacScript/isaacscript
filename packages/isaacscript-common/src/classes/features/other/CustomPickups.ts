// One of the functions below causes a false positive for ESLint:
// https://github.com/gajus/eslint-plugin-jsdoc/issues/915
/* eslint-disable jsdoc/check-param-names */

import {
  EffectVariant,
  EntityType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { LadderSubTypeCustom } from "../../../enums/LadderSubTypeCustom";
import {
  getEntityID,
  getEntityIDFromConstituents,
} from "../../../functions/entities";
import { spawnEffect } from "../../../functions/entitiesSpecific";
import { asNumber } from "../../../functions/types";
import { Feature } from "../../private/Feature";

interface CustomPickupFunctions {
  collectFunc: (this: void, player: EntityPlayer) => void;
  collisionFunc: (this: void, player: EntityPlayer) => boolean;
}

/**
 * Normally, we would make a custom entity to represent a fading-away pickup, but we don't want to
 * interfere with the "entities2.xml" file in end-user mods. Thus, we must select a vanilla effect
 * to masquerade as a backdrop effect.
 *
 * We arbitrarily choose a ladder for this purpose because it will not automatically despawn after
 * time passes, like most other effects.
 */
const PICKUP_EFFECT_VARIANT = EffectVariant.LADDER;
const PICKUP_EFFECT_SUB_TYPE = LadderSubTypeCustom.CUSTOM_PICKUP;

export class CustomPickups extends Feature {
  /** Indexed by entity ID. */
  private customPickupFunctionsMap = new Map<string, CustomPickupFunctions>();

  constructor() {
    super();

    this.callbacksUsed = [
      [ModCallback.PRE_PICKUP_COLLISION, [this.prePickupCollision]], // 38
      [
        ModCallback.POST_EFFECT_RENDER,
        [this.postEffectRenderPickupEffect, PICKUP_EFFECT_VARIANT],
      ], // 56
    ];
  }

  // ModCallback.PRE_PICKUP_COLLISION (38)
  private prePickupCollision = (
    pickup: EntityPickup,
    collider: Entity,
  ): boolean | undefined => {
    const entityID = getEntityID(pickup);
    const customPickupFunctions = this.customPickupFunctionsMap.get(entityID);
    if (customPickupFunctions === undefined) {
      return undefined;
    }

    const player = collider.ToPlayer();
    if (player === undefined) {
      return undefined;
    }

    const shouldPickup = customPickupFunctions.collisionFunc(player);
    if (!shouldPickup) {
      return undefined;
    }

    pickup.Remove();

    const pickupSprite = pickup.GetSprite();
    const fileName = pickupSprite.GetFilename();

    const effect = spawnEffect(
      PICKUP_EFFECT_VARIANT,
      PICKUP_EFFECT_SUB_TYPE,
      pickup.Position,
    );
    const effectSprite = effect.GetSprite();
    effectSprite.Load(fileName, true);
    effectSprite.Play("Collect", true);

    customPickupFunctions.collectFunc(player);

    return undefined;
  };

  // ModCallback.POST_EFFECT_RENDER (56)
  // PICKUP_EFFECT_VARIANT
  // eslint-disable-next-line class-methods-use-this
  private postEffectRenderPickupEffect = (effect: EntityEffect) => {
    if (effect.SubType !== asNumber(PICKUP_EFFECT_SUB_TYPE)) {
      return;
    }

    const sprite = effect.GetSprite();
    if (sprite.IsFinished("Collect")) {
      effect.Remove();
    }
  };

  /**
   * Helper function to register a custom pickup with the IsaacScript standard library. Use this
   * feature for custom pickups that are intended to be picked up by the player, like bombs and
   * keys.
   *
   * When IsaacScript detects that a player should be collecting the custom pickup, then the pickup
   * will be immediately removed, and an effect showing the pickup's respective `Collect` animation
   * will be spawned. (This emulates how a normal vanilla pickup would work.) After that, the
   * provided `collectFunc` will be fired. In this function, you will probably want to play a sound
   * corresponding to what kind of pickup it is (e.g. `SoundEffect.KEY_PICKUP_GAUNTLET`), as well as
   * do things like adding something to the player's inventory.
   *
   * Note that when you specify your custom pickup in the "entities2.xml" file, it should have a
   * type of "5" and be associated with an anm2 file that has a "Collect" animation.
   *
   * @param pickupVariantCustom The variant for the corresponding custom pickup.
   * @param subType The sub-type for the corresponding custom pickup.
   * @param collectFunc The function to run when the player collects this pickup.
   * @param collisionFunc Optional. The function to run when a player collides with the pickup.
   *                      Default is a function that always returns true, meaning that the player
   *                      will always immediately collect the pickup when they collide with it.
   *                      Specify this function if your pickup should only be able to be collected
   *                      under certain conditions.
   */
  @Exported
  public registerCustomPickup(
    pickupVariantCustom: PickupVariant,
    subType: int,
    collectFunc: (this: void, player: EntityPlayer) => void,
    collisionFunc: (this: void, player: EntityPlayer) => boolean = () => true,
  ): void {
    const entityID = getEntityIDFromConstituents(
      EntityType.PICKUP,
      pickupVariantCustom,
      subType,
    );
    const customPickupFunctions: CustomPickupFunctions = {
      collectFunc,
      collisionFunc,
    };
    this.customPickupFunctionsMap.set(entityID, customPickupFunctions);
  }
}
