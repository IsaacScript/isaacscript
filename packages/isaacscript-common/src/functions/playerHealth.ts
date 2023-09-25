import type { ActiveSlot } from "isaac-typescript-definitions";
import {
  CollectibleType,
  HeartSubType,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { MAX_PLAYER_HEART_CONTAINERS } from "../core/constants";
import { HealthType } from "../enums/HealthType";
import type { PlayerHealth, SoulHeartType } from "../interfaces/PlayerHealth";
import { countSetBits, getKBitOfN, getNumBitsOfN } from "./bitwise";
import { getCharacterMaxHeartContainers } from "./characters";
import { getTotalCharge } from "./charge";
import { getActiveItemSlots, setActiveItem } from "./playerCollectibles";
import { isCharacter, isKeeper } from "./players";
import { repeat } from "./utils";

export function addPlayerHealthType(
  player: EntityPlayer,
  healthType: HealthType,
  numHearts: int,
): void {
  switch (healthType) {
    case HealthType.RED: {
      player.AddHearts(numHearts);
      break;
    }

    case HealthType.SOUL: {
      player.AddSoulHearts(numHearts);
      break;
    }

    case HealthType.ETERNAL: {
      player.AddEternalHearts(numHearts);
      break;
    }

    case HealthType.BLACK: {
      player.AddBlackHearts(numHearts);
      break;
    }

    case HealthType.GOLDEN: {
      player.AddGoldenHearts(numHearts);
      break;
    }

    case HealthType.BONE: {
      player.AddBoneHearts(numHearts);
      break;
    }

    case HealthType.ROTTEN: {
      player.AddRottenHearts(numHearts);
      break;
    }

    case HealthType.BROKEN: {
      player.AddBrokenHearts(numHearts);
      break;
    }

    case HealthType.MAX_HEARTS: {
      player.AddMaxHearts(numHearts, false);
      break;
    }
  }
}

/**
 * Helper function to see if the provided player can pick up an eternal heart. (If a player already
 * has an eternal heart and full heart containers, they are not able to pick up any additional
 * eternal hearts.)
 *
 * This function's name matches the existing `EntityPlayer` methods.
 */
export function canPickEternalHearts(player: EntityPlayer): boolean {
  const eternalHearts = player.GetEternalHearts();
  const maxHearts = player.GetMaxHearts();
  const heartLimit = player.GetHeartLimit();

  return eternalHearts === 0 || maxHearts !== heartLimit;
}

/**
 * Returns whether all of the player's soul-heart-type hearts are black hearts.
 *
 * Note that this function does not consider red heart containers.
 *
 * For example:
 *
 * - If the player has one black heart, this function would return true.
 * - If the player has one soul heart and two black hearts, this function would return false.
 * - If the player has no black hearts, this function will return false.
 * - If the player has one red heart container and three black hearts, this function would return
 *   true.
 */
export function doesPlayerHaveAllBlackHearts(player: EntityPlayer): boolean {
  const soulHearts = getPlayerSoulHearts(player);
  const blackHearts = getPlayerBlackHearts(player);

  return blackHearts > 0 && soulHearts === 0;
}

/**
 * Returns whether all of the player's soul-heart-type hearts are soul hearts.
 *
 * Note that this function does not consider red heart containers.
 *
 * For example:
 *
 * - If the player has two soul hearts and one black heart, this function would return false.
 * - If the player has no soul hearts, this function will return false.
 * - If the player has one red heart container and three soul hearts, this function would return
 *   true.
 */
export function doesPlayerHaveAllSoulHearts(player: EntityPlayer): boolean {
  const soulHearts = getPlayerSoulHearts(player);
  const blackHearts = getPlayerBlackHearts(player);

  return soulHearts > 0 && blackHearts === 0;
}

/**
 * Returns the number of slots that the player has remaining for new heart containers, accounting
 * for broken hearts. For example, if the player is Judas and has 1 red heart containers and 2 full
 * soul hearts and 3 broken hearts, then this function would return 6 (i.e. 12 - 1 - 2 - 3).
 */
export function getPlayerAvailableHeartSlots(player: EntityPlayer): int {
  const maxHeartContainers = getPlayerMaxHeartContainers(player);
  const effectiveMaxHearts = player.GetEffectiveMaxHearts();
  const normalAndBoneHeartContainers = effectiveMaxHearts / 2;
  const soulHearts = player.GetSoulHearts();
  const soulHeartContainers = Math.ceil(soulHearts / 2);
  const totalHeartContainers =
    normalAndBoneHeartContainers + soulHeartContainers;
  const brokenHearts = player.GetBrokenHearts();
  const totalOccupiedHeartSlots = totalHeartContainers + brokenHearts;

  return maxHeartContainers - totalOccupiedHeartSlots;
}

/**
 * Returns the number of black hearts that the player has, excluding any soul hearts. For example,
 * if the player has one full black heart, one full soul heart, and one half black heart, this
 * function returns 3.
 *
 * This is different from the `EntityPlayer.GetBlackHearts` method, since that returns a bitmask.
 */
export function getPlayerBlackHearts(player: EntityPlayer): int {
  const blackHeartsBitmask = player.GetBlackHearts();
  const blackHeartBits = countSetBits(blackHeartsBitmask);

  return blackHeartBits * 2;
}

/**
 * Helper function to get an object representing the player's health. You can use this in
 * combination with the `setPlayerHealth` function to restore the player's health back to a certain
 * configuration at a later time.
 *
 * This is based on the `REVEL.StoreHealth` function in the Revelations mod.
 */
export function getPlayerHealth(player: EntityPlayer): PlayerHealth {
  const character = player.GetPlayerType();
  let maxHearts = player.GetMaxHearts();
  let hearts = getPlayerHearts(player); // We use the helper function to remove rotten hearts
  let soulHearts = player.GetSoulHearts();
  let boneHearts = player.GetBoneHearts();
  const goldenHearts = player.GetGoldenHearts();
  const eternalHearts = player.GetEternalHearts();
  const rottenHearts = player.GetRottenHearts();
  const brokenHearts = player.GetBrokenHearts();
  const subPlayer = player.GetSubPlayer();
  const soulCharges = player.GetEffectiveSoulCharge();
  const bloodCharges = player.GetEffectiveBloodCharge();

  // The Forgotten and The Soul has special health, so we need to account for this.
  if (character === PlayerType.FORGOTTEN && subPlayer !== undefined) {
    // The Forgotten does not have red heart containers.
    maxHearts = boneHearts * 2;
    boneHearts = 0;

    // The Forgotten will always have 0 soul hearts; we need to get the soul heart amount from the
    // sub player.
    soulHearts = subPlayer.GetSoulHearts();
  } else if (character === PlayerType.SOUL && subPlayer !== undefined) {
    // The Soul will always have 0 bone hearts; we need to get the bone heart amount from the sub
    // player. We need to store it as "maxHearts" instead of "boneHearts".
    maxHearts = subPlayer.GetBoneHearts() * 2;
    hearts = subPlayer.GetHearts();
  }

  // This is the number of individual hearts shown in the HUD, minus heart containers.
  const extraHearts = Math.ceil(soulHearts / 2) + boneHearts;

  // Since bone hearts can be inserted anywhere between soul hearts, we need a separate counter to
  // track which soul heart we're currently at.
  let currentSoulHeart = 0;

  const soulHeartTypes: SoulHeartType[] = [];
  for (let i = 0; i < extraHearts; i++) {
    let isBoneHeart = player.IsBoneHeart(i);
    if (character === PlayerType.FORGOTTEN && subPlayer !== undefined) {
      isBoneHeart = subPlayer.IsBoneHeart(i);
    }
    if (isBoneHeart) {
      soulHeartTypes.push(HeartSubType.BONE);
    } else {
      // We need to add 1 here because only the second half of a black heart is considered black.
      let isBlackHeart = player.IsBlackHeart(currentSoulHeart + 1);
      if (character === PlayerType.FORGOTTEN && subPlayer !== undefined) {
        isBlackHeart = subPlayer.IsBlackHeart(currentSoulHeart + 1);
      }
      if (isBlackHeart) {
        soulHeartTypes.push(HeartSubType.BLACK);
      } else {
        soulHeartTypes.push(HeartSubType.SOUL);
      }

      // Move to the next heart.
      currentSoulHeart += 2;
    }
  }

  return {
    maxHearts,
    hearts,
    eternalHearts,
    soulHearts,
    boneHearts,
    goldenHearts,
    rottenHearts,
    brokenHearts,
    soulCharges,
    bloodCharges,
    soulHeartTypes,
  };
}

export function getPlayerHealthType(
  player: EntityPlayer,
  healthType: HealthType,
): int {
  switch (healthType) {
    // 5.10.1
    case HealthType.RED: {
      // We use the standard library helper function since the `EntityPlayer.GetHearts` method
      // returns a value that includes rotten hearts.
      return getPlayerHearts(player);
    }

    // 5.10.3
    case HealthType.SOUL: {
      // We use the standard library helper function since the `EntityPlayer.GetSoulHearts` method
      // returns a value that includes black hearts.
      return getPlayerSoulHearts(player);
    }

    // 5.10.4
    case HealthType.ETERNAL: {
      return player.GetEternalHearts();
    }

    // 5.10.6
    case HealthType.BLACK: {
      // We use the standard library helper function since the `EntityPlayer.GetBlackHearts` method
      // returns a bit mask.
      return getPlayerBlackHearts(player);
    }

    // 5.10.7
    case HealthType.GOLDEN: {
      return player.GetGoldenHearts();
    }

    // 5.10.11
    case HealthType.BONE: {
      return player.GetBoneHearts();
    }

    // 5.10.12
    case HealthType.ROTTEN: {
      return player.GetRottenHearts();
    }

    case HealthType.BROKEN: {
      return player.GetBrokenHearts();
    }

    case HealthType.MAX_HEARTS: {
      return player.GetMaxHearts();
    }
  }
}

/**
 * Returns the number of red hearts that the player has, excluding any rotten hearts. For example,
 * if the player has one full black heart, one full soul heart, and one half black heart, this
 * function returns 3.
 *
 * This is different from the `EntityPlayer.GetHearts` method, since that returns a value that
 * includes rotten hearts.
 */
export function getPlayerHearts(player: EntityPlayer): int {
  const rottenHearts = player.GetRottenHearts();
  const hearts = player.GetHearts();

  return hearts - rottenHearts * 2;
}

/**
 * Helper function that returns the type of the rightmost heart. This does not including golden
 * hearts or broken hearts, since they cannot be damaged directly.
 */
export function getPlayerLastHeart(player: EntityPlayer): HealthType {
  const hearts = player.GetHearts();
  const effectiveMaxHearts = player.GetEffectiveMaxHearts();
  const soulHearts = player.GetSoulHearts();
  const blackHearts = player.GetBlackHearts();
  const eternalHearts = player.GetEternalHearts();
  const boneHearts = player.GetBoneHearts();
  const rottenHearts = player.GetRottenHearts();

  const soulHeartSlots = soulHearts / 2;
  const lastHeartIndex = boneHearts + soulHeartSlots - 1;
  const isLastHeartBone = player.IsBoneHeart(lastHeartIndex);

  if (isLastHeartBone) {
    const isLastContainerEmpty = hearts <= effectiveMaxHearts - 2;
    if (isLastContainerEmpty) {
      return HealthType.BONE;
    }

    if (rottenHearts > 0) {
      return HealthType.ROTTEN;
    }

    if (eternalHearts > 0) {
      return HealthType.ETERNAL;
    }

    return HealthType.RED;
  }

  if (soulHearts > 0) {
    const numBits = getNumBitsOfN(blackHearts);
    const finalBit = getKBitOfN(numBits - 1, blackHearts);
    const isBlack = finalBit === 1;

    if (isBlack) {
      return HealthType.BLACK;
    }

    // If it is not a black heart, it must be a soul heart.
    return HealthType.SOUL;
  }

  if (eternalHearts > 0) {
    return HealthType.ETERNAL;
  }

  if (rottenHearts > 0) {
    return HealthType.ROTTEN;
  }

  return HealthType.RED;
}

/**
 * Returns the maximum heart containers that the provided player can have. Normally, this is 12, but
 * it can change depending on the character (e.g. Keeper) and other things (e.g. Mother's Kiss).
 * This function does not account for Broken Hearts; use the `getPlayerAvailableHeartSlots` helper
 * function for that.
 */
export function getPlayerMaxHeartContainers(player: EntityPlayer): int {
  const character = player.GetPlayerType();
  const characterMaxHeartContainers = getCharacterMaxHeartContainers(character);

  // 1
  // Magdalene can increase her maximum heart containers with Birthright.
  if (
    character === PlayerType.MAGDALENE &&
    player.HasCollectible(CollectibleType.BIRTHRIGHT)
  ) {
    const extraMaxHeartContainersFromBirthright = 6;
    return characterMaxHeartContainers + extraMaxHeartContainersFromBirthright;
  }

  // 14, 33
  // Keeper and Tainted Keeper can increase their coin containers with Mother's Kiss and Greed's
  // Gullet.
  if (isKeeper(player)) {
    const numMothersKisses = player.GetTrinketMultiplier(
      TrinketType.MOTHERS_KISS,
    );
    const hasGreedsGullet = player.HasCollectible(
      CollectibleType.GREEDS_GULLET,
    );
    const coins = player.GetNumCoins();
    const greedsGulletCoinContainers = hasGreedsGullet
      ? Math.floor(coins / 25)
      : 0;

    return (
      characterMaxHeartContainers +
      numMothersKisses +
      greedsGulletCoinContainers
    );
  }

  return characterMaxHeartContainers;
}

/**
 * Returns the number of soul hearts that the player has, excluding any black hearts. For example,
 * if the player has one full black heart, one full soul heart, and one half black heart, this
 * function returns 2.
 *
 * This is different from the `EntityPlayer.GetSoulHearts` method, since that returns the combined
 * number of soul hearts and black hearts.
 */
export function getPlayerSoulHearts(player: EntityPlayer): int {
  const soulHearts = player.GetSoulHearts();
  const blackHearts = getPlayerBlackHearts(player);

  return soulHearts - blackHearts;
}

/**
 * Helper function to determine how many heart containers that Tainted Magdalene has that will not
 * be automatically depleted over time. By default, this is 2, but this function will return 4 so
 * that it is consistent with the `player.GetHearts` and `player.GetMaxHearts` methods.
 *
 * If Tainted Magdalene has Birthright, she will gained an additional non-temporary heart container.
 *
 * This function does not validate whether the provided player is Tainted Magdalene; that should be
 * accomplished before invoking this function.
 */
export function getTaintedMagdaleneNonTemporaryMaxHearts(
  player: EntityPlayer,
): int {
  const maxHearts = player.GetMaxHearts();
  const hasBirthright = player.HasCollectible(CollectibleType.BIRTHRIGHT);
  const maxNonTemporaryMaxHearts = hasBirthright ? 6 : 4;

  return Math.min(maxHearts, maxNonTemporaryMaxHearts);
}

/** Returns a `PlayerHealth` object with all zeros. */
export function newPlayerHealth(): PlayerHealth {
  return {
    maxHearts: 0,
    hearts: 0,
    eternalHearts: 0,
    soulHearts: 0,
    boneHearts: 0,
    goldenHearts: 0,
    rottenHearts: 0,
    brokenHearts: 0,
    soulCharges: 0,
    bloodCharges: 0,
    soulHeartTypes: [],
  };
}

/**
 * Helper function to remove all of a player's black hearts and add the corresponding amount of soul
 * hearts.
 */
export function playerConvertBlackHeartsToSoulHearts(
  player: EntityPlayer,
): void {
  const playerHealth = getPlayerHealth(player);
  removeAllPlayerHealth(player);
  playerHealth.soulHeartTypes = playerHealth.soulHeartTypes.map(
    (soulHeartType) =>
      soulHeartType === HeartSubType.BLACK ? HeartSubType.SOUL : soulHeartType,
  );
  setPlayerHealth(player, playerHealth);
}

/**
 * Helper function to remove all of a player's soul hearts and add the corresponding amount of black
 * hearts.
 */
export function playerConvertSoulHeartsToBlackHearts(
  player: EntityPlayer,
): void {
  const playerHealth = getPlayerHealth(player);
  removeAllPlayerHealth(player);
  playerHealth.soulHeartTypes = playerHealth.soulHeartTypes.map(
    (soulHeartType) =>
      soulHeartType === HeartSubType.SOUL ? HeartSubType.BLACK : soulHeartType,
  );
  setPlayerHealth(player, playerHealth);
}

/**
 * Helper function to see if the player is out of health.
 *
 * Specifically, this function will return false if the player has 0 red hearts, 0 soul/black
 * hearts, and 0 bone hearts.
 */
export function playerHasHealthLeft(player: EntityPlayer): boolean {
  const hearts = player.GetHearts();
  const soulHearts = player.GetSoulHearts();
  const boneHearts = player.GetBoneHearts();

  return hearts > 0 || soulHearts > 0 || boneHearts > 0;
}

export function removeAllPlayerHealth(player: EntityPlayer): void {
  const goldenHearts = player.GetGoldenHearts();
  const eternalHearts = player.GetEternalHearts();
  const boneHearts = player.GetBoneHearts();
  const brokenHearts = player.GetBrokenHearts();

  // To avoid bugs, we have to remove the exact amount of certain types of hearts. We remove Golden
  // Hearts first so that they don't break.
  player.AddGoldenHearts(goldenHearts * -1);
  player.AddEternalHearts(eternalHearts * -1);
  player.AddBoneHearts(boneHearts * -1);
  player.AddBrokenHearts(brokenHearts * -1);
  player.AddMaxHearts(MAX_PLAYER_HEART_CONTAINERS * -2, true);
  player.AddSoulHearts(MAX_PLAYER_HEART_CONTAINERS * -2);

  // If we are The Soul, the `EntityPlayer.AddBoneHearts` method will not remove Forgotten's bone
  // hearts, so we need to explicitly handle this.
  if (isCharacter(player, PlayerType.SOUL)) {
    const forgotten = player.GetSubPlayer();
    if (forgotten !== undefined) {
      const forgottenBoneHearts = forgotten.GetBoneHearts();
      forgotten.AddBoneHearts(forgottenBoneHearts * -1);
    }
  }
}

/**
 * Helper function to set a player's health to a specific state. You can use this in combination
 * with the `getPlayerHealth` function to restore the player's health back to a certain
 * configuration at a later time.
 *
 * Based on the `REVEL.LoadHealth` function in the Revelations mod.
 */
export function setPlayerHealth(
  player: EntityPlayer,
  playerHealth: PlayerHealth,
): void {
  const character = player.GetPlayerType();
  const subPlayer = player.GetSubPlayer();

  // Before we add or remove any health, we have to take away Alabaster Box, if present. (Removing
  // soul hearts from the player will remove Alabaster Box charges.)
  const alabasterBoxDescriptions: Array<{
    activeSlot: ActiveSlot;
    totalCharge: int;
  }> = [];
  const alabasterBoxActiveSlots = getActiveItemSlots(
    player,
    CollectibleType.ALABASTER_BOX,
  );
  for (const activeSlot of alabasterBoxActiveSlots) {
    const totalCharge = getTotalCharge(player, activeSlot);
    setActiveItem(player, CollectibleType.NULL, activeSlot);
    alabasterBoxDescriptions.push({ activeSlot, totalCharge });
  }

  removeAllPlayerHealth(player);

  // Add the red heart containers.
  if (character === PlayerType.SOUL && subPlayer !== undefined) {
    // Adding health to The Soul is a special case.
    subPlayer.AddMaxHearts(playerHealth.maxHearts, false);
  } else {
    player.AddMaxHearts(playerHealth.maxHearts, false);
  }

  // Add the eternal hearts.
  player.AddEternalHearts(playerHealth.eternalHearts);

  // Add the soul / black / bone hearts.
  let soulHeartsRemaining = playerHealth.soulHearts;
  for (const [i, soulHeartType] of playerHealth.soulHeartTypes.entries()) {
    const isHalf =
      playerHealth.soulHearts + playerHealth.boneHearts * 2 < (i + 1) * 2;
    let addAmount = 2;
    if (
      isHalf ||
      soulHeartType === HeartSubType.BONE ||
      soulHeartsRemaining < 2
    ) {
      // Fix the bug where a half soul heart to the left of a bone heart will be treated as a full
      // soul heart.
      addAmount = 1;
    }

    switch (soulHeartType) {
      case HeartSubType.SOUL: {
        player.AddSoulHearts(addAmount);
        soulHeartsRemaining -= addAmount;
        break;
      }

      case HeartSubType.BLACK: {
        player.AddBlackHearts(addAmount);
        soulHeartsRemaining -= addAmount;
        break;
      }

      case HeartSubType.BONE: {
        player.AddBoneHearts(addAmount);
        break;
      }
    }
  }

  /**
   * Fill in the red heart containers.
   *
   * Rotten Hearts must be filled in first in order for this to work properly, since they conflict
   * with half red hearts.
   *
   * We multiply by two because the `EntityPlayer.GetRottenHearts` function returns the actual
   * number of rotten hearts, but the `EntityPlayer.AddRottenHearts` works like the other heart
   * functions in that a value of 1 is equivalent to a half-heart.
   */
  player.AddRottenHearts(playerHealth.rottenHearts * 2);

  if (character === PlayerType.MAGDALENE_B) {
    // Adding 1 heart to Tainted Magdalene will actually add two hearts.
    repeat(playerHealth.hearts, () => {
      if (player.HasFullHearts()) {
        return;
      }

      const hearts = player.GetHearts();
      const maxHearts = player.GetMaxHearts();
      if (hearts === maxHearts - 1) {
        player.AddHearts(1);
        return;
      }

      player.AddHearts(1);
      player.AddHearts(-1);
    });
  } else {
    player.AddHearts(playerHealth.hearts);
  }

  player.AddGoldenHearts(playerHealth.goldenHearts);
  player.AddBrokenHearts(playerHealth.brokenHearts);

  // Set the Bethany / Tainted Bethany charges.
  if (character === PlayerType.BETHANY) {
    player.SetSoulCharge(playerHealth.soulCharges);
  } else if (character === PlayerType.BETHANY_B) {
    player.SetBloodCharge(playerHealth.bloodCharges);
  }

  // Re-add the Alabaster Box, if present.
  for (const { activeSlot, totalCharge } of alabasterBoxDescriptions) {
    setActiveItem(
      player,
      CollectibleType.ALABASTER_BOX,
      activeSlot,
      totalCharge,
    );
  }
}

/**
 * Helper function to see if a certain damage amount would deal "permanent" damage to Tainted
 * Magdalene.
 *
 * Tainted Magdalene has "permanent" health and "temporary" health. When standing still and doing
 * nothing, all of Tainted Magdalene's temporary health will eventually go away.
 *
 * Before using this function, it is expected that you check to see if the player is Tainted
 * Magdalene first, or else it will give a nonsensical result.
 */
export function wouldDamageTaintedMagdaleneNonTemporaryHeartContainers(
  player: EntityPlayer,
  damageAmount: float,
): boolean {
  // Regardless of the damage amount, damage to a player cannot remove a soul heart and a red heart
  // at the same time.
  const soulHearts = player.GetSoulHearts();
  if (soulHearts > 0) {
    return false;
  }

  // Regardless of the damage amount, damage to a player cannot remove a bone heart and a red heart
  // at the same time.
  const boneHearts = player.GetBoneHearts();
  if (boneHearts > 0) {
    return false;
  }

  // Account for rotten hearts eating away at more red hearts than usual.
  const hearts = player.GetHearts();
  const rottenHearts = player.GetRottenHearts();
  const effectiveDamageAmount =
    damageAmount + Math.min(rottenHearts, damageAmount);

  const heartsAfterDamage = hearts - effectiveDamageAmount;
  const nonTemporaryMaxHearts =
    getTaintedMagdaleneNonTemporaryMaxHearts(player);
  return heartsAfterDamage < nonTemporaryMaxHearts;
}
