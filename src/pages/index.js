import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";
import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";
import HomepageFeatures from "../components/HomepageFeatures";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <img
          src={useBaseUrl("img/isaacscript-logo.png")}
          className="landing-logo"
        />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">
          Write <em>Binding of Isaac: Repentance</em> mods with TypeScript
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx(
              "button button--outline button--secondary button--lg landing-button",
              styles.getStarted
            )}
            to={useBaseUrl("docs/features")}
          >
            Why should I?
          </Link>

          <Link
            className={clsx(
              "button button--outline button--secondary button--lg landing-button",
              styles.getStarted
            )}
            to={useBaseUrl("docs/getting-started")}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

const exampleSource = `
const deadEnts = Isaac.GetRoomEntities().filter((ent) => ent.IsDead());
`.trim();

const exampleOutput = `
local deadEnts = {}
for _, ent in ipairs(Isaac.GetRoomEntities()) do
   if ent:IsDead() then
      table.insert(deadEnts, ent)
   end
end
`.trim();

export default function Home() {
  const centerStyle = {
    textAlign: "center",
  };

  return (
    <Layout description="A framework for coding mods for The Binding of Isaac: Repentance">
      <HomepageHeader />

      <br />
      <br />

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

        <HomepageFeatures />
      </main>
    </Layout>
  );
}
