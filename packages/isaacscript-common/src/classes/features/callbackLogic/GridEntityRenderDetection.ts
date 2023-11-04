import { ModCallback } from "isaac-typescript-definitions";
import { getGridEntities } from "../../../functions/gridEntities";
import type { PostGridEntityCustomRender } from "../../callbacks/PostGridEntityCustomRender";
import type { PostGridEntityRender } from "../../callbacks/PostGridEntityRender";
import { Feature } from "../../private/Feature";
import type { CustomGridEntities } from "./CustomGridEntities";

export class GridEntityRenderDetection extends Feature {
  private readonly postGridEntityRender: PostGridEntityRender;
  private readonly postGridEntityCustomRender: PostGridEntityCustomRender;
  private readonly customGridEntities: CustomGridEntities;

  constructor(
    postGridEntityRender: PostGridEntityRender,
    postGridEntityCustomRender: PostGridEntityCustomRender,
    customGridEntities: CustomGridEntities,
  ) {
    super();

    this.callbacksUsed = [
      // 2
      [ModCallback.POST_RENDER, this.postRender],
    ];

    this.postGridEntityRender = postGridEntityRender;
    this.postGridEntityCustomRender = postGridEntityCustomRender;
    this.customGridEntities = customGridEntities;
  }

  // ModCallback.POST_RENDER (2)
  private readonly postRender = () => {
    for (const gridEntity of getGridEntities()) {
      const gridIndex = gridEntity.GetGridIndex();
      const gridEntityTypeCustom =
        this.customGridEntities.getCustomGridEntityType(gridIndex);
      if (gridEntityTypeCustom === undefined) {
        this.postGridEntityRender.fire(gridEntity);
      } else {
        this.postGridEntityCustomRender.fire(gridEntity, gridEntityTypeCustom);
      }
    }
  };
}
