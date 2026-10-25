/**
 * Home-page shell. Static HTML already shows whoami / what_i_do / ls projects.
 * Commands reprint those blocks or navigate. No content is hidden behind the prompt.
 */
(function () {
  'use strict';

  var root = document.getElementById('shell');
  if (!root) return;

  var live = document.getElementById('shell-live');
  var form = document.getElementById('shell-form');
  var input = document.getElementById('shell-input');
  var screen = document.getElementById('shell-screen');
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var history = [];
  var historyIndex = 0;
  var historyDraft = '';

  var PAGES = {
    about: '/aboutme',
    aboutme: '/aboutme',
    whoami: '/aboutme',
    projects: '/projects',
    project: '/projects',
    work: '/projects',
    contact: '/contact',
    email: '/contact',
    resume: '/resume',
    cv: '/resume',
    blog: '/blog',
    posts: '/blog',
    archive: '/archive',
    bookmarks: '/archive',
    tags: '/tags',
    home: '/',
    '~': '/',
    'construction-progress': '/projects/construction-progress',
    'safety-monitoring': '/projects/safety-monitoring',
    'voice-uml': '/projects/voice-uml',
    'face-attendance': '/projects/face-attendance'
  };

  var EXTERNAL = {
    lauronflow: 'https://lauronflow.app',
    'lauronflow.app': 'https://lauronflow.app'
  };

  var COMMANDS = [
    'help', 'whoami', 'what_i_do', 'ls', 'cat', 'open', 'cd',
    'resume', 'contact', 'projects', 'blog', 'archive',
    'matrix', 'clear', 'pwd', 'echo', 'download', 'featured_projects'
  ];

  var CAT_FILES = {
    about: 'tpl-cat-about',
    aboutme: 'tpl-cat-about',
    'whoami.txt': 'tpl-cat-about',
    resume: 'tpl-cat-resume',
    'resume.md': 'tpl-cat-resume',
    'resume.pdf': 'tpl-cat-resume',
    'construction-progress': 'tpl-cat-construction',
    'safety-monitoring': 'tpl-cat-safety',
    'voice-uml': 'tpl-cat-voice',
    'face-attendance': 'tpl-cat-face',
    lauronflow: 'tpl-cat-lauronflow',
    'lauronflow.app': 'tpl-cat-lauronflow'
  };

  function baseUrl() {
    var base = document.body.getAttribute('data-baseurl') || '';
    if (base.charAt(base.length - 1) === '/') base = base.slice(0, -1);
    return base;
  }

  function abs(path) {
    if (!path) path = '/';
    if (path.charAt(0) !== '/') path = '/' + path;
    return baseUrl() + path;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function scrollToEnd() {
    var log = document.getElementById('shell-log');
    if (!log) return;
    log.scrollTop = log.scrollHeight;
  }

  function echo(raw) {
    var row = document.createElement('div');
    row.className = 'shell-entry shell-echo';
    row.innerHTML = '<span class="shell-ps"><span class="ps-user">root@johnlauron</span><span class="ps-path">:~</span><span class="ps-sig">$</span></span> ';
    var cmd = document.createElement('span');
    cmd.className = 'shell-cmd';
    cmd.textContent = raw;
    row.appendChild(cmd);
    live.appendChild(row);
  }

  function out(html) {
    var block = document.createElement('div');
    block.className = 'shell-entry shell-out';
    block.innerHTML = html;
    live.appendChild(block);
    scrollToEnd();
  }

  function textOut(className, text) {
    var block = document.createElement('div');
    block.className = 'shell-entry shell-out' + (className ? ' ' + className : '');
    block.textContent = text;
    live.appendChild(block);
    scrollToEnd();
  }

  function fromTemplate(id) {
    var tpl = document.getElementById(id);
    if (!tpl) return '<p class="shell-error">missing output</p>';
    return tpl.innerHTML;
  }

  function norm(args) {
    return String(args || '')
      .trim()
      .toLowerCase()
      .replace(/^\.\//, '')
      .replace(/^~\//, '')
      .replace(/\/$/, '');
  }

  function stripFlags(args) {
    return String(args || '')
      .split(/\s+/)
      .filter(function (part) { return part && part.charAt(0) !== '-'; })
      .join(' ');
  }

  function go(path, label) {
    out('<p class="shell-dim">opening ' + escapeHtml(label || path) + ' …</p>');
    window.setTimeout(function () {
      window.location.href = abs(path);
    }, prefersReduced ? 0 : 220);
  }

  function goExternal(url) {
    out('<p class="shell-dim">opening ' + escapeHtml(url) + ' …</p>');
    window.setTimeout(function () {
      window.location.href = url;
    }, prefersReduced ? 0 : 220);
  }

  function resolvePage(token) {
    var key = norm(token).replace(/\s+/g, ' ');
    if (Object.prototype.hasOwnProperty.call(EXTERNAL, key)) return { external: EXTERNAL[key] };
    if (Object.prototype.hasOwnProperty.call(PAGES, key)) return { path: PAGES[key] };
    return null;
  }

  function showCat(token) {
    var key = norm(token);
    if (CAT_FILES[key]) {
      out(fromTemplate(CAT_FILES[key]));
      return;
    }
    textOut('shell-error', 'cat: ' + (token || '') + ': No such file or directory');
    out('<p class="shell-dim">try <button type="button" class="inline-cmd" data-cmd="ls projects">ls projects</button></p>');
  }

  function clearShell() {
    var staticBlock = document.getElementById('shell-static');
    if (staticBlock) staticBlock.remove();
    live.innerHTML = '';
    out('<p class="shell-dim">cleared. type <button type="button" class="inline-cmd" data-cmd="help">help</button> or <button type="button" class="inline-cmd" data-cmd="whoami">whoami</button>.</p>');
  }

  function levenshtein(a, b) {
    if (Math.abs(a.length - b.length) > 3) return 9;
    var prev = [];
    var curr = [];
    var i;
    var j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      curr[0] = i;
      for (j = 1; j <= b.length; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
      }
      var swap = prev;
      prev = curr;
      curr = swap;
    }
    return prev[b.length];
  }

  function suggest(cmd) {
    var best = null;
    var score = 3;
    var i;
    for (i = 0; i < COMMANDS.length; i++) {
      var dist = levenshtein(cmd, COMMANDS[i]);
      if (dist < score) {
        score = dist;
        best = COMMANDS[i];
      }
    }
    if (!best) {
      for (i = 0; i < COMMANDS.length; i++) {
        if (COMMANDS[i].indexOf(cmd) === 0) return COMMANDS[i];
      }
    }
    return best;
  }

  function run(raw) {
    var line = String(raw || '').trim();
    if (!line) return;
    echo(line);
    if (history[history.length - 1] !== line) history.push(line);
    historyIndex = history.length;
    historyDraft = '';

    var parts = line.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var args = parts.slice(1).join(' ');

    if (cmd === 'll') {
      cmd = 'ls';
      args = ('-la ' + args).trim();
    }
    if (cmd === '?' || cmd === 'man') cmd = 'help';
    if (cmd === 'about') {
      cmd = 'open';
      args = args || 'about';
    }

    var target;
    var dest;

    switch (cmd) {
      case 'help':
        out(fromTemplate('tpl-help'));
        break;
      case 'whoami':
        out(fromTemplate('tpl-whoami'));
        break;
      case 'what_i_do':
      case 'what':
        out(fromTemplate('tpl-what'));
        break;
      case 'featured_projects':
        out(fromTemplate('tpl-projects'));
        break;
      case 'ls':
        target = norm(stripFlags(args));
        if (!target || target === '~' || target === '.' || target === 'home') {
          out(fromTemplate('tpl-ls'));
        } else if (target === 'projects' || target === 'work' || target === 'projects/') {
          out(fromTemplate('tpl-projects'));
        } else if (CAT_FILES[target]) {
          showCat(target);
        } else {
          textOut('shell-error', "ls: cannot access '" + args + "': No such file or directory");
        }
        break;
      case 'cat':
        if (!args.trim()) textOut('shell-error', 'cat: missing file operand');
        else showCat(args);
        break;
      case 'open':
      case 'cd':
        target = args.trim();
        if (!target || target === '~' || target === '..') {
          if (cmd === 'cd') go('/', 'home');
          else textOut('shell-error', 'open: missing page');
          break;
        }
        dest = resolvePage(target);
        if (!dest) {
          textOut('shell-error', cmd + ': ' + target + ': not found');
          out('<p class="shell-dim">pages: about, projects, contact, resume, blog, archive</p>');
        } else if (dest.external) {
          goExternal(dest.external);
        } else {
          go(dest.path, target);
        }
        break;
      case 'resume':
      case 'contact':
      case 'projects':
      case 'blog':
      case 'archive':
        dest = resolvePage(cmd);
        go(dest.path, cmd);
        break;
      case 'download':
        out(fromTemplate('tpl-cat-resume'));
        break;
      case 'matrix':
        var toggle = document.querySelector('[data-matrix-toggle]');
        if (toggle) toggle.click();
        else textOut('shell-dim', 'matrix control is unavailable.');
        break;
      case 'clear':
        clearShell();
        break;
      case 'pwd':
        textOut('shell-dim', '~/   johnlauron.me');
        break;
      case 'echo':
        textOut('', args);
        break;
      case 'sudo':
        textOut('shell-dim', 'already root. try a real command.');
        break;
      case 'rm':
      case 'rmdir':
        textOut('shell-error', 'permission denied. nothing was deleted.');
        break;
      case 'vim':
      case 'nvim':
      case 'nano':
      case 'emacs':
        textOut('shell-dim', 'this shell is read-only. open a page instead.');
        break;
      case 'exit':
      case 'quit':
        textOut('shell-dim', 'use the menu, or run open projects.');
        break;
      default:
        textOut('shell-error', 'zsh: command not found: ' + parts[0]);
        var guess = suggest(cmd);
        if (guess) {
          out('<p class="shell-dim">did you mean <button type="button" class="inline-cmd" data-cmd="' + guess + '">' + guess + '</button>?</p>');
        } else {
          out('<p class="shell-dim">type <button type="button" class="inline-cmd" data-cmd="help">help</button></p>');
        }
    }
  }

  function complete() {
    var value = input.value;
    if (!value) return;
    var parts = value.split(/\s+/);
    var last = parts[parts.length - 1].toLowerCase();
    var pool = [];
    if (parts.length <= 1) {
      pool = COMMANDS.concat(['what', 'll']);
    } else {
      var head = parts[0].toLowerCase();
      if (head === 'cat') {
        pool = ['about', 'resume', 'construction-progress', 'safety-monitoring', 'voice-uml', 'face-attendance', 'lauronflow'];
      } else if (head === 'open' || head === 'cd') {
        pool = ['about', 'projects', 'contact', 'resume', 'blog', 'archive', 'lauronflow', 'construction-progress', 'safety-monitoring', 'voice-uml', 'face-attendance'];
      } else if (head === 'ls') {
        pool = ['projects', 'about', 'resume'];
      }
    }
    var matches = pool.filter(function (item, index) {
      return item.indexOf(last) === 0 && pool.indexOf(item) === index;
    });
    if (matches.length === 1) {
      parts[parts.length - 1] = matches[0];
      input.value = parts.join(' ') + (parts.length === 1 ? ' ' : '');
    } else if (matches.length > 1) {
      out('<p class="shell-dim">' + matches.map(escapeHtml).join('   ') + '</p>');
    }
  }

  function focusInput() {
    if (window.matchMedia('(max-width: 700px)').matches) return;
    input.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = input.value;
    input.value = '';
    run(value);
  });

  input.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      if (historyIndex === history.length) historyDraft = input.value;
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex];
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!history.length || historyIndex >= history.length) return;
      historyIndex += 1;
      input.value = historyIndex >= history.length ? historyDraft : history[historyIndex];
    } else if (event.key === 'Tab') {
      event.preventDefault();
      complete();
    } else if (event.key === 'Escape') {
      input.value = '';
    } else if (event.key === 'u' && event.ctrlKey) {
      event.preventDefault();
      input.value = '';
    }
  });

  root.addEventListener('click', function (event) {
    var button = event.target.closest('[data-cmd]');
    if (!button || !root.contains(button)) return;
    if (button.hasAttribute('data-matrix-toggle')) return;
    event.preventDefault();
    run(button.getAttribute('data-cmd'));
    focusInput();
  });

  screen.addEventListener('click', function (event) {
    if (event.target.closest('a, button, input, label')) return;
    focusInput();
  });

  var boot = document.getElementById('shell-boot');
  if (boot && !prefersReduced) {
    var full = boot.textContent;
    boot.textContent = '';
    var index = 0;
    var timer = window.setInterval(function () {
      if (!boot.isConnected) {
        window.clearInterval(timer);
        return;
      }
      index += 1;
      boot.textContent = full.slice(0, index);
      if (index >= full.length) window.clearInterval(timer);
    }, 14);
  }
})();
