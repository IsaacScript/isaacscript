import { VectorZero } from "../constants";

const CHARGE_BAR_ANM2 = "gfx/ui/ui_chargebar.anm2";

/** A collection of the four sprites necessary in order to render a charge bar. */
export interface ChargeBarSprites {
  back: Sprite;
  meter: Sprite;
  meterBattery: Sprite;
  lines: Sprite;
  maxCharges: int;
}

/**
 * Constructor for a `ChargeBarSprites` object. For more information, see the `renderChargeBar`
 * helper function.
 */
export function newChargeBarSprites(maxCharges: int): ChargeBarSprites {
  const back = Sprite();
  back.Load(CHARGE_BAR_ANM2, true);
  back.Play("BarEmpty", true);

  const meter = Sprite();
  meter.Load(CHARGE_BAR_ANM2, true);
  meter.Play("BarFull", true);

  const meterBattery = Sprite();
  meterBattery.Load(CHARGE_BAR_ANM2, true);
  meterBattery.Play("BarFull", true);

  const lines = Sprite();
  lines.Load(CHARGE_BAR_ANM2, true);
  lines.Play(`BarOverlay${maxCharges}`, true);

  return {
    back,
    meter,
    meterBattery,
    lines,
    maxCharges,
  };
}

/**
 * Helper function to render a charge bar on the screen. First, call the `newChargeBarSprites`
 * function to initialize the sprites, and then call this function on every render frame.
 */
export function renderChargeBar(
  sprites: ChargeBarSprites,
  position: Vector,
  normalCharges: int,
  batteryCharges: int,
): void {
  sprites.back.Render(position, VectorZero, VectorZero);

  const normalChargesClamp = getChargeBarClamp(
    normalCharges,
    sprites.maxCharges,
  );
  sprites.meter.Render(position, normalChargesClamp, VectorZero);

  const batteryChargesClamp = getChargeBarClamp(
    batteryCharges,
    sprites.maxCharges,
  );
  sprites.meterBattery.Render(position, batteryChargesClamp, VectorZero);

  sprites.lines.Render(position, VectorZero, VectorZero);
}

function getChargeBarClamp(charges: int, maxCharges: int) {
  const meterMultiplier = 24 / maxCharges;
  const meterClip = 26 - charges * meterMultiplier;
  return Vector(0, meterClip);
}
