"""Give every choice in a pack its clip: an act (how it moves) and up to three props (what it shows).
Hand-written clips in <pack>.clips.txt win; the rest are worked out from the words on the card.
  python3 sim/clips.py src/content/packs/week1.json            # fills in clips, prints coverage
Override file lines:  cardId.DIR act prop prop prop      e.g.  g1.R zoom 🌊 🦢 🪑
"""
import json, re, sys, zlib

# Most specific first: the first words found win.
WORDS = [
 ('gosling','🐣'),('goose','🦢'),('geese','🦢'),('gerald','🦢'),('honk','🦢'),('swan','🦢'),('duck','🦆'),
 ('raccoon','🦝'),('randy','🦝'),('pothole','🕳️'),('kevin','🕳️'),('cheese','🧀'),('moon','🌙'),('robot','🤖'),('wizard','🧙'),
 ('frog','🐸'),('bear','🐻'),('pigeon','🐦'),('seagull','🐦'),('gull','🐦'),('crow','🐦'),('dove','🕊️'),('whiskers','🐈'),('cat ','🐈'),
 ('biscuit','🐕'),('dog','🐕'),('squirrel','🐿️'),('acorn','🌰'),('zebra','🦓'),('pony','🐴'),('horse','🐴'),('bees','🐝'),('badger','🦡'),
 ('monster','🦕'),('ghost','👻'),('scarecrow','🌾'),('compost','🌱'),('skull','💀'),('tattoo','💀'),('scone','🧁'),('scooter','🛵'),
 ('statue','🗿'),('portrait','🖼️'),('sculpture','👂'),('casino','🎰'),('helicopter','🚁'),('helipad','🚁'),('rocket','🚀'),('sock','🧦'),
 ('tyre','🛞'),('soup','🍲'),('gravy','🥣'),('minestrone','🍲'),('pie','🥧'),('cake','🎂'),('bread','🍞'),('loaf','🍞'),('bakery','🍞'),('bun','🍞'),
 ('ice cream','🍦'),('hot dog','🌭'),('tuna','🐟'),('fish','🐟'),('chips','🍟'),('crisps','🍟'),('egg','🥚'),('carrot','🥕'),('lunch','🥪'),
 ('nugget','🍗'),('vegetable','🥦'),('honey','🍯'),('dinner','🍝'),('menu','🍝'),('restaurant','🍝'),
 ('pond','🌊'),('river','🌊'),('leak','💧'),('flood','🌊'),('reservoir','🌊'),('water','💧'),('pool','🏊'),
 ('key','🔑'),('lock','🔒'),('door','🚪'),('clock','🕰️'),('bell','🔔'),('billboard','🪧'),('sign','🪧'),('poster','📜'),('flag','🚩'),
 ('napkin','🗺️'),('map','🗺️'),('passport','🛂'),('visa','🛂'),('bus','🚌'),('train','🚂'),('yacht','⛵'),('boat','⛵'),('kayak','🛶'),('raft','🛶'),
 ('drone','🛸'),('bridge','🌉'),('wall','🧱'),('box','📦'),('printer','🖨️'),('photocopier','🖨️'),('chair','🪑'),('stapler','📎'),('coat','🧥'),
 ('shoe','👟'),('hat','🎩'),('glitter','✨'),('sparkl','✨'),('confetti','🎊'),('firework','🎆'),('sparkler','🎇'),('balloon','🎈'),
 ('troph','🏆'),('medal','🏅'),('olympic','🏅'),('rosette','🏵️'),('whistl','📣'),('football','⚽'),('skate','🛹'),('swing','🎠'),
 ('marathon','🏃'),('race','🏁'),('grand prix','🏁'),('torch','🔥'),('volcano','🌋'),('snow','❄️'),('igloo','❄️'),('fog','🌫️'),
 ('heatwave','☀️'),('sun ','☀️'),('darkness','🌑'),('storm','⛈️'),('rain','🌧️'),('weather','🌦️'),('radar','📡'),('antenna','📡'),
 ('podcast','🎙️'),('karaoke','🎤'),('sing','🎤'),('song','🎵'),('choir','🎶'),('anthem','🎶'),('busker','🎵'),('notes','🎵'),('opera','🎭'),
 ('mime','🤡'),('invisible','🫥'),('app','📱'),(' ads','📢'),('crystal ball','🔮'),('vision','🔮'),('psychic','🔮'),('purple','🟣'),
 ('bab','👶'),('wedding','💍'),('marry','💍'),('date','💘'),('beard','🧔'),('umbrella','☂️'),('museum','🏛️'),('jail','🚔'),
 ('police','🚓'),('arrest','🚓'),('curfew','🌙'),('speed camera','📸'),('camera','📸'),('photo','📸'),('ticket','🎟️'),
 ('ballot','🗳️'),('vote','🗳️'),('election','🗳️'),('campaign','🗳️'),('rally','📣'),('debate','🎤'),('speech','🎤'),
 ('court','⚖️'),('sue','⚖️'),('suing','⚖️'),('lawyer','⚖️'),('appeal','⚖️'),('guilty','⚖️'),('gavel','⚖️'),('inquiry','🔍'),('investigat','🔍'),('search','🔍'),
 ('petition','📝'),('paperwork','📄'),('complaint','📝'),('certificate','📜'),('letter','✉️'),('post','📮'),('email','📧'),
 ('calculator','🧮'),('lamp','💡'),('telescope','🔭'),('vending','🥤'),('nap','😴'),('sleep','😴'),('chess','♟️'),('tunnel','⛏️'),
 ('arcade','🕹️'),('fire','🚒'),('plow','🚜'),('plough','🚜'),('traffic','🚦'),('lights','🚦'),('cone','🚧'),('parking','🅿️'),('meter','🅿️'),('car ','🚗'),('limo','🚗'),
 ('road','🛣️'),('street','🛣️'),('roundabout','🔄'),('roof','🏠'),('tower','🏢'),('office','🏛️'),('city hall','🏛️'),('town hall','🏛️'),
 ('library','📚'),('book','📚'),('textbook','📚'),('school','🏫'),('lesson','🎓'),('youth centre','🏠'),('park','🌳'),('tree','🌳'),('allotment','🥕'),('fountain','⛲'),
 ('bank','🏦'),('vault','🏦'),('bugle','📰'),('headline','📰'),('front page','📰'),('newspaper','📰'),('paper','📰'),('press','📰'),('correction','📰'),
 ('tv','📺'),('show','📺'),('coin','🪙'),('tax','💰'),('budget','💰'),('money','💰'),('pay','💰'),('fine','💰'),('loan','💰'),('sell','💰'),('fund','💰'),('buy','💰'),
 ('holiday','🏖️'),('friday','📅'),('monday','📅'),('tuesday','📅'),('wednesday','📅'),('motto','🪧'),('law','📜'),('rename','🏷️'),('rebrand','🏷️'),
 ('tall','📏'),('moist','💦'),('compliment','💐'),('bin','🗑️'),('worse town','🏚️'),('twin','🏘️'),('timmy','👦'),('bev','👵'),('chad','🤑'),('doug','😰'),
]
WHO = {'gerald':'🦢','randy':'🦝','bev':'👵','chad':'🤑','doug':'😰','barb':'👮','marge':'📰','linda':'📚','steve':'🌦️','timmy':'👦','stranger':'🕵️',
       'pam':'🍎','sal':'🍝','coach':'📣','sheila':'🔮','nora':'🔬','brayden':'📱','marcel':'🤡','whiskers':'🐈','desk':'📜'}

NO = r"^(no\b|refuse|ban\b|decline|reject|absolutely not|hands off|evict|cancel|deny|not |bit much|veto|shut|close|fire |send .* home|disqualify|one .* is plenty|.* stays?$|unplug|turn .* off|take .* down|remove|pack it|overturn|geese only|.*isn't for sale|.*aren't for sale|.*not for sale|politely decline|safety first)"
RULES = [  # (pattern on the label, act)
 (r"ignore|leave |let (it|them|him)|pretend|keep it quiet|work from|when you're older|it's fine|is fine|say no|just be", 'sulk'),
 (r"\b(build|install|pave|plant|dig|construct|a second pond|helipad|skate park|more swings|roof)\b", 'build'),
 (r"\b(grand|party|festival|parade|gala|celebrat|fireworks|olympic|torch|host|welcome|free .* for|every dog wins|everyone wins|day off|nap day|holiday)\b", 'party'),
 (r"\b(sell|charge|fine|tax|collect|repossess|tickets|rent|auction|sponsor)", 'cashin'),
 (r"\b(pay|buy|fund|hire|settle|pay rise|bread it is|bin bags|commission|waive|forgive|supply)", 'cashout'),
 (r"\b(launch|rocket|fly|helicopter)\b", 'launch'),
 (r"\b(arrest|investigat|search|send in|escort|chase|invade|find the)", 'chase'),
 (r"\b(race|grand prix|raise the limit|mph)\b", 'race'),
 (r"\b(eat|lunch|dinner)\b", 'eat'),
 (r"\b(court|appeal|sue|guilty|plead|judge|fight it|inquiry)\b", 'court'),
 (r"\b(fix|repair|rescue|clean|reprint|trim|fill|de-glitter|undo|get .* back|demand)", 'fix'),
 (r"\b(debate|speech|speak|sing|rally|interview|attend|play|officiate|run it|light)", 'cheer'),
 (r"\b(print|correction|headline|lean into|podcast|put .* up|unveil|brochure)", 'news'),
 (r"\b(marry|love|date|adopt|comfort|apologi|give him|give her|give it|let love|friend|merge|back the|side with)", 'love'),
 (r"\b(turn|rebrand|rename|promote|make (him|her|it)|recognise|bigger moon|clone|both dougs|mayor timmy|keep the frog)", 'morph'),
 (r"\b(river|flood|rafting|leak)", 'flood'),
 (r"\b(steal|snatch|slap|got it|grab)", 'steal'),
]

def props_for(card, opt):
    found = []
    for src in (opt['label'], card['text'], opt['reaction']):
        low = ' ' + src.lower() + ' '
        hits = sorted(((low.find(w), e) for w, e in WORDS if w in low))
        for _, e in hits:
            if e not in found: found.append(e)
        if len(found) >= 3: break
    if not found: found = [WHO.get(card['who'], '❓')]
    generic = ('💰', '🏛️', '📰', '📅', '📜', '🛣️')  # only lead with these when nothing more specific is on the card
    found = [e for e in found if e not in generic] + [e for e in found if e in generic]
    return found[:3]

def act_for(card, opt, props):
    label = opt['label'].lower()
    net = sum(opt['effects'].values())
    if re.search(NO, label): return 'deny'
    for pat, act in RULES:
        if re.search(pat, label):
            if act == 'cheer' and net < 0: return 'boo'
            return act
    h = zlib.crc32((card['id'] + label).encode())
    if card['who'] == 'marge': return 'news'
    if net < -5: return ['boom', 'sulk', 'rain'][h % 3]
    return ['zoom', 'show', 'swarm', 'zoom', 'party'][h % 5]

def main(path):
    pack = json.load(open(path))
    over = {}
    try:
        for line in open(path.replace('.json', '.clips.txt')):
            line = line.split('#')[0].split()
            if len(line) >= 3: over[line[0]] = {'act': line[1], 'props': line[2:5]}
    except FileNotFoundError: pass
    names = {'R': 'right', 'L': 'left', 'U': 'up', 'D': 'down'}
    acts, weak, used = {}, [], set()
    for card in pack['cards'] + pack['campaign']:
        for d, opt in card['options'].items():
            key = next((k for k in over if k.split('.')[0] == card['id'] and names.get(k.split('.')[1]) == d), None)
            if key: opt['clip'] = over[key]; used.add(key)
            else:
                p = props_for(card, opt); opt['clip'] = {'act': act_for(card, opt, p), 'props': p}
                if p[0] == WHO.get(card['who']): weak.append(f"{card['id']}.{d}: {opt['label']}")
            acts[opt['clip']['act']] = acts.get(opt['clip']['act'], 0) + 1
    json.dump(pack, open(path, 'w'), ensure_ascii=False, indent=1)
    print(sum(acts.values()), 'choices;', len(over), 'hand-written,', len(set(over) - used), 'unused overrides', sorted(set(over) - used)[:8])
    print('acts:', dict(sorted(acts.items(), key=lambda kv: -kv[1])))
    print('only a character to show (%d):' % len(weak), weak[:40])

if __name__ == '__main__': main(sys.argv[1])
