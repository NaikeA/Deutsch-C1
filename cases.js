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
    const id=`case-natural-v3-${exercises.length+1}`;
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
  const transferFrames=[
    ['gebe heute',[['m','Bericht'],['n','Dokument'],['m','Schlüssel'],['f','Information']]],
    ['schicke morgen',[['f','E-Mail'],['m','Bericht'],['n','Dokument'],['f','Rechnung']]],
    ['zeige gleich',[['m','Plan'],['n','Ergebnis'],['n','Dokument'],['f','Auswertung']]],
    ['erkläre ausführlich',[['m','Vorschlag'],['n','Ergebnis'],['f','Änderung'],['n','Verfahren']]],
    ['bringe später',[['m','Schlüssel'],['n','Dokument'],['m','Bericht'],['f','Unterlage']]],
    ['empfehle gern',[['n','Buch'],['n','Angebot'],['m','Vorschlag'],['f','Lösung']]],
    ['leihe für das Wochenende',[['m','Schlüssel'],['n','Buch'],['n','Fahrrad'],['f','Bohrmaschine']]],
    ['sende nach dem Gespräch',[['f','E-Mail'],['m','Bericht'],['f','Rechnung'],['n','Protokoll']]],
    ['überreiche persönlich',[['m','Bericht'],['n','Dokument'],['m','Schlüssel'],['f','Urkunde']]],
    ['verkaufe günstig',[['n','Fahrrad'],['n','Buch'],['m','Computer'],['f','Lampe']]],
    ['biete zur Unterstützung',[['f','Hilfe'],['f','Beratung'],['n','Gespräch'],['f','Lösung']]],
    ['verspreche für morgen',[['f','Antwort'],['f','Rückmeldung'],['n','Ergebnis'],['f','Entscheidung']]],
    ['erzähle später',[['f','Geschichte'],['n','Erlebnis'],['f','Neuigkeit'],['n','Beispiel']]],
    ['schreibe heute noch',[['f','Nachricht'],['f','E-Mail'],['f','Antwort'],['n','Protokoll']]],
    ['lese im Meeting vor',[['m','Bericht'],['n','Protokoll'],['f','Nachricht'],['n','Ergebnis']]],
    ['leite sofort weiter',[['f','E-Mail'],['m','Bericht'],['f','Anfrage'],['n','Dokument']]],
    ['präsentiere morgen',[['n','Ergebnis'],['m','Plan'],['f','Lösung'],['n','Konzept']]],
    ['erstatte vollständig',[['m','Betrag'],['f','Gebühr'],['f','Anzahlung'],['n','Geld']]]
  ];
  for(let i=0;i<200;i++){
    const recipient=adultPeople[(i*5)%adultPeople.length],frame=transferFrames[i%transferFrames.length],objects=frame[1],object=objects[Math.floor(i/transferFrames.length)%objects.length];
    const dat=`${bareArticles.dat[recipient[0]]} ${nounForm(recipient,'dat')}`,acc=`${bareArticles.acc[object[0]]} ${object[1]}`,answer=`${dat} ${acc}`;
    const wrongPerson=`${bareArticles.acc[recipient[0]]} ${nounForm(recipient,'acc')}`,wrongThing=`${bareArticles.dat[object[0]]} ${object[1]}`;
    add('Zwei Objekte',`Ich ${frame[0]} ___ . Ergänze zuerst die Person und danach die Sache.`,[answer,`${wrongPerson} ${acc}`,`${dat} ${wrongThing}`,`${acc} ${wrongPerson}`],answer,`Wer etwas erhält, steht im Dativ: ${dat}. Die übertragene Sache steht im Akkusativ: ${acc}.`);
  }

  const correctionDative=[
    ['helfen','Ich helfe',''],['danken','Ich danke',''],['folgen','Ich folge',''],['vertrauen','Ich vertraue',''],['gehören','Das gehört',''],['gratulieren','Ich gratuliere',''],['antworten','Ich antworte',''],['zuhören','Ich höre',' zu'],['widersprechen','Ich widerspreche',''],['begegnen','Ich begegne',''],['fehlen','Das fehlt',''],['zustimmen','Ich stimme',' zu']
  ];
  const correctionAccusative=[
    ['sehen','Ich sehe',''],['besuchen','Ich besuche',''],['fragen','Ich frage',''],['anrufen','Ich rufe',' an'],['treffen','Ich treffe',''],['unterstützen','Ich unterstütze',''],['brauchen','Ich brauche',''],['kennen','Ich kenne',''],['verstehen','Ich verstehe',''],['informieren','Ich informiere',''],['beobachten','Ich beobachte','']
  ];
  for(let i=0;i<140;i++){
    const dat=i%2===0,list=dat?correctionDative:correctionAccusative,verb=list[Math.floor(i/2)%list.length],noun=adultPeople[(i*13)%adultPeople.length],kase=dat?'dat':'acc';
    const correctArticle=bareArticles[kase][noun[0]],wrongArticle=bareArticles[dat?'acc':'dat'][noun[0]],form=nounForm(noun,kase);
    const correct=`${verb[1]} ${correctArticle} ${form}${verb[2]}.`,wrong=`${verb[1]} ${wrongArticle} ${form}${verb[2]}.`;
    const distractorArticle=noun[0]==='m'?'die':'den';
    const distractor=`${verb[1]} ${distractorArticle} ${form}${verb[2]}.`;
    add('Fehler korrigieren',`Korrigiere den Kasusfehler: „${wrong}“`,[correct,wrong,distractor],correct,`„${verb[0]}“ verlangt ${dat?'den Dativ':'den Akkusativ'}. Richtig ist: ${correct}`);
  }

  const dativeDialogues=[
    ['Wem hast du geholfen?','Ich habe','geholfen.'],['Wem hast du gedankt?','Ich habe','gedankt.'],['Wem hast du geantwortet?','Ich habe','geantwortet.'],['Wem hast du zugehört?','Ich habe','zugehört.'],['Wem hast du widersprochen?','Ich habe','widersprochen.'],['Wem hast du vertraut?','Ich habe','vertraut.'],['Wem hast du gratuliert?','Ich habe','gratuliert.'],['Wem hast du zugestimmt?','Ich habe','zugestimmt.'],['Wem bist du begegnet?','Ich bin','begegnet.'],['Wem bist du gefolgt?','Ich bin','gefolgt.']
  ];
  const accusativeDialogues=[
    ['Wen hast du gesehen?','Ich habe','gesehen.'],['Wen hast du besucht?','Ich habe','besucht.'],['Wen hast du gefragt?','Ich habe','gefragt.'],['Wen hast du angerufen?','Ich habe','angerufen.'],['Wen hast du getroffen?','Ich habe','getroffen.'],['Wen hast du unterstützt?','Ich habe','unterstützt.'],['Wen hast du gebraucht?','Ich habe','gebraucht.'],['Wen hast du informiert?','Ich habe','informiert.'],['Wen hast du beobachtet?','Ich habe','beobachtet.'],['Wen hast du verstanden?','Ich habe','verstanden.']
  ];
  for(let i=0;i<140;i++){
    const dat=i%2===0,list=dat?dativeDialogues:accusativeDialogues,dialogue=list[Math.floor(i/2)%list.length],noun=adultPeople[(i*17)%adultPeople.length],kase=dat?'dat':'acc';
    const correctObject=`${bareArticles[kase][noun[0]]} ${nounForm(noun,kase)}`,wrongCase=dat?'acc':'dat',wrongObject=`${bareArticles[wrongCase][noun[0]]} ${nounForm(noun,wrongCase)}`;
    const answer=`${dialogue[1]} ${correctObject} ${dialogue[2]}`;
    const wrong=`${dialogue[1]} ${wrongObject} ${dialogue[2]}`;
    add('Alltagsdialoge',`A: ${dialogue[0]} B: ___`,[answer,wrong,`${correctObject} ${dialogue[2]}`,`${dialogue[1]} die ${nounForm(noun,kase)} ${dialogue[2]}`],answer,`Die Frage „${dat?'wem':'wen'}?“ verlangt ${dat?'den Dativ':'den Akkusativ'}: ${correctObject}.`);
  }
  window.GERMAN_CASE_EXERCISES=exercises.slice(0,1400);
})();
