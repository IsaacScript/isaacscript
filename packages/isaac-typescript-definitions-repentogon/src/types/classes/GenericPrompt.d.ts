import type { GenericPromptSelection } from "../../enums/GenericPromptSelection";
import type { GenericPromptSubmittedSelection } from "../../enums/GenericPromptSubmittedSelection";

/**
 * Constructs a new `GenericPrompt` class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare function GenericPrompt(this: void): GenericPrompt;

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface GenericPrompt {
    /** Returns the selection the player is hovering over. */
    GetCurrentSelection: () => GenericPromptSelection;

    /** Returns the sprite used by the prompt. */
    GetSprite: () => Sprite;

    /** Returns the selection the player has submitted. */
    GetSubmittedSelection: () => GenericPromptSubmittedSelection;

    /**
     * Initializes the generic prompt. This method should be called immediately after constructing
     * the object.
     *
     * @param smallPrompt Optional. Default is false.
     */
    Initialize: (smallPrompt?: boolean) => void;

    /** Returns whether the prompt is currently active. */
    IsActive: () => boolean;

    /**
     * Renders the prompt on the screen. This method should be called in `ModCallback.POST_RENDER`.
     */
    Render: () => void;

    /** Sets the prompt's image to the victory run image. */
    SetImageToVictoryRun: () => void;

    /**
     * Sets the paper's text.
     *
     * @param header1 Optional. Default is an empty string.
     * @param header2 Optional. Default is an empty string.
     * @param line1 Optional. Default is an empty string.
     * @param line2 Optional. Default is an empty string.
     * @param line3 Optional. Default is an empty string.
     */
    SetText: (
      header1?: string,
      header?: string,
      line1?: string,
      line2?: string,
      line3?: string,
    ) => void;

    /** Displays the prompt on-screen. */
    Show: () => void;

    /**
     * Updates the animation of the prompt paper and its functionality. This method should be called
     * in `ModCallback.POST_UPDATE`.
     *
     * @param processInput If true, the game will process the player's input for selecting yes/no.
     */
    Update: (processInput: boolean) => void;
  }
}
