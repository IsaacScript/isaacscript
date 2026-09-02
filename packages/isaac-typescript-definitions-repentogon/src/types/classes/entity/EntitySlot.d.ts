import type { CollectibleType } from "isaac-typescript-definitions";
import type { CoinJamAnimation } from "../../../enums/CoinJamAnimation";
import type { SlotState } from "../../../enums/SlotState";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare global {
  interface EntitySlot extends Entity {
    /** Forces the slot to drop what it typically would drop if blown up. */
    readonly CreateDropsFromExplosion: () => void;

    /**
     * Returns the slot's donation value. The donation value varies on the slot's variant:
     *
     *  - Beggar: How many coins have been donated.
     *  - Demon Beggar: How many hearts have been donated.
     *  - Battery Bum and Rotten Beggar: Increases with each payment by random amounts, up to 3. It
     *    is reset back to 0 upon giving a reward.
     *  - For every other variant, it is 0.
     *
     * The donation value can be overridden by using `EntitySlot.SetDonationValue`.
     */
    readonly GetDonationValue: () => int;

    /**
     * Returns the collectible that the slot will pay out with. This is only used by Crane Game and
     * Hell Game.
     */
    readonly GetPrizeCollectible: () => CollectibleType;

    readonly GetPrizeSprite: () => Sprite;

    /** Returns the slot's prize type. */
    readonly GetPrizeType: () => int;

    /**
     * Returns the index used by Shell Game and Hell Game used to determine which animation to play.
     */
    readonly GetShellGameAnimationIndex: () => int;

    /** Returns the slot's state. */
    readonly GetState: () => SlotState;

    /** Returns the timeout in frames until the slot determines its prize. */
    readonly GetTimeout: () => int;

    /**
     * Returns how many frames a player has been touching the slot. This is reset once no player is
     * touching it.
     */
    readonly GetTouch: () => int;

    /**
     * Returns the slot's trigger timer number. This is only used by Bomb Bums and Reroll Machines.
     */
    readonly GetTriggerTimerNum: () => int;

    /** Returns a random coin jam animation name. */
    readonly RandomCoinJamAnim: () => CoinJamAnimation;

    /** Sets the slot's donation value. */
    readonly SetDonationValue: (value: int) => void;

    /**
     * Sets the collectible that the slot will pay out with. This is only used by Crane Game and
     * Hell Game.
     */
    readonly SetPrizeCollectible: (collectible: CollectibleType) => void;

    /** Sets the slot's prize type. */
    readonly SetPrizeType: (prizeType: int) => void;

    /**
     * Sets the index used by Shell Game and Hell game to determine which prize animation to play.
     */
    readonly SetShellGameAnimationIndex: (index: int) => void;

    /** Sets the slot's state. */
    readonly SetState: (state: SlotState) => void;

    /** Sets the slot's timeout. */
    readonly SetTimeout: (timeout: int) => void;

    /**
     * Sets how many frames a player has been touching the slot. This is reset to 0 once no players
     * are touching the slot.
     */
    readonly SetTouch: (duration: int) => void;

    /** Sets the slot's trigger timer number. */
    readonly SetTriggerTimerNum: (timerNum: int) => void;
  }
}
