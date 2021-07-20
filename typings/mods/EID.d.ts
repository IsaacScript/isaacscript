declare const EID: ExternalItemDescriptions;

declare type EIDDescriptionObj = {
  ItemType: int;
  ItemVariant: int;
  RealID: int;
  ID: int;
  fullItemString: string;
  Name: string;
  Description: string;
  Transformation: string;
};

/**
 * @param LeftOffset Defaults to -1.
 * @param TopOffset Defaults to 0.
 * @param SpriteObject Defaults to `EID.InlineIconSprite`.
 */
declare type EIDInlineIcon = [
  Animationname: string,
  Frame: int,
  Width: int,
  Height: int,
  LeftOffset?: int,
  TopOffset?: int,
  SpriteObject?: Sprite,
];

declare type EIDTransformationTargetType =
  | "collectible"
  | "trinket"
  | "card"
  | "pill"
  | "entity";

declare class ExternalItemDescriptions {
  /** Adds a description for a collectible. */
  addCollectible(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;

  /** Adds a description for a trinket. */
  addTrinket(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;
  
  /** Adds a description for a card/rune. */
  addCard(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;
  
  /** Adds a description for a pilleffect id. */
  addPill(
    id: int,
    description: string,
    itemName?: string,
    language?: string,
  ): void;

  /** Adds a character specific description for the item "Birthright". */
  addBirthright(
    characterId: int,
    description: string,
    playerName?: string,
    language?: string,
  ): void;

  /** Creates a new transformation. */
  createTransformation(
    uniqueName: string,
    displayName: string,
    language?: string,
  ): void;

  /**
   * Assigns transformations to an entity (Adds to existing transformations).
   *
   * When type = entity, targetIdentifier must be in the format "ID.Variant.subtype".
   * For any other type, it can just be the id.
   *
   * EXAMPLE: `EID.assignTransformation("collectible", 1, "My Transformation")`.
   */
  assignTransformation(
    targetType: EIDTransformationTargetType,
    targetIdentifier: string | int,
    transformationString: string,
  ): void;

  /**
   * Removes a transformation from an entity.
   *
   * When type = entity, targetIdentifier must be in the format "ID.Variant.subtype".
   * For any other type, it can just be the id.
   *
   * EXAMPLE: `EID.removeTransformation("collectible", 1, "My Transformation")`.
   */
  removeTransformation(
    targetType: EIDTransformationTargetType,
    targetIdentifier: string | int,
    transformationString: string,
  ): void;

  /** Removes a given value from the string inside a table. Example: `"1,2,3"`, removing `2` will return `"1,3"`. */
  removeEntryFromString(
    sourceTable: LuaTable<never, string> | string[],
    entryKey: never,
    entryValue: string,
  ): void;

  /**
   * Adds a description for an entity.
   *
   * When subtype is -1 or null, it will affect all subtypes of that entity.
   */
  addEntity(
    id: int,
    variant: int,
    subtype: int | null,
    entityName: string,
    description: string,
    language?: string,
  ): void;

  /**
   * Adds a new icon object with the shortcut defined in the "shortcut" variable (e.g. "{{shortcut}}" = your icon).
   *
   * Shortcuts are case-sensitive! Shortcuts can be overridden with this function to allow for full control over everything.
   *
   * Setting "animationFrame" to -1 will play the animation.
   * The spriteObject needs to be of class Sprite() and have an .anm2 loaded to do this.
   *
   * @param leftOffset Defaults to -1.
   * @param topOffset Defaults to 0.
   */
  addIcon(
    shortcut: string,
    animationName: string,
    animationFrame: int,
    width: int,
    height: int,
    leftOffset: float | null,
    topOffset: float | null,
    spriteObject: Sprite,
  ): void;

  /**
   * Adds a new color object with the shortcut defined in the "shortcut" variable (e.g. "{{shortcut}}" = your color).
   *
   * Shortcuts are case-sensitive! Shortcuts can be overridden with this function to allow for full control over everything.
   *
   * Define a callback to let it be called when interpreting the color-markup. Define a `KColor` otherwise for a simple color change.
   */
  addColor(
    shortcut: string,
    kColor: KColor,
    callback?: (color: KColor) => KColor,
  ): void;

  /**
   * Overrides all potentially displayed texts and permanently displays the given texts. Can be turned off again using
   * {@link EID.hidePermanentText EID:hidePermanentText()}.
   */
  displayPermanentText(descriptionObject: EIDDescriptionObj): void;

  /** Hides permanently displayed text objects if they exist. */
  hidePermanentText(): void;

  /** Turns entity type names into actual ingame ID.Variant pairs. */
  getIDVariantString(typeName: string): string;

  /** Turns entity type and variants into their EID table-name. */
  getTableName(Type: int, Variant: int, SubType: int): string;

  /** Loads a given font from a given file path and use it to render text. */
  loadFont(fontFileName: string): boolean;

  /** Returns if EID is displaying text right now. */
  isDisplayingText(): boolean;

  /** Returns `true`, if curse of blind is active. */
  hasCurseBlind(): boolean;

  /** Returns the current text position. */
  getTextPosition(): Vector;

  /**
   * Adds a text position modifier `Vector`, which will be applied to the text position variable.
   *
   * Useful to add small offsets. For example: for schoolbag HUD.
   */
  addTextPosModifier(identifier: string, modifierVector: Vector): void;

  /**
   * Removes a text position modifier `Vector`.
   *
   * Useful to remove small offsets. For example: for schoolbag HUD.
   */
  removeTextPosModifier(identifier: string): void;

  /**
   * Changes the initial position of all EID descriptions.
   *
   * Useful to totally alter and override the current initial overlay position.
   */
  alterTextPos(newPosVector: Vector): void;

  /** Returns the entity that is currently described. Returns last described entity if currently not displaying text. */
  getLastDescribedEntity(): Entity;

  /** Appends a given string to the description of a given `EIDDescriptionObj`. */
  appendToDescription(descObj: EIDDescriptionObj, appendString: string): void;

  /**
   * Returns the description object of the specified entity.
   *
   * Falls back to English if the objID isn't available.
   */
  getDescriptionObj(Type: int, Variant: int, SubType: int): EIDDescriptionObj;

  /**
   * Fetches description table from the legacy mod descriptions if they exist.
   *
   * @returns ["", "", description], ["", name, description], or `null` (if there is no legacy description).
   */
  getLegacyModDescription(
    Type: int,
    Variant: int,
    SubType: int,
  ): ["", "", string] | ["", string, string] | null;

  /**
   * Returns the specified object table in the current language.
   *
   * Falls back to English if it doesn't exist.
   */
  getDescriptionEntry(objTable: string, objID?: string): EIDDescriptionObj;

  /**
   * Returns the description data table in the current language related to a given id, variant and subtype.
   *
   * Falls back to English if it doesn't exist.
   */
  getDescriptionData(Type: int, Variant: int, SubType: int): EIDDescriptionObj;

  /** Returns an adjusted SubType id for special cases like Horse Pills and Golden Trinkets. */
  getAdjustedSubtype(Type: int, Variant: int, SubType: int): int;

  /**
   * Gets the transformation uniqueName / ID of a given entity.
   *
   * Example: `EID:getTransformation(5,100,34)`  will return `"12"` which is the id for Bookworm.
   */
  getTransformation(Type: int, Variant: int, SubType: int): string;

  /**
   * Gets the name of the given transformation by its uniqueName / ID.
   *
   * (Note: this function might be broken)
   */
  getTransformationName(id: string): string;

  /** Tries to get the ingame name of an item based on its ID. */
  getObjectName(Type: int, Variant: int, SubType: int): string;

  /**
   * Tries to get the ingame description of an object, based on their description in the XML files.
   * @returns `"(No Description available)"` if it cannot find the given object's description.
   */
  getXMLDescription(
    Type: int,
    Variant: int,
    SubType: int,
  ): string | "(No Description available)";

  /** Check if an entity is part of the describable entities. */
  hasDescription(entity: Entity): boolean;

  /** Replaces shorthand-representations of a character with the internal reference. */
  replaceShortMarkupStrings(text: string): string;

  /**
   * Generates a string with the defined pixel-length using a custom 1px wide character.
   *
   * This will only work for EID's specific custom font.
   */
  generatePlaceholderString(length: int): string;

  /**
   * Returns the `EIDInlineIcon` object of a given icon string.
   *
   * Can be used to validate an icon string.
   */
  getIcon(str: string): EIDInlineIcon;

  /**
   * Tries to read special markup used to generate icons for all Collectibles/Trinkets and the default Cards/Pills.
   * @returns An `EIDInlineIcon` Object or `null` if no parsing was possible.
   */
  createItemIconObject(str: string): EIDInlineIcon | null;

  /** Returns the icon for a given transformation name or ID. */
  getTransformationIcon(str: string): EIDInlineIcon;

  /** Returns the width of a given string in pixels */
  getStrWidth(str: string): int;

  /**
   * Searches through the given string and replaces Icon placeholders with icons.
   * Returns 2 values:
   *
   * - The string without the placeholders but with an accurate space between lines.
   * - An array of tables containing each Inline Sprite and the preceding text width.
   */
  filterIconMarkup(
    text: string,
    textPosX?: int,
    textPosY?: int,
  ): LuaMultiReturn<[string, Array<[EIDInlineIcon, int]>]>;

  /**
   * Renders a list of given inline sprite objects returned by the
   * {@link EID.filterIconMarkup EID:filterIconMarkup()} function.
   *
   * Table entry format: {`EIDInlineIcon` Object, Width of text preceding the icon}.
   */
  renderInlineIcons(
    spriteTable: Array<[EIDInlineIcon, int]>,
    posX: int,
    posY: int,
  ): void;

  /** Helper function to render Icons in specific EID settings. */
  renderIcon(spriteObj: Sprite, posX: int, posY: int): void;

  /** Returns the icon used for the bulletpoint. It will look at the first word in the given string. */
  handleBulletpointIcon(text: string): EIDInlineIcon;

  /**
   * Gets a `KColor` from a Markup-string (example Input: `"{{ColorText}}"`).
   *
   * @returns The `KColor` object and a `boolean` value indicating if the given string was a color markup or not.
   */
  getColor(str: string, baseKColor: KColor): LuaMultiReturn<[KColor, boolean]>;

  /**
   * Filters a given string and looks for `KColor` markup. Splits the text into subsections limited by them.
   *
   * @returns: An array of tables containing subsections of the text, their respective `KColor`, and the width of the subsection.
   */
  filterColorMarkup(
    text: string,
    baseKColor: KColor,
  ): Array<[string, KColor, int]>;

  /**
   * Fits a given string to a specific width.
   * @returns The string as a table of lines.
   */
  fitTextToWidth(str: string, textboxWidth: number): string[];

  /**
   * Renders a given string using the EID custom font. This will also apply any markup and render icons.
   *
   * Needs to be called in a render callback.
   * @returns The last used `KColor`.
   */
  renderString(
    str: string,
    position: Vector,
    scale: Vector,
    kcolor: KColor,
  ): KColor;

  /**
   * Adds Description object modifiers.
   * Used for altering descriptions. Examples: Spindown dice, Tarot Cloth, etc.
   * @param condition A function that returns `true` if `callback` should be called on the given description string.
   * @param callback A function that returns a modified version of the given description string.
   */
  addDescriptionModifier(
    modifierName: string,
    condition: (testDescription: string) => boolean,
    callback: (oldDescription: string) => string,
  ): void;

  /**
   * Removes a Description object modifier.
   * Used for altering descriptions. Examples: Spindown dice, Tarot Cloth, etc.
   */
  removeDescriptionModifier(modifierName: string): void;

  /** Interpolates between 2 KColors with a given fraction. */
  interpolateColors(kColor1: KColor, kColor2: KColor, fraction: number): KColor;

  /** Converts a given CollectibleID into the respective Spindown dice result. */
  getSpindownResult(collectibleID: int): int;

  /**
   * Converts a given table into a string containing the crafting icons of the table.
   *
   * Example input: `{1,2,3,4,5,6,7,8}`.
   *
   * Result: `"{{Crafting8}}{{Crafting7}}{{Crafting6}}{{Crafting5}}{{Crafting4}}{{Crafting3}}{{Crafting2}}{{Crafting1}}"`.
   *
   * Prefer {@link EID.tableToCraftingIconsMerged tableToCraftingIconsMerged()}, due to improved render performance.
   */
  tableToCraftingIconsFull(craftTable: int[]): string;

  /**
   * Converts a given table into a string containing the crafting icons of the table, which are also grouped to reduce render lag.
   *
   * Example input: `{1,1,1,2,2,3,3,3}`.
   *
   * Result: `"3{{Crafting3}}2{{Crafting2}}3{{Crafting1}}"`.
   */
  tableToCraftingIconsMerged(craftTable: int[]): string;

  /** Gets the size of the screen. */
  GetScreenSize(): Vector;

  /** Creates a copy of a `KColor` object. This prevents overwriting existing `KColor` objects. */
  copyKColor(colorObj: KColor): KColor;

  /** Compares two KColors. Returns true if they are equal. */
  areColorsEqual(c1: KColor, c2: KColor): boolean;

  /** Get `KColor` object of "Entity Name" texts. */
  getNameColor(): KColor;

  /** Get `KColor` object of "Description" texts. */
  getTextColor(): KColor;

  /** Get `KColor` object of "Transformation" texts. */
  getTransformationColor(): KColor;

  /** Get `KColor` object of "Error" texts. */
  getErrorColor(): KColor;
}
