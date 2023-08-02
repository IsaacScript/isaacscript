interface BlockComment {
  value: string;
  codeStart?: number;
}

declare module "extract-comments" {
  const extractComments: (text: string) => BlockComment[];

  // eslint-disable-next-line import/no-default-export
  export default extractComments;
}
