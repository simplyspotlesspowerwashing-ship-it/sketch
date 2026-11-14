import week1 from './packs/week1.json' with { type: 'json' };
import { loadPack } from './schema.ts';

export const week1Content = loadPack(week1);
