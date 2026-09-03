const KEY='deutsch-c1-tracker-v1';
const WRITING_KEY='deutsch-c1-writing-v1';
const VERB_KEY='deutsch-c1-verbs-v1';
const ARTICLE_KEY='deutsch-c1-articles-v1';
const ARTICLE_MISTAKES_KEY='deutsch-c1-article-mistakes-v1';
const defaults={skills:{Grammatik:54,Sprechen:58,Schreiben:50,Hören:68,Wortschatz:62},tasks:{},minutes:0,date:''};
const day=new Date().toISOString().slice(0,10);
let state={...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')};
if(state.date!==day){state.minutes=0;state.date=day}
const save=()=>{localStorage.setItem(KEY,JSON.stringify(state));render()};
const skills=document.querySelector('#skills');
Object.entries(state.skills).forEach(([name,value])=>{const row=document.createElement('div');row.className='skill';row.innerHTML=`<label>${name}</label><input aria-label="${name} Fortschritt" type="range" min="0" max="100" value="${value}"><output>${value}%</output>`;row.querySelector('input').addEventListener('input',e=>{state.skills[name]=+e.target.value;save()});skills.append(row)});
document.querySelectorAll('[data-task]').forEach(box=>{box.checked=!!state.tasks[box.dataset.task];box.addEventListener('change',()=>{state.tasks[box.dataset.task]=box.checked;save()})});
document.querySelectorAll('[data-minutes]').forEach(btn=>btn.addEventListener('click',()=>{state.minutes+=+btn.dataset.minutes;save()}));
document.querySelector('#resetDay').addEventListener('click',()=>{state.minutes=0;save()});
document.querySelector('#copyPhrase').addEventListener('click',async e=>{await navigator.clipboard.writeText(document.querySelector('blockquote').textContent.replace(/[„“]/g,''));e.currentTarget.textContent='Kopiert ✓';setTimeout(()=>e.currentTarget.textContent='Satz kopieren',1400)});
function render(){document.querySelectorAll('.skill').forEach(row=>{const input=row.querySelector('input');input.value=state.skills[row.querySelector('label').textContent];row.querySelector('output').textContent=input.value+'%'});const checked=Object.values(state.tasks).filter(Boolean).length;document.querySelector('#weekText').textContent=`${checked} von 4 erledigt`;document.querySelector('#weekBar').style.width=(checked*25)+'%';document.querySelector('#minutes').textContent=state.minutes;document.querySelector('#minuteBar').style.width=Math.min(100,state.minutes/50*100)+'%';const total=Math.round(Object.values(state.skills).reduce((a,b)=>a+b,0)/5);document.querySelector('#totalPercent').textContent=total+'%';document.querySelector('#ring').style.strokeDashoffset=320.44*(1-total/100)}
document.querySelector('#today').textContent=new Intl.DateTimeFormat('de-DE',{weekday:'long',day:'numeric',month:'long'}).format(new Date());
const prompts=['Was hat dich heute beschäftigt – und warum?','Welche Idee möchtest du in nächster Zeit verwirklichen?','Beschreibe einen Moment, in dem du dich heute wohl oder unwohl gefühlt hast.','Was hast du kürzlich über dich selbst gelernt?','Welche Entscheidung fällt dir gerade schwer? Begründe deine Gedanken.','Was ist dir bei deiner Arbeit besonders wichtig?'];
const writing=JSON.parse(localStorage.getItem(WRITING_KEY)||'{}');
const entryDate=document.querySelector('#entryDate');
const paragraph=document.querySelector('#dailyParagraph');
const status=document.querySelector('#saveStatus');
let promptIndex=new Date().getDate()%prompts.length;
entryDate.value=day;
function showPrompt(){document.querySelector('#promptText').textContent=prompts[promptIndex]}
function loadEntry(){const entry=writing[entryDate.value]||{text:'',review:{}};paragraph.value=entry.text||'';document.querySelectorAll('[data-review]').forEach(x=>x.checked=!!entry.review?.[x.dataset.review]);status.textContent=entry.text?'Gespeicherter Eintrag':'Noch nicht gespeichert';updateCounts(false)}
function updateCounts(markUnsaved=true){const clean=paragraph.value.trim();document.querySelector('#wordCount').textContent=clean?clean.split(/\s+/).length:0;document.querySelector('#charCount').textContent=paragraph.value.length;if(markUnsaved)status.textContent='Änderungen nicht gespeichert'}
paragraph.addEventListener('input',()=>updateCounts());
entryDate.addEventListener('change',loadEntry);
document.querySelector('#newPrompt').addEventListener('click',()=>{promptIndex=(promptIndex+1)%prompts.length;showPrompt()});
document.querySelector('#saveEntry').addEventListener('click',()=>{const review={};document.querySelectorAll('[data-review]').forEach(x=>review[x.dataset.review]=x.checked);writing[entryDate.value]={text:paragraph.value.trim(),review,savedAt:new Date().toISOString()};localStorage.setItem(WRITING_KEY,JSON.stringify(writing));status.textContent='Gespeichert ✓'});
showPrompt();loadEntry();
const verbs=[
{v:'gehen',m:'to go',pr:['gehe','gehst','geht','gehen','geht','gehen'],pa:['ging','gingst','ging','gingen','gingt','gingen'],aux:'sein',part:'gegangen'},
{v:'kommen',m:'to come',pr:['komme','kommst','kommt','kommen','kommt','kommen'],pa:['kam','kamst','kam','kamen','kamt','kamen'],aux:'sein',part:'gekommen'},
{v:'machen',m:'to do / make',pr:['mache','machst','macht','machen','macht','machen'],pa:['machte','machtest','machte','machten','machtet','machten'],aux:'haben',part:'gemacht'},
{v:'sagen',m:'to say',pr:['sage','sagst','sagt','sagen','sagt','sagen'],pa:['sagte','sagtest','sagte','sagten','sagtet','sagten'],aux:'haben',part:'gesagt'},
{v:'sehen',m:'to see',pr:['sehe','siehst','sieht','sehen','seht','sehen'],pa:['sah','sahst','sah','sahen','saht','sahen'],aux:'haben',part:'gesehen'},
{v:'geben',m:'to give',pr:['gebe','gibst','gibt','geben','gebt','geben'],pa:['gab','gabst','gab','gaben','gabt','gaben'],aux:'haben',part:'gegeben'},
{v:'nehmen',m:'to take',pr:['nehme','nimmst','nimmt','nehmen','nehmt','nehmen'],pa:['nahm','nahmst','nahm','nahmen','nahmt','nahmen'],aux:'haben',part:'genommen'},
{v:'finden',m:'to find',pr:['finde','findest','findet','finden','findet','finden'],pa:['fand','fandest','fand','fanden','fandet','fanden'],aux:'haben',part:'gefunden'},
{v:'wissen',m:'to know',pr:['weiß','weißt','weiß','wissen','wisst','wissen'],pa:['wusste','wusstest','wusste','wussten','wusstet','wussten'],aux:'haben',part:'gewusst'},
{v:'denken',m:'to think',pr:['denke','denkst','denkt','denken','denkt','denken'],pa:['dachte','dachtest','dachte','dachten','dachtet','dachten'],aux:'haben',part:'gedacht'},
{v:'bringen',m:'to bring',pr:['bringe','bringst','bringt','bringen','bringt','bringen'],pa:['brachte','brachtest','brachte','brachten','brachtet','brachten'],aux:'haben',part:'gebracht'},
{v:'bleiben',m:'to stay',pr:['bleibe','bleibst','bleibt','bleiben','bleibt','bleiben'],pa:['blieb','bliebst','blieb','blieben','bliebt','blieben'],aux:'sein',part:'geblieben'},
{v:'sprechen',m:'to speak',pr:['spreche','sprichst','spricht','sprechen','sprecht','sprechen'],pa:['sprach','sprachst','sprach','sprachen','spracht','sprachen'],aux:'haben',part:'gesprochen'},
{v:'fragen',m:'to ask',pr:['frage','fragst','fragt','fragen','fragt','fragen'],pa:['fragte','fragtest','fragte','fragten','fragtet','fragten'],aux:'haben',part:'gefragt'},
{v:'arbeiten',m:'to work',pr:['arbeite','arbeitest','arbeitet','arbeiten','arbeitet','arbeiten'],pa:['arbeitete','arbeitetest','arbeitete','arbeiteten','arbeitetet','arbeiteten'],aux:'haben',part:'gearbeitet'},
{v:'essen',m:'to eat',pr:['esse','isst','isst','essen','esst','essen'],pa:['aß','aßest','aß','aßen','aßt','aßen'],aux:'haben',part:'gegessen'},
{v:'trinken',m:'to drink',pr:['trinke','trinkst','trinkt','trinken','trinkt','trinken'],pa:['trank','trankst','trank','tranken','trankt','tranken'],aux:'haben',part:'getrunken'},
{v:'schlafen',m:'to sleep',pr:['schlafe','schläfst','schläft','schlafen','schlaft','schlafen'],pa:['schlief','schliefst','schlief','schliefen','schlieft','schliefen'],aux:'haben',part:'geschlafen'},
{v:'fahren',m:'to drive',pr:['fahre','fährst','fährt','fahren','fahrt','fahren'],pa:['fuhr','fuhrst','fuhr','fuhren','fuhrt','fuhren'],aux:'sein',part:'gefahren'},
{v:'laufen',m:'to walk / run',pr:['laufe','läufst','läuft','laufen','lauft','laufen'],pa:['lief','liefst','lief','liefen','lieft','liefen'],aux:'sein',part:'gelaufen'},
{v:'kaufen',m:'to buy',pr:['kaufe','kaufst','kauft','kaufen','kauft','kaufen'],pa:['kaufte','kauftest','kaufte','kauften','kauftet','kauften'],aux:'haben',part:'gekauft'},
{v:'brauchen',m:'to need',pr:['brauche','brauchst','braucht','brauchen','braucht','brauchen'],pa:['brauchte','brauchtest','brauchte','brauchten','brauchtet','brauchten'],aux:'haben',part:'gebraucht'},
{v:'helfen',m:'to help',pr:['helfe','hilfst','hilft','helfen','helft','helfen'],pa:['half','halfst','half','halfen','halft','halfen'],aux:'haben',part:'geholfen'},
{v:'treffen',m:'to meet',pr:['treffe','triffst','trifft','treffen','trefft','treffen'],pa:['traf','trafst','traf','trafen','traft','trafen'],aux:'haben',part:'getroffen'},
{v:'verstehen',m:'to understand',pr:['verstehe','verstehst','versteht','verstehen','versteht','verstehen'],pa:['verstand','verstandest','verstand','verstanden','verstandet','verstanden'],aux:'haben',part:'verstanden'},
{v:'beginnen',m:'to begin',pr:['beginne','beginnst','beginnt','beginnen','beginnt','beginnen'],pa:['begann','begannst','begann','begannen','begannt','begannen'],aux:'haben',part:'begonnen'},
{v:'vergessen',m:'to forget',pr:['vergesse','vergisst','vergisst','vergessen','vergesst','vergessen'],pa:['vergaß','vergaßest','vergaß','vergaßen','vergaßt','vergaßen'],aux:'haben',part:'vergessen'},
{v:'erzählen',m:'to tell',pr:['erzähle','erzählst','erzählt','erzählen','erzählt','erzählen'],pa:['erzählte','erzähltest','erzählte','erzählten','erzähltet','erzählten'],aux:'haben',part:'erzählt'},
{v:'zeigen',m:'to show',pr:['zeige','zeigst','zeigt','zeigen','zeigt','zeigen'],pa:['zeigte','zeigtest','zeigte','zeigten','zeigtet','zeigten'],aux:'haben',part:'gezeigt'},
{v:'fühlen',m:'to feel',pr:['fühle','fühlst','fühlt','fühlen','fühlt','fühlen'],pa:['fühlte','fühltest','fühlte','fühlten','fühltet','fühlten'],aux:'haben',part:'gefühlt'},
{v:'hören',m:'to hear',pr:['höre','hörst','hört','hören','hört','hören'],pa:['hörte','hörtest','hörte','hörten','hörtet','hörten'],aux:'haben',part:'gehört'},
{v:'lernen',m:'to learn',pr:['lerne','lernst','lernt','lernen','lernt','lernen'],pa:['lernte','lerntest','lernte','lernten','lerntet','lernten'],aux:'haben',part:'gelernt'},
{v:'wohnen',m:'to live',pr:['wohne','wohnst','wohnt','wohnen','wohnt','wohnen'],pa:['wohnte','wohntest','wohnte','wohnten','wohntet','wohnten'],aux:'haben',part:'gewohnt'},
{v:'warten',m:'to wait',pr:['warte','wartest','wartet','warten','wartet','warten'],pa:['wartete','wartetest','wartete','warteten','wartetet','warteten'],aux:'haben',part:'gewartet'},
{v:'suchen',m:'to search',pr:['suche','suchst','sucht','suchen','sucht','suchen'],pa:['suchte','suchtest','suchte','suchten','suchtet','suchten'],aux:'haben',part:'gesucht'}];
const aux={haben:['habe','hast','hat','haben','habt','haben'],sein:['bin','bist','ist','sind','seid','sind']};
let verbPerson=0;const verbDate=document.querySelector('#verbDate');const verbState=JSON.parse(localStorage.getItem(VERB_KEY)||'{}');verbDate.value=day;
const norm=s=>s.trim().toLocaleLowerCase('de-DE').replace(/\s+/g,' ');
function dailyVerbs(){const n=Math.floor(new Date(verbDate.value+'T12:00:00Z').getTime()/86400000);const start=((n%7)+7)%7*5;return verbs.slice(start,start+5)}
function verbAnswers(v){return[v.pr[verbPerson],v.pa[verbPerson],`${aux[v.aux][verbPerson]} ${v.part}`]}
function renderVerbs(){const key=`${verbDate.value}-${verbPerson}`;const saved=verbState[key]||{};const box=document.querySelector('#verbCards');box.innerHTML='';dailyVerbs().forEach((v,i)=>{const values=saved[v.v]||['','',''];const card=document.createElement('article');card.className='verb-card';card.innerHTML=`<h3>${i+1}. ${v.v}</h3><span class="meaning">${v.m}</span>${['Präsens','Präteritum','Perfekt'].map((t,j)=>`<label class="verb-field"><span>${t}</span><input data-form="${j}" autocomplete="off" value="${values[j]||''}" placeholder="${j===2?'Hilfsverb + Partizip':'Verbform'}"><small class="verb-answer"></small></label>`).join('')}<button class="check-verb">Antwort prüfen</button>`;card.querySelectorAll('input').forEach((input,j)=>input.addEventListener('input',()=>{if(!verbState[key])verbState[key]={};verbState[key][v.v]=[...card.querySelectorAll('input')].map(x=>x.value);localStorage.setItem(VERB_KEY,JSON.stringify(verbState));input.classList.remove('correct','wrong');input.nextElementSibling.textContent=''}));card.querySelector('.check-verb').addEventListener('click',()=>checkVerb(card,v));box.append(card)});document.querySelector('#verbScore').textContent='0 von 15 Formen richtig'}
function checkVerb(card,v){const answers=verbAnswers(v);card.querySelectorAll('input').forEach((input,i)=>{const ok=norm(input.value)===norm(answers[i]);input.classList.toggle('correct',ok);input.classList.toggle('wrong',!ok);input.nextElementSibling.textContent=ok?'':`Richtig: ${answers[i]}`});const correct=document.querySelectorAll('.verb-card input.correct').length;document.querySelector('#verbScore').textContent=`${correct} von 15 Formen richtig`}
document.querySelectorAll('.person').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.person').forEach(x=>x.classList.remove('active'));btn.classList.add('active');verbPerson=+btn.dataset.person;renderVerbs()}));
verbDate.addEventListener('change',renderVerbs);document.querySelector('#clearVerbs').addEventListener('click',()=>{delete verbState[`${verbDate.value}-${verbPerson}`];localStorage.setItem(VERB_KEY,JSON.stringify(verbState));renderVerbs()});renderVerbs();
const nouns=window.GERMAN_NOUNS;
const articleDate=document.querySelector('#articleDate');const articleState=JSON.parse(localStorage.getItem(ARTICLE_KEY)||'{}');const articleMistakes=JSON.parse(localStorage.getItem(ARTICLE_MISTAKES_KEY)||'{}');articleDate.value=day;
function dailyNouns(){const n=Math.floor(new Date(articleDate.value+'T12:00:00Z').getTime()/86400000);const start=(((n%nouns.length)+nouns.length)%nouns.length);const base=Array.from({length:10},(_,i)=>nouns[(start*10+i)%nouns.length]);const due=Object.entries(articleMistakes).filter(([,v])=>v.count>0&&v.lastDate<articleDate.value).sort((a,b)=>b[1].count-a[1].count).slice(0,3).map(([name])=>nouns.find(x=>x[1]===name)).filter(Boolean);return[...due,...base.filter(x=>!due.some(d=>d[1]===x[1]))].slice(0,10)}
function renderArticles(){const saved=articleState[articleDate.value]||{};const box=document.querySelector('#articleCards');box.innerHTML='';dailyNouns().forEach(([answer,noun,plural],i)=>{const card=document.createElement('article');card.className='article-card';card.dataset.answer=answer;card.dataset.plural=plural||'';card.innerHTML=`<h3>${i+1}. ${noun}</h3><div class="article-choices">${['der','die','das'].map(a=>`<button class="article-choice${saved[noun]===a?' selected':''}" data-article="${a}">${a}</button>`).join('')}</div><small class="article-feedback"></small><small class="article-plural"></small>`;card.querySelectorAll('.article-choice').forEach(btn=>btn.addEventListener('click',()=>{card.querySelectorAll('.article-choice').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');if(!articleState[articleDate.value])articleState[articleDate.value]={};articleState[articleDate.value][noun]=btn.dataset.article;localStorage.setItem(ARTICLE_KEY,JSON.stringify(articleState));card.classList.remove('correct','wrong');card.querySelector('.article-feedback').textContent='';card.querySelector('.article-plural').textContent=''}));box.append(card)});document.querySelector('#articleScore').textContent='Noch nicht geprüft'}
function checkArticles(){let right=0;document.querySelectorAll('.article-card').forEach(card=>{const chosen=card.querySelector('.selected')?.dataset.article;const ok=chosen===card.dataset.answer;const noun=card.querySelector('h3').textContent.replace(/^\d+\.\s*/, '');card.classList.toggle('correct',ok);card.classList.toggle('wrong',!ok);if(ok){right++;if(articleMistakes[noun])articleMistakes[noun].count=Math.max(0,articleMistakes[noun].count-1)}else if(chosen){articleMistakes[noun]={count:(articleMistakes[noun]?.count||0)+1,lastDate:articleDate.value}}card.querySelector('.article-feedback').textContent=ok?'Richtig ✓':`Richtig: ${card.dataset.answer}`;card.querySelector('.article-plural').textContent=card.dataset.plural?`Plural: die ${card.dataset.plural}`:''});localStorage.setItem(ARTICLE_MISTAKES_KEY,JSON.stringify(articleMistakes));document.querySelector('#articleScore').textContent=`${right} von 10 richtig`}
articleDate.addEventListener('change',renderArticles);document.querySelector('#checkArticles').addEventListener('click',checkArticles);document.querySelector('#clearArticles').addEventListener('click',()=>{delete articleState[articleDate.value];localStorage.setItem(ARTICLE_KEY,JSON.stringify(articleState));renderArticles()});renderArticles();
render();save();
