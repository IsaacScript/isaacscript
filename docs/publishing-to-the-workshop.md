---
title: Publishing to the Workshop
---

Isaac mods are published to the Steam Workshop, which allows others to easily download them. This is accomplished by running the "ModUploader.exe" tool provided with the game, which is located at `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\tools\ModUploader.exe`.

`isaacscript` contains a `--publish` flag that may be useful for releasing a new version of your mod. It will perform the following steps:

- Update all NPM dependencies (e.g. in the "package.json" file)
- Bump the version in the "src/constants.ts" file.
  - It looks for a line that looks something like `export const VERSION = "v1.0.0";`.
- Bump the version in the "mod/metadata.xml" file.
- Bump the version in the "mod/version.txt" file.
- Compile the TypeScript.
- Copy everything from the source mod directory to the destination mod directory (i.e. "project/mod" --> "Binding of Isaac: Afterbirth+ Mods/project").
- Commit all changes in Git and push.
- Open the "ModUploader.exe" file with a working directory of the destination mod directory.
  - (Unfortunately, there isn't a way to publish a mod via the command-line.)
