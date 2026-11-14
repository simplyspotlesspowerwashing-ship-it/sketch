import { week1Content } from '../src/content/index.ts';

const p = week1Content.pack;
console.log(`OK ${p.id}: ${p.cards.length} desk cards, ${p.events.length} events, ${p.dave.outcomes.length} Dave outcomes`);
