/* Original, authored operational incidents for Arcade Forge Industries.
   Choice effects are applied only to player-saved state; not client payment. */
export const INCIDENTS = {
  factory: [
    {title:'انقطاع مفاجئ في الشبكة الكهربائية',body:'انخفض الجهد أثناء تشغيل خط الإنتاج. هل توقف الخط للصيانة أم تستمر بمولد مؤقت؟',choices:[
      {label:'صيانة وقائية وإعادة التشغيل',summary:'−160 $ · +25 طاقة · +2 سمعة',effect:{cash:-160,power:25,rating:2}},
      {label:'تشغيل المولد المؤقت',summary:'+2 منتجات · −18 طاقة · −4 سمعة',effect:{products:2,power:-18,rating:-4}}]},
    {title:'عرض توريد محدود',body:'يعرض المورد توريد خام عالي النقاء بخصم، أو شحنة سريعة أصغر حجماً.',choices:[
      {label:'توريد بالجملة',summary:'−280 $ · +20 خام',effect:{cash:-280,raw:20}},
      {label:'توريد سريع محدود',summary:'−100 $ · +8 خام · +1 سمعة',effect:{cash:-100,raw:8,rating:1}}]}
  ],
  hotel: [
    {title:'وفد ضيوف مميزين',body:'وصل طلب خاص لتحسين تجربة الضيافة. الفخامة تُحسن التقييم لكنها تكلّف أكثر.',choices:[
      {label:'حزمة ضيافة فاخرة',summary:'−170 $ · +12 رضا · +3 تقييم',effect:{cash:-170,happiness:12,rating:3}},
      {label:'خدمة قياسية بربح أعلى',summary:'+110 $ · −6 رضا · −2 تقييم',effect:{cash:110,happiness:-6,rating:-2}}]},
    {title:'ضغط على قسم التدبير الفندقي',body:'فريق التنظيف يواجه حجوزات متلاحقة. اختر طريقة معالجة نقص الخدمة.',choices:[
      {label:'استدعاء فريق إضافي',summary:'−130 $ · +2 غرف جاهزة · +4 رضا',effect:{cash:-130,clean:2,happiness:4}},
      {label:'تأجيل تنظيف الغرف',summary:'+70 $ · +2 غرف متسخة · −7 رضا',effect:{cash:70,dirty:2,happiness:-7,rating:-2}}]}
  ],
  airport: [
    {title:'أحوال جوية متقلبة',body:'هطلت أمطار على المدرج. السلامة أولًا أم تفضل مواصلة جدول الرحلات مع مخاطر أعلى؟',choices:[
      {label:'تحويل الرحلة إلى موقف آمن',summary:'−190 $ · +4 تقييم · +15 وقود',effect:{cash:-190,rating:4,fuel:15}},
      {label:'الاستمرار مع تأخير محتمل',summary:'+100 $ · +2 تأخيرات · −6 تقييم',effect:{cash:100,delays:2,rating:-6}}]},
    {title:'ازدحام البوابات',body:'ازدادت طلبات شركات الطيران خلال الفترة المسائية.',choices:[
      {label:'مناوبة إضافية للخدمات الأرضية',summary:'−220 $ · +5 تقييم · +20 وقود',effect:{cash:-220,rating:5,fuel:20}},
      {label:'قبول حجز إضافي',summary:'+150 $ · +2 وصول · +1 تأخير',effect:{cash:150,inbound:2,delays:1,rating:-2}}]}
  ],
  engineering: [
    {title:'تغيير في متطلبات العميل',body:'طلب العميل تعديل المسارات قبل الاعتماد النهائي. اختر بين ضبط الجودة أو تسليم أسرع.',choices:[
      {label:'تنسيق معمّق بمراجعة BIM',summary:'−200 $ · −2 تعارض · +7 جودة',effect:{cash:-200,clashes:-2,quality:7,rating:4}},
      {label:'مسار موافقات سريع',summary:'+190 $ · +2 تعارض · −6 جودة',effect:{cash:190,clashes:2,quality:-6,rating:-3}}]},
    {title:'فرصة تعاون مع مكتب متخصص',body:'يمكن التعاقد مع مراجعين إضافيين أو استغلال الفريق الحالي بأقل تكلفة.',choices:[
      {label:'التعاقد مع مراجعين مستقلين',summary:'−250 $ · +8 جودة · +4 تقييم',effect:{cash:-250,quality:8,rating:4}},
      {label:'المراجعة الداخلية المختصرة',summary:'+100 $ · −4 جودة · +1 تعارض',effect:{cash:100,quality:-4,clashes:1}}]}
  ],
  mine: [
    {title:'نتائج فحص نقاء الخام',body:'هناك احتمال لتحسين العائد بفرز الخام قبل نقله، أو زيادة سرعة استخراج الأطنان.',choices:[
      {label:'فرز خام عالي الجودة',summary:'−145 $ · +15 نقاء · −5 تآكل',effect:{cash:-145,grade:15,wear:-5}},
      {label:'استخراج إضافي سريع',summary:'+3 طن خام · +12 تآكل · −8 نقاء',effect:{ore:3,wear:12,grade:-8}}]},
    {title:'فحص منحدرات المنجم',body:'رصد مشرف الموقع تآكلًا في طريق النقل. المعالجة الآن أقل كلفة من الأعطال اللاحقة.',choices:[
      {label:'تدعيم المنحدر وصيانة الآليات',summary:'−175 $ · −22 تآكل · +4 تقييم',effect:{cash:-175,wear:-22,rating:4}},
      {label:'تأجيل المعالجة',summary:'+120 $ · +15 تآكل · −5 تقييم',effect:{cash:120,wear:15,rating:-5}}]}
  ]
};
const bounded={rating:[0,100],happiness:[0,100],quality:[0,100],power:[0,100],fuel:[0,100],wear:[0,100],grade:[0,100]};
export const validGames=Object.keys(INCIDENTS);
export function activeIncident(game,state){
 if(!INCIDENTS[game]||!Number.isInteger(state?.actionsSinceIncident)||state.actionsSinceIncident<3)return null;
 const idx=(Math.max(0,Math.floor(Number(state.incidentsResolved)||0)) + Math.max(0,Math.floor(Number(state.mission?.stage)||1))-1)%INCIDENTS[game].length;
 return {...INCIDENTS[game][idx],id:game+'-'+idx};
}
export function chooseIncident(game,state,choiceIndex){
 const incident=activeIncident(game,state);
 if(!incident||!Number.isInteger(choiceIndex)||choiceIndex<0||choiceIndex>1)return {ok:false,error:'لا توجد حالة ميدانية جاهزة'};
 const choice=incident.choices[choiceIndex];const cashChange=choice.effect.cash||0;
 if(cashChange<0&&(Number(state.cash)||0)<-cashChange)return {ok:false,error:'لا توجد سيولة كافية لهذا الخيار. اختر البديل.'};
 for(const [field,change] of Object.entries(choice.effect)){
   const before=Number(state[field])||0;
   let after=before+change;
   if(bounded[field])after=Math.max(bounded[field][0],Math.min(bounded[field][1],after));
   else after=Math.max(0,after);
   state[field]=Math.round(after);
 }
 if(cashChange>0){state.earned=(Number(state.earned)||0)+cashChange;state.exp=(Number(state.exp)||0)+cashChange*.2;}
 state.actionsSinceIncident=0;state.incidentsResolved=Math.max(0,Math.floor(Number(state.incidentsResolved)||0))+1;
 state.lastIncident={id:incident.id,choice:choiceIndex,at:Date.now()};
 return {ok:true,title:incident.title,choice:choice.label,summary:choice.summary};
}
export function normalizeIncidents(state){
 state.actionsSinceIncident=Math.max(0,Math.min(3,Math.floor(Number(state.actionsSinceIncident)||0)));
 state.incidentsResolved=Math.max(0,Math.floor(Number(state.incidentsResolved)||0));
 return state;
}
