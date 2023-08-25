import { getEntityID } from "../../../../functions/entities";
import { getGridEntityID } from "../../../../functions/gridEntities";

export function defaultEntityDisplayCallback(entity: Entity): string {
  return getEntityID(entity);
}

export function defaultGridEntityDisplayCallback(
  gridEntity: GridEntity,
): string {
  return getGridEntityID(gridEntity);
}
