import { ModCallback } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import type { PlayerStat } from "../../../enums/PlayerStat";
import {
  mapGetPlayer,
  mapSetPlayer,
} from "../../../functions/playerDataStructures";
import { getPlayerStats } from "../../../functions/playerStats";
import { isEden } from "../../../functions/players";
import type { PlayerStats } from "../../../interfaces/PlayerStats";
import type { PlayerIndex } from "../../../types/PlayerIndex";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    edenPlayerStats: new Map<PlayerIndex, PlayerStats>(),
  },
};

export class EdenStartingStats extends Feature {
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

    const existingStatMap = mapGetPlayer(v.run.edenPlayerStats, player);
    if (existingStatMap !== undefined) {
      return;
    }

    const playerStats = getPlayerStats(player);
    mapSetPlayer(v.run.edenPlayerStats, player, playerStats);
  };

  /**
   * Helper function to get the value of the randomized starting stat for Eden. (At the beginning of
   * a run, Eden starts with randomized stats.)
   *
   * Returns undefined if passed a player that is not Eden.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.EDEN_STARTING_STATS`.
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
   * run.
   *
   * Returns undefined if passed a player that is not Eden.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.EDEN_STARTING_STATS`.
   */
  @Exported
  public getEdenStartingStats(
    player: EntityPlayer,
  ): Readonly<PlayerStats> | undefined {
    return mapGetPlayer(v.run.edenPlayerStats, player);
  }
}
