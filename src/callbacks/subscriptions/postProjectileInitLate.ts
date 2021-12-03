export type PostProjectileInitLateCallbackType = (
  projectile: EntityProjectile,
) => void;

const subscriptions: Array<
  [PostProjectileInitLateCallbackType, ProjectileVariant | int | undefined]
> = [];

/** @internal */
export function postProjectileInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postProjectileInitLateRegister(
  callback: PostProjectileInitLateCallbackType,
  projectileVariant?: ProjectileVariant | int,
): void {
  subscriptions.push([callback, projectileVariant]);
}

/** @internal */
export function postProjectileInitLateFire(projectile: EntityProjectile): void {
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
