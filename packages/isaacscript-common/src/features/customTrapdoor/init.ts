import { saveDataManager } from "../saveDataManager/exports";
import { CUSTOM_TRAPDOOR_FEATURE_NAME } from "./constants";
import v from "./v";

export function stageTravelInit(): void {
  saveDataManager(CUSTOM_TRAPDOOR_FEATURE_NAME, v);
}
