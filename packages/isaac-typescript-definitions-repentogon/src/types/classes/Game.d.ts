import type {
  EntityType,
  StageTransitionType,
} from "isaac-typescript-definitions";
import type { PauseMenuState } from "../../enums/PauseMenuState";
import type { DebugFlag } from "../../enums/flags/DebugFlag";

declare global {
  interface Game extends IsaacAPIClass {
    AchievementUnlocksDisallowed: () => boolean;
    AddDebugFlags: (flags: BitFlags<DebugFlag>) => void;
    DevolveEnemy: (enemy: Entity) => void;
    GetChallengeParams: () => ChallengeParams;
    GetCurrentColorModifier: () => ColorModifier;
    GetDebugFlags: () => BitFlags<DebugFlag>;
    GetLerpColorModifier: () => ColorModifier;
    GetPauseMenuState: () => PauseMenuState;
    GetPlanetariumsVisited: () => int;
    GetTargetColorModifier: () => ColorModifier;

    /**
     * @param entity
     * @param entityType
     * @param variant Optional. Default is -1.
     * @param subType Optional. Default is -1.
     */
    IsErased:
      | ((entity: Entity) => boolean)
      | ((entityType: EntityType, variant?: int, subType?: int) => boolean);

    IsGreedBoss: () => boolean;
    IsGreedFinalBoss: () => boolean;
    IsHardMode: () => boolean;
    IsPauseMenuOpen: () => boolean;
    IsRerun: () => boolean;

    /**
     * @param colorModifier
     * @param lerp Optional. Default is true.
     * @param rate Optional. Default is 0.015.
     */
    SetColorModifier: (
      colorModifier: ColorModifier,
      lerp?: boolean,
      rate?: number,
    ) => void;

    SetDonationModAngel: (amount: int) => void;
    SetDonationModGreed: (amount: int) => void;
    ShowGenericLeaderboard: () => void;

    /**
     * @param position
     * @param radius Optional. Default is 1.
     */
    SpawnBombCrater: (position: Vector, radius?: number) => void;

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
