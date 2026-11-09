(() => {
  const nav = document.querySelector('.floating-nav');
  const heading = document.querySelector('.opinion-heading');
  if (!nav || !heading) return;
  let scheduled = false;
  const syncNav = () => {
    scheduled = false;
    const area = heading.getBoundingClientRect();
    const menu = nav.getBoundingClientRect();
    // Hide throughout the statement, then restore below it (also on reverse scroll).
    const hidden = area.top < menu.bottom + 32 && area.bottom > menu.top - 24;
    nav.classList.toggle('is-hidden', hidden);
    nav.inert = hidden;
    if (hidden) nav.setAttribute('aria-hidden', 'true');
    else nav.removeAttribute('aria-hidden');
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(syncNav); }
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  window.addEventListener('load', schedule);
  new ResizeObserver(schedule).observe(heading);
  syncNav();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mouse = window.matchMedia('(hover: hover) and (pointer: fine)');
  document.querySelectorAll('.tactile').forEach(object => {
    const reset = () => {
      object.style.removeProperty('--object-x');
      object.style.removeProperty('--object-y');
      object.style.removeProperty('--object-rotate');
    };
    object.addEventListener('pointermove', event => {
      if (reduced.matches || !mouse.matches || event.pointerType !== 'mouse') return;
      const box = object.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - .5;
      const y = (event.clientY - box.top) / box.height - .5;
      object.style.setProperty('--object-x', `${(x * 7).toFixed(2)}px`);
      object.style.setProperty('--object-y', `${(y * 5).toFixed(2)}px`);
      object.style.setProperty('--object-rotate', `${(x * 1.2).toFixed(2)}deg`);
    }, { passive: true });
    object.addEventListener('pointerleave', reset);
    object.addEventListener('pointercancel', reset);
    reduced.addEventListener('change', reset);
  });
})();
