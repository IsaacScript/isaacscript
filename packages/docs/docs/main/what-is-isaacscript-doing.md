---
title: What is IsaacScript Doing?
---

The `isaacscript` program will run forever until you close the terminal window or cancel it with `Ctrl + c`. While it runs, it monitors for changes in your project. In summary, it will:

1. automatically recompile your TypeScript as soon as you save a `.ts` file
1. automatically copy over any files in the `mod` directory
1. automatically refresh your mod in-game (with the `luamod` console command)

As a new user, you might want to confirm that each of these functions is working properly as a way to get familiar with the program.

<br />

### 🔄 Confirm That Auto-Mod-Reloading Works

The moment that you save a TypeScript file, `isaacscript` will detect that something has changed, and it will automatically perform the following steps:

- `isaacscript` will re-compile your TypeScript project using `tstl`, the TypeScriptToLua tool.
- `tstl` will spit out a file called `main.lua` in your project's `mod` folder. (e.g. `C:\Repositories\revelations\mod\main.lua`)
- `isaacscript` will copy this file to the `mods` directory. (e.g. `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\mods\revelations\main.lua`)
- If you have the game open and are in a run, `isaacscript` will then send a message to a helper mod called `isaacscript-watcher`.
- `isaacscript-watcher` will run the `luamod` console command corresponding to your project. (e.g. `luamod revelations`)
- After the `luamod` command is executed, your mod has been reloaded - it is now ready to test!
- If compilation failed for any reason, then you will be able to see the errors on both the `isaacscript` console window and in-game. (The `isaacscript-watcher` mod will draw it on the screen for you.)

Note that `isaacscript` will automatically install the `isaacscript-watcher` helper mod for you, so you don't have to do anything. Just test to see that it works:

1. Make sure that `isaacscript` is running in a shell, monitoring for changes in your project.
1. In-game, go into a run.
1. In VSCode, add something new to your `main.ts` file, like: `print("hello world");`
1. In VSCode, save the file.
1. In game, you should see text appear on the screen. (i.e. Something along the lines of "Compilation successful.")
1. In game, press <code>`</code> to open the console and see if your "hello world" message is printed there.

<br />

### 📁 Confirm That File Cloning Works

`isaacscript` will automatically sync the contents of the `mod` directory in your project to the corresponding folder in `mods`.

For example:

- Say that you have a project directory of: `C:\Repositories\revelations\`
- Then, inside your project mod folder, you make some new subdirectories: `C:\Repositories\revelations\mod\resources\gfx\items\collectibles\`
  - (This is the directory that you are supposed to put graphics files in for new modded items.)
- Next, you put a new file in that directory: `C:\Repositories\revelations\mod\resources\gfx\items\collectibles\collectibles_new_item.png`
- Now, `isaacscript` automatically copies the `collectibles_new_item.png` file to: `C:\Program Files (x86)\Steam\steamapps\common\The Binding of Isaac Rebirth\mods\revelations\resources\gfx\items\collectibles\collectibles_new_item.png`

For now, just put something in your mod folder and confirm that `isaacscript` copies it over for you.

Remember that if you add non-code assets to your mod, you have to fully restart the game in order for the game to start using them.

<br />
