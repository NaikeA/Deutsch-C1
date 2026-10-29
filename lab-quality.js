/* Curated expansion for Fehlerlabor.
   Counts reflect distinct grammatical tasks and expressions, not renamed copies. */
(function(){
  'use strict';
  if(!window.ERROR_LAB)return;

  const endings={
    definite:{
      nom:{m:'e',f:'e',n:'e',p:'en'},acc:{m:'en',f:'e',n:'e',p:'en'},
      dat:{m:'en',f:'en',n:'en',p:'en'},gen:{m:'en',f:'en',n:'en',p:'en'}
    },
    ein:{
      nom:{m:'er',f:'e',n:'es',p:'en'},acc:{m:'en',f:'e',n:'es',p:'en'},
      dat:{m:'en',f:'en',n:'en',p:'en'},gen:{m:'en',f:'en',n:'en',p:'en'}
    },
    strong:{nom:{m:'er',f:'e',n:'es',p:'e'}}
  };
  const articles={
    definite:{nom:{m:'der',f:'die',n:'das',p:'die'},acc:{m:'den',f:'die',n:'das',p:'die'},dat:{m:'dem',f:'der',n:'dem',p:'den'},gen:{m:'des',f:'der',n:'des',p:'der'}},
    ein:{nom:{m:'ein',f:'eine',n:'ein',p:'keine'},acc:{m:'einen',f:'eine',n:'ein',p:'keine'},dat:{m:'einem',f:'einer',n:'einem',p:'keinen'},gen:{m:'eines',f:'einer',n:'eines',p:'keiner'}},
    possessive:{nom:{m:'unser',f:'unsere',n:'unser',p:'unsere'},acc:{m:'unseren',f:'unsere',n:'unser',p:'unsere'}}
  };
  const lexemes=[
    {g:'m',adj:'erfahren',nom:'Projektleiter',acc:'Projektleiter',dat:'Projektleiter',gen:'Projektleiters'},
    {g:'m',adj:'zuverlässig',nom:'Lieferant',acc:'Lieferanten',dat:'Lieferanten',gen:'Lieferanten'},
    {g:'m',adj:'engagiert',nom:'Mitarbeiter',acc:'Mitarbeiter',dat:'Mitarbeiter',gen:'Mitarbeiters'},
    {g:'m',adj:'kompetent',nom:'Berater',acc:'Berater',dat:'Berater',gen:'Beraters'},
    {g:'f',adj:'erfahren',nom:'Kollegin',acc:'Kollegin',dat:'Kollegin',gen:'Kollegin'},
    {g:'f',adj:'klar',nom:'Strategie',acc:'Strategie',dat:'Strategie',gen:'Strategie'},
    {g:'f',adj:'technisch',nom:'Lösung',acc:'Lösung',dat:'Lösung',gen:'Lösung'},
    {g:'f',adj:'aktuell',nom:'Analyse',acc:'Analyse',dat:'Analyse',gen:'Analyse'},
    {g:'n',adj:'neu',nom:'System',acc:'System',dat:'System',gen:'Systems'},
    {g:'n',adj:'wichtig',nom:'Projekt',acc:'Projekt',dat:'Projekt',gen:'Projekts'},
    {g:'n',adj:'zuverlässig',nom:'Gerät',acc:'Gerät',dat:'Gerät',gen:'Geräts'},
    {g:'n',adj:'komplex',nom:'Verfahren',acc:'Verfahren',dat:'Verfahren',gen:'Verfahrens'},
    {g:'p',adj:'erfahren',nom:'Kollegen',acc:'Kollegen',dat:'Kollegen',gen:'Kollegen'},
    {g:'p',adj:'aktuell',nom:'Ergebnisse',acc:'Ergebnisse',dat:'Ergebnissen',gen:'Ergebnisse'},
    {g:'p',adj:'technisch',nom:'Anforderungen',acc:'Anforderungen',dat:'Anforderungen',gen:'Anforderungen'}
  ];
  const endingPatterns=[
    {type:'definite',kase:'nom',frame:(g,l)=>g+' '+(l.g==='p'?'sind':'ist')+' für den Projekterfolg entscheidend.'},
    {type:'definite',kase:'acc',frame:g=>'Wir berücksichtigen '+g+' bei der Planung.'},
    {type:'definite',kase:'dat',frame:g=>'Wir arbeiten seit Monaten mit '+g+'.'},
    {type:'definite',kase:'gen',frame:g=>'Die Bewertung '+g+' liegt bereits vor.'},
    {type:'ein',kase:'nom',frame:(g,l)=>g+' '+(l.g==='p'?'übernehmen':'übernimmt')+' heute die Verantwortung.'},
    {type:'ein',kase:'acc',frame:g=>'Das Unternehmen sucht '+g+'.'},
    {type:'ein',kase:'dat',frame:g=>'Die Leitung spricht ausführlich mit '+g+'.'},
    {type:'ein',kase:'gen',frame:g=>'Die Empfehlung '+g+' wurde umgesetzt.'},
    {type:'possessive',kase:'nom',frame:(g,l)=>g+' '+(l.g==='p'?'unterstützen':'unterstützt')+' das gesamte Team.'},
    {type:'possessive',kase:'acc',frame:g=>'Wir stellen '+g+' morgen vor.'}
  ];
  const qualityEndings=[];
  lexemes.forEach(lex=>endingPatterns.forEach(pattern=>{
    const type=pattern.type,article=articles[type][pattern.kase][lex.g];
    const ending=endings[type==='possessive'?'ein':type][pattern.kase][lex.g];
    const group=article+' '+lex.adj+'___ '+lex[pattern.kase];
    qualityEndings.push([pattern.frame(group,lex),ending,ending]);
  }));

  const qualityNatural=[
    ['eine Entscheidung machen','eine Entscheidung treffen'],['eine Entscheidung zurücknehmen machen','eine Entscheidung zurücknehmen'],
    ['einen Termin ausmachen machen','einen Termin vereinbaren'],['einen Termin löschen','einen Termin absagen'],
    ['einen Vorschlag sagen','einen Vorschlag unterbreiten'],['eine Frage machen','eine Frage stellen'],
    ['eine Antwort geben auf','auf eine Frage antworten'],['eine Erklärung geben über','etwas erklären'],
    ['eine Präsentation halten machen','eine Präsentation halten'],['ein Thema präsentieren über','ein Thema vorstellen'],
    ['eine Rede machen','eine Rede halten'],['ein Argument sagen','ein Argument vorbringen'],
    ['eine Behauptung machen','eine Behauptung aufstellen'],['eine Vermutung machen','eine Vermutung äußern'],
    ['eine Kritik geben','Kritik äußern'],['eine Zustimmung geben','Zustimmung signalisieren'],
    ['eine Ablehnung geben','etwas ablehnen'],['ein Versprechen machen','ein Versprechen geben'],
    ['eine Warnung machen','eine Warnung aussprechen'],['einen Hinweis geben über','auf etwas hinweisen'],
    ['ein Problem adressieren','ein Problem angehen'],['ein Problem fixen','ein Problem beheben'],
    ['eine Lösung machen','eine Lösung entwickeln'],['eine Lösung implementieren','eine Lösung umsetzen'],
    ['eine Aufgabe machen','eine Aufgabe erledigen'],['eine Aufgabe beenden fertig','eine Aufgabe abschließen'],
    ['ein Projekt machen','ein Projekt durchführen'],['ein Projekt managen','ein Projekt leiten'],
    ['ein Projekt starten machen','ein Projekt aufsetzen'],['einen Plan machen','einen Plan erstellen'],
    ['einen Plan folgen','einem Plan folgen'],['einen Plan verändern','einen Plan anpassen'],
    ['ein Ziel machen','ein Ziel festlegen'],['ein Ziel bekommen','ein Ziel erreichen'],
    ['ein Ziel verfolgen gehen','ein Ziel verfolgen'],['einen Meilenstein schaffen','einen Meilenstein erreichen'],
    ['eine Frist treffen','eine Frist einhalten'],['eine Frist verpassen machen','eine Frist versäumen'],
    ['Priorität machen','Prioritäten setzen'],['eine Priorität nehmen','einer Sache Priorität einräumen'],
    ['Verantwortung nehmen für','Verantwortung für etwas übernehmen'],['Verantwortung haben von','für etwas verantwortlich sein'],
    ['eine Rolle spielen machen','eine Rolle spielen'],['eine Rolle übernehmen nehmen','eine Rolle übernehmen'],
    ['eine Führung machen','die Führung übernehmen'],['Kontrolle machen über','die Kontrolle über etwas übernehmen'],
    ['eine Prüfung machen von','etwas überprüfen'],['eine Analyse machen von','etwas analysieren'],
    ['eine Bewertung machen','eine Bewertung vornehmen'],['eine Messung machen','eine Messung durchführen'],
    ['Daten nehmen','Daten erfassen'],['Daten schauen','Daten auswerten'],
    ['Informationen sammeln zusammen','Informationen zusammentragen'],['Informationen weitergeben an','Informationen an jemanden weiterleiten'],
    ['ein Dokument machen','ein Dokument erstellen'],['einen Bericht schreiben machen','einen Bericht verfassen'],
    ['ein Protokoll machen','ein Protokoll führen'],['eine Liste machen','eine Liste erstellen'],
    ['eine Rechnung machen','eine Rechnung ausstellen'],['einen Antrag machen','einen Antrag stellen'],
    ['einen Antrag senden ein','einen Antrag einreichen'],['eine Genehmigung bekommen machen','eine Genehmigung einholen'],
    ['eine Bestellung machen','eine Bestellung aufgeben'],['einen Auftrag geben an','jemanden beauftragen'],
    ['eine Lieferung machen','eine Lieferung ausführen'],['eine Lieferung bekommen','eine Lieferung erhalten'],
    ['Kosten kleiner machen','Kosten senken'],['Kosten sparen machen','Kosten einsparen'],
    ['Gewinn machen erhöhen','den Gewinn steigern'],['Verlust machen reduzieren','den Verlust begrenzen'],
    ['ein Budget machen','ein Budget festlegen'],['ein Budget überschreiten gehen','das Budget überschreiten'],
    ['Zeit sparen machen','Zeit einsparen'],['Zeit verlieren machen','Zeit verlieren'],
    ['eine Verzögerung machen','eine Verzögerung verursachen'],['eine Verzögerung vermeiden machen','eine Verzögerung vermeiden'],
    ['ein Risiko finden','ein Risiko erkennen'],['ein Risiko nehmen','ein Risiko eingehen'],
    ['ein Risiko kleiner machen','ein Risiko mindern'],['eine Gefahr adressieren','einer Gefahr begegnen'],
    ['eine Maßnahme machen','eine Maßnahme ergreifen'],['Schritte machen gegen','Schritte gegen etwas einleiten'],
    ['eine Änderung machen','eine Änderung vornehmen'],['eine Verbesserung machen','eine Verbesserung erzielen'],
    ['Fortschritt zeigen machen','Fortschritte erzielen'],['Erfolg bekommen','Erfolg haben'],
    ['einen Fehler machen erkennen','einen Fehler erkennen'],['einen Fehler reparieren','einen Fehler korrigieren'],
    ['einen Fehler vermeiden machen','einen Fehler vermeiden'],['eine Ursache finden heraus','eine Ursache ermitteln'],
    ['eine Wirkung machen','eine Wirkung entfalten'],['Einfluss machen auf','Einfluss auf etwas nehmen'],
    ['Druck machen auf','Druck auf jemanden ausüben'],['unter Druck sein stehen','unter Druck stehen'],
    ['eine Beziehung bauen','eine Beziehung aufbauen'],['Kontakt machen mit','Kontakt zu jemandem aufnehmen'],
    ['Kontakt halten behalten','Kontakt halten'],['Vertrauen bauen','Vertrauen aufbauen'],
    ['Vertrauen verlieren machen','Vertrauen verspielen'],['Respekt geben jemandem','jemandem Respekt entgegenbringen'],
    ['Unterstützung geben','Unterstützung leisten'],['Hilfe anbieten geben','Hilfe anbieten'],
    ['einen Rat geben zu','jemandem zu etwas raten'],['Rat suchen bei','sich bei jemandem Rat holen'],
    ['Feedback sagen','Feedback geben'],['Feedback nehmen','Feedback annehmen'],
    ['eine Rückmeldung machen','eine Rückmeldung geben'],['eine Rückmeldung bekommen','eine Rückmeldung erhalten'],
    ['einen Konflikt machen lösen','einen Konflikt lösen'],['einen Konflikt vermeiden gehen','einem Konflikt aus dem Weg gehen'],
    ['einen Kompromiss machen','einen Kompromiss schließen'],['eine Einigung machen','eine Einigung erzielen'],
    ['ein Gespräch machen','ein Gespräch führen'],['eine Diskussion machen','eine Diskussion führen'],
    ['eine Debatte machen','eine Debatte führen'],['an einer Diskussion addieren','zu einer Diskussion beitragen'],
    ['eine Meinung sagen über','sich zu etwas äußern'],['eine Meinung stark machen','eine Meinung vertreten'],
    ['einen Standpunkt erklären','einen Standpunkt darlegen'],['etwas klar machen verständlich','etwas verständlich machen'],
    ['etwas im Detail erklären aus','etwas ausführlich erläutern'],['etwas kurz sagen zusammen','etwas zusammenfassen'],
    ['auf einen Punkt kommen','auf den Punkt kommen'],['um den heißen Brei sprechen','um den heißen Brei herumreden'],
    ['etwas in andere Wörter sagen','etwas anders formulieren'],['das Thema wechseln machen','das Thema wechseln'],
    ['eine Position klar sagen','klar Stellung beziehen'],['eine Sache offen lassen stehen','eine Frage offenlassen'],
    ['eine Bedingung setzen fest','eine Bedingung festlegen'],['eine Ausnahme machen für','eine Ausnahme zulassen'],
    ['eine Grenze setzen von','eine Grenze ziehen'],['etwas in Betracht nehmen','etwas in Betracht ziehen']
  ];

  const rules=[];
  const addRule=(rule,rows)=>rows.forEach(([wrong,correct])=>rules.push([wrong,correct,rule]));
  addRule('Im weil-Satz steht das konjugierte Verb am Ende.',[
    ['Wir verschieben den Test, weil die Anlage ist noch nicht bereit.','Wir verschieben den Test, weil die Anlage noch nicht bereit ist.'],
    ['Sie bleibt zu Hause, weil ihr Sohn hat Fieber.','Sie bleibt zu Hause, weil ihr Sohn Fieber hat.'],
    ['Ich rufe später an, weil ich bin gerade in einer Besprechung.','Ich rufe später an, weil ich gerade in einer Besprechung bin.'],
    ['Das Team arbeitet länger, weil der Termin wurde vorgezogen.','Das Team arbeitet länger, weil der Termin vorgezogen wurde.'],
    ['Wir ändern den Entwurf, weil der Kunde hat neue Anforderungen.','Wir ändern den Entwurf, weil der Kunde neue Anforderungen hat.'],
    ['Er fährt mit der Bahn, weil sein Auto ist in der Werkstatt.','Er fährt mit der Bahn, weil sein Auto in der Werkstatt ist.'],
    ['Die Sitzung fällt aus, weil mehrere Teilnehmer sind krank.','Die Sitzung fällt aus, weil mehrere Teilnehmer krank sind.'],
    ['Ich prüfe die Zahlen erneut, weil das Ergebnis wirkt ungewöhnlich.','Ich prüfe die Zahlen erneut, weil das Ergebnis ungewöhnlich wirkt.'],
    ['Sie spricht langsam, weil einige Gäste verstehen wenig Deutsch.','Sie spricht langsam, weil einige Gäste wenig Deutsch verstehen.'],
    ['Wir warten noch, weil die Freigabe wurde nicht erteilt.','Wir warten noch, weil die Freigabe nicht erteilt wurde.']
  ]);
  addRule('Nach obwohl steht das konjugierte Verb am Ende.',[
    ['Obwohl es regnet stark, fahren wir mit dem Fahrrad.','Obwohl es stark regnet, fahren wir mit dem Fahrrad.'],
    ['Obwohl der Zeitplan ist eng, bleibt das Team ruhig.','Obwohl der Zeitplan eng ist, bleibt das Team ruhig.'],
    ['Sie nahm teil, obwohl sie hatte kaum Zeit.','Sie nahm teil, obwohl sie kaum Zeit hatte.'],
    ['Obwohl der Versuch ist fehlgeschlagen, geben wir nicht auf.','Obwohl der Versuch fehlgeschlagen ist, geben wir nicht auf.'],
    ['Er verstand die Erklärung, obwohl sie war sehr technisch.','Er verstand die Erklärung, obwohl sie sehr technisch war.'],
    ['Obwohl die Kosten sind gestiegen, wird das Projekt fortgesetzt.','Obwohl die Kosten gestiegen sind, wird das Projekt fortgesetzt.'],
    ['Wir erreichten das Ziel, obwohl mehrere Probleme traten auf.','Wir erreichten das Ziel, obwohl mehrere Probleme auftraten.'],
    ['Obwohl ich war müde, beendete ich den Bericht.','Obwohl ich müde war, beendete ich den Bericht.'],
    ['Die Anlage lief weiter, obwohl ein Sensor war defekt.','Die Anlage lief weiter, obwohl ein Sensor defekt war.'],
    ['Obwohl niemand hatte damit gerechnet, wurde der Antrag genehmigt.','Obwohl niemand damit gerechnet hatte, wurde der Antrag genehmigt.']
  ]);
  addRule('Im dass-Satz steht das konjugierte Verb am Ende.',[
    ['Ich glaube, dass der Plan funktioniert gut.','Ich glaube, dass der Plan gut funktioniert.'],
    ['Sie bestätigt, dass die Lieferung kommt morgen.','Sie bestätigt, dass die Lieferung morgen kommt.'],
    ['Wir hoffen, dass der Kunde wird zustimmen.','Wir hoffen, dass der Kunde zustimmen wird.'],
    ['Der Bericht zeigt, dass die Kosten sind gesunken.','Der Bericht zeigt, dass die Kosten gesunken sind.'],
    ['Er bemerkte, dass eine Zahl fehlte im Anhang.','Er bemerkte, dass eine Zahl im Anhang fehlte.'],
    ['Die Leitung verlangt, dass alle Ergebnisse werden dokumentiert.','Die Leitung verlangt, dass alle Ergebnisse dokumentiert werden.'],
    ['Ich wusste nicht, dass du hast bereits zugesagt.','Ich wusste nicht, dass du bereits zugesagt hast.'],
    ['Sie erklärt, dass das Gerät muss regelmäßig gewartet werden.','Sie erklärt, dass das Gerät regelmäßig gewartet werden muss.'],
    ['Wir sind sicher, dass die Methode liefert zuverlässige Werte.','Wir sind sicher, dass die Methode zuverlässige Werte liefert.'],
    ['Der Kunde erwartet, dass wir schließen das Projekt im Mai ab.','Der Kunde erwartet, dass wir das Projekt im Mai abschließen.']
  ]);
  addRule('Im wenn-Satz steht das konjugierte Verb am Ende.',[
    ['Wenn du brauchst Hilfe, ruf mich an.','Wenn du Hilfe brauchst, ruf mich an.'],
    ['Wenn die Freigabe kommt heute, beginnen wir sofort.','Wenn die Freigabe heute kommt, beginnen wir sofort.'],
    ['Wenn ich habe Zeit, überarbeite ich die Folien.','Wenn ich Zeit habe, überarbeite ich die Folien.'],
    ['Wenn das Wetter bleibt trocken, fahren wir morgen los.','Wenn das Wetter trocken bleibt, fahren wir morgen los.'],
    ['Wenn der Kunde wird zustimmen, bestellen wir die Teile.','Wenn der Kunde zustimmen wird, bestellen wir die Teile.'],
    ['Wenn die Anlage läuft stabil, starten wir die Messung.','Wenn die Anlage stabil läuft, starten wir die Messung.'],
    ['Wenn du hast den Bericht gelesen, besprechen wir ihn.','Wenn du den Bericht gelesen hast, besprechen wir ihn.'],
    ['Wenn das Team erreicht den Meilenstein, feiern wir gemeinsam.','Wenn das Team den Meilenstein erreicht, feiern wir gemeinsam.'],
    ['Wenn niemand meldet Einwände, gilt der Vorschlag als angenommen.','Wenn niemand Einwände meldet, gilt der Vorschlag als angenommen.'],
    ['Wenn die Kosten steigen weiter, müssen wir reagieren.','Wenn die Kosten weiter steigen, müssen wir reagieren.']
  ]);
  addRule('In einer indirekten Frage steht das Verb am Ende.',[
    ['Ich weiß nicht, wann beginnt die Sitzung.','Ich weiß nicht, wann die Sitzung beginnt.'],
    ['Kannst du mir sagen, wo liegt der Vertrag?','Kannst du mir sagen, wo der Vertrag liegt?'],
    ['Sie fragt, warum wurde der Termin verschoben.','Sie fragt, warum der Termin verschoben wurde.'],
    ['Wir müssen klären, wer übernimmt die Verantwortung.','Wir müssen klären, wer die Verantwortung übernimmt.'],
    ['Niemand wusste, wie funktioniert das neue System.','Niemand wusste, wie das neue System funktioniert.'],
    ['Bitte prüfen Sie, ob sind alle Angaben vollständig.','Bitte prüfen Sie, ob alle Angaben vollständig sind.'],
    ['Er möchte wissen, wie lange dauert die Reparatur.','Er möchte wissen, wie lange die Reparatur dauert.'],
    ['Wir besprechen, welche Lösung ist am besten geeignet.','Wir besprechen, welche Lösung am besten geeignet ist.'],
    ['Die Leitung fragt, wann können wir liefern.','Die Leitung fragt, wann wir liefern können.'],
    ['Ich erinnere mich nicht, wem habe ich die Datei geschickt.','Ich erinnere mich nicht, wem ich die Datei geschickt habe.']
  ]);
  addRule('Nach nachdem steht bei Vorzeitigkeit häufig das Plusquamperfekt.',[
    ['Nachdem wir den Test abgeschlossen haben, werteten wir die Daten aus.','Nachdem wir den Test abgeschlossen hatten, werteten wir die Daten aus.'],
    ['Nachdem sie angekommen ist, begann die Besprechung.','Nachdem sie angekommen war, begann die Besprechung.'],
    ['Nachdem der Kunde zugestimmt hat, bestellten wir die Teile.','Nachdem der Kunde zugestimmt hatte, bestellten wir die Teile.'],
    ['Nachdem ich den Bericht gelesen habe, schrieb ich eine Antwort.','Nachdem ich den Bericht gelesen hatte, schrieb ich eine Antwort.'],
    ['Nachdem das Team den Fehler gefunden hat, änderte es den Code.','Nachdem das Team den Fehler gefunden hatte, änderte es den Code.'],
    ['Nachdem die Anlage abgekühlt ist, öffneten wir das Gehäuse.','Nachdem die Anlage abgekühlt war, öffneten wir das Gehäuse.'],
    ['Nachdem alle Fragen geklärt wurden, unterschrieben beide Seiten.','Nachdem alle Fragen geklärt worden waren, unterschrieben beide Seiten.'],
    ['Nachdem er die Rechnung geprüft hat, gab er sie frei.','Nachdem er die Rechnung geprüft hatte, gab er sie frei.'],
    ['Nachdem wir das Büro verlassen haben, bemerkte ich meinen Fehler.','Nachdem wir das Büro verlassen hatten, bemerkte ich meinen Fehler.'],
    ['Nachdem der Regen aufgehört hat, setzten wir die Fahrt fort.','Nachdem der Regen aufgehört hatte, setzten wir die Fahrt fort.']
  ]);
  addRule('Der Relativsatz steht direkt beim Bezugswort; sein Verb steht am Ende.',[
    ['Der Kollege hat angerufen, der das Projekt leitet gestern.','Der Kollege, der das Projekt leitet, hat gestern angerufen.'],
    ['Die Datei ist beschädigt, die du geschickt hast.','Die Datei, die du geschickt hast, ist beschädigt.'],
    ['Das Gerät wurde repariert, das gestern ausgefallen ist.','Das Gerät, das gestern ausgefallen ist, wurde repariert.'],
    ['Die Kundin wartet auf eine Antwort, der wir den Entwurf gezeigt haben.','Die Kundin, der wir den Entwurf gezeigt haben, wartet auf eine Antwort.'],
    ['Der Bericht liegt auf dem Tisch, den ich gestern geschrieben habe.','Der Bericht, den ich gestern geschrieben habe, liegt auf dem Tisch.'],
    ['Die Methode liefert gute Ergebnisse, mit der wir arbeiten.','Die Methode, mit der wir arbeiten, liefert gute Ergebnisse.'],
    ['Das Team hat den Meilenstein erreicht, dessen Leiterin neu ist.','Das Team, dessen Leiterin neu ist, hat den Meilenstein erreicht.'],
    ['Die Firma eröffnet einen Standort, für die er arbeitet.','Die Firma, für die er arbeitet, eröffnet einen Standort.'],
    ['Die Aufgabe war schwierig, an die ich lange gearbeitet habe.','Die Aufgabe, an der ich lange gearbeitet habe, war schwierig.'],
    ['Der Vorschlag wurde angenommen, über den wir diskutiert haben.','Der Vorschlag, über den wir diskutiert haben, wurde angenommen.']
  ]);
  addRule('Bei gleichem Subjekt verwendet man um … zu + Infinitiv.',[
    ['Ich lerne täglich, damit ich flüssiger zu sprechen.','Ich lerne täglich, um flüssiger zu sprechen.'],
    ['Sie fährt früher los, damit sie pünktlich anzukommen.','Sie fährt früher los, um pünktlich anzukommen.'],
    ['Wir prüfen die Zahlen erneut, damit wir Fehler zu vermeiden.','Wir prüfen die Zahlen erneut, um Fehler zu vermeiden.'],
    ['Er schreibt alles auf, damit er nichts zu vergessen.','Er schreibt alles auf, um nichts zu vergessen.'],
    ['Das Team automatisiert den Prozess, damit es Zeit zu sparen.','Das Team automatisiert den Prozess, um Zeit zu sparen.'],
    ['Ich schalte das Telefon aus, damit ich mich besser zu konzentrieren.','Ich schalte das Telefon aus, um mich besser zu konzentrieren.'],
    ['Sie fragt nach, damit sie die Aufgabe richtig zu verstehen.','Sie fragt nach, um die Aufgabe richtig zu verstehen.'],
    ['Wir dokumentieren den Ablauf, damit wir ihn später zu reproduzieren.','Wir dokumentieren den Ablauf, um ihn später reproduzieren zu können.'],
    ['Er trainiert regelmäßig, damit er gesund zu bleiben.','Er trainiert regelmäßig, um gesund zu bleiben.'],
    ['Ich wiederhole die Wörter, damit ich sie nicht zu vergessen.','Ich wiederhole die Wörter, um sie nicht zu vergessen.']
  ]);
  addRule('Damit leitet einen Nebensatz mit eigenem Subjekt und Verb am Ende ein.',[
    ['Ich spreche langsam, um alle können folgen.','Ich spreche langsam, damit alle folgen können.'],
    ['Wir senden die Unterlagen früh, um der Kunde hat genug Zeit.','Wir senden die Unterlagen früh, damit der Kunde genug Zeit hat.'],
    ['Sie öffnet das Fenster, um die Luft wird besser.','Sie öffnet das Fenster, damit die Luft besser wird.'],
    ['Er erklärt den Ablauf erneut, um niemand macht einen Fehler.','Er erklärt den Ablauf erneut, damit niemand einen Fehler macht.'],
    ['Wir markieren die Änderungen, um sie sind sofort sichtbar.','Wir markieren die Änderungen, damit sie sofort sichtbar sind.'],
    ['Ich stelle einen Wecker, um ich verschlafe nicht.','Ich stelle einen Wecker, damit ich nicht verschlafe.'],
    ['Das Team erstellt eine Anleitung, um neue Kollegen können selbstständig arbeiten.','Das Team erstellt eine Anleitung, damit neue Kollegen selbstständig arbeiten können.'],
    ['Sie schickt eine Erinnerung, um alle kommen pünktlich.','Sie schickt eine Erinnerung, damit alle pünktlich kommen.'],
    ['Wir sichern die Datei, um keine Daten gehen verloren.','Wir sichern die Datei, damit keine Daten verloren gehen.'],
    ['Er reserviert einen Raum, um die Gruppe kann ungestört sprechen.','Er reserviert einen Raum, damit die Gruppe ungestört sprechen kann.']
  ]);
  addRule('Nach einem Konjunktionaladverb folgt das konjugierte Verb direkt.',[
    ['Die Frist ist kurz, deshalb wir beginnen sofort.','Die Frist ist kurz, deshalb beginnen wir sofort.'],
    ['Der Zug fällt aus, daher ich fahre mit dem Auto.','Der Zug fällt aus, daher fahre ich mit dem Auto.'],
    ['Die Daten sind unvollständig, trotzdem wir erstellen eine erste Auswertung.','Die Daten sind unvollständig, trotzdem erstellen wir eine erste Auswertung.'],
    ['Der Kunde hat zugestimmt, somit wir können bestellen.','Der Kunde hat zugestimmt, somit können wir bestellen.'],
    ['Die Nachfrage steigt, folglich das Unternehmen erweitert die Produktion.','Die Nachfrage steigt, folglich erweitert das Unternehmen die Produktion.'],
    ['Das Gerät ist defekt, deshalb es wird ausgetauscht.','Das Gerät ist defekt, deshalb wird es ausgetauscht.'],
    ['Wir haben wenig Zeit, dennoch wir prüfen jeden Schritt.','Wir haben wenig Zeit, dennoch prüfen wir jeden Schritt.'],
    ['Die Kosten sind gesunken, außerdem die Qualität hat sich verbessert.','Die Kosten sind gesunken, außerdem hat sich die Qualität verbessert.'],
    ['Der Raum ist belegt, deshalb die Sitzung findet online statt.','Der Raum ist belegt, deshalb findet die Sitzung online statt.'],
    ['Sie war gut vorbereitet, dadurch sie konnte ruhig reagieren.','Sie war gut vorbereitet, dadurch konnte sie ruhig reagieren.']
  ]);

  const unique=(list,key)=>{const seen=new Set();return list.filter(item=>{const value=key(item);if(seen.has(value))return false;seen.add(value);return true})};
  window.ERROR_LAB.endings=unique(qualityEndings,item=>item[0]+'|'+item[1]);
  window.ERROR_LAB.natural=unique([...window.ERROR_LAB.natural,...qualityNatural],item=>item.join('|'));
  window.ERROR_LAB.connectors=unique([...window.ERROR_LAB.connectors,...rules],item=>item.join('|'));
})();
