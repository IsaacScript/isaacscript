import { EntityType } from "isaac-typescript-definitions";

export interface PersistentEntityDescription {
  entityType: EntityType;
  variant: int;
  subType: int;
  roomListIndex: int;
  position: Vector;
}
