import { Challenge } from "../enums/Challenge";
import {
  Card,
  CollectibleType,
  PillColor,
  TrinketType,
} from "../enums/collections/subTypes";
import { PlayerVariant } from "../enums/collections/variants";
import { EntityType } from "../enums/EntityType";
import { LevelCurse } from "../enums/flags/LevelCurse";
import { GridEntityType } from "../enums/GridEntityType";
import { ModCallback } from "../enums/ModCallback";
import { Music } from "../enums/Music";
import { PillEffect } from "../enums/PillEffect";
import { SoundEffect } from "../enums/SoundEffect";
import { ItemConfig } from "./ItemConfig";

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
     * ```
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

    function AddPillEffectToPool(pillEffect: PillEffect | int): PillColor;

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
      spawner: Entity | undefined,
      entityType?: EntityType | int,
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
      entityType: EntityType | int,
      variant?: int,
      subType?: int,
      cache?: boolean,
      ignoreFriendly?: boolean,
    ): Entity[];

    /**
     * Beware:
     * - This function does not work in the PostNewRoom callback.
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

    /** Returns -1 if no card with the specified name was found. */
    function GetCardIdByName(cardName: string): Card | int;

    /** Returns 0 if the current run is not a challenge. */
    function GetChallenge(): Challenge | int;

    /** Returns -1 if the specified challenge name does not exist. */
    function GetChallengeIdByName(challengeName: string): Challenge | int;

    /** Returns -1 if no costume with the specified name was found. */
    function GetCostumeIdByPath(path: string): int;

    /** Returns -1 if no curse with the specified name was found. */
    function GetCurseIdByName(curseName: string): LevelCurse | int;

    /** Returns 0 if no entity with the specified name was found. */
    function GetEntityTypeByName(entityName: string): EntityType | int;

    /** Returns -1 if no entity with the specified name was found. */
    function GetEntityVariantByName(entityName: string): int;

    /**
     * Returns the amount of render frames that have passed since the game was open.
     *
     * The counter for this increases even when the game is paused or when you are in the main menu.
     * Since Isaac frames are equal to render frames, 60 frames equals 1 second. Note that these
     * frames are completely different from the frames returned from `game.GetFrameCount` method.
     */
    function GetFrameCount(): int;

    function GetFreeNearPosition(position: Vector, step: float): Vector;
    function GetItemConfig(): ItemConfig;

    /** Returns -1 if no collectible with the specified name was found. */
    function GetItemIdByName(collectibleName: string): CollectibleType | int;

    /** Returns -1 if no music with the specified name was found. */
    function GetMusicIdByName(musicName: string): Music | int;

    /** Returns -1 if no pill with the specified name was found. */
    function GetPillEffectByName(pillName: string): PillEffect | int;

    /**
     * With no argument, it returns the 0th player.
     *
     * For the purposes of this definition, we assume that the 0th player always exists. However, if
     * this function is called in the menu, it will return undefined, so beware of this case.
     */
    function GetPlayer(): EntityPlayer;

    /**
     * For the purposes of this definition, we assume that the 0th player always exists. However, if
     * this function is called in the menu, it will return undefined, so beware of this case.
     */
    function GetPlayer(playerID: 0): EntityPlayer;

    /**
     * Returns the EntityPlayer that matches the provided player ID. Player IDs start at 0 and
     * increment upwards. For example, when playing as Jacob & Esau, Jacob will have a player ID of
     * 0 and Esau will have a player ID of 1.
     *
     * If an invalid player ID is passed (such as -20 or 20), the function will instead assume a
     * player index of 0.
     *
     * This function can return undefined if it is called before any player is initialized (i.e. if
     * you call it in the main menu), so beware of this case.
     */
    function GetPlayer(playerID: int): EntityPlayer;

    /**
     * Returns -1 if the specified character does not exist.
     *
     * @param playerName
     * @param tainted Default is false. This only works with modded characters. For example,
     *                `Isaac.GetPlayerTypeByName("Isaac", true)` will return -1.
     */
    function GetPlayerTypeByName(
      playerName: string,
      tainted?: boolean,
    ): PlayerVariant | int;

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

    /** Returns -1 if no sound with the specified name was found. */
    function GetSoundIdByName(soundName: string): SoundEffect | int;

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

    /** Returns -1 if the specified trinket was not found. */
    function GetTrinketIdByName(trinketName: string): TrinketType | int;

    /**
     * Used to spawn a grid entity (e.g. a rock or a pot). Grid entities are different than normal
     * entities, as they follow different rules and are always aligned with the grid.
     *
     * Normally, this function will always return a `GridEntity`, even if the spawned grid entity
     * will not actually be placed. it fails. However, in very rare cases, it can return undefined.
     *
     * @param gridEntityType
     * @param variant
     * @param position
     * @param forced Forced has no effect and will not override a grid entity on the given location.
     *               Remove any existing grid entities first. Defaults to false.
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

    function Spawn(
      entityType: EntityType | int,
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
