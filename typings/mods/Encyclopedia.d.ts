declare const Encyclopedia: EncyclopediaObject;

declare interface EncyclopediaObject {
  AddCharacter(args: {
    ModName: string;
    Name: string;
    ID: PlayerType;
    CompletionTrackerFuncs: [() => EncyclopediaItemVars[]];
  }): void;

  AddCharacterTainted(args: {
    ModName: string;
    Name: string;
    Description: string;
    ID: PlayerType;
    CompletionTrackerFuncs: [() => EncyclopediaItemVars[]];
    UnlockFunc: (args: EncyclopediaItemVars) => EncyclopediaItemVars;
  }): void;

  AddItem(itemTab: {
    Class: string | undefined;
    ID: number;
    WikiDesc: WikiDescription | undefined;
    Pools: EncyclopediaItemPools;
    Name: string | undefined;
    Desc: string | undefined;
    ActiveCharge: number | undefined;
    ModName: string | undefined;
    Sprite: Sprite;
    Hide: boolean | undefined;
    UnlockFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
    StatusFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
    CloseFunc: (vars: EncyclopediaItemVars) => void;
  }): void;

  AddItemPoolSprite(id: number, sprite: Sprite): void;

  AddPocketItem(
    itemTab: {
      Class: string | undefined;
      ID: number;
      WikiDesc: WikiDescription | undefined;
      Name: string | undefined;
      Desc: string | undefined;
      ModName: string | undefined;
      Sprite: Sprite | undefined;
      Hide: boolean | undefined;
      UnlockFunc:
        | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars | void)
        | undefined;
      StatusFunc:
        | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars)
        | undefined;
      StatusClose: ((vars: EncyclopediaItemVars) => void) | undefined;
    },
    eType: string,
  ): void;

  AddRune(itemTab: {
    Sprite: Sprite | undefined;
    Name: string | undefined;
    Desc: string | undefined;
    ModName: string | undefined;
    WikiDesc: WikiDescription | undefined;
    ID: number;
    Class: string;
    UnlockFunc:
      | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars | void)
      | undefined;
    StatusFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
    StatusClose: (vars: EncyclopediaItemVars) => void;
    RuneType: number;
  }): void;

  AddTrinket(itemTab: {
    Class: string | undefined;
    ID: number;
    WikiDesc: WikiDescription | undefined;
    Name: string | undefined;
    Desc: string | undefined;
    ModName: string | undefined;
    Sprite: Sprite | undefined;
    Hide: boolean | undefined;
    UnlockFunc:
      | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars | void)
      | undefined;
    StatusFunc:
      | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars)
      | undefined;
    StatusClose: ((vars: EncyclopediaItemVars) => void) | undefined;
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
 * Contains Encyclopedia's custom item pool system.
 * It uses custom item pools in order to allow better compatibility with modded pools.
 * The same as the ItemPoolType enum, but every pool is 1 value higher,
 * "to handle table indices better".
 */
declare type EncyclopediaItemPools = Record<string, number>;

/**
 * A description for an item. Each object in the array is a category,
 * containing a header and as many paragraphs as are needed.
 */
declare type WikiDescription = [
  {
    header: {
      str: string;
      fSize: number | undefined;
      clr: number | undefined;
      hAlign: number | undefined;
    };
    paragraphs: [
      {
        str: string;
      },
    ];
  },
];

/**
 * Encyclopedia's 'General Item Variables' object. Used to store data about an item.
 */
declare interface EncyclopediaItemVars {
  Spr: Sprite;
  Name: string | undefined;
  Desc: string | undefined;
  WikiDesc: WikiDescription | undefined;
  Pools: EncyclopediaItemPools | undefined;
  Title: string | undefined;
  ItemID: number;
  typeString: string;
  Class: string;
  Index: number | undefined;
  AllIndex: number | undefined;
  AllIntIndex: number;
  StatusFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
  CloseFunc: (vars: EncyclopediaItemVars) => void;
}
