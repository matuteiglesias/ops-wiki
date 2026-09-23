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
    image: 'Fast human entry',
    role: 'Re-enter from the latest compiled surface, choose one bounded move, leave evidence, and preserve a restart pointer.',
    primary: '/docs/intro',
    secondary: [
      {label: 'Start Here', to: '/docs/start-here'},
      {label: 'Ops under Office', to: '/docs/ops-under-office'},
    ],
  },
  {
    id: '02',
    title: 'Authority & Concepts',
    image: 'State, views, VACChain, Endpoint',
    role: 'Separates governed state from conceptual vocabulary and published views without recreating a second data model.',
    primary: '/docs/data-model',
    secondary: [
      {label: 'One Pager Spec', to: '/docs/spec-one-pager'},
    ],
  },
  {
    id: '03',
    title: 'Office',
    image: 'Coherent generation',
    role: 'Control Tower snapshot, typed work, Staff preparation, Principal surface, execution packets, and reviewed reentry.',
    primary: '/docs/office-charter',
    secondary: [
      {label: 'Office Compile', to: '/docs/office-compile'},
    ],
  },
  {
    id: '04',
    title: 'Execution',
    image: 'Bounded moves',
    role: 'Current work kinds, operator-contract boundary, stop rules, evidence patterns, and optional craft language.',
    primary: '/docs/execution-model',
    secondary: [
      {label: 'Checks and Runbooks', to: '/docs/checks-runbooks'},
    ],
  },
  {
    id: '05',
    title: 'Motif Memory',
    image: 'Reusable names, lightweight prose',
    role: 'Keeps the main operator and work motifs visible while exhaustive reusable vocabularies live in machine-readable registries.',
    primary: '/docs/motif-registries',
    secondary: [
      {label: 'Operator Motifs', to: '/docs/operator-registry'},
    ],
  },
  {
    id: '06',
    title: 'Weekly Timing',
    image: 'Cadence lives elsewhere',
    role: 'Blocks remain bounded here; detailed horizons, Mon/Wed/Fri carry, 14-day frames, and weekly cadence belong to Weekly Ops Governance.',
    primary: '/docs/day-clock-selection',
    secondary: [
      {label: 'Assistant-Guided Compile', to: '/docs/assistant-guided-daily-compile'},
    ],
  },
];

const reactionSteps = [
  {label: 'Govern', text: 'Keep mutable truth in the governed source.', to: '/docs/data-model'},
  {label: 'Compile', text: 'Produce one coherent current generation.', to: '/docs/office-compile'},
  {label: 'Prepare', text: 'Reduce ambiguity below the Principal.', to: '/docs/office-charter'},
  {label: 'Execute', text: 'Run one bounded move under current authority.', to: '/docs/execution-model'},
  {label: 'Reenter', text: 'Return evidence and reviewed state proposals.', to: '/docs/ops-under-office'},
];

function Hero(): ReactNode {
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className="container">
        <p className={styles.kicker}>Ops Home</p>
        <Heading as="h1" className={styles.heroTitle}>
          Govern state once. Compile small surfaces. Execute boundedly.
        </Heading>
        <p className={styles.heroSubtitle}>
          A public manual for Control Tower / Office boundaries, VACChain and Endpoint reasoning,
          bounded execution, evidence, and reusable work motifs.
        </p>
        <div className={styles.heroActions}>
          <Link className="button button--primary button--lg" to="/docs/intro">Enter the console</Link>
          <Link className="button button--secondary button--lg" to="/docs/data-model">Read the architecture</Link>
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
        {card.secondary.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
      </div>
    </article>
  );
}

function Pillars(): ReactNode {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Small doctrine, explicit authority</p>
          <Heading as="h2">Six surfaces are enough to navigate the current system.</Heading>
        </div>
        <div className={styles.cardGrid}>
          {pillars.map((card) => <PillarCardView card={card} key={card.id} />)}
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
          <p className={styles.kicker}>Operating cycle</p>
          <Heading as="h2">Authority stays upstream; evidence comes back.</Heading>
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
            <p className={styles.kicker}>Boundary</p>
            <Heading as="h2">This manual explains meaning; it does not become live state.</Heading>
            <p>
              Control Tower and Office own current semantics. Weekly Governance owns timing heuristics.
              Frontier and other UIs render published views.
            </p>
          </div>
          <div className={styles.boundaryLinks}>
            <Link to="/docs/start-here">Start Here</Link>
            <Link to="/docs/office-compile">Office Compile</Link>
            <Link to="/docs/motif-registries">Motif Registries</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="Ops Home" description="Doctrine for governed state, Office compilation, bounded execution, VACChain/Endpoint reasoning, evidence, and re-entry.">
      <Hero />
      <main>
        <Pillars />
        <ReactionCycle />
        <BoundaryPanel />
      </main>
    </Layout>
  );
}
