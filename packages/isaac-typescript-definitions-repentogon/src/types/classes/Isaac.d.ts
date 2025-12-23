import type {
  BackdropType,
  Challenge,
  CollectibleType,
  Cutscene,
  EntityPartition,
  EntityType,
  ItemPoolType,
  LanguageAbbreviation,
  Music,
  NullItemID,
  PlayerType,
  StageID,
  TrinketType,
  WeaponType,
} from "isaac-typescript-definitions";
import type { Achievement } from "../../enums/Achievement";
import type { CompletionMarkDifficulty } from "../../enums/CompletionMarkDifficulty";
import type { CompletionMarkType } from "../../enums/CompletionMarkType";
import type { DialogButton } from "../../enums/DialogButton";
import type { DialogIcon } from "../../enums/DialogIcon";
import type { DialogReturn } from "../../enums/DialogReturn";
import type { DwmWindowAttribute } from "../../enums/DwmWindowsAttribute";
import type { GiantbookType } from "../../enums/GiantbookType";
import type { MainMenuType } from "../../enums/MainMenuType";
import type { TaintedMarksGroup } from "../../enums/TaintedMarksGroup";
import type { WindowIcon } from "../../enums/WindowIcon";
import type { BossColorXMLIndex } from "../../enums/xml/BossColorXMLIndex";

declare global {
  /** @noSelf */
  namespace Isaac {
    /**
     * Returns whether the specified character has completed all marks and returns the highest
     * difficulty it was accomplished in.
     */
    function AllMarksFilled(character: PlayerType): CompletionMarkDifficulty;

    /**
     * Returns whether the specified character has completed all the tainted unlock-related marks
     * and returns the highest difficulty it was accomplished in.
     */
    function AllTaintedCompletion(
      character: PlayerType,
      group: TaintedMarksGroup,
    ): CompletionMarkDifficulty;

    /** Returns whether the game can start coop. */
    function CanStartTrueCoop(): boolean;

    /**
     * Attempts to move the windows mouse cursor to the center of the game's window. This method
     * does nothing if the Isaac.exe window is out of focus.
     */
    function CenterCursor(): void;

    /**
     * Removes all projectiles in the room.
     *
     * @param ignoreNPCs Optional. If false, all NPCs in the room that aren't friendly and are
     *                   capable of keeping the doors closed are killed. Default is false.
     */
    function ClearBossHazards(ignoreNPCs?: boolean): void;

    /** Sets the specified challenge as completed. */
    function ClearChallenge(challenge: Challenge): void;

    /**
     * Removes all completion marks from the specified character.
     *
     * This does not remove their unlocks or achievements.
     */
    function ClearCompletionMarks(character: PlayerType): void;

    /**
     * Spawns a timer effect.
     *
     * The timer function is called every game update, meaning only frames in which the game is
     * actively running and not paused are taken into consideration. If your use case requires a
     * timer that takes paused time into account, stick with a custom timer running on a render
     * callback.
     *
     * @param timerFunction
     * @param delay The delay in frames between each time `timerFunction` is ran.
     * @param times Optional. Default is 1.
     * @param persistent Optional. Whether the timer persists across rooms. Default is true.
     */
    function CreateTimer(
      timerFunction: (effect: EntityEffect) => void,
      delay: int,
      times?: int,
      persistent?: boolean,
    ): EntityEffect;

    /**
     * Creates a weapon and returns it.
     *
     * The weapon is not automatically usable. You must call `Isaac.GetWeaponType` after using this
     * method.
     */
    function CreateWeapon(weaponType: WeaponType, owner: Entity): Weapon;

    /** Destroys the specified weapon. */
    function DestroyWeapon(weapon: Weapon): void;

    /**
     * Draws a line between two positions.
     *
     * This method must be called in a render callback.
     *
     * @param startPos
     * @param endPos
     * @param startColor
     * @param endColor
     * @param thickness Optional. Default is 1.
     */
    function DrawLine(
      startPos: Vector,
      endPos: Vector,
      startColor: KColor,
      endColor: KColor,
      thickness?: int,
    ): void;

    /**
     * Draws a quadrilateral from the four positions.
     *
     * This method must be called in a render callback.
     *
     * @param topLeftPos
     * @param topRightPos
     * @param bottomLeftPos
     * @param bottomRightPos
     * @param color
     * @param thickness Optional. Default is 1.
     */
    function DrawQuad(
      topLeftPos: Vector,
      topRightPos: Vector,
      bottomLeftPos: Vector,
      bottomRightPos: Vector,
      color: KColor,
      thickness?: int,
    ): void;

    /** Completes all of the completion marks for the specified character. */
    function FillCompletionMarks(character: PlayerType): void;

    /**
     * Returns an array of entities inside the specified capsule.
     *
     * @param capsule
     * @param partitions
     */
    function FindInCapsule(
      capsule: Capsule,
      partitions: EntityPartition | BitFlags<EntityPartition>,
    ): Entity[];

    /**
     * @param position
     * @param targetPosition
     * @param pitIndex Optional. Default is -1.
     */
    function FindTargetPit(
      position: Vector,
      targetPosition: Vector,
      pitIndex?: int,
    ): int;

    /**
     * This method is meant to be used when creating local enums that represent custom achievements.
     * (We have to retrieve the ID of the achievement at run-time, because it is dynamically
     * calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `AchievementCustom` (because this corresponds to
     * the REPENTOGON enum of `Achievement`).
     *
     * Never use this method to get the ID of a vanilla achievement; use the `Achievement` enum
     * instead.
     *
     * Returns -1 if no achievement with the specified name was found.
     */
    function GetAchievementIdByName(name: string): Achievement;

    // GetAxisAlignedUnitVectorFromDir is not implemented in favor of Isaacscript Common's
    // `directionToVector` function.

    /**
     * This method is meant to be used when creating local enums that represent custom backdrops.
     * (We have to retrieve the ID of the backdrop at run-time, because it is dynamically calculated
     * based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `BackdropTypeCustom` (because this corresponds to
     * the vanilla enum of `BackdropType`).
     *
     * Never use this method to get the ID of a vanilla backdrop; use the `BackdropType` enum
     * instead.
     *
     * Returns -1 if no backdrop with the specified name was found.
     */
    function GetBackdropIdByName(name: string): BackdropType;

    function GetBossColorIdxByName(name: string): BossColorXMLIndex;

    /** Returns the sprite used to render the controller buttons. */
    function GetButtonsSprite(): Sprite;

    /**
     * Returns the contents of the clipboard as long if it's in text form. Returns undefined if the
     * contents are not text or if it's empty.
     */
    function GetClipboard(): string | undefined;

    /** Returns the corrected position a collectible would spawn at. */
    function GetCollectibleSpawnPosition(position: Vector): Vector;

    /** Returns a completion mark value for the specified character. */
    function GetCompletionMark(
      character: PlayerType,
      mark: CompletionMarkType,
    ): CompletionMarkDifficulty;

    /** Returns the specified character's current completion marks. */
    function GetCompletionMarks(character: PlayerType): PlayerCompletionMarks;

    /** Returns the current level's `StageID`. */
    function GetCurrentStageConfigId(): StageID;

    /**
     * Returns the sprite used for the cursor that is rendered when `Options.MouseControl` is set to
     * true.
     */
    function GetCursorSprite(): Sprite;

    /**
     * This method is meant to be used when creating local enums that represent custom cutscenes.
     * (We have to retrieve the ID of the cutscenes at run-time, because it is dynamically
     * calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `CutsceneCustom` (because this corresponds to the
     * vanilla enum of `Cutscene`).
     *
     * Never use this method to get the ID of a vanilla cutscene; use the `Cutscene` enum instead.
     *
     * Returns -1 if no cutscene with the specified name was found.
     */
    function GetCutsceneIdByName(name: string): Cutscene;

    /** Returns the window's current Dwm attribute value. */
    function GetDwmWindowAttribute(attribute: DwmWindowAttribute): int;

    /**
     * This method is meant to be used when creating local enums that represent custom modded
     * entities. (Sometimes, entity sub-type are automatically generated by the game and are not
     * known until run-time. Other times, it is practical to retrieve the entity sub-type at
     * run-time instead of hard-coding it in two different places in your code-base.)
     *
     * It is conventional to name your local enum `FooSubType` for a custom entity called "Foo".
     * (This corresponds to the style of the vanilla sub-type enums like `MonstroSubType`.)
     *
     * Never use this method to get the sub-type of a vanilla entity; use the corresponding sub-type
     * enum instead, like e.g. `MonstroSubType`.
     *
     * Returns -1 if no entity with the specified name was found.
     */
    function GetEntitySubTypeByName(name: string): int;

    /**
     * This method is meant to be used when creating local enums that represent custom giantbooks.
     * (We have to retrieve the ID of the giantbooks at run-time, because it is dynamically
     * calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `GiantbookTypeCustom` (because this corresponds to
     * the REPENTOGON enum of `GiantbookType`).
     *
     * Never use this method to get the ID of a vanilla giantbook; use the `GiantbookType` enum
     * instead.
     *
     * Returns -1 if no giantbook with the specified name was found.
     */
    function GetGiantBookIdByName(name: string): GiantbookType;

    /**
     * Returns an array of all of the loaded script files. The key for each element is the file's
     * path and the value is what the file returns.
     */
    function GetLoadedModules(): LuaMap<string, unknown>;

    /**
     * Returns the translation string associated with the specified key in the specified category.
     */
    function GetLocalizedString(
      category: string,
      key: string,
      language: LanguageAbbreviation,
    ): string;

    /**
     * Returns the number of times the specified `challenge` was cleared.
     *
     * This method does not work for vanilla challenges.
     */
    function GetModChallengeClearCount(challenge: Challenge): int;

    /** Returns the current time in nanoseconds. */
    function GetNanoTime(): int;

    /**
     * This method is meant to be used when creating local enums that represent custom null items.
     * (We have to retrieve the ID of the null item at run-time, because it is dynamically
     * calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `NullItemIDCustom` (because this corresponds to
     * the vanilla enum of `NullItemID`).
     *
     * Never use this method to get the ID of a vanilla null item; use the `NullItemID` enum
     * instead.
     *
     * Returns -1 if no null item with the specified name was found.
     */
    function GetNullItemIdByName(name: string): NullItemID;

    /**
     * Returns the game's `PersistentGameData` object, which is used to manage persistent game data.
     */
    function GetPersistentGameData(): PersistentGameData;

    /**
     * This method is meant to be used when creating local enums that represent custom item pools.
     * (We have to retrieve the ID of the item pool at run-time, because it is dynamically
     * calculated based on the current mods that the end-user currently has enabled.)
     *
     * It is conventional to name your local enum `ItemPoolTypeCustom` (because this corresponds to
     * the vanilla enum of `ItemPoolType`).
     *
     * Never use this method to get the ID of a vanilla item pool; use the `ItemPoolType` enum
     * instead.
     *
     * Returns -1 if no item pool with the specified name was found.
     */
    function GetPoolIdByName(itemPool: string): ItemPoolType | -1;

    /**
     * Returns the render position from the provided position in world coordinates.
     *
     * @param position
     * @param scale Optional. Default is true.
     */
    function GetRenderPosition(position: Vector, scale?: boolean): Vector;

    /**
     * Returns the translation string associated with the specified key in the specified category.
     * The translation is given in the currently selected language.
     */
    function GetString(category: string, key: LanguageAbbreviation): string;

    /** Returns the appended text on the game's window title. */
    function GetWindowTitle(): string;

    /** Returns whether the specified challenge is complete. */
    function IsChallengeDone(challenge: Challenge): boolean;

    /** Returns whether a run is ongoing and a cutscene is not playing. */
    function IsInGame(): boolean;

    /** Returns whether the game is shutting down. */
    function IsShuttingDown(): boolean;

    /** Creates a new blank `LevelGeneratorEntry`. */
    function LevelGeneratorEntry(): LevelGeneratorEntry;

    /** Marks the specified challenge incomplete. */
    function MarkChallengeAsNotDone(challenge: Challenge): void;

    /**
     * Plays the specified cutscene.
     *
     * @param cutscene
     * @param clearGameState Optional. If true, the run will end and the player is taken back to the
     *                       main menu once the cutscene is finished. Default is false.
     */
    function PlayCutscene(cutscene: Cutscene, clearGameState?: boolean): void;

    /**
     * @param collectible
     * @param position
     * @param scale Optional. Default is `VectorOne`.
     * @param color Optional. Default is `ColorDefault`.
     */
    function RenderCollectionItem(
      collectible: CollectibleType,
      position: Vector,
      scale?: Vector,
      color?: Color,
    ): void;

    /**
     * Forces the Birthright effect of the provided `PlayerType` to have no behavior at all. This
     * method allows you to easily rework an existing birthright effect without the need of creating
     * a fake collectible or wrestling with the birthright's existing behavior.
     *
     * This method will only work when called while mods are loading. After all mods have loaded,
     * calling this method will result in an error.
     */
    function ReworkBirthright(playerType: PlayerType): void;

    /**
     * Forces the provided collectible to have no behavior at all. This method allows you to easily
     * rework an existing collectible without the need of creating a fake collectible or wrestling
     * with the item's existing behavior.
     *
     * This method will only work when called while mods are loading. After all mods have loaded,
     * calling this method will result in an error.
     */
    function ReworkCollectible(collectible: CollectibleType): void;

    /**
     * Forces the provided trinket to have no behavior at all. This method allows you to easily
     * rework an existing trinket without the need of creating a fake trinket or wrestling with the
     * trinket's existing behavior.
     *
     * This method will only work when called while mods are loading. After all mods have loaded,
     * calling this method will result in an error.
     */
    function ReworkTrinket(trinket: TrinketType): void;

    /**
     * Sets the contents of the clipboard to the specified string. Returns whether the contents were
     * set successfully.
     */
    function SetClipboard(contents: string): boolean;

    /** Sets the value of the specified completion mark for a character. */
    function SetCompletionMarks(
      character: PlayerType,
      mark: CompletionMarkType,
      value: CompletionMarkDifficulty,
    ): void;

    /** Sets the character's completion marks. */
    function SetCompletionMarks(completionMarks: PlayerCompletionMarks): void;

    /**
     * Changes the default room backdrop for the current floor to the specified `BackdropType`.
     *
     * The new backdrop does not persist on save/continue. You will need to manually account for
     * that using Isaacscript Common's Save Data Manager.
     */
    function SetCurrentFloorBackdrop(backdrop: BackdropType): void;

    /**
     * Changes the music track for the current floor to the specified `Music`.
     *
     * The new music does not persist on save/continue. You will need to manually account for that
     * using Isaacscript Common's Save Data Manager.
     */
    function SetCurrentFloorMusic(music: Music): void;

    /**
     * Changes the name for the current floor.
     *
     * The new name does not persist on save/continue. You will need to manually account for that
     * using Isaacscript Common's Save Data Manager.
     */
    function SetCurrentFlorName(name: string): void;

    /** Sets the game's Dwm window attribute. */
    function SetDwmWindowAttribute(
      attribute: DwmWindowAttribute,
      value: int,
    ): void;

    /**
     * Sets the game's taskbar icon.
     *
     * @param windowIcon You can choose to either pass `WindowIcon` to use one of the two vanilla
     *                   game icons or pass a path to an .ico file to use as the game's taskbar
     *                   icon.
     * @param bypassResolutionLimit Optional. If true, the 16x16 resolution cap is bypassed.
     */
    function SetIcon(
      windowIcon: WindowIcon | string,
      bypassResolutionLimit: boolean,
    ): void;

    /** To avoid confusion, the title is appended to REPENTOGON's window title. */
    function SetWindowTitle(title: string): void;

    /**
     * Displays a Win32 message box. Returns a `DialogReturn` value which indicates the button
     * pressed.
     *
     * It's a good idea to not heavily rely on this function as:
     *  - Players using a gamepad are unable to navigate the popup. They will have to use a mouse,
     *    keyboard, or touchscreen.
     * - The window title will not show up in some environments such as the Steam Deck.
     *
     * @param title
     * @param text
     * @param dialogIcon Optional. Default is `DialogIcon.ERROR`.
     * @param dialogButtons Optional. Default is `DialogButton.OK`.
     */
    function ShowErrorDialog(
      title: string,
      text: string,
      dialogIcon?: DialogIcon,
      dialogButtons?: DialogButton,
    ): DialogReturn;

    /**
     * Spawns a boss. This method will error if you attempt to spawn an entity that's not an
     * EntityNPC.
     *
     * @param entityType
     * @param variant
     * @param subType
     * @param position
     * @param velocity
     * @param spawner Optional. Default is undefined.
     * @param seed Optional. Default is the current room's seed.
     */
    function SpawnBoss(
      entityType: EntityType,
      variant: int,
      subType: int,
      position: Vector,
      velocity: Vector,
      spawner?: Entity,
      seed?: Seed,
    ): EntityNPC;

    /**
     * @param playerType Optional. Default is `PlayerType.Isaac`.
     * @param challenge Optional. Default is undefined.
     * @param difficulty Optional. Default is `Difficulty.NORMAL`.
     * @param seed Optional. Default is a random seed.
     */
    function StartNewGame(
      playerType?: PlayerType,
      challenge?: Challenge,
      difficulty?: int,
      seed?: Seed,
    ): void;

    /**
     * Simulates a window resize. This is useful to refresh some option changes like
     * `Options.MaxRenderScale`.
     */
    function TriggerWindowResize(): void;

    /**
     * Converts the specified position from world coordinates to a new vector based on the specified
     * menu.
     */
    function WorldToMenuPosition(menu: MainMenuType, position: Vector): Vector;
  }

  interface PlayerCompletionMarks {
    Beast: CompletionMarkDifficulty;
    BlueBaby: CompletionMarkDifficulty;
    BossRush: CompletionMarkDifficulty;
    Delirium: CompletionMarkDifficulty;
    Hush: CompletionMarkDifficulty;
    Isaac: CompletionMarkDifficulty;
    Lamb: CompletionMarkDifficulty;
    MegaSatan: CompletionMarkDifficulty;
    MomsHeart: CompletionMarkDifficulty;
    Mother: CompletionMarkDifficulty;
    PlayerType: PlayerType;
    Satan: CompletionMarkDifficulty;
    UltraGreed: CompletionMarkDifficulty;

    /**
     * Mostly redundant with `UltraGreed` when it has a value of `CompletionMarkDifficulty.HARD`.
     */
    UltraGreedier: CompletionMarkDifficulty;
  }
}
