export type PostLaserInitLateCallbackType = (laser: EntityLaser) => void;

const subscriptions: Array<
  [PostLaserInitLateCallbackType, LaserVariant | undefined]
> = [];

export function hasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function register(
  callback: PostLaserInitLateCallbackType,
  laserVariant?: LaserVariant,
): void {
  subscriptions.push([callback, laserVariant]);
}

export function fire(laser: EntityLaser): void {
  for (const [callback, laserVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (laserVariant !== undefined && laserVariant !== laser.Variant) {
      continue;
    }

    callback(laser);
  }
}
