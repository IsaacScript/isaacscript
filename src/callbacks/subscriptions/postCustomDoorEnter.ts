export type PostCustomDoorEnterCallbackType = (
  player: EntityPlayer,
  effectVariant: int,
  doorSlot: DoorSlot,
  direction: Direction,
) => void;

const subscriptions: Array<
  [PostCustomDoorEnterCallbackType, DoorVariant | int | undefined]
> = [];

/** @internal */
export function postCustomDoorEnterHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postCustomDoorEnterRegister(
  callback: PostCustomDoorEnterCallbackType,
  effectVariant?: int,
): void {
  subscriptions.push([callback, effectVariant]);
}

/** @internal */
export function postCustomDoorEnterFire(
  player: EntityPlayer,
  effectVariant: int,
  doorSlot: DoorSlot,
  direction: Direction,
): void {
  for (const [callback, callbackEffectVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (
      callbackEffectVariant !== undefined &&
      callbackEffectVariant !== effectVariant
    ) {
      continue;
    }

    callback(player, effectVariant, doorSlot, direction);
  }
}
