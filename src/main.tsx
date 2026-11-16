import { Component, render } from 'preact';
import { App } from './ui/App.tsx';
import './ui/styles.css';

/** If anything throws while drawing (most likely a save from an older build), drop the saved run
 *  (keeping the scrapbook and settings) and start fresh rather than showing a blank page. */
class Guard extends Component<object, { failed: boolean }> {
  override state = { failed: false };
  override componentDidCatch(err: unknown) {
    console.error(err);
    try {
      const k = 'badtown.save';
      const raw = localStorage.getItem(k);
      if (raw) { const sv = JSON.parse(raw); sv.state = null; localStorage.setItem(k, JSON.stringify(sv)); }
    } catch { /* storage unavailable */ }
    this.setState({ failed: true });
  }
  render() {
    if (this.state.failed) return (
      <div class="crash"><h2>Something tripped over a goose.</h2><p>Your run was reset; your scrapbook is safe.</p><button class="btn primary" onClick={() => location.reload()}>Start again</button></div>
    );
    return <App />;
  }
}

render(<Guard />, document.getElementById('app')!);
