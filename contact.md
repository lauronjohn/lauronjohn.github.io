---
layout: page
title: ./contact
subtitle: "ping -c 1 me"
---

The fastest way to reach me is email — I check it regularly.

<div class="home-cta-group reveal">
  <a class="home-cta-btn" href="mailto:john.lauron02@gmail.com">john.lauron02@gmail.com</a>
  <button class="home-cta-btn home-cta-btn-secondary" type="button" data-copy-email="john.lauron02@gmail.com">Copy Email</button>
  <a class="home-cta-btn home-cta-btn-secondary" href="https://github.com/lauronjohn">GitHub</a>
  <a class="home-cta-btn home-cta-btn-secondary" href="https://www.linkedin.com/in/john-lauron">LinkedIn</a>
</div>

## What I'm up for

- **Collaborations** on AI, computer vision, or robotics projects
- **Open source** contributions and side projects
- **Internships / roles** in software engineering and applied AI

## Response time

I typically reply within 1–2 days. If it's urgent, mark the subject line with `[URGENT]`.

```
$ ssh root@localhost
> Connection established. Awaiting your message...
```

<p class="copy-toast" data-copy-toast style="display:none;">Copied to clipboard.</p>

<script>
(function() {
  var buttons = document.querySelectorAll('[data-copy-email]');
  var toast = document.querySelector('[data-copy-toast]');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      var email = this.getAttribute('data-copy-email');
      var done = function() {
        this.textContent = 'Copied!';
        if (toast) { toast.style.display = 'block'; }
        var self = this;
        setTimeout(function() {
          self.textContent = 'Copy Email';
          if (toast) { toast.style.display = 'none'; }
        }, 2000);
      }.bind(this);

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }
})();
</script>
