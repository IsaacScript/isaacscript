let featuresInitialized = false;

/** @internal */
export function areFeaturesInitialized(): boolean {
  return featuresInitialized;
}

/** @internal */
export function setFeaturesInitialized(): void {
  featuresInitialized = true;
}
