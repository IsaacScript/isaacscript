/** This is the format of the "shaders.xml" file that goes in the "content" directory of a mod. */
// This data is mutated before being serialized back to XML.
// eslint-disable-next-line complete/type-declaration-immutability
export interface ShadersXML {
  readonly shaders: {
    readonly shader: ShadersXMLShader[];
  };
}

interface ShadersXMLShader {
  readonly $: {
    readonly name: string;
  };
}
