"""Inline the Vite build into one self-contained HTML file (dist/single.html) for sharing a preview.
Run after `npm run build`:  python3 sim/bundle.py"""
import glob, re
h = open('dist/index.html').read()
js = open(glob.glob('dist/assets/*.js')[0]).read().replace('</script', '<\\/script')
css = open(glob.glob('dist/assets/*.css')[0]).read()
h = re.sub(r'<script type="module"[^>]*></script>', '', h)
h = re.sub(r'<link rel="stylesheet" crossorigin[^>]*>', lambda m: '<style>' + css + '</style>', h)
h = h.replace('</body>', '<script type="module">\n' + js + '\n</script></body>')
open('dist/single.html', 'w').write(h)
print('dist/single.html', len(h) // 1024, 'KB')
