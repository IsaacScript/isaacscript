import type {
  EntityType,
  StageTransitionType,
} from "isaac-typescript-definitions";
import type { CompletionMarkType } from "../../enums/CompletionMarkType";
import type { PauseMenuState } from "../../enums/PauseMenuState";
import type { DebugFlag } from "../../enums/flags/DebugFlag";

declare global {
  interface Game extends IsaacAPIClass {
    /**
     * Returns whether achievements cannot be unlocked in this run.
     *
     * Achievements can be blocked for a variety of reasons, such as:
     *  - The player playing on a challenge.
     *  - The player is doing a victory lap.
     *  - The player is playing on a seeded run.
     */
    AchievementUnlocksDisallowed: () => boolean;

    /** Enables one or more debug flags. */
    AddDebugFlags: (flags: BitFlag | BitFlags<DebugFlag>) => void;

    /** Increases the unique amount of shops visited in this run. */
    AddShopVisits: (count: int) => void;

    /**
     * Clears the list of enemies that were erased by the Eraser item, allowing them to appear
     * again.
     */
    ClearErasedEnemies: () => void;

    /** Devolves the provided enemy as if the D10 was used on them. */
    DevolveEnemy: (enemy: Entity) => void;

    /** Returns the `ChallengeParams` object for the current run. */
    GetChallengeParams: () => ChallengeParams;

    /**
     * Returns a copy of the current color correction. This represents the vaw color values being
     * used globally, which may be influenced by items such as Astral Projection.
     *
     * The returned `ColorModifier` do not necessarily reflect the specific color correction being
     * applied in the current room. To get the current room's color correction, use
     * `FXParams.ColorModifier`.
     */
    GetCurrentColorModifier: () => ColorModifier;

    /** Returns a bitmask of the currently enabled debug flags. */
    GetDebugFlags: () => BitFlags<DebugFlag>;

    /** Returns the current level of dizziness applied to the screen. */
    GetDizzyAmount: () => number;

    /** Returns the currently active `GenericPrompt` object. */
    GetGenericPrompt: () => GenericPrompt;

    /**
     * Returns the transitioning color modifier. This is formatted as the absolute rate of change,
     * with all values are positive.
     */
    GetLerpColorModifier: () => ColorModifier;

    /** Returns the current state of the pause menu. */
    GetPauseMenuState: () => PauseMenuState;

    /** Returns the number of unique planetariums visited during the current run. */
    GetPlanetariumsVisited: () => int;

    /** Returns the number of unique shops visited during the current run. */
    GetShopVisits: () => int;

    /**
     * Returns the target color modifier if the game is currently transitioning between two color
     * modifiers. Otherwise, returns the current color modifier.
     */
    GetTargetColorModifier: () => ColorModifier;

    /**
     * Returns whether the entity has been erased by the Eraser item.
     *
     * @param entity
     * @param entityType
     * @param variant Optional. Default is -1.
     * @param subType Optional. Default is -1.
     */
    IsErased:
      | ((entity: Entity) => boolean)
      | ((entityType: EntityType, variant?: int, subType?: int) => boolean);

    /** Returns whether the current wave is a boss wave in Greed Mode. */
    IsGreedBoss: () => boolean;

    /** Returns whether the current wave is the optional "nightmare" wave in Greed Mode. */
    IsGreedFinalBoss: () => boolean;

    /** Returns whether the current game mode is Hard Mode or Greedier. */
    IsHardMode: () => boolean;

    /** Returns whether the pause menu is currently opened. */
    IsPauseMenuOpen: () => boolean;

    /** Returns whether the run is a "re-run", meaning the player manually set the seed. */
    IsRerun: () => boolean;

    /**
     * Records the provided completion type for all players in the current run, unlocking the
     * relevant achievements and giving them the relevant completion mark.
     */
    RecordPlayerCompletion: (completionType: CompletionMarkType) => void;

    /** Sets the bloom amount for a certain duration. */
    SetBloom: (duration: number, amount: number) => void;

    /**
     * Sets the game's current color modifier.
     *
     * @param colorModifier
     * @param lerp Optional. If true, the game will smoothly transition to the new color modifier.
     *             Default is true.
     * @param rate Optional. The rate at which the colors transition. Default is 0.015.
     */
    SetColorModifier: (
      colorModifier: ColorModifier,
      lerp?: boolean,
      rate?: number,
    ) => void;

    /**
     * Sets current dizziness amount, the effect normally used by Wavy Cap.
     *
     * @param targetIntensity
     * @param currentIntensity Optional. If defined, the current intensity is set to this value
     *                         before transitioning to the target intensity. Default is undefined.
     */
    SetDizzyAmount: (
      targetIntensity: number,
      currentIntensity?: number,
    ) => void;

    SetDonationModAngel: (amount: int) => void;
    SetDonationModGreed: (amount: int) => void;

    ShowGenericLeaderboard: () => void;

    /**
     * Spawns a bomb crater. The spawned bomb crater is returned.
     *
     * @param position
     * @param radius Optional. Default is 1.
     */
    SpawnBombCrater: (position: Vector, radius?: number) => Entity;

    /**
     * Repentogon's modified `Game.StartStageTransition` method.
     *
     * This method has been renamed to include "Ex" so it can not conflict with the vanilla type
     * definitions. However, when the project compiles the method's name will change to what it's
     * supposed to be.
     *
     * @customName StartStageTransition
     */
    StartStageTransitionEx: (
      sameStage: boolean,
      stageTransitionType: StageTransitionType,
      player: EntityPlayer | undefined,
    ) => void;
  }
}
