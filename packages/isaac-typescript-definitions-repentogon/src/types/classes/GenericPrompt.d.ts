import type { GenericPromptSelection } from "../../enums/GenericPromptSelection";
import type { GenericPromptSubmittedSelection } from "../../enums/GenericPromptSubmittedSelection";

/**
 * Constructs a new `GenericPrompt` class.
 *
 * **Example**
 *
 * ```ts
 * const mod = RegisterMod("Foo", 1);
 *
 * const prompt = GenericPrompt();
 * prompt.Initialize();
 * prompt.SetText("Some test text");
 *
 * let wasPromptDisplayed = false;
 *
 * function postRender() {
 *   prompt.Render();
 * }
 *
 * mod.AddCallback(ModCallback.POST_RENDER, postRender);
 *
 * function postUpdate() {
 *   prompt.Update(true); // Process user inputs
 *
 *   if (wasPromptDisplayed && !prompt.IsActive()) {
 *     // Prompt was closed by user.
 *     const submittedSelection = prompt.GetSubmittedSelection();
 *     print(`User selected option: ${submittedSelection}`);
 *     wasPromptDisplayed = false;
 *   }
 *
 *   if (Input.IsButtonTriggered(Keyboard.MINUS, 0)) {
 *     prompt.Show();
 *     wasPromptDisplayed = true;
 *   }
 * }
 *
 * mod.AddCallback(ModCallback.POST_UPDATE, postUpdate);
 * ```
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare function GenericPrompt(this: void): GenericPrompt;

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface GenericPrompt {
    GetCurrentSelection: () => GenericPromptSelection;
    GetSprite: () => Sprite;
    GetSubmittedSelection: () => GenericPromptSubmittedSelection;

    /** @param smallPrompt Optional. Default is false. */
    Initialize: (smallPrompt?: boolean) => void;

    IsActive: () => boolean;
    Render: () => void;
    SetImageToVictoryRun: () => void;

    /**
     * @param line1 Optional. Default is an empty string.
     * @param line2 Optional. Default is an empty string.
     * @param line3 Optional. Default is an empty string.
     * @param line4 Optional. Default is an empty string.
     * @param line5 Optional. Default is an empty string.
     */
    SetText: (
      line1?: string,
      line2?: string,
      line3?: string,
      line4?: string,
      line5?: string,
    ) => void;

    Show: () => void;
    Update: (processInput: boolean) => void;
  }
}
