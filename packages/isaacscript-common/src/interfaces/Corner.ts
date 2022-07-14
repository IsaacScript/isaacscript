import { CornerType } from "../enums/CornerType";

export interface Corner {
  readonly type: CornerType;
  readonly position: Readonly<Vector>;
}
