let initialized = false;

/** @internal */
export function areFeaturesInitialized(): boolean {
  return initialized;
}

/** @internal */
export function setFeaturesInitialized(): void {
  initialized = true;
}
