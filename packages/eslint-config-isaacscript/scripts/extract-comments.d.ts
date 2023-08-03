interface BlockComment {
  value: string;
  codeStart?: number;
}

declare module "extract-comments" {
  const extractComments: (text: string) => BlockComment[];
  export default extractComments; // eslint-disable-line import/no-default-export
}
