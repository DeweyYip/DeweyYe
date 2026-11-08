(() => {
  const nav = document.querySelector('.floating-nav');
  if (!nav) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const paperHero = document.querySelector('.paper-hero');
  const applyScroll = () => document.body.classList.toggle('is-scrolled', paperHero && paperHero.getBoundingClientRect().bottom < 60);
  applyScroll();
  window.addEventListener('scroll', applyScroll, { passive: true });
  let targetX = 0, targetY = 0, x = 0, y = 0, ticking = false;
  const update = () => {
    ticking = false;
    if (reduceMotion.matches) { nav.style.setProperty('--shift-x','0px'); nav.style.setProperty('--shift-y','0px'); return; }
    x += (targetX - x) * 0.14;
    y += (targetY - y) * 0.14;
    nav.style.setProperty('--shift-x', x.toFixed(2) + 'px');
    nav.style.setProperty('--shift-y', y.toFixed(2) + 'px');
    if (Math.abs(targetX - x) > 0.2 || Math.abs(targetY - y) > 0.2) ticking = true, requestAnimationFrame(update);
  };
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    targetX = Math.max(-10, Math.min(10, (e.clientX - window.innerWidth / 2) / window.innerWidth * 20));
    targetY = Math.max(-8, Math.min(8, (e.clientY - window.innerHeight / 2) / window.innerHeight * 16));
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; if (!ticking) { ticking = true; requestAnimationFrame(update); } });
})();
