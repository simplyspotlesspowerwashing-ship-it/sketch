import { placeholderContent } from '../src/content/index.ts';

const p = placeholderContent.pack;
console.log(`OK ${p.id}: ${p.cards.length} desk cards, ${p.events.length} events, ${p.dave.outcomes.length} Dave outcomes`);
