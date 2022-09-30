import { MatchingCallbackCustom } from "../../../types/private/MatchingCallbackCustom";
import {
  CustomCallback,
  FireArgs,
  OptionalArgs,
} from "../../private/CustomCallback";

type CallbackSignatureProjectile = (projectile: EntityProjectile) => void;
type ModCallbackCustomProjectile =
  MatchingCallbackCustom<CallbackSignatureProjectile>;

export class CustomCallbackProjectile<
  T extends ModCallbackCustomProjectile,
> extends CustomCallback<T> {
  // eslint-disable-next-line class-methods-use-this
  protected override shouldFire(
    fireArgs: FireArgs<T>,
    optionalArgs: OptionalArgs<T>,
  ): boolean {
    const [callbackProjectileVariant] = optionalArgs;
    if (callbackProjectileVariant === undefined) {
      return true;
    }

    const [projectile] = fireArgs;
    return projectile.Variant === callbackProjectileVariant;
  }
}
