# Flask Web Template

A lightweight Flask starter for a **responsive one-page website** with a sticky header, smooth anchor navigation, mobile-friendly menu, and a contact form with server-side validation.

Use it as a starting point for portfolios, landing pages, or small marketing sites.

---

## Features

- **One-page layout** — Home, About, Events, and Contact sections linked from the header
- **Sticky header** — Stays visible while scrolling; darkens after scroll for contrast
- **Full-viewport sections** — Each anchor section fills the screen (`100vh` / `100dvh`)
- **Mobile navigation** — Hamburger menu with accessible toggle states
- **Contact form** — Name, email, optional subject, and message with validation and flash feedback
- **No jQuery** — Navigation and scroll behavior use vanilla JavaScript
- **Bootstrap + custom CSS** — Grid/utilities from Bootstrap; layout and branding in `style.css`
- **Docker-ready** — Gunicorn image included for containerized runs

---

## Tech stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Backend      | Python 3, Flask 2.2                 |
| Templates    | Jinja2                              |
| Frontend CSS | Bootstrap, Normalize.css, custom CSS |
| Icons        | Font Awesome (local + Flask-FontAwesome) |
| Production   | Gunicorn                            |

---

## Project structure

```
flask_web_template/
├── __init__.py          # Flask app factory, config, blueprint registration
├── main.py              # Routes and contact form handling
├── config.py            # App configuration (SECRET_KEY, mail placeholders)
├── requirements.txt     # Python dependencies
├── run_development.sh   # Local dev server script
├── Dockerfile           # Container build for production-style runs
├── templates/
│   ├── base.html        # Layout, header, nav, asset includes
│   └── index.html       # One-page sections and contact form
└── static/
    ├── css/
    │   ├── style.css    # Main styles (sticky nav, sections, form)
    │   ├── bootstrap.css
    │   └── ...
    └── js/
        └── nav.js       # Mobile menu, scroll state, search toggle
```

---

## Prerequisites

- **Python 3.9+** (3.9 matches the Docker image; newer versions usually work for local dev)
- **pip** and **venv**
- Optional: **Docker** for containerized deployment

---

## Quick start (local development)

### 1. Clone and enter the project

```bash
git clone git@github.com:aaalber/flask_web_template.git
cd flask_web_template
```

### 2. Create a virtual environment

```bash
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the development server

**Option A — helper script (recommended)**

```bash
chmod +x run_development.sh
./run_development.sh
```

**Option B — Flask CLI**

```bash
export FLASK_APP=__init__:app
export FLASK_DEBUG=1
flask run -h 0.0.0.0 -p 5001 --reload
```

Open [http://127.0.0.1:5001](http://127.0.0.1:5001) in your browser.

The dev server runs with **auto-reload** so changes to templates and Python files are picked up automatically. If something still looks outdated, hard-refresh the browser (Cmd+Shift+R / Ctrl+Shift+R).

---

## Docker

Build and run the app with Gunicorn on port **8000**:

```bash
docker build -t flask_web_template .
docker run --rm -p 8000:8000 flask_web_template
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000).

Rebuild the image after changing templates or static files — the Dockerfile copies the project at build time.

---

## Configuration

Settings live in `config.py` and can be overridden with environment variables.

| Variable      | Description                                      | Default (dev)                    |
| ------------- | ------------------------------------------------ | -------------------------------- |
| `SECRET_KEY`  | Signing key for sessions and flash messages      | `dev-secret-change-in-production` |
| `MAIL_SERVER` | Placeholder for future email integration         | `localhost:25`                   |

**Production:** always set a strong `SECRET_KEY`:

```bash
export SECRET_KEY="your-long-random-secret"
```

---

## Contact form

The form on the **Contact** section (`#contact`) posts to `/` with these fields:

| Field   | Required | Notes                          |
| ------- | -------- | ------------------------------ |
| Name    | Yes      | Max 100 characters             |
| Email   | Yes      | Basic format validation        |
| Subject | No       | Max 150 characters             |
| Message | Yes      | Max 2000 characters            |

**Current behavior**

- Valid submissions show a success flash message and redirect to `/#contact`
- Invalid submissions re-render the page with error messages and preserved input
- Submissions are **not emailed** yet — this is a template hook for you to add Flask-Mail, SendGrid, etc.

To wire up email, extend the success branch in `main.py` and configure your mail provider in `config.py`.

---

## Customization

### Content and sections

Edit `templates/index.html`:

- Update copy in each `<section>`
- Change section IDs (`#home`, `#about`, `#events`, `#contact`) and matching nav links in `templates/base.html`

### Branding and layout

Edit `static/css/style.css`:

- Colors (accent: `#ffc107`), fonts, section backgrounds
- Header scroll styles (`.site-header.is-scrolled`)
- Form and button appearance

Replace **LOGO** in `templates/base.html` with your site name or an `<img>` tag.

### Navigation behavior

Edit `static/js/nav.js` for menu toggling, scroll styling, or desktop search toggle.

### Add new routes

Register additional blueprints in `__init__.py` or add routes to `main.py` following the existing pattern.

---

## Troubleshooting

| Problem | What to try |
| ------- | ----------- |
| Contact form missing | Restart the dev server; hard-refresh the browser. An old process may still be serving a previous template. |
| Changes not appearing | Confirm `--reload` is on; restart Flask; clear browser cache. |
| Docker shows old UI | Rebuild: `docker build -t flask_web_template .` |
| `Could not locate a Flask application` | Set `FLASK_APP=__init__:app` (not `__init__.py` alone). |
| Flash messages not showing | Ensure `SECRET_KEY` is set and cookies are enabled. |

---

## Production notes

- Do **not** use Flask’s built-in development server in production — use Gunicorn (as in the Dockerfile) or another WSGI server.
- Set `SECRET_KEY` and disable `FLASK_DEBUG` in production.
- Serve static files via your reverse proxy (nginx, Caddy) or a CDN for better performance.
- Add HTTPS, rate limiting, and CSRF protection before exposing the contact form publicly.

---

## License

This project is provided as a template. Add your own license file if you distribute or publish a derivative.
