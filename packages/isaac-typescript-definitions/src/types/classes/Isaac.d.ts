import type { CallbackPriority } from "../../enums/CallbackPriority";
import type { Challenge } from "../../enums/Challenge";
import type {
  CardType,
  CollectibleType,
  PillColor,
  PlayerType,
  TrinketType,
} from "../../enums/collections/subTypes";
import type { EntityType } from "../../enums/EntityType";
import type { EntityPartition } from "../../enums/flags/EntityPartition";
import type { GridEntityType } from "../../enums/GridEntityType";
import type { Music } from "../../enums/Music";
import type { NullItemID } from "../../enums/NullItemID";
import type { PillEffect } from "../../enums/PillEffect";
import type { SoundEffect } from "../../enums/SoundEffect";

declare global {
  /**
   * The `Isaac` class contains a collection of miscellaneous general-purpose methods.
   *
   * `Isaac` is technically not an Isaac API class; it has a type of `table` (instead of
   * `userdata`).
   *
   * @noSelf
   */
  namespace Isaac {
    /** @deprecated Use the `Mod.AddCallback` method instead. */
    function AddCallback<T extends keyof AddCallbackParameters | string>(
      mod: Mod,
      modCallback: T,
      ...args: T extends keyof AddCallbackParameters
        ? AddCallbackParameters[T]
        : unknown[]
    ): void;

    function AddPillEffectToPool(pillEffect: PillEffect): PillColor;

    /** @deprecated Use the `Mod.AddPriorityCallback` method instead. */
    function AddPriorityCallback<
      T extends keyof AddCallbackParameters | string,
    >(
      mod: Mod,
      modCallback: T,
      priority: CallbackPriority | int,
      ...args: T extends keyof AddCallbackParameters
        ? AddCallbackParameters[T]
        : unknown[]
    ): void;

    /**
     * Prints a string to the debug console. (You can open the debug console with the tilde key.)
     *
     * The Lua global function of `print` is mapped to this method, so it is recommended to use
     * `print` instead of invoking this method directly.
     *
     * Note that unlike `print`, if you invoke `Isaac.ConsoleOutput` directly, the displayed message
     * will not contain a trailing newline.
     */
    function ConsoleOutput(text: string): void;

    /** Returns the number of bosses in the current room. */
    function CountBosses(): int;

    /** Returns the number of enemies in the current room. */
    function CountEnemies(): int;

    /**
     * Returns the number of entities in the current room that fulfill the specified requirements.
     *
     * @param spawner Pass undefined if you want to match entities that were not spawned by anything
     *                in particular.
     * @param entityType Required. (Specifying 0 or -1 for this parameter will always make this
     *                   method return 0.)
     * @param variant Specifying -1 will return all variants. Default is -1.
     * @param subType Specifying -1 will return all subtypes. Default is -1.
     */
    function CountEntities(
      spawner: Entity | undefined,
      entityType: EntityType,
      variant?: int,
      subType?: int,
    ): int;

    /**
     * Prints a string to the "log.txt" file. By default, the file is located at:
     *
     * ```text
     * C:\Users\%USERNAME%\Documents\My Games\Binding of Isaac Repentance\log.txt
     * ```
     */
    function DebugString(msg: string): Mod;

    /** Executes a command on the debug console. */
    function ExecuteCommand(command: string): string;

    /** Spawns an explosion at the specified location. */
    function Explode(
      position: Vector,
      source: Entity | undefined,
      damage: float,
    ): void;

    /**
     * Returns entities based on the type, variant, and subtype.
     *
     * If an entity has `EntityFlag.FLAG_NO_QUERY` then it will be excluded from the results. If you
     * need to get an entity with that flag then you should use `Isaac.GetRoomEntities` method
     * instead.
     *
     * @param entityType The entity type to match.
     * @param variant The variant to match. If -1, then everything is included. Default is -1.
     * @param subType If sub-type to match. If -1, then everything is included. Default is -1.
     * @param cache Whether to get fresh results. If you need to call this method with the same
     *              arguments two or more times on the same frame, then you should use the cache for
     *              a performance boost. Default is false.
     * @param ignoreFriendly Default is false.
     */
    function FindByType(
      entityType: EntityType,
      variant?: int,
      subType?: int,
      cache?: boolean,
      ignoreFriendly?: boolean,
    ): Entity[];

    /**
     * Returns the entities that are located in a circle around a specified position. The returned
     * entities are not sorted based on distance; they are returned in the order that they were
     * loaded.
     *
     * Beware:
     * - This function does not work in the `POST_NEW_ROOM` callback.
     * - It excludes effects, even when the effect partition is selected.
     * - It can exclude dead enemies.
     *
     * It is recommended to never use this function and instead use `Isaac.FindByType` or
     * `Isaac.GetRoomEntities`.
     *
     * @param position
     * @param radius
     * @param partitions Default is 0xFFFFFFFF.
     */
    function FindInRadius(
      position: Vector,
      radius: float,
      partitions?: BitFlags<EntityPartition> | EntityPartition,
    ): Entity[];

    function GetBuiltInCallbackState(
      modCallback: keyof AddCallbackParameters | string,
    ): boolean;

    function GetCallbacks<T extends keyof AddCallbackParameters | string>(
      modCallback: T,
      createIfMissing: boolean,
    ): Array<ModDescription<T>>;

    /**
     * This method is meant to be used when creating local enums that represent custom modded cards.
     * (We have to retrieve the sub-type of a custom card at run-time, because it is dynamically
     * calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `CardTypeCustom` (because that corresponds to the
     * vanilla enum of `CardType`).
     *
     * Never use this method to get the sub-type of a vanilla card; use the `CardType` enum instead.
     *
     * Returns -1 if no card with the specified name was found.
     */
    function GetCardIdByName(name: string): CardType;

    /**
     * Returns the ID of the current challenge, like `Challenge.PITCH_BLACK` for the "Pitch Black"
     * challenge.
     *
     * Returns `Challenge.NULL` (0) if the current run is not a challenge.
     */
    function GetChallenge(): Challenge;

    /**
     * This method is meant to be used when creating local enums that represent custom challenges.
     * (We have to retrieve the ID of a custom challenge at run-time, because it is dynamically
     * calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `ChallengeCustom` (because that corresponds to the
     * vanilla enum of `Challenge`).
     *
     * Never use this method to get the ID of a vanilla challenge; use the `Challenges` enum
     * instead.
     *
     * Returns -1 if the specified challenge name does not exist.
     */
    function GetChallengeIdByName(name: string): Challenge;

    /**
     * This method is meant to be used when creating local enums that represent custom costumes. (We
     * have to retrieve the ID of a custom costume at run-time, because it is dynamically calculated
     * based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `NullItemIDCustom` (because that corresponds to
     * the vanilla enum of `NullItemID`).
     *
     * Never use this method to get the ID of a vanilla costume; use the `NullItemID` enum instead.
     *
     * Returns -1 if no costume with the specified name was found.
     */
    function GetCostumeIdByPath(path: string): NullItemID;

    /**
     * This method is meant to be used when creating local enums that represent custom curses. (We
     * have to retrieve the ID of a custom curse at run-time, because it is dynamically calculated
     * based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `LevelCurseCustom` (because this corresponds to
     * the vanilla enum of `LevelCurse`).
     *
     * Never use this method to get the ID of a vanilla curse; use the `LevelCurse` enum instead.
     *
     * Returns -1 if no curse with the specified name was found.
     *
     * Note that this does not return a `LevelCurse` bit flag; it returns an integer that
     * corresponds to the ID in the "curses.xml" file. For example, the final vanilla curse is
     * "Curse of the Giant", which has an ID of 8. Thus, the first modded curse will always have an
     * ID of 9. This integer must be converted to a `LevelCurse` bit flag in order to be used with
     * the various API functions. For this reason, it is recommended to use the `getCurseIDByName`
     * helper function instead, which will return a proper `LevelCurse` bit flag.
     */
    function GetCurseIdByName(name: string): int;

    /**
     * This method is meant to be used when creating local enums that represent custom modded
     * entities. (Sometimes, entity types are automatically generated by the game and are not known
     * until run-time. Other times, it is practical to retrieve the entity type at run-time instead
     * of hard-coding it in two different places in your code-base.)
     *
     * It is conventional to name your local enum `EntityTypeCustom` (because this corresponds to
     * the vanilla enum of `EntityType`).
     *
     * Never use this method to get the entity type of a vanilla entity; use the `EntityType` enum
     * instead.
     *
     * Returns `EntityType.NULL` (0) if no entity with the specified name was found.
     */
    function GetEntityTypeByName(name: string): EntityType;

    /**
     * This method is meant to be used when creating local enums that represent custom modded
     * entities. (Sometimes, entity variants are automatically generated by the game and are not
     * known until run-time. Other times, it is practical to retrieve the entity variant at run-time
     * instead of hard-coding it in two different places in your code-base.)
     *
     * It is conventional to name your local enum `FooVariant` for a custom entity called "Foo".
     * (This corresponds to the style of the vanilla variant enums like `GaperVariant`.)
     *
     * Never use this method to get the entity type of a vanilla entity; use the corresponding
     * variant enum instead, like e.g. `GaperVariant`.
     *
     * Returns -1 if no entity with the specified name was found.
     */
    function GetEntityVariantByName(name: string): int;

    /**
     * Returns the amount of render frames that have passed since the game was open.
     *
     * - Render frames will continue to increase when the game is paused and when in the main menu.
     * - 60 render frames equals 1 second.
     * - The render frame count is different from the count returned from the `Game.GetFrameCount`
     *   method; that returns the run frame count.
     * - Game frames and render frames are synchronized such two render frames will always
     *   correspond to one game frame, and the first render frame in the pair will always be odd.
     */
    function GetFrameCount(): int;

    function GetFreeNearPosition(position: Vector, step: float): Vector;

    /** This is the only way to access the `ItemConfig` class. */
    function GetItemConfig(): ItemConfig;

    /**
     * This method is meant to be used when creating local enums that represent custom modded
     * collectibles. (We have to retrieve the sub-type of a custom collectible at run-time, because
     * it is dynamically calculated based on the current mods that the end-user currently has
     * enabled.)
     *
     * It is conventional to name your local enum `CollectibleTypeCustom` (because this corresponds
     * to the vanilla enum of `CollectibleType`).
     *
     * Never use this method to get the sub-type of a vanilla collectible; use the `CollectibleType`
     * enum instead.
     *
     * Returns -1 if no collectible with the specified name was found.
     *
     * Note that this method has a bugged name; it should actually be called
     * `GetCollectibleIdByName`.
     */
    function GetItemIdByName(name: string): CollectibleType;

    /**
     * This method is meant to be used when creating local enums that represent custom modded music.
     * (We have to retrieve the ID of custom music at run-time, because it is dynamically calculated
     * based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `MusicCustom` (because this corresponds to the
     * vanilla enum of `Music`).
     *
     * Never use this method to get the sub-type of vanilla music; use the `Music` enum instead.
     *
     * Returns -1 if no music with the specified name was found.
     */
    function GetMusicIdByName(name: string): Music;

    /**
     * This method is meant to be used when creating local enums that represent custom modded pills.
     * (We have to retrieve the pill effect ID of the custom pill at run-time, because it is
     * dynamically calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `PillEffectCustom` (because this corresponds to
     * the vanilla enum of `PillEffect`).
     *
     * Never use this method to get the pill effect ID of a vanilla pill; use the `PillEffect` enum
     * instead.
     *
     * Returns -1 if no pill with the specified name was found.
     */
    function GetPillEffectByName(name: string): PillEffect;

    /**
     * Returns the `EntityPlayer` that matches the provided player ID. Player IDs start at 0 and
     * increment upwards. For example, when playing as Jacob & Esau, Jacob will have a player ID of
     * 0 and Esau will have a player ID of 1.
     *
     * If an invalid player ID is passed (such as -20 or 20), instead of throwing an error, the
     * function will assume a player index of 0.
     *
     * Even though the function is defined as always returning an `EntityPlayer` class, it can
     * actually return undefined if it is called before any player is initialized (e.g. in the main
     * menu). Thus, beware of this case.
     *
     * @param playerID Default is 0.
     */
    function GetPlayer(playerID?: int): EntityPlayer;

    /**
     * This method is meant to be used when creating local enums that represent custom modded
     * characters. (We have to retrieve the sub-type of the custom character at run-time, because it
     * is dynamically calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `PlayerTypeCustom` (because this corresponds to
     * the vanilla enum of `PlayerType`).
     *
     * Never use this method to get the sub-type of a vanilla character; use the `PlayerType` enum
     * instead.
     *
     * Returns -1 if the specified character does not exist.
     *
     * @param name
     * @param tainted Default is false. This only works with modded characters. For example,
     *                `Isaac.GetPlayerTypeByName("Isaac", true)` will return -1.
     */
    function GetPlayerTypeByName(name: string, tainted?: boolean): PlayerType;

    /**
     * Returns a random position in the current room in world coordinates (not render coordinates).
     */
    function GetRandomPosition(): Vector;

    /**
     * This function is very expensive and is the main cause of lag in mods across the Isaac
     * ecosystem. Be careful about calling this multiple times per frame.
     *
     * If possible, use the `Isaac.FindByType` method or the `getEntities` helper function instead
     * of using this method.
     */
    function GetRoomEntities(): Entity[];

    function GetScreenHeight(): int;

    /**
     * Matches the value of "MaxRenderScale" in the "options.ini" file. If a player sets this to a
     * float, the game will floor it.
     */
    function GetScreenPointScale(): Vector;

    function GetScreenWidth(): int;

    /**
     * This method is meant to be used when creating local enums that represent custom sound
     * effects. (We have to retrieve the ID of the sound effect at run-time, because it is
     * dynamically calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `SoundEffectCustom` (because this corresponds to
     * the vanilla enum of `SoundEffect`).
     *
     * Never use this method to get the ID of a vanilla sound effect; use the `SoundEffect` enum
     * instead.
     *
     * Returns -1 if no sound with the specified name was found.
     */
    function GetSoundIdByName(name: string): SoundEffect;

    /**
     * Returns the width of the given string in pixels based on the "terminus8" font. (This is the
     * same font used in the `Isaac.RenderText` method.)
     */
    function GetTextWidth(str: string): int;

    /**
     * Returns the current time in milliseconds since the computer's operating system was started.
     *
     * This is useful for measuring how much real time has passed independent of how many frames
     * have passed. (Frames are not a very good indicator of how much time has passed, because the
     * game locks up to load new data on every level transition and room transition.)
     *
     * For example, you could use this to implement an on-screen timer based on real-time, or to
     * benchmark the performance impact of one function over another.
     */
    function GetTime(): int;

    /**
     * This method is meant to be used when creating local enums that represent custom modded
     * trinkets. (We have to retrieve the sub-type of a custom trinket at run-time, because it is
     * dynamically calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `TrinketTypeCustom` (because this corresponds to
     * the vanilla enum of `TrinketType`).
     *
     * Never use this method to get the sub-type of a vanilla trinket; use the `TrinketType` enum
     * instead.
     *
     * Returns -1 if the specified trinket was not found.
     */
    function GetTrinketIdByName(name: string): TrinketType;

    /**
     * Used to spawn a grid entity (e.g. a rock or a pot). Grid entities are different than normal
     * entities, as they follow different rules and are always aligned with the grid.
     *
     * Normally, this function will always return a `GridEntity`, even if the spawned grid entity
     * will not actually be placed. However, in very rare cases, it can return undefined.
     *
     * Note that in the docs, a 4th "forced" argument is listed, but this is omitted in the function
     * definition since it is bugged and has no effect.
     *
     * @param gridEntityType
     * @param variant
     * @param position
     */
    function GridSpawn(
      gridEntityType: GridEntityType,
      variant: int,
      position: Vector,
    ): GridEntity | undefined;

    /**
     * Returns true if your mod has data stored from the `Isaac.SaveModData` method.
     *
     * (This corresponds to "save#.dat" files existing in the mod's save data folder.)
     */
    function HasModData(mod: Mod): boolean;

    /**
     * Returns a string that was stored in a "save#.dat" file from the `Isaac.SaveModData` method.
     * If there is no "save#.dat" file for your mod, this function will return an empty string.
     * There are 3 "save#.dat" files, one per save slot. The number will be determined automatically
     * by the game. In Repentance, these files are located in the "data" folder next to the "mods"
     * folder.
     */
    function LoadModData(mod: Mod): string;

    /** @deprecated Use the global `RegisterMod` global function instead. */
    function RegisterMod(mod: Mod, name: string, APIVersion: int): void;

    /** @deprecated Use the `Mod.RemoveCallback` method instead. */
    function RemoveCallback(
      mod: Mod,
      modCallback: keyof AddCallbackParameters | string,
      callbackFn: () => void,
    ): void;

    /**
     * Will delete a "save#.dat" file, if it exists. For more information, see the
     * `Isaac.SaveModData` method.
     */
    function RemoveModData(mod: Mod): void;

    /**
     * @param text The text to render on the screen.
     * @param x Between 0 and around 500. (The max depends on the user's screen size.)
     * @param y Between 0 and around 350. (The max depends on the user's screen size.)
     * @param scaleX Between 0 and 1.
     * @param scaleY Between 0 and 1.
     * @param r Between 0 and 1.
     * @param g Between 0 and 1.
     * @param b Between 0 and 1.
     * @param a Between 0 and 1.
     */
    function RenderScaledText(
      text: string,
      x: float,
      y: float,
      scaleX: float,
      scaleY: float,
      r: float,
      g: float,
      b: float,
      a: float,
    ): void;

    /**
     * @param text The text to render on the screen.
     * @param x Between 0 and around 500. (The max depends on the user's screen size.)
     * @param y Between 0 and around 350. (The max depends on the user's screen size.)
     * @param r Between 0 and 1.
     * @param g Between 0 and 1.
     * @param b Between 0 and 1.
     * @param a Between 0 and 1.
     */
    function RenderText(
      text: string,
      x: float,
      y: float,
      r: float,
      g: float,
      b: float,
      a: float,
    ): void;

    /** Used to fire a custom callback. This was introduced in Repentance patch v1.7.9b. */
    function RunCallback(
      modCallback: keyof AddCallbackParameters | string,
    ): void;

    /** Used to fire a custom callback. This was introduced in Repentance patch v1.7.9b. */
    function RunCallbackWithParam(
      modCallback: keyof AddCallbackParameters | string,
      ...optionalArgs: readonly unknown[]
    ): void;

    /**
     * Stores a string in a "save#.dat" file for persistent storage across game invocations.
     *
     * There are 3 "save#.dat" files, one per save slot. The number will be determined automatically
     * by the game. In Repentance, these files are located in the "data" folder next to the "mods"
     * folder.
     */
    function SaveModData(mod: Mod, data: string): void;

    function SetBuiltInCallbackState(
      modCallback: keyof AddCallbackParameters | string,
      state: boolean,
    ): void;

    /**
     * Converts screen coordinates (i.e. window coordinates) into world coordinates (i.e. a `Vector`
     * representing an in-game position in the room).
     */
    function ScreenToWorld(position: Vector): Vector;

    function ScreenToWorldDistance(position: Vector): Vector;

    /**
     * Spawns a new entity with a randomly generated seed.
     *
     * This method is bugged and has a chance to crash the game every time it is used. Thus, you
     * should instead use the `Game.Spawn` method or the set of `spawn` functions from the standard
     * library. For example:
     *
     * - `spawn` - Will spawn anything with a convenient API.
     * - `spawnWithSeed - Will spawn anything with an API that makes it easy to specify a seed.`
     * - `spawnPickup` - Will spawn a pickup with a convenient API.
     * - `spawnPickupWithSeed - Will spawn a pickup with an API that makes it easy to specify a
     *   seed.`
     * - `spawnKey` - Will spawn a key with a convenient API.
     * - etc.
     *
     * @param entityType
     * @param variant
     * @param subType
     * @param position
     * @param velocity The initial velocity of the entity. In most cases, you will want to pass the
     *                 `VectorZero` constant so that there is no initial velocity.
     * @param spawner Each entity stores a reference to the entity that spawned it in the
     *                `SpawnerEntity` field. (If the entity was not spawned by anything in
     *                particular, `SpawnerEntity` will be equal to undefined.) Thus, when spawning a
     *                new entity, you can specify what the `SpawnerEntity` will be by using this
     *                argument. Note that this argument is not optional. If you do not want the new
     *                entity to have a spawner, you must explicitly pass undefined.
     * @deprecated
     */
    function Spawn(
      entityType: EntityType,
      variant: int,
      subType: int,
      position: Vector,
      velocity: Vector,
      spawner: Entity | undefined,
    ): Entity;

    /**
     * Converts a game Vector (i.e. `entity.Position`) to a render Vector used for drawing sprites
     * and text to the screen at fixed positions.
     *
     * For almost all cases, you will want to use the `Isaac.WorldToScreen` method instead, since
     * this will result in non-standard values for non-1x1 rooms.
     */
    function WorldToRenderPosition(position: Vector): Vector;

    /**
     * Converts a game Vector (i.e. `entity.Position`) to a screen Vector used for drawing sprites
     * and text next to an entity.
     *
     * For almost all cases, you will want to use this instead of the `Isaac.WorldToRenderPosition`
     * method since it works properly in non-1x1 rooms.
     */
    function WorldToScreen(position: Vector): Vector;

    function WorldToScreenDistance(position: Vector): Vector;
  }
}
