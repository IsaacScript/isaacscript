import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CodeBlock from "@theme/CodeBlock";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";
import clsx from "clsx";
import HomepageFeatures from "../components/index"; // eslint-disable-line @typescript-eslint/no-restricted-imports
import styles from "./index.module.css";

const CENTER_STYLE = {
  textAlign: "center",
} as const;

function HomepageHeader(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles["heroBanner"])}>
      <div className="container">
        <img
          src={useBaseUrl("img/isaacscript-logo.png")}
          className="landing-logo"
        />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          Write <em>Binding of Isaac: Repentance</em> mods with TypeScript
        </p>
        <div className={styles["buttons"]}>
          <Link
            className={clsx(
              "button button--outline button--secondary button--lg landing-button",
              styles["getStarted"],
            )}
            to={useBaseUrl("main/features")}
          >
            Why should I?
          </Link>

          <Link
            className={clsx(
              "button button--outline button--secondary button--lg landing-button",
              styles["getStarted"],
            )}
            to={useBaseUrl("main/getting-started")}
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

const exampleSource = `
const entities = Isaac.GetRoomEntities();
const deadEntities = entities.filter((entity) => entity.IsDead());
`.trim();

const exampleOutput = `
local entities = Isaac.GetRoomEntities()
local deadEntities = {}
for _, entity in ipairs(entities) do
   if entity:IsDead() then
      table.insert(deadEntities, entity)
   end
end
`.trim();

export default function Home(): React.JSX.Element {
  return (
    <Layout description="A framework for coding mods for The Binding of Isaac: Repentance">
      <HomepageHeader />

      <br />
      <br />

      <main>
        <section className="padding-vert--md container">
          <div className="row">
            <div className={`col col--6 ${styles["example"]}`}>
              <Heading as="h3" style={CENTER_STYLE}>
                TypeScript Input
              </Heading>
              <CodeBlock language="typescript">{exampleSource}</CodeBlock>
            </div>
            <div className={`col col--6 ${styles["example"]}`}>
              <Heading as="h3" style={CENTER_STYLE}>
                Lua Output
              </Heading>
              <CodeBlock language="lua">{exampleOutput}</CodeBlock>
            </div>
          </div>
        </section>

        <HomepageFeatures />
      </main>
    </Layout>
  );
}
