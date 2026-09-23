import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ops Manual',
  tagline: 'Doctrine for governed state, Office compilation, bounded execution, evidence, and re-entry.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://ops.matuteiglesias.link',
  baseUrl: '/',

  organizationName: 'matuteiglesias',
  projectName: 'ops-wiki',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Ops Manual',
      logo: {
        alt: 'Ops Manual Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/', label: 'Home', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Manual',
        },
        {to: '/docs/intro', label: 'Console', position: 'left'},
        {to: '/docs/office-charter', label: 'Office', position: 'left'},
        {to: '/docs/data-model', label: 'Architecture', position: 'left'},
        {to: '/docs/motif-registries', label: 'Motifs', position: 'left'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Start',
          items: [
            {label: 'Operator Console', to: '/docs/intro'},
            {label: 'Start Here', to: '/docs/start-here'},
            {label: 'One Pager Spec', to: '/docs/spec-one-pager'},
          ],
        },
        {
          title: 'Architecture',
          items: [
            {label: 'Authority, State & Projection', to: '/docs/data-model'},
            {label: 'Office Charter', to: '/docs/office-charter'},
            {label: 'Office Compile', to: '/docs/office-compile'},
          ],
        },
        {
          title: 'Execution',
          items: [
            {label: 'Execution Model', to: '/docs/execution-model'},
            {label: 'Checks and Runbooks', to: '/docs/checks-runbooks'},
            {label: 'Motif Registries', to: '/docs/motif-registries'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ops Manual. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
