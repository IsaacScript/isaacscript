export function copyColor(color: Color): Color {
  return Color(
    color.R,
    color.G,
    color.B,
    color.A,
    color.RO,
    color.GO,
    color.BO,
  );
}

export function copyKColor(kColor: KColor): KColor {
  return KColor(kColor.Red, kColor.Green, kColor.Blue, kColor.Alpha);
}

export function getDefaultColor(): Color {
  return Color(1, 1, 1);
}

export function getDefaultKColor(): KColor {
  return KColor(1, 1, 1, 1);
}
