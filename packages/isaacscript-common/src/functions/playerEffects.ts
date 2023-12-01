import type {
  CollectibleType,
  NullItemID,
  TrinketType,
} from "isaac-typescript-definitions";
import { PlayerType } from "isaac-typescript-definitions";
import { getAllPlayers } from "./playerIndex";
import { isCharacter } from "./players";

/** Helper function to check to see if any player has a temporary collectible effect. */
export function anyPlayerHasCollectibleEffect(
  collectibleType: CollectibleType,
): boolean {
  const players = getAllPlayers();

  return players.some((player) => {
    const effects = player.GetEffects();
    return effects.HasCollectibleEffect(collectibleType);
  });
}

/** Helper function to check to see if any player has a temporary null effect. */
export function anyPlayerHasNullEffect(nullItemID: NullItemID): boolean {
  const players = getAllPlayers();

  return players.some((player) => {
    const effects = player.GetEffects();
    return effects.HasNullEffect(nullItemID);
  });
}

/** Helper function to check to see if any player has a temporary trinket effect. */
export function anyPlayerHasTrinketEffect(trinketType: TrinketType): boolean {
  const players = getAllPlayers();

  return players.some((player) => {
    const effects = player.GetEffects();
    return effects.HasTrinketEffect(trinketType);
  });
}

/**
 * Helper function to get an array of temporary effects for a player. This is helpful so that you
 * don't have to manually create an array from an `EffectsList` object.
 */
export function getEffectsList(
  player: EntityPlayer,
): readonly TemporaryEffect[] {
  const effects = player.GetEffects();
  const effectsList = effects.GetEffectsList();

  const effectArray: TemporaryEffect[] = [];
  for (let i = 0; i < effectsList.Size; i++) {
    const effect = effectsList.Get(i);
    if (effect !== undefined) {
      effectArray.push(effect);
    }
  }

  return effectArray;
}

/**
 * Helper function to check if a player should have Whore of Babylon active at their current health
 * level.
 *
 * - For most characters, Whore of Babylon activates when the red hearts are at 1/2 or less.
 * - For Eve, Whore of Babylon activates when the red hearts are at 1 or less.
 */
export function shouldWhoreOfBabylonBeActive(player: EntityPlayer): boolean {
  const redHearts = player.GetHearts();
  const threshold = isCharacter(player, PlayerType.EVE) ? 2 : 1;

  return redHearts <= threshold;
}
