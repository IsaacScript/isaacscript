import { ModUpgradedBase } from "../classes/ModUpgradedBase";
import { Feature } from "../classes/private/Feature";
import { ISCFeature } from "../enums/ISCFeature";
import { ISCFeatureToClass } from "../features";
import { PublicInterface } from "./PublicInterface";
import { TupleToIntersection } from "./TupleToIntersection";
import { Writeable } from "./Writable";

/**
 * `isaacscript-common` has many custom callbacks that you can use in your mods. Instead of
 * hijacking the vanilla `Mod` object, we provide a `ModUpgraded` object for you to use, which
 * extends the base class and adds a new method of `AddCallbackCustom`.
 *
 * To upgrade your mod, use the `upgradeMod` helper function.
 *
 * By specifying one or more optional features, end-users will get a version of `ModUpgraded` that
 * has extra methods corresponding to the features that were specified.
 */
export type ModUpgraded<T extends readonly ISCFeature[] = []> =
  ModUpgradedBase & ISCFeaturesToKeys<T>;

/**
 * We want to only extract the class public methods, so we omit the keys of the `Feature` base
 * class.
 */
type ISCFeaturesToKeys<T extends readonly ISCFeature[]> = Omit<
  TupleToIntersection<ISCFeatureTupleToClassTuple<Writeable<T>>>,
  keyof Feature
>;

/**
 * We need to use the `PublicInterface` helper type because an intersection of two classes with the
 * same private fields will cause a `never` type.
 */
type ISCFeatureTupleToClassTuple<T extends ISCFeature[]> = {
  [K in keyof T]: PublicInterface<ISCFeatureToClass[T[K]]>;
};
