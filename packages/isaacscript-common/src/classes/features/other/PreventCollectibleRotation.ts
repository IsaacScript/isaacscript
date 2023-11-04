import {
  CardType,
  CollectibleType,
  DiceFloorSubType,
  ModCallback,
  PickupVariant,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { setCollectibleSubType } from "../../../functions/collectibles";
import { getEntityID } from "../../../functions/entities";
import { onGameFrame } from "../../../functions/frames";
import { isCollectible } from "../../../functions/pickupVariants";
import { getCollectibles } from "../../../functions/pickupsSpecific";
import { asCollectibleType } from "../../../functions/types";
import type { PickupIndex } from "../../../types/PickupIndex";
import { ReadonlySet } from "../../../types/ReadonlySet";
import { Feature } from "../../private/Feature";
import type { PickupIndexCreation } from "./PickupIndexCreation";
import type { RunInNFrames } from "./RunInNFrames";

const ROLL_COLLECTIBLE_TYPES = new ReadonlySet([
  // The `PRE_USE_ITEM` D6 callback is fired for D6, D100, Dice Shard, 4-pip Dice Room, and 6-pip
  // Dice Room.
  CollectibleType.D6, // 105
  CollectibleType.ETERNAL_D6, // 609
  CollectibleType.SPINDOWN_DICE, // 723
]);

const ROLL_FLOOR_DICE_FLOOR_SUB_TYPES = new ReadonlySet([
  DiceFloorSubType.FOUR_PIP,
  DiceFloorSubType.SIX_PIP,
]);

const v = {
  run: {
    trackedCollectibles: new Map<PickupIndex, CollectibleType>(),
    rollGameFrame: null as int | null,
  },
};

export class PreventCollectibleRotation extends Feature {
  /** @internal */
  public override v = v;

  private readonly pickupIndexCreation: PickupIndexCreation;
  private readonly runInNFrames: RunInNFrames;

  /** @internal */
  constructor(
    pickupIndexCreation: PickupIndexCreation,
    runInNFrames: RunInNFrames,
  ) {
    super();

    this.featuresUsed = [
      ISCFeature.PICKUP_INDEX_CREATION,
      ISCFeature.RUN_IN_N_FRAMES,
    ];

    this.callbacksUsed = [
      // 5
      [
        ModCallback.POST_USE_CARD,
        this.postUseCardSoulOfIsaac,
        [CardType.SOUL_OF_ISAAC],
      ],

      // 23, 105
      [ModCallback.PRE_USE_ITEM, this.preUseItem],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.POST_DICE_ROOM_ACTIVATED, this.postDiceRoomActivated],
      [ModCallbackCustom.POST_PICKUP_CHANGED, this.postPickupChanged],
    ];

    this.pickupIndexCreation = pickupIndexCreation;
    this.runInNFrames = runInNFrames;
  }

  private readonly preUseItem = (
    collectibleType: CollectibleType,
  ): boolean | undefined => {
    if (ROLL_COLLECTIBLE_TYPES.has(collectibleType)) {
      v.run.rollGameFrame = game.GetFrameCount();
    }

    return undefined;
  };

  /**
   * Soul of Isaac causes items to flip. We assume that the player deliberately wants to roll a
   * quest item, so we delete all tracked items in the current room.
   */
  // ModCallback.POST_USE_CARD (5)
  // Card.SOUL_ISAAC (81)
  private readonly postUseCardSoulOfIsaac = () => {
    const collectibles = getCollectibles();
    for (const collectible of collectibles) {
      const pickupIndex = this.pickupIndexCreation.getPickupIndex(collectible);
      v.run.trackedCollectibles.delete(pickupIndex);
    }
  };

  // ModCallbackCustom.POST_DICE_ROOM_ACTIVATED
  private readonly postDiceRoomActivated = (
    _player: EntityPlayer,
    diceFloorSubType: DiceFloorSubType,
  ) => {
    if (ROLL_FLOOR_DICE_FLOOR_SUB_TYPES.has(diceFloorSubType)) {
      v.run.trackedCollectibles.clear();
    }
  };

  // ModCallbackCustom.POST_PICKUP_CHANGED
  private readonly postPickupChanged = (
    pickup: EntityPickup,
    oldVariant: PickupVariant,
    _oldSubType: int,
    newVariant: PickupVariant,
    newSubType: int,
  ) => {
    // We only care about collectibles rotating.
    if (
      oldVariant !== PickupVariant.COLLECTIBLE ||
      newVariant !== PickupVariant.COLLECTIBLE
    ) {
      return;
    }

    // Ignore empty pedestals (i.e. collectibles that have already been taken by the player).
    if (asCollectibleType(newSubType) === CollectibleType.NULL) {
      return;
    }

    const pickupIndex = this.pickupIndexCreation.getPickupIndex(pickup);
    const trackedCollectibleType = v.run.trackedCollectibles.get(pickupIndex);
    if (trackedCollectibleType === undefined) {
      return;
    }

    // It can take a frame after the activation of the D6 for the sub-type to change.
    if (
      v.run.rollGameFrame !== null &&
      (onGameFrame(v.run.rollGameFrame) || onGameFrame(v.run.rollGameFrame + 1))
    ) {
      v.run.trackedCollectibles.delete(pickupIndex);
      return;
    }

    if (trackedCollectibleType !== asCollectibleType(newSubType)) {
      // This collectible has rotated, so restore it back to the way it was.
      setCollectibleSubType(pickup, trackedCollectibleType);
    }
  };

  /**
   * Helper function to prevent a collectible from being affected by Tainted Isaac's rotation
   * mechanic. (This mechanic also happens from Glitched Crown and Binge Eater.) This is useful
   * because quest items that are manually spawned by mods will be automatically be affected by this
   * mechanic.
   *
   * It is required to pass the intended collectible type to this function since it is possible for
   * collectibles to rotate on the first frame that they are spawned.
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.PREVENT_COLLECTIBLE_ROTATION`.
   */
  @Exported
  public preventCollectibleRotation(
    collectible: EntityPickup,
    collectibleType: CollectibleType,
  ): void {
    if (!isCollectible(collectible)) {
      const entityID = getEntityID(collectible);
      error(
        `The "preventCollectibleRotation" function was given a non-collectible: ${entityID}`,
      );
    }

    const pickupIndex = this.pickupIndexCreation.getPickupIndex(collectible);
    v.run.trackedCollectibles.set(pickupIndex, collectibleType);

    // The item might have already shifted on the first frame that it spawns, so change it back if
    // necessary.
    if (collectible.SubType !== collectibleType) {
      setCollectibleSubType(collectible, collectibleType);
    }

    // It takes a frame for the `setCollectibleSubType` function to apply. There is a race condition
    // whereby if the next frame is a collectible rotation (which occurs on frame 30, 60, 90, and so
    // on), the collectible rotation will overwrite the `setCollectibleSubType` function. Thus, we
    // must check again on the next frame. However, we cannot use an `EntityPtr`, because the
    // reference is destroyed when the rotation occurs. Thus, we resort to using the `Exists` method
    // and hope that no crashes occur.
    this.runInNFrames.runNextGameFrame(() => {
      if (collectible.Exists() && collectible.SubType !== collectibleType) {
        setCollectibleSubType(collectible, collectibleType);
      }
    });
  }
}
