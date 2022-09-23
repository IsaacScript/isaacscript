import { IsaacScriptCommonFeature2 } from "../enums/IsaacScriptCommonFeature2";
import { SaveData } from "../interfaces/SaveData";
import {
  CallbackTuple,
  CustomCallbackTuple,
} from "../types/private/CallbackTuple";

/**
 * The IsaacScript standard library contains many optional features, such as the ability to create
 * custom pickups.
 */
export class Feature {
  initialized = false;

  v?: SaveData;
  featuresUsed?: IsaacScriptCommonFeature2[];
  callbacksUsed?: CallbackTuple[];
  customCallbacksUsed?: CustomCallbackTuple[];
}
