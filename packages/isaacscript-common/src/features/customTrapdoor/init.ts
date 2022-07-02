import { saveDataManager } from "../saveDataManager/exports";
import { STAGE_TRAVEL_FEATURE_NAME } from "./constants";
import v from "./v";

export function stageTravelInit(): void {
  saveDataManager(STAGE_TRAVEL_FEATURE_NAME, v);
}
