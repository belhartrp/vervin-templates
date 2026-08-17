
      AOS.init({ once: false });

      // ── PAGINATION UTILITY ──
      function getItemsPerPage() {
        const w = window.innerWidth;
        if (w < 600) return 3;       // mobile: 3 vertikal
        if (w < 1024) return 4;      // tablet: 4 (2x2)
        return 3;                     // desktop: 3 horizontal
      }

      function initPagination(gridId, paginationId) {
        const grid = document.getElementById(gridId);
        const pagination = document.getElementById(paginationId);
        if (!grid || !pagination) return;

        const items = Array.from(grid.children);
        let current = 1;
        let ipp = getItemsPerPage();

        const total = () => Math.ceil(items.length / ipp);

        function render() {
          ipp = getItemsPerPage();
          if (current > total()) current = total();
          items.forEach((item, i) => {
            item.style.display = (i >= (current - 1) * ipp && i < current * ipp) ? '' : 'none';
          });
          renderPagination();
          // Animate newly visible cards
          if (typeof animateVisibleCards === 'function') {
            setTimeout(animateVisibleCards, 30);
          }
        }

        function renderPagination() {
          const t = total();
          pagination.innerHTML = '';

          const prev = document.createElement('button');
          prev.className = 'pg-btn pg-arrow' + (current === 1 ? ' pg-disabled' : '');
          prev.innerHTML = '← Prev';
          prev.disabled = current === 1;
          prev.onclick = () => { if (current > 1) { current--; render(); grid.closest('section').scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
          pagination.appendChild(prev);

          for (let i = 1; i <= t; i++) {
            const btn = document.createElement('button');
            btn.className = 'pg-btn' + (i === current ? ' pg-active' : '');
            btn.textContent = i;
            btn.onclick = () => { current = i; render(); grid.closest('section').scrollIntoView({ behavior: 'smooth', block: 'start' }); };
            pagination.appendChild(btn);
          }

          const next = document.createElement('button');
          next.className = 'pg-btn pg-arrow' + (current === t ? ' pg-disabled' : '');
          next.innerHTML = 'Next →';
          next.disabled = current === t;
          next.onclick = () => { if (current < t) { current++; render(); grid.closest('section').scrollIntoView({ behavior: 'smooth', block: 'start' }); } };
          pagination.appendChild(next);

          pagination.style.display = t <= 1 ? 'none' : 'flex';
        }

        render();

        // Re-render on resize (debounced)
        let resizeTimer;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => { render(); }, 150);
        });
      }

      initPagination('projectsGrid', 'projectsPagination');
      initPagination('achievementGrid', 'achievementPagination');

      // Qualification tabs
      document.querySelectorAll('.qtab-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          document.querySelectorAll('.qtab-btn').forEach(function(b) { b.classList.remove('active'); });
          document.querySelectorAll('.qtab-content').forEach(function(c) { c.classList.remove('active'); });
          btn.classList.add('active');
          document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
        });
      });


      gsap.registerPlugin(TextPlugin, ScrollTrigger, ScrollToPlugin);

      // ── Hero text typewriter ──
      gsap.to('.header-text-sec', {
        duration: 2,
        delay: 0.5,
        text: ' AI engineering, application development, and digital design',
        ease: 'none'
      });

      // ── Hero illustration float-in ──
      gsap.from('.storyset', {
        opacity: 0,
        x: 60,
        duration: 1.1,
        delay: 0.3,
        ease: 'power3.out'
      });

      // ── Hero text fade-in ──
      gsap.from('.dip-header-text', {
        opacity: 0,
        x: -50,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      });

      // ── Subtitle zoom-in ──
      gsap.from('.sec-text', {
        opacity: 0,
        y: 20,
        duration: 0.9,
        delay: 1.6,
        ease: 'power2.out'
      });


      // ── Scroll reveal: gsap-reveal elements ──
      gsap.utils.toArray('.gsap-reveal').forEach(el => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      });

      // ── Scroll reveal: scale (about card) ──
      gsap.utils.toArray('.gsap-reveal-scale').forEach(el => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.88,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // ── Scroll reveal: left/right ──
      gsap.utils.toArray('.gsap-reveal-left').forEach(el => {
        gsap.from(el, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      });
      gsap.utils.toArray('.gsap-reveal-right').forEach(el => {
        gsap.from(el, {
          opacity: 0,
          x: 40,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        });
      });

      // ── Animate visible cards (called after pagination render) ──
      function animateVisibleCards() {
        document.querySelectorAll('.gsap-card').forEach((card, i) => {
          if (card.style.display === 'none') return;
          gsap.fromTo(card,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: 'power2.out',
              delay: (i % 3) * 0.08,
              overwrite: 'auto'
            }
          );
        });
      }

      // Run on page load
      setTimeout(animateVisibleCards, 100);

      // ── Navbar active link on scroll ──
      const navSections = ['home', 'so', 'qualification', 'achievement', 'aboutweb'];
      const navLinks = document.querySelectorAll('.navbar li a');

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: () => {
          let current = '';
          navSections.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            if (window.scrollY >= el.offsetTop - 120) current = id;
          });
          navLinks.forEach(link => {
            link.classList.toggle('nav-active', link.getAttribute('href') === '#' + current);
          });
        }
      });

      // ── Smooth scroll for nav links ──
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (!target) return;
          e.preventDefault();
          gsap.to(window, {
            duration: 0.9,
            scrollTo: { y: target, offsetY: 72 },
            ease: 'power2.inOut'
          });
        });
      });

      // ── Parallax on hero illustration ──
      gsap.to('.storyset', {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.header-all',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });



      // ── QUALIFICATION TABS ──
      const qtabBtns = document.querySelectorAll('.qtab-btn');
      const qtabContents = document.querySelectorAll('.qtab-content');

      qtabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          qtabBtns.forEach(b => b.classList.remove('qtab-active'));
          qtabContents.forEach(c => c.classList.remove('qtab-show'));
          btn.classList.add('qtab-active');
          document.getElementById('qtab-' + btn.dataset.tab).classList.add('qtab-show');
        });
      });


      // ── QUALIFICATION TABS ──
      function switchQualTab(tab, btn) {
        const allPanels = document.querySelectorAll('.qual-panel');
        const allBtns   = document.querySelectorAll('.qual-tab-btn');
        const target    = document.getElementById('qual-' + tab);
        if (!target) return;

        // Animate out current visible panel
        const current = document.querySelector('.qual-panel:not(.qual-panel-hidden)');
        if (current && current !== target) {
          gsap.to(current, {
            opacity: 0,
            y: -12,
            duration: 0.22,
            ease: 'power2.in',
            onComplete: () => {
              current.classList.add('qual-panel-hidden');
              gsap.set(current, { opacity: 1, y: 0 });

              // Animate in new panel
              target.classList.remove('qual-panel-hidden');
              gsap.fromTo(target,
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }
              );
            }
          });
        } else {
          // First load / same panel
          target.classList.remove('qual-panel-hidden');
          gsap.fromTo(target,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' }
          );
        }

        // Button active state with scale bounce
        allBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gsap.fromTo(btn,
          { scale: 0.92 },
          { scale: 1, duration: 0.3, ease: 'back.out(2.5)' }
        );
      }

      
      // ── QUAL TAB BUTTON: Ripple + Magnetic hover ──
      document.querySelectorAll('.qual-tab-btn').forEach(btn => {
        // Ripple on click
        btn.addEventListener('click', function(e) {
          const rect = btn.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top  - size / 2;

          const ripple = document.createElement('span');
          ripple.className = 'qual-ripple';
          ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
          btn.appendChild(ripple);
          ripple.addEventListener('animationend', () => ripple.remove());
        });

        // Magnetic hover
        btn.addEventListener('mousemove', function(e) {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width  / 2;
          const cy = rect.top  + rect.height / 2;
          const dx = (e.clientX - cx) * 0.28;
          const dy = (e.clientY - cy) * 0.28;
          gsap.to(btn, { x: dx, y: dy, duration: 0.25, ease: 'power2.out' });
        });

        btn.addEventListener('mouseleave', function() {
          gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        });
      });

      const hamburgerBtn = document.getElementById('hamburgerBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      const mobileLinks = mobileMenu.querySelectorAll('a');

      function toggleMenu() {
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
          mobileMenu.classList.remove('open');
          hamburgerBtn.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('menu-open');
        } else {
          mobileMenu.classList.add('open');
          hamburgerBtn.classList.add('open');
          hamburgerBtn.setAttribute('aria-expanded', 'true');
          document.body.classList.add('menu-open');
        }
      }

      function closeMenu() {
        mobileMenu.classList.remove('open');
        hamburgerBtn.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }

      hamburgerBtn.addEventListener('click', toggleMenu);

      mobileLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
      });

      // Close on resize to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
      });
