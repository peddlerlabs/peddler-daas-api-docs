// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Peddler DaaS API",
  tagline: "Guide to Peddler DaaS Shipping API",
  url: "https://shipping-api-docs.pdlr.nl/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/peddler-logo.png",
  organizationName: "Abinashbunty", // Usually your GitHub org/user name.
  projectName: "peddler-daas-api-docs", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          id : "docs",
          routeBasePath: "/docs",
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          // editUrl:
            // "https://github.com/Abinashbunty/peddler-daas-api-docs/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'carrier-docs',
        path: 'carrier-docs',
        routeBasePath: '/carrier-docs',
        sidebarPath: require.resolve('./sidebars.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      }, 
    ]
],

  themes: [
    // @ts-ignore
    ["@easyops-cn/docusaurus-search-local",
    /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
    // @ts-ignore
    ({
      hashed: true,
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
      docsPluginIdForPreferredVersion: "docs",
      }),
    ],
  ],

  themeConfig:
    {
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true
      },
      navbar: {
        title: "DaaS API Docs",
        logo: {
          alt: "Peddler Logo",
          src: "/img/peddler-logo.svg",
          width: 100,
        },
        items: [
          {
            to: "/docs/intro",
            position: "left",
            label: "Retailer Docs",
          },
          {
            to: "/carrier-docs/intro",
            label: "Enterprise Docs",
            position: "left",
          },
          {
            href: "https://github.com/peddlerlabs",
            className: "header-github-link",
            "aria-label": "GitHub repository",
            // label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "More",
            items: [
              {
                label: "Retailer API Docs",
                to: "/docs/intro",
              },
              {
                label: "Enterprise API Docs",
                to: "/carrier-docs/intro",
              },
              {
                label: "About us",
                href: 'https://www.peddler.com/en/about-us/'
              },
              {
                label: 'Terms & Conditions',
                href: 'https://www.peddler.com/en/terms-and-conditions/'
              }
            ],
          },
          {
            title: 'Peddler',
            items: [
              {
                label: '🛒Marketplace',
                href: 'https://www.peddler.com/',
              },
              {
                label: '📦Delivery Service',
                href: 'https://www.peddler.express/',
              },
              {
                label: '⚙️DaaS API Status',
                href: 'https://peddler.instatus.com/',
              }
            ],
          },
          {
            title: 'Social Media',
            items: [
              {
                label: 'Instagram',
                href: 'https://www.instagram.com/peddler/',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/peddlerdotcom/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/peddler_it',
              }
            ],
          },
        ],
        // logo: {
        //   alt: 'Peddler logo',
        //   src: 'https://www.peddler.com/images/5b987eb7aa7aee05c01036832b57105d-logo.svg',
        // },
        copyright: `Copyright © ${new Date().getFullYear()} Peddler Labs.`,
      },
      prism: {
        additionalLanguages: ["php"],
        theme: themes.vsLight,
        darkTheme: themes.vsDark,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: false,
          hideable: true,
        }
      }
    },
    scripts: [
      {
        src: "https://peddler.instatus.com/en/47dda54c/widget/script.js",
        async: true,
        defer: true,
      },
    ],
};

module.exports = config;
