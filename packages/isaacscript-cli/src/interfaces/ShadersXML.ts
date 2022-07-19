/** This is the format of the "shaders.xml" file that goes in the "content" directory of a mod. */
export interface ShadersXML {
  shaders: {
    shader: ShadersXMLShader[];
  };
}

interface ShadersXMLShader {
  $: {
    name: string;
  };
}
