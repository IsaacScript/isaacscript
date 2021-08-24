import { getFinalFrameOfAnimation } from "./sprite";
import { ensureAllCases } from "./util";

enum MysteriousPaperLocation {
  NONE,
  SLOT_1,
  SLOT_2,
  BOTH_SLOTS,
  SMELTED,
}

/**
 * The `EntityPlayer.WillPlayerRevive()` function does not properly account for Mysterious Paper,
 * so use this helper function instead for more robust revival detection.
 */
export function willPlayerRevive(player: EntityPlayer): boolean {
  const mysteriousPaperLocation = getMysteriousPaperLocation(player);
  player.TryRemoveTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER);
  player.TryRemoveTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER);
  // (discount the case where a player has more than 2 Mysterious Papers)

  const willRevive =
    player.WillPlayerRevive() ||
    (mysteriousPaperLocation !== MysteriousPaperLocation.NONE &&
      willMysteriousPaperRevive(player));

  giveMysteriousPaperBack(player, mysteriousPaperLocation);

  return willRevive;
}

function getMysteriousPaperLocation(player: EntityPlayer) {
  const hasMysteriousPaper = player.HasTrinket(
    TrinketType.TRINKET_MYSTERIOUS_PAPER,
  );

  if (!hasMysteriousPaper) {
    return MysteriousPaperLocation.NONE;
  }

  const inSlot1 = player.GetTrinket(0) === TrinketType.TRINKET_MYSTERIOUS_PAPER;
  const inSlot2 = player.GetTrinket(1) === TrinketType.TRINKET_MYSTERIOUS_PAPER;

  if (!inSlot1 && !inSlot2) {
    return MysteriousPaperLocation.SMELTED;
  }

  if (inSlot1 && inSlot2) {
    return MysteriousPaperLocation.BOTH_SLOTS;
  }

  if (inSlot1) {
    return MysteriousPaperLocation.SLOT_1;
  }

  if (inSlot2) {
    return MysteriousPaperLocation.SLOT_2;
  }

  error("Failed to get the Mysterious Paper location.");
  return MysteriousPaperLocation.NONE;
}

function giveMysteriousPaperBack(
  player: EntityPlayer,
  mysteriousPaperLocation: MysteriousPaperLocation,
) {
  switch (mysteriousPaperLocation) {
    case MysteriousPaperLocation.NONE: {
      return;
    }

    case MysteriousPaperLocation.SLOT_1: {
      // If the player was holding two trinkets,
      // then the second trinket has shifted back to the first slot
      // Remove the second trinket first so that the trinkets will go back to the initial order
      const trinketType = player.GetTrinket(0);
      if (trinketType !== 0) {
        player.TryRemoveTrinket(trinketType);
      }
      player.AddTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER);
      if (trinketType !== 0) {
        player.AddTrinket(trinketType);
      }
      return;
    }

    case MysteriousPaperLocation.SLOT_2: {
      player.AddTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER);
      return;
    }

    case MysteriousPaperLocation.BOTH_SLOTS: {
      player.AddTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER);
      player.AddTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER);
      return;
    }

    case MysteriousPaperLocation.SMELTED: {
      const trinket1 = player.GetTrinket(0);
      const trinket2 = player.GetTrinket(1);

      if (trinket1 !== 0) {
        player.TryRemoveTrinket(trinket1);
      }
      if (trinket2 !== 0) {
        player.TryRemoveTrinket(trinket2);
      }

      player.AddTrinket(TrinketType.TRINKET_MYSTERIOUS_PAPER);
      player.UseActiveItem(
        CollectibleType.COLLECTIBLE_SMELTER,
        UseFlag.USE_NOANIM,
      );

      if (trinket1 !== 0) {
        player.AddTrinket(trinket1);
      }
      if (trinket2 !== 0) {
        player.AddTrinket(trinket2);
      }

      return;
    }

    default: {
      ensureAllCases(mysteriousPaperLocation);
    }
  }
}

/**
 * Assuming that we are on the frame of fatal damage, this function returns whether or not
 * Mysterious Paper would rotate to Missing Poster on the frame that the "Game Over" screen would
 * appear (which would subsequently save the player from fatal damage).
 *
 * Mysterious Paper rotates between the 4 items on every frame, in order. The formula for whether
 * Mysterious Paper be Missing Power is: `gameFrameCount % 4 === 3`
 */
export function willMysteriousPaperRevive(player: EntityPlayer): boolean {
  const game = Game();
  const gameFrameCount = game.GetFrameCount();
  const sprite = player.GetSprite();

  // All vanilla characters have a 56 frame death animation, but we might be playing on a modded
  // character that has a custom death animation
  const deathAnimationFrames = getFinalFrameOfAnimation(sprite, "Death");
  const frameOfDeath = gameFrameCount + deathAnimationFrames + 1;
  // (we add 1 because it takes one frame for the death animation to begin)

  return frameOfDeath % 4 === 3;
}
