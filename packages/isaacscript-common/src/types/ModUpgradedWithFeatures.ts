import { ModUpgraded } from "../classes/ModUpgraded";
import { Feature } from "../classes/private/Feature";
import { ISCFeature } from "../enums/ISCFeature";
import { ISCFeatureToClass } from "../features";
import { PublicInterface } from "./PublicInterface";
import { TupleToUnion } from "./TupleToUnion";
import { UnionToIntersection } from "./UnionToIntersection";
import { Writeable } from "./Writable";

type ISCFeatureTupleToClassTuple<T extends ISCFeature[]> = {
  [K in keyof T]: PublicInterface<ISCFeatureToClass[T[K]]>;
};

/**
 * By specifying one or more optional features, end-users will get a version of `ModUpgraded` that
 * has extra methods corresponding to the features that were specified.
 */
// We have to explicitly account for the empty array case, since the `never` will mess up the union.
export type ModUpgradedWithFeatures<T extends readonly ISCFeature[]> =
  ModUpgraded &
    Omit<
      UnionToIntersection<
        TupleToUnion<ISCFeatureTupleToClassTuple<Writeable<T>>>
      >,
      keyof Feature
    >;
