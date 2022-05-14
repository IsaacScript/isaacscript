import { Keyboard } from "../../enums/Keyboard";

declare global {
  /** This is a global variable exposed as part of ModConfigMenu. */
  const InputHelper: InputHelperInterface | undefined;

  interface InputHelperInterface {
    KeyboardPressed(this: void, key: Keyboard, controllerIndex: int): boolean;

    ControllerToString: LuaTable<Keyboard, string | undefined>;
    KeyboardToString: LuaTable<Keyboard, string | undefined>;
  }
}
