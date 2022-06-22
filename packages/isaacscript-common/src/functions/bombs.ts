/** Helper function to find out how large a bomb explosion is based on the damage inflicted. */
export function getBombRadiusFromDamage(damage: float): float {
  if (damage > 175) {
    return 105;
  }

  if (damage <= 140) {
    return 75;
  }

  return 90;
}
