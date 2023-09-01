import { Exported } from "../../../decorators";
import { printEnabled } from "../../../functions/console";
import type { ModUpgradedInterface } from "../../../interfaces/private/ModUpgradedInterface";
import { Feature } from "../../private/Feature";
import { DebugDisplayBomb } from "./debugDisplay/DebugDisplayBomb";
import { DebugDisplayDoor } from "./debugDisplay/DebugDisplayDoor";
import { DebugDisplayEffect } from "./debugDisplay/DebugDisplayEffect";
import { DebugDisplayFamiliar } from "./debugDisplay/DebugDisplayFamiliar";
import { DebugDisplayKnife } from "./debugDisplay/DebugDisplayKnife";
import { DebugDisplayLaser } from "./debugDisplay/DebugDisplayLaser";
import { DebugDisplayNPC } from "./debugDisplay/DebugDisplayNPC";
import { DebugDisplayPickup } from "./debugDisplay/DebugDisplayPickup";
import { DebugDisplayPit } from "./debugDisplay/DebugDisplayPit";
import { DebugDisplayPlayer } from "./debugDisplay/DebugDisplayPlayer";
import { DebugDisplayPoop } from "./debugDisplay/DebugDisplayPoop";
import { DebugDisplayPressurePlate } from "./debugDisplay/DebugDisplayPressurePlate";
import { DebugDisplayProjectile } from "./debugDisplay/DebugDisplayProjectile";
import { DebugDisplayRock } from "./debugDisplay/DebugDisplayRock";
import { DebugDisplaySlot } from "./debugDisplay/DebugDisplaySlot";
import { DebugDisplaySpikes } from "./debugDisplay/DebugDisplaySpikes";
import { DebugDisplayTear } from "./debugDisplay/DebugDisplayTear";
import { DebugDisplayTNT } from "./debugDisplay/DebugDisplayTNT";

export class DebugDisplay extends Feature {
  private readonly mod: ModUpgradedInterface;

  private readonly player = new DebugDisplayPlayer(); // 1
  private readonly tear = new DebugDisplayTear(); // 2
  private readonly familiar = new DebugDisplayFamiliar(); // 3
  private readonly bomb = new DebugDisplayBomb(); // 4
  private readonly pickup = new DebugDisplayPickup(); // 5
  private readonly slot = new DebugDisplaySlot(); // 6
  private readonly laser = new DebugDisplayLaser(); // 7
  private readonly knife = new DebugDisplayKnife(); // 8
  private readonly projectile = new DebugDisplayProjectile(); // 9
  private readonly effect = new DebugDisplayEffect(); // 1000
  private readonly npc = new DebugDisplayNPC();

  private readonly rock = new DebugDisplayRock(); // 2, 3, 4, 5, 6, 22, 24, 25, 26, 27
  private readonly pit = new DebugDisplayPit(); // 7
  private readonly spikes = new DebugDisplaySpikes(); // 8, 9
  private readonly tnt = new DebugDisplayTNT(); // 12
  private readonly poop = new DebugDisplayPoop(); // 14
  private readonly door = new DebugDisplayDoor(); // 16
  private readonly pressurePlate = new DebugDisplayPressurePlate(); // 20

  /** @internal */
  constructor(mod: ModUpgradedInterface) {
    super();

    this.mod = mod;
  }

  // -------------
  // Set Functions
  // -------------

  /**
   * If the "togglePlayerDisplay" function is called, text will be drawn on the screen next to each
   * player. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * For example, this would draw the number of the player's collectibles next to their head:
   *
   * ```ts
   * setPlayerDisplay((player) => {
   *   return `collectible count: ${player.GetCollectibleCount()}`;
   * });
   * ```
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setPlayerDisplay(
    textCallback: (player: EntityPlayer) => string,
  ): void {
    this.player.textCallback = textCallback;
  }

  /**
   * If the "toggleTearDisplay" function is called, text will be drawn on the screen next to each
   * tear. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setTearDisplay(textCallback: (tear: EntityTear) => string): void {
    this.tear.textCallback = textCallback;
  }

  /**
   * If the "toggleFamiliarDisplay" function is called, text will be drawn on the screen next to
   * each familiar. Use this function to specify a callback function that returns the string that
   * should be drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setFamiliarDisplay(
    textCallback: (familiar: EntityFamiliar) => string,
  ): void {
    this.familiar.textCallback = textCallback;
  }

  /**
   * If the "toggleBombDisplay" function is called, text will be drawn on the screen next to each
   * bomb. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setBombDisplay(textCallback: (bomb: EntityBomb) => string): void {
    this.bomb.textCallback = textCallback;
  }

  /**
   * If the "togglePickupDisplay" function is called, text will be drawn on the screen next to each
   * pickup. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setPickupDisplay(
    textCallback: (pickup: EntityPickup) => string,
  ): void {
    this.pickup.textCallback = textCallback;
  }

  /**
   * If the "toggleSlotDisplay" function is called, text will be drawn on the screen next to each
   * slot. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setSlotDisplay(textCallback: (slot: Entity) => string): void {
    this.slot.textCallback = textCallback;
  }

  /**
   * If the "toggleLaserDisplay" function is called, text will be drawn on the screen next to each
   * laser. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setLaserDisplay(textCallback: (laser: EntityLaser) => string): void {
    this.laser.textCallback = textCallback;
  }

  /**
   * If the "toggleKnifeDisplay" function is called, text will be drawn on the screen next to each
   * knife. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setKnifeDisplay(textCallback: (knife: EntityKnife) => string): void {
    this.knife.textCallback = textCallback;
  }

  /**
   * If the "toggleProjectileDisplay" function is called, text will be drawn on the screen next to
   * each projectile. Use this function to specify a callback function that returns the string that
   * should be drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setProjectileDisplay(
    textCallback: (projectile: EntityProjectile) => string,
  ): void {
    this.projectile.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "effectDisplay" console command will
   * draw text on the screen next to each effect. Use this function to specify a callback function
   * that returns the string that should be drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setEffectDisplay(
    textCallback: (effect: EntityEffect) => string,
  ): void {
    this.effect.textCallback = textCallback;
  }

  /**
   * If the "toggleNPCDisplay" function is called, text will be drawn on the screen next to each
   * NPC. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setNPCDisplay(textCallback: (npc: EntityNPC) => string): void {
    this.npc.textCallback = textCallback;
  }

  /**
   * If the "toggleRockDisplay" function is called, text will be drawn on the screen next to each
   * rock. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setRockDisplay(textCallback: (rock: GridEntityRock) => string): void {
    this.rock.textCallback = textCallback;
  }

  /**
   * If the "togglePitDisplay" function is called, text will be drawn on the screen next to each
   * pit. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setPitDisplay(textCallback: (pit: GridEntityPit) => string): void {
    this.pit.textCallback = textCallback;
  }

  /**
   * If the "toggleSpikesDisplay" function is called, text will be drawn on the screen next to each
   * spikes. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setSpikesDisplay(
    textCallback: (spikes: GridEntitySpikes) => string,
  ): void {
    this.spikes.textCallback = textCallback;
  }

  /**
   * If the "toggleTNTDisplay" function is called, text will be drawn on the screen next to each
   * TNT. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setTNTDisplay(textCallback: (tnt: GridEntityTNT) => string): void {
    this.tnt.textCallback = textCallback;
  }

  /**
   * If the "togglePoopDisplay" function is called, text will be drawn on the screen next to each
   * poop. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setPoopDisplay(textCallback: (poop: GridEntityPoop) => string): void {
    this.poop.textCallback = textCallback;
  }

  /**
   * If the "toggleDoorDisplay" function is called, text will be drawn on the screen next to each
   * door. Use this function to specify a callback function that returns the string that should be
   * drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setDoorDisplay(textCallback: (door: GridEntityDoor) => string): void {
    this.door.textCallback = textCallback;
  }

  /**
   * If the "togglePressurePlateDisplay" function is called, text will be drawn on the screen next
   * to each pressure plate. Use this function to specify a callback function that returns the
   * string that should be drawn.
   *
   * Once the function is set, the library will call it automatically on every frame. For this
   * reason, you typically only need to set the function once at the beginning of your mod.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   */
  @Exported
  public setPressurePlateDisplay(
    textCallback: (pressurePlate: GridEntityPressurePlate) => string,
  ): void {
    this.pressurePlate.textCallback = textCallback;
  }

  // ----------------
  // Toggle Functions
  // ----------------

  private toggleFeature(
    feature: Feature,
    featureName: string,
    force: boolean | undefined,
  ) {
    let shouldInit = !feature.initialized;
    if (force !== undefined) {
      shouldInit = force;
    }

    if (shouldInit) {
      this.mod.initFeature(feature);
    } else {
      this.mod.uninitFeature(feature);
    }

    printEnabled(feature.initialized, `${featureName} display`);
  }

  /**
   * Toggles the debug display for players, which will draw text on the screen next to each player.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public togglePlayerDisplay(force?: boolean): void {
    this.toggleFeature(this.player, "player", force);
  }

  /**
   * Toggles the debug display for tears, which will draw text on the screen next to each tear.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`. *
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleTearDisplay(force?: boolean): void {
    this.toggleFeature(this.tear, "tear", force);
  }

  /**
   * Toggles the debug display for familiars, which will draw text on the screen next to each
   * familiar.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleFamiliarDisplay(force?: boolean): void {
    this.toggleFeature(this.familiar, "familiar", force);
  }

  /**
   * Toggles the debug display for bombs, which will draw text on the screen next to each bomb.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleBombDisplay(force?: boolean): void {
    this.toggleFeature(this.bomb, "bomb", force);
  }

  /**
   * Toggles the debug display for pickups, which will draw text on the screen next to each pickup.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public togglePickupDisplay(force?: boolean): void {
    this.toggleFeature(this.pickup, "pickup", force);
  }

  /**
   * Toggles the debug display for slots, which will draw text on the screen next to each slot.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleSlotDisplay(force?: boolean): void {
    this.toggleFeature(this.slot, "slot", force);
  }

  /**
   * Toggles the debug display for lasers, which will draw text on the screen next to each laser.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleLaserDisplay(force?: boolean): void {
    this.toggleFeature(this.laser, "laser", force);
  }

  /**
   * Toggles the debug display for knives, which will draw text on the screen next to each knife.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleKnifeDisplay(force?: boolean): void {
    this.toggleFeature(this.knife, "knife", force);
  }

  /**
   * Toggles the debug display for projectiles, which will draw text on the screen next to each
   * projectile.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleProjectileDisplay(force?: boolean): void {
    this.toggleFeature(this.projectile, "projectile", force);
  }

  /**
   * Toggles the debug display for effects, which will draw text on the screen next to each effect.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleEffectDisplay(force?: boolean): void {
    this.toggleFeature(this.effect, "effect", force);
  }

  /**
   * Toggles the debug display for NPCs, which will draw text on the screen next to each NPC.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleNPCDisplay(force?: boolean): void {
    this.toggleFeature(this.npc, "NPC", force);
  }

  /**
   * Toggles the debug display for rocks, which will draw text on the screen next to each rock.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleRockDisplay(force?: boolean): void {
    this.toggleFeature(this.rock, "rock", force);
  }

  /**
   * Toggles the debug display for pits, which will draw text on the screen next to each pit.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public togglePitDisplay(force?: boolean): void {
    this.toggleFeature(this.pit, "pit", force);
  }

  /**
   * Toggles the debug display for spikes, which will draw text on the screen next to each spike.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleSpikesDisplay(force?: boolean): void {
    this.toggleFeature(this.spikes, "spikes", force);
  }

  /**
   * Toggles the debug display for TNT, which will draw text on the screen next to each TNT.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleTNTDisplay(force?: boolean): void {
    this.toggleFeature(this.tnt, "tnt", force);
  }

  /**
   * Toggles the debug display for poops, which will draw text on the screen next to each poop.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public togglePoopDisplay(force?: boolean): void {
    this.toggleFeature(this.poop, "poop", force);
  }

  /**
   * Toggles the debug display for doors, which will draw text on the screen next to each door.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public toggleDoorDisplay(force?: boolean): void {
    this.toggleFeature(this.door, "door", force);
  }

  /**
   * Toggles the debug display for pressure plates, which will draw text on the screen next to each
   * pressure plate.
   *
   * In order to use this function, you must upgrade your mod with `ISCFeature.DEBUG_DISPLAY`.
   *
   * @param force Optional. A boolean that represents the value to force the display to. For
   *              example, you can specify true to always make the display turn on, regardless of
   *              whether it is already on.
   */
  @Exported
  public togglePressurePlateDisplay(force?: boolean): void {
    this.toggleFeature(this.pressurePlate, "pressure plate", force);
  }
}
