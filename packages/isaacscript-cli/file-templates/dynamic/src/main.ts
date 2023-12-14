import { ModCallback } from "isaac-typescript-definitions";
import { name } from "../package.json";

// This function is run when your mod first initializes.
export function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events.
  const mod = RegisterMod(name, 1);

  // Register a callback function that corresponds to when a new player is initialized.
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, postPlayerInit);

  // Print a message to the "log.txt" file.
  Isaac.DebugString(`${name} initialized.`);
}

function postPlayerInit() {
  Isaac.DebugString("Callback fired: POST_PLAYER_INIT");
}
