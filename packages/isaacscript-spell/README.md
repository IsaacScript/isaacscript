# `isaacscript-spell`

[![npm version](https://img.shields.io/npm/v/isaacscript-spell.svg)](https://www.npmjs.com/package/isaacscript-spell)

These are CSpell dictionaries for [_The Binding of Isaac: Repentance_](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/).

[IsaacScript](https://isaacscript.github.io/) mods are automatically configured to use these dictionaries.

## Dictionaries

This package contains two dictionaries. Each dictionary is composed of multiple word lists.

### `isaac`

| Word List | Description                                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| api.txt   | These are words from the Lua API. Words from misspelled enums are not included, since those are fixed in the reimplemented IsaacScript enums. |
| files.txt | These are words from files in the "resources" directory, like "entities2.xml".                                                                |
| lua.txt   | These are words in the Lua programming language.                                                                                              |
| other.txt | These are words that apply to Isaac modding in general.                                                                                       |

### `isaacscript`

| Word List         | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| isaacscript.txt   | These are words contained within IsaacScript template files and elsewhere within the monorepo. |
| missing-words.txt | These are general-purpose words that should be in the CSpell base dictionary.                  |
