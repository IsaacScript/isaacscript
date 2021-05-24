---
title: Publishing to the Workshop
---

Isaac mods are published to the [Steam Workshop](https://steamcommunity.com/app/250900/workshop/), which allows others to easily download them. This is accomplished by running the "ModUploader.exe" tool provided with the game, which is located at `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\tools\ModUploader.exe`.

However, for large mods, there are often other tasks that need to be performed before pushing the files to the Steam Workshop. `isaacscript` contains a `publish` command that may be useful to you. It will perform the following steps:

- Update all NPM dependencies (e.g. in the "package.json" file)
- Bump the version in the "src/constants.ts" file (if it exists).
  - It looks for a line that looks something like `export const VERSION = "v1.0.0";`.
- Bump the version in the "mod/metadata.xml" file.
- Bump the version in the "mod/version.txt" file.
- Compile the TypeScript.
- Copy everything from the source mod directory to the destination mod directory (i.e. "project/mod" --> "mods/project").
- Run the Python script located at "scripts/pre-release.py" (if it exists).
- Commit all changes in Git and push.
- Open the "ModUploader.exe" file with a working directory of the destination mod directory.
  - (Unfortunately, there isn't a way to publish a mod via the command-line.)

Furthermore, run `npx isaacscript publish --help` for additional flags that may be passed to the `publish` command.
