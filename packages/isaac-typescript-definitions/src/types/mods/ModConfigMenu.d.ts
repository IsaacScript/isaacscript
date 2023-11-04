import type { Controller } from "../../enums/Controller";
import type { Keyboard } from "../../enums/Keyboard";
import type { ModConfigMenuOptionType } from "../../enums/mods/ModConfigMenuOptionType";

declare global {
  const ModConfigMenu: ModConfigMenuInterface | undefined;

  /** @noSelf */
  interface ModConfigMenuInterface {
    AddBooleanSetting: (
      categoryName: string,
      subcategoryName: string,
      attribute: string,
      defaultValue: boolean,
      displayText: string,
      displayValueProxies: LuaMap<boolean, string>,
      info: string,
      color?: string,
    ) => void;

    AddControllerSetting: (
      categoryName: string,
      subcategoryName: string,
      attribute: string,
      defaultValue: Controller,
      displayText: string,
      displayDevice: boolean,
      info: string,
      color?: string,
    ) => void;

    AddKeyboardSetting: (
      categoryName: string,
      subcategoryName: string,
      attribute: string,
      defaultValue: Keyboard,
      displayText: string,
      displayDevice: boolean,
      info: string,
      color?: string,
    ) => void;

    AddNumberSetting: (
      categoryName: string,
      subcategoryName: string,
      attribute: string,
      minValue: number,
      maxValue: number,
      modifyBy: number,
      defaultValue: number,
      displayText: string,
      displayValueProxies: LuaMap<number, string>,
      info: string,
      color?: string,
    ) => void;

    AddScrollSetting: (
      categoryName: string,
      subcategoryName: string,
      attribute: string,
      defaultValue: number,
      displayText: string,
      info: string,
      color?: string,
    ) => void;

    AddSetting: (
      categoryName: string,
      subcategoryName?: string,
      setting?: ModConfigMenuSetting,
    ) => void;

    AddSpace: (categoryName: string, subcategoryName: string) => void;

    AddText: (
      categoryName: string,
      subcategoryName: string,
      text: string | (() => string),
      color?: string,
    ) => void;

    AddTitle: (
      categoryName: string,
      subcategoryName: string,
      text: string,
      color?: string,
    ) => void;

    GetCategoryIDByName: (categoryName: string) => int | undefined;

    GetSubcategoryIDByName: (
      category: string | number,
      subcategoryName: string,
    ) => int;

    RemoveCategory: (categoryName: string) => void;

    RemoveSetting: (
      categoryName: string,
      subcategoryString: string,
      settingAttribute: string,
    ) => void;

    RemoveSubcategory: (categoryName: string, subcategoryName: string) => void;

    SetCategoryInfo: (categoryName: string, info: string) => void;

    SimpleAddSetting: (
      settingType: ModConfigMenuOptionType,
      categoryName: string,
      subcategoryName: string,
      attribute: string,
      minValue: number,
      maxValue: number,
      modifyBy: number,
      defaultValue: number | boolean,
      displayText: string,
      displayValueProxies: LuaMap<number, string> | LuaMap<boolean, string>,
      displayDevice: boolean,
      info: string,
      color?: string,
      functionName?: string,
    ) => void;

    UpdateCategory: (
      categoryName: string,
      categoryData: ModConfigMenuCategoryData,
    ) => void;

    UpdateSubcategory: (
      categoryName: string,
      subcategoryName: string,
      subcategoryData: ModConfigMenuSubcategoryData,
    ) => void;

    Config: {
      General: {
        HudOffset: int;
      };
      LastBackPressed: Keyboard | Controller;
    };

    IsVisible: boolean;

    /**
     * MenuData is not normally supposed to be accessed, but we access it to wipe data during a mod
     * reload.
     */
    MenuData: LuaMap<int, ModConfigMenuData>;

    // cspell:ignore modconfig

    PopupGfx: {
      THIN_SMALL: "gfx/ui/modconfig/popup_thin_small.png";
      THIN_MEDIUM: "gfx/ui/modconfig/popup_thin_medium.png";
      THIN_LARGE: "gfx/ui/modconfig/popup_thin_large.png";
      WIDE_SMALL: "gfx/ui/modconfig/popup_wide_small.png";
      WIDE_MEDIUM: "gfx/ui/modconfig/popup_wide_medium.png";
      WIDE_LARGE: "gfx/ui/modconfig/popup_wide_large.png";
    };

    Version: int;
  }

  /** @noSelf */
  interface ModConfigMenuSetting {
    CurrentSetting: () => number | boolean;
    Display: () => string;
    Info: string[];
    Maximum?: number;
    Minimum?: number;
    ModifyBy?: number;

    /** This will be undefined if the user canceled the popup dialog. */
    OnChange: (newValue: number | boolean | undefined) => void;

    Popup?: () => void;
    PopupGfx?: string;
    PopupWidth?: int;
    Type: ModConfigMenuOptionType;
  }

  interface ModConfigMenuCategoryData {
    Info: string;
    IsOld: boolean;
    Name: string;
  }

  interface ModConfigMenuSubcategoryData {
    Info: string;
    Name: string;
  }

  interface ModConfigMenuData {
    Name: string;
    Subcategories: string[];
  }
}
