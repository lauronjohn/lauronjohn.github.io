```
 _                _
| |__   __ _  ___| | _____ _ __   _______  _ __   ___
| '_ \ / _` |/ __| |/ / _ \ '__| |_  / _ \| '_ \ / _ \
| | | | (_| | (__|   <  __/ |     / / (_) | | | |  __/
|_| |_|\__,_|\___|_|\_\___|_|    /___\___/|_| |_|\___|

```

# ~/hacker_zone

> `root@localhost:~# A terminal-inspired personal website`

A custom hacker/matrix-themed Jekyll website featuring glowing neon aesthetics, terminal-style typography, and interactive visual effects.

## Features

```yaml
theme:
  style: "Hacker / Matrix / Cyberpunk"
  colors:
    primary: "#00ff41"      # Matrix green
    secondary: "#00d4ff"    # Cyber cyan
    accent: "#ff0055"       # Neon pink
    background: "#0a0a0a"   # Dark terminal
```

### Visual Effects

- **Matrix Rain Animation** - Falling green characters canvas background
- **CRT Scanlines** - Retro monitor overlay effect
- **Screen Flicker** - Subtle animation for authentic terminal feel
- **Glowing Text** - Neon glow on headings with pulse animation
- **Custom Scrollbars** - Themed scrollbars matching the color scheme

### Typography

- **Monospace Fonts** - Fira Code, JetBrains Mono, Share Tech Mono
- **Terminal Prefixes** - `>` symbols and `$` prompts throughout
- **Code-Style Navigation** - `./about`, `./resources` link formatting

### Syntax Highlighting

Custom dark theme for code blocks featuring:
- Keywords in cyan
- Strings in neon pink
- Numbers in gold
- Comments in dim green
- Functions in bright teal

## Tech Stack

```bash
$ cat /etc/stack.conf
```

| Component | Technology |
|-----------|------------|
| Framework | Jekyll 6.0.1+ |
| Base Theme | Beautiful Jekyll |
| Styling | Custom CSS + CSS Variables |
| Fonts | Google Fonts (Fira Code, JetBrains Mono) |
| Icons | Font Awesome 6.5 |
| Layout | Bootstrap 4.4.1 |

## Project Structure

```
~/hacker_zone/
├── _config.yml           # Site configuration
├── _layouts/             # Page templates
├── _includes/            # Reusable components
├── _posts/               # Blog posts
├── assets/
│   ├── css/
│   │   ├── hacker-theme.css       # Custom theme styles
│   │   ├── beautifuljekyll.css    # Base styles
│   │   └── pygment_highlights.css # Syntax highlighting
│   └── js/
│       └── matrix-rain.js         # Background animation
├── index.html            # Homepage
├── aboutme.md            # About page
├── 404.html              # Custom error page
└── tags.html             # Tag index
```

## Local Development

```bash
# Clone the repository
$ git clone https://github.com/yourusername/yourusername.github.io.git
$ cd yourusername.github.io

# Install dependencies
$ bundle install

# Start local server
$ bundle exec jekyll serve

# Access at http://localhost:4000
```

## Customization

### Color Scheme

Edit `_config.yml` to modify the color palette:

```yaml
# Hacker Theme Color Scheme
page-col: "#0a0a0a"
text-col: "#00ff41"
link-col: "#00d4ff"
hover-col: "#ff0055"
navbar-col: "#0d0d0d"
navbar-text-col: "#00ff41"
footer-col: "#0d0d0d"
footer-text-col: "#00ff41"
```

### Adding Blog Posts

Create new posts in `_posts/` using the format `YYYY-MM-DD-title.md`:

```yaml
---
layout: post
title: "Your Post Title"
subtitle: "A brief description"
tags: [security, code, tutorial]
---

Your content here...
```

### Disabling Effects

To disable visual effects, comment out in `_config.yml`:

```yaml
# site-js:
#   - "/assets/js/matrix-rain.js"
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with blog post feed |
| `/aboutme` | Terminal-styled about page |
| `/tags` | Post tag index |
| `/404` | ASCII art error page |

## Browser Support

Tested and optimized for:
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Credits

- Base template: [Beautiful Jekyll](https://beautifuljekyll.com/) by Dean Attali
- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: [Font Awesome](https://fontawesome.com/)

## License

This project is open source under the MIT License.

---

```bash
$ echo "Happy hacking!"
Happy hacking!
$ _
```
