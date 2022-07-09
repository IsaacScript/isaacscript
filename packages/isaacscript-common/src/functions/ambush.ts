import { SackSubType } from "isaac-typescript-definitions";
import { runNextGameFrame } from "../features/runInNFrames";
import { removeEntities } from "./entity";
import { getCoins, spawnSackWithSeed } from "./pickups";

/** Hard-coding this makes it easier to clean up the pickups afterwards. */
const SACK_SEED_THAT_SPAWNS_TWO_COINS = 6 as Seed;

/**
 * Helper function to start a Challenge Room or the Boss Rush.
 *
 * Specifically, this is performed by spawning a sack on top of the player, waiting a game frame,
 * and then removing the sack and the pickups that the sack dropped.
 */
export function startAmbush(): void {
  const player = Isaac.GetPlayer();
  const sack = spawnSackWithSeed(
    SackSubType.NULL,
    player.Position,
    SACK_SEED_THAT_SPAWNS_TWO_COINS,
  );

  // The sack will play the "Appear" animation and the player will not be able to interact with it
  // while this is occurring. By stopping the animation, it will transition to the "Idle" animation
  // and be interactable on the next game frame.
  const sprite = sack.GetSprite();
  sprite.Stop();
  const sackPtr = EntityPtr(sack);
  runNextGameFrame(() => {
    const futureSack = sackPtr.Ref;
    if (futureSack === undefined) {
      return;
    }

    futureSack.Remove();
    const sackPtrHash = GetPtrHash(futureSack);
    const coins = getCoins();
    const coinsFromSack = coins.filter(
      (pickup) =>
        pickup.SpawnerEntity !== undefined &&
        GetPtrHash(pickup.SpawnerEntity) === sackPtrHash,
    );
    removeEntities(coinsFromSack);
  });
}
