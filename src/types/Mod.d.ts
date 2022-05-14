import { ModCallback } from "../enums/ModCallback";

declare global {
  /**
   * The Lua object corresponding to this interface is defined as a local variable in the
   * "scripts/main.lua" file.
   */
  interface Mod {
    AddCallback<T extends keyof AddCallbackParameter>(
      modCallback: T,
      ...args: AddCallbackParameter[T]
    ): void;

    HasData(): boolean;
    LoadData(): string;
    RemoveCallback<T extends keyof AddCallbackParameter>(
      modCallback: ModCallback,
      ...args: AddCallbackParameter[T]
    ): void;
    RemoveData(): void;
    SaveData(data: string): void;

    Name: string;
  }
}
