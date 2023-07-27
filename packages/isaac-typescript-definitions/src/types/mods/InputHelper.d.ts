import type { Keyboard } from "../../enums/Keyboard";

declare global {
  /** This is a global variable exposed as part of ModConfigMenu. */
  const InputHelper: InputHelperInterface | undefined;

  /** @noSelf */
  interface InputHelperInterface {
    KeyboardPressed: (key: Keyboard, controllerIndex: int) => boolean;

    ControllerToString: LuaMap<Keyboard, string>;
    KeyboardToString: LuaMap<Keyboard, string>;
  }
}
