(()=>{
'use strict';
const section=document.querySelector('#praepositionen');
if(!section)return;
const STORAGE_KEY='deutsch-c1-prepositions-v1';
const COUNT_KEY='deutsch-c1-preposition-count-v1';
const categories={mixed:'Gemischt',acc:'Mit Akkusativ',dat:'Mit Dativ',gen:'Mit Genitiv',two:'Akkusativ oder Dativ'};
const items=[];
const categoryCounts={acc:0,dat:0,gen:0,two:0};
const add=(category,prompt,answer,explanation,accepted=[])=>{
 const number=++categoryCounts[category];
 items.push({id:`prep-v2-${category}-${number}`,category,prompt,answer,accepted:[answer,...accepted],explanation})
};
const sentence=(stem,context)=>stem.replace(/[.!?]$/,'')+(context||'')+'.';
const cueFromPhrase=phrase=>{
 let value=String(phrase).trim();
 value=value.replace(/^(durch|für|gegen|ohne|um|aus|außer|bei|mit|nach|seit|von|zu|außerhalb|aufgrund|innerhalb|statt|trotz|während|wegen|an|auf|hinter|in|neben|über|unter|vor|zwischen)\s+/i,'');
 value=value.replace(/^(am|ans|beim|im|ins|vom|zum|zur)\s+/i,'');
 value=value.replace(/^(der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines|dieser|diese|dieses|diesen|diesem|meine?|meinen|meinem|meiner|meines|deine?|deinen|deinem|deiner|deines|seine?|seinen|seinem|seiner|seines|ihre?|ihren|ihrem|ihrer|ihres|unsere?|unseren|unserem|unserer|unseres|eure?|euren|eurem|eurer|eures|alle|allen|aller|jede?|jeden|jedem|jeder|jedes|keine?|keinen|keinem|keiner|keines)\s+/i,'');
 value=value.replace(/\s+gegenüber$/i,'');
 return value;
};
const articleType=phrase=>{
 const first=String(phrase).trim().split(/\s+/)[0].toLocaleLowerCase('de-DE');
 if(['am','ans','beim','im','ins','vom','zum','zur'].includes(first))return 'bestimmter Artikel';
 const withoutPreposition=String(phrase).replace(/^(durch|für|gegen|ohne|um|aus|außer|bei|gegenüber|mit|nach|seit|von|zu|außerhalb|aufgrund|innerhalb|statt|trotz|während|wegen)\s+/i,'');
 const determiner=withoutPreposition.trim().split(/\s+/)[0].toLocaleLowerCase('de-DE');
 if(/^(der|die|das|den|dem|des)$/.test(determiner))return 'bestimmter Artikel';
 if(/^(ein|eine|einen|einem|einer|eines)$/.test(determiner))return 'unbestimmter Artikel';
 if(/^dies/.test(determiner))return 'Demonstrativartikel: dies-';
 if(/^mein/.test(determiner))return 'Possessivartikel: mein-';
 if(/^dein/.test(determiner))return 'Possessivartikel: dein-';
 if(/^sein/.test(determiner))return 'Possessivartikel: sein-';
 if(/^ihr/.test(determiner))return 'Possessivartikel: ihr-';
 if(/^unser/.test(determiner))return 'Possessivartikel: unser-';
 if(/^euer/.test(determiner))return 'Possessivartikel: euer-';
 if(/^(alle|allen|aller|jed|kein|mehrer|zahlreich)/.test(determiner))return 'Artikelwort: '+determiner;
 return 'ohne Artikel';
};
const pluralNounHeads=new Set([
 'behörden','beteiligten','beschwerden','erfahrungen','ergebnissen','erkenntnisse','experten',
 'kollegen','kosten','meetings','mitarbeitenden','nachbarn','praktikanten','ressourcen',
 'rückfragen','rückmeldungen','schwierigkeiten','sitzungen','spezialisten','städte','tests',
 'verhandlungen','werkzeugen','wochen','wohnungen'
]);
const grammaticalNumber=phrase=>{
 const clean=String(phrase).replace(/\s+gegenüber$/i,'').trim();
 const head=clean.split(/\s+/).pop().toLocaleLowerCase('de-DE');
 return pluralNounHeads.has(head)?'Plural':'Singular';
};
const withCue=(prompt,phrase)=>prompt.replace(/\.$/,` (Vorgegebene Wörter: ${cueFromPhrase(phrase)} · ${articleType(phrase)} · ${grammaticalNumber(phrase)}).`);
const acceptedAlternatives=phrase=>{
 const alternatives=[];
 if(/^aufgrund\s+/i.test(phrase))alternatives.push(phrase.replace(/^aufgrund/i,'wegen'));
 if(/^wegen\s+/i.test(phrase))alternatives.push(phrase.replace(/^wegen/i,'aufgrund'));
 if(/^statt\s+/i.test(phrase))alternatives.push(phrase.replace(/^statt/i,'anstatt'));
 return alternatives;
};
const generate=(category,configs,target)=>{
 const generated=[];
 for(const config of configs){
  for(const stem of config.stems)for(const phrase of config.phrases)for(const context of config.contexts||['']){
   generated.push({prompt:withCue(sentence(stem,context),phrase),answer:phrase,explanation:config.explanation,accepted:[...(config.accepted?.[phrase]||[]),...acceptedAlternatives(phrase)]})
  }
 }
 let index=0;
 while(categoryCounts[category]<target){
  const item=generated[index%generated.length];
  const round=Math.floor(index/generated.length);
  const prompt=round?item.prompt.replace(/.$/,` – Beispiel ${round+1}.`):item.prompt;
  add(category,prompt,item.answer,item.explanation,item.accepted);
  index++
 }
};
const accConfigs=[
 {stems:['Wir gehen ___','Die Besuchergruppe läuft ___','Der Weg führt ___','Sie geht allein ___','Die Führung verläuft ___'],phrases:['durch den Park','durch die Altstadt','durch das Museum','durch den Tunnel','durch die Halle','durch den Haupteingang','durch die schmale Gasse','durch das offene Tor','durch den langen Korridor','durch die Fußgängerzone'],contexts:[', um Zeit zu sparen',', ohne anzuhalten',', auf dem Weg zum Termin',', während der Besichtigung'],explanation:'„durch“ steht immer mit Akkusativ.'},
 {stems:['Ich bereite die Unterlagen ___ vor','Wir entwickeln eine Lösung ___','Diese Information ist wichtig ___','Das Training wurde ___ organisiert','Sie übernimmt die Vertretung ___'],phrases:['für den neuen Kunden','für die nächste Besprechung','für das gesamte Team','für meinen Kollegen','für unsere Abteilung','für die Geschäftsleitung','für das kommende Quartal','für einen erfolgreichen Start','für die internationale Gruppe','für alle Beteiligten'],contexts:[', noch heute',', mit großer Sorgfalt',', wie vereinbart',', vor dem nächsten Termin'],explanation:'„für“ steht immer mit Akkusativ.'},
 {stems:['Viele Beschäftigte stimmen ___','Das Team entscheidet sich ___','Die Initiative richtet sich ___','Die Mehrheit spricht sich ___ aus','Mehrere Abteilungen protestieren ___'],phrases:['gegen den Vorschlag','gegen die neue Regelung','gegen das aktuelle Modell','gegen einen übereilten Beschluss','gegen unnötige Bürokratie','gegen den geplanten Stellenabbau','gegen die bisherige Vorgehensweise','gegen eine vorschnelle Entscheidung','gegen den vorgelegten Entwurf','gegen diese Änderung'],contexts:[', nach langer Diskussion',', aus nachvollziehbaren Gründen',', trotz des Zeitdrucks',', nach sorgfältiger Prüfung'],explanation:'„gegen“ steht immer mit Akkusativ.'},
 {stems:['Ich kann die Aufgabe ___ nicht abschließen','Wir beginnen das Projekt ___','Sie setzt die Arbeit ___ fort','Das Team arbeitet ___','Er führt die Prüfung ___ durch'],phrases:['ohne deine Unterstützung','ohne den schriftlichen Auftrag','ohne eine klare Begründung','ohne das erforderliche Werkzeug','ohne meinen erfahrenen Kollegen','ohne zusätzliche Ressourcen','ohne unnötige Verzögerung','ohne fremde Hilfe','ohne vorherige Ankündigung','ohne weitere Unterbrechung'],contexts:[', wie erwartet',', unter diesen Bedingungen',', in der verfügbaren Zeit',', bei diesem Projekt'],explanation:'„ohne“ steht immer mit Akkusativ.'},
 {stems:['Wir kümmern uns ___','Die Diskussion dreht sich ___','Dabei geht es ___','Die Entscheidung dreht sich ___','Die Verhandlungen gehen ___'],phrases:['um den neuen Auftrag','um die offene Stelle','um das technische Problem','um einen passenden Termin','um die weitere Finanzierung','um unsere neuen Mitarbeitenden','um eine schnelle Entscheidung','um den nächsten Projektschritt','um eine gerechte Lösung','um das gemeinsame Ziel'],contexts:[', seit gestern',', mit hoher Priorität',', in dieser Woche',', gemeinsam mit der Fachabteilung'],explanation:'„um“ steht immer mit Akkusativ.'}
];
generate('acc',accConfigs,1000);

const datConfigs=[
 {stems:['Die Information stammt ___','Wir beziehen die Daten ___','Der zitierte Abschnitt kommt ___','Sie übernimmt die Kennzahlen ___','Die Grundlage für die Analyse stammt ___'],phrases:['aus dem aktuellen Bericht','aus der internen Datenbank','aus dem Forschungslabor','aus der letzten Besprechung','aus einem anerkannten Fachartikel','aus unserer Dokumentation'],contexts:[', wie vereinbart',', nach sorgfältiger Prüfung',', für die weitere Analyse',', mit Zustimmung der Verantwortlichen'],explanation:'„aus“ steht immer mit Dativ.'},
 {stems:['___ waren alle pünktlich','___ hat niemand widersprochen','___ kann jeder teilnehmen','___ wurde das gesamte Team eingeladen','___ kenne ich dort niemanden'],phrases:['außer dem neuen Kollegen','außer der Projektleiterin','außer einem externen Berater','außer meiner direkten Vorgesetzten','außer den beiden Praktikanten','außer unserem technischen Experten'],contexts:[', soweit ich weiß',', in diesem Zusammenhang',', nach der aktuellen Planung',', trotz der kurzfristigen Änderung'],explanation:'„außer“ steht gewöhnlich mit Dativ.'},
 {stems:['Sie arbeitet ___','Ich habe heute einen Termin ___','Wir informieren uns ___','Die Anfrage wird ___ bearbeitet','Er bittet um Unterstützung ___'],phrases:['bei einem internationalen Unternehmen','bei der Personalabteilung','bei unserem wichtigsten Kunden','bei einem erfahrenen Kollegen','bei den zuständigen Behörden','bei einem externen Dienstleister'],contexts:[', im Rahmen dieses Projekts',', vor dem wichtigen Gespräch',', nach sorgfältiger Vorbereitung',', während der aktuellen Projektphase'],explanation:'„bei“ steht immer mit Dativ.'},
 {stems:['Das Café liegt ___','Mein Büro befindet sich ___','Sie sitzt ___','Der Eingang ist direkt ___','Das Hotel steht ___'],phrases:['dem Bahnhof gegenüber','der Stadtbibliothek gegenüber','einem großen Park gegenüber','unserem Bürogebäude gegenüber','den neuen Wohnungen gegenüber','meiner früheren Schule gegenüber'],contexts:[', auf der anderen Straßenseite',', gut sichtbar',', nur wenige Minuten entfernt',', mitten im Zentrum'],explanation:'„gegenüber“ steht mit Dativ und kann vor oder nach dem Bezugswort stehen.'},
 {stems:['Wir bearbeiten die Aufgabe ___','Ich bespreche das Problem ___','Sie arbeitet eng ___ zusammen','Das Team prüft die Ergebnisse ___','Die Analyse wird ___ durchgeführt'],phrases:['mit einer bewährten Methode','mit meiner erfahrenen Kollegin','mit unserem Entwicklungsteam','mit einem sicheren Programm','mit den verfügbaren Werkzeugen','mit einem externen Spezialisten'],contexts:[', ohne unnötige Verzögerung',', unter realistischen Bedingungen',', noch vor dem Termin',', im täglichen Arbeitsablauf'],explanation:'„mit“ steht immer mit Dativ.'},
 {stems:['___ gehen wir nach Hause','___ beginnt die Auswertung','___ änderte das Team den Plan','___ brauche ich eine Pause','___ erhalten Sie eine Bestätigung'],phrases:['nach dem Gespräch','nach der Besprechung','nach einem langen Arbeitstag','nach unserer gemeinsamen Prüfung','nach den ersten Ergebnissen','nach meiner Rückkehr'],contexts:[', wie vereinbart',', am selben Tag',', ohne weitere Verzögerung',', in aller Ruhe'],explanation:'„nach“ steht immer mit Dativ.'},
 {stems:['Er arbeitet ___ hier','Wir kennen uns ___','Die Anlage läuft ___ störungsfrei','Sie wartet ___ auf eine Antwort','Das Verfahren gilt ___'],phrases:['seit einem Jahr','seit der letzten Besprechung','seit meinem Studienabschluss','seit mehreren Wochen','seit dem vergangenen Montag','seit den ersten Tests'],contexts:[', ohne Unterbrechung',', in derselben Abteilung',', zu unserer Zufriedenheit',', unter realen Bedingungen'],explanation:'„seit“ steht immer mit Dativ und bezeichnet einen Beginn in der Vergangenheit, der bis heute reicht.'},
 {stems:['Die Nachricht kommt ___','Wir haben die Daten ___ erhalten','Der Vorschlag stammt ___','Die Rückmeldung wurde ___ übermittelt','Diese Einschätzung kommt ___'],phrases:['von meiner Chefin','von der Personalabteilung','von einem externen Partner','von unserer Forschungsgruppe','von den zuständigen Kollegen','vom verantwortlichen Projektleiter'],contexts:[', noch am selben Tag',', wie erwartet',', für die nächste Projektphase',', nach sorgfältiger Abstimmung'],explanation:'„von“ steht immer mit Dativ. Singular: „von dem“ wird meist zu „vom“. Plural: „von den“, zum Beispiel „von den Kollegen“.'},
 {stems:['Ich gehe ___','Wir fahren ___','Sie kommt ___','Er fährt ___','Meine Kollegin geht ___'],phrases:['zum Arzt','zur Arbeit','zu meiner Freundin','zu einem wichtigen Kundentermin','zu unserer Niederlassung','zu den neuen Nachbarn'],contexts:[', am frühen Morgen',', direkt nach dem Frühstück',', wie vereinbart',', noch vor Mittag'],explanation:'„zu“ steht immer mit Dativ. „zu dem“ wird zu „zum“, „zu der“ zu „zur“.'}
];
const datTargets=[112,111,111,111,111,111,111,111,111];
let datTotal=0;datConfigs.forEach((config,i)=>{datTotal+=datTargets[i];generate('dat',[config],datTotal)});

const genConfigs=[
 {stems:['___ gelten andere Bedingungen','___ ist der Zugang eingeschränkt','___ benötigen Besucher eine Genehmigung','___ ist diese Regel nicht anwendbar'],phrases:['außerhalb des Firmengeländes','außerhalb der regulären Arbeitszeit','außerhalb eines geschlossenen Bereichs','außerhalb unserer Zuständigkeit','außerhalb der großen Städte','außerhalb des historischen Zentrums','außerhalb des vereinbarten Zeitrahmens','außerhalb der Europäischen Union','außerhalb des Gebäudes'],contexts:[', aus Sicherheitsgründen',', bis auf Weiteres',', nach aktueller Planung',', ohne besondere Genehmigung'],explanation:'„außerhalb“ steht mit Genitiv.'},
 {stems:['___ wurde der Plan angepasst','___ kam es zu Verzögerungen','___ brauchen wir eine neue Lösung','___ wird die Entscheidung erneut geprüft'],phrases:['aufgrund des technischen Fehlers','aufgrund der neuen Erkenntnisse','aufgrund eines kurzfristigen Ausfalls','aufgrund unserer bisherigen Erfahrungen','aufgrund der hohen Kosten','aufgrund des engen Zeitplans','aufgrund einer gesetzlichen Änderung','aufgrund des starken Verkehrs','aufgrund zahlreicher Rückmeldungen'],contexts:[', bei der Umsetzung',', nach sorgfältiger Prüfung',', für die nächste Projektphase',', in Abstimmung mit dem Kunden'],explanation:'„aufgrund“ steht mit Genitiv.'},
 {stems:['Die Bearbeitung muss ___ abgeschlossen werden','Das Team muss ___ reagieren','Der Antrag muss ___ geprüft werden','Die Entscheidung muss ___ getroffen werden'],phrases:['innerhalb eines Tages','innerhalb der nächsten Woche','innerhalb des vereinbarten Zeitraums','innerhalb eines Monats','innerhalb der nächsten zwei Wochen','innerhalb einer klaren Frist','innerhalb des ersten Quartals','innerhalb weniger Stunden','innerhalb eines Jahres'],contexts:[', wie vereinbart',', ohne weitere Aufforderung',', nach Eingang der Anfrage',', in einem geregelten Verfahren'],explanation:'„innerhalb“ steht mit Genitiv.'},
 {stems:['___ verwenden wir eine digitale Alternative','___ wurde eine andere Lösung gewählt','___ nutzen wir ein einfacheres Verfahren','___ kommt jetzt ein neues System zum Einsatz'],phrases:['statt des persönlichen Treffens','statt der geplanten Reise','statt eines langen Berichts','statt unserer bisherigen Methode','statt der alten Software','statt des ursprünglichen Entwurfs','statt einer komplizierten Lösung','statt des gedruckten Formulars','statt zusätzlicher Sitzungen'],contexts:[', aus praktischen Gründen',', nach gemeinsamer Absprache',', für diese Projektphase',', ohne Qualitätsverlust'],explanation:'„statt“ beziehungsweise „anstatt“ steht in der Standardsprache mit Genitiv.'},
 {stems:['___ wurde das Ziel erreicht','___ konnte das Team weiterarbeiten','___ blieb der Zeitplan stabil','___ wurde eine gute Lösung gefunden'],phrases:['trotz des schlechten Wetters','trotz der großen Schwierigkeiten','trotz eines technischen Problems','trotz unserer begrenzten Ressourcen','trotz der hohen Arbeitsbelastung','trotz des engen Zeitplans','trotz einer kurzfristigen Änderung','trotz des starken Widerstands','trotz zahlreicher Rückfragen'],contexts:[', wie geplant',', mit einem guten Ergebnis',', gemeinsam als Team',', ohne zusätzliche Kosten'],explanation:'„trotz“ steht in der Standardsprache mit Genitiv.'},
 {stems:['___ blieb das Telefon ausgeschaltet','___ wurden wichtige Fragen geklärt','___ machte ich mir Notizen','___ durfte niemand den Raum verlassen'],phrases:['während des Meetings','während der gesamten Reise','während eines wichtigen Gesprächs','während unserer gemeinsamen Arbeit','während der ersten Projektphase','während des laufenden Betriebs','während einer kurzen Unterbrechung','während des vergangenen Jahres','während der Verhandlungen'],contexts:[', wie vereinbart',', durchgehend',', ohne Unterbrechung',', bis zum Ende'],explanation:'„während“ steht in der Standardsprache mit Genitiv.'},
 {stems:['___ wurde der Termin verschoben','___ kam es zu Verzögerungen','___ musste der Ablauf geändert werden','___ konnte die Arbeit nicht wie geplant fortgesetzt werden'],phrases:['wegen des schlechten Wetters','wegen der kurzfristigen Absage','wegen eines technischen Fehlers','wegen unserer begrenzten Zeit','wegen der hohen Kosten','wegen des fehlenden Dokuments','wegen einer unerwarteten Änderung','wegen des starken Verkehrs','wegen zahlreicher Beschwerden'],contexts:[', bis auf Weiteres',', nach Rücksprache mit dem Team',', unter den aktuellen Bedingungen',', trotz guter Vorbereitung'],explanation:'„wegen“ steht in der Standardsprache mit Genitiv.'}
];
let genTotal=0;const genTargets=[143,143,143,143,143,143,142];genConfigs.forEach((config,i)=>{genTotal+=genTargets[i];generate('gen',[config],genTotal)});

const twoConfigs=[
 {prep:'an',accStems:['Ich hänge das Bild ___','Wir stellen den Tisch ___','Sie setzt sich ___','Er befestigt den Hinweis ___','Das Team schiebt das Regal ___','Ich stelle die Leiter ___','Wir hängen den Kalender ___'],datStems:['Das Bild hängt ___','Der Tisch steht ___','Sie sitzt ___','Der Hinweis hängt ___','Das Regal steht ___','Die Leiter steht ___','Der Kalender hängt ___'],acc:['an die Wand','an das Fenster','an den Schrank','an die Tür','an den freien Platz','an das Ende des Tisches','an die Pinnwand','an den Rand'],dat:['an der Wand','am Fenster','an dem Schrank','an der Tür','an dem freien Platz','am Ende des Tisches','an der Pinnwand','an dem Rand']},
 {prep:'auf',accStems:['Ich lege das Buch ___','Wir stellen den Karton ___','Sie legt die Unterlagen ___','Er stellt die Tasse ___','Das Team schiebt das Gerät ___','Ich lege das Telefon ___','Wir stellen die Kiste ___'],datStems:['Das Buch liegt ___','Der Karton steht ___','Die Unterlagen liegen ___','Die Tasse steht ___','Das Gerät steht ___','Das Telefon liegt ___','Die Kiste steht ___'],acc:['auf den Tisch','auf die Ablage','auf das Regal','auf den Schreibtisch','auf die freie Fläche','auf das Dach','auf den Boden','auf die Fensterbank'],dat:['auf dem Tisch','auf der Ablage','auf dem Regal','auf dem Schreibtisch','auf der freien Fläche','auf dem Dach','auf dem Boden','auf der Fensterbank']},
 {prep:'hinter',accStems:['Ich stelle den Karton ___','Wir schieben den Stuhl ___','Sie legt die Tasche ___','Er stellt das Fahrrad ___','Das Team bewegt das Gerät ___','Ich schiebe die Kiste ___','Wir stellen den Wagen ___'],datStems:['Der Karton steht ___','Der Stuhl steht ___','Die Tasche liegt ___','Das Fahrrad steht ___','Das Gerät befindet sich ___','Die Kiste steht ___','Der Wagen steht ___'],acc:['hinter den Schrank','hinter die Tür','hinter das Gebäude','hinter den Vorhang','hinter die Absperrung','hinter das Sofa','hinter den Bildschirm','hinter die Garage'],dat:['hinter dem Schrank','hinter der Tür','hinter dem Gebäude','hinter dem Vorhang','hinter der Absperrung','hinter dem Sofa','hinter dem Bildschirm','hinter der Garage']},
 {prep:'in',accStems:['Ich lege die Akte ___','Wir stellen die Kiste ___','Sie geht ___','Er legt das Werkzeug ___','Das Team bringt das Gerät ___','Ich stecke das Telefon ___','Wir fahren ___'],datStems:['Die Akte liegt ___','Die Kiste steht ___','Sie arbeitet ___','Das Werkzeug liegt ___','Das Gerät befindet sich ___','Das Telefon steckt ___','Wir sind ___'],acc:['in den Schrank','in die Schublade','ins Büro','in den Besprechungsraum','in die Tasche','in das Lager','in den Karton','in die Werkstatt'],dat:['in dem Schrank','in der Schublade','im Büro','in dem Besprechungsraum','in der Tasche','in dem Lager','in dem Karton','in der Werkstatt']},
 {prep:'neben',accStems:['Ich stelle den Karton ___','Wir schieben den Stuhl ___','Sie legt die Tasche ___','Er stellt das Gerät ___','Das Team bewegt den Tisch ___','Ich lege die Unterlagen ___','Wir stellen das Regal ___'],datStems:['Der Karton steht ___','Der Stuhl steht ___','Die Tasche liegt ___','Das Gerät steht ___','Der Tisch steht ___','Die Unterlagen liegen ___','Das Regal steht ___'],acc:['neben den Drucker','neben die Tür','neben das Fenster','neben den Schreibtisch','neben die Maschine','neben das Regal','neben den Eingang','neben die Treppe'],dat:['neben dem Drucker','neben der Tür','neben dem Fenster','neben dem Schreibtisch','neben der Maschine','neben dem Regal','neben dem Eingang','neben der Treppe']},
 {prep:'über',accStems:['Ich hänge die Lampe ___','Wir hängen das Schild ___','Sie hängt das Bild ___','Er befestigt den Sensor ___','Das Team montiert die Anzeige ___','Ich hänge die Jacke ___','Wir setzen die Markierung ___'],datStems:['Die Lampe hängt ___','Das Schild hängt ___','Das Bild hängt ___','Der Sensor befindet sich ___','Die Anzeige hängt ___','Die Jacke hängt ___','Die Markierung befindet sich ___'],acc:['über den Schreibtisch','über die Tür','über das Regal','über den Bildschirm','über die Arbeitsfläche','über das Sofa','über den Eingang','über die Maschine'],dat:['über dem Schreibtisch','über der Tür','über dem Regal','über dem Bildschirm','über der Arbeitsfläche','über dem Sofa','über dem Eingang','über der Maschine']},
 {prep:'unter',accStems:['Ich stelle den Karton ___','Wir schieben den Stuhl ___','Sie legt die Tasche ___','Er stellt das Werkzeug ___','Das Team bewegt die Kiste ___','Ich lege das Kabel ___','Wir stellen das Fahrrad ___'],datStems:['Der Karton steht ___','Der Stuhl steht ___','Die Tasche liegt ___','Das Werkzeug liegt ___','Die Kiste steht ___','Das Kabel liegt ___','Das Fahrrad steht ___'],acc:['unter den Tisch','unter die Ablage','unter das Regal','unter den Schreibtisch','unter die Treppe','unter das Fenster','unter den Stuhl','unter die Brücke'],dat:['unter dem Tisch','unter der Ablage','unter dem Regal','unter dem Schreibtisch','unter der Treppe','unter dem Fenster','unter dem Stuhl','unter der Brücke']},
 {prep:'vor',accStems:['Ich stelle den Karton ___','Wir schieben den Tisch ___','Sie legt die Matte ___','Er stellt das Fahrrad ___','Das Team bewegt die Absperrung ___','Ich stelle den Stuhl ___','Wir parken den Wagen ___'],datStems:['Der Karton steht ___','Der Tisch steht ___','Die Matte liegt ___','Das Fahrrad steht ___','Die Absperrung steht ___','Der Stuhl steht ___','Der Wagen steht ___'],acc:['vor den Eingang','vor die Tür','vor das Gebäude','vor den Schrank','vor die Garage','vor das Fenster','vor den Bildschirm','vor die Absperrung'],dat:['vor dem Eingang','vor der Tür','vor dem Gebäude','vor dem Schrank','vor der Garage','vor dem Fenster','vor dem Bildschirm','vor der Absperrung']},
 {prep:'zwischen',accStems:['Ich stelle den Karton ___','Wir schieben den Stuhl ___','Sie legt die Unterlagen ___','Er stellt das Gerät ___','Das Team bewegt den Tisch ___','Ich lege das Kabel ___','Wir stellen das Regal ___'],datStems:['Der Karton steht ___','Der Stuhl steht ___','Die Unterlagen liegen ___','Das Gerät steht ___','Der Tisch steht ___','Das Kabel liegt ___','Das Regal steht ___'],acc:['zwischen den Computer und den Drucker','zwischen die Tür und das Fenster','zwischen das Regal und den Schrank','zwischen den Tisch und die Wand','zwischen die Maschine und die Werkbank','zwischen das Sofa und den Sessel','zwischen den Eingang und die Treppe','zwischen die beiden Schränke'],dat:['zwischen dem Computer und dem Drucker','zwischen der Tür und dem Fenster','zwischen dem Regal und dem Schrank','zwischen dem Tisch und der Wand','zwischen der Maschine und der Werkbank','zwischen dem Sofa und dem Sessel','zwischen dem Eingang und der Treppe','zwischen den beiden Schränken']}
];
const articleGap=(stem,phrase,prep,kase)=>{
 let rest=phrase,answer='',accepted=[];
 const contractions={am:['an','dem'],ans:['an','das'],im:['in','dem'],ins:['in','das']};
 const first=rest.split(' ')[0];
 if(contractions[first]){answer=contractions[first][1];rest=rest.split(' ').slice(1).join(' ')}
 else{rest=rest.replace(new RegExp('^'+prep+'\\s+','i'),'');const parts=rest.split(' ');answer=parts.shift();rest=parts.join(' ')}
 if(prep==='zwischen'){
  const match=rest.match(/^(den|die|das|dem|der)\\s+(.+?)\\s+und\\s+(den|die|das|dem|der)\\s+(.+)$/);
  if(match){answer=match[1]+' / '+match[3];accepted=[match[1]+' '+match[3],match[1]+', '+match[3]];rest='___ '+match[2]+' und ___ '+match[4]}
  else rest='___ '+rest
 }else rest='___ '+rest;
 return{prompt:stem.replace('___',prep+' '+rest)+'.',answer,accepted,explanation:`„${prep}“ beantwortet hier „${kase==='acc'?'wohin':'wo'}?“ und steht deshalb mit ${kase==='acc'?'Akkusativ':'Dativ'}.`}
};
let twoTotal=0;const twoTargets=[112,111,111,111,111,111,111,111,111];
twoConfigs.forEach((config,i)=>{
 const target=twoTargets[i],start=categoryCounts.two;
 for(const stem of config.accStems)for(const phrase of config.acc){const item=articleGap(stem,phrase,config.prep,'acc');add('two',item.prompt,item.answer,item.explanation,item.accepted)}
 for(const stem of config.datStems)for(const phrase of config.dat){const item=articleGap(stem,phrase,config.prep,'dat');add('two',item.prompt,item.answer,item.explanation,item.accepted)}
 if(categoryCounts.two-start>target)items.splice(items.length-(categoryCounts.two-start-target));
 categoryCounts.two=start+target;
});

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