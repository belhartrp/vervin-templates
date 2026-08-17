
# Cara Integrasi Enhancement Pack ke Portfolio

## 1. Tambahkan library baru di <head> (sebelum penutup </head>, setelah GSAP/AOS yang sudah ada)

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/128/three.min.js"></script>
<link rel="stylesheet" href="enhancements.css">

## 2. Tambahkan elemen berikut PERSIS SETELAH tag <body>

<div id="preloader"><div class="loader-ring"></div></div>
<div id="scrollProgress"></div>
<div id="cursorDot"></div>
<div id="cursorRing"></div>

## 3. Di section hero (.header-all), tambahkan canvas Three.js SEBELUM .dip-header-text

<canvas id="heroCanvas"></canvas>

Pastikan parent .header-all punya `position: relative` (sudah ditambahkan otomatis lewat enhancements.css).

## 4. Tambahkan marquee tech stack SETELAH .sec-text (subtitle section), sebelum .about

<div class="tech-marquee">
  <div class="tech-track">
    <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Python</span>
    <span>PHP</span><span>React</span><span>Node.js</span><span>TensorFlow</span>
    <span>GSAP</span><span>Three.js</span><span>Figma</span><span>Git</span>
  </div>
</div>

## 5. Load enhancements.js SETELAH script-2.js (paling akhir sebelum </body>)

<script src="enhancements.js"></script>

## Catatan
- File enhancements.js BERGANTUNG pada gsap, ScrollTrigger, dan AOS yang sudah kamu load — jangan hapus CDN GSAP/AOS yang lama.
- Efek tilt 3D & magnetic button otomatis berlaku ke .proj-card, .ach-card, .btn-cta, .proj-btn, .footer-link, tombol qualification/achievement.
- Custom cursor otomatis nonaktif di perangkat sentuh (mobile/tablet).
- Particle background Three.js ringan (~260 titik) supaya tetap smooth di laptop biasa; bisa dikurangi lewat variable particleCount di enhancements.js kalau FPS drop di device low-end.
