(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 document.querySelectorAll('[data-preview]').forEach(button => button.addEventListener('click', () => {
  const dialog = document.getElementById(button.dataset.preview);
  if (!dialog) return;
  dialog.showModal();
  dialog.addEventListener('close', () => button.focus(), { once:true });
 }));
 document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if(e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); } });
 });
 const creature=document.querySelector('.creature-art');
 if(creature){
  creature.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType!=='mouse')return;const r=creature.getBoundingClientRect();creature.style.setProperty('--x',`${(e.clientX-r.left-r.width/2)*.015}px`);creature.style.setProperty('--y',`${(e.clientY-r.top-r.height/2)*.015}px`)});
  creature.addEventListener('pointerleave',()=>{creature.style.setProperty('--x','0px');creature.style.setProperty('--y','0px')});
 }
 const button=document.getElementById('squish'), cake=document.getElementById('cake');
 if(!button||!cake)return;
 let position=0, velocity=0, target=0, frame=0, last=0, held=false;
 const step=time=>{
  const dt=Math.min((time-last)/1000||.016,.032);last=time;
  velocity+=((target-position)*210-velocity*16)*dt;position+=velocity*dt;
  cake.style.transform=`scale(${1+position*.085},${1-position*.12})`;
  if(Math.abs(target-position)>.001||Math.abs(velocity)>.001)frame=requestAnimationFrame(step);
  else{frame=0;if(!target)cake.style.removeProperty('transform')}
 };
 const start=()=>{if(!frame&&!reduced.matches){last=performance.now();frame=requestAnimationFrame(step)}};
 const release=()=>{held=false;target=0;start()};
 button.addEventListener('pointerdown',e=>{if(e.button!==0||reduced.matches)return;held=true;target=1;button.setPointerCapture(e.pointerId);start()});
 button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('lostpointercapture',release);
 button.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat){e.preventDefault();held=true;target=1;start()}});
 button.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();release()}});
 button.addEventListener('click',e=>{if(e.detail===0&&!held&&!reduced.matches){velocity=9;target=0;start()}});
 button.addEventListener('blur',release);window.addEventListener('blur',release);
 reduced.addEventListener('change',()=>{cancelAnimationFrame(frame);frame=0;position=velocity=target=0;cake.style.removeProperty('transform')});
})();
