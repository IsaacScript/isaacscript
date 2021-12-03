/** @internal */
export type PostLaserInitLateCallbackType = (laser: EntityLaser) => void;

const subscriptions: Array<
  [PostLaserInitLateCallbackType, LaserVariant | int | undefined]
> = [];

/** @internal */
export function postLaserInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postLaserInitLateRegister(
  callback: PostLaserInitLateCallbackType,
  laserVariant?: LaserVariant | int,
): void {
  subscriptions.push([callback, laserVariant]);
}

/** @internal */
export function postLaserInitLateFire(laser: EntityLaser): void {
  for (const [callback, laserVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (laserVariant !== undefined && laserVariant !== laser.Variant) {
      continue;
    }

    callback(laser);
  }
}
