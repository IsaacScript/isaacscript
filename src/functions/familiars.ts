import { FAMILIARS_THAT_SHOOT_PLAYER_TEARS } from "../constants";

export function isFamiliarThatShootsPlayerTears(
  familiar: EntityFamiliar,
): boolean {
  return FAMILIARS_THAT_SHOOT_PLAYER_TEARS.has(familiar.Type);
}
