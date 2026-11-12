// Arcade Forge Industries - skill-led gameplay contracts and meaningful strategy choices.
// Pure functions are independently testable; game state remains in sim.js.
export const POLICIES = {
 factory: [
  {id:'lean',name:'التصنيع المرن',desc:'خام أقل في الدورة لكن عائد بيع أقل. مناسب للسيولة المحدودة.'},
  {id:'premium',name:'الجودة الممتازة',desc:'خام وطاقة أكثر مقابل عقود أعلى قيمة وتقييم أفضل.'}
 ],
 hotel: [
  {id:'hospitality',name:'خدمة خمس نجوم',desc:'خدمات إضافية ورضا أعلى مقابل هامش ربح أقل.'},
  {id:'revenue',name:'إدارة الإيراد',desc:'سعر الغرفة أعلى لكن النزيل أكثر حساسية للخدمة.'}
 ],
 airport: [
  {id:'safe',name:'تشغيل منضبط',desc:'فحص أرضي أطول وتأخير أقل وتقييم أعلى.'},
  {id:'fast',name:'دوران سريع',desc:'تجهيز أسرع لكن كلفة خدمة ومخاطر تأخير أكبر.'}
 ],
 engineering: [
  {id:'quality',name:'ضمان الجودة',desc:'جهد إضافي في التصميم مقابل تعارضات أقل.'},
  {id:'fasttrack',name:'تسليم سريع',desc:'تكلفة تصميم أقل لكن تنسيق أصعب قبل التسليم.'}
 ],
 mine: [
  {id:'selective',name:'تعدين انتقائي',desc:'كمية أقل مع تآكل أقل ونقاء أعلى.'},
  {id:'bulk',name:'استخراج كثيف',desc:'كمية أكبر لكن تآكل معدات أعلى ونقاء أقل.'}
 ]
};
export const CONTRACTS = {
 factory:{field:'orders',verb:'اشحن',unit:'طلبيات صناعية',base:2,reward:900},
 hotel:{field:'served',verb:'أكمل إقامة',unit:'نزلاء',base:3,reward:650},
 airport:{field:'departed',verb:'سيّر',unit:'رحلات مغادرة',base:2,reward:1100},
 engineering:{field:'delivered',verb:'سلّم',unit:'مشاريع هندسية',base:1,reward:1050},
 mine:{field:'sold',verb:'بع',unit:'سبائك مصنّعة',base:3,reward:850}
};
const finite=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;
export function normalizeMission(game,state){
 const c=CONTRACTS[game];
 const raw=state.mission&&typeof state.mission==='object'?state.mission:{};
 const stage=Math.max(1,Math.min(999,Math.floor(finite(raw.stage,1))));
 const base=Math.max(0,Math.floor(finite(raw.base,finite(state[c.field]))));
 return {stage,base};
}
export function missionView(game,state){
 const c=CONTRACTS[game],m=normalizeMission(game,state);
 const target=c.base+Math.min(20,m.stage-1)*Math.max(1,Math.ceil(c.base*.5));
 const current=Math.max(0,Math.floor(finite(state[c.field]))-m.base);
 return {stage:m.stage,current,target,progress:Math.min(100,Math.round(current/target*100)),ready:current>=target,reward:Math.round(c.reward*(1+.32*(m.stage-1))),title:`عقد ${m.stage}: ${c.verb} ${target} ${c.unit}`,description:`أنجز ${target} ${c.unit} من الآن لتحصل على مكافأة الإنجاز.`};
}
export function completeMission(game,state){
 const result=missionView(game,state);
 if(!result.ready)return {claimed:false,reward:0};
 const field=CONTRACTS[game].field;
 // Reset baseline to real cumulative totals; never fabricate progress.
 const next={stage:Math.min(999,result.stage+1),base:Math.max(0,Math.floor(finite(state[field])))};
 state.mission=next;
 return {claimed:true,reward:result.reward,next};
}
export function normalizePolicy(game,policy){
 const arr=POLICIES[game];
 return arr.find(p=>p.id===policy)?.id||arr[0].id;
}
export function clampValue(value,min,max){return Math.min(max,Math.max(min,Number.isFinite(value)?value:min))}
