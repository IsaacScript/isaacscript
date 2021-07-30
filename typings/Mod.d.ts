import CallbackParameters from "./CallbackParameters";

/** The Mod class is defined in the "scripts/main.lua" file. */
declare class Mod {
  AddCallback<T extends keyof CallbackParameters>(
    callbackID: T,
    ...args: CallbackParameters[T]
  ): void;
  HasData(): boolean;
  LoadData(): string;
  RemoveCallback(callbackID: ModCallbacks, callback: () => void): void;
  RemoveData(): void;
  SaveData(data: string): void;

  Name: string;
}
