import { ModCallback } from "isaac-typescript-definitions";
import { renderTextOnEntity } from "../../../../functions/render";
import { Feature } from "../../../private/Feature";
import { defaultEntityDisplayCallback } from "./utils";

export class DebugDisplayProjectile extends Feature {
  public textCallback: (projectile: EntityProjectile) => string =
    defaultEntityDisplayCallback;

  constructor() {
    super();

    this.callbacksUsed = [
      // 45
      [ModCallback.POST_PROJECTILE_RENDER, this.postProjectileRender],
    ];
  }

  // ModCallback.POST_PROJECTILE_RENDER (45)
  private readonly postProjectileRender = (projectile: EntityProjectile) => {
    const text = this.textCallback(projectile);
    renderTextOnEntity(projectile, text);
  };
}
