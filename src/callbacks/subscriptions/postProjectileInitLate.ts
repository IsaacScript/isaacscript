export type PostProjectileInitLateCallbackType = (
  projectile: EntityProjectile,
) => void;

const subscriptions: Array<
  [PostProjectileInitLateCallbackType, ProjectileVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostProjectileInitLateCallbackType,
  projectileVariant?: ProjectileVariant,
): void {
  subscriptions.push([callback, projectileVariant]);
}

export function fire(projectile: EntityProjectile): void {
  for (const [callback, projectileVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      projectileVariant !== undefined &&
      projectileVariant !== projectile.Variant
    ) {
      continue;
    }

    callback(projectile);
  }
}
