"""Inline the Vite build into one self-contained HTML file (dist/single.html) for sharing a preview.
Fonts and the favicon are embedded; links to files that only exist on a real host are dropped.
Run after `npm run build`:  python3 sim/bundle.py"""
import base64, glob, re
h = open('dist/index.html').read()
js = open(glob.glob('dist/assets/*.js')[0]).read().replace('</script', '<\\/script')
css = open(glob.glob('dist/assets/*.css')[0]).read()
def data(path, mime): return f"data:{mime};base64,{base64.b64encode(open('dist' + path, 'rb').read()).decode()}"
css = re.sub(r"url\((['\"]?)(?:\.\./|/)(fonts/[^'\")]+\.woff2)\1\)", lambda m: f"url('{data('/' + m.group(2), 'font/woff2')}')", css)
h = re.sub(r'<script type="module"[^>]*></script>', '', h)
h = re.sub(r'<link rel="stylesheet" crossorigin[^>]*>', lambda m: '<style>' + css + '</style>', h)
h = re.sub(r'\s*<link rel="(manifest|apple-touch-icon|preload)"[^>]*>', '', h)
h = re.sub(r'\s*<meta property="og:image"[^>]*>', '', h)
h = h.replace('href="/favicon.png"', f'href="{data("/favicon.png", "image/png")}"')
h = h.replace('</body>', '<script type="module">\n' + js + '\n</script></body>')
open('dist/single.html', 'w').write(h)
print('dist/single.html', len(h) // 1024, 'KB')
