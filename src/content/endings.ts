// Endings that belong to every week. The Scrapbook collects them all; each week also adds its own
// recall endings (low:/high:) and rare endings (rare:) in its pack.
import type { Ending } from '../engine/types.ts';

/** Voted out at night: blamed on whichever group liked you least. */
export const COMMON_ENDINGS: Record<string, Ending> = {
  'out:people': { title: 'Out-Voted by a Sandwich', text: 'The people wrote in a ham sandwich. It won by a landslide. It has already done more than you.' },
  'out:business': { title: 'Out-Spent', text: 'Chad bought every vote in town, then three from the next town, then one from the moon. Just to be safe.' },
  'out:law': { title: 'Disqualified on a Technicality', text: 'Barb found a rule. Nobody had read it since 1652. It says mayors must own a horse. You do not own a horse.' },
  'out:press': { title: 'Headlined Out', text: "The Bugle ran 'IS THE MAYOR A SOUP?' every day. Nobody believed it. Everybody voted against the soup." },
  'out:people_2': { title: 'Replaced by a Duck', text: 'The town held a recount and found they preferred the duck from the park pond. The duck has already fixed three potholes. Not Kevin.' },
  'out:people_3': { title: 'Booed into a Record Deal', text: 'The town booed you so beautifully the Bin Lids recorded it. It went to number one. You are on the cover. Retired.' },
  'out:business_2': { title: 'Valued at £14', text: 'Chad had you valued. You came to £14 and a coat. He bought you anyway. He wanted the coat.' },
  'out:business_3': { title: 'Replaced by an App', text: "Brayden's app does your job now. It says no to everything. Business has never been better. Nobody can find the off switch." },
  'out:law_2': { title: 'Lost in Form 7B', text: "Barb found a form you hadn't filled in. Form 7B. It's nine hundred pages. You are still on page three." },
  'out:law_3': { title: 'Impeached by a Cat', text: 'Mr Whiskers Esq. impeached you. He was also the judge. And the jury. He slept through his own verdict. Guilty.' },
  'out:press_2': { title: 'Fired by the Crossword', text: "The Bugle's crossword spelled out YOU'RE FIRED. Twelve across. Everybody got it. Bev got it in four seconds." },
  'out:press_3': { title: 'Interviewed Out of Office', text: "Marge interviewed you for nine hours. You said 'um' four thousand times. They printed every single one." },
};
/** Three ways to be voted out per group; which one you get depends on the night. */
export const OUT_ORDER = ['out:people', 'out:people_2', 'out:people_3', 'out:business', 'out:business_2', 'out:business_3', 'out:law', 'out:law_2', 'out:law_3', 'out:press', 'out:press_2', 'out:press_3'];
export const RECALL_ORDER = ['low:people', 'low:business', 'low:law', 'low:press', 'low:treasury', 'high:people', 'high:business', 'high:law', 'high:press'];
