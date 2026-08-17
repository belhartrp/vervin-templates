
/* =========================================================
   PORTFOLIO ENHANCEMENT PACK
   Three.js particle hero background, custom cursor,
   magnetic buttons, tilt cards, tech marquee, preloader
   ========================================================= */

/* ---------- 1. PRELOADER ---------- */
window.addEventListener('DOMContentLoaded', () => {
  const pre = document.getElementById('preloader');
  if (pre) {
    gsap.to(pre, {
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      onComplete: () => pre.remove()
    });
  }
});

/* ---------- 2. THREE.JS HERO PARTICLE BACKGROUND ---------- */
(function initHeroThree() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  const particleCount = 260;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0x4195d1,
    size: 1.6,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  // subtle connecting lines
  const lineMat = new THREE.LineBasicMaterial({ color: 0x4195d1, transparent: true, opacity: 0.08 });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(positions.slice(0, 60), 3));
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lines);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5);
    mouseY = (e.clientY / window.innerHeight - 0.5);
  });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  window.addEventListener('resize', resize);

  function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.0009;
    points.rotation.x += 0.0003;
    camera.position.x += (mouseX * 8 - camera.position.x) * 0.03;
    camera.position.y += (-mouseY * 8 - camera.position.y) * 0.03;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();
})();

/* ---------- 3. CUSTOM CURSOR ---------- */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  window.addEventListener('mousemove', (e) => {
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05 });
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power3.out' });
  });

  document.querySelectorAll('a, button, .proj-card, .ach-card').forEach(el => {
    el.addEventListener('mouseenter', () => gsap.to(ring, { scale: 1.8, duration: 0.25 }));
    el.addEventListener('mouseleave', () => gsap.to(ring, { scale: 1, duration: 0.25 }));
  });
})();

/* ---------- 4. MAGNETIC BUTTONS (nav CTA, proj-btn, footer-link) ---------- */
document.querySelectorAll('.btn-cta, .proj-btn, .footer-link, .qualificationBtn, .achievementBtn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) * 0.25;
    const dy = (e.clientY - r.top - r.height / 2) * 0.25;
    gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
  });
});

/* ---------- 5. 3D TILT ON PROJECT / ACHIEVEMENT CARDS ---------- */
document.querySelectorAll('.proj-card, .ach-card').forEach(card => {
  card.style.transformStyle = 'preserve-3d';
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotateY: px * 10,
      rotateX: -py * 10,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 700
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power3.out' });
  });
});

/* ---------- 6. GSAP SPLIT-TEXT STYLE HEADLINE REVEAL ---------- */
(function splitReveal() {
  const el = document.querySelector('.header-text');
  if (!el) return;
  const text = el.textContent;
  el.innerHTML = text.split('').map(ch => `<span class="char">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
  gsap.from(el.querySelectorAll('.char'), {
    opacity: 0,
    y: 24,
    rotateX: -60,
    duration: 0.6,
    stagger: 0.025,
    ease: 'back.out(1.6)',
    delay: 0.15
  });
})();

/* ---------- 7. TECH STACK MARQUEE (infinite scroll) ---------- */
(function initMarquee() {
  const track = document.querySelector('.tech-track');
  if (!track) return;
  track.innerHTML += track.innerHTML; // duplicate for seamless loop
  gsap.to(track, {
    xPercent: -50,
    repeat: -1,
    duration: 18,
    ease: 'none'
  });
})();

/* ---------- 8. SCROLL PROGRESS BAR ---------- */
(function scrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });
})();

/* ---------- 9. AOS REFRESH ON PAGINATION / RESIZE ---------- */
window.addEventListener('resize', () => { if (window.AOS) AOS.refresh(); });
