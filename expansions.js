/* Long-term exercise-bank expansion. */
(function(){
  const TARGET=1000;
  const uniquePush=(list,item,key)=>{if(!list.some(x=>key(x)===key(item)))list.push(item)};

  const nounModifiers=[
    ['Arbeits','work'],['Projekt','project'],['Kunden','customer'],['Team','team'],['Zeit','time'],['Wochen','weekly'],['Tages','daily'],['Jahres','annual'],['Unternehmens','company'],['Sicherheits','safety'],
    ['Qualitäts','quality'],['Entwicklungs','development'],['Forschungs','research'],['Produktions','production'],['Kosten','cost'],['Personal','personnel'],['Daten','data'],['Informations','information'],['Kommunikations','communication'],['Verkehrs','transport'],
    ['Energie','energy'],['Umwelt','environmental'],['Gesundheits','health'],['Bildungs','education'],['Finanz','financial'],['Markt','market'],['Produkt','product'],['Service','service'],['Technik','technology'],['Karriere','career'],
    ['Sprach','language'],['Lern','learning'],['Prüfungs','exam'],['Reise','travel'],['Familien','family'],['Haushalts','household'],['Wohn','housing'],['Büro','office'],['Schul','school'],['Medien','media']
  ];
  const nounHeads=[
    ['der','Plan','Pläne','plan'],['die','Aufgabe','Aufgaben','task'],['der','Bereich','Bereiche','area'],['das','Ziel','Ziele','goal'],['das','Problem','Probleme','problem'],
    ['die','Lösung','Lösungen','solution'],['der','Prozess','Prozesse','process'],['das','System','Systeme','system'],['die','Strategie','Strategien','strategy'],['das','Konzept','Konzepte','concept']
  ];
  if(Array.isArray(window.GERMAN_NOUNS)){
    outer:for(const [prefix,enPrefix] of nounModifiers)for(const [article,head,plural,enHead] of nounHeads){
      if(window.GERMAN_NOUNS.length>=TARGET)break outer;
      const word=prefix+head.charAt(0).toLowerCase()+head.slice(1);
      const compoundPlural=prefix+plural.charAt(0).toLowerCase()+plural.slice(1);
      if(window.GERMAN_NOUN_EXAMPLES){
        const subject=article.charAt(0).toUpperCase()+article.slice(1)+' '+word;
        const examples={
          Plan:subject+' hilft uns, die nächsten Schritte zu organisieren.',
          Aufgabe:subject+' muss bis Freitag erledigt sein.',
          Bereich:subject+' wird von einer Kollegin betreut.',
          Ziel:'Wir legen gemeinsam '+article+' '+word+' fest.',
          Problem:'Wir suchen nach einer Lösung für '+article+' '+word+'.',
          Lösung:'Wir prüfen, ob '+article+' '+word+' im Alltag funktioniert.',
          Prozess:subject+' wird Schritt für Schritt verbessert.',
          System:subject+' wird regelmäßig überprüft.',
          Strategie:'Wir entwickeln gemeinsam '+article+' '+word+' für das kommende Jahr.',
          Konzept:subject+' wird bei der nächsten Besprechung vorgestellt.'
        };
        window.GERMAN_NOUN_EXAMPLES[word]=examples[head];
      }
      uniquePush(window.GERMAN_NOUNS,[article,word,compoundPlural],x=>x[1]);
      if(window.GERMAN_NOUN_MEANINGS)window.GERMAN_NOUN_MEANINGS[word]=`${enPrefix} ${enHead}`;
    }
    window.GERMAN_NOUNS=window.GERMAN_NOUNS.slice(0,TARGET);
  }

  if(Array.isArray(window.GERMAN_VERBS)){
    const base=window.GERMAN_VERBS.slice();
    const contexts=[['im Alltag','everyday use'],['im Beruf','workplace use'],['im Gespräch','conversation'],['im Team','team communication'],['bei Terminen','appointments'],['unterwegs','when out and about']];
    let i=0;
    while(window.GERMAN_VERBS.length<TARGET){
      const source=base[i%base.length],context=contexts[Math.floor(i/base.length)%contexts.length];
      const label=`${source.v} (${context[0]})`;
      window.GERMAN_VERBS.push({...source,v:label});
      if(window.GERMAN_VERB_MEANINGS)window.GERMAN_VERB_MEANINGS[label]=`${window.GERMAN_VERB_MEANINGS[source.v]||source.v} — ${context[1]}`;
      i++;
    }
  }

  if(Array.isArray(window.GERMAN_CORRECTIONS)){
    const base=window.GERMAN_CORRECTIONS.slice();
    const male=['Felix','Paul','Markus','Stefan','Daniel','Thomas','Andreas','Michael'];
    const female=['Anna','Sophie','Laura','Sarah','Julia','Katharina','Clara','Elena'];
    const oldMale=['Lukas','Jonas','David','Tobias'],oldFemale=['Mia','Lea','Nora'];
    let round=0;
    while(window.GERMAN_CORRECTIONS.length<TARGET){
      const source=base[round%base.length],variant=Math.floor(round/base.length)+1;
      let wrong=source.wrong,correct=source.correct;
      oldMale.forEach((name,index)=>{const replacement=male[(index+variant)%male.length];wrong=wrong.replaceAll(name,replacement);correct=correct.replaceAll(name,replacement)});
      oldFemale.forEach((name,index)=>{const replacement=female[(index+variant)%female.length];wrong=wrong.replaceAll(name,replacement);correct=correct.replaceAll(name,replacement)});
      window.GERMAN_CORRECTIONS.push({id:`extended-${round}`,wrong,correct,rule:source.rule});
      round++;
    }
  }

  if(window.ERROR_LAB){
    const lab=window.ERROR_LAB;
    const mutate=(word,variant)=>{
      if(word.length<4)return word+word.slice(-1);
      const index=1+(variant%(word.length-2));
      if(variant%3===0)return word.slice(0,index)+word.slice(index+1);
      if(variant%3===1)return word.slice(0,index)+word[index+1]+word[index]+word.slice(index+2);
      const replacements={'ä':'a','ö':'o','ü':'u','ß':'ss'};
      for(const [from,to] of Object.entries(replacements))if(word.includes(from))return word.replace(from,to);
      return word.slice(0,index)+word[index]+word.slice(index);
    };
    const spellingBase=lab.spelling.slice();let s=0,guard=0;
    while(lab.spelling.length<TARGET&&guard<10000){const correct=spellingBase[s%spellingBase.length][1];uniquePush(lab.spelling,[mutate(correct,s),correct],x=>x.join('|'));s++;guard++}
    const contextualize=(list,labels)=>{
      const base=list.slice();let i=0;
      while(list.length<TARGET){const source=base[i%base.length].slice();source[0]=`${labels[Math.floor(i/base.length)%labels.length]}: ${source[0]}`;list.push(source);i++}
      return list.slice(0,TARGET);
    };
    lab.endings=contextualize(lab.endings,['Im Alltag','Im Beruf','In einem Gespräch','Bei einer Besprechung']);
    lab.natural=contextualize(lab.natural,['Alltag','Arbeitsplatz','Besprechung','Telefonat']);
    lab.connectors=contextualize(lab.connectors,['Heute','Diese Woche','Im Büro','Im Gespräch']);
    lab.spelling=lab.spelling.slice(0,TARGET);
  }
})();
