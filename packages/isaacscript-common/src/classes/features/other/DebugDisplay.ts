import { Exported } from "../../../decorators";
import { printEnabled } from "../../../functions/utils";
import { ModUpgradedInterface } from "../../../interfaces/private/ModUpgradedInterface";
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
  private mod: ModUpgradedInterface;

  private player = new DebugDisplayPlayer(); // 1
  private tear = new DebugDisplayTear(); // 2
  private familiar = new DebugDisplayFamiliar(); // 3
  private bomb = new DebugDisplayBomb(); // 4
  private pickup = new DebugDisplayPickup(); // 5
  private slot = new DebugDisplaySlot(); // 6
  private laser = new DebugDisplayLaser(); // 7
  private knife = new DebugDisplayKnife(); // 8
  private projectile = new DebugDisplayProjectile(); // 9
  private effect = new DebugDisplayEffect(); // 1000
  private npc = new DebugDisplayNPC();

  private rock = new DebugDisplayRock(); // 2, 3, 4, 5, 6, 22, 24, 25, 26, 27
  private pit = new DebugDisplayPit(); // 7
  private spikes = new DebugDisplaySpikes(); // 8, 9
  private tnt = new DebugDisplayTNT(); // 12
  private poop = new DebugDisplayPoop(); // 14
  private door = new DebugDisplayDoor(); // 16
  private pressurePlate = new DebugDisplayPressurePlate(); // 20

  constructor(mod: ModUpgradedInterface) {
    super();

    this.mod = mod;
  }

  // -------------
  // Set Functions
  // -------------

  /**
   * If the "extra console commands" feature is specified, the "playerDisplay" console command will
   * draw text on the screen next to each player. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setPlayerDisplay(
    textCallback: (player: EntityPlayer) => string,
  ): void {
    this.player.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "tearDisplay" console command will
   * draw text on the screen next to each tear. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setTearDisplay(textCallback: (tear: EntityTear) => string): void {
    this.tear.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "familiarDisplay" console command
   * will draw text on the screen for each familiar for debugging purposes. Use this function to
   * specify a callback function that returns the string that should be drawn.
   */
  @Exported
  public setFamiliarDisplay(
    textCallback: (familiar: EntityFamiliar) => string,
  ): void {
    this.familiar.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "bombDisplay" console command will
   * draw text on the screen next to each bomb. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setBombDisplay(textCallback: (bomb: EntityBomb) => string): void {
    this.bomb.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "pickupDisplay" console command will
   * draw text on the screen next to each pickup. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setPickupDisplay(
    textCallback: (pickup: EntityPickup) => string,
  ): void {
    this.pickup.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "slotDisplay" console command will
   * draw text on the screen next to each slot. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setSlotDisplay(textCallback: (slot: Entity) => string): void {
    this.slot.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "laserDisplay" console command will
   * draw text on the screen next to each laser. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setLaserDisplay(textCallback: (laser: EntityLaser) => string): void {
    this.laser.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "knifeDisplay" console command will
   * draw text on the screen next to each knife. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setKnifeDisplay(textCallback: (knife: EntityKnife) => string): void {
    this.knife.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "projectileDisplay" console command
   * will draw text on the screen next to each projectile. Use this function to specify a callback
   * function that returns the string that should be drawn.
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
   */
  @Exported
  public setEffectDisplay(
    textCallback: (effect: EntityEffect) => string,
  ): void {
    this.effect.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "npcDisplay" console command will
   * draw text on the screen next to each NPC. Use this function to specify a callback function that
   * returns the string that should be drawn.
   */
  @Exported
  public setNPCDisplay(textCallback: (npc: EntityNPC) => string): void {
    this.npc.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "rockDisplay" console command will
   * draw text on the screen next to each rock. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setRockDisplay(textCallback: (rock: GridEntityRock) => string): void {
    this.rock.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "pitDisplay" console command will
   * draw text on the screen next to each pit. Use this function to specify a callback function that
   * returns the string that should be drawn.
   */
  @Exported
  public setPitDisplay(textCallback: (pit: GridEntityPit) => string): void {
    this.pit.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "spikesDisplay" console command will
   * draw text on the screen next to each spikes. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setSpikesDisplay(
    textCallback: (spikes: GridEntitySpikes) => string,
  ): void {
    this.spikes.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "tntDisplay" console command will
   * draw text on the screen next to each TNT. Use this function to specify a callback function that
   * returns the string that should be drawn.
   */
  @Exported
  public setTNTDisplay(textCallback: (tnt: GridEntityTNT) => string): void {
    this.tnt.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "poopDisplay" console command will
   * draw text on the screen next to each poop. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setPoopDisplay(textCallback: (poop: GridEntityPoop) => string): void {
    this.poop.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "doorDisplay" console command will
   * draw text on the screen next to each door. Use this function to specify a callback function
   * that returns the string that should be drawn.
   */
  @Exported
  public setDoorDisplay(textCallback: (door: GridEntityDoor) => string): void {
    this.door.textCallback = textCallback;
  }

  /**
   * If the "extra console commands" feature is specified, the "pressurePlateDisplay" console
   * command will draw text on the screen next to each pressure plate. Use this function to specify
   * a callback function that returns the string that should be drawn.
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

  private toggleFeature(feature: Feature, featureName: string) {
    if (feature.initialized) {
      this.mod.uninitFeature(feature);
    } else {
      this.mod.initFeature(feature);
    }

    printEnabled(this.player.initialized, `${featureName} display`);
  }

  /**
   * Toggles the debug display for players. This is the function that runs when you use the
   * "playerDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public togglePlayerDisplay(): void {
    this.toggleFeature(this.player, "player");
  }

  /**
   * Toggles the debug display for tears. This is the function that runs when you use the
   * "tearDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleTearDisplay(): void {
    this.toggleFeature(this.tear, "tear");
  }

  /**
   * Toggles the debug display for familiars. This is the function that runs when you use the
   * "familiarDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleFamiliarDisplay(): void {
    this.toggleFeature(this.familiar, "familiar");
  }

  /**
   * Toggles the debug display for bombs. This is the function that runs when you use the
   * "bombDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleBombDisplay(): void {
    this.toggleFeature(this.bomb, "bomb");
  }

  /**
   * Toggles the debug display for pickups. This is the function that runs when you use the
   * "pickupDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public togglePickupDisplay(): void {
    this.toggleFeature(this.pickup, "pickup");
  }

  /**
   * Toggles the debug display for slots. This is the function that runs when you use the
   * "slotDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleSlotDisplay(): void {
    this.toggleFeature(this.slot, "slot");
  }

  /**
   * Toggles the debug display for lasers. This is the function that runs when you use the
   * "laserDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleLaserDisplay(): void {
    this.toggleFeature(this.laser, "laser");
  }

  /**
   * Toggles the debug display for knives. This is the function that runs when you use the
   * "knifeDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleKnifeDisplay(): void {
    this.toggleFeature(this.knife, "knife");
  }

  /**
   * Toggles the debug display for projectiles. This is the function that runs when you use the
   * "projectileDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleProjectileDisplay(): void {
    this.toggleFeature(this.projectile, "projectile");
  }

  /**
   * Toggles the debug display for effects. This is the function that runs when you use the
   * "effectDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleEffectDisplay(): void {
    this.toggleFeature(this.effect, "effect");
  }

  /**
   * Toggles the debug display for NPCs. This is the function that runs when you use the
   * "npcDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleNPCDisplay(): void {
    this.toggleFeature(this.npc, "NPC");
  }

  /**
   * Toggles the debug display for rocks. This is the function that runs when you use the
   * "rockDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleRockDisplay(): void {
    this.toggleFeature(this.rock, "rock");
  }

  /**
   * Toggles the debug display for pits. This is the function that runs when you use the
   * "pitDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public togglePitDisplay(): void {
    this.toggleFeature(this.pit, "pit");
  }

  /**
   * Toggles the debug display for spikes. This is the function that runs when you use the
   * "spikesDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleSpikesDisplay(): void {
    this.toggleFeature(this.spikes, "spikes");
  }

  /**
   * Toggles the debug display for TNT. This is the function that runs when you use the "tntDisplay"
   * custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleTNTDisplay(): void {
    this.toggleFeature(this.tnt, "tnt");
  }

  /**
   * Toggles the debug display for poop. This is the function that runs when you use the
   * "poopDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public togglePoopDisplay(): void {
    this.toggleFeature(this.poop, "poop");
  }

  /**
   * Toggles the debug display for doors. This is the function that runs when you use the
   * "doorDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public toggleDoorDisplay(): void {
    this.toggleFeature(this.door, "door");
  }

  /**
   * Toggles the debug display for pressure plates. This is the function that runs when you use the
   * "pressurePlateDisplay" custom console command.
   *
   * Note that you have to run the `enableExtraConsoleCommands` function once at the beginning of
   * your mod in order for this feature to work.
   */
  @Exported
  public togglePressurePlateDisplay(): void {
    this.toggleFeature(this.pressurePlate, "pressure plate");
  }
}
