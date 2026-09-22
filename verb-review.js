/* Short spaced reviews for verbs already practised in Verben. */
(function(){
  const STORAGE='deutsch-c1-verb-review-v1';
  const SESSION_KEY='deutsch-c1-verb-review-session-v1';
  const FORMS=['Präsens','Präteritum','Perfekt'];
  const PEOPLE=['ich','du','man','wir','ihr','sie'];
  const verbs=window.GERMAN_VERBS||[];
  const byName=new Map(verbs.map(verb=>[verb.v,verb]));
  const dateInput=document.querySelector('#verbDate');
  const box=document.querySelector('#verbReviewCards');
  const status=document.querySelector('#verbReviewStatus');
  if(!box||!dateInput)return;
  const today=()=>{
    const date=new Date();
    return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-')
  };
  const addDays=(day,days)=>{
    const date=new Date(day+'T12:00:00Z');
    date.setUTCDate(date.getUTCDate()+days);
    return date.toISOString().slice(0,10)
  };
  const escapeText=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normal=value=>String(value).trim().toLocaleLowerCase('de-DE').replace(/\s+/g,' ');
  const load=()=>{try{return JSON.parse(localStorage.getItem(STORAGE)||'{}')}catch{return {}}};
  const schedule=load();
  const save=()=>localStorage.setItem(STORAGE,JSON.stringify(schedule));
  function importOlderPractice(){
    let saved={};
    try{saved=JSON.parse(localStorage.getItem('deutsch-c1-verbs-v1')||'{}')}catch{}
    for(const [key,entries] of Object.entries(saved)){
      const practisedOn=key.slice(0,10);
      if(!/^\d{4}-\d{2}-\d{2}$/.test(practisedOn)||practisedOn>=today())continue;
      for(const [name,forms] of Object.entries(entries||{})){
        if(!byName.has(name)||!Array.isArray(forms)||!forms.every(value=>String(value||'').trim()))continue;
        if(!schedule[name])schedule[name]={next:addDays(practisedOn,1),stage:0,started:practisedOn};
      }
    }
    save()
  }
  importOlderPractice();
  function choice(name){
    let hash=2166136261;
    for(const char of today()+name){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619)}
    return [(hash>>>0)%6,(hash>>>3)%3]
  }
  function reviewSelection(date){
    let session;
    try{session=JSON.parse(localStorage.getItem(SESSION_KEY)||'null')}catch{}
    if(session?.date===date&&Array.isArray(session.names)){
      const names=session.names.filter(name=>byName.has(name)).slice(0,1);
      if(session.names.length!==names.length)localStorage.setItem(SESSION_KEY,JSON.stringify({date,names}));
      return names
    }
    const names=Object.entries(schedule)
      .filter(([name,entry])=>byName.has(name)&&entry.next<=date&&entry.started<date&&entry.last!==date)
      .sort((a,b)=>a[1].next.localeCompare(b[1].next)||a[0].localeCompare(b[0]))
      .slice(0,1).map(([name])=>name);
    localStorage.setItem(SESSION_KEY,JSON.stringify({date,names}));
    return names
  }
  function render(){
    const date=today(),selected=reviewSelection(date);
    const due=Object.entries(schedule).filter(([name,entry])=>byName.has(name)&&entry.next<=date&&entry.started<date&&entry.last!==date);
    const done=selected.filter(name=>schedule[name]?.last===date).length;
    status.textContent=selected.length
      ? `${done} von ${selected.length} Wiederholungen heute erledigt${due.length>selected.length-done?` · ${due.length-(selected.length-done)} weitere warten`:''}`
      : 'Heute keine Wiederholung fällig. Geprüfte Verben erscheinen später wieder.';
    box.innerHTML='';
    for(const name of selected){
      if(schedule[name]?.last===date){
        const completed=document.createElement('article');
        completed.className='verb-review-card';
        completed.innerHTML=`<div class="review-card-head"><strong>${escapeText(name)}</strong></div><p class="review-feedback">Heute erledigt ✓ · nächste Wiederholung am ${escapeText(schedule[name].next)}</p>`;
        box.append(completed);
        continue
      }
      const verb=byName.get(name),[person,form]=choice(name),expected=[verb.pr,verb.pa,verb.pe][form][person];
      const article=document.createElement('article');
      article.className='verb-review-card';
      article.innerHTML=`<div class="review-card-head"><strong>${escapeText(name)}</strong><span>${escapeText((window.GERMAN_VERB_MEANINGS||{})[name]||'')}</span></div>
        <label>${PEOPLE[person]} · ${FORMS[form]}<input class="review-form" autocomplete="off" spellcheck="false" placeholder="Verbform eingeben"></label>
        <label>Eigener Satz aus deinem Alltag<textarea class="review-sentence" lang="de" spellcheck="true" placeholder="Schreibe einen Satz, den du tatsächlich sagen könntest."></textarea></label>
        <button type="button" class="review-check">Form prüfen</button>
        <p class="review-feedback" aria-live="polite"></p>
        <div class="review-rating" hidden><button type="button" data-review="again">Noch üben</button><button type="button" data-review="remembered">Gut behalten</button></div>`;
      const input=article.querySelector('.review-form'),sentence=article.querySelector('.review-sentence');
      const feedback=article.querySelector('.review-feedback'),rating=article.querySelector('.review-rating');
      article.querySelector('.review-check').addEventListener('click',()=>{
        if(!input.value.trim()||!sentence.value.trim()){
          feedback.textContent='Bitte schreibe zuerst die Verbform und einen eigenen Satz.';
          return
        }
        const correct=normal(input.value)===normal(expected);
        input.classList.toggle('correct',correct);
        input.classList.toggle('wrong',!correct);
        feedback.textContent=`${correct?'Verbform richtig ✓':`Richtig: ${expected}.`} Lies auch deinen eigenen Satz noch einmal durch.`;
        rating.hidden=false;
      });
      rating.querySelectorAll('[data-review]').forEach(button=>button.addEventListener('click',()=>{
        if(rating.hidden||!sentence.value.trim())return;
        const remembered=button.dataset.review==='remembered'&&normal(input.value)===normal(expected);
        const previous=schedule[name];
        const stage=remembered?Math.min((previous.stage||0)+1,5):0;
        const intervals=[1,3,7,14,30,60];
        schedule[name]={...previous,stage,next:addDays(date,intervals[stage]),last:date};
        save();
        window.dispatchEvent(new CustomEvent('verb-review-completed',{detail:{date,name}}));
        article.innerHTML=`<div class="review-card-head"><strong>${escapeText(name)}</strong></div><p class="review-feedback">Heute erledigt ✓ · nächste Wiederholung am ${escapeText(schedule[name].next)}</p>`;
        const completed=selected.filter(verb=>schedule[verb]?.last===date).length;
        status.textContent=`${completed} von ${selected.length} Wiederholungen heute erledigt`;
      }));
      box.append(article)
    }
  }
  window.addEventListener('verb-practised',event=>{
    const {date,name}=event.detail||{};
    if(date!==today()||!byName.has(name))return;
    if(!schedule[name])schedule[name]={started:date,next:addDays(date,1),stage:0};
    save()
  });
  render()
})();
