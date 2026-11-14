import { render } from 'preact';

// M0 placeholder. The playable desk arrives in M1.
function App() {
  return (
    <main style="font-family: system-ui, sans-serif; max-width: 26rem; margin: 3rem auto; padding: 0 1rem">
      <h1>Mayor of Bad Town</h1>
      <p>Engine and balance simulator are in place. The game screen is built in milestone 1.</p>
    </main>
  );
}

render(<App />, document.getElementById('app')!);
