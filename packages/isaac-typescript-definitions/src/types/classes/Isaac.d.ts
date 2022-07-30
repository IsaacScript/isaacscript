import { Challenge } from "../../enums/Challenge";
import {
  Card,
  CollectibleType,
  PillColor,
  PlayerType,
  TrinketType,
} from "../../enums/collections/subTypes";
import { EntityType } from "../../enums/EntityType";
import { LevelCurse } from "../../enums/flags/LevelCurse";
import { GridEntityType } from "../../enums/GridEntityType";
import { ModCallback } from "../../enums/ModCallback";
import { Music } from "../../enums/Music";
import { NullItemID } from "../../enums/NullItemID";
import { PillEffect } from "../../enums/PillEffect";
import { SoundEffect } from "../../enums/SoundEffect";

declare global {
  /** @noSelf */
  namespace Isaac {
    /**
     * Your mod can't do much of anything unless you attach some callback functions that can run
     * code when certain things happen. The different types of callbacks are represented in the
     * `ModCallback` enum.
     *
     * Some callbacks take an optional third argument to specify that you only want it the function
     * to fire on a specific thing. For example:
     *
     * ```ts
     * mod.AddCallback(
     *   ModCallback.POST_EFFECT_UPDATE,
     *   postEffectUpdatePoof1,
     *   EffectVariant.POOF_1,
     * )
     * ```
     */
    function AddCallback(
      mod: Mod,
      modCallback: ModCallback,
      callbackFn: () => void,
      entityID?: int,
    ): void;

    function AddPillEffectToPool(pillEffect: PillEffect): PillColor;

    /**
     * Puts a string into the debug console. (You can open the debug console with the tilde key.)
     */
    function ConsoleOutput(text: string): void;

    function CountBosses(): int;
    function CountEnemies(): int;

    /**
     * @param spawner
     * @param entityType Default is `EntityType.NULL`.
     * @param variant Specifying -1 will return all variants. Default is -1.
     * @param subType Specifying -1 will return all subtypes. Default is -1.
     */
    function CountEntities(
      spawner?: Entity,
      entityType?: EntityType,
      variant?: int,
      subType?: int,
    ): int;

    /**
     * Prints a string to the "log.txt" file. By default, the file is located at:
     * `C:\Users\[YourUsername]\Documents\My Games\Binding of Isaac Repentance\log.txt`
     */
    function DebugString(msg: string): Mod;

    /** Executes a command on the debug console. */
    function ExecuteCommand(command: string): string;

    function Explode(
      position: Vector,
      source: Entity | undefined,
      damage: float,
    ): void;

    /**
     * @param entityType
     * @param variant Default is -1.
     * @param subType Default is -1.
     * @param cache Default is false.
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
      partitions?: int,
    ): Entity[];

    /**
     * This method is meant to be used when creating local enums that represent custom modded cards.
     * (We have to retrieve the sub-type of a custom card at run-time, because it is dynamically
     * calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `CardCustom` (because that corresponds to the
     * vanilla enum of `Card`).
     *
     * Never use this method to get the sub-type of a vanilla card; use the `Card` enum instead.
     *
     * Returns -1 if no card with the specified name was found.
     */
    function GetCardIdByName(cardName: string): Card;

    /**
     * Returns the ID of the current challenge, like `Challenge.PITCH_BLACK` for the "Pitch Black"
     * challenge.
     *
     * Returns 0 if the current run is not a challenge.
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
    function GetChallengeIdByName(challengeName: string): Challenge;

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
     */
    function GetCurseIdByName(curseName: string): LevelCurse;

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
     * Returns 0 if no entity with the specified name was found.
     */
    function GetEntityTypeByName(entityName: string): EntityType;

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
    function GetEntityVariantByName(entityName: string): int;

    /**
     * Returns the amount of render frames that have passed since the game was open.
     *
     * The counter for this increases even when the game is paused or when you are in the main menu.
     * Since Isaac frames are equal to render frames, 60 frames equals 1 second. Note that these
     * frames are different from the frames returned from `game.GetFrameCount` method.
     */
    function GetFrameCount(): int;

    function GetFreeNearPosition(position: Vector, step: float): Vector;
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
    function GetItemIdByName(collectibleName: string): CollectibleType;

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
    function GetMusicIdByName(musicName: string): Music;

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
    function GetPillEffectByName(pillName: string): PillEffect;

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
     * @param playerName
     * @param tainted Default is false. This only works with modded characters. For example,
     *                `Isaac.GetPlayerTypeByName("Isaac", true)` will return -1.
     */
    function GetPlayerTypeByName(
      playerName: string,
      tainted?: boolean,
    ): PlayerType;

    /**
     * Returns a random position in the current room in world coordinates (not render coordinates).
     */
    function GetRandomPosition(): Vector;

    /**
     * This function is very expensive and is the main cause of lag in mods across the Isaac
     * ecosystem. Be careful about calling this multiple times per frame.
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
    function GetSoundIdByName(soundName: string): SoundEffect;

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
    function GetTrinketIdByName(trinketName: string): TrinketType;

    /**
     * Used to spawn a grid entity (e.g. a rock or a pot). Grid entities are different than normal
     * entities, as they follow different rules and are always aligned with the grid.
     *
     * Normally, this function will always return a `GridEntity`, even if the spawned grid entity
     * will not actually be placed. However, in very rare cases, it can return undefined.
     *
     * @param gridEntityType
     * @param variant
     * @param position
     * @param forced Forced has no effect and will not override a grid entity on the given location.
     *               Remove any existing grid entities first. Default is false.
     */
    function GridSpawn(
      gridEntityType: GridEntityType,
      variant: int,
      position: Vector,
      forced?: boolean,
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

    /**
     * @deprecated Use the global `RegisterMod` function instead.
     */
    function RegisterMod(
      mod: Mod,
      modName: string,
      APIVersion: int,
      fakeArg: never,
    ): void;

    function RemoveCallback(
      mod: Mod,
      modCallback: ModCallback,
      callbackFn: () => void,
    ): void;

    /**
     * Will delete a "save#.dat" file, if it exists. For more information, see the
     * `Isaac.SaveModData` method.
     */
    function RemoveModData(mod: Mod): void;

    function RenderScaledText(
      str: string,
      x: float,
      y: float,
      scaleX: float,
      scaleY: float,
      r: float,
      g: float,
      b: float,
      a: float,
    ): void;

    function RenderText(
      str: string,
      x: float,
      y: float,
      r: float,
      g: float,
      b: float,
      a: float,
    ): void;

    /**
     * Stores a string in a "save#.dat" file for persistent storage across game invocations.
     *
     * There are 3 "save#.dat" files, one per save slot. The number will be determined automatically
     * by the game. In Repentance, these files are located in the "data" folder next to the "mods"
     * folder.
     */
    function SaveModData(mod: Mod, data: string): void;

    function ScreenToWorld(position: Vector): Vector;
    function ScreenToWorldDistance(position: Vector): Vector;

    /**
     * Spawns a new entity with a randomly generated seed. For spawning entities using a specific
     * seed, then the `Game.Spawn` method should be used instead.
     *
     * In most cases, you should not be using this method directly, and instead be using the set of
     * `spawn` functions from the standard library. For example:
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
     */
    function WorldToRenderPosition(position: Vector): Vector;

    /**
     * Converts a game Vector (i.e. `entity.Position`) to a screen Vector used for drawing sprites
     * and text next to an entity.
     */
    function WorldToScreen(position: Vector): Vector;

    function WorldToScreenDistance(position: Vector): Vector;
  }
}
