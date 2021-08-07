declare const ModConfigMenu: ModConfigMenuInterface;

/** @noSelf */
declare interface ModConfigMenuInterface {
  AddSetting(
    categoryName: string,
    subcategoryName: string,
    setting?: ModConfigMenuSetting,
  ): void;
  AddSpace(categoryName: string, subcategoryName: string): void;
  AddText(
    categoryName: string,
    subcategoryName: string,
    textFunction: () => string,
  ): void;
  GetCategoryIDByName(categoryName: string): int | null;

  Config: {
    General: {
      HudOffset: int;
    };
    LastBackPressed: Keyboard;
  };
  /**
   * MenuData is not normally supposed to be accessed, but we access it to wipe data during a mod
   * reload.
   */
  MenuData: LuaTable<int, MenuData>;
  PopupGfx: {
    THIN_SMALL: "gfx/ui/modconfig/popup_thin_small.png";
    THIN_MEDIUM: "gfx/ui/modconfig/popup_thin_medium.png";
    THIN_LARGE: "gfx/ui/modconfig/popup_thin_large.png";
    WIDE_SMALL: "gfx/ui/modconfig/popup_wide_small.png";
    WIDE_MEDIUM: "gfx/ui/modconfig/popup_wide_medium.png";
    WIDE_LARGE: "gfx/ui/modconfig/popup_wide_large.png";
  };
}

/** @noSelf */
declare interface ModConfigMenuSetting {
  CurrentSetting: () => number | boolean;
  Display: () => string;
  Info: string[];
  Maximum?: number | null;
  Minimum?: number | null;
  ModifyBy?: number | null;
  OnChange: (newValue: number | boolean) => void;
  Popup?: (() => void) | null;
  PopupGfx?: string | null;
  PopupWidth?: int | null;
  Type: ModConfigMenuOptionType;
}

declare const enum ModConfigMenuOptionType {
  TEXT = 1,
  SPACE = 2,
  SCROLL = 3,
  BOOLEAN = 4,
  NUMBER = 5,
  KEYBIND_KEYBOARD = 6,
  KEYBIND_CONTROLLER = 7,
  TITLE = 8,
}

declare interface MenuData {
  Name: string;
  Subcategories: string[];
}
