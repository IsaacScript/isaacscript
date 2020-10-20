import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import CodeBlock from "@theme/CodeBlock";
import Layout from "@theme/Layout";
import React, { CSSProperties } from "react";
import styles from "./styles.module.scss";

interface Feature {
    img: string;
    title: string;
    description: JSX.Element;
}

const features: Feature[] = [
    {
        img: "/images/items/magic_mushroom.png",
        title: "The Entire Isaac API, Strongly Typed",
        description: (
            <>
                <li>Code fearlessly without having to worry about making a typo.</li>
                <li>Mouseover any function call to see exactly what it does, saving you from opening the docs.</li>
            </>
        ),
    },
    {
        img: "/images/typescripttolua.png",
        title: "Powered by TypeScriptToLua",
        description: (
            <>
                <li>
                    IsaacScript leverages the excellent <a href="https://typescripttolua.github.io/">TypeScriptToLua</a>{" "}
                    library.
                </li>
                <li>All of your favorite TypeScript features will be automatically transpiled to Lua.</li>
            </>
        ),
    },
];

const exampleSource = `
const deadEnts = Isaac.GetRoomEntities().filter((ent) => ent.IsDead())
`.trim();

const exampleOutput = `
local deadEnts = {}
for _, ent in ipairs(Isaac.GetRoomEntities()) do
   if ent:IsDead() then
      table.insert(deadEnts, ent)
   end
end
`.trim();

function Feature({ title, description, img }: Feature) {
    const imgStyle: CSSProperties = {
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: "20%",
    };
    const centerStyle: CSSProperties = {
        textAlign: "center",
    };
    return (
        <div className="col col--6">
            <img src={img} style={imgStyle} />
            <h3 style={centerStyle}>{title}</h3>
            <ul>{description}</ul>
        </div>
    );
}

export default function Home() {
    const centerStyle: CSSProperties = {
        textAlign: "center",
    };
    return (
        <Layout>
            <header className={`hero ${styles.heroBanner} container`}>
                <h1 className={`hero__title ${styles.title}`}>
                    <b>IsaacScript</b>
                </h1>
                <p className="hero__subtitle">
                    Write <em>Binding of Isaac: Afterbirth+</em> mods with TypeScript
                </p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--outline button--success button--lg"
                        to={useBaseUrl("docs/features")}
                    >
                        Why should I?
                    </Link>
                    <Link
                        className="button button--outline button--primary button--lg"
                        to={useBaseUrl("docs/getting-started")}
                    >
                        Get Started
                    </Link>
                </div>
            </header>
            <main>
                <section className="padding-vert--md container">
                    <div className="row">
                        <div className={`col col--6 ${styles.example}`}>
                            <h3 style={centerStyle}>TypeScript Input</h3>
                            <CodeBlock className="typescript">{exampleSource}</CodeBlock>
                        </div>
                        <div className={`col col--6 ${styles.example}`}>
                            <h3 style={centerStyle}>Lua Output</h3>
                            <CodeBlock className="lua">{exampleOutput}</CodeBlock>
                        </div>
                    </div>
                </section>
                <section className="padding-vert--lg container">
                    <div className="row">
                        {features.map((props, idx) => (
                            <Feature key={idx} {...props} />
                        ))}
                    </div>
                </section>
            </main>
        </Layout>
    );
}
