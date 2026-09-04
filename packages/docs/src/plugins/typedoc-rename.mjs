import { Comment, Converter } from "typedoc";

const RENAME_TAG = "@rename";

export function load(application) {
  application.converter.on(Converter.EVENT_RESOLVE_BEGIN, (context) => {
    for (const reflection of Object.values(context.project.reflections)) {
      const renameTag = reflection.comment?.getTag(RENAME_TAG);
      if (renameTag === undefined) {
        continue;
      }

      reflection.name = Comment.combineDisplayParts(renameTag.content).trim();
      reflection.comment?.removeTags(RENAME_TAG);
    }
  });
}
