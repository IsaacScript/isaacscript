export type PostLaserInitLateRegisterParameters = [
  callback: (laser: EntityLaser) => void,
  laserVariant?: LaserVariant | int,
];

const subscriptions: PostLaserInitLateRegisterParameters[] = [];

/** @internal */
export function postLaserInitLateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postLaserInitLateRegister(
  ...args: PostLaserInitLateRegisterParameters
): void {
  subscriptions.push(args);
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
