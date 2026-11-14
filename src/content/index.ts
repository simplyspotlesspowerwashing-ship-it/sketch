import placeholder from './packs/placeholder.json' with { type: 'json' };
import { loadPack } from './schema.ts';

export const placeholderContent = loadPack(placeholder);
