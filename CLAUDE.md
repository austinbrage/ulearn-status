# CLAUDE.md - uLearn Status Pages

Static HTML pages served by nginx reverse proxy when the main web app is unreachable or intentionally offline. Plain HTML with CSS/JS - no server-side rendering.

**IMPORTANT:** If changes in this session alter the architecture or flows described here, update this CLAUDE.md accordingly.

## Development Commands

```bash
make serve            # Serve locally at http://localhost:3001
make setup-i18n-dev   # Create lang subdirs with symlinks for i18n testing
make clean-i18n-dev   # Remove lang subdirs
```

## Pages

| Page | Purpose | When Shown |
|------|---------|------------|
| `downtime.html` | Temporary unavailability | 502 Bad Gateway (deploy, brief outage) |
| `maintenance.html` | Scheduled maintenance | 503 Service Unavailable (flag toggle) |
| `home.html` | Landing page | When web server paused or direct nginx route |
| `pricing.html` | Pricing page | When web server paused or direct nginx route |
| `privacy.html` | Privacy Policy | Static legal page |
| `terms.html` | Terms of Service | Static legal page |
| `contact.html` | Contact page | Static support page |

## Architecture

**Stack:** Plain HTML + CSS + vanilla JS (no frameworks, no SSR)

**Replica of Web Public Routes:**
These pages mirror the public routes from the web service but are fully self-contained - no auth states, no API calls. All CTAs link to `/user/signup` or `/user/signin`.

**Served By:** nginx reverse proxy (not a running service)

**i18n Support:** `en`, `es`, `fr`, `it`
- Translations in `assets/js/{page}-i18n.js`
- Language subdirs (`/en/`, `/es/`, etc.) symlink to `html/` for URL routing

**Dark Mode:** Via `html.dark` class (localStorage with `prefers-color-scheme` fallback)

## Project Structure

```
html/                 # Source HTML files
├── downtime.html
├── maintenance.html
├── home.html
├── pricing.html
├── privacy.html
├── terms.html
└── contact.html

assets/
├── css/              # Per-page stylesheets
│   ├── downtime.css
│   ├── maintenance.css
│   ├── home.css
│   ├── pricing.css
│   ├── privacy.css
│   ├── terms.css
│   └── contact.css
└── js/               # Per-page i18n scripts
    ├── downtime-i18n.js
    ├── maintenance-i18n.js
    ├── home-i18n.js
    ├── pricing-i18n.js
    ├── privacy-i18n.js
    ├── terms-i18n.js
    └── contact-i18n.js

{en,es,fr,it}/        # Language subdirs (symlinks to html/ for i18n URL routing)
```

## Deployment

Pages are served by nginx, not a running service. Configure in nginx `server {}` block:

- `error_page 502 @on_502` → Routes to appropriate page based on `$request_uri`
- `error_page 503 /html/maintenance.html` → Maintenance mode
- `location /assets/` → Static assets

See README.md for full nginx configuration snippet.

## Testing i18n

```bash
make setup-i18n-dev
make serve
# Open http://localhost:3001/es/home.html
```
