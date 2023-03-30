import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: 'Retailer API Docs',
    Svg: require('@site/static/img/easy-follow.svg').default,
    description: (
      <>
        Guide for retailers or merchants to integrate with Peddler DaaS API.
      </>
    ),
    buttonText: '📃',
    slug: '/docs/intro',
  },
  {
    title: 'Enterprise Shipping API Docs',
    Svg: require('@site/static/img/example-guide.svg').default,
    description: (
      <>
        Guide for large scale enterprises to integrate with Peddler DaaS API. 
      </>
    ),
    buttonText: '🚚',
    slug: '/carrier-docs/intro',
  },
  {
    title: 'API Endpoints',
    Svg: require('@site/static/img/self-explain.svg').default,
    description: (
      <>
        Reference for all the API endpoints available in Peddler DaaS API.
      </>
    ),
    buttonText: '🧑🏻‍💻',
    slug: '/api',
  },
];

function Feature({ Svg, title, description, slug, buttonText }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={slug}
          >
            Click here to proceed {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
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
