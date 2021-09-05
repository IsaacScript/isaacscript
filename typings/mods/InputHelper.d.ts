// This is a global exposed as part of ModConfigMenu

declare const InputHelper: InputHelperInterface | undefined;

declare interface InputHelperInterface {
  KeyboardPressed(this: void, key: Keyboard, controllerIndex: int): boolean;

  ControllerToString: LuaTable<Keyboard, string | undefined>;
  KeyboardToString: LuaTable<Keyboard, string | undefined>;
}
