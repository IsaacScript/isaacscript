declare interface HUDMessage extends IsaacAPIClass {
  GetMainText: () => string;
  GetSprite: () => Sprite;
  GetSubText: () => string;
  Hide: () => void;
  IsShowing: () => boolean;
  SetMainText: (text: string) => void;
  SetSubText: (subText: string) => void;

  /**
   * @param text
   * @param subText Optional. Default is an empty string.
   * @param sticky Optional. Default is false.
   * @param curseDisplay Optional. Default is false.
   */
  Show: (
    text: string,
    subText?: string,
    sticky?: boolean,
    curseDisplay?: boolean,
  ) => void;
}
