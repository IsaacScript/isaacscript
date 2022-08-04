import { errorIfFeaturesNotInitialized } from "../featuresInitialized";

const FEATURE_NAME = "customPickup";

export function customPickupInit(): void {}

export function registerCustomPickup(): void {
  errorIfFeaturesNotInitialized(FEATURE_NAME);
}
