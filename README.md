# ulearn-status

Static error pages served by the reverse proxy when the uLearn app is unreachable.

## Pages

### `502.html`

Shown when the upstream app server returns a 502 (Bad Gateway) — typically during a deploy or a brief outage. The page is intentionally neutral: it doesn't alarm users or make promises about timing, just lets them know something routine is happening and gives them a refresh button.

Content:

- **Title** — "We'll be right back"
- **What's happening** card — frames it as a routine update or fix, not an incident
- **While you wait** card — reassures users their data is safe and no action is needed
- **Footer** — Refresh Page button, email and Twitter support links

Styles live in `assets/502.css`, translations in `assets/502-i18n.js`. Light/dark mode is handled via `html.dark` (set from `localStorage` with `prefers-color-scheme` as fallback). Supports `en`, `es`, `fr`, `it`.

### `503.html`

Shown during scheduled maintenance — when the app is intentionally taken offline. Mirrors the maintenance page from the web server.

Content:

- **Title** — "We're Under Maintenance"
- **Scheduled Maintenance** card — describes what's happening and estimated downtime
- **What we're working on** card — lists improvements being made
- **Footer** — Refresh Page button, Return to Home (links to `/:lang/home`), email and Twitter support links

Styles live in `assets/503.css`, translations in `assets/503-i18n.js`. Same light/dark and i18n behaviour as `502.html`. Supports `en`, `es`, `fr`, `it`.

## Commands

| Command               | Description                                         |
| --------------------- | --------------------------------------------------- |
| `make serve`          | Serve static pages locally at http://localhost:3001 |
| `make setup-i18n-dev` | Create lang subdirs with symlinks for i18n testing  |
| `make clean-i18n-dev` | Remove lang subdirs                                 |
| `make help`           | List available commands                             |

### Testing i18n locally

```bash
make setup-i18n-dev
make serve
```

Then open e.g. `http://localhost:3001/es/502.html` or `http://localhost:3001/es/503.html` to test a specific language.

## Deployment

Configure your reverse proxy to serve the pages for the appropriate error codes. Example for nginx:

```nginx
error_page 502 /502.html;
location = /502.html {
    root /path/to/ulearn-services/status;
    internal;
}

error_page 503 /503.html;
location = /503.html {
    root /path/to/ulearn-services/status;
    internal;
}

location /assets/ {
    root /path/to/ulearn-services/status;
}
```
