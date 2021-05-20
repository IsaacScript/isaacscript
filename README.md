[![npm version](https://img.shields.io/npm/v/isaac-typescript-definitions.svg)](https://www.npmjs.com/package/isaac-typescript-definitions)

# isaac-typescript-definitions

These are TypeScript definitions for [The Binding of Isaac: Afterbirth+](https://store.steampowered.com/app/570660/The_Binding_of_Isaac_Afterbirth/).

The [IsaacScript](https://isaacscript.github.io/) framework automatically uses these definitions.

<br />

## TODO

- search for all TODO
- add enum RoomTransitionAnim and deprecate RoomTransition
- test:
  - all "not implemented"
  - test Game.ShowHallucination
  - CostumeConfigList is bugged and always returns a list of size 0 / GetCostumes(): Readonly<CostumeConfigList>;
- report to Kil:
  - SampleLaser: boolean; // Should use IsSampleLaser() instead
  - CanShutDoors: boolean; // Should use CanShutDoors() instead
  - Desc: GridEntityDesc; // Should use GetSaveState() instead

- search for all "default is"
- search for all "//"
