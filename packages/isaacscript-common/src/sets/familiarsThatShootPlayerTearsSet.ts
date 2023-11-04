import { FamiliarVariant } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const FAMILIARS_THAT_SHOOT_PLAYER_TEARS_SET =
  new ReadonlySet<FamiliarVariant>([
    FamiliarVariant.SCISSORS,
    FamiliarVariant.INCUBUS,
    FamiliarVariant.FATES_REWARD,
    FamiliarVariant.SPRINKLER,
    FamiliarVariant.LOST_SOUL,
    FamiliarVariant.TWISTED_BABY,
    FamiliarVariant.BLOOD_BABY,
    FamiliarVariant.DECAP_ATTACK,
  ]);
