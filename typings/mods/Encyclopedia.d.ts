declare const Encyclopedia: EncyclopediaInterface | undefined;

declare interface EncyclopediaInterface {
  AddCharacter(args: {
    CompletionTrackerFuncs: [() => EncyclopediaItemVars[]];
    ID: PlayerType | int;
    ModName: string;
    Name: string;
  }): void;

  AddCharacterTainted(args: {
    CompletionTrackerFuncs: [() => EncyclopediaItemVars[]];
    Description: string;
    ID: PlayerType | int;
    ModName: string;
    Name: string;
    UnlockFunc: (args: EncyclopediaItemVars) => EncyclopediaItemVars;
  }): void;

  AddItem(itemTab: {
    ActiveCharge: number | undefined;
    Class: string | undefined;
    CloseFunc: (vars: EncyclopediaItemVars) => void;
    Desc: string | undefined;
    Hide: boolean | undefined;
    ID: number;
    ModName: string | undefined;
    Name: string | undefined;
    Pools: EncyclopediaItemPools;
    Sprite: Sprite;
    StatusFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
    UnlockFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
    WikiDesc: WikiDescription | undefined;
  }): void;

  AddItemPoolSprite(id: number, sprite: Sprite): void;

  AddPocketItem(
    itemTab: {
      Class: string | undefined;
      Desc: string | undefined;
      Hide: boolean | undefined;
      ID: number;
      ModName: string | undefined;
      Name: string | undefined;
      Sprite: Sprite | undefined;
      StatusClose: ((vars: EncyclopediaItemVars) => void) | undefined;
      StatusFunc:
        | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars)
        | undefined;
      UnlockFunc:
        | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars | void)
        | undefined;
      WikiDesc: WikiDescription | undefined;
    },
    eType: string,
  ): void;

  AddRune(itemTab: {
    Class: string;
    Desc: string | undefined;
    ID: number;
    ModName: string | undefined;
    Name: string | undefined;
    RuneType: number;
    Sprite: Sprite | undefined;
    StatusClose: (vars: EncyclopediaItemVars) => void;
    StatusFunc: (vars: EncyclopediaItemVars) => EncyclopediaItemVars;
    UnlockFunc:
      | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars | void)
      | undefined;
    WikiDesc: WikiDescription | undefined;
  }): void;

  AddTrinket(itemTab: {
    Class: string | undefined;
    Desc: string | undefined;
    Hide: boolean | undefined;
    ID: number;
    ModName: string | undefined;
    Name: string | undefined;
    Sprite: Sprite | undefined;
    StatusClose: ((vars: EncyclopediaItemVars) => void) | undefined;
    StatusFunc:
      | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars)
      | undefined;
    UnlockFunc:
      | ((vars: EncyclopediaItemVars) => EncyclopediaItemVars | void)
      | undefined;
    WikiDesc: WikiDescription | undefined;
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
      clr: number | undefined;
      fSize: number | undefined;
      hAlign: number | undefined;
      str: string;
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
  CloseFunc(vars: EncyclopediaItemVars): void;
  StatusFunc(vars: EncyclopediaItemVars): EncyclopediaItemVars;

  AllIndex: number | undefined;
  AllIntIndex: number;
  Class: string;
  Desc: string | undefined;
  Index: number | undefined;
  ItemID: number;
  Name: string | undefined;
  Pools: EncyclopediaItemPools | undefined;
  Spr: Sprite;
  Title: string | undefined;
  WikiDesc: WikiDescription | undefined;
  typeString: string;
}
