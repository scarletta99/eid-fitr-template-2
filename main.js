/* ============================================================
   Eid Al-Fitr Greeting Card — Saphire Green
   main.js
   ============================================================ */

/* ── Floating Petals / Particles ── */
(function generatePetals() {
    const container = document.getElementById('petals');
    const symbols   = ['✿', '❀', '✦', '◈', '❋', '✾'];
    const colors    = ['#71a595', '#f4bc63', '#d0eadf', '#f4e0ae', '#4d7d6e'];
  
    for (let i = 0; i < 22; i++) {
      const el = document.createElement('div');
      el.className = 'petal';
      el.textContent = symbols[i % symbols.length];
      const size = (Math.random() * 0.8 + 0.6).toFixed(2);
      el.style.cssText = [
        `left:${Math.random() * 100}%`,
        `color:${colors[i % colors.length]}`,
        `--ps:${size}rem`,
        `animation-duration:${Math.random() * 12 + 8}s`,
        `animation-delay:${Math.random() * 14}s`,
      ].join(';');
      container.appendChild(el);
    }
  })();
  
  /* ── Generate Lanterns (teal & amber palette) ── */
  (function generateLanterns() {
    const container = document.getElementById('lanterns');
    const colorSets = [
      ['#71a595', '#d0eadf'],
      ['#f4bc63', '#f4e0ae'],
      ['#4d7d6e', '#a8d5c4'],
    ];
  
    for (let i = 0; i < 7; i++) {
      const [c1, c2] = colorSets[i % colorSets.length];
      const lantern  = document.createElement('div');
      lantern.className = 'lantern';
      lantern.style.cssText = `left:${i * 14 + 2}%;--sd:${3 + i * 0.4}s;--sl:${i * 0.55}s;`;
      lantern.innerHTML = `
        <svg width="22" height="50" viewBox="0 0 28 60">
          <line x1="14" y1="0"  x2="14" y2="8"  stroke="${c1}" stroke-width="1.5"/>
          <rect x="3"  y="8"  width="22" height="34" rx="5" fill="${c1}" opacity="0.9"/>
          <rect x="7"  y="12" width="14" height="26" rx="3" fill="${c2}" opacity="0.5"/>
          <ellipse cx="14" cy="42" rx="11" ry="4" fill="${c1}" opacity="0.65"/>
          <circle  cx="14" cy="25" r="5"           fill="${c2}" opacity="0.8"/>
          <line x1="14" y1="42" x2="14" y2="58" stroke="${c1}" stroke-width="1.5"/>
          <!-- glow dot -->
          <circle cx="14" cy="25" r="2" fill="white" opacity="0.4"/>
        </svg>`;
      container.appendChild(lantern);
    }
  })();
  
  /* ── Open Card ── */
  window.openCard = function () {
    const cover      = document.getElementById('cover');
    const innerPages = document.getElementById('innerPages');
  
    cover.classList.add('opening');
    setTimeout(() => {
      cover.style.display = 'none';
      innerPages.classList.add('visible');
      launchConfetti();
    }, 620);
  };
  
  /* ── Music Player ── */
  const bgAudio  = document.getElementById('bgMusic');
  let   isPlaying = false;
  
  window.toggleMusic = function () {
    const bars = document.getElementById('bars');
    const icon = document.getElementById('playIcon');
  
    if (!isPlaying) {
      bgAudio.play()
        .then(() => {
          isPlaying = true;
          icon.textContent = '⏸';
          bars.classList.remove('paused');
          launchConfetti();
        })
        .catch(() => {
          isPlaying = true;
          icon.textContent = '⏸';
          bars.classList.remove('paused');
        });
    } else {
      bgAudio.pause();
      isPlaying = false;
      icon.textContent = '▶';
      bars.classList.add('paused');
    }
  };
  
  /* ── Confetti burst (light, soft colors) ── */
  function launchConfetti() {
    for (let i = 0; i < 5; i++) {
      setTimeout(spawnBurst, i * 400);
    }
  }
  
  function spawnBurst() {
    const x      = 20 + Math.random() * 60;
    const y      = 10 + Math.random() * 50;
    const shapes = ['●', '★', '✿', '◆', '❋'];
    const colors = ['#71a595', '#f4bc63', '#d0eadf', '#4d7d6e', '#f4e0ae', '#a8d5c4'];
  
    for (let i = 0; i < 16; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      spark.textContent = shapes[i % shapes.length];
  
      const angle = (i / 16) * Math.PI * 2;
      const dist  = 35 + Math.random() * 65;
      const dx    = Math.cos(angle) * dist;
      const dy    = Math.sin(angle) * dist;
  
      spark.style.cssText = [
        `left:${x}vw`,
        `top:${y}vh`,
        `color:${colors[i % colors.length]}`,
        `font-size:${Math.random() * 8 + 8}px`,
        `background:transparent`,
        `width:auto`,
        `height:auto`,
        `transition:transform 1s ease-out,opacity 1s ease-out`,
        `opacity:1`,
      ].join(';');
  
      document.body.appendChild(spark);
  
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random()*360}deg)`;
        spark.style.opacity   = '0';
      });
  
      setTimeout(() => spark.remove(), 1100);
    }
  }