/** @internal */
export function getUpgradeErrorMsg(featureName: string): string {
  return `The ${featureName} is not initialized. You must first upgrade your mod object by calling the "upgradeMod()" function.`;
}
