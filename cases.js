(function(){
  const exercises=[];
  const shuffledOptions=(options,key)=>{
    const values=[...new Set(options)];
    let seed=2166136261;
    for(const char of key){seed^=char.charCodeAt(0);seed=Math.imul(seed,16777619)}
    for(let i=values.length-1;i>0;i--){seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;const j=(seed>>>0)%(i+1);[values[i],values[j]]=[values[j],values[i]]}
    return values
  };
  const add=(category,prompt,options,answer,explanation)=>{
    const id=`case-natural-v2-${exercises.length+1}`;
    exercises.push({id,category,prompt,options:shuffledOptions(options,`${id}|${category}|${prompt}`),answer,explanation})
  };
  const nouns=[
    ['m','Kollege','colleague','Kollegen'],['f','Kollegin','colleague'],['n','Projekt','project'],['m','Kunde','customer','Kunden'],['f','Chefin','manager'],['n','Team','team'],['m','Arzt','doctor'],['f','Nachbarin','neighbour'],['n','Kind','child'],['m','Freund','friend'],['f','Lehrerin','teacher'],['n','Unternehmen','company'],['m','Mitarbeiter','employee'],['f','Person','person'],['n','Problem','problem'],['m','Projektleiter','project manager'],['f','Abteilung','department'],['n','Büro','office'],['m','Vorschlag','suggestion'],['f','Entscheidung','decision'],['n','Ergebnis','result'],['m','Termin','appointment'],['f','Aufgabe','task'],['n','Gespräch','conversation'],['m','Bericht','report'],['f','E-Mail','email'],['n','Dokument','document'],['m','Plan','plan'],['f','Lösung','solution'],['n','Angebot','offer']
  ];
  const people=nouns.filter(n=>['Kollege','Kollegin','Kunde','Chefin','Arzt','Nachbarin','Kind','Freund','Lehrerin','Mitarbeiter','Person','Projektleiter'].includes(n[1]));
  const adultPeople=people.filter(n=>!['Kind','Person'].includes(n[1]));
  const articleThings=nouns.filter(n=>['Projekt','Problem','Vorschlag','Entscheidung','Ergebnis','Termin','Aufgabe','Gespräch','Bericht','E-Mail','Dokument','Plan','Lösung','Angebot'].includes(n[1]));
  const articleNouns=[...people,...articleThings];
const personAdjectives=['neu','freundlich','zuverlässig','hilfsbereit'];
const thingAdjectives={Projekt:['neu','interessant','wichtig','geplant'],Team:['neu','erfahren','zuverlässig','eingespielt'],Unternehmen:['neu','erfolgreich','bekannt','international'],Problem:['neu','schwierig','dringend','ernst'],Abteilung:['neu','groß','zuständig','klein'],Büro:['neu','klein','hell','modern'],Vorschlag:['neu','interessant','hilfreich','konkret'],Entscheidung:['neu','wichtig','schwierig','endgültig'],Ergebnis:['neu','wichtig','interessant','aktuell'],Termin:['neu','wichtig','geplant','vereinbart'],Aufgabe:['neu','wichtig','schwierig','interessant'],Gespräch:['neu','wichtig','vertraulich','interessant'],Bericht:['neu','wichtig','ausführlich','aktuell'],'E-Mail':['neu','wichtig','ausführlich','aktuell'],Dokument:['neu','wichtig','vertraulich','aktuell'],Plan:['neu','wichtig','detailliert','konkret'],Lösung:['neu','hilfreich','praktisch','einfach'],Angebot:['neu','interessant','günstig','aktuell']};
  const endings={def:{acc:{m:['den','en'],f:['die','e'],n:['das','e']},dat:{m:['dem','en'],f:['der','en'],n:['dem','en']}},ind:{acc:{m:['einen','en'],f:['eine','e'],n:['ein','es']},dat:{m:['einem','en'],f:['einer','en'],n:['einem','en']}}};
  const nounForm=(noun,kase)=>kase!=='nom'&&noun[3]?noun[3]:noun[1];
  const phrase=(noun,adj,kind,kase)=>{const [article,end]=endings[kind][kase][noun[0]];return `${article} ${adj}${end} ${nounForm(noun,kase)}`};
  for(let i=0;i<240;i++){
    const noun=articleNouns[i%articleNouns.length],adj=(thingAdjectives[noun[1]]||personAdjectives)[Math.floor(i/articleNouns.length)%4],kase=i%2?'dat':'acc',kind=Math.floor(i/2)%2?'ind':'def';
    const answer=phrase(noun,adj,kind,kase);const otherCase=kase==='acc'?'dat':'acc';const altKind=kind==='def'?'ind':'def';
    const englishArticle=kind==='def'?'the':/^[aeiou]/i.test(noun[2])?'an':'a';
    const isPerson=people.includes(noun);const prompt=(kase==='acc'?(isPerson?'Ich treffe heute ___.':'Ich sehe mir heute ___ an.'):(isPerson?'Ich spreche heute mit ___.':'Ich beschäftige mich heute mit ___.'))+` Übersetze die Nominalgruppe mit ${kind==='def'?'bestimmtem':'unbestimmtem'} Artikel: (${englishArticle} ${noun[2]}).`;
    const articleHint=kind==='def'?'„the“ verlangt hier den bestimmten Artikel.':'„a/an“ verlangt hier den unbestimmten Artikel.';
    add('Artikel & Endungen',prompt,[answer,phrase(noun,adj,kind,otherCase),phrase(noun,adj,altKind,kase),phrase(noun,adj,altKind,otherCase)],answer,kase==='dat'?`Die Präposition „mit“ verlangt den Dativ. ${articleHint} Richtig ist: ${answer}.`:`„treffen“ und „sich etwas ansehen“ verlangen hier ein Akkusativobjekt. ${articleHint} Richtig ist: ${answer}.`);
  }
  const dativeVerbs=[['helfen','Ich helfe'],['danken','Ich danke'],['folgen','Ich folge'],['vertrauen','Ich vertraue'],['gehören','Das gehört'],['gratulieren','Ich gratuliere'],['antworten','Ich antworte'],['zuhören','Ich höre',' zu'],['widersprechen','Ich widerspreche'],['begegnen','Ich begegne'],['fehlen','Das fehlt'],['zustimmen','Ich stimme',' zu']];
  const accusativeVerbs=[['sehen','Ich sehe'],['besuchen','Ich besuche'],['fragen','Ich frage'],['anrufen','Ich rufe',' an'],['treffen','Ich treffe'],['unterstützen','Ich unterstütze'],['brauchen','Ich brauche'],['kennen','Ich kenne'],['verstehen','Ich verstehe'],['informieren','Ich informiere'],['prüfen','Ich prüfe'],['beobachten','Ich beobachte']];
  const bareArticles={acc:{m:'den',f:'die',n:'das'},dat:{m:'dem',f:'der',n:'dem'}};
  for(let i=0;i<240;i++){
    const dat=i%2===0;const list=dat?dativeVerbs:accusativeVerbs;const verb=list[Math.floor(i/2)%list.length];const noun=adultPeople[(i*7)%adultPeople.length];const kase=dat?'dat':'acc';const article=bareArticles[kase][noun[0]];const answer=`${article} ${nounForm(noun,kase)}`;
    const prompt=`${verb[1]} ___${verb[2]||''}. Welchen Fall verlangt „${verb[0]}“?`;
    const otherCase=kase==='dat'?'acc':'dat';const opts=[answer,`${bareArticles[otherCase][noun[0]]} ${nounForm(noun,otherCase)}`,`die ${nounForm(noun,kase)}`,`das ${nounForm(noun,kase)}`];
    add('Verben & Kasus',prompt,opts,answer,dat?`„${verb[0]}“ verlangt den Dativ: ${answer}.`:`„${verb[0]}“ verlangt den Akkusativ: ${answer}.`);
  }
  const pronouns={acc:{m:'ihn',f:'sie',n:'es'},dat:{m:'ihm',f:'ihr',n:'ihm'}};
  for(let i=0;i<200;i++){
    const noun=adultPeople[(i*11)%adultPeople.length],kase=i%2?'dat':'acc';const article=bareArticles[kase][noun[0]],form=nounForm(noun,kase);const answer=pronouns[kase][noun[0]];const sentence=kase==='dat'?`Ich helfe ${article} ${form}.`:`Ich sehe ${article} ${form}.`;
    add('Pronomen',`${sentence} Ersetze „${article} ${form}“ durch ein Pronomen.`,['ihn','ihm','sie','ihr','es'].sort(()=>.5-(i%3)/3),answer,kase==='dat'?`Das Dativpronomen für dieses Nomen ist „${answer}“: Ich helfe ${answer}.`:`Das Akkusativpronomen ist „${answer}“: Ich sehe ${answer}.`);
  }
  // Curated scene pairs: prepositions are never combined blindly with places.
  const scenes=[
['m','Tisch','auf','Ich lege das Buch','Das Buch liegt',''],
['n','Regal','in','Ich stelle die Vase','Die Vase steht',''],
['f','Wand','an','Ich hänge das Bild','Das Bild hängt',''],
['m','Tisch','unter','Ich schiebe den Karton','Der Karton steht',''],
['f','Tür','über','Ich hänge die Uhr','Die Uhr hängt',''],
['n','Haus','vor','Ich stelle das Fahrrad','Das Fahrrad steht',''],
['m','Schrank','hinter','Ich schiebe den Karton','Der Karton steht',''],
['n','Sofa','neben','Ich stelle die Lampe','Die Lampe steht',''],
['m','Computer','zwischen','Ich lege das Notizbuch','Das Notizbuch liegt',['m','Drucker']],
['n','Auto','zwischen','Ich stelle das Fahrrad','Das Fahrrad steht',['f','Garage']],
['f','Küche','zwischen','Ich stelle den Schrank','Der Schrank steht',['n','Wohnzimmer']],
['f','Tasche','in','Ich lege den Schlüssel','Der Schlüssel liegt',''],
['n','Zimmer','in','Ich stelle den Sessel','Der Sessel steht',''],
['m','Stuhl','auf','Ich lege die Jacke','Die Jacke liegt',''],
['f','Tür','hinter','Ich stelle den Regenschirm','Der Regenschirm steht',''],
['n','Büro','in','Ich bringe die Unterlagen','Die Unterlagen liegen',''],
['m','Schrank','auf','Ich stelle den Korb','Der Korb steht',''],
['n','Bett','unter','Ich schiebe den Koffer','Der Koffer liegt',''],
['f','Lampe','neben','Ich stelle die Vase','Die Vase steht',''],
['m','Spiegel','an','Ich klebe den Zettel','Der Zettel hängt','']
];
  for(let i=0;i<240;i++){
const scene=scenes[Math.floor(i/2)%scenes.length],direction=i%2===0,kase=direction?'acc':'dat',answer=bareArticles[kase][scene[0]];
const second=Array.isArray(scene[5])?` und ${bareArticles[kase][scene[5][0]]} ${scene[5][1]}`:'';
const prompt=`${direction?scene[3]:scene[4]} ${scene[2]} ___ ${scene[1]}${second}. ${direction?'Wohin?':'Wo?'}`;
const caseRule=direction?'Die neue Zielposition verlangt hier den Akkusativ':'Die bestehende Position verlangt hier den Dativ';
const coordination=second?` Beide Bezugspunkte stehen im selben Fall: ${answer} ${scene[1]} und ${bareArticles[kase][scene[5][0]]} ${scene[5][1]}.`:'';
add('Wo oder wohin?',prompt,[answer,'den','dem','der','die','das'],answer,`${caseRule}: ${scene[2]} ${answer} ${scene[1]}${second}.${coordination}`);
  }
  const transferVerbs=['gebe','schicke','zeige','erkläre','bringe','empfehle','leihe','sende','überreiche','verkaufe'];
  const transferObjects={
    gebe:[['m','Bericht'],['n','Dokument'],['m','Schlüssel']],
    schicke:[['f','E-Mail'],['m','Bericht'],['n','Dokument'],['f','Rechnung']],
    zeige:[['m','Bericht'],['m','Plan'],['n','Ergebnis'],['n','Dokument']],
    erkläre:[['m','Plan'],['m','Vorschlag'],['n','Ergebnis']],
    bringe:[['m','Schlüssel'],['n','Dokument'],['m','Bericht']],
    empfehle:[['n','Buch'],['n','Angebot'],['m','Vorschlag']],
    leihe:[['m','Schlüssel'],['n','Buch']],
    sende:[['f','E-Mail'],['m','Bericht'],['f','Rechnung']],
    überreiche:[['m','Bericht'],['n','Dokument'],['m','Schlüssel'],['f','Rechnung']],
    verkaufe:[['n','Fahrrad'],['n','Buch']]
  };
  for(let i=0;i<200;i++){
    const recipient=adultPeople[(i*5)%adultPeople.length],verb=transferVerbs[i%transferVerbs.length],choices=transferObjects[verb],object=choices[Math.floor(i/transferVerbs.length)%choices.length];
    const dat=`${bareArticles.dat[recipient[0]]} ${nounForm(recipient,'dat')}`,acc=`${bareArticles.acc[object[0]]} ${object[1]}`,answer=`${dat} ${acc}`;
    add('Zwei Objekte',`Ich ${verb} ___ . Wähle Dativperson + Akkusativsache.`,[answer,`${bareArticles.acc[recipient[0]]} ${nounForm(recipient,'acc')} ${bareArticles.dat[object[0]]} ${object[1]}`,`${acc} ${bareArticles.acc[recipient[0]]} ${nounForm(recipient,'acc')}`,`${dat} ${bareArticles.dat[object[0]]} ${object[1]}`],answer,`Die Person steht im Dativ (${dat}); die Sache steht im Akkusativ (${acc}).`);
  }
  for(let i=0;i<140;i++){
    const dat=i%2===0,noun=people[(i*13)%people.length],kase=dat?'dat':'acc',correctArticle=bareArticles[kase][noun[0]],wrongArticle=bareArticles[dat?'acc':'dat'][noun[0]],form=nounForm(noun,kase);
    const correct=dat?`Ich helfe ${correctArticle} ${form}.`:`Ich besuche ${correctArticle} ${form}.`;const wrong=dat?`Ich helfe ${wrongArticle} ${form}.`:`Ich besuche ${wrongArticle} ${form}.`;
    add('Fehler korrigieren',`Korrigiere den Kasus (gemeint ist genau eine Person): „${wrong}“`,[correct,wrong,dat?`Ich helfe die ${form}.`:`Ich besuche dem ${form}.`],correct,dat?`„helfen“ verlangt den Dativ. Deshalb: ${correct}`:`„besuchen“ verlangt den Akkusativ. Deshalb: ${correct}`);
  }
  const dialogueVerbs=[['geschickt','schicke'],['gezeigt','zeige'],['erklärt','erkläre'],['gebracht','bringe'],['empfohlen','empfehle'],['gegeben','gebe'],['geliehen','leihe']];
  for(let i=0;i<140;i++){
    const noun=adultPeople[(i*17)%adultPeople.length],verb=dialogueVerbs[i%dialogueVerbs.length],present=verb[1],choices=transferObjects[present]||[['n','Dokument']],object=choices[Math.floor(i/dialogueVerbs.length)%choices.length];const dat=`${bareArticles.dat[noun[0]]} ${nounForm(noun,'dat')}`,acc=`${bareArticles.acc[object[0]]} ${object[1]}`;const answer=`${dat} ${acc}`;
    add('Alltagsdialoge',`A: Wem hast du etwas ${verb[0]}? B: Ich habe ___ ${verb[0]}.`,[answer,`${bareArticles.acc[noun[0]]} ${nounForm(noun,'acc')} ${acc}`,`${dat} ${bareArticles.dat[object[0]]} ${object[1]}`,`${acc} ${bareArticles.acc[noun[0]]} ${nounForm(noun,'acc')}`],answer,`Auf „wem?“ folgt der Dativ (${dat}); die übertragene Sache steht im Akkusativ (${acc}).`);
  }
  window.GERMAN_CASE_EXERCISES=exercises.slice(0,1400);
})();
