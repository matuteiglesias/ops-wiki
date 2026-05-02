import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type PillarCard = {
  id: string;
  title: string;
  image: string;
  role: string;
  primary: string;
  secondary: {label: string; to: string}[];
};

const pillars: PillarCard[] = [
  {
    id: '01',
    title: 'Operator Console',
    image: 'Re-entry and boot surface',
    role: 'The fast landing zone: re-enter, choose BOOT, run a safe low-judgment path, or start the first focus block.',
    primary: '/docs/intro',
    secondary: [
      {label: 'Start Here', to: '/docs/start-here'},
      {label: 'Day Clock', to: '/docs/day-clock-selection'},
    ],
  },
  {
    id: '02',
    title: 'Core Ontology',
    image: 'Shared contracts',
    role: 'Stable definitions for projects, work units, VAC chains, endpoints, frontier, modes, operators, and evidence.',
    primary: '/docs/spec-one-pager',
    secondary: [
      {label: 'Data Model', to: '/docs/data-model'},
    ],
  },
  {
    id: '03',
    title: 'Office Regulator',
    image: 'Compile, decide, reingest',
    role: 'The governance layer that keeps the Principal away from raw chaos and turns state into briefs, queues, and candidates.',
    primary: '/docs/office-charter',
    secondary: [
      {label: 'Office Compile', to: '/docs/office-compile'},
      {label: 'Loop Playbook', to: '/docs/office-loop-playbook'},
    ],
  },
  {
    id: '04',
    title: 'Clock and Selection',
    image: 'MAINT / FOCUS budget',
    role: 'The human scheduling interface: one block, one mode, bounded evidence, WIP caps, and re-entry protocol.',
    primary: '/docs/day-clock-selection',
    secondary: [
      {label: 'Daily Compiler', to: '/docs/daily-plan-compiler-algorithm'},
      {label: 'Assistant Compile', to: '/docs/assistant-guided-daily-compile'},
    ],
  },
  {
    id: '05',
    title: 'Execution Machinery',
    image: 'Modes and operators',
    role: 'The runtime contract: modes, operators, runs, debug packets, stop rules, and evidence patterns.',
    primary: '/docs/execution-model',
    secondary: [
      {label: 'Operator Registry', to: '/docs/operator-registry'},
    ],
  },
  {
    id: '06',
    title: 'Verification Layer',
    image: 'Checks and runbooks',
    role: 'Truth enforcement: smoke checks, health checks, runbooks, evidence manifests, and drift handling.',
    primary: '/docs/checks-runbooks',
    secondary: [
      {label: 'Ops under Office', to: '/docs/ops-under-office'},
      {label: 'Data Model', to: '/docs/data-model'},
    ],
  },
  {
    id: '07',
    title: 'Thin Staff Interface',
    image: 'Prepare, route, post',
    role: 'Staff Preparation Surface. This routes to the existing office and assistant compile pages instead of inventing new docs.',
    primary: '/docs/assistant-guided-daily-compile',
    secondary: [
      {label: 'Office Compile', to: '/docs/office-compile'},
      {label: 'Ops under Office', to: '/docs/ops-under-office'},
    ],
  },
];

const reactionSteps = [
  {
    label: 'Sense',
    text: 'Start from current state, not the full universe.',
    to: '/docs/office-compile',
  },
  {
    label: 'Select',
    text: 'Compile a small candidate set for today.',
    to: '/docs/day-clock-selection',
  },
  {
    label: 'Prepare',
    text: 'Use assistant/staff help only to lower startup friction.',
    to: '/docs/assistant-guided-daily-compile',
  },
  {
    label: 'Execute',
    text: 'Run one block in one mode and leave evidence.',
    to: '/docs/execution-model',
  },
  {
    label: 'Reingest',
    text: 'Return closure, next touch, and carry update.',
    to: '/docs/ops-under-office',
  },
];

function Hero(): ReactNode {
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className="container">
        <p className={styles.kicker}>Ops Home</p>
        <Heading as="h1" className={styles.heroTitle}>
          Seven navigation surfaces for a bounded operating system.
        </Heading>
        <p className={styles.heroSubtitle}>
          A public-facing operator console that points to the actual manual pages: ontology, office compile, day clock, execution, checks, and assistant-guided staff preparation.
        </p>
        <div className={styles.heroActions}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Enter the console
          </Link>
          <Link className="button button--secondary button--lg" to="/docs/office-charter">
            Read the office charter
          </Link>
        </div>
      </div>
    </header>
  );
}

function PillarCardView({card}: {card: PillarCard}): ReactNode {
  return (
    <article className={styles.pillarCard}>
      <Link className={styles.cardMainLink} to={card.primary}>
        <div className={styles.cardTopline}>
          <span className={styles.cardId}>{card.id}</span>
          <span className={styles.cardImage}>{card.image}</span>
        </div>
        <Heading as="h3">{card.title}</Heading>
        <p>{card.role}</p>
      </Link>
      <div className={styles.cardLinks}>
        {card.secondary.map((item) => (
          <Link key={item.to} to={item.to}>{item.label}</Link>
        ))}
      </div>
    </article>
  );
}

function Pillars(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Actual docs, schematic navigation</p>
          <Heading as="h2">The seven cards route to files that exist today.</Heading>
          <p>
            No private dev journal, sheet, repo, or context registry link is exposed here. The cards are public navigation affordances over the current manual.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {pillars.map((card) => (
            <PillarCardView card={card} key={card.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReactionCycle(): ReactNode {
  return (
    <section className={clsx(styles.section, styles.reactionSection)}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Small reaction cycle</p>
          <Heading as="h2">Compile, act, and return state.</Heading>
          <p>
            This is the public version of the office/cell analogy: sense current state, select a small path, prepare just enough, execute one bounded block, and reingest residue.
          </p>
        </div>
        <div className={styles.reactionGrid}>
          {reactionSteps.map((step, index) => (
            <Link className={styles.reactionStep} to={step.to} key={step.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Heading as="h3">{step.label}</Heading>
              <p>{step.text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BoundaryPanel(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.boundaryPanel}>
          <div>
            <p className={styles.kicker}>Public safety boundary</p>
            <Heading as="h2">This page routes to manuals, not private sources.</Heading>
            <p>
              The manual can describe the operating architecture publicly while private links remain injected only when an agent or local workflow needs them.
            </p>
          </div>
          <div className={styles.boundaryLinks}>
            <Link to="/docs/start-here">Start Here</Link>
            <Link to="/docs/office-compile">Office Compile</Link>
            <Link to="/docs/checks-runbooks">Checks and Runbooks</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Ops Home"
      description="Public navigation layer for the ops manual, office compile, day clock, execution model, and verification contracts.">
      <Hero />
      <main>
        <Pillars />
        <ReactionCycle />
        <BoundaryPanel />
      </main>
    </Layout>
  );
}
