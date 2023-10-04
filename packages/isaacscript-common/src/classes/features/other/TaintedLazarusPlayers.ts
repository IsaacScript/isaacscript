import { ModCallback, PlayerType } from "isaac-typescript-definitions";
import { Exported } from "../../../decorators";
import { logError } from "../../../functions/log";
import { Feature } from "../../private/Feature";

const v = {
  run: {
    queuedTaintedLazarus: [] as EntityPlayer[],
    queuedDeadTaintedLazarus: [] as EntityPlayer[],

    /**
     * The `POST_PLAYER_INIT` callback fires for Dead Tainted Lazarus at the beginning of the run.
     * However, the player index for the Dead Tainted Lazarus player object at that time does not
     * actually correspond to the player index for the real player once Flip has been used. Thus, we
     * revert to using PtrHash as an index for our map, which is consistent between the Dead Tainted
     * Lazarus object in the `POST_PLAYER_INIT` callback and the "real" Dead Tainted Lazarus.
     *
     * We use `EntityPlayer` as the value for the map instead of `EntityPtr` because using the
     * pointer does not work for some reason. (When we unwrap it after one or more flips have been
     * used, the pointers no longer point to the original objects, even if we manually update the
     * pointers in the `POST_FLIP` callback.)
     */
    subPlayerMap: new Map<PtrHash, EntityPlayer>(),
  },
};

/**
 * This feature provides a way for end-users to get the `EntityPlayer` object for the other Tainted
 * Lazarus.
 */
export class TaintedLazarusPlayers extends Feature {
  /** @internal */
  public override v = v;

  public override vConditionalFunc = (): boolean => false;

  /** @internal */
  constructor() {
    super();

    this.callbacksUsed = [
      // 9
      [ModCallback.POST_PLAYER_INIT, this.postPlayerInit],
    ];
  }

  // ModCallback.POST_PLAYER_INIT (9)
  private readonly postPlayerInit = (player: EntityPlayer) => {
    const character = player.GetPlayerType();

    if (character === PlayerType.LAZARUS_B) {
      v.run.queuedTaintedLazarus.push(player);
    } else if (character === PlayerType.LAZARUS_2_B) {
      v.run.queuedDeadTaintedLazarus.push(player);
    } else {
      return;
    }

    this.checkDequeue();
  };

  /**
   * Indexes are the `PtrHash`, values are the `EntityPtr` of the *other* Lazarus.
   *
   * When starting a run, the `POST_PLAYER_INIT` callback will fire first for Dead Tainted Lazarus,
   * then for Tainted Lazarus. When continuing a run, the `POST_PLAYER_INIT` callback will fire
   * first for the character that is currently active. Thus, since the order of the characters is
   * not certain, we insert each of their pointers into a queue, and then only populate the map when
   * we have one Tainted Lazarus and one Dead Tainted Lazarus.
   */
  private checkDequeue() {
    if (
      v.run.queuedTaintedLazarus.length === 0 ||
      v.run.queuedDeadTaintedLazarus.length === 0
    ) {
      return;
    }

    const taintedLazarus = v.run.queuedTaintedLazarus.shift();
    const deadTaintedLazarus = v.run.queuedDeadTaintedLazarus.shift();

    if (taintedLazarus === undefined || deadTaintedLazarus === undefined) {
      return;
    }

    const taintedLazarusPtrHash = GetPtrHash(taintedLazarus);
    const deadTaintedLazarusPtrHash = GetPtrHash(deadTaintedLazarus);

    if (taintedLazarusPtrHash === deadTaintedLazarusPtrHash) {
      logError(
        "Failed to cache the Tainted Lazarus player objects, since the hash for Tainted Lazarus and Dead Tainted Lazarus were the same.",
      );
      return;
    }

    v.run.subPlayerMap.set(taintedLazarusPtrHash, deadTaintedLazarus);
    v.run.subPlayerMap.set(deadTaintedLazarusPtrHash, taintedLazarus);
  }

  /**
   * Helper function to get the other version of Tainted Lazarus.
   *
   * - On Tainted Lazarus, returns the player object for Dead Tainted Lazarus.
   * - On Dead Tainted Lazarus, returns the player object for Tainted Lazarus.
   * - Returns undefined if player object retrieval failed for any reason.
   *
   * If you call the `EntityPlayer.Exists` method on the returned object, it will return false.
   * However, you can still call the other methods like you normally would (e.g.
   * `EntityPlayer.AddCollectible`).
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.CHARACTER_HEALTH_CONVERSION`.
   */
  @Exported
  public getTaintedLazarusSubPlayer(
    player: EntityPlayer,
  ): EntityPlayer | undefined {
    const ptrHash = GetPtrHash(player);
    return v.run.subPlayerMap.get(ptrHash);
  }
}
