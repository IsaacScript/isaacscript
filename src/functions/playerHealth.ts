import { MAX_PLAYER_HEART_CONTAINERS } from "../constants";
import { PlayerHealth } from "../types/PlayerHealth";

// Testing snippets:
// lua local p = Isaac.GetPlayer() p:AddEternalHearts(1) p:AddBoneHearts(1) p:Update() p:AddRottenHearts(1) p:AddBlackHearts(2) p:AddSoulHearts(2) p:AddBoneHearts(1) p:AddBlackHearts(3) p:AddBrokenHearts(2)
// lua local p = Isaac.GetPlayer() p:AddEternalHearts(-1) p:AddBoneHearts(-1) p:AddRottenHearts(-1) p:AddBlackHearts(-2) p:AddSoulHearts(-2) p:AddBoneHearts(-1) p:AddBlackHearts(-3) p:AddBrokenHearts(-2)

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
  const brokenHearts = player.GetBrokenHearts();
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

  // Rotten Hearts are included in the hearts value, so strip them out
  hearts -= rottenHearts * 2;

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
    eternalHearts,
    soulHearts,
    boneHearts,
    goldenHearts,
    rottenHearts,
    brokenHearts,
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

  removeAllPlayerHealth(player);

  // Add the red heart containers
  if (character === PlayerType.PLAYER_THESOUL && subPlayer !== undefined) {
    // Adding health to The Soul is a special case
    subPlayer.AddMaxHearts(playerHealth.maxHearts, false);
  } else {
    player.AddMaxHearts(playerHealth.maxHearts, false);
  }

  // Add the eternal hearts
  player.AddEternalHearts(playerHealth.eternalHearts);

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
  // (Rotten Hearts must be filled in first in order for this to work properly,
  // since they conflict with half red hearts)
  player.AddRottenHearts(playerHealth.rottenHearts);
  player.AddHearts(playerHealth.hearts);
  player.AddGoldenHearts(playerHealth.goldenHearts);
  player.AddBrokenHearts(playerHealth.brokenHearts);
}

export function removeAllPlayerHealth(player: EntityPlayer): void {
  const goldenHearts = player.GetGoldenHearts();
  const boneHearts = player.GetBoneHearts();
  const brokenHearts = player.GetBrokenHearts();

  // To avoid bugs, we have to remove the exact amount of certain types of hearts
  // We remove Golden Hearts first so that they don't break
  player.AddGoldenHearts(goldenHearts * -1);
  player.AddBoneHearts(boneHearts * -1);
  player.AddBrokenHearts(brokenHearts * -1);
  player.AddMaxHearts(MAX_PLAYER_HEART_CONTAINERS * -2, true);
  player.AddSoulHearts(MAX_PLAYER_HEART_CONTAINERS * -2);
}
