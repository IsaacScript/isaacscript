import type {
  Challenge,
  PlayerType,
  WeaponType,
} from "isaac-typescript-definitions";
import type { CompletionMarkDifficulty } from "../../enums/CompletionMarkDifficulty";
import type { TaintedMarksGroup } from "../../enums/TaintedMarksGroup";

declare global {
  /** @noSelf */
  namespace Isaac {
    /**
     * Returns whether the specified character has completed all marks and returns the highest
     * difficulty it was accomplished in.
     */
    function AllMarksFilled(character: PlayerType): CompletionMarkDifficulty;

    /**
     * Returns whether the specified character has completed all the tainted unlock-related marks
     * and returns the highest difficulty it was accomplished in.
     */
    function AllTaintedCompletion(
      character: PlayerType,
      group: TaintedMarksGroup,
    ): CompletionMarkDifficulty;

    /** Returns whether the game can start coop. */
    function CanStartTrueCoop(): boolean;

    /**
     * Attempts to move the windows mouse cursor to the center of the game's window. This method
     * does nothing if the Isaac.exe window is out of focus.
     */
    function CenterCursor(): void;

    /**
     * Removes all projectiles in the room.
     *
     * @param ignoreNPCs Optional. If false, all NPCs in the room that aren't friendly and are
     *                   capable of keeping the doors closed are killed. Default is false.
     */
    function ClearBossHazards(ignoreNPCs?: EntityNPC): void;

    /** Sets the specified challenge as completed. */
    function ClearChallenge(challenge: Challenge): void;

    /**
     * Removes all completion marks from the specified character.
     *
     * This does not remove their unlocks or achievements.
     */
    function ClearCompletionMarks(character: PlayerType): void;

    /**
     * Spawns a timer effect.
     *
     * The timer is called every game update, meaning only frames in which the game is actively
     * running and not paused are taken into consideration.
     *
     * If your use case requires a timer that takes paused time into account, stick with a custom
     * timer running on a render callback.
     *
     * @param callback Ran after `interval` amount of frames has passed.
     * @param interval The interval in frames for `callback` to be ran.
     * @param persistent Whether the timer persists across rooms.
     */
    function CreateTimer(
      callback: () => void,
      interval: int,
      persistent: boolean,
    ): EntityEffect;

    /**
     * Creates a weapon and returns it.
     *
     * The weapon is not automatically usable. You must call `Isaac.GetWeaponType` after using this
     * method.
     */
    function CreateWeapon(weaponType: WeaponType, owner: Entity): Weapon;

    /** Destroys the specified weapon. */
    function DestroyWeapon(weapon: Weapon): void;

    /**
     * Draws a line between two positions.
     *
     * This method must be called in a render callback.
     */
    function DrawLine(
      startPos: Vector,
      endPos: Vector,
      startColor: KColor,
      endColor: KColor,
      thickness: int,
    ): void;

    /**
     * Draws a quadrilateral from the four positions.
     *
     * This method must be called in a render callback.
     */
  }
}
