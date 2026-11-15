import { week1Pack as p } from '../src/content/index.ts';

const stories = new Set(p.cards.map((c) => c.story));
console.log(`OK ${p.id}: ${p.cards.length} cards (${p.cards.filter((c) => c.followUp).length} follow-ups) in ${stories.size} storylines, ${p.campaign.length} campaign cards`);
