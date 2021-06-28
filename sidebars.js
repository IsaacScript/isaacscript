/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  sidebar: [
    {
      type: "category",
      label: "Overview",
      items: ["features", "right-for-me", "getting-started"],
    },
    {
      type: "category",
      label: "General Info",
      items: ["discord", "what-is-isaacscript-doing", "directory-structure"],
    },
    {
      type: "category",
      label: "Tutorials",
      items: [
        "javascript-tutorial",
        "example-mod",
        "refactoring-mod",
        "converting-lua-code",
        "updating-isaacscript",
      ],
    },
    {
      type: "category",
      label: "Other",
      items: ["publishing-to-the-workshop", "gotchas", "function-signatures"],
    },
  ],
};
