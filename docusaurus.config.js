// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/palenight");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Peddler DaaS API",
  tagline: "Guide to Peddler Shipping API",
  url: "https://shipping-api-docs.pdlr.nl/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/peddler-logo.png",
  organizationName: "Abinashbunty", // Usually your GitHub org/user name.
  projectName: "peddler-daas-api-docs", // Usually your repo name.

  presets: [
    [
      "docusaurus-preset-openapi",
      /** @type {import('docusaurus-preset-openapi').Options} */
      {
        docs: {
          routeBasePath: "/docs",
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          // lastVersion: "current",
          // onlyIncludedVersions: ["current"],
          // Please change this to your repo.
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
        routeBasePath: 'carrier-docs',
        sidebarPath: require.resolve('./sidebars.js'),
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
      language: ["en"],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('docusaurus-preset-openapi').ThemeConfig} */
    ({
      navbar: {
        // title: "",
        logo: {
          alt: "Peddler Logo",
          src: "https://www.peddler.com/images/5b987eb7aa7aee05c01036832b57105d-logo.svg",
          width: 100,
        },
        items: [
          {
            type: "doc",
            docId: "retailer-api-docs",
            position: "left",
            label: "Retailer Docs",
          },
          {
            to: "/carrier-docs/intro",
            docId: "intro",
            label: "Enterprise Docs",
            position: "left",
          },
          { to: "/api", label: "DaaS API", position: "left" },
          // { to: "/blog", label: "📰Blog", position: "left" },
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
        style: "light",
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true
        }
      }
    }),
  scripts: [
    "https://peddler.instatus.com/en/47dda54c/widget/script.js"
  ]
};

module.exports = config;
