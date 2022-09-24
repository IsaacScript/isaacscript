import { IsaacScriptCommonFeature } from "../../enums/IsaacScriptCommonFeature";
import { SaveData } from "../../interfaces/SaveData";
import {
  CallbackTuple,
  CustomCallbackTuple,
} from "../../types/private/CallbackTuple";

/**
 * The IsaacScript standard library contains many optional features, such as the ability to create
 * custom pickups.
 *
 * Additionally, all custom callbacks extend from this class.
 */
export class Feature {
  initialized = false;

  v?: SaveData;
  featuresUsed?: IsaacScriptCommonFeature[];
  callbacksUsed?: CallbackTuple[];
  customCallbacksUsed?: CustomCallbackTuple[];
}
