import { ProjectileVariant } from "isaac-typescript-definitions";

export type PostProjectileInitLateRegisterParameters = [
  callback: (projectile: EntityProjectile) => void,
  projectileVariant?: ProjectileVariant,
];

const subscriptions: PostProjectileInitLateRegisterParameters[] = [];

/** @internal */
export function postProjectileInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postProjectileInitLateRegister(
  ...args: PostProjectileInitLateRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postProjectileInitLateFire(projectile: EntityProjectile): void {
  for (const [callback, projectileVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      projectileVariant !== undefined &&
      projectileVariant !== projectile.Variant
    ) {
      continue;
    }

    callback(projectile);
  }
}
