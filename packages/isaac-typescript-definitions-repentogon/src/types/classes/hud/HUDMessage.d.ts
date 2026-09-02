declare interface HUDMessage extends IsaacAPIClass {
  readonly GetMainText: () => string;
  readonly GetSprite: () => Sprite;
  readonly GetSubText: () => string;
  readonly Hide: () => void;
  readonly IsShowing: () => boolean;
  readonly SetMainText: (text: string) => void;
  readonly SetSubText: (subText: string) => void;

  /**
   * @param text
   * @param subText Optional. Default is an empty string.
   * @param sticky Optional. Default is false.
   * @param curseDisplay Optional. Default is false.
   */
  readonly Show: (
    text: string,
    subText?: string,
    sticky?: boolean,
    curseDisplay?: boolean,
  ) => void;
}
