import type { LevelStage } from "isaac-typescript-definitions";

declare global {
  interface Seeds extends IsaacAPIClass {
    SetStageSeed: (stage: LevelStage, seed: Seed) => void;
  }
}
