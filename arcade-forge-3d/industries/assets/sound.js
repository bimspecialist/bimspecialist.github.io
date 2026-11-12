// Lightweight original synthesized feedback, user-initiated only. No copyrighted music.
let ctx=null,enabled=false;
export function setSound(on){enabled=!!on;if(enabled){try{const C=window.AudioContext||window.webkitAudioContext;if(C)ctx=ctx||new C();ctx.resume?.()}catch{enabled=false}}return enabled}
export function soundEnabled(){return enabled}
export function playTone(kind='click'){
 if(!enabled||!ctx)return;
 try{const o=ctx.createOscillator(),gain=ctx.createGain(),t=ctx.currentTime;
 const freq={success:[540,820],error:[270,170],click:[470,510],event:[330,660]}[kind]||[450,500];
 o.type=kind==='error'?'triangle':'sine';o.frequency.setValueAtTime(freq[0],t);o.frequency.exponentialRampToValueAtTime(freq[1],t+.11);
 gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(.045,t+.01);gain.gain.exponentialRampToValueAtTime(.0001,t+.17);
 o.connect(gain).connect(ctx.destination);o.start(t);o.stop(t+.18);
 }catch{}
}
