import type { Locale } from '@/lib/i18n/dictionaries';

// Timeline unificada — mistura trabalho e formação por ordem cronológica
// descendente (mais recente primeiro), igual ao design.
// `now: true` → renderiza badge "AGORA / NOW" em vez de data de fim.

export interface TimelineItem {
  id: string;
  period: string;
  now?: true;
  pt: { title: string; company: string; desc: string };
  en: { title: string; company: string; desc: string };
}

const timeline: TimelineItem[] = [
  {
    id: 'current',
    period: '2021',
    now: true,
    pt: {
      title: 'Web Developer',
      company: 'Teia Digital · Oliveira do Hospital',
      desc: 'Desenvolvimento full-stack de plataformas web em PHP + Html, CSS, JavaScript, MySQL. Lidero implementações de novas features e otimização de performance.',
    },
    en: {
      title: 'Web Developer',
      company: 'Teia Digital · Oliveira do Hospital',
      desc: 'Full-stack development of web platforms in PHP + Html, CSS, JavaScript, MySQL . Leading new feature implementations and performance optimization.',
    },
  },
  {
    id: 'degree',
    period: '2017 — 2021',
    pt: {
      title: 'Licenciatura em Engenharia Informática',
      company: 'Escola Superior de Tecnologia e Gestão de Oliveira do Hospital',
      desc: 'Foco em desenvolvimento web e bases de dados. Projeto final em PHP + React.',
    },
    en: {
      title: "Bachelor's in Computer Engineering",
      company: 'Placeholder University',
      desc: 'Focus on web development and databases. Final project in PHP + React.',
    },
  },
  {
    id: 'cet',
    period: '2018 — 2020',
    pt: {
      title: 'CP — Gestão de Equipamentos Informáticos',
      company: 'Eptoliva',
      desc: 'Formação técnica em programação e gestão de sistemas.',
    },
    en: {
      title: 'CP — Gestão de Equipamentos Informáticos',
      company: 'Eptoliva',
      desc: 'Technical training in programming and systems management.',
    },
  },
];

export function getTimeline(): TimelineItem[] {
  return timeline;
}

export function getTimelineContent(item: TimelineItem, lang: Locale) {
  return item[lang];
}
