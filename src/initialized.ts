let initialized = false;

export function areFeaturesInitialized(): boolean {
  return initialized;
}

export function setFeaturesInitialized(): void {
  initialized = true;
}
