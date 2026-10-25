---
layout: page
title: Projects
kicker: "~/projects"
subtitle: "Computer vision, local AI, and tools I actually shipped."
---

Selected work from an internship, personal builds, and one macOS app. Case studies are short on purpose. Repositories and demos are still being cleaned up for public links.

<section class="project-grid">
  <article class="project-card">
    <p class="project-kicker">Internship</p>
    <h3><a href="{{ '/projects/construction-progress' | relative_url }}">Intelligent Construction Progress Tracking Pipeline</a></h3>
    <p>Computer-vision and multimodal pipeline that classifies site imagery and writes a progress narrative from field photos.</p>
    <ul class="stack-row">
      <li>YOLO</li>
      <li>Qwen2.5-VL</li>
      <li>LLM reporting</li>
    </ul>
    <p class="card-more"><a href="{{ '/projects/construction-progress' | relative_url }}">Read case study</a></p>
    <p class="project-pending">Repository and demo links are on the way.</p>
  </article>

  <article class="project-card">
    <p class="project-kicker">Internship</p>
    <h3><a href="{{ '/projects/safety-monitoring' | relative_url }}">Intelligent On-Site Safety Monitoring System</a></h3>
    <p>Detection workflow for safety violations in active construction environments: harness, smoking, crane, and fence.</p>
    <ul class="stack-row">
      <li>YOLO11m</li>
      <li>Multi-dataset detection</li>
    </ul>
    <p class="card-more"><a href="{{ '/projects/safety-monitoring' | relative_url }}">Read case study</a></p>
    <p class="project-pending">Repository and demo links are on the way.</p>
  </article>

  <article class="project-card">
    <p class="project-kicker">Personal</p>
    <h3><a href="{{ '/projects/voice-uml' | relative_url }}">Local AI Voice Agent / UML Generator</a></h3>
    <p>A locally hosted real-time voice agent, and a multi-agent system that turns software requirements into UML.</p>
    <ul class="stack-row">
      <li>On-device speech</li>
      <li>Multi-agent LLM</li>
    </ul>
    <p class="card-more"><a href="{{ '/projects/voice-uml' | relative_url }}">Read case study</a></p>
    <p class="project-pending">Repository and demo links are on the way.</p>
  </article>

  <article class="project-card">
    <p class="project-kicker">Personal</p>
    <h3><a href="{{ '/projects/face-attendance' | relative_url }}">Real-Time Face Attendance System</a></h3>
    <p>Face recognition from a camera feed that identifies enrolled people and logs attendance as it happens.</p>
    <ul class="stack-row">
      <li>Face detection</li>
      <li>Recognition</li>
      <li>Real-time video</li>
    </ul>
    <p class="card-more"><a href="{{ '/projects/face-attendance' | relative_url }}">Read case study</a></p>
    <p class="project-pending">Repository and demo links are on the way.</p>
  </article>

  <article class="project-card">
    <p class="project-kicker">Shipped · macOS</p>
    <h3><a href="https://lauronflow.app" rel="noopener noreferrer">LauronFlow</a></h3>
    <p>Menu-bar dictation. Hold Right Option, speak, release, and the words land wherever the cursor is. Speech-to-text runs on the Mac. Audio is not sent anywhere.</p>
    <ul class="stack-row">
      <li>Apple Silicon</li>
      <li>On-device ASR</li>
      <li>macOS 14+</li>
    </ul>
    <p class="card-more"><a href="https://lauronflow.app" rel="noopener noreferrer">Visit lauronflow.app</a></p>
  </article>
</section>
