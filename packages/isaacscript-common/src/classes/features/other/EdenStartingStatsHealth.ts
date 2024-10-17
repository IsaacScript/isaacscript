import type { CollectibleType } from "isaac-typescript-definitions";
import { ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { ModCallbackCustom } from "../../../enums/ModCallbackCustom";
import type { PlayerStat } from "../../../enums/PlayerStat";
import { isActiveCollectible } from "../../../functions/collectibles";
import {
  mapGetPlayer,
  mapHasPlayer,
  mapSetPlayer,
} from "../../../functions/playerDataStructures";
import { getPlayerHealth } from "../../../functions/playerHealth";
import { isEden } from "../../../functions/players";
import { getPlayerStats } from "../../../functions/stats";
import type { PlayerHealth } from "../../../interfaces/PlayerHealth";
import type { PlayerStats } from "../../../interfaces/PlayerStats";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    edenActiveCollectibles: new Map<PlayerIndex, CollectibleType>(),
    edenPassiveCollectibles: new Map<PlayerIndex, CollectibleType>(),
    edenPlayerStats: new Map<PlayerIndex, PlayerStats>(),
    edenPlayerHealth: new Map<PlayerIndex, PlayerHealth>(),
  },
};

export class EdenStartingStatsHealth extends Feature {
  /** @internal */
  public override v = v;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 9
      [ModCallback.POST_PLAYER_INIT, this.postPlayerInit],
    ];

    this.customCallbacksUsed = [
      [
        ModCallbackCustom.POST_PLAYER_COLLECTIBLE_ADDED,
        this.postPlayerCollectibleAdded,
      ],
    ];
  }

  /**
   * We must use the `POST_PLAYER_INIT` callback since the two random collectibles have not been
   * granted yet.
   */
  private readonly postPlayerInit = (player: EntityPlayer) => {
    if (!isEden(player)) {
      return;
    }

    this.getEdenStats(player);
    this.getEdenHealth(player);
  };

  private getEdenStats(player: EntityPlayer): void {
    const existingStatMap = mapGetPlayer(v.run.edenPlayerStats, player);
    if (existingStatMap !== undefined) {
      return;
    }

    const playerStats = getPlayerStats(player);
    mapSetPlayer(v.run.edenPlayerStats, player, playerStats);
  }

  private getEdenHealth(player: EntityPlayer): void {
    const existingHealthMap = mapGetPlayer(v.run.edenPlayerHealth, player);
    if (existingHealthMap !== undefined) {
      return;
    }

    const playerHealth = getPlayerHealth(player);
    mapSetPlayer(v.run.edenPlayerHealth, player, playerHealth);
  }

  /**
   * We must use the `POST_PLAYER_COLLECTIBLE_ADDED` callback since the collectibles are not yet
   * granted in the `POST_PLAYER_INIT` callback.
   */
  private readonly postPlayerCollectibleAdded = (
    player: EntityPlayer,
    collectibleType: CollectibleType,
  ): void => {
    if (!isEden(player)) {
      return;
    }

    const map = isActiveCollectible(collectibleType)
      ? v.run.edenActiveCollectibles
      : v.run.edenPassiveCollectibles;

    if (!mapHasPlayer(map, player)) {
      mapSetPlayer(map, player, collectibleType);
    }
  };

  /**
   * Helper function to get the active collectible that Eden started with at the beginning of the
   * run.
   *
   * Returns undefined if passed a player that is not Eden or if the starting collectibles are not
   * yet added. (Eden's starting collectibles are added after the `POST_PLAYER_INIT` callback has
   * fired.)
   *
   * @public
   */
  @Exported
  public getEdenStartingActiveCollectible(
    player: EntityPlayer,
  ): CollectibleType | undefined {
    return mapGetPlayer(v.run.edenActiveCollectibles, player);
  }

  /**
   * Helper function to get an array containing the active collectible and the passive collectible
   * that Eden started with at the beginning of the run. The active collectible will be the first
   * element and the passive collectible will be the second element.
   *
   * Returns an empty array if passed a player that is not Eden or if the starting collectibles are
   * not yet added. (Eden's starting collectibles are added after the `POST_PLAYER_INIT` callback
   * has fired.)
   *
   * @public
   */
  @Exported
  public getEdenStartingCollectibles(
    player: EntityPlayer,
  ): readonly CollectibleType[] {
    const collectibleTypes: CollectibleType[] = [];

    const activeCollectibleType = mapGetPlayer(
      v.run.edenActiveCollectibles,
      player,
    );

    if (activeCollectibleType !== undefined) {
      collectibleTypes.push(activeCollectibleType);
    }

    const passiveCollectibleType = mapGetPlayer(
      v.run.edenPassiveCollectibles,
      player,
    );

    if (passiveCollectibleType !== undefined) {
      collectibleTypes.push(passiveCollectibleType);
    }

    return collectibleTypes;
  }

  /**
   * Helper function to get the health that Eden started with at the beginning of the run before any
   * of the random collectibles were added.
   *
   * Returns undefined if passed a player that is not Eden.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.EDEN_STARTING_STATS`.
   *
   * @public
   */
  @Exported
  public getEdenStartingHealth(
    player: EntityPlayer,
  ): Readonly<PlayerHealth> | undefined {
    return mapGetPlayer(v.run.edenPlayerHealth, player);
  }

  /**
   * Helper function to get the passive collectible that Eden started with at the beginning of the
   * run.
   *
   * Returns undefined if passed a player that is not Eden or if the starting collectibles are not
   * yet added. (Eden's starting collectibles are added after the `POST_PLAYER_INIT` callback has
   * fired.)
   *
   * @public
   */
  @Exported
  public getEdenStartingPassiveCollectible(
    player: EntityPlayer,
  ): CollectibleType | undefined {
    return mapGetPlayer(v.run.edenPassiveCollectibles, player);
  }

  /**
   * Helper function to get the value of the randomized starting stat for Eden that was assigned at
   * the beginning of the run before any of the random collectibles were added.
   *
   * Returns undefined if passed a player that is not Eden.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.EDEN_STARTING_STATS`.
   *
   * @public
   */
  @Exported
  public getEdenStartingStat<T extends PlayerStat>(
    player: EntityPlayer,
    playerStat: T,
  ): PlayerStats[T] | undefined {
    const playerStats = mapGetPlayer(v.run.edenPlayerStats, player);
    if (playerStats === undefined) {
      return undefined;
    }

    return playerStats[playerStat];
  }

  /**
   * Helper function to get all of the stat values that Eden started with at the beginning of the
   * run before any of the random collectibles were added.
   *
   * Returns undefined if passed a player that is not Eden.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.EDEN_STARTING_STATS`.
   *
   * @public
   */
  @Exported
  public getEdenStartingStats(
    player: EntityPlayer,
  ): Readonly<PlayerStats> | undefined {
    return mapGetPlayer(v.run.edenPlayerStats, player);
  }
}
