import type { LevelStage } from "isaac-typescript-definitions";

declare global {
  interface Seeds extends IsaacAPIClass {
    readonly SetStageSeed: (stage: LevelStage, seed: Seed) => void;
  }
}
