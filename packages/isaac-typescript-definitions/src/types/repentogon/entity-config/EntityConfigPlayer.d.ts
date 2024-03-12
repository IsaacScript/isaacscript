import type {
  CollectibleType,
  PillColor,
  PlayerType,
} from "../../../enums/collections/subTypes";
import type { Achievement } from "../../../enums/repentogon/Achievement";

declare global {
  interface EntityConfigPlayer {
    /** Returns true if the player can shoot, as defined in `players.xml`. */
    CanShoot: () => boolean;

    /** Returns the achievement tied to the player's unlock, as defined in `players.xml`.  */
    GetAchievementID: () => Achievement;

    /**
     * Returns the description of the birthright associated with the player, as defined in
     * `players.xml`.
     */
    GetBirthrightDescription: () => string;

    /** Returns the number of black hearts the player starts with, as defined in `players.xml`. */
    GetBlackHearts: () => int;

    /** Returns the number of bombs the player starts with, as defined in `players.xml`. */
    GetBombs: () => int;

    /** Returns the number of broken hearts the player starts with, as defined in `players.xml`. */
    GetBrokenHearts: () => int;

    /**
     * Returns the CardType the player starts with, as defined in `players.xml`.
     *
     * This does not include starting cards obtained via unlocks or cards added by mods.
     */
    GetCard: () => CardType;

    /** Returns the number of coins the player starts with, as defined in `players.xml`. */
    GetCoins: () => int;

    /** Returns an array of collectibles the player starts with. */
    GetCollectibles: () => CollectibleType;

    /**
     * Returns the player's starting costume id, as defined in `players.xml`. If the player has no
     * starting costume, -1 is returned instead.
     */
    GetCostumeID: () => int;

    /** Returns the player's costume suffix, as defined in `players.xml`. */
    GetCostumeSuffix: () => string;

    /** Returns the path of the extra portrait .anm2, as defined in `players.xml`. */
    GetExtraPortraitPath: () => string;

    /** Returns the number of keys the player starts with, as defined in `players.xml`. */
    GetKeys: () => int;

    /**
     * Returns the sprite used for a modded character's starting room controls.
     *
     * Note that this sprite is shared by other characters from the same mod. To differentiate
     * between characters, there is an animation with the same name as this character.
     *
     * Returns undefined for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedControlsSprite: () => Sprite | undefined;

    /**
     * Returns the sprite used for a modded character's icon in the co-op character select wheel.
     *
     * Note that this sprite is shared by other characters from the same mod. To differentiate
     * between characters, there is an animation with the same name as this character.
     *
     * Returns undefined for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedCoopMenuSprite: () => Sprite | undefined;

    /**
     * Returns the sprite used for a modded character's game over screen (i.e, their name).
     *
     * Note that this sprite is shared by other characters from the same mod. To differentiate
     * between characters, there is an animation with the same name as this character.
     *
     * Returns undefined for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedGameOverSprite: () => Sprite | undefined;

    /**
     * Returns the sprite used for a modded character's character select screen.
     *
     * Note that this sprite is shared by other characters from the same mod. To differentiate
     * between characters, there is an animation with the same name as this character.
     *
     * Returns undefined for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedMenuBackgroundSprite: () => Sprite | undefined;

    /**
     * Returns the sprite used for a modded character's character select portrait.
     *
     * Note that this sprite is shared by other characters from the same mod. To differentiate
     * between characters, there is an animation with the same name as this character.
     *
     * Returns undefined for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedMenuPortraitSprite: () => Sprite | undefined;

    /** Returns the name of the character, as defined in `players.xml` */
    GetName: () => string;

    /**
     * Returns the path to the .png file used for the character's name on the boss VS screen, as
     * defined in `players.xml`.
     */
    GetNameImagePath: () => string;

    /**
     * Returns the pill the character starts with, as defined in `players.xml`
     *
     * This does not include pills obtained via unlocks.
     */
    GetPill: () => PillColor;

    /** Returns the PlayerType of the character. */
    GetPlayerType: () => PlayerType;

    /**
     * Returns the pocket active the character starts with.
     *
     * This does not include items added by mods.
     */
    GetPocketActive: () => CollectibleType;

    /**
     * Returns the path to the .png file used for the character's main level transition and boss VS
     * screen portrait, as defined in `players.xml`
     */
    GetPortraitPath: () => string;

    /** Returns the amount of red hearts the player starts with, as defined in `players.xml` */
    GetRedHearts: () => int;

    /** Returns the player's skin color, as defined in `players.xml` */
    GetSkinColor: () => SkinColor;

    /**
     * Returns the path to the .png file used for the character's primary sprite sheet, as defined
     * in `players.xml`.
     */
    GetSkinPath: () => string;

    /** Returns the amount of soul hearts the character starts with, as defined in `players.xml` */
    GetSoulHearts: () => int;

    /**
     * For non-tainted characters, this function returns their tainted counterpart, or undefined if
     * there is none.
     *
     * For tainted characters, this function returns their non-tainted counterpart.
     */
    GetTaintedCounterpart: () => EntityConfigPlayer | undefined;

    /**
     * Returns the trinket the character starts with.
     *
     * This does not include starting trinkets added by mods or obtained via unlocks.
     */
    GetTrinket: () => TrinketType;

    /**
     * Returns true if the character is not visible/selectable from the character select screen, as
     * defined in `players2.xml`.
     *
     * This does not include characters who are only hidden until unlocked.
     */
    IsHidden: () => boolean;

    /**
     * Returns true if the character is tainted, as defined in `players.xml`
     */
    IsTainted: () => boolean;
  }
}
