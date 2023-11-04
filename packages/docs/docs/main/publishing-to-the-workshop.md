---
title: Publishing to the Workshop
---

Isaac mods are published to the [Steam Workshop](https://steamcommunity.com/app/250900/workshop/), which allows others to easily download them. This is accomplished by running the "ModUploader.exe" tool provided with the game, which is located at `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\tools\ModUploader.exe`.

However, for large mods, there are often other tasks that need to be performed before pushing the files to the Steam Workshop. `isaacscript` contains a `publish` command that may be useful to you. It will perform the following steps:

- Update all npm dependencies (e.g. in the "package.json" file).
- Bump the version in the "src/constants.ts" file (if it exists).
  - It looks for a line that looks something like: `export const VERSION = "v1.0.0";`
- Bump the version in the "mod/metadata.xml" file.
- Bump the version in the "mod/version.txt" file.
- Compile the TypeScript.
- Run the Python script located at "scripts/publish_pre_copy.py" (if it exists).
- Copy everything from the source mod directory to the destination mod directory (i.e. "project/mod" --> "mods/project").
- Run the Python script located at "scripts/publish_post_copy.py" (if it exists).
- Commit all changes in Git and push.

Run `npx isaacscript publish --help` to see additional flags that may be passed to the `publish` command.

Additionally, we recommend that you set up [automatic mod uploading in CI](https://github.com/IsaacScript/isaac-steam-workshop-upload).
