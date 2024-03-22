import type {
  Achievement,
  BackdropType,
  Challenge,
  Cutscene,
  EntityPartition,
  LanguageAbbreviation,
  Music,
  NullItemID,
  PlayerType,
  StageID,
  WeaponType,
} from "isaac-typescript-definitions";
import type { CompletionMarkDifficulty } from "../../enums/CompletionMarkDifficulty";
import type { CompletionMarkType } from "../../enums/CompletionMarkType";
import type { DialogButton } from "../../enums/DialogButton";
import type { DialogIcon } from "../../enums/DialogIcon";
import type { DialogReturn } from "../../enums/DialogReturn";
import type { GiantbookType } from "../../enums/GiantbookType";
import type { MainMenuType } from "../../enums/MainMenuType";
import type { TaintedMarksGroup } from "../../enums/TaintedMarksGroup";
import type { Capsule } from "./Capsule";

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
    function ClearBossHazards(ignoreNPCs?: EntityNPC): void;

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
     * The timer is called every game update, meaning only frames in which the game is actively
     * running and not paused are taken into consideration.
     *
     * If your use case requires a timer that takes paused time into account, stick with a custom
     * timer running on a render callback.
     *
     * @param callback Ran after `interval` amount of frames has passed.
     * @param interval The interval in frames for `callback` to be ran.
     * @param persistent Whether the timer persists across rooms.
     */
    function CreateTimer(
      callback: () => void,
      interval: int,
      persistent: boolean,
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
     */
    function DrawLine(
      startPos: Vector,
      endPos: Vector,
      startColor: KColor,
      endColor: KColor,
      thickness: int,
    ): void;

    /**
     * Draws a quadrilateral from the four positions.
     *
     * This method must be called in a render callback.
     */
    function DrawQuad(
      topLeftPos: Vector,
      topRightPos: Vector,
      bottomLeftPos: Vector,
      color: KColor,
      thickness: int,
    ): void;

    /** Completes all of the completion marks for the specified character. */
    function FillCompletionMarks(character: PlayerType): void;

    /**
     * Returns an array of entities inside the specified capsule.
     *
     * @param capsule
     * @param partitions Optional. Default is `EntityPartitionZero`.
     */
    function FindInCapsule(
      capsule: Capsule,
      partitions: BitFlags<EntityPartition>,
    ): Entity[];

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
    function GetAchievementByName(name: string): Achievement;

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

    /**
     * Returns the contents of the clipboard as long if it's in text form. Returns undefined if the
     * contents are not text or if it's empty.
     */
    function GetClipboard(): string | undefined;

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
    function GetLoadedModules(): Array<LuaTable<string, unknown>>;

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

    function GetPersistentGameData(): PersistentGameData;

    /**
     * @param position
     * @param scale Optional. Default is true.
     */
    function GetRenderPosition(position: Vector, scale?: boolean): Vector;

    /**
     * Returns the translation string associated with the specified key in the specified category.
     * The translation is given in the currently selected language.
     */
    function GetString(category: string, key: LanguageAbbreviation): string;

    /** Returns whether the specified challenge is complete. */
    function IsChallengeDone(challenge: Challenge): boolean;

    /** Returns whether a run is ongoing and a cutscene is not playing. */
    function IsInGame(): boolean;

    /** Creates a new blank `LevelGeneratorEntry`. */
    function LevelGeneratorEntry(): LevelGeneratorEntry;

    /** Marks the specified challenge incomplete. */
    function MarkChallengeAsNotDone(challenge: Challenge): void;

    /** Plays the specified cutscene. */
    function PlayCutscene(cutscene: Cutscene): void;

    /**
     * Sets the contents of the clipboard to the specified string. Returns whether the contents were
     * set successfully.
     */
    function SetClipboard(contents: string): void;

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

    /**
     * Displays a Win32 message box. Returns a `DialogReturn` value which indicates the button
     * pressed.
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
