/* Arcade Forge Studio Pass v0.4 — shared controls and accessible game diagnostics.
   Preserves gameplay state and currency. */
(()=>{'use strict';
if(document.getElementById('af-studio-pass'))return;
const params=new URLSearchParams(location.search),path=location.pathname;
const isBim=path.endsWith('/bim-city.html'),game=isBim?'bim':(params.get('game')||(path.includes('/industries/')?'factory':'rocket'));
const info={
rocket:['الصاروخ','تحكم في مسار الإطلاق وراقب الارتفاع ثم طوّر المحرك والوقود.'],
plane:['الطائرة','وجّه الطائرة بالأسهم وراقب الارتفاع والسرعة.'],
car:['السيارة','وازن بين السرعة والانعطاف وتجنب العوائق.'],
sub:['الغواصة','راقب الطاقة والعمق واستكشف قاع المحيط.'],
drill:['الحفّار','استخرج الموارد وطور أدوات الحفر.'],
starship:['المركبة الفضائية','ابحث عن الموارد واكتشف مناطق فضائية جديدة.'],
balloon:['المنطاد','وازن الارتفاع مع حركة الرياح.'],
architect:['المعماري','ضع الأرضيات والجدران ثم الأبواب والنوافذ.'],
structure:['الإنشائي','ابدأ بالأساسات ثم الأعمدة والكمرات والبلاطات.'],
mep:['MEP','نفّذ المسارات وتحقق من الاتصال والتعارضات.'],
bim:['BIM City','شغّل الحفّار والشاحنة والخلاطة والرافعة، وأنجز مراحل العقد.'],
factory:['المصنع','اشترِ المواد ثم أنتج واشحن مع مراقبة الطاقة.'],
hotel:['الفندق','جهّز الغرف واستقبل النزلاء وحسّن الخدمة.'],
airport:['المطار','نظّم الرحلات والهبوط والخدمات الأرضية والإقلاع.'],
engineering:['الشركة الهندسية','اربح العقود وأصدر اللوحات وحل تعارضات BIM.'],
mine:['المنجم','امسح مواقع الخام واستخرجه ثم كرره وبعه.']
};
const [title,hint]=info[game]||['Arcade Forge','أكمل المهمات للحصول على المكافآت.'];
const host=document.createElement('div');host.id='af-studio-pass';const root=host.attachShadow({mode:'open'});root.innerHTML=`<style>
:host{position:fixed;z-index:2147483000;top:calc(8px + env(safe-area-inset-top));left:8px;color:#effaff;direction:rtl;font:500 12px/1.6 system-ui,Arial,sans-serif;max-width:calc(100vw - 16px)}
*{box-sizing:border-box}button,select{font:inherit;cursor:pointer}
#toggle{border:1px solid #7cbacb;background:#102632ee;color:#fff;border-radius:25px;padding:8px 12px;box-shadow:0 5px 24px #0008;font-weight:800;backdrop-filter:blur(10px)}
#panel{width:min(320px,calc(100vw - 20px));max-height:calc(100dvh - 70px);overflow:auto;background:#0c1c2af7;border:1px solid #46768a;box-shadow:0 12px 38px #000a;border-radius:15px;padding:14px;margin-top:8px}
[hidden]{display:none!important}#panel h3{font-size:15px;margin:0}#panel p{font-size:12px;color:#bed0dd;line-height:1.7;margin:10px 0}
#panel button,#panel select{background:#1b3a4a;color:#fff;border:1px solid #497c8e;border-radius:9px;min-height:36px;padding:8px 10px}
.row{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}
#qualityRow{margin:10px 0}#quality{width:100%}label{display:block;margin-bottom:5px}#export{width:100%}
button:focus-visible,#toggle:focus-visible{outline:3px solid #e6e881;outline-offset:2px}
small{color:#91b7c3}#status{color:#b1f0d7;font-size:11px}
</style><button id="toggle" aria-expanded="false">⚙ أدوات اللعب</button><section id="panel" hidden aria-label="إعدادات اللعبة" role="region"><div class="row"><h3 id="name"></h3><button id="close" aria-label="إغلاق">✕</button></div><p id="instructions"></p><div class="row"><small id="fps">جارٍ قياس الأداء</small><small>Studio Pass 0.4</small></div><div class="grid"><button id="full">ملء الشاشة</button><button id="contrast">تباين مرتفع</button></div><div id="qualityRow" hidden><label for="quality">الجودة الرسومية</label><select id="quality"><option value="eco">موفّر</option><option value="balanced">متوازن</option><option value="high">عالي</option></select></div><button id="export">حفظ نسخة من تقدم الألعاب</button><p id="status">يُحفظ التقدم محليًا على هذا الجهاز. يمكنك تصدير نسخة احتياطية.</p></section>`;
document.body.appendChild(host);
const el=id=>root.getElementById(id);el('name').textContent=title;el('instructions').textContent=hint;
const panel=el('panel'),toggle=el('toggle');function show(on){panel.hidden=!on;toggle.setAttribute('aria-expanded',String(on))}
toggle.onclick=()=>show(panel.hidden);el('close').onclick=()=>show(false);
let prefs={contrast:false};try{prefs={...prefs,...JSON.parse(localStorage.getItem('arcade-forge-studio-v04')||'{}')}}catch{}
function contrast(){document.documentElement.classList.toggle('af-high-contrast',prefs.contrast);let style=document.getElementById('af-studio-contrast');if(!style){style=document.createElement('style');style.id='af-studio-contrast';style.textContent='.af-high-contrast button:focus-visible,.af-high-contrast a:focus-visible{outline:3px solid #fff39b!important;outline-offset:2px!important}.af-high-contrast canvas{outline:1px solid #83cbdc}';document.head.appendChild(style)}el('contrast').textContent=prefs.contrast?'إيقاف التباين':'تباين مرتفع'}
contrast();el('contrast').onclick=()=>{prefs.contrast=!prefs.contrast;try{localStorage.setItem('arcade-forge-studio-v04',JSON.stringify(prefs))}catch{}contrast()};
el('full').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();el('status').textContent='تم تغيير وضع العرض'}catch{el('status').textContent='ملء الشاشة غير متاح على هذا الجهاز'}};
let native=null;function bindQuality(){let x=document.getElementById('graphics');if(x&&x.tagName==='SELECT'){native=x;el('qualityRow').hidden=false;el('quality').value=x.value}}
bindQuality();el('quality').onchange=()=>{if(native){native.value=el('quality').value;native.dispatchEvent(new Event('change',{bubbles:true}));el('status').textContent='تم تغيير جودة الرسومات'}};
const allow=/^(arcade-forge-(?:3d-v1-|tycoon-v1-|daily-|favorites-|recent-|graphics-|studio-|hub-)|bim-city-construction-operations-v3$)/;
el('export').onclick=()=>{try{const saves={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&allow.test(k))saves[k]=localStorage.getItem(k)}const json=JSON.stringify({app:'Arcade Forge',format:2,date:new Date().toISOString(),saves},null,2);if(json.length>3000000)throw Error('حجم الحفظ كبير');const url=URL.createObjectURL(new Blob([json],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='arcade-forge-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);el('status').textContent='تم تصدير تقدم الألعاب'}catch(e){el('status').textContent='تعذر التصدير: '+e.message}};
let frames=0,last=performance.now();function measure(now){frames++;if(now-last>=1200){const fps=Math.round(frames*1000/(now-last));frames=0;last=now;if(!panel.hidden){el('fps').textContent='عرض الصفحة: '+fps+' FPS';if(!native)bindQuality()}}requestAnimationFrame(measure)}requestAnimationFrame(measure);
})();