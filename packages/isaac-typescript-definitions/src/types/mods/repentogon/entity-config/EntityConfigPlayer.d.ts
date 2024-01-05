import type { AchievementType } from "../../../../enums/AchievementType";
import type { SkinColor } from "../../../../enums/SkinColor";
import type {
  CardType,
  CollectibleType,
  PillColor,
  PlayerType,
  TrinketType,
} from "../../../../enums/collections/subTypes";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare global {
  interface EntityConfigPlayer {
    CanShoot: () => boolean;

    /**
     * Returns the achievement tied to a character.
     *
     * Returns -1 if the character is not locked behind a vanilla achievement, or -2 for "hidden"
     * vanilla characters.
     */
    GetAchievementId: () => AchievementType;

    GetBirthrightDescription: () => string;

    GetBlackHearts: () => int;

    GetBombs: () => int;

    GetBrokenHearts: () => int;

    /**
     * Returns the card the character starts with. This does not include starting cards obtained via
     * unlocks or cards added by mods.
     *
     * Returns `CardType.NULL` if the character does not start with a vanilla card.
     */
    GetCard: () => CardType;

    GetCoins: () => int;

    /** Returns an array of CollectibleTypes for the character's starting items. */
    GetCollectibles: () => CollectibleType[];

    /**
     * Returns -1 if the character does not have any XML-defined starting costume, like Maggy's
     * hair.
     */
    GetCostumeID: () => int;

    /** Returns the directory suffix used for character-specific costume sprites. */
    GetCostumeSuffix: () => string;

    /**
     * Returns the path to the .anm2 file displayed on top of the character's level transition and
     * boss VS screen portrait.
     */
    GetExtraPortraitPath: () => string;

    GetKeys: () => int;

    /**
     * Returns the Sprite used for a modded character's starting room controls.
     *
     * Note that this Sprite is shared by other characters from the same mod - there is an animation
     * with the same name as this character.
     *
     * Returns undefined for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedControlsSprite: () => Sprite | undefined;

    /**
     * Returns the Sprite used for a modded character's icon in the co-op character select wheel.
     *
     * Note that this Sprite is shared by other characters from the same mod - there is an animation
     * with the same name as this character.
     *
     * Returns undefined for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedCoopMenuSprite: () => Sprite | undefined;

    /**
     * Returns the Sprite used for a modded character's game over screen (ie, their name).
     *
     * Note that this Sprite is shared by other characters from the same mod - there is an animation
     * with the same name as this character.
     *
     * Returns nil for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedGameOverSprite: () => Sprite | undefined;

    /**
     * Returns the Sprite used for a modded character's character select screen.
     *
     * Note that this Sprite is shared by other characters from the same mod - there is an animation
     * with the same name as this character.
     *
     * Returns nil for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedMenuBackgroundSprite: () => Sprite | undefined;

    /**
     * Returns the Sprite used for a modded character's character select portrait.
     *
     * Note that this Sprite is shared by other characters from the same mod - there is an animation
     * with the same name as this character.
     *
     * Returns nil for vanilla characters, or characters with no corresponding animation.
     */
    GetModdedMenuPortraitSprite: () => Sprite | undefined;

    GetName: () => string;

    /** Returns the path to the PNG file used for the character's name on the boss VS screen. */
    GetNameImagePath: () => string;

    /**
     * Returns the pill the character starts off with. Does not include starting pills obtained via
     * unlocks.
     */
    GetPill: () => PillColor;

    GetPlayerType: () => PlayerType;

    /** Does not include pocket actives added by mods. */
    GetPocketActive: () => CollectibleType;

    /**
     * Path to the PNG file used for the character's main level transition and boss VS screen
     * portrait.
     */
    GetPortraitPath: () => string;

    GetRedHearts: () => int;

    GetSkinColor: () => SkinColor;

    /**
     * If the player is not tainted, the function will return their tainted counterpart. Returns
     * undefined if they do not have a tainted counterpart.
     *
     * If the player is tainted, the function will return their non-tainted counterpart.
     */
    GetTaintedCounterpart: () => EntityConfigPlayer | undefined;

    /**
     * Returns the player's starting trinket. Does not include starting trinkets obtained via
     * unlocks or added by mods.
     */
    GetTrinket: () => TrinketType;

    /**
     * Returns true if the character is not visible/selectable from the character select screen.
     *
     * Does not include characters who are only hidden until unlocked.
     */
    IsHidden: () => boolean;

    IsTainted: () => boolean;
  }
}
