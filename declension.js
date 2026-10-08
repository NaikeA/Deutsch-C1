(()=>{
'use strict';
const section=document.querySelector('#deklination');
if(!section)return;
const STORAGE_KEY='deutsch-c1-declension-v1';
const COUNT_KEY='deutsch-c1-declension-count-v1';
const categories={
  mixed:'Gemischt',
  articles:'Artikel',
  groups:'Nominalgruppe',
  possessives:'Possessivartikel',
  adjectives:'Adjektive als Attribute'
};
const caseNames={nom:'Nominativ',acc:'Akkusativ',dat:'Dativ',gen:'Genitiv'};
const genders={m:'Maskulin',f:'Feminin',n:'Neutrum',p:'Plural'};
const definite={
  nom:{m:'der',f:'die',n:'das',p:'die'},acc:{m:'den',f:'die',n:'das',p:'die'},
  dat:{m:'dem',f:'der',n:'dem',p:'den'},gen:{m:'des',f:'der',n:'des',p:'der'}
};
const indefinite={
  nom:{m:'ein',f:'eine',n:'ein'},acc:{m:'einen',f:'eine',n:'ein'},
  dat:{m:'einem',f:'einer',n:'einem'},gen:{m:'eines',f:'einer',n:'eines'}
};
const adjectiveEndings={
  definite:{nom:{m:'e',f:'e',n:'e',p:'en'},acc:{m:'en',f:'e',n:'e',p:'en'},dat:{m:'en',f:'en',n:'en',p:'en'},gen:{m:'en',f:'en',n:'en',p:'en'}},
  indefinite:{nom:{m:'er',f:'e',n:'es'},acc:{m:'en',f:'e',n:'es'},dat:{m:'en',f:'en',n:'en'},gen:{m:'en',f:'en',n:'en'}},
  possessive:{nom:{m:'er',f:'e',n:'es',p:'en'},acc:{m:'en',f:'e',n:'es',p:'en'},dat:{m:'en',f:'en',n:'en',p:'en'},gen:{m:'en',f:'en',n:'en',p:'en'}},
  none:{nom:{m:'er',f:'e',n:'es',p:'e'},acc:{m:'en',f:'e',n:'es',p:'e'},dat:{m:'em',f:'er',n:'em',p:'en'},gen:{m:'en',f:'er',n:'en',p:'er'}}
};
const possessiveEndings={
  nom:{m:'',f:'e',n:'',p:'e'},acc:{m:'en',f:'e',n:'',p:'e'},
  dat:{m:'em',f:'er',n:'em',p:'en'},gen:{m:'es',f:'er',n:'es',p:'er'}
};
const owners=[
  {cue:'ich',stem:'mein'},{cue:'du',stem:'dein'},{cue:'er',stem:'sein'},
  {cue:'sie (Singular)',stem:'ihr'},{cue:'wir',stem:'unser'},{cue:'ihr',stem:'euer',combine:e=>e?('eur'+e):'euer'}
];
const nounDefinitions={
  m:[
    ['Plan','Plan','Plan','Plans'],['Bericht','Bericht','Bericht','Berichts'],
    ['Vorschlag','Vorschlag','Vorschlag','Vorschlags'],['Vertrag','Vertrag','Vertrag','Vertrags'],
    ['Prozess','Prozess','Prozess','Prozesses'],['Termin','Termin','Termin','Termins']
  ],
  f:[
    ['Methode','Methode','Methode','Methode'],['Aufgabe','Aufgabe','Aufgabe','Aufgabe'],
    ['Entscheidung','Entscheidung','Entscheidung','Entscheidung'],['Strategie','Strategie','Strategie','Strategie'],
    ['Lösung','Lösung','Lösung','Lösung'],['Anforderung','Anforderung','Anforderung','Anforderung']
  ],
  n:[
    ['Projekt','Projekt','Projekt','Projekts'],['System','System','System','Systems'],
    ['Ergebnis','Ergebnis','Ergebnis','Ergebnisses'],['Konzept','Konzept','Konzept','Konzepts'],
    ['Angebot','Angebot','Angebot','Angebots'],['Verfahren','Verfahren','Verfahren','Verfahrens']
  ],
  p:[
    ['Daten','Daten','Daten','Daten'],['Ergebnisse','Ergebnisse','Ergebnissen','Ergebnisse'],
    ['Anforderungen','Anforderungen','Anforderungen','Anforderungen'],['Unterlagen','Unterlagen','Unterlagen','Unterlagen'],
    ['Prozesse','Prozesse','Prozessen','Prozesse'],['Ziele','Ziele','Zielen','Ziele']
  ]
};
const nouns=Object.entries(nounDefinitions).flatMap(([gender,items])=>items.map(([nom,acc,dat,gen])=>({
  gender,
  forms:{nom,acc,dat,gen},
  frame:{
    nom:value=>`${value} ${gender==='p'?'sind':'ist'} heute besonders wichtig.`,
    acc:value=>`Wir berücksichtigen ${value} bei der Planung.`,
    dat:value=>`Wir beschäftigen uns ausführlich mit ${value}.`,
    gen:value=>`Die Details ${value} sind dokumentiert.`
  }
})));
const cases=['nom','acc','dat','gen'];
const exercises=[];
const add=(category,id,prompt,answer,explanation)=>exercises.push({category,id,prompt,answer,explanation});
for(const noun of nouns){
  for(const grammaticalCase of cases){
    const gender=noun.gender,caseLabel=caseNames[grammaticalCase],genderLabel=genders[gender];
    const defArticle=definite[grammaticalCase][gender];
    const defAdj='wichtig'+adjectiveEndings.definite[grammaticalCase][gender];
    const nounForm=noun.forms[grammaticalCase];
    add('articles',`art-def-${grammaticalCase}-${gender}`,noun.frame[grammaticalCase](`___ ${defAdj} ${nounForm}`),defArticle,`${caseLabel}, ${genderLabel}: bestimmter Artikel „${defArticle}“.`);
    add('groups',`group-def-${grammaticalCase}-${gender}`,noun.frame[grammaticalCase]('___')+` (bestimmt · wichtig · ${noun.forms.nom})`,`${defArticle} ${defAdj} ${nounForm}`,`Nominalgruppe im ${caseLabel}: Artikel + Adjektivendung + passende Nomenform.`);
    add('adjectives',`adj-def-${grammaticalCase}-${gender}`,noun.frame[grammaticalCase](`${defArticle} wichtig___ ${nounForm}`),adjectiveEndings.definite[grammaticalCase][gender],`Nach dem bestimmten Artikel lautet die Adjektivendung im ${caseLabel} ${genderLabel}: -${adjectiveEndings.definite[grammaticalCase][gender]}.`);
    if(gender!=='p'){
      const indArticle=indefinite[grammaticalCase][gender];
      const indAdj='wichtig'+adjectiveEndings.indefinite[grammaticalCase][gender];
      add('articles',`art-ind-${grammaticalCase}-${gender}`,noun.frame[grammaticalCase](`___ ${indAdj} ${nounForm}`),indArticle,`${caseLabel}, ${genderLabel}: unbestimmter Artikel „${indArticle}“.`);
      add('groups',`group-ind-${grammaticalCase}-${gender}`,noun.frame[grammaticalCase]('___')+` (unbestimmt · wichtig · ${noun.forms.nom})`,`${indArticle} ${indAdj} ${nounForm}`,`Nominalgruppe im ${caseLabel}: unbestimmter Artikel + gemischte Adjektivendung + Nomen.`);
      add('adjectives',`adj-ind-${grammaticalCase}-${gender}`,noun.frame[grammaticalCase](`${indArticle} wichtig___ ${nounForm}`),adjectiveEndings.indefinite[grammaticalCase][gender],`Nach dem unbestimmten Artikel lautet die Adjektivendung im ${caseLabel} ${genderLabel}: -${adjectiveEndings.indefinite[grammaticalCase][gender]}.`);
    }
    const strongEnding=adjectiveEndings.none[grammaticalCase][gender];
    add('adjectives',`adj-strong-${grammaticalCase}-${gender}`,noun.frame[grammaticalCase](`wichtig___ ${nounForm}`),strongEnding,`Ohne Artikel trägt das Adjektiv die starke Endung -${strongEnding} (${caseLabel}, ${genderLabel}).`);
    for(const owner of owners){
      const ending=possessiveEndings[grammaticalCase][gender];
      const answer=owner.combine?owner.combine(ending):owner.stem+ending;
      const possAdj='wichtig'+adjectiveEndings.possessive[grammaticalCase][gender];
      add('possessives',`poss-${owner.cue}-${grammaticalCase}-${gender}`,noun.frame[grammaticalCase](`___ ${possAdj} ${nounForm}`)+` (Besitzer: ${owner.cue})`,answer,`Possessivartikel im ${caseLabel} ${genderLabel}: „${answer}“.`);
    }
  }
}
const state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
const dateInput=document.querySelector('#declensionDate');
const countSelect=document.querySelector('#declensionCount');
const cards=document.querySelector('#declensionCards');
const score=document.querySelector('#declensionScore');
const progress=document.querySelector('#declensionProgress');
let activeCategory='mixed';
const today=()=>{
  const now=new Date();
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`
};
dateInput.value=today();
countSelect.value=localStorage.getItem(COUNT_KEY)||'5';
const hash=value=>{let h=2166136261;for(const char of value){h^=char.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0};
const normalize=value=>String(value||'').trim().toLocaleLowerCase('de-DE').replace(/\s+/g,' ');
function pool(){
  if(activeCategory==='mixed')return Object.keys(categories).filter(key=>key!=='mixed').flatMap(category=>exercises.filter(item=>item.category===category));
  return exercises.filter(item=>item.category===activeCategory)
}
function currentExercises(){
  const source=pool(),amount=Number(countSelect.value),seed=hash(dateInput.value+'|'+activeCategory);
  const chosen=[],used=new Set();
  for(let index=0;chosen.length<amount&&index<source.length*2;index++){
    const position=(seed+index*37+Math.imul(index,index)*11)%source.length;
    if(!used.has(position)){used.add(position);chosen.push(source[position])}
  }
  return chosen
}
function stateKey(){return dateInput.value+'|'+activeCategory}
function entries(){if(!state[stateKey()])state[stateKey()]={};return state[stateKey()]}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function render(){
  const saved=entries(),list=currentExercises();
  cards.innerHTML='';
  list.forEach((item,index)=>{
    const entry=saved[item.id]||{};
    const card=document.createElement('article');
    card.className='declension-card';
    card.innerHTML=`<p class="declension-meta">${categories[item.category]} · AUFGABE ${index+1}</p><h3>${item.prompt}</h3><label><span>Lösung einsetzen</span><input type="text" autocomplete="off" spellcheck="false" value="${String(entry.answer||'').replace(/&/g,'&amp;').replace(/"/g,'&quot;')}" placeholder="Fehlende Form"></label><p class="declension-feedback" aria-live="polite"></p><div class="declension-rule" hidden><b>Grammatik:</b> ${item.explanation}</div>`;
    const input=card.querySelector('input');
    input.addEventListener('input',()=>{
      saved[item.id]={answer:input.value,checked:false};
      save();
      card.classList.remove('correct','wrong');
      card.querySelector('.declension-feedback').textContent='';
      card.querySelector('.declension-rule').hidden=true;
      updateProgress()
    });
    if(entry.checked)mark(card,item,entry.answer);
    cards.append(card)
  });
  score.textContent='Noch nicht geprüft';
  updateProgress()
}
function mark(card,item,value){
  const correct=normalize(value)===normalize(item.answer);
  card.classList.toggle('correct',correct);
  card.classList.toggle('wrong',!correct);
  card.querySelector('.declension-feedback').textContent=correct?'Richtig ✓':`Richtig: ${item.answer}`;
  card.querySelector('.declension-rule').hidden=false;
  return correct
}
function updateProgress(){
  const saved=entries(),list=currentExercises();
  const answered=list.filter(item=>String(saved[item.id]?.answer||'').trim()).length;
  progress.textContent=`${answered} von ${list.length} beantwortet`
}
document.querySelectorAll('[data-declension-category]').forEach(button=>button.addEventListener('click',()=>{
  activeCategory=button.dataset.declensionCategory;
  document.querySelectorAll('[data-declension-category]').forEach(item=>item.classList.toggle('active',item===button));
  render()
}));
countSelect.addEventListener('change',()=>{localStorage.setItem(COUNT_KEY,countSelect.value);render()});
dateInput.addEventListener('change',render);
document.querySelector('#checkDeclension').addEventListener('click',()=>{
  const saved=entries(),list=currentExercises();
  let correct=0;
  [...cards.children].forEach((card,index)=>{
    const item=list[index],input=card.querySelector('input');
    saved[item.id]={answer:input.value,checked:true};
    const isCorrect=mark(card,item,input.value);
    if(isCorrect){
      correct++;
      if(dateInput.value===today()&&typeof window.recordDailyProgress==='function'){
        window.recordDailyProgress('Grammatik',`declension:${dateInput.value}:${item.id}`,1,2)
      }
    }
  });
  save();
  score.textContent=`${correct} von ${list.length} richtig`
});
document.querySelector('#clearDeclension').addEventListener('click',()=>{
  delete state[stateKey()];
  save();
  render()
});
render();
window.DECLENSION_EXERCISE_COUNT=exercises.length;
window.addEventListener('load',()=>{
  if(typeof window.recordDailyProgress!=='function')return;
  const lookup=new Map(exercises.map(item=>[item.id,item]));
  Object.entries(state).filter(([key])=>key.startsWith(today()+'|')).forEach(([,saved])=>{
    Object.entries(saved||{}).forEach(([id,entry])=>{
      const item=lookup.get(id);
      if(item&&entry?.checked&&normalize(entry.answer)===normalize(item.answer)){
        window.recordDailyProgress('Grammatik',`declension:${today()}:${id}`,1,2)
      }
    })
  })
});
})();
