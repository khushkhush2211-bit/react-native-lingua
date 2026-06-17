import { Unit } from '@/types/learning';

export const UNITS: Unit[] = [
  {
    id: 'es-unit-1',
    languageCode: 'es',
    title: 'Getting Started',
    description: 'Learn the basics of Spanish greetings and introductions.',
    order: 1,
    lessonIds: ['es-l1', 'es-l2', 'es-l3']
  },
  {
    id: 'fr-unit-1',
    languageCode: 'fr',
    title: 'Getting Started',
    description: 'Learn the basics of French greetings and introductions.',
    order: 1,
    lessonIds: ['fr-l1', 'fr-l2']
  },
  {
    id: 'ja-unit-1',
    languageCode: 'ja',
    title: 'Getting Started',
    description: 'Learn the basics of Japanese greetings and introductions.',
    order: 1,
    lessonIds: ['ja-l1', 'ja-l2']
  },
  {
    id: 'de-unit-1',
    languageCode: 'de',
    title: 'Getting Started',
    description: 'Learn the basics of German greetings and introductions.',
    order: 1,
    lessonIds: ['de-l1', 'de-l2']
  }
];
