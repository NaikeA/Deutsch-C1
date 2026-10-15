(()=>{
'use strict';
const STORAGE_KEY='deutsch-c1-daily-defaults-v1';
const status=document.querySelector('#dailyDefaultsStatus');
const configurations=[
  {name:'verbs',overview:'#defaultVerbCount',exercise:'#verbCount',storage:'deutsch-c1-verb-count-v1',fallback:'2'},
  {name:'cases',overview:'#defaultCaseCount',exercise:'#caseCount',storage:'deutsch-c1-case-count-v1',fallback:'5'},
  {name:'declension',overview:'#defaultDeclensionCount',exercise:'#declensionCount',storage:'deutsch-c1-declension-count-v1',fallback:'5'},
  {name:'prepositions',overview:'#defaultPrepositionCount',exercise:'#prepositionCount',storage:'deutsch-c1-preposition-count-v1',fallback:'5'}
];
let preferences={};
try{preferences=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')||{}}catch(error){preferences={}}
let statusTimer;
function save(message){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(preferences));
  if(!status||!message)return;
  status.textContent=message;
  clearTimeout(statusTimer);
  statusTimer=setTimeout(()=>{status.textContent='Deine Auswahl gilt auf dieser Website und in der Android-App.'},2200)
}
function validValue(select,value,fallback){
  const wanted=String(value??fallback);
  return [...select.options].some(option=>option.value===wanted)?wanted:fallback
}
function apply(configuration,value,announce=false){
  const overview=document.querySelector(configuration.overview);
  const exercise=document.querySelector(configuration.exercise);
  if(!overview||!exercise)return;
  const next=validValue(exercise,value,configuration.fallback);
  preferences[configuration.name]=next;
  overview.value=next;
  exercise.value=next;
  localStorage.setItem(configuration.storage,next);
  exercise.dispatchEvent(new Event('change',{bubbles:true}));
  save(announce?'Gespeichert ✓ Die tägliche Anzahl wurde sofort übernommen.':'')
}
configurations.forEach(configuration=>{
  const overview=document.querySelector(configuration.overview);
  const exercise=document.querySelector(configuration.exercise);
  if(!overview||!exercise)return;
  const initial=preferences[configuration.name]??configuration.fallback;
  apply(configuration,initial);
  overview.addEventListener('change',()=>apply(configuration,overview.value,true));
  exercise.addEventListener('change',()=>{
    const next=validValue(exercise,exercise.value,configuration.fallback);
    preferences[configuration.name]=next;
    overview.value=next;
    localStorage.setItem(configuration.storage,next);
    save()
  })
});
save();
})();
