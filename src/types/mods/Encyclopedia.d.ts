import { PlayerType } from "../../enums/collections/subTypes";

declare global {
  const Encyclopedia: EncyclopediaInterface | undefined;

  interface EncyclopediaInterface {
    AddCharacter(args: {
      CompletionTrackerFuncs: [() => EncyclopediaItemVars[]];
      ID: PlayerType;
      ModName: string;
      Name: string;
    }): void;

    AddCharacterTainted(args: {
      CompletionTrackerFuncs: [() => EncyclopediaItemVars[]];
      Description: string;
      ID: PlayerType;
      ModName: string;
      Name: string;
      UnlockFunc: (args: EncyclopediaItemVars) => EncyclopediaItemVars;
    }): void;

    AddItem(itemTab: {
      ActiveCharge?: number;
      Class?: string;
      CloseFunc: (vars: EncyclopediaItemVars) => void;
      Desc?: string;
      Hide?: boolean;
      ID: number;
      ModName?: string;
      Name?: string;
      Pools: EncyclopediaItemPools;
      Sprite: Sprite;
      StatusFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      UnlockFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      WikiDesc?: EncyclopediaWikiDescription;
    }): void;

    AddItemPoolSprite(id: number, sprite: Sprite): void;

    AddPocketItem(
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
        ) => EncyclopediaItemVars | void;
        WikiDesc?: EncyclopediaWikiDescription;
      },
      eType: string,
    ): void;

    AddRune(itemTab: {
      Class: string;
      Desc?: string;
      ID: number;
      ModName?: string;
      Name?: string;
      RuneType: number;
      Sprite?: Sprite;
      StatusClose: (vars: EncyclopediaItemVars) => void;
      StatusFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      UnlockFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars | void;
      WikiDesc?: EncyclopediaWikiDescription;
    }): void;

    AddTrinket(itemTab: {
      Class?: string;
      Desc?: string;
      Hide?: boolean;
      ID: number;
      ModName?: string;
      Name?: string;
      Sprite?: Sprite;
      StatusClose?: (vars: EncyclopediaItemVars) => void;
      StatusFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
      UnlockFunc?: (vars: EncyclopediaItemVars) => EncyclopediaItemVars | void;
      WikiDesc?: EncyclopediaWikiDescription;
    }): void;

    EIDtoWiki(desc: string, title?: string): void;

    GetItemPoolIdByName(name: string): number;

    RegisterSprite(
      gfxRoot: string,
      anmToPlay: string,
      anmFrame: number,
      newSprite: string,
      layer: number,
    ): Sprite;
    ItemPools: EncyclopediaItemPools;
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
  type EncyclopediaWikiDescription = [
    {
      header: {
        clr?: number;
        fSize?: number;
        hAlign?: number;
        str: string;
      };
      paragraphs: [
        {
          str: string;
        },
      ];
    },
  ];

  /** Encyclopedia's "General Item Variables" object. Used to store data about an item. */
  interface EncyclopediaItemVars {
    CloseFunc(vars: EncyclopediaItemVars): void;
    StatusFunc(vars: EncyclopediaItemVars): EncyclopediaItemVars;

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
}
