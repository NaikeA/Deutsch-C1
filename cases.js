(function(){
  const exercises=[];
  const add=(category,prompt,options,answer,explanation)=>exercises.push({id:`case-${exercises.length+1}`,category,prompt,options:[...new Set(options)],answer,explanation});
  const nouns=[
    ['m','Kollege','colleague','Kollegen'],['f','Kollegin','colleague'],['n','Projekt','project'],['m','Kunde','customer','Kunden'],['f','Chefin','manager'],['n','Team','team'],['m','Arzt','doctor'],['f','Nachbarin','neighbour'],['n','Kind','child'],['m','Freund','friend'],['f','Lehrerin','teacher'],['n','Unternehmen','company'],['m','Mitarbeiter','employee'],['f','Person','person'],['n','Problem','problem'],['m','Projektleiter','project manager'],['f','Abteilung','department'],['n','Büro','office'],['m','Vorschlag','suggestion'],['f','Entscheidung','decision'],['n','Ergebnis','result'],['m','Termin','appointment'],['f','Aufgabe','task'],['n','Gespräch','conversation'],['m','Bericht','report'],['f','E-Mail','email'],['n','Dokument','document'],['m','Plan','plan'],['f','Lösung','solution'],['n','Angebot','offer']
  ];
  const adjectives=['neu','wichtig','freundlich','erfahren','zuverlässig','hilfreich','interessant','aktuell'];
  const endings={def:{acc:{m:['den','en'],f:['die','e'],n:['das','e']},dat:{m:['dem','en'],f:['der','en'],n:['dem','en']}},ind:{acc:{m:['einen','en'],f:['eine','e'],n:['ein','es']},dat:{m:['einem','en'],f:['einer','en'],n:['einem','en']}}};
  const nounForm=(noun,kase)=>kase!=='nom'&&noun[3]?noun[3]:noun[1];
  const phrase=(noun,adj,kind,kase)=>{const [article,end]=endings[kind][kase][noun[0]];return `${article} ${adj}${end} ${nounForm(noun,kase)}`};
  for(let i=0;i<240;i++){
    const noun=nouns[i%nouns.length],adj=adjectives[Math.floor(i/nouns.length)%adjectives.length],kase=i%2?'dat':'acc',kind=Math.floor(i/2)%2?'ind':'def';
    const answer=phrase(noun,adj,kind,kase);const otherCase=kase==='acc'?'dat':'acc';const altKind=kind==='def'?'ind':'def';
    const prompt=kase==='acc'?`Ich bespreche heute ___ . (${noun[2]})`:`Ich spreche heute mit ___ . (${noun[2]})`;
    add('Artikel & Endungen',prompt,[answer,phrase(noun,adj,kind,otherCase),phrase(noun,adj,altKind,kase),phrase(noun,adj,altKind,otherCase)],answer,kase==='dat'?`„mit“ verlangt immer den Dativ. Richtig ist: ${answer}.`:`„besprechen“ hat ein Akkusativobjekt. Richtig ist: ${answer}.`);
  }
  const dativeVerbs=[['helfen','Ich helfe'],['danken','Ich danke'],['folgen','Ich folge'],['vertrauen','Ich vertraue'],['gehören','Das gehört'],['gratulieren','Ich gratuliere'],['antworten','Ich antworte'],['zuhören','Ich höre',' zu'],['widersprechen','Ich widerspreche'],['begegnen','Ich begegne'],['fehlen','Das fehlt'],['zustimmen','Ich stimme',' zu']];
  const accusativeVerbs=[['sehen','Ich sehe'],['besuchen','Ich besuche'],['fragen','Ich frage'],['anrufen','Ich rufe',' an'],['treffen','Ich treffe'],['unterstützen','Ich unterstütze'],['brauchen','Ich brauche'],['kennen','Ich kenne'],['verstehen','Ich verstehe'],['informieren','Ich informiere'],['prüfen','Ich prüfe'],['beobachten','Ich beobachte']];
  const bareArticles={acc:{m:'den',f:'die',n:'das'},dat:{m:'dem',f:'der',n:'dem'}};
  for(let i=0;i<240;i++){
    const dat=i%2===0;const list=dat?dativeVerbs:accusativeVerbs;const verb=list[Math.floor(i/2)%list.length];const noun=nouns[(i*7)%nouns.length];const kase=dat?'dat':'acc';const article=bareArticles[kase][noun[0]];const answer=`${article} ${nounForm(noun,kase)}`;
    const prompt=`${verb[1]} ___${verb[2]||''}. Welchen Fall verlangt „${verb[0]}“?`;
    const otherCase=kase==='dat'?'acc':'dat';const opts=[answer,`${bareArticles[otherCase][noun[0]]} ${nounForm(noun,otherCase)}`,`die ${nounForm(noun,kase)}`,`das ${nounForm(noun,kase)}`];
    add('Verben & Kasus',prompt,opts,answer,dat?`„${verb[0]}“ verlangt den Dativ: ${answer}.`:`„${verb[0]}“ verlangt den Akkusativ: ${answer}.`);
  }
  const pronouns={acc:{m:'ihn',f:'sie',n:'es'},dat:{m:'ihm',f:'ihr',n:'ihm'}};
  for(let i=0;i<200;i++){
    const noun=nouns[(i*11)%nouns.length],kase=i%2?'dat':'acc';const article=bareArticles[kase][noun[0]],form=nounForm(noun,kase);const answer=pronouns[kase][noun[0]];const sentence=kase==='dat'?`Ich helfe ${article} ${form}.`:`Ich sehe ${article} ${form}.`;
    add('Pronomen',`${sentence} Ersetze „${article} ${form}“ durch ein Pronomen.`,['ihn','ihm','sie','ihr','es'].sort(()=>.5-(i%3)/3),answer,kase==='dat'?`Das Dativpronomen für dieses Nomen ist „${answer}“: Ich helfe ${answer}.`:`Das Akkusativpronomen ist „${answer}“: Ich sehe ${answer}.`);
  }
  const places=[['m','Tisch'],['f','Wand'],['n','Büro'],['m','Schrank'],['f','Tasche'],['n','Regal'],['m','Stuhl'],['f','Tür'],['n','Zimmer'],['m','Computer'],['f','Küche'],['n','Auto']];
  const preps=['auf','in','an','unter','über','vor','hinter','neben','zwischen'];
  for(let i=0;i<240;i++){
    const place=places[i%places.length],prep=preps[Math.floor(i/places.length)%preps.length],direction=i%2===0,kase=direction?'acc':'dat';const answer=bareArticles[kase][place[0]];
    const prompt=direction?`Ich lege die Unterlagen ${prep} ___ ${place[1]}. Wohin?`:`Die Unterlagen liegen ${prep} ___ ${place[1]}. Wo?`;
    const other=bareArticles[direction?'dat':'acc'][place[0]];
    add('Wo oder wohin?',prompt,[answer,other,'der','die','das'],answer,direction?`Eine Richtung oder ein Ziel beantwortet „wohin?“ und steht im Akkusativ: ${prep} ${answer} ${place[1]}.`:`Ein fester Ort beantwortet „wo?“ und steht im Dativ: ${prep} ${answer} ${place[1]}.`);
  }
  const transferVerbs=['gebe','schicke','zeige','erkläre','bringe','empfehle','leihe','sende','überreiche','verkaufe'];
  const objects=[['m','Bericht'],['f','E-Mail'],['n','Dokument'],['m','Plan'],['f','Information'],['n','Angebot'],['m','Schlüssel'],['f','Rechnung'],['n','Ergebnis'],['m','Vorschlag']];
  for(let i=0;i<200;i++){
    const recipient=nouns[(i*5)%15],object=objects[(i*7)%objects.length],verb=transferVerbs[i%transferVerbs.length];
    const dat=`${bareArticles.dat[recipient[0]]} ${nounForm(recipient,'dat')}`,acc=`${bareArticles.acc[object[0]]} ${object[1]}`,answer=`${dat} ${acc}`;
    add('Zwei Objekte',`Ich ${verb} ___ . Wähle Dativperson + Akkusativsache.`,[answer,`${bareArticles.acc[recipient[0]]} ${nounForm(recipient,'acc')} ${bareArticles.dat[object[0]]} ${object[1]}`,`${acc} ${bareArticles.acc[recipient[0]]} ${nounForm(recipient,'acc')}`,`${dat} ${bareArticles.dat[object[0]]} ${object[1]}`],answer,`Die Person steht im Dativ (${dat}); die Sache steht im Akkusativ (${acc}).`);
  }
  for(let i=0;i<140;i++){
    const dat=i%2===0,noun=nouns[(i*13)%nouns.length],kase=dat?'dat':'acc',correctArticle=bareArticles[kase][noun[0]],wrongArticle=bareArticles[dat?'acc':'dat'][noun[0]],form=nounForm(noun,kase);
    const correct=dat?`Ich helfe ${correctArticle} ${form}.`:`Ich besuche ${correctArticle} ${form}.`;const wrong=dat?`Ich helfe ${wrongArticle} ${form}.`:`Ich besuche ${wrongArticle} ${form}.`;
    add('Fehler korrigieren',`Korrigiere: „${wrong}“`,[correct,wrong,dat?`Ich helfe die ${form}.`:`Ich besuche dem ${form}.`],correct,dat?`„helfen“ verlangt den Dativ. Deshalb: ${correct}`:`„besuchen“ verlangt den Akkusativ. Deshalb: ${correct}`);
  }
  const dialogueVerbs=[['geschickt','schicke'],['gezeigt','zeige'],['erklärt','erkläre'],['gebracht','bringe'],['empfohlen','empfehle'],['gegeben','gebe'],['geliehen','leihe']];
  for(let i=0;i<140;i++){
    const noun=nouns[(i*17)%15],object=objects[(i*3)%objects.length],verb=dialogueVerbs[i%dialogueVerbs.length];const dat=`${bareArticles.dat[noun[0]]} ${nounForm(noun,'dat')}`,acc=`${bareArticles.acc[object[0]]} ${object[1]}`;const answer=`${dat} ${acc}`;
    add('Alltagsdialoge',`A: Wem hast du etwas ${verb[0]}? B: Ich ${verb[1]} ___ .`,[answer,`${bareArticles.acc[noun[0]]} ${nounForm(noun,'acc')} ${acc}`,`${dat} ${bareArticles.dat[object[0]]} ${object[1]}`,`${acc} ${bareArticles.acc[noun[0]]} ${nounForm(noun,'acc')}`],answer,`Auf „wem?“ folgt der Dativ (${dat}); die übertragene Sache steht im Akkusativ (${acc}).`);
  }
  window.GERMAN_CASE_EXERCISES=exercises.slice(0,1400);
})();
