/**
 * The Lua object corresponding to this interface is defined as a local variable in the
 * "scripts/main.lua" file.
 */
declare interface Mod {
  AddCallback<T extends keyof AddCallbackParameters>(
    modCallbacks: T,
    ...args: AddCallbackParameters[T]
  ): void;

  HasData(): boolean;
  LoadData(): string;
  RemoveCallback<T extends keyof AddCallbackParameters>(
    modCallbacks: ModCallbacks,
    ...args: AddCallbackParameters[T]
  ): void;
  RemoveData(): void;
  SaveData(data: string): void;

  Name: string;
}
