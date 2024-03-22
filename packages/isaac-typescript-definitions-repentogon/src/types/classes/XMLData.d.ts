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
    stagehp?: string;
    subtype?: string;
    tags?: string;
    variant?: string;
  }

  /**
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
}
