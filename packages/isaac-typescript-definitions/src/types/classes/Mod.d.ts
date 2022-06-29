import { ModCallback } from "../../enums/ModCallback";

declare global {
  /**
   * The Lua object corresponding to this interface is defined as a local variable in the
   * "scripts/main.lua" file.
   */
  interface Mod {
    AddCallback<T extends ModCallback>(
      modCallback: T,
      ...args: AddCallbackParameter[T]
    ): void;

    HasData(): boolean;
    LoadData(): string;

    /**
     * This method does not care about the tertiary argument. Regardless of the conditions of how
     * you registered the callback, it will be removed.
     */
    RemoveCallback<T extends ModCallback>(
      modCallback: T,
      callback: AddCallbackParameter[T][0],
    ): void;

    RemoveData(): void;
    SaveData(data: string): void;

    Name: string;
  }
}
