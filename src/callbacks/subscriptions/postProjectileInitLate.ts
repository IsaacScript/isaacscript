export type PostProjectileInitLateCallbackType = (
  projectile: EntityProjectile,
) => void;

const subscriptions: Array<
  [PostProjectileInitLateCallbackType, ProjectileVariant | int | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostProjectileInitLateCallbackType,
  projectileVariant?: ProjectileVariant | int,
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
