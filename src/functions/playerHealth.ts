import { CHARACTERS_WITH_NO_RED_HEARTS } from "../constants";
import { PlayerHealth } from "../types/PlayerHealth";

/**
 * Helper function to get an inventory of the player's health. Use this in combination with the
 * `setPlayerHealth` function to restore the player's health back to a certain configuration at a
 * later time.
 *
 * This is based on the `REVEL.StoreHealth()` function in the Revelations mod.
 */
export function getPlayerHealth(player: EntityPlayer): PlayerHealth {
  const character = player.GetPlayerType();
  const soulHeartTypes: HeartSubType[] = [];
  let maxHearts = player.GetMaxHearts();
  let hearts = player.GetHearts();
  let soulHearts = player.GetSoulHearts();
  let boneHearts = player.GetBoneHearts();
  const goldenHearts = player.GetGoldenHearts();
  const eternalHearts = player.GetEternalHearts();
  const rottenHearts = player.GetRottenHearts();
  const subPlayer = player.GetSubPlayer();

  // The Forgotten and The Soul has special health, so we need to account for this
  if (character === PlayerType.PLAYER_THEFORGOTTEN && subPlayer !== undefined) {
    // The Forgotten does not have red heart containers
    maxHearts = boneHearts * 2;
    boneHearts = 0;

    // The Forgotten will always have 0 soul hearts;
    // we need to get the soul heart amount from the sub player
    soulHearts = subPlayer.GetSoulHearts();
  } else if (
    character === PlayerType.PLAYER_THESOUL &&
    subPlayer !== undefined
  ) {
    // The Soul will always have 0 bone hearts;
    // we need to get the bone heart amount from the sub player
    // We need to store it as "maxHearts" instead of "boneHearts"
    maxHearts = subPlayer.GetBoneHearts() * 2;
    hearts = subPlayer.GetHearts();
  }

  // Eternal Hearts will be lost since we are about to change floors,
  // so convert it to other types of health
  // "eternalHearts" will be equal to 1 if we have an Eternal Heart
  if (CHARACTERS_WITH_NO_RED_HEARTS.has(character)) {
    soulHearts += eternalHearts * 2;
  } else {
    maxHearts += eternalHearts * 2;
    hearts += eternalHearts * 2;
  }

  // This is the number of individual hearts shown in the HUD, minus heart containers
  const extraHearts = math.ceil(soulHearts / 2) + boneHearts;

  // Since bone hearts can be inserted anywhere between soul hearts,
  // we need a separate counter to track which soul heart we're currently at
  let currentSoulHeart = 0;

  for (let i = 0; i < extraHearts; i++) {
    let isBoneHeart = player.IsBoneHeart(i);
    if (
      character === PlayerType.PLAYER_THEFORGOTTEN &&
      subPlayer !== undefined
    ) {
      isBoneHeart = subPlayer.IsBoneHeart(i);
    }
    if (isBoneHeart) {
      soulHeartTypes.push(HeartSubType.HEART_BONE);
    } else {
      // We need to add 1 here because only the second half of a black heart is considered black
      let isBlackHeart = player.IsBlackHeart(currentSoulHeart + 1);
      if (
        character === PlayerType.PLAYER_THEFORGOTTEN &&
        subPlayer !== undefined
      ) {
        isBlackHeart = subPlayer.IsBlackHeart(currentSoulHeart + 1);
      }
      if (isBlackHeart) {
        soulHeartTypes.push(HeartSubType.HEART_BLACK);
      } else {
        soulHeartTypes.push(HeartSubType.HEART_SOUL);
      }

      // Move to the next heart
      currentSoulHeart += 2;
    }
  }

  return {
    soulHeartTypes,
    maxHearts,
    hearts,
    soulHearts,
    boneHearts,
    goldenHearts,
    rottenHearts,
  };
}

/**
 * Helper function to set a player's health to a specific state. You can use this in combination
 * with the `getPlayerHealth` function to restore the player's health back to a certain
 * configuration at a later time.
 *
 * Based on the `REVEL.LoadHealth()` function in the Revelations mod.
 */
export function setPlayerHealth(
  player: EntityPlayer,
  playerHealth: PlayerHealth,
): void {
  const character = player.GetPlayerType();
  const subPlayer = player.GetSubPlayer();
  const goldenHearts = player.GetGoldenHearts();

  // Remove all existing health
  player.AddGoldenHearts(goldenHearts * -1);
  // (we have to remove the exact amount of Golden Hearts or else it will bug out)
  // (we remove Golden Hearts first so that they don't break)
  player.AddMaxHearts(-24, true);
  player.AddSoulHearts(-24);
  player.AddBoneHearts(-24);

  // Add the red heart containers
  if (character === PlayerType.PLAYER_THESOUL && subPlayer !== undefined) {
    // Adding health to The Soul is a special case
    subPlayer.AddMaxHearts(playerHealth.maxHearts, false);
  } else {
    player.AddMaxHearts(playerHealth.maxHearts, false);
  }

  // Add the soul / black / bone hearts
  let soulHeartsRemaining = playerHealth.soulHearts;
  for (let i = 1; i <= playerHealth.soulHeartTypes.length; i++) {
    const heartType = playerHealth.soulHeartTypes[i - 1];
    const isHalf =
      playerHealth.soulHearts + playerHealth.boneHearts * 2 < i * 2;
    let addAmount = 2;
    if (
      isHalf ||
      heartType === HeartSubType.HEART_BONE ||
      soulHeartsRemaining < 2
    ) {
      // Fix the bug where a half soul heart to the left of a bone heart will be treated as a full
      // soul heart
      addAmount = 1;
    }

    if (heartType === HeartSubType.HEART_SOUL) {
      player.AddSoulHearts(addAmount);
      soulHeartsRemaining -= addAmount;
    } else if (heartType === HeartSubType.HEART_BLACK) {
      player.AddBlackHearts(addAmount);
      soulHeartsRemaining -= addAmount;
    } else if (heartType === HeartSubType.HEART_BONE) {
      player.AddBoneHearts(addAmount);
    }
  }

  // Fill in the red heart containers
  player.AddHearts(playerHealth.hearts);
  player.AddGoldenHearts(playerHealth.goldenHearts);
  // (no matter what kind of heart is added, no sounds effects will play)
  player.AddRottenHearts(playerHealth.rottenHearts);
}
