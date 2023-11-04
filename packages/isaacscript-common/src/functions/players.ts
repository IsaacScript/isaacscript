import {
  Challenge,
  CollectibleType,
  ControllerIndex,
  NullItemID,
  PlayerForm,
  PlayerType,
  TearFlag,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { ReadonlySet } from "../types/ReadonlySet";
import { getCharacterName, isVanillaCharacter } from "./characters";
import { hasFlag } from "./flag";
import {
  getAllPlayers,
  getPlayerIndexVanilla,
  getPlayers,
} from "./playerIndex";
import { isNumber } from "./types";
import { assertDefined, repeat } from "./utils";

/**
 * Helper function to check to see if any player is holding up an item (from e.g. an active item
 * activation, a poop from IBS, etc.).
 */
export function anyPlayerHoldingItem(): boolean {
  const players = getAllPlayers();
  return players.some((player) => player.IsHoldingItem());
}

/**
 * Helper function to determine if the given character is present.
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if any of the characters supplied are present.
 */
export function anyPlayerIs(...matchingCharacters: PlayerType[]): boolean {
  const matchingCharacterSet = new ReadonlySet(matchingCharacters);
  const characters = getCharacters();

  return characters.some((character) => matchingCharacterSet.has(character));
}

/**
 * Helper function to determine if a player will destroy a rock/pot/skull if they walk over it.
 *
 * The following situations allow for this to be true:
 * - the player has Leo (collectible 302)
 * - the player has Thunder Thighs (collectible 314)
 * - the player is under the effects of Mega Mush (collectible 625)
 * - the player has Stompy (transformation 13)
 */
export function canPlayerCrushRocks(player: EntityPlayer): boolean {
  const effects = player.GetEffects();

  return (
    player.HasCollectible(CollectibleType.LEO) ||
    player.HasCollectible(CollectibleType.THUNDER_THIGHS) ||
    effects.HasCollectibleEffect(CollectibleType.MEGA_MUSH) ||
    player.HasPlayerForm(PlayerForm.STOMPY)
  );
}

/**
 * Helper function to remove a collectible or trinket that is currently queued to go into a player's
 * inventory (i.e. the item is being held over their head).
 *
 * If the player does not have an item currently queued, then this function will be a no-op.
 *
 * Returns whether an item was actually dequeued.
 *
 * Under the hood, this clones the `QueuedItemData`, since directly setting the `Item` field to
 * `undefined` does not work for some reason.
 */
export function dequeueItem(player: EntityPlayer): boolean {
  if (player.QueuedItem.Item === undefined) {
    return false;
  }

  // Doing `player.QueuedItem.Item = undefined` does not work for some reason.
  const queue = player.QueuedItem;
  queue.Item = undefined;
  player.QueuedItem = queue;

  return true;
}

/**
 * Helper function to get how long Azazel's Brimstone laser should be. You can pass either an
 * `EntityPlayer` object or a tear height stat.
 *
 * The formula for calculating it is: 32 - 2.5 * tearHeight
 */
export function getAzazelBrimstoneDistance(
  playerOrTearHeight: EntityPlayer | float,
): float {
  const tearHeight = isNumber(playerOrTearHeight)
    ? playerOrTearHeight
    : playerOrTearHeight.TearHeight;

  return 32 - 2.5 * tearHeight;
}

/** Helper function to get an array containing the characters of all of the current players. */
export function getCharacters(): PlayerType[] {
  const players = getPlayers();
  return players.map((player) => player.GetPlayerType());
}

/**
 * Helper function to get the closest player to a certain position. Note that this will never
 * include players with a non-undefined parent, since they are not real players (e.g. the Strawman
 * Keeper).
 */
export function getClosestPlayer(position: Vector): EntityPlayer {
  let closestPlayer: EntityPlayer | undefined;
  let closestDistance = math.huge;
  for (const player of getPlayers()) {
    const distance = position.Distance(player.Position);

    if (distance < closestDistance) {
      closestPlayer = player;
      closestDistance = distance;
    }
  }

  assertDefined(closestPlayer, "Failed to find the closest player.");

  return closestPlayer;
}

/**
 * Helper function to return the player with the highest ID, according to the `Isaac.GetPlayer`
 * method.
 */
export function getFinalPlayer(): EntityPlayer {
  const players = getPlayers();

  const lastPlayer = players.at(-1);
  assertDefined(
    lastPlayer,
    "Failed to get the final player since there were 0 players.",
  );

  return lastPlayer;
}

/**
 * Helper function to get the first player with the lowest frame count. Useful to find a freshly
 * spawned player after using items like Esau Jr. Don't use this function if two or more players
 * will be spawned on the same frame.
 */
export function getNewestPlayer(): EntityPlayer {
  let newestPlayer: EntityPlayer | undefined;
  let lowestFrame = math.huge;
  for (const player of getPlayers()) {
    if (player.FrameCount < lowestFrame) {
      newestPlayer = player;
      lowestFrame = player.FrameCount;
    }
  }

  assertDefined(newestPlayer, "Failed to find the newest player.");

  return newestPlayer;
}

/**
 * Iterates over all players and checks if any are close enough to the specified position.
 *
 * @returns The first player found when iterating upwards from index 0.
 */
export function getPlayerCloserThan(
  position: Vector,
  distance: float,
): EntityPlayer | undefined {
  const players = getPlayers();

  return players.find(
    (player) => player.Position.Distance(position) <= distance,
  );
}

/**
 * Helper function to get the player from a tear, laser, bomb, etc. Returns undefined if the entity
 * does not correspond to any particular player.
 *
 * This function works by looking at the `Parent` and the `SpawnerEntity` fields (in that order). As
 * a last resort, it will attempt to use the `Entity.ToPlayer` method on the entity itself.
 */
export function getPlayerFromEntity(entity: Entity): EntityPlayer | undefined {
  if (entity.Parent !== undefined) {
    const player = entity.Parent.ToPlayer();
    if (player !== undefined) {
      return player;
    }

    const familiar = entity.Parent.ToFamiliar();
    if (familiar !== undefined) {
      return familiar.Player;
    }
  }

  if (entity.SpawnerEntity !== undefined) {
    const player = entity.SpawnerEntity.ToPlayer();
    if (player !== undefined) {
      return player;
    }

    const familiar = entity.SpawnerEntity.ToFamiliar();
    if (familiar !== undefined) {
      return familiar.Player;
    }
  }

  return entity.ToPlayer();
}

/**
 * Helper function to get an `EntityPlayer` object from an `EntityPtr`. Returns undefined if the
 * entity has gone out of scope or if the associated entity is not a player.
 */
export function getPlayerFromPtr(
  entityPtr: EntityPtr,
): EntityPlayer | undefined {
  const entity = entityPtr.Ref;
  if (entity === undefined) {
    return undefined;
  }

  return entity.ToPlayer();
}

/**
 * Helper function to get the proper name of the player. Use this instead of the
 * `EntityPlayer.GetName` method because it accounts for Blue Baby, Lazarus II, and Tainted
 * characters.
 */
export function getPlayerName(player: EntityPlayer): string {
  const character = player.GetPlayerType();

  // Account for modded characters.
  return isModdedPlayer(player)
    ? player.GetName()
    : getCharacterName(character);
}

/**
 * Returns the combined value of all of the player's red hearts, soul/black hearts, and bone hearts,
 * minus the value of the player's rotten hearts.
 *
 * This is equivalent to the number of hits that the player can currently take, but does not take
 * into account double damage from champion enemies and/or being on later floors. (For example, on
 * Womb 1, players who have 1 soul heart remaining would die in 1 hit to anything, even though this
 * function would report that they have 2 hits remaining.)
 */
export function getPlayerNumHitsRemaining(player: EntityPlayer): int {
  const hearts = player.GetHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();
  const eternalHearts = player.GetEternalHearts();
  const rottenHearts = player.GetRottenHearts();

  return hearts + soulHearts + boneHearts + eternalHearts - rottenHearts;
}

/**
 * Helper function to get all of the players that are a certain character.
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if any of the characters supplied are present.
 */
export function getPlayersOfType(...characters: PlayerType[]): EntityPlayer[] {
  const charactersSet = new ReadonlySet(characters);
  const players = getPlayers();

  return players.filter((player) => {
    const character = player.GetPlayerType();
    return charactersSet.has(character);
  });
}

/**
 * Helper function to get all of the players that are using keyboard (i.e.
 * `ControllerIndex.KEYBOARD`). This function returns an array of players because it is possible
 * that there is more than one player with the same controller index (e.g. Jacob & Esau).
 *
 * Note that this function includes players with a non-undefined parent like e.g. the Strawman
 * Keeper.
 */
export function getPlayersOnKeyboard(): EntityPlayer[] {
  const players = getAllPlayers();

  return players.filter(
    (player) => player.ControllerIndex === ControllerIndex.KEYBOARD,
  );
}

/**
 * Helper function to get all of the players that match the provided controller index. This function
 * returns an array of players because it is possible that there is more than one player with the
 * same controller index (e.g. Jacob & Esau).
 *
 * Note that this function includes players with a non-undefined parent like e.g. the Strawman
 * Keeper.
 */
export function getPlayersWithControllerIndex(
  controllerIndex: ControllerIndex,
): EntityPlayer[] {
  const players = getAllPlayers();
  return players.filter((player) => player.ControllerIndex === controllerIndex);
}

/**
 * Helper function to check to see if a player has one or more transformations.
 *
 * This function is variadic, meaning that you can supply as many transformations as you want to
 * check for. Returns true if the player has any of the supplied transformations.
 */
export function hasForm(
  player: EntityPlayer,
  ...playerForms: PlayerForm[]
): boolean {
  return playerForms.some((playerForm) => player.HasPlayerForm(playerForm));
}

/**
 * Helper function to check if a player has homing tears.
 *
 * Under the hood, this checks the `EntityPlayer.TearFlags` variable for `TearFlag.HOMING` (1 << 2).
 */
export function hasHoming(player: EntityPlayer): boolean {
  return hasFlag(player.TearFlags, TearFlag.HOMING);
}

/** After touching a white fire, a player will turn into The Lost until they clear a room. */
export function hasLostCurse(player: EntityPlayer): boolean {
  const effects = player.GetEffects();
  return effects.HasNullEffect(NullItemID.LOST_CURSE);
}

/**
 * Helper function to check if a player has piercing tears.
 *
 * Under the hood, this checks the `EntityPlayer.TearFlags` variable for `TearFlag.PIERCING` (1 <<
 * 1).
 */
export function hasPiercing(player: EntityPlayer): boolean {
  return hasFlag(player.TearFlags, TearFlag.PIERCING);
}

/**
 * Helper function to check if a player has spectral tears.
 *
 * Under the hood, this checks the `EntityPlayer.TearFlags` variable for `TearFlag.SPECTRAL` (1 <<
 * 0).
 */
export function hasSpectral(player: EntityPlayer): boolean {
  return hasFlag(player.TearFlags, TearFlag.SPECTRAL);
}

/**
 * Helper function for detecting when a player is Bethany or Tainted Bethany. This is useful if you
 * need to adjust UI elements to account for Bethany's soul charges or Tainted Bethany's blood
 * charges.
 */
export function isBethany(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return character === PlayerType.BETHANY || character === PlayerType.BETHANY_B;
}

/**
 * Helper function to check if a player is a specific character (i.e. `PlayerType`).
 *
 * This function is variadic, meaning that you can supply as many characters as you want to check
 * for. Returns true if the player is any of the supplied characters.
 */
export function isCharacter(
  player: EntityPlayer,
  ...characters: PlayerType[]
): boolean {
  const characterSet = new ReadonlySet(characters);
  const character = player.GetPlayerType();

  return characterSet.has(character);
}

/**
 * Helper function to see if a damage source is from a player. Use this instead of comparing to the
 * entity directly because it takes familiars into account.
 */
export function isDamageFromPlayer(damageSource: Entity): boolean {
  const player = damageSource.ToPlayer();
  if (player !== undefined) {
    return true;
  }

  const indirectPlayer = getPlayerFromEntity(damageSource);
  return indirectPlayer !== undefined;
}

/**
 * Helper function for detecting when a player is Eden or Tainted Eden. Useful for situations where
 * you want to know if the starting stats were randomized, for example.
 */
export function isEden(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return character === PlayerType.EDEN || character === PlayerType.EDEN_B;
}

/** Not exported since end-users should use the `isTainted` helper function directly. */
function isTaintedModded(player: EntityPlayer) {
  // This algorithm only works for modded characters because the `Isaac.GetPlayerTypeByName` method
  // is bugged.
  // https://github.com/Meowlala/RepentanceAPIIssueTracker/issues/117
  const character = player.GetPlayerType();
  const name = player.GetName();
  const taintedCharacter = Isaac.GetPlayerTypeByName(name, true);

  return character === taintedCharacter;
}

export function isFirstPlayer(player: EntityPlayer): boolean {
  return getPlayerIndexVanilla(player) === 0;
}

/**
 * Helper function for detecting when a player is Jacob or Esau. This will only match the
 * non-tainted versions of these characters.
 */
export function isJacobOrEsau(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return character === PlayerType.JACOB || character === PlayerType.ESAU;
}

/**
 * Helper function for detecting when a player is Keeper or Tainted Keeper. Useful for situations
 * where you want to know if the health is coin hearts, for example.
 */
export function isKeeper(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return character === PlayerType.KEEPER || character === PlayerType.KEEPER_B;
}

/** Helper function for detecting when a player is The Lost or Tainted Lost. */
export function isLost(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return character === PlayerType.LOST || character === PlayerType.LOST_B;
}

export function isModdedPlayer(player: EntityPlayer): boolean {
  return !isVanillaPlayer(player);
}

/**
 * Helper function for determining if a player is able to turn their head by pressing the shooting
 * buttons.
 *
 * Under the hood, this function uses the `EntityPlayer.IsExtraAnimationFinished` method.
 */
export function isPlayerAbleToAim(player: EntityPlayer): boolean {
  return player.IsExtraAnimationFinished();
}

/** Helper function for detecting if a player is one of the Tainted characters. */
export function isTainted(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return isVanillaPlayer(player)
    ? character >= PlayerType.ISAAC_B
    : isTaintedModded(player);
}

/** Helper function for detecting when a player is Tainted Lazarus or Dead Tainted Lazarus. */
export function isTaintedLazarus(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();

  return (
    character === PlayerType.LAZARUS_B || character === PlayerType.LAZARUS_2_B
  );
}

export function isVanillaPlayer(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return isVanillaCharacter(character);
}

/**
 * Helper function to remove the Dead Eye multiplier from a player.
 *
 * Note that each time the `EntityPlayer.ClearDeadEyeCharge` method is called, it only has a chance
 * of working, so this function calls it 100 times to be safe.
 */
export function removeDeadEyeMultiplier(player: EntityPlayer): void {
  repeat(100, () => {
    player.ClearDeadEyeCharge();
  });
}

/**
 * Helper function to blindfold the player by using a hack with the challenge variable.
 *
 * Note that if the player dies and respawns (from e.g. Dead Cat), the blindfold will have to be
 * reapplied.
 *
 * Under the hood, this function sets the challenge to one with a blindfold, changes the player to
 * the same character that they currently are, and then changes the challenge back. This method was
 * discovered by im_tem.
 *
 * @param player The player to apply or remove the blindfold state from.
 * @param enabled Whether to apply or remove the blindfold.
 * @param modifyCostume Optional. Whether to add or remove the blindfold costume. Default is true.
 */
export function setBlindfold(
  player: EntityPlayer,
  enabled: boolean,
  modifyCostume = true,
): void {
  const character = player.GetPlayerType();
  const challenge = Isaac.GetChallenge();

  if (enabled) {
    game.Challenge = Challenge.SOLAR_SYSTEM; // This challenge has a blindfold
    player.ChangePlayerType(character);
    game.Challenge = challenge;

    // The costume is applied automatically.
    if (!modifyCostume) {
      player.TryRemoveNullCostume(NullItemID.BLINDFOLD);
    }
  } else {
    game.Challenge = Challenge.NULL;
    player.ChangePlayerType(character);
    game.Challenge = challenge;

    if (modifyCostume) {
      player.TryRemoveNullCostume(NullItemID.BLINDFOLD);
    }
  }
}
