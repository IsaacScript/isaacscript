import type { ActiveSlot } from "isaac-typescript-definitions";
import {
  CollectibleType,
  DamageFlag,
  ItemType,
  ModCallback,
  PlayerType,
} from "isaac-typescript-definitions";
import { ACTIVE_SLOT_VALUES } from "../../../cachedEnumValues";
import { ISCFeature } from "../../../enums/ISCFeature";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import { arrayEquals } from "../../../functions/array";
import { hasFlag } from "../../../functions/flag";
import {
  defaultMapGetPlayer,
  mapSetPlayer,
} from "../../../functions/playerDataStructures";
import { getPlayerFromPtr } from "../../../functions/players";
import { sortNormal } from "../../../functions/sort";
import { repeat } from "../../../functions/utils";
import type { PickingUpItem } from "../../../types/PickingUpItem";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import { DefaultMap } from "../../DefaultMap";
import type { PostPlayerCollectibleAdded } from "../../callbacks/PostPlayerCollectibleAdded";
import type { PostPlayerCollectibleRemoved } from "../../callbacks/PostPlayerCollectibleRemoved";
import { Feature } from "../../private/Feature";
import type { ModdedElementSets } from "../other/ModdedElementSets";
import type { RunInNFrames } from "../other/RunInNFrames";

const v = {
  run: {
    playersCollectibleCount: new DefaultMap<PlayerIndex, int>(0),
    playersCollectibleMap: new DefaultMap<
      PlayerIndex,
      Map<CollectibleType, int>
    >(() => new Map()),
    playersActiveItemMap: new DefaultMap<
      PlayerIndex,
      Map<ActiveSlot, CollectibleType>
    >(() => new Map()),
  },
};

export class PlayerCollectibleDetection extends Feature {
  public override v = v;

  private readonly postPlayerCollectibleAdded: PostPlayerCollectibleAdded;
  private readonly postPlayerCollectibleRemoved: PostPlayerCollectibleRemoved;
  private readonly moddedElementSets: ModdedElementSets;
  private readonly runInNFrames: RunInNFrames;

  constructor(
    postPlayerCollectibleAdded: PostPlayerCollectibleAdded,
    postPlayerCollectibleRemoved: PostPlayerCollectibleRemoved,
    moddedElementSets: ModdedElementSets,
    runInNFrames: RunInNFrames,
  ) {
    super();

    this.featuresUsed = [
      ISCFeature.MODDED_ELEMENT_SETS,
      ISCFeature.RUN_IN_N_FRAMES,
    ];

    this.callbacksUsed = [
      // 3
      [ModCallback.POST_USE_ITEM, this.postUseItemD4, [CollectibleType.D4]],
    ];

    this.customCallbacksUsed = [
      [ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER, this.entityTakeDmgPlayer],
      [ModCallbackCustom.POST_ITEM_PICKUP, this.postItemPickup],
      [
        ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED,
        this.postPEffectUpdateReordered,
      ],
    ];

    this.postPlayerCollectibleAdded = postPlayerCollectibleAdded;
    this.postPlayerCollectibleRemoved = postPlayerCollectibleRemoved;
    this.moddedElementSets = moddedElementSets;
    this.runInNFrames = runInNFrames;
  }

  /**
   * This is called when the collectible count changes and in situations where the entire build is
   * rerolled.
   *
   * Since getting a new player collectible map is expensive, we want to only run this function when
   * necessary, and not on e.g. every frame. Unfortunately, this has the side effect of missing out
   * on collectible changes from mods that add and remove a collectible on the same frame.
   *
   * @param player The player to update.
   * @param numCollectiblesChanged Pass undefined for situations where the entire build was
   *                               rerolled.
   */
  private updateCollectibleMapAndFire(
    player: EntityPlayer,
    numCollectiblesChanged: int | undefined,
  ) {
    const oldCollectibleMap = defaultMapGetPlayer(
      v.run.playersCollectibleMap,
      player,
    );
    const newCollectibleMap =
      this.moddedElementSets.getPlayerCollectibleMap(player);
    mapSetPlayer(v.run.playersCollectibleMap, player, newCollectibleMap);

    const collectibleTypesSet = new Set<CollectibleType>([
      ...oldCollectibleMap.keys(),
      ...newCollectibleMap.keys(),
    ]);

    let numFired = 0;
    for (const collectibleType of collectibleTypesSet) {
      const oldNum = oldCollectibleMap.get(collectibleType) ?? 0;
      const newNum = newCollectibleMap.get(collectibleType) ?? 0;
      const difference = newNum - oldNum;
      const increased = difference > 0;
      const absoluteDifference = Math.abs(difference);

      repeat(absoluteDifference, () => {
        if (increased) {
          this.postPlayerCollectibleAdded.fire(player, collectibleType);
        } else {
          this.postPlayerCollectibleRemoved.fire(player, collectibleType);
        }
        numFired++;
      });

      if (numFired === numCollectiblesChanged) {
        return;
      }
    }
  }

  // ModCallback.POST_USE_ITEM (3)
  // CollectibleType.D4 (284)
  private readonly postUseItemD4 = (
    _collectibleType: CollectibleType,
    _rng: RNG,
    player: EntityPlayer,
  ): boolean | undefined => {
    // This function is also triggered for:
    // - D100
    // - D Infinity copying D4 or D100
    // - 1-pip dice room
    // - 6-pip dice room
    // - Reverse Wheel of Fortune copying 1-pip or 6-pip dice room
    // - First getting Missing No.
    // - Arriving on a new floor with Missing No.

    // This function is not triggered for:
    // - Tainted Eden getting hit (this is explicitly handled elsewhere)
    // - Genesis (which is automatically handled by the collectibles being removed in the normal
    //   `POST_PLAYER_COLLECTIBLE_REMOVED` callback)
    this.updateCollectibleMapAndFire(player, undefined);

    return undefined;
  };

  /** We need to handle the case of Tainted Eden taking damage. */
  // ModCallbackCustom.ENTITY_TAKE_DMG_PLAYER
  private readonly entityTakeDmgPlayer = (
    player: EntityPlayer,
    _amount: float,
    damageFlags: BitFlags<DamageFlag>,
    _source: EntityRef,
    _countdownFrames: int,
  ): boolean | undefined => {
    // Tainted Eden's mechanic does not apply if she e.g. uses Dull Razor.
    if (hasFlag(damageFlags, DamageFlag.FAKE)) {
      return undefined;
    }

    const character = player.GetPlayerType();
    if (character !== PlayerType.EDEN_B) {
      return undefined;
    }

    // The items will only be rerolled after the damage is successfully applied.
    const entityPtr = EntityPtr(player);
    this.runInNFrames.runNextGameFrame(() => {
      const futurePlayer = getPlayerFromPtr(entityPtr);
      if (futurePlayer !== undefined) {
        this.updateCollectibleMapAndFire(player, undefined);
      }
    });

    return undefined;
  };

  /**
   * We need to handle TMTRAINER collectibles, since they do not cause the player's collectible
   * count to change.
   */
  // ModCallbackCustom.POST_ITEM_PICKUP
  private readonly postItemPickup = (
    player: EntityPlayer,
    pickingUpItem: PickingUpItem,
  ) => {
    if (
      pickingUpItem.itemType === ItemType.TRINKET ||
      pickingUpItem.itemType === ItemType.NULL
    ) {
      return;
    }

    const newCollectibleCount = player.GetCollectibleCount();
    mapSetPlayer(v.run.playersCollectibleCount, player, newCollectibleCount);

    this.updateCollectibleMapAndFire(player, 1);
  };

  // ModCallbackCustom.POST_PEFFECT_UPDATE_REORDERED
  private readonly postPEffectUpdateReordered = (player: EntityPlayer) => {
    const oldCollectibleCount = defaultMapGetPlayer(
      v.run.playersCollectibleCount,
      player,
    );
    const newCollectibleCount = player.GetCollectibleCount();
    mapSetPlayer(v.run.playersCollectibleCount, player, newCollectibleCount);

    const difference = newCollectibleCount - oldCollectibleCount;

    if (difference > 0) {
      this.updateCollectibleMapAndFire(player, difference);
    } else if (difference < 0) {
      this.updateCollectibleMapAndFire(player, difference * -1);
    } else if (difference === 0) {
      this.checkActiveItemsChanged(player);
    }
  };

  /**
   * Checking for collectible count will work to detect when a player swaps their active item for
   * another active item. This is because the collectible count will decrement by 1 when the item is
   * swapped onto the pedestal and the hold animation begins, and increment by 1 when the item is
   * dequeued and the hold animation ends.
   *
   * However, we also want to explicitly check for the case where a mod swaps in a custom active
   * collectible on the same frame, since doing so is cheap.
   */
  private checkActiveItemsChanged(player: EntityPlayer) {
    const activeItemMap = defaultMapGetPlayer(
      v.run.playersActiveItemMap,
      player,
    );

    const oldCollectibleTypes: CollectibleType[] = [];
    const newCollectibleTypes: CollectibleType[] = [];

    for (const activeSlot of ACTIVE_SLOT_VALUES) {
      const oldCollectibleType =
        activeItemMap.get(activeSlot) ?? CollectibleType.NULL;
      const newCollectibleType = player.GetActiveItem(activeSlot);
      activeItemMap.set(activeSlot, newCollectibleType);

      oldCollectibleTypes.push(oldCollectibleType);
      newCollectibleTypes.push(newCollectibleType);
    }

    // For example, it is possible for the player to switch Schoolbag items, which will cause the
    // collectibles in the array to be the same, but in a different order. Thus, we sort both arrays
    // before comparing them.
    oldCollectibleTypes.sort(sortNormal);
    newCollectibleTypes.sort(sortNormal);

    if (!arrayEquals(oldCollectibleTypes, newCollectibleTypes)) {
      // One or more active items have changed (with the player's total collectible count remaining
      // the same).
      this.updateCollectibleMapAndFire(player, undefined);
    }
  }
}
