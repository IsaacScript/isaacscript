import type { EntityType } from "isaac-typescript-definitions";
import type { BossColorXMLIndex } from "../../enums/xml/BossColorXMLIndex";
import type { XMLNode } from "../../enums/xml/XMLNode";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace XMLData {
    /**
     * Returns an interface containing the attributes of the boss color in `bosscolors.xml` that
     * match the given type, variant, and subtype.
     *
     * @param type
     * @param variant
     * @param subType
     */
    function GetBossColorByTypeVarSub(
      type: EntityType,
      variant: int,
      subType: int,
    ): BossColorsXMLData | undefined;

    /**
     * Returns the attributes of the node in `entities2.xml` matching the specified parameters.
     * Returns undefined if none were found.
     *
     * @param type
     * @param variant Optional. Default is 0.
     * @param subType Optional. Default is 0.
     * @param strict Optional. If true, a value is only returned if all three attributes in a node
     *               matches the provided `EntityType`, variant, and subtype. Otherwise, the game
     *               will return a node as long if the `id` attribute matches the provided
     *               `EntityType`, and will try to filter it down further from the provided
     *               `variant` and `subType`. Default is false.
     */
    function GetEntityByTypeVarSub(
      type: EntityType,
      variant?: int,
      subType?: int,
      strict?: boolean,
    ): Entities2XMLData | undefined;

    /** Returns the attributes of the corresponding xml which matches the provided ID. */
    function GetEntryById(
      nodeType: XMLNode,
      id: int,
    ): Record<string, unknown> | undefined;

    /** Returns the attributes of the corresponding xml which matches the provided name. */
    function GetEntryByName(
      nodeType: XMLNode,
      name: string,
    ): Record<string, unknown> | undefined;

    /** Returns the attributes of the corresponding xml which matches the order in the XML. */
    function GetEntryByOrder(
      nodeType: XMLNode,
      order: int,
    ): Record<string, unknown> | undefined;

    /**
     * Returns the attributes of the node in an XML file matching the entity. Returns undefined if
     * none were found.
     *
     * @param entity
     * @param autoXMLPick Optional. If true, the game will pick the XML that matches the entity's
     *                    type (Ex: `items.xml` for pedestal collectibles). Otherwise, the game will
     *                    only use `entities2.xml`. Default is true.
     * @param strict Optional. If true, a value is only returned if all three attributes in a node
     *               matches the provided `EntityType`, variant, and subtype. Otherwise, the game
     *               will return a node as long if the `id` attribute matches the provided
     *               `EntityType`, and will try to filter it down further from the provided
     *               `variant` and `subType`. Default is false.
     */
    function GetEntryFromEntity(
      entity: Entity,
      autoXMLPick?: boolean,
      strict?: boolean,
    ): Record<string, unknown> | undefined;

    /**
     * Returns the node of a mod's `metadata.xml` file matching the specified mod ID. Returns
     * undefined if none were found.
     *
     * The ID of a mod is its workshop id. If a mod was not downloaded off of the Steam Workshop,
     * then the directory is the ID.
     */
    function GetModById(modId: string): MetadataXMLData | undefined;

    /** Returns the number of entries the provided `XMLNode` structure has. */
    function GetNumEntries(nodeType: XMLNode): int;
  }

  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface BossColorsXMLData {
    anm2path?: string;
    hp?: string;
    idx?: BossColorXMLIndex;
    scale?: string;
  }

  /**
   * Even though the attributes in the "entities2.xml" file are not all lowercase, the parser
   * convents them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface Entities2XMLData {
    anm2path: string;
    basehp: string;
    bestiaryanim: string;
    bestiaryoverlay: string;
    boss?: string;
    bossid?: string;
    champion?: string;
    collisiondamage?: string;
    collisioninterval?: string;
    collisionmass?: string;
    collisionradius?: string;
    collisionradiusxmulti?: string;
    collisionradiusymulti?: string;
    friction?: string;
    gibamount?: string;
    gibflags?: string;
    gibs?: Array<{
      amount?: string;
      blood?: string;
      bone?: string;
      chain?: string;
      colorblood?: string;
      dust?: string;
      eye?: string;
      gut?: string;
      huge?: string;
      large?: string;
      poop?: string;
      rock?: string;
      rock_small?: string;
      small?: string;
      sound_baby?: string;
      sound_bone?: string;
      worm?: string;
    }>;
    gridcollision?: string;
    hasflooralts?: string;
    id?: string;
    name?: string;
    numgridcollisionpoints?: string;
    portrait?: string;
    reroll?: string;
    shadowsize?: string;
    shieldstrength?: string;
    shutdoors?: string;
    sourceid: string;
    stagehp?: string;
    subtype?: string;
    tags?: string;
    variant?: string;
  }

  /**
   * Even though the attributes in the "metadata.xml" file are not all lowercase, the parser
   * convents them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface MetadataXMLData {
    name?: string;
    directory?: string;
    id?: string;
    description?: string;
    version?: string;
    visibility?: string;
  }

  /**
   * Even though the attributes in the "achievements.xml" file are not all lowercase, the parser
   * convents them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface AchievementsXMLData {
    gfx: string;
    gfxback?: string;
    gfxroot: string;
    hidden?: string;
    id: string;
    name?: string;
    sourceid: string;
    steam_description?: string;
    steam_icon?: string;
    steam_name?: string;
    text: string;
  }

  /**
   * Even though the attributes in the "backdrops.xml" file are not all lowercase, the parser
   * convents them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface BackdropsXMLData {
    bridge?: string;
    door?: string;
    effectsgfxroot?: string;
    floors?: string;
    floorvariants?: string;
    gfx?: string;
    gfxroot: string;
    holeinwall?: string;
    id?: string;
    lfloorgfx?: string;
    name?: string;
    nfloorgfx?: string;
    pit?: string;
    props?: string;
    reftype?: string;
    reversewatergfx?: string;
    rocks?: string;
    sourceid: string;
    spikes?: string;
    walls?: string;
    wallvariants?: string;
    watergfx?: string;
    waterpit?: string;
    waterpitsmode?: string;
  }

  /**
   * Even though the attributes in the "costumes2.xml" file are not all lowercase, the parser
   * convents them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface Costumes2XMLData {
    anm2path?: string;
    forcebodycolor?: string;
    forceheadcolor?: string;
    hasoverlay?: string;
    hasskinalt?: string;
    id: string;
    isflying?: string;
    name?: string;
    overwritecolor?: string;
    priority?: string;
    relativeid?: string;
    skincolor?: string;
    sourceid: string;
    type?: string;
  }

  /**
   * Even though the attributes in the "curses.xml" file are not all lowercase, the parser convents
   * them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface CursesXMLData {
    id: string;
    name?: string;
    sourceid: string;
    sourcepath?: string;
    relativeid?: string;
    untranslatedname?: string;
  }

  /**
   * Even though the attributes in the "items.xml" file are not all lowercase, the parser convents
   * them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface ItemsXMLData {
    achievement?: string;
    addcostumeonpickup?: string;
    blackhearts?: string;
    bombs?: string;
    cache?:
      | "firedelay"
      | "damage"
      | "speed"
      | "range"
      | "tearcolor"
      | "tearflag"
      | "color"
      | "size"
      | "shotspeed"
      | "all"
      | "luck"
      | "flying"
      | "weapon"
      | "familiars";
    chargetype?: "normal" | "timed" | "special";
    cleareffectsonremove?: string;
    coins?: string;
    cooldown?: string;
    craftquality?: "-1" | "0" | "1" | "2" | "3" | "4";
    description: string;
    devilprice?: "1" | "2";
    gfx: string;
    gfxroot: string;
    hearts?: string;
    hidden?: string;
    id?: string;
    initcharge?: string;
    keys?: string;
    maxhearts?: string;
    name: string;
    passivecache?: string;
    persistent?: string;
    quality?: "0" | "1" | "2" | "3" | "4";
    shopprice?: string;
    sourceid: string;
    soulhearts?: string;
    special?: string;
    tags?: string;
    type: string;
    version: string;
  }

  /**
   * Even though the attributes in the "music.xml" file are not all lowercase, the parser convents
   * them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface MusicXMLData {
    id: string;
    intro?: string;
    layer?: string;
    layerfadespeed?: string;
    layerintro?: string;
    layermode?: string;
    layermul?: string;
    loop?: string;
    mul?: string;
    name: string;
    path?: string;
    root?: string;
    sourceid: string;
  }

  /**
   * Even though the attributes in the "players.xml" file are not all lowercase, the parser convents
   * them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface PlayersXMLData {
    achievement?: string;
    armor?: string;
    birthright?: string;
    black?: string;
    blackheart?: string;
    bonehearts?: string;
    bombs?: string;
    broken?: string;
    brokenhearts?: string;
    bskinparent?: string;
    canshoot?: string;
    card?: string;
    coins?: string;
    completionparent?: string;
    costume?: string;
    costumesuffix?: string;
    damagemodifier?: string;
    eternalheart?: string;
    extraportrait?: string;
    firedelaymodifier?: string;
    gigabombs?: string;
    goldenhearts?: string;
    healthlimit?: string;
    healthtype?: string;
    heartcontainers?: string;
    hidden?: string;
    hp?: string;
    items?: string;
    keys?: string;
    luckmodifier?: string;
    modcostume?: string;
    name: string;
    nameimage?: string;
    nameimageroot: string;
    nomarks?: string;
    pocketactive?: string;
    portrait?: string;
    portraitroot: string;
    rangemodifier?: string;
    redhearts?: string;
    root: string;
    rottenhearts?: string;
    shotspeedmodifier?: string;
    skin?: string;
    skincolor?: string;
    soulhearts?: string;
    sourceid: string;
    speedmodifier?: string;
    trinket?: string;
    untranslatedbirthright?: string;
    untranslatedname?: string;
  }

  /**
   * Even though the attributes in the "sounds.xml" file are not all lowercase, the parser convents
   * them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface SoundsXMLData {
    name: string;
    root: string;
    sample: Array<{
      weight: string;
      path: string;
    }>;
    sourceid: string;
  }

  /**
   * Even though the attributes in the "wisps.xml" file are not all lowercase, the parser convents
   * them all to lowercase, so they must be accessed as such.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  export interface WispsXMLData {
    canshoot?: string;
    corecolor?: string;
    coregfx?: string;
    count?: string;
    damage?: string;
    damagemultiplier2?: string;
    firedelay?: string;
    flamecolor?: string;
    gfxroot: string;
    hp?: string;
    id: string;
    layer?: string;
    name?: string;
    priority?: string;
    procchance?: string;
    relativeid?: string;
    shotspeed?: string;
    sourceid: string;
    tearcolor?: string;
    tearcolor2?: string;
    tearflags?: string;
    tearflags2?: string;
    tearscale?: string;
    tearscale2?: string;
    tearvariant?: string;
  }
}
