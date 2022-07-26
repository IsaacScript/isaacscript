import {
  ActiveSlot,
  CollectibleType,
  HeartSubType,
  PlayerType,
} from "isaac-typescript-definitions";
import { MAX_PLAYER_HEART_CONTAINERS } from "../constants";
import { HealthType } from "../enums/HealthType";
import { PlayerHealth, SoulHeartType } from "../interfaces/PlayerHealth";
import { getTotalCharge } from "./charge";
import { getEnumValues } from "./enums";
import {
  getPlayerBlackHearts,
  getPlayerHearts,
  getPlayerSoulHearts,
  isCharacter,
  setActiveItem,
} from "./players";

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
  if (character === PlayerType.THE_FORGOTTEN && subPlayer !== undefined) {
    // The Forgotten does not have red heart containers.
    maxHearts = boneHearts * 2;
    boneHearts = 0;

    // The Forgotten will always have 0 soul hearts; we need to get the soul heart amount from the
    // sub player.
    soulHearts = subPlayer.GetSoulHearts();
  } else if (character === PlayerType.THE_SOUL && subPlayer !== undefined) {
    // The Soul will always have 0 bone hearts; we need to get the bone heart amount from the sub
    // player. We need to store it as "maxHearts" instead of "boneHearts".
    maxHearts = subPlayer.GetBoneHearts() * 2;
    hearts = subPlayer.GetHearts();
  }

  // This is the number of individual hearts shown in the HUD, minus heart containers.
  const extraHearts = math.ceil(soulHearts / 2) + boneHearts;

  // Since bone hearts can be inserted anywhere between soul hearts, we need a separate counter to
  // track which soul heart we're currently at.
  let currentSoulHeart = 0;

  const soulHeartTypes: SoulHeartType[] = [];
  for (let i = 0; i < extraHearts; i++) {
    let isBoneHeart = player.IsBoneHeart(i);
    if (character === PlayerType.THE_FORGOTTEN && subPlayer !== undefined) {
      isBoneHeart = subPlayer.IsBoneHeart(i);
    }
    if (isBoneHeart) {
      soulHeartTypes.push(HeartSubType.BONE);
    } else {
      // We need to add 1 here because only the second half of a black heart is considered black.
      let isBlackHeart = player.IsBlackHeart(currentSoulHeart + 1);
      if (character === PlayerType.THE_FORGOTTEN && subPlayer !== undefined) {
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

/** Returns a `PlayerHealth` object with all 0s. */
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
  if (isCharacter(player, PlayerType.THE_SOUL)) {
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

  removeAllPlayerHealth(player);

  // Before we add any health, we have to take away Alabaster Box, if present.
  const alabasterBoxes: Array<[slot: ActiveSlot, totalCharge: int]> = [];
  if (player.HasCollectible(CollectibleType.ALABASTER_BOX)) {
    for (const activeSlot of getEnumValues(ActiveSlot)) {
      const activeItem = player.GetActiveItem();
      if (activeItem === CollectibleType.ALABASTER_BOX) {
        const totalCharge = getTotalCharge(player, activeSlot);
        setActiveItem(player, CollectibleType.NULL, activeSlot);
        alabasterBoxes.push([activeSlot, totalCharge]);
      }
    }
  }

  // Add the red heart containers.
  if (character === PlayerType.THE_SOUL && subPlayer !== undefined) {
    // Adding health to The Soul is a special case.
    subPlayer.AddMaxHearts(playerHealth.maxHearts, false);
  } else {
    player.AddMaxHearts(playerHealth.maxHearts, false);
  }

  // Add the eternal hearts.
  player.AddEternalHearts(playerHealth.eternalHearts);

  // Add the soul / black / bone hearts.
  let soulHeartsRemaining = playerHealth.soulHearts;
  playerHealth.soulHeartTypes.forEach((soulHeartType, i) => {
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
  });

  /**
   * Fill in the red heart containers.
   *
   * (Rotten Hearts must be filled in first in order for this to work properly, since they conflict
   * with half red hearts.)
   *
   * The `EntityPlayer.AddRottenHearts` method is not like actually picking up a rotten heart, since
   * it will only grant one rotten heart to Tainted Magdalene (whereas picking up a rotten heart
   * would grant two).
   */
  player.AddRottenHearts(playerHealth.rottenHearts);

  if (character === PlayerType.MAGDALENE_B) {
    // Adding 1 heart to Tainted Magdalene will actually add two hearts.
    const effectiveHearts = playerHealth.hearts / 2;
    player.AddHearts(effectiveHearts);
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
  for (const [activeSlot, totalCharge] of alabasterBoxes) {
    setActiveItem(
      player,
      CollectibleType.ALABASTER_BOX,
      activeSlot,
      totalCharge,
    );
  }
}
