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
const dativePrepositions=new Set(['aus','außer','bei','gegenüber','mit','nach','seit','von','zu']);
const accusativePrepositions=new Set(['durch','für','gegen','ohne','um']);
const weakMasculineHeads=new Set(['kollegen','kunden','praktikanten','experten','partner','berater','dienstleister','vorgesetzten','projektleiter']);
const grammaticalNumber=phrase=>{
 let value=String(phrase).trim();
 let preposition='';
 const leading=value.match(/^(durch|für|gegen|ohne|um|aus|außer|bei|mit|nach|seit|von|zu|außerhalb|aufgrund|innerhalb|statt|trotz|während|wegen|an|auf|hinter|in|neben|über|unter|vor|zwischen)\s+/i);
 if(leading){
  preposition=leading[1].toLocaleLowerCase('de-DE');
  value=value.slice(leading[0].length);
 }else if(/\s+gegenüber$/i.test(value)){
  preposition='gegenüber';
  value=value.replace(/\s+gegenüber$/i,'');
 }
 const words=value.trim().split(/\s+/);
 const first=(words[0]||'').toLocaleLowerCase('de-DE');
 const head=(words[words.length-1]||'').toLocaleLowerCase('de-DE');

 // These contractions and article forms are unambiguously singular.
 if(/^(am|ans|beim|im|ins|vom|zum|zur|dem|des|einem|einer|eines|einen)$/.test(first))return 'Singular';

 // Quantity words always identify a plural noun group.
 if(/^(alle|allen|aller|beide|beiden|beider|mehrere|mehreren|mehrerer|zahlreiche|zahlreichen|zahlreicher)$/.test(first))return 'Plural';
 if(/^\d+$/.test(first)&&Number(first)!==1)return 'Plural';

 // “den” is plural after a dative preposition, but masculine singular after an accusative preposition.
 if(first==='den')return dativePrepositions.has(preposition)?'Plural':'Singular';

 // With weak masculine nouns, -en can mark accusative singular: meinen Kollegen.
 if(accusativePrepositions.has(preposition)
   && /^(meinen|deinen|seinen|ihren|unseren|euren|diesen)$/.test(first)
   && weakMasculineHeads.has(head))return 'Singular';

 // In the dative, possessive/demonstrative article endings identify number reliably.
 if(dativePrepositions.has(preposition)){
  if(/^(meinem|meiner|deinem|deiner|seinem|seiner|ihrem|ihrer|unserem|unserer|eurem|eurer|diesem|dieser)$/.test(first))return 'Singular';
  if(/^(meinen|deinen|seinen|ihren|unseren|euren|diesen)$/.test(first))return 'Plural';
 }

 // Remaining forms such as “die”, “der”, “meine” or articleless groups need the noun itself.
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

const cfg=(explanation,rows)=>({explanation,items:rows.map(([stem,answer])=>({stem,answer}))});
const generateCurated=(category,configs,target)=>{
 const base=[];
 configs.forEach(config=>config.items.forEach(item=>base.push({
  prompt:withCue(sentence(item.stem,''),item.answer),
  answer:item.answer,
  explanation:config.explanation,
  accepted:item.accepted||[]
 })));
 let index=0;
 while(categoryCounts[category]<target){
  const item=base[index%base.length],round=Math.floor(index/base.length);
  const prompt=round?item.prompt.replace(/\.$/,` – Variante ${round+1}.`):item.prompt;
  add(category,prompt,item.answer,item.explanation,item.accepted);
  index++
 }
};

const accConfigs=[
 cfg('„durch“ bezeichnet eine Bewegung durch einen Raum oder ein Gebiet und steht immer mit Akkusativ.',[
  ['Wir gehen ___ und kommen am anderen Ende wieder heraus','durch den Park'],
  ['Die Besuchergruppe läuft ___ von einem Stadttor zum anderen','durch die Altstadt'],
  ['Der Rundgang führt ___ vom Eingang bis zum Ausgang','durch das Museum'],
  ['Der Zug fährt ___ und erreicht danach das Tal','durch den Tunnel'],
  ['Die Gäste gehen ___ direkt zum Ausgang','durch die Halle'],
  ['Die Besucher betreten das Gebäude ___','durch den Haupteingang'],
  ['Wir gelangen ___ auf den Innenhof','durch die schmale Gasse'],
  ['Der Lieferwagen fährt ___ auf das Gelände','durch das offene Tor'],
  ['Sie läuft ___ bis zum Konferenzraum','durch den langen Korridor'],
  ['Die Gruppe geht ___ bis zum Marktplatz','durch die Fußgängerzone']
 ]),
 cfg('„für“ bezeichnet hier Zweck, Empfänger oder Eignung und steht immer mit Akkusativ.',[
  ['Ich bereite die Unterlagen ___ vor','für den neuen Kunden'],
  ['Wir brauchen die Zahlen ___','für die nächste Besprechung'],
  ['Diese Entscheidung gilt ___','für das gesamte Team'],
  ['Sie übernimmt heute die Vertretung ___','für meinen Kollegen'],
  ['Wir entwickeln eine passende Lösung ___','für unsere Abteilung'],
  ['Der Bericht ist ausschließlich ___ bestimmt','für die Geschäftsleitung'],
  ['Wir planen zusätzliche Ressourcen ___ ein','für das kommende Quartal'],
  ['Eine klare Einführung ist wichtig ___','für einen erfolgreichen Start'],
  ['Das Seminar wurde speziell ___ organisiert','für die internationale Gruppe'],
  ['Die neue Regelung schafft Klarheit ___','für alle Beteiligten']
 ]),
 cfg('„gegen“ bezeichnet hier Widerstand, Ablehnung oder ein Gegenmittel und steht immer mit Akkusativ.',[
  ['Die Mehrheit stimmt ___','gegen den Vorschlag'],
  ['Mehrere Beschäftigte protestieren ___','gegen die neue Regelung'],
  ['Das Team entscheidet sich bewusst ___','gegen das aktuelle Modell'],
  ['Die Fachabteilung warnt ___','gegen einen übereilten Beschluss'],
  ['Die Initiative richtet sich ___','gegen unnötige Bürokratie'],
  ['Die Belegschaft demonstriert ___','gegen den geplanten Stellenabbau'],
  ['Gute Argumente sprechen ___','gegen die bisherige Vorgehensweise'],
  ['Der Betriebsrat wendet sich ___','gegen eine vorschnelle Entscheidung'],
  ['Drei Abteilungen stimmten ___','gegen den vorgelegten Entwurf'],
  ['Viele Mitarbeitende äußerten sich ___','gegen diese Änderung']
 ]),
 cfg('„ohne“ bezeichnet das Fehlen einer Person oder Sache und steht immer mit Akkusativ.',[
  ['Ich kann die Aufgabe ___ nicht abschließen','ohne deine Unterstützung'],
  ['Wir dürfen das Projekt ___ nicht beginnen','ohne den schriftlichen Auftrag'],
  ['Sie lehnte den Antrag ___ ab','ohne eine klare Begründung'],
  ['Die Reparatur gelingt ___ nicht','ohne das erforderliche Werkzeug'],
  ['Ich möchte das Gespräch ___ nicht führen','ohne meinen erfahrenen Kollegen'],
  ['Das Ziel ist ___ nicht erreichbar','ohne zusätzliche Ressourcen'],
  ['Die Sitzung endete ___','ohne unnötige Verzögerung'],
  ['Er löste das Problem ___','ohne fremde Hilfe'],
  ['Die Firma änderte den Ablauf ___','ohne vorherige Ankündigung'],
  ['Danach lief die Anlage ___ weiter','ohne weitere Unterbrechung']
 ]),
 cfg('„um“ gehört zu diesen festen Verbindungen und steht immer mit Akkusativ.',[
  ['Wir kümmern uns ___','um den neuen Auftrag'],
  ['Die Diskussion dreht sich ___','um die offene Stelle'],
  ['In diesem Bericht geht es ___','um das technische Problem'],
  ['Wir bemühen uns ___','um einen passenden Termin'],
  ['Das Team verhandelt ___','um die weitere Finanzierung'],
  ['Die Personalabteilung kümmert sich ___','um unsere neuen Mitarbeitenden'],
  ['Die Kundin bittet ___','um eine schnelle Entscheidung'],
  ['Heute geht es vor allem ___','um den nächsten Projektschritt'],
  ['Beide Seiten ringen ___','um eine gerechte Lösung'],
  ['Alle arbeiten gemeinsam ___','um das gemeinsame Ziel']
 ])
];
generateCurated('acc',accConfigs,1000);

const datConfigs=[
 cfg('„aus“ bezeichnet hier Herkunft oder Quelle und steht immer mit Dativ.',[
  ['Die Kennzahlen stammen ___','aus dem aktuellen Bericht'],
  ['Wir beziehen die Daten ___','aus der internen Datenbank'],
  ['Die Probe kommt direkt ___','aus dem Forschungslabor'],
  ['Diese Information kenne ich ___','aus der letzten Besprechung'],
  ['Das Zitat stammt ___','aus einem anerkannten Fachartikel'],
  ['Die technische Grundlage übernehmen wir ___','aus unserer Dokumentation']
 ]),
 cfg('„außer“ schließt hier eine Person oder Gruppe aus und steht mit Dativ.',[
  ['Alle waren pünktlich ___','außer dem neuen Kollegen'],
  ['Niemand widersprach dem Vorschlag ___','außer der Projektleiterin'],
  ['An der internen Sitzung nahm niemand Externes teil ___','außer einem externen Berater'],
  ['Alle stimmten der Änderung zu ___','außer meiner direkten Vorgesetzten'],
  ['Das gesamte Team war anwesend ___','außer den beiden Praktikanten'],
  ['Niemand erkannte den Fehler sofort ___','außer unserem technischen Experten']
 ]),
 cfg('„bei“ bezeichnet hier Arbeitsplatz, Ansprechpartner oder Institution und steht immer mit Dativ.',[
  ['Sie arbeitet ___','bei einem internationalen Unternehmen'],
  ['Ich habe heute einen Termin ___','bei der Personalabteilung'],
  ['Wir präsentieren morgen unsere Ergebnisse ___','bei unserem wichtigsten Kunden'],
  ['Ich hole mir Rat ___','bei einem erfahrenen Kollegen'],
  ['Wir erkundigen uns ___','bei den zuständigen Behörden'],
  ['Die Wartung erfolgt ___','bei einem externen Dienstleister']
 ]),
 cfg('„gegenüber“ bezeichnet die Position auf der anderen Seite und steht mit Dativ.',[
  ['Das Café liegt ___','dem Bahnhof gegenüber'],
  ['Mein Büro befindet sich ___','der Stadtbibliothek gegenüber'],
  ['Das Hotel liegt ___','einem großen Park gegenüber'],
  ['Die Bushaltestelle befindet sich ___','unserem Bürogebäude gegenüber'],
  ['Der neue Supermarkt liegt ___','den neuen Wohnungen gegenüber'],
  ['Die Bäckerei befindet sich ___','meiner früheren Schule gegenüber']
 ]),
 cfg('„mit“ bezeichnet hier Begleitung oder Mittel und steht immer mit Dativ.',[
  ['Wir lösen das Problem ___','mit einer bewährten Methode'],
  ['Ich bespreche die Ergebnisse ___','mit meiner erfahrenen Kollegin'],
  ['Sie arbeitet eng ___ zusammen','mit unserem Entwicklungsteam'],
  ['Wir schützen die Daten ___','mit einem sicheren Programm'],
  ['Die Reparatur gelingt nur ___','mit den verfügbaren Werkzeugen'],
  ['Wir prüfen die Anlage gemeinsam ___','mit einem externen Spezialisten']
 ]),
 cfg('„nach“ bezeichnet hier eine zeitliche Reihenfolge und steht immer mit Dativ.',[
  ['___ gehen wir nach Hause','nach dem Gespräch'],
  ['___ beginnt die Auswertung','nach der Besprechung'],
  ['___ brauche ich eine Pause','nach einem langen Arbeitstag'],
  ['___ treffen wir die endgültige Entscheidung','nach unserer gemeinsamen Prüfung'],
  ['___ passte das Team den Plan an','nach den ersten Ergebnissen'],
  ['___ übernehme ich wieder die Leitung','nach meiner Rückkehr']
 ]),
 cfg('„seit“ bezeichnet einen Beginn in der Vergangenheit, der bis heute andauert, und steht immer mit Dativ.',[
  ['Er arbeitet ___ in dieser Abteilung','seit einem Jahr'],
  ['Wir kennen uns ___','seit der letzten Besprechung'],
  ['Ich beschäftige mich ___ mit Simulationen','seit meinem Studienabschluss'],
  ['Sie wartet ___ auf eine Antwort','seit mehreren Wochen'],
  ['Die Anlage ist ___ außer Betrieb','seit dem vergangenen Montag'],
  ['Das Verfahren läuft ___ stabil','seit den ersten Tests']
 ]),
 cfg('„von“ bezeichnet hier Quelle, Absender oder Urheber und steht immer mit Dativ.',[
  ['Die Nachricht kommt ___','von meiner Chefin'],
  ['Wir haben die Bestätigung ___ erhalten','von der Personalabteilung'],
  ['Der Vorschlag stammt ___','von einem externen Partner'],
  ['Die Auswertung wurde ___ erstellt','von unserer Forschungsgruppe'],
  ['Die Rückmeldungen kamen ___','von den zuständigen Kollegen'],
  ['Die Freigabe kam ___','vom verantwortlichen Projektleiter']
 ]),
 cfg('„zu“ bezeichnet hier ein Ziel bei einer Person, Institution oder Veranstaltung und steht immer mit Dativ.',[
  ['Ich gehe morgen ___','zum Arzt'],
  ['Sie fährt jeden Morgen ___','zur Arbeit'],
  ['Ich gehe am Wochenende ___','zu meiner Freundin'],
  ['Wir fahren direkt ___','zu einem wichtigen Kundentermin'],
  ['Meine Kollegin reist morgen ___','zu unserer Niederlassung'],
  ['Am Abend gehen wir ___','zu den neuen Nachbarn']
 ])
];
generateCurated('dat',datConfigs,1000);

const genConfigs=[
 cfg('„außerhalb“ bedeutet „nicht innerhalb“ und steht mit Genitiv.',[
  ['___ gelten andere Sicherheitsregeln','außerhalb des Firmengeländes'],
  ['___ ist das Gebäude geschlossen','außerhalb der regulären Arbeitszeit'],
  ['___ dürfen Besucher sich frei bewegen','außerhalb eines geschlossenen Bereichs'],
  ['___ dürfen wir keine Entscheidung treffen','außerhalb unserer Zuständigkeit'],
  ['___ ist die Verbindung deutlich schlechter','außerhalb der großen Städte'],
  ['___ sind die Mieten niedriger','außerhalb des historischen Zentrums'],
  ['___ können wir keine Lieferung garantieren','außerhalb des vereinbarten Zeitrahmens'],
  ['___ gelten zusätzliche Zollvorschriften','außerhalb der Europäischen Union'],
  ['___ ist das Rauchen erlaubt','außerhalb des Gebäudes']
 ]),
 cfg('In diesen formellen Sätzen wird ausdrücklich „aufgrund“ verlangt; „aufgrund“ steht mit Genitiv.',[
  ['Der formelle Bericht nennt ___ eine Planänderung; verwende „aufgrund“','aufgrund des technischen Fehlers'],
  ['Die schriftliche Begründung verweist ___ auf weiteren Prüfbedarf; verwende „aufgrund“','aufgrund der neuen Erkenntnisse'],
  ['Der offizielle Bescheid wurde ___ geändert; verwende „aufgrund“','aufgrund eines kurzfristigen Ausfalls'],
  ['Die dokumentierte Entscheidung fiel ___; verwende „aufgrund“','aufgrund unserer bisherigen Erfahrungen'],
  ['Die formelle Ablehnung erfolgte ___; verwende „aufgrund“','aufgrund der hohen Kosten'],
  ['Der Projektplan wurde offiziell ___ angepasst; verwende „aufgrund“','aufgrund des engen Zeitplans'],
  ['Der Bescheid wurde ___ aufgehoben; verwende „aufgrund“','aufgrund einer gesetzlichen Änderung'],
  ['Die Verspätung wurde im Bericht ___ erklärt; verwende „aufgrund“','aufgrund des starken Verkehrs'],
  ['Die Richtlinie wurde ___ überarbeitet; verwende „aufgrund“','aufgrund zahlreicher Rückmeldungen']
 ]),
 cfg('„innerhalb“ bezeichnet eine Grenze in Zeit oder Raum und steht mit Genitiv.',[
  ['Die Anfrage muss ___ beantwortet werden','innerhalb eines Tages'],
  ['Die Auswertung soll ___ abgeschlossen sein','innerhalb der nächsten Woche'],
  ['Das Ziel muss ___ erreicht werden','innerhalb des vereinbarten Zeitraums'],
  ['Die Rechnung ist ___ zu bezahlen','innerhalb eines Monats'],
  ['Wir liefern die Ergebnisse ___','innerhalb der nächsten zwei Wochen'],
  ['Der Antrag muss ___ geprüft werden','innerhalb einer klaren Frist'],
  ['Die Investition soll ___ beschlossen werden','innerhalb des ersten Quartals'],
  ['Das Team reagierte ___','innerhalb weniger Stunden'],
  ['Das Projekt muss ___ abgeschlossen werden','innerhalb eines Jahres']
 ]),
 cfg('„statt“ bezeichnet einen Ersatz und steht in der Standardsprache mit Genitiv.',[
  ['___ führen wir eine Videokonferenz durch','statt des persönlichen Treffens'],
  ['___ findet ein Online-Workshop statt','statt der geplanten Reise'],
  ['___ erstellen wir eine kurze Zusammenfassung','statt eines langen Berichts'],
  ['___ nutzen wir künftig ein digitales Verfahren','statt unserer bisherigen Methode'],
  ['___ führt das Unternehmen ein neues System ein','statt der alten Software'],
  ['___ wurde eine einfachere Variante gewählt','statt des ursprünglichen Entwurfs'],
  ['___ verwenden wir ein standardisiertes Verfahren','statt einer komplizierten Lösung'],
  ['___ reicht jetzt eine digitale Datei','statt des gedruckten Formulars'],
  ['___ planen wir einen gemeinsamen Workshop','statt zusätzlicher Sitzungen']
 ]),
 cfg('„trotz“ drückt einen Gegensatz zu einem Hindernis aus und steht in der Standardsprache mit Genitiv.',[
  ['___ fand die Veranstaltung statt','trotz des schlechten Wetters'],
  ['___ erreichte das Team sein Ziel','trotz der großen Schwierigkeiten'],
  ['___ konnte die Anlage weiterlaufen','trotz eines technischen Problems'],
  ['___ wurde das Projekt fristgerecht beendet','trotz unserer begrenzten Ressourcen'],
  ['___ blieb die Qualität hoch','trotz der hohen Arbeitsbelastung'],
  ['___ wurden alle Aufgaben erledigt','trotz des engen Zeitplans'],
  ['___ blieb der Ablauf stabil','trotz einer kurzfristigen Änderung'],
  ['___ wurde die Reform beschlossen','trotz des starken Widerstands'],
  ['___ hielt die Leitung an der Entscheidung fest','trotz zahlreicher Rückfragen']
 ]),
 cfg('„während“ bezeichnet Gleichzeitigkeit oder einen Zeitraum und steht in der Standardsprache mit Genitiv.',[
  ['___ blieb das Telefon ausgeschaltet','während des Meetings'],
  ['___ machte sie viele Fotos','während der gesamten Reise'],
  ['___ wurden alle offenen Punkte geklärt','während eines wichtigen Gesprächs'],
  ['___ entstand die neue Idee','während unserer gemeinsamen Arbeit'],
  ['___ sammelte das Team erste Erfahrungen','während der ersten Projektphase'],
  ['___ darf die Anlage nicht geöffnet werden','während des laufenden Betriebs'],
  ['___ wurde der Raum gelüftet','während einer kurzen Unterbrechung'],
  ['___ stieg der Umsatz deutlich','während des vergangenen Jahres'],
  ['___ wurden mehrere Kompromisse gefunden','während der Verhandlungen']
 ]),
 cfg('In diesen Sätzen wird ausdrücklich „wegen“ verlangt; „wegen“ steht in der Standardsprache mit Genitiv.',[
  ['Der Termin wurde ___ verschoben; verwende „wegen“','wegen des schlechten Wetters'],
  ['Das Treffen fiel ___ aus; verwende „wegen“','wegen der kurzfristigen Absage'],
  ['Die Anlage steht ___ still; verwende „wegen“','wegen eines technischen Fehlers'],
  ['Wir mussten den Umfang ___ reduzieren; verwende „wegen“','wegen unserer begrenzten Zeit'],
  ['Das Projekt wurde ___ gestoppt; verwende „wegen“','wegen der hohen Kosten'],
  ['Der Antrag konnte ___ nicht bearbeitet werden; verwende „wegen“','wegen des fehlenden Dokuments'],
  ['Der Ablauf wurde ___ angepasst; verwende „wegen“','wegen einer unerwarteten Änderung'],
  ['Wir kamen ___ zu spät; verwende „wegen“','wegen des starken Verkehrs'],
  ['Die Regel wurde ___ überprüft; verwende „wegen“','wegen zahlreicher Beschwerden']
 ])
];
generateCurated('gen',genConfigs,1000);

const twoConfigs=[
 {prep:'an',pairs:[
  ['Ich hänge das Bild ___','an die Wand','Das Bild hängt ___','an der Wand'],
  ['Wir stellen den Tisch ___','an das Fenster','Der Tisch steht ___','am Fenster'],
  ['Sie setzt sich ___','an den Schreibtisch','Sie sitzt ___','an dem Schreibtisch'],
  ['Er befestigt den Hinweis ___','an die Tür','Der Hinweis hängt ___','an der Tür'],
  ['Ich stelle die Leiter ___','an den Schrank','Die Leiter steht ___','an dem Schrank'],
  ['Wir hängen den Kalender ___','an die Pinnwand','Der Kalender hängt ___','an der Pinnwand']
 ]},
 {prep:'auf',pairs:[
  ['Ich lege das Buch ___','auf den Tisch','Das Buch liegt ___','auf dem Tisch'],
  ['Wir stellen den Karton ___','auf die Ablage','Der Karton steht ___','auf der Ablage'],
  ['Sie legt die Unterlagen ___','auf den Schreibtisch','Die Unterlagen liegen ___','auf dem Schreibtisch'],
  ['Er stellt die Tasse ___','auf das Regal','Die Tasse steht ___','auf dem Regal'],
  ['Ich lege das Telefon ___','auf die Fensterbank','Das Telefon liegt ___','auf der Fensterbank'],
  ['Wir stellen die Kiste ___','auf den Boden','Die Kiste steht ___','auf dem Boden']
 ]},
 {prep:'hinter',pairs:[
  ['Ich stelle den Karton ___','hinter den Schrank','Der Karton steht ___','hinter dem Schrank'],
  ['Wir schieben den Stuhl ___','hinter die Tür','Der Stuhl steht ___','hinter der Tür'],
  ['Sie legt die Tasche ___','hinter das Sofa','Die Tasche liegt ___','hinter dem Sofa'],
  ['Er stellt das Fahrrad ___','hinter das Gebäude','Das Fahrrad steht ___','hinter dem Gebäude'],
  ['Wir schieben die Kiste ___','hinter den Vorhang','Die Kiste steht ___','hinter dem Vorhang'],
  ['Das Team bewegt das Gerät ___','hinter die Absperrung','Das Gerät befindet sich ___','hinter der Absperrung']
 ]},
 {prep:'in',pairs:[
  ['Ich lege die Akte ___','in den Schrank','Die Akte liegt ___','in dem Schrank'],
  ['Wir stellen die Kiste ___','in die Werkstatt','Die Kiste steht ___','in der Werkstatt'],
  ['Sie geht ___','ins Büro','Sie arbeitet ___','im Büro'],
  ['Er legt das Werkzeug ___','in die Schublade','Das Werkzeug liegt ___','in der Schublade'],
  ['Das Team bringt das Gerät ___','in das Lager','Das Gerät befindet sich ___','in dem Lager'],
  ['Ich stecke das Telefon ___','in die Tasche','Das Telefon steckt ___','in der Tasche']
 ]},
 {prep:'neben',pairs:[
  ['Ich stelle den Karton ___','neben den Drucker','Der Karton steht ___','neben dem Drucker'],
  ['Wir schieben den Stuhl ___','neben die Tür','Der Stuhl steht ___','neben der Tür'],
  ['Sie legt die Tasche ___','neben das Regal','Die Tasche liegt ___','neben dem Regal'],
  ['Er stellt das Gerät ___','neben den Schreibtisch','Das Gerät steht ___','neben dem Schreibtisch'],
  ['Ich lege die Unterlagen ___','neben die Maschine','Die Unterlagen liegen ___','neben der Maschine'],
  ['Wir stellen das Regal ___','neben den Eingang','Das Regal steht ___','neben dem Eingang']
 ]},
 {prep:'über',pairs:[
  ['Ich hänge die Lampe ___','über den Schreibtisch','Die Lampe hängt ___','über dem Schreibtisch'],
  ['Wir hängen das Schild ___','über die Tür','Das Schild hängt ___','über der Tür'],
  ['Sie hängt das Bild ___','über das Sofa','Das Bild hängt ___','über dem Sofa'],
  ['Er befestigt den Sensor ___','über den Bildschirm','Der Sensor befindet sich ___','über dem Bildschirm'],
  ['Das Team montiert die Anzeige ___','über die Arbeitsfläche','Die Anzeige hängt ___','über der Arbeitsfläche'],
  ['Wir setzen die Markierung ___','über den Eingang','Die Markierung befindet sich ___','über dem Eingang']
 ]},
 {prep:'unter',pairs:[
  ['Ich stelle den Karton ___','unter den Tisch','Der Karton steht ___','unter dem Tisch'],
  ['Wir schieben den Stuhl ___','unter das Fenster','Der Stuhl steht ___','unter dem Fenster'],
  ['Sie legt die Tasche ___','unter die Ablage','Die Tasche liegt ___','unter der Ablage'],
  ['Er stellt das Werkzeug ___','unter das Regal','Das Werkzeug liegt ___','unter dem Regal'],
  ['Ich lege das Kabel ___','unter die Treppe','Das Kabel liegt ___','unter der Treppe'],
  ['Wir stellen das Fahrrad ___','unter die Brücke','Das Fahrrad steht ___','unter der Brücke']
 ]},
 {prep:'vor',pairs:[
  ['Ich stelle den Karton ___','vor den Eingang','Der Karton steht ___','vor dem Eingang'],
  ['Wir schieben den Tisch ___','vor die Tür','Der Tisch steht ___','vor der Tür'],
  ['Sie legt die Matte ___','vor das Gebäude','Die Matte liegt ___','vor dem Gebäude'],
  ['Er stellt das Fahrrad ___','vor die Garage','Das Fahrrad steht ___','vor der Garage'],
  ['Ich stelle den Stuhl ___','vor den Schrank','Der Stuhl steht ___','vor dem Schrank'],
  ['Wir parken den Wagen ___','vor die Absperrung','Der Wagen steht ___','vor der Absperrung']
 ]},
 {prep:'zwischen',pairs:[
  ['Ich stelle den Karton ___','zwischen den Computer und den Drucker','Der Karton steht ___','zwischen dem Computer und dem Drucker'],
  ['Wir schieben den Stuhl ___','zwischen die Tür und das Fenster','Der Stuhl steht ___','zwischen der Tür und dem Fenster'],
  ['Sie legt die Unterlagen ___','zwischen das Regal und den Schrank','Die Unterlagen liegen ___','zwischen dem Regal und dem Schrank'],
  ['Er stellt das Gerät ___','zwischen den Tisch und die Wand','Das Gerät steht ___','zwischen dem Tisch und der Wand'],
  ['Ich lege das Kabel ___','zwischen die Maschine und die Werkbank','Das Kabel liegt ___','zwischen der Maschine und der Werkbank'],
  ['Wir stellen das Regal ___','zwischen die beiden Schränke','Das Regal steht ___','zwischen den beiden Schränken']
 ]}
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
const twoBase=[];
twoConfigs.forEach(config=>config.pairs.forEach(pair=>{
 const acc=articleGap(pair[0],pair[1],config.prep,'acc');
 const dat=articleGap(pair[2],pair[3],config.prep,'dat');
 twoBase.push(acc,dat)
}));
let twoIndex=0;
while(categoryCounts.two<1000){
 const item=twoBase[twoIndex%twoBase.length],round=Math.floor(twoIndex/twoBase.length);
 const prompt=round?item.prompt.replace(/\.$/,` – Variante ${round+1}.`):item.prompt;
 add('two',prompt,item.answer,item.explanation,item.accepted);
 twoIndex++
}

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