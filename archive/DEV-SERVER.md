# Local dev server (start & stop)

## One-time setup

From the project root:

```bash
cd /path/to/banashri.github.io
npm install
```

## Start the server

```bash
npm run dev
```

(Equivalent: `npm start` — it runs the same `astro dev` command.)

When it is ready, open **http://localhost:4321/** in your browser. The terminal will show the exact URL if the port differs.

Leave that terminal window open while you work; file changes under `src/` reload automatically.

## Stop the server

In the same terminal where `npm run dev` is running:

- Press **Ctrl+C** (macOS/Linux/Windows).

If the terminal is closed or the process is stuck, the server stops when that process exits. To free port `4321` if something else is using it, quit the old process or pick another port:

```bash
npx astro dev --port 4322
```

## Preview the production build (optional)

This serves the static output like GitHub Pages, not the live dev server:

```bash
npm run build
npm run preview
```

Stop it the same way: **Ctrl+C**.
