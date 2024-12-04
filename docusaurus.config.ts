import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import { DocUrl, ProjectName, OrgGitURL, DocSrcUrl } from './src/consts';

const config: Config = {
  title: ProjectName,
  tagline: ProjectName,
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: DocUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Beaver IoT', // Usually your GitHub org/user name.
  projectName: ProjectName, // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: DocSrcUrl,
          docItemComponent: "@theme/ApiItem",
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: "api", // plugin id
        docsPluginId: "classic", // configured for preset-classic
        config: {
          beaver: {
            specPath: "examples/beaver.openapi.json",
            outputDir: "docs/dev-guides/backend/rest-api",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            showSchemas: true,
          } satisfies OpenApiPlugin.Options,
        }
      },
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      // title: ProjectName,
      logo: {
        alt: ProjectName,
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'userGuideSidebar',
          position: 'left',
          label: 'User Guide',
        },
        {
          type: 'docSidebar',
          sidebarId: 'devGuideSidebar',
          position: 'left',
          label: 'Dev Guide',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://discord.gg/vNFxbwfErm',
          label: 'Discord',
          position: 'right',
        },
        {
          href: OrgGitURL,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {},
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['java', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
  themes: ["docusaurus-theme-openapi-docs"],
};

export default config;
