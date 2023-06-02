import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: 'Retailer Docs',
    Svg: require('@site/static/img/shopping.svg').default,
    description: (
      <>
        Guide for retailers or merchants to integrate with Peddler DaaS API.
      </>
    ),
    buttonText: 'Retailer Shipping API',
    slug: '/docs/intro',
  },
  {
    title: 'Enterprise Docs',
    Svg: require('@site/static/img/logistics.svg').default,
    description: (
      <>
        Guide for large scale enterprises to integrate with Peddler DaaS API. 
      </>
    ),
    buttonText: 'Enterprise Shipping API',
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
    buttonText: 'DaaS Endpoints',
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
        <h2>{title}</h2>
        <p>{description}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to={slug}
          >
            {buttonText}
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
