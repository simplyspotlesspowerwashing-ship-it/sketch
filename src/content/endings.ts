// Endings that belong to every week. The Scrapbook collects them all; each week also adds its own
// recall endings (low:/high:) and rare endings (rare:) in its pack.
import type { Ending } from '../engine/types.ts';

/** Voted out at night: blamed on whichever group liked you least. */
export const COMMON_ENDINGS: Record<string, Ending> = {
  'out:people': { title: 'Out-Voted by a Sandwich', text: 'The people wrote in a ham sandwich. It won by a landslide. It has already done more than you.' },
  'out:business': { title: 'Out-Spent', text: 'Chad bought every vote in town, then three from the next town, then one from the moon. Just to be safe.' },
  'out:law': { title: 'Disqualified on a Technicality', text: 'Barb found a rule. Nobody had read it since 1652. It says mayors must own a horse. You do not own a horse.' },
  'out:press': { title: 'Headlined Out', text: "The Bugle ran 'IS THE MAYOR A SOUP?' every day. Nobody believed it. Everybody voted against the soup." },
};
export const OUT_ORDER = ['out:people', 'out:business', 'out:law', 'out:press'];
export const RECALL_ORDER = ['low:people', 'low:business', 'low:law', 'low:press', 'low:treasury', 'high:people', 'high:business', 'high:law', 'high:press'];
