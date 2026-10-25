---
layout: page
title: Contact
kicker: "~/contact"
subtitle: "Email is the fastest way to reach me."
---

<div class="contact-card">
  <p>Email</p>
  <p class="contact-email"><a href="mailto:john.lauron02@gmail.com">john.lauron02@gmail.com</a></p>
  <div class="home-cta-group">
    <a class="home-cta-btn" href="mailto:john.lauron02@gmail.com">Send email</a>
    <button class="home-cta-btn home-cta-btn-secondary" type="button" data-copy-email="john.lauron02@gmail.com">Copy email</button>
    <a class="home-cta-btn home-cta-btn-secondary" href="https://github.com/lauronjohn">GitHub</a>
    <a class="home-cta-btn home-cta-btn-secondary" href="https://www.linkedin.com/in/john-lauron">LinkedIn</a>
  </div>
  <p class="copy-toast" data-copy-toast style="display:none;">Copied to clipboard.</p>
</div>

## What I'm up for

- Collaborations on AI, computer vision, or robotics
- Open source and side projects
- Internships and roles in software engineering and applied AI

## Response time

I typically reply within a day or two. If it's time-sensitive, put `[URGENT]` in the subject.

<script>
(function() {
  var buttons = document.querySelectorAll('[data-copy-email]');
  var toast = document.querySelector('[data-copy-toast]');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
      var email = this.getAttribute('data-copy-email');
      var done = function() {
        this.textContent = 'Copied';
        if (toast) { toast.style.display = 'block'; }
        var self = this;
        setTimeout(function() {
          self.textContent = 'Copy email';
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
