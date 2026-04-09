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

Styles live in `assets/style.css`. Light/dark mode is handled via `html.dark` (set automatically from `prefers-color-scheme`).

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

Then open e.g. `http://localhost:3001/es/502.html` to test a specific language.

## Deployment

Configure your reverse proxy to serve `502.html` for 502 errors. Example for nginx:

```nginx
error_page 502 /502.html;
location = /502.html {
    root /path/to/ulearn-services/status;
    internal;
}
location /assets/ {
    root /path/to/ulearn-services/status;
}
```
