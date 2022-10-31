import { ModCallback } from "isaac-typescript-definitions";
import { getGridEntities } from "../../../functions/gridEntities";
import { PostGridEntityCustomRender } from "../../callbacks/PostGridEntityCustomRender";
import { PostGridEntityRender } from "../../callbacks/PostGridEntityRender";
import { Feature } from "../../private/Feature";
import { CustomGridEntities } from "./CustomGridEntities";

export class GridEntityRenderDetection extends Feature {
  private postGridEntityRender: PostGridEntityRender;
  private postGridEntityCustomRender: PostGridEntityCustomRender;
  private customGridEntities: CustomGridEntities;

  constructor(
    postGridEntityRender: PostGridEntityRender,
    postGridEntityCustomRender: PostGridEntityCustomRender,
    customGridEntities: CustomGridEntities,
  ) {
    super();

    this.callbacksUsed = [
      [ModCallback.POST_RENDER, [this.postRender]], // 2
    ];

    this.postGridEntityRender = postGridEntityRender;
    this.postGridEntityCustomRender = postGridEntityCustomRender;
    this.customGridEntities = customGridEntities;
  }

  // ModCallback.POST_RENDER (2)
  private postRender = () => {
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
