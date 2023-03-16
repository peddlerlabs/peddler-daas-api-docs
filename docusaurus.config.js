// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Peddler API docs",
  tagline: "Guide to the Admin API",
  url: "https://abinashbunty.github.io",
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
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/Abinashbunty/peddler-daas-api-docs/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/Abinashbunty/peddler-daas-api-docs/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('docusaurus-preset-openapi').ThemeConfig} */
    ({
      navbar: {
        title: "DaaS",
        logo: {
          alt: "Peddler Logo",
          src: "https://www.peddler.com/images/5b987eb7aa7aee05c01036832b57105d-logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          { to: "/api", label: "API", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/peddlerlabs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "About",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: 'Peddler',
            items: [
              {
                label: 'Marketplace',
                href: 'https://www.peddler.com/',
              },
              {
                label: 'Delivery Service',
                href: 'https://www.peddler.express/',
              },
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
        copyright: `Copyright © ${new Date().getFullYear()} Peddler Labs.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
