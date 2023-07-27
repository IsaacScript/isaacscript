import type { ISCFeature } from "../../enums/ISCFeature";
import type { SaveData } from "../../interfaces/SaveData";
import type {
  CallbackTuple,
  CustomCallbackTuple,
} from "../../types/private/CallbackTuple";

/**
 * The IsaacScript standard library contains many optional features, such as the ability to create
 * custom pickups. All features are optional and are only initialized when needed. This class
 * contains elements to facilitate that.
 *
 * Additionally, all custom callbacks extend from this class.
 */
export abstract class Feature {
  /**
   * All features should only be instantiated once and are passed around to other features using
   * dependency injection. We provide a run-time check in order to prevent the bug of any feature
   * accidentally being instantiated twice.
   */
  private static readonly constructedClassNames = new Set<string>();

  /** @internal */
  public initialized = false;

  /** @internal */
  public numConsumers = 0;

  /** @internal */
  public v?: SaveData;

  /** @internal */
  public vConditionalFunc?: () => boolean;

  /** @internal */
  public featuresUsed?: ISCFeature[];

  /** @internal */
  public callbacksUsed?: CallbackTuple[];

  /** @internal */
  public customCallbacksUsed?: CustomCallbackTuple[];

  constructor() {
    if (Feature.constructedClassNames.has(this.constructor.name)) {
      error(
        `Failed to instantiate feature class "${this.constructor.name}" because it has already been instantiated once.`,
      );
    }

    Feature.constructedClassNames.add(this.constructor.name);
  }
}
