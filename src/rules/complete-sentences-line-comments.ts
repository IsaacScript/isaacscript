import { createRule } from "../utils";

type Options = [];

// ts-prune-ignore-next
export type MessageIds = "missingCapital" | "missingPeriod";

export const completeSentencesLineComments = createRule<Options, MessageIds>({
  name: "complete-sentences-line-comments",
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforces complete sentences for multi-line leading line comments",
      recommended: "error",
    },
    schema: [],
    messages: {
      missingCapital:
        "Leading line comments must contain complete sentences with a capital letter.\n{{ sentence }}",
      missingPeriod:
        "Leading line comments must contain complete sentences with a trailing period.\n{{ sentence }}",
    },
  },
  defaultOptions: [],
  create(_context) {
    return {};
  },
});
