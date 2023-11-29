import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

interface FeatureItem {
  readonly title: string;
  readonly img: string;
  readonly description: React.JSX.Element;
}

const FeatureList = [
  {
    title: "The Entire Isaac API, Strongly Typed",
    img: "img/items/magic-mushroom.png",
    description: (
      <>
        <li>Code fearlessly without having to worry about making a typo.</li>
        <li>
          Mouseover functions to see what they do, saving you from opening the
          docs.
        </li>
      </>
    ),
  },
  {
    title: "Powered by TypeScriptToLua",
    img: "img/typescript-to-lua.png",
    description: (
      <>
        <li>
          IsaacScript leverages the excellent{" "}
          <Link to="https://typescripttolua.github.io/">TypeScriptToLua</Link>{" "}
          library.
        </li>
        <li>
          All of your favorite TypeScript features will be automatically
          transpiled to Lua.
        </li>
      </>
    ),
  },
] as const satisfies readonly FeatureItem[];

function Feature({ title, img, description }: FeatureItem) {
  const imgStyle = {
    height: "7.5em",
    width: "7.5em",
  };

  return (
    <div className={clsx("col col--6")}>
      <div className="text--center">
        <img src={useBaseUrl(img)} style={imgStyle} alt={title} />
      </div>
      <div className="padding-horiz--md">
        <Heading as="h3" className="text--center">
          {title}
        </Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.JSX.Element {
  return (
    <section className={styles["features"]}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
