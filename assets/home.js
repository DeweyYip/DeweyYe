// Fresh visits start at the footer. Let history and fragment links keep their own position.
(() => {
  const navigation = performance.getEntriesByType('navigation')[0];
  if (location.hash || (navigation && navigation.type !== 'navigate')) return;
  window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
})();

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

(() => {
 const stage=document.querySelector('.statement-reveal');
 const paper=stage?.querySelector('.title-paper');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let queued=false;
 const update = () => {
  queued = false;
  if (!stage || !paper || reduced.matches) return;
  const scene = stage.firstElementChild;
  // Move the cover during the first half of the pinned scroll, then hold the copy.
  const distance = scene.clientHeight * .55;
  const progress = Math.max(0, Math.min(1, -stage.getBoundingClientRect().top / distance));
  paper.style.setProperty('--paper-shift', `${-progress * scene.clientWidth}px`);
 };
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update)}};
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('load',schedule);reduced.addEventListener('change',schedule);update();
 document.querySelectorAll('.paper-flip,.paper-split').forEach(button=>button.addEventListener('click',()=>{const open=button.classList.toggle('is-open');button.setAttribute('aria-pressed',String(open))}));
})();

(() => {
 const tape=document.querySelector('.tape-peel');if(!tape)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const stopAt=0.875;
 let progress=0,target=0,frame=0,previous=0,pinned=false,hovered=false,focused=false;
 const render=()=>{tape.style.setProperty('--peel',progress.toFixed(4));tape.style.setProperty('--curl-opacity',Math.min(1,progress*14).toFixed(4));tape.style.setProperty('--curl-angle',`${-9*Math.sin(progress/stopAt*Math.PI)}deg`)};
 const step=now=>{const dt=Math.min((now-previous)/1000||.016,.05);previous=now;const direction=Math.sign(target-progress);progress+=direction*dt/(direction>0?1.35:.8);if(direction*(target-progress)<=0)progress=target;render();if(progress!==target)frame=requestAnimationFrame(step);else frame=0};
 const sync=()=>{target=pinned||hovered||focused?stopAt:0;tape.setAttribute('aria-pressed',String(Boolean(target)));if(target)tape.setAttribute('aria-describedby','tape-message');else tape.removeAttribute('aria-describedby');if(reduced.matches){cancelAnimationFrame(frame);frame=0;progress=target;render()}else if(!frame){previous=performance.now();frame=requestAnimationFrame(step)}};
 tape.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hovered=true;sync()}});
 tape.addEventListener('pointerleave',()=>{hovered=false;sync()});
 tape.addEventListener('focus',()=>{focused=tape.matches(':focus-visible');sync()});
 tape.addEventListener('blur',()=>{focused=false;sync()});
 tape.addEventListener('click',()=>{pinned=!pinned;focused=false;sync()});
 tape.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=focused=hovered=false;sync()}});
 reduced.addEventListener('change',sync);
})();
