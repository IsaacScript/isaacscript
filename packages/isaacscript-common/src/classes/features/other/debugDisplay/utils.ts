import { getEntityID } from "../../../../functions/entities";
import { getGridEntityID } from "../../../../functions/gridEntities";
import { isReflectionRender } from "../../../../functions/utils";

export function defaultEntityDisplayCallback(entity: Entity): string {
  return getEntityID(entity);
}

export function defaultGridEntityDisplayCallback(
  gridEntity: GridEntity,
): string {
  return getGridEntityID(gridEntity);
}

export function renderScaledTextOnEntity(
  entity: Entity | GridEntity,
  text: string,
  scaleX: float,
  scaleY: float,
): void {
  if (isReflectionRender()) {
    return;
  }

  const position = Isaac.WorldToScreen(entity.Position);
  Isaac.RenderScaledText(
    text,
    position.X,
    position.Y,
    scaleX,
    scaleY,
    1,
    1,
    1,
    1,
  );
}

export function renderTextOnEntity(
  entity: Entity | GridEntity,
  text: string,
): void {
  if (isReflectionRender()) {
    return;
  }

  const position = Isaac.WorldToScreen(entity.Position);
  Isaac.RenderText(text, position.X, position.Y, 1, 1, 1, 1);
}
