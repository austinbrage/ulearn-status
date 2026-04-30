# ulearn-status

Static pages served by the reverse proxy when the uLearn app is unreachable or intentionally offline.

## Pages

### `downtime.html`

Shown when the upstream app server is temporarily unavailable — typically during a deploy or a brief outage. The page is intentionally neutral: it doesn't alarm users or make promises about timing, just lets them know something routine is happening and gives them a refresh button.

Content:

- **Title** — "We'll be right back"
- **What's happening** card — frames it as a routine update or fix, not an incident
- **While you wait** card — reassures users their data is safe and no action is needed
- **Footer** — Refresh Page button, email and Twitter support links

Styles live in `assets/css/downtime.css`, translations in `assets/js/downtime-i18n.js`. Light/dark mode is handled via `html.dark` (set from `localStorage` with `prefers-color-scheme` as fallback). Supports `en`, `es`, `fr`, `it`.

### `maintenance.html`

Shown during scheduled maintenance — when the app is intentionally taken offline. Mirrors the maintenance page from the web server.

Content:

- **Title** — "We're Under Maintenance"
- **Scheduled Maintenance** card — describes what's happening and estimated downtime
- **What we're working on** card — lists improvements being made
- **Footer** — Refresh Page button, Return to Home (links to `/:lang/home`), email and Twitter support links

Styles live in `assets/css/maintenance.css`, translations in `assets/js/maintenance-i18n.js`. Same light/dark and i18n behaviour as `downtime.html`. Supports `en`, `es`, `fr`, `it`.

### `home.html` / `pricing.html`

Landing pages served while the web server is paused (or always, via direct nginx routes). Fully self-contained: no auth states, no API calls, all CTAs link to `/user/signup` or `/user/signin`.

Styles and translations follow the same pattern: `assets/css/home.css`, `assets/js/home-i18n.js`, `assets/css/pricing.css`, `assets/js/pricing-i18n.js`. Supports `en`, `es`, `fr`, `it`.

### `privacy.html`

Privacy Policy page. Purely static content — no Alpine, no interactive components. Uses a minimal nav (logo + back-to-home link) matching the web app's legal layout.

Styles live in `assets/css/privacy.css`, translations in `assets/js/privacy-i18n.js`. Supports `en`, `es`, `fr`, `it`.

### `terms.html`

Terms of Service page. Same structure as the privacy page — purely static, minimal nav. Section 4 includes an inline link to the pricing page.

Styles live in `assets/css/terms.css`, translations in `assets/js/terms-i18n.js`. Supports `en`, `es`, `fr`, `it`.

### `contact.html`

Contact page. Purely static — two cards (email and Twitter/X) with links, minimal nav matching the legal layout.

Styles live in `assets/css/contact.css`, translations in `assets/js/contact-i18n.js`. Supports `en`, `es`, `fr`, `it`.

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

Then open e.g. `http://localhost:3001/es/downtime.html`, `http://localhost:3001/es/home.html`, `http://localhost:3001/es/pricing.html`, `http://localhost:3001/es/privacy.html`, `http://localhost:3001/es/terms.html`, or `http://localhost:3001/es/contact.html` to test a specific language.

## Deployment

Configure your reverse proxy to serve the appropriate page for each error code and route. The nginx snippet below goes inside the `server {}` block, alongside your existing `location /` proxy block.

```nginx
# 502 Bad Gateway — served when the ECS task is down or redeploying.
# Dispatches to home.html, pricing.html, privacy.html, or terms.html when the
# original request was for those routes; falls back to downtime.html for everything else.
# $request_uri preserves the original URI during the internal error redirect.
error_page 502 @on_502;

location @on_502 {
    root /var/www/ulearn-status;
    set $page downtime.html;
    if ($request_uri ~* "^(/[a-z]{2})?/home$") {
        set $page home.html;
    }
    if ($request_uri ~* "^(/[a-z]{2})?(/home)?/pricing$") {
        set $page pricing.html;
    }
    if ($request_uri ~* "^(/[a-z]{2})?/legal/privacy-policy$") {
        set $page privacy.html;
    }
    if ($request_uri ~* "^(/[a-z]{2})?/legal/terms-of-service$") {
        set $page terms.html;
    }
    if ($request_uri ~* "^(/[a-z]{2})?/home/contact$") {
        set $page contact.html;
    }
    try_files /$page;
}

# 503 Service Unavailable — served during planned maintenance (flag file toggle).
error_page 503 /maintenance.html;
location = /maintenance.html {
    root /var/www/ulearn-status;
    internal;
}

# Static assets shared by all status and landing pages.
location /assets/ {
    root /var/www/ulearn-status;
}
```
