```
  _                _
 | |__   __ _  ___| | _____ _ __   _______  _ __   ___
 | '_ \ / _` |/ __| |/ / _ \ '__| |_  / _ \| '_ \ / _ \
 | | | | (_| | (__|   <  __/ |     / / (_) | | | |  __/
 |_| |_|\__,_|\___|_|\_\___|_|    /___\___/|_| |_|\___|
```

# John Lauron

> `root@localhost:~# Software Engineer building AI and resilient systems`

A terminal/matrix-inspired personal website built with [Jekyll](https://jekyllrb.com/) on the [Beautiful Jekyll](https://beautifuljekyll.com/) theme. Live at [johnlauron.me](https://johnlauron.me).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (`whoami`, CTAs, featured projects) |
| `/blog` | Blog post feed |
| `/projects` | Project cards + case-study pages |
| `/resume` | HTML resume + PDF download |
| `/aboutme` | Terminal-styled about page |
| `/archive` | Curated bookmarks (tools, websites, reading) |
| `/contact` | Email + social links |
| `/tags` | Post tag index |
| `/404` | ASCII art error page |

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Jekyll 4.x |
| Base Theme | Beautiful Jekyll 6.0.1 |
| Styling | Custom CSS (`assets/css/hacker-theme.css`) |
| Fonts | Fira Code, JetBrains Mono, Share Tech Mono |
| Icons | Font Awesome 6.5 |
| Layout | Bootstrap 4.4.1 |

## Visual effects

- Matrix rain background (toggleable, persists via `localStorage`)
- CRT scanlines overlay
- Terminal typing effect on page subtitles
- Scroll-reveal fade-ins
- Glowing headings and custom scrollbars

Effects respect `prefers-reduced-motion`, and the matrix rain can be toggled from the homepage button.

## How to edit

Everything is plain Markdown/YAML — edit on GitHub (pencil ✏️ on any file → "Commit changes") or locally, then push. CI rebuilds and deploys automatically.

### Add a blog post

Create a file in `_posts/` named `YYYY-MM-DD-slug.md`:

```yaml
---
layout: post
title: My new post
subtitle: "optional subtitle"
tags: [ai, projects]
comments: true
author: John Lauron
---

Write the post body in Markdown.
```

It automatically appears on `/blog` and in search.

### Add an archive link

Open `archive.md` and add a bullet under the right section:

```markdown
- [Some site](https://example.com) — one-line note.
```

### Add a project

1. Create `projects/my-project.md` (copy the front matter from an existing case study).
2. Add a card to `projects.md`.
3. Add a link in `index.html` under `featured_projects`.

### Add/edit a page

Every page is a Markdown file at the repo root (`aboutme.md`, `resume.md`, `contact.md`, `archive.md`). Edit the Markdown directly.

### Change navigation

Edit the `navbar-links:` block in `_config.yml`.

### Colors & site settings

Edit `_config.yml` (color palette, social links, SEO description, etc.).

## Project structure

```
.
├── _config.yml           # Site configuration
├── _layouts/             # Page templates (blog, page, home, post, ...)
├── _includes/            # Reusable components (nav, head, footer, ...)
├── _posts/               # Blog posts
├── projects/             # Project case-study pages
├── assets/
│   ├── css/hacker-theme.css   # Custom theme styles
│   ├── js/matrix-rain.js      # Matrix rain + typing + scroll reveal
│   └── files/                 # Resume PDF and other downloads
├── index.html            # Landing page
├── blog.md               # Blog index
├── projects.md           # Project index
├── resume.md             # HTML resume
├── aboutme.md            # About page
├── archive.md            # Bookmarks page
├── contact.md            # Contact page
├── 404.html              # Custom error page
└── tags.html             # Tag index
```

## Local development

```bash
git clone https://github.com/lauronjohn/lauronjohn.github.io.git
cd lauronjohn.github.io
bundle install
bundle exec jekyll serve
# http://localhost:4000
```

## Credits

- Base template: [Beautiful Jekyll](https://beautifuljekyll.com/) by Dean Attali
- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: [Font Awesome](https://fontawesome.com/)

## License

MIT License.
