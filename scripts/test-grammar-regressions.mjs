import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const generated=(path,cut,result)=>{
 const source=read(path);
 return vm.runInNewContext(source.slice(0,source.indexOf(cut))+'return '+result+';})();',{
  document:{querySelector:()=>({})}
 });
};
const exercises=generated('declension.js','const state=','exercises');
assert.equal(exercises.length,1176);
assert.equal(new Set(exercises.map(x=>x.id)).size,exercises.length);
assert(exercises.every(x=>!x.id.endsWith('undefined')));
assert(read('declension.js').includes("STORAGE_KEY='deutsch-c1-declension-v2'"));
const prep=generated('prepositions.js','const categoryButtons=','{items,articleGap,phraseMetadata}');
assert.equal(prep.items.length,4000);
assert.equal(new Set(prep.items.map(x=>x.id)).size,4000);
for(const [phrase,number] of [
 ['innerhalb weniger Stunden','Plural'],['innerhalb der nächsten zwei Wochen','Plural'],
 ['für meinen Kollegen','Singular'],['ohne meinen erfahrenen Kollegen','Singular'],
 ['außer meiner direkten Vorgesetzten','Singular'],['um unsere neuen Mitarbeitenden','Plural'],
 ['während des Meetings','Singular'],['von den zuständigen Kollegen','Plural']
]){
 const items=prep.items.filter(x=>x.answer===phrase);
 assert(items.length,phrase);
 assert(items.every(x=>x.prompt.includes(' · '+number)),phrase);
}
assert(prep.items.filter(x=>x.answer==='außer meiner direkten Vorgesetzten').every(x=>x.prompt.includes('Feminin')));
assert.equal(prep.phraseMetadata.size,167);
for(const [phrase,kase,answer] of [
 ['zwischen den Computer und den Drucker','acc','den / den'],
 ['zwischen der Tür und dem Fenster','dat','der / dem'],
 ['zwischen die beiden Schränke','acc','die'],
 ['zwischen den beiden Schränken','dat','den'],
 ['im Büro','dat','dem'],['ins Büro','acc','das']
]){
 const item=prep.articleGap('Das Gerät ist ___',phrase,phrase.startsWith('zwischen')?'zwischen':'in',kase);
 assert.equal(item.answer,answer);
 assert.equal((item.prompt.match(/___/g)||[]).length,answer.includes('/')?2:1);
 if(answer.includes('/'))assert(item.accepted.includes(answer.replace(' / ',' ')));
}
const sw=read('service-worker.js'),html=read('index.html');
const core=vm.runInNewContext(sw.slice(0,sw.indexOf("self.addEventListener"))+'CORE');
for(const [,url] of html.matchAll(/(?:src|href)="([^"]+\.(?:js|css)\?v=\d+)"/g))assert(core.includes('./'+url),url);
async function installScenario(fail){
 const handlers={},deleted=[];let skipped=false,claimed=false;
 const context={
  self:{addEventListener:(name,fn)=>handlers[name]=fn,skipWaiting:()=>{skipped=true},
   clients:{claim:()=>{claimed=true}},location:{origin:'https://example.test'}},
  Request:class {constructor(url,options){this.url=url;this.cache=options.cache}},
  caches:{open:async()=>({add:async req=>{
   assert.equal(req.cache,'reload');
   if(fail&&req.url.includes('grammar-expanded'))throw Error('download failed');
  }}),keys:async()=>['deutsch-c1-v86','deutsch-c1-v87','other-app-cache'],delete:async key=>deleted.push(key)}
 };
 vm.runInNewContext(sw,context);
 let pending;
 handlers.install({waitUntil:p=>pending=p});
 if(fail){await assert.rejects(pending);assert.equal(skipped,false);assert.equal(deleted.length,0)}
 else{
  await pending;assert(skipped);
  handlers.activate({waitUntil:p=>pending=p});await pending;
  assert.deepEqual(deleted,['deutsch-c1-v86']);assert(claimed);
 }
}
await installScenario(true);
await installScenario(false);
console.log('Passed: unique IDs, number/gender cues, coordinated blanks, asset versions, safe cache installation.');
