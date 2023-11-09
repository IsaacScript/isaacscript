import { ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import type { PlayerStat } from "../../../enums/PlayerStat";
import {
  mapGetPlayer,
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
