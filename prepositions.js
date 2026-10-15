(()=>{
'use strict';
const section=document.querySelector('#praepositionen');
if(!section)return;
const STORAGE_KEY='deutsch-c1-prepositions-v1';
const COUNT_KEY='deutsch-c1-preposition-count-v1';
const categories={mixed:'Gemischt',acc:'Mit Akkusativ',dat:'Mit Dativ',gen:'Mit Genitiv',two:'Akkusativ oder Dativ'};
const items=[];
const add=(category,prompt,answer,explanation,accepted=[])=>items.push({id:`prep-${category}-${items.filter(x=>x.category===category).length+1}`,category,prompt,answer,accepted:[answer,...accepted],explanation});
[
['Ich warte ___ Bus.','auf den','„warten auf“ verlangt den Akkusativ.'],
['Wir sprechen ___ neuen Termin.','über den','„sprechen über“ verlangt den Akkusativ.'],
['Sie bewirbt sich ___ Stelle als Projektleiterin.','um die','„sich bewerben um“ verlangt den Akkusativ.'],
['Er kümmert sich ___ technischen Bericht.','um den','„sich kümmern um“ verlangt den Akkusativ.'],
['Bitte gehen Sie ___ Flur entlang.','durch den','„durch“ steht immer mit Akkusativ.'],
['Wir fahren morgen ___ Österreich.','durch','„durch“ steht immer mit Akkusativ.'],
['Das Geschenk ist ___ meine Kollegin.','für','„für“ steht immer mit Akkusativ.'],
['Ich kann das Projekt nicht ___ deine Unterstützung abschließen.','ohne','„ohne“ steht immer mit Akkusativ.'],
['Die Mannschaft spielt heute ___ den Tabellenführer.','gegen','„gegen“ steht immer mit Akkusativ.'],
['Der Zug fährt ___ München.','bis','„bis“ steht hier ohne Artikel und mit Akkusativ.'],
['Wir gehen ___ den Park herum.','um','„um“ steht immer mit Akkusativ.'],
['Die Kosten liegen ___ 2.000 Euro.','unter','Bei einer Grenze steht „unter“ mit Akkusativ.'],
['Der Vortrag dauert ___ eine Stunde.','über','Bei einer Zeitspanne steht „über“ mit Akkusativ.'],
['Ich entscheide mich ___ das günstigere Angebot.','für','„sich entscheiden für“ verlangt den Akkusativ.'],
['Viele Beschäftigte protestieren ___ die neue Regelung.','gegen','„protestieren gegen“ verlangt den Akkusativ.'],
['Wir diskutieren ___ mögliche Lösung.','über eine','„diskutieren über“ verlangt den Akkusativ.'],
['Die Kinder laufen ___ das Haus.','um','„um“ steht immer mit Akkusativ.'],
['Er hat den Bericht ___ jeden Kommentar weitergeleitet.','ohne','„ohne“ steht immer mit Akkusativ.'],
['Die neue Richtlinie gilt ___ alle Mitarbeitenden.','für','„für“ steht immer mit Akkusativ.'],
['Ich tausche den defekten Drucker ___ ein neues Gerät.','gegen','„etwas gegen etwas tauschen“ verlangt den Akkusativ.']
].forEach(x=>add('acc',...x));
[
['Ich fahre jeden Morgen ___ Bus zur Arbeit.','mit dem','„mit“ steht immer mit Dativ.'],
['Sie arbeitet seit drei Jahren ___ Unternehmen.','bei dem','„bei“ steht immer mit Dativ. Auch „beim Unternehmen“ ist möglich.',['beim']],
['Nach dem Gespräch gehe ich direkt ___ Hause.','nach','In der festen Verbindung „nach Hause“ steht kein Artikel.'],
['Wir kommen gerade ___ Besprechung.','aus der','„aus“ steht immer mit Dativ.'],
['Er wohnt ___ seinen Eltern.','bei','„bei“ steht immer mit Dativ.'],
['Das Café liegt direkt ___ Bahnhof.','gegenüber dem','„gegenüber“ steht mit Dativ. Auch die Stellung „dem Bahnhof gegenüber“ ist möglich.'],
['Ich habe die Nachricht ___ meiner Kollegin erhalten.','von','„von“ steht immer mit Dativ.'],
['Sie fährt morgen ___ ihrer Schwester.','zu','„zu“ steht immer mit Dativ.'],
['___ Unfall fährt er vorsichtiger.','Seit dem','„seit“ steht immer mit Dativ.'],
['___ langen Arbeitstag brauche ich Ruhe.','Nach dem','„nach“ steht immer mit Dativ.'],
['Das Ergebnis entspricht ___ Erwartungen.','den','„entsprechen“ verlangt den Dativ; hier fehlt nur der Artikel.'],
['Wir handeln ___ den geltenden Vorschriften.','nach','„nach“ steht mit Dativ und bedeutet hier „gemäß“.'],
['___ meiner Erfahrung dauert die Prüfung zwei Stunden.','Nach','„nach“ steht mit Dativ; ohne Artikel: „nach meiner Erfahrung“.'],
['Das Problem lässt sich ___ einfachen Maßnahme lösen.','mit einer','„mit“ steht immer mit Dativ.'],
['Der Bericht stammt ___ vergangenen Jahr.','aus dem','„aus“ steht immer mit Dativ.'],
['Alle Teilnehmenden außer ___ neuen Kollegen waren pünktlich.','dem','„außer“ steht gewöhnlich mit Dativ.'],
['Ich arbeite heute ___ zu Hause aus.','von','Die feste Verbindung lautet „von zu Hause aus“.'],
['Sie sitzt ___ ihrem Bruder im Zug.','neben','„neben“ beschreibt hier einen Ort und steht daher mit Dativ.'],
['Wir treffen uns ___ Mittagspause.','in der','„in“ beschreibt hier einen Zeitraum ohne Richtung und steht mit Dativ.'],
['Das Büro ist nur wenige Minuten ___ Bahnhof entfernt.','vom','„von“ steht mit Dativ; „von dem“ wird zu „vom“.',['von dem']]
].forEach(x=>add('dat',...x));
[
['___ schlechten Wetters wurde die Veranstaltung abgesagt.','Wegen des','„wegen“ wird in der Standardsprache mit Genitiv verwendet.'],
['___ hohen Kosten wurde das Projekt verschoben.','Aufgrund der','„aufgrund“ steht mit Genitiv.'],
['___ des Gebäudes befindet sich ein kleiner Park.','Außerhalb','„außerhalb“ steht mit Genitiv.'],
['___ der Arbeitszeit sind private Anrufe erlaubt.','Außerhalb','„außerhalb“ steht mit Genitiv.'],
['___ des Dorfes gibt es keinen Mobilfunkempfang.','Innerhalb','„innerhalb“ steht mit Genitiv.'],
['___ der nächsten zwei Wochen erhalten Sie eine Antwort.','Innerhalb','„innerhalb“ steht mit Genitiv.'],
['___ eines technischen Fehlers fiel die Anlage aus.','Infolge','„infolge“ steht mit Genitiv.'],
['___ der Bauarbeiten ist die Straße gesperrt.','Während','„während“ steht in der Standardsprache mit Genitiv.'],
['___ des Meetings blieb mein Telefon ausgeschaltet.','Während','„während“ steht mit Genitiv.'],
['___ des ursprünglichen Plans wurde eine einfachere Lösung umgesetzt.','Anstelle','„anstelle“ steht mit Genitiv.'],
['___ einer schriftlichen Bestätigung reicht eine E-Mail.','Statt','„statt“ steht in der Standardsprache mit Genitiv.'],
['___ der neuen Erkenntnisse müssen wir den Plan ändern.','Angesichts','„angesichts“ steht mit Genitiv.'],
['___ des engen Zeitplans brauchen wir klare Prioritäten.','Angesichts','„angesichts“ steht mit Genitiv.'],
['___ aller Schwierigkeiten wurde das Ziel erreicht.','Trotz','„trotz“ steht in der Standardsprache mit Genitiv.'],
['___ seiner Erfahrung machte er einen vermeidbaren Fehler.','Trotz','„trotz“ steht mit Genitiv.'],
['___ des hohen Verkehrsaufkommens kam der Bus pünktlich an.','Ungeachtet','„ungeachtet“ steht mit Genitiv.'],
['___ des Flusses führt ein schmaler Radweg.','Entlang','Nachgestellt kann „entlang“ mit Genitiv verwendet werden; üblicher ist hier „entlang des Flusses“.'],
['___ des Vertrags gelten besondere Kündigungsfristen.','Kraft','„kraft“ steht in formeller Sprache mit Genitiv.'],
['___ neuer Daten wurde die Entscheidung überprüft.','Mithilfe','„mithilfe“ steht mit Genitiv.'],
['___ des Berichts lässt sich die Entwicklung gut nachvollziehen.','Anhand','„anhand“ steht mit Genitiv.']
].forEach(x=>add('gen',...x));
[
['Ich stelle die Tasse ___ Tisch.','auf den','Eine Bewegung mit Ziel beantwortet „wohin?“: Akkusativ.'],
['Die Tasse steht ___ Tisch.','auf dem','Ein fester Ort beantwortet „wo?“: Dativ.'],
['Wir hängen das Bild ___ Wand.','an die','Eine Bewegung mit Ziel beantwortet „wohin?“: Akkusativ.'],
['Das Bild hängt ___ Wand.','an der','Ein fester Ort beantwortet „wo?“: Dativ.'],
['Sie legt die Unterlagen ___ Schreibtisch.','auf den','„legen“ bezeichnet eine Bewegung zu einem Ziel: Akkusativ.'],
['Die Unterlagen liegen ___ Schreibtisch.','auf dem','„liegen“ bezeichnet einen Ort: Dativ.'],
['Er stellt den Koffer ___ Bett.','unter das','Ziel einer Bewegung: Akkusativ.'],
['Der Koffer steht ___ Bett.','unter dem','Fester Ort: Dativ.'],
['Ich gehe ___ Büro.','in das','Richtung in einen Raum: Akkusativ. Auch „ins Büro“ ist möglich.',['ins']],
['Ich arbeite heute ___ Büro.','in dem','Ort ohne Richtungswechsel: Dativ. Auch „im Büro“ ist möglich.',['im']],
['Das Kind läuft ___ Garten.','in den','Bewegung mit Ziel: Akkusativ.'],
['Das Kind spielt ___ Garten.','in dem','Ort ohne Richtungswechsel: Dativ. Auch „im Garten“ ist möglich.',['im']],
['Wir setzen uns ___ Fenster.','an das','Bewegung zu einem Platz: Akkusativ. Auch „ans Fenster“ ist möglich.',['ans']],
['Wir sitzen ___ Fenster.','an dem','Fester Ort: Dativ. Auch „am Fenster“ ist möglich.',['am']],
['Sie schiebt den Stuhl ___ Tür.','vor die','Bewegung mit Ziel: Akkusativ.'],
['Der Stuhl steht ___ Tür.','vor der','Fester Ort: Dativ.'],
['Ich lege das Notizbuch ___ Computer und den Drucker.','zwischen den','Bei einer Platzierung fragt man „wohin?“; beide Bezugspunkte stehen im Akkusativ.'],
['Das Notizbuch liegt ___ Computer und dem Drucker.','zwischen dem','Bei einem festen Ort fragt man „wo?“; beide Bezugspunkte stehen im Dativ.'],
['Er hängt die Jacke ___ Stuhl.','über den','Bewegung mit Ziel: Akkusativ.'],
['Die Jacke hängt ___ Stuhl.','über dem','Fester Ort: Dativ.']
].forEach(x=>add('two',...x));

const categoryButtons=[...section.querySelectorAll('[data-preposition-category]')];
const countSelect=section.querySelector('#prepositionCount');
const dateInput=section.querySelector('#prepositionDate');
const cards=section.querySelector('#prepositionCards');
const progress=section.querySelector('#prepositionProgress');
const score=section.querySelector('#prepositionScore');
let activeCategory='mixed';
let state={};
try{state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{}}catch(error){state={}}
const today=()=>new Date().toLocaleDateString('sv-SE');
dateInput.value=today();
countSelect.value=localStorage.getItem(COUNT_KEY)||'5';
if(!countSelect.value)countSelect.value='5';
const normalize=value=>String(value||'').trim().toLocaleLowerCase('de-DE').replace(/[.!?]$/,'').replace(/\s+/g,' ');
const hash=value=>{let h=2166136261;for(const char of value){h^=char.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const seededShuffle=(array,key)=>{const result=[...array];let seed=hash(key);for(let i=result.length-1;i>0;i--){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;const j=(seed>>>0)%(i+1);[result[i],result[j]]=[result[j],result[i]]}return result};
const stateKey=()=>`${dateInput.value}|${activeCategory}|${countSelect.value}`;
const entries=()=>state[stateKey()]||(state[stateKey()]={});
const save=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
function currentExercises(){
 const pool=activeCategory==='mixed'?items:items.filter(item=>item.category===activeCategory);
 return seededShuffle(pool,`${dateInput.value}|${activeCategory}|prepositions-v1`).slice(0,+countSelect.value||5)
}
function isCorrect(item,value){const n=normalize(value);return item.accepted.some(answer=>normalize(answer)===n)}
function updateProgress(){
 const saved=entries(),list=currentExercises();
 const answered=list.filter(item=>normalize(saved[item.id]?.answer)).length;
 progress.textContent=`${answered} von ${list.length} beantwortet`
}
function render(){
 const list=currentExercises(),saved=entries();
 cards.innerHTML='';
 list.forEach((item,index)=>{
   const entry=saved[item.id]||{};
   const card=document.createElement('article');
   card.className='preposition-card';
   card.innerHTML=`<p class="preposition-meta">${categories[item.category]} · AUFGABE ${index+1}</p><h3>${item.prompt}</h3><label><span class="sr-only">Fehlende Präposition oder Wortgruppe</span><input type="text" autocomplete="off" spellcheck="false" placeholder="Präposition und Artikel" value="${String(entry.answer||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;')}"></label><p class="preposition-feedback" hidden></p><div class="preposition-rule" hidden><b>Grammatik:</b><span>${item.explanation}</span></div>`;
   const input=card.querySelector('input');
   input.addEventListener('input',()=>{saved[item.id]={answer:input.value,checked:false};save();card.classList.remove('correct','wrong');card.querySelector('.preposition-feedback').hidden=true;card.querySelector('.preposition-rule').hidden=true;updateProgress()});
   if(entry.checked){mark(card,item,entry.answer)}
   cards.appendChild(card)
 });
 score.textContent='Noch nicht geprüft';
 updateProgress()
}
function mark(card,item,value){
 const correct=isCorrect(item,value);
 card.classList.toggle('correct',correct);card.classList.toggle('wrong',!correct);
 const feedback=card.querySelector('.preposition-feedback');
 feedback.hidden=false;feedback.textContent=correct?'Richtig ✓':`Richtig: ${item.answer}`;
 card.querySelector('.preposition-rule').hidden=false;
 return correct
}
categoryButtons.forEach(button=>button.addEventListener('click',()=>{
 activeCategory=button.dataset.prepositionCategory;
 categoryButtons.forEach(item=>item.classList.toggle('active',item===button));
 render()
}));
countSelect.addEventListener('change',()=>{localStorage.setItem(COUNT_KEY,countSelect.value);render()});
dateInput.addEventListener('change',render);
section.querySelector('#checkPrepositions').addEventListener('click',()=>{
 const saved=entries(),list=currentExercises();let correct=0;
 [...cards.children].forEach((card,index)=>{
   const item=list[index],input=card.querySelector('input');
   saved[item.id]={answer:input.value,checked:true};
   if(mark(card,item,input.value)){
     correct++;
     if(dateInput.value===today()&&typeof window.recordDailyProgress==='function')window.recordDailyProgress('Grammatik',`preposition:${dateInput.value}:${item.id}`,1,2)
   }
 });
 save();score.textContent=`${correct} von ${list.length} richtig`
});
section.querySelector('#clearPrepositions').addEventListener('click',()=>{delete state[stateKey()];save();render()});
render();
window.PREPOSITION_EXERCISE_COUNT=items.length;
window.addEventListener('load',()=>{
 if(typeof window.recordDailyProgress!=='function')return;
 const lookup=new Map(items.map(item=>[item.id,item]));
 Object.entries(state).filter(([key])=>key.startsWith(today()+'|')).forEach(([,saved])=>Object.entries(saved||{}).forEach(([id,entry])=>{
   const item=lookup.get(id);if(item&&entry?.checked&&isCorrect(item,entry.answer))window.recordDailyProgress('Grammatik',`preposition:${today()}:${id}`,1,2)
 }))
});
})();