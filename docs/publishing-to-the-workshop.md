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
- Run the Python script located at "scripts/publish_pre_copy.py" (if it exists).
- Copy everything from the source mod directory to the destination mod directory (i.e. "project/mod" --> "mods/project").
- Run the Python script located at "scripts/publish_post_copy.py" (if it exists).
- Commit all changes in Git and push.
- Run "steamcmd.exe" to automatically publish the new version of the mod to the Steam Workshop.
  - The mod must already be published to the Steam Workshop for this to work.

Furthermore, run `npx isaacscript publish --help` to see additional flags that may be passed to the `publish` command.

<br>

### `metadata.vdf`

In order for `steamcmd.exe` to work, you must create a file called `metadata.vdf` next to your `metadata.xml` that contains the following:

```vdf
"workshopitem"
{
  "appid" "250900"
  "publishedfileid" "[your mod ID]"
  "contentfolder" "C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\mods\[your mod name]"
}
```

<br>

### `.env`

In order for `steamcmd.exe` to work, it needs your Steam username and password. Copy the `.env_template` file in the root of your project to `.env`and fill in the values.

Make sure that there is an entry for the `.env` file in your `.gitignore`, because you (obviously) don't want to upload this to GitHub/GitLab. (This entry will exist by default for mods created with `isaacscript init`.)
