import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: 'Easy to follow',
    Svg: require('@site/static/img/teaching_re_g7e3.svg').default,
    description: (
      <>
        The guide is divided into sections and subsections to make it 
        easy to find the information you need.
      </>
    ),
  },
  {
    title: 'Small examples to guide you',
    Svg: require('@site/static/img/learning_re_32qv.svg').default,
    description: (
      <>
        The guide has small examples to guide you through the process of
        understanding the admin resources. 
      </>
    ),
  },
  {
    title: 'Self-explanatory',
    Svg: require('@site/static/img/books_re_8gea.svg').default,
    description: (
      <>
        The guide is self-explanatory. It does not require any prior
        knowledge of the admin resources.
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
