import type { PlayerType } from "../../enums/collections/subTypes";
import type { EncyclopediaItemPoolType } from "../../enums/mods/EncyclopediaItemPoolType";

declare global {
  /**
   * This is the global variable exposed by the third-party Encyclopedia mod, which provides
   * descriptions for items and is often utilized by other mods that include items.
   *
   * @see https://steamcommunity.com/workshop/filedetails/?id=2376005362
   */
  const Encyclopedia: EncyclopediaInterface | undefined;

  /** @noSelf */
  interface EncyclopediaInterface {
    AddCharacter: (args: {
      Class?: string;
      CloseFunc?: (vars: EncyclopediaItemVars) => void;
      CompletionRenderFuncs?: [
        (vec: Vector, notes: EncyclopediaNotes, type: string) => void,
      ];
      CompletionTrackerFuncs?: [() => EncyclopediaItemVars[]];
      Description?: string;
      Hide?: boolean;
      ID: PlayerType;
      ModName?: string;
      Name?: string;
      Sprite?: Sprite;
      UnlockFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      WikiDesc?: EncyclopediaWikiDescription;
    }) => void;

    AddCharacterTainted: (args: {
      Class?: string;
      CloseFunc?: (vars: EncyclopediaItemVars) => void;
      CompletionRenderFuncs?: [
        (vec: Vector, notes: EncyclopediaNotes, type: string) => void,
      ];
      CompletionTrackerFuncs?: [() => EncyclopediaItemVars[]];
      Description?: string;
      Hide?: boolean;
      ID: PlayerType;
      ModName?: string;
      Name?: string;
      Sprite?: Sprite;
      UnlockFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      WikiDesc?: EncyclopediaWikiDescription;
    }) => void;

    AddItem: (itemTab: {
      ActiveCharge?: number;
      Class?: string;
      CloseFunc?: (vars: EncyclopediaItemVars) => void;
      Desc?: string;
      Hide?: boolean;
      ID: number;
      ModName?: string;
      Name?: string;
      Pools?: EncyclopediaItemPoolType[];
      Sprite?: Sprite;
      StatusFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      UnlockFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      WikiDesc?: EncyclopediaWikiDescription;
    }) => void;

    AddItemPoolSprite: (id: number, sprite: Sprite) => void;

    AddPocketItem: (
      itemTab: {
        Class?: string;
        Desc?: string;
        Hide?: boolean;
        ID: number;
        ModName?: string;
        Name?: string;
        Sprite?: Sprite;
        StatusClose?: (vars: EncyclopediaItemVars) => void;
        StatusFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
        UnlockFunc?: (
          vars: EncyclopediaItemVars,
        ) => EncyclopediaItemVars | undefined;
        WikiDesc?: EncyclopediaWikiDescription;
      },
      eType: string,
    ) => void;

    AddRune: (itemTab: {
      Class?: string;
      Desc?: string;
      ID: number;
      ModName?: string;
      Name?: string;
      RuneType?: number;
      Sprite?: Sprite;
      StatusClose?: (vars: EncyclopediaItemVars) => void;
      StatusFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      UnlockFunc?: (
        vars: EncyclopediaItemVars,
      ) => EncyclopediaItemVars | undefined;
      WikiDesc?: EncyclopediaWikiDescription;
    }) => void;

    AddTrinket: (itemTab: {
      Class?: string;
      Desc?: string;
      Hide?: boolean;
      ID: number;
      ModName?: string;
      Name?: string;
      Sprite?: Sprite;
      StatusClose?: (vars: EncyclopediaItemVars) => void;
      StatusFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      UnlockFunc?: (
        vars: EncyclopediaItemVars,
      ) => EncyclopediaItemVars | undefined;
      WikiDesc?: EncyclopediaWikiDescription;
    }) => void;

    EIDtoWiki: (desc: string, title?: string) => void;

    GetItemPoolIdByName: (name: string) => number;

    RegisterSprite: (
      gfxRoot: string,
      anmToPlay: string,
      anmFrame: number,
      newSprite?: string,
      layer?: number,
    ) => Sprite;
    ItemPools: int;
  }

  /**
   * Contains Encyclopedia's custom item pool system. It uses custom item pools in order to allow
   * better compatibility with modded pools. The same as the ItemPoolType enum, but every pool is 1
   * value higher, "to handle table indices better".
   */
  type EncyclopediaItemPools = Record<string, number>;

  /**
   * A description for an item. Each object in the array is a category, containing a header and as
   * many paragraphs as are needed.
   */

  interface EncyclopediaWikiDescriptionLine {
    clr?: number;
    fsize?: number; // cspell:ignore fsize
    halign?: number; // cspell:ignore halign
    str: string;
  }

  type EncyclopediaWikiDescription = EncyclopediaWikiDescriptionLine[][];

  /** Encyclopedia's "General Item Variables" object. Used to store data about an item. */
  interface EncyclopediaItemVars {
    CloseFunc: (vars: EncyclopediaItemVars) => void;
    StatusFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;

    AllIndex?: number;
    AllIntIndex: number;
    Class: string;
    Desc?: string;
    Index?: number;
    ItemID: number;
    Name?: string;
    Pools?: EncyclopediaItemPools;
    Spr: Sprite;
    Title?: string;
    WikiDesc?: EncyclopediaWikiDescription;
    typeString: string;
  }

  /** A single entry on the unlock Post-It. */
  interface EncyclopediaPostItUnlock {
    Hard: boolean;
    Unlock: boolean;
  }

  /** Encyclopedia's "Post-It Notes" object. Used for rendering custom Post-Its. */
  interface EncyclopediaNotes {
    Beast: EncyclopediaPostItUnlock;
    BlueBaby: EncyclopediaPostItUnlock;
    BossRush: EncyclopediaPostItUnlock;
    Delirium: EncyclopediaPostItUnlock;
    Hush: EncyclopediaPostItUnlock;
    Isaac: EncyclopediaPostItUnlock;
    Lamb: EncyclopediaPostItUnlock;
    MegaSatan: EncyclopediaPostItUnlock;
    MomsHeart: EncyclopediaPostItUnlock;
    Mother: EncyclopediaPostItUnlock;
    Satan: EncyclopediaPostItUnlock;
  }
}
