import { ISCFeature } from "../../enums/ISCFeature";
import { SaveData } from "../../interfaces/SaveData";
import {
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
export class Feature {
  initialized = false;

  v?: SaveData;
  featuresUsed?: ISCFeature[];
  callbacksUsed?: CallbackTuple[];
  customCallbacksUsed?: CustomCallbackTuple[];
}
