import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: 'Easy to follow',
    Svg: require('@site/static/img/easy-follow.svg').default,
    description: (
      <>
        The guide is divided into sections and subsections to make it 
        easy to find the information you need.
      </>
    ),
  },
  {
    title: 'Small examples to guide you',
    Svg: require('@site/static/img/example-guide.svg').default,
    description: (
      <>
        The guide has small examples to guide you through the process of
        understanding the admin resources. 
      </>
    ),
  },
  {
    title: 'Self-explanatory',
    Svg: require('@site/static/img/self-explain.svg').default,
    description: (
      <>
        The guide is self-explanatory. But still, some prior knowledage of
        web app development will be helpful.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
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
