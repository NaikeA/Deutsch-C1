(()=>{
'use strict';
const possessiveOwners=[
  ['ich','mein','mein'],['du','dein','dein'],['er / es','sein','sein'],
  ['sie (Singular / Plural)','ihr','ihr'],['wir','unser','unser'],
  ['ihr','euer','eur'],['Sie (höflich)','Ihr','Ihr']
];
const possessiveCases=[
  ['Nominativ',['','e','','e'],['er','e','es','en'],['Kollege','Kollegin','Team','Kollegen']],
  ['Akkusativ',['en','e','','e'],['en','e','es','en'],['Kollegen','Kollegin','Team','Kollegen']],
  ['Dativ',['em','er','em','en'],['en','en','en','en'],['Kollegen','Kollegin','Team','Kollegen']],
  ['Genitiv',['es','er','es','er'],['en','en','en','en'],['Kollegen','Kollegin','Teams','Kollegen']]
];
const possessiveAdjectiveTables=possessiveOwners.map(([person,base,endingStem])=>{
  const rows=possessiveCases.map(([caseName,articleEndings,adjectiveEndings,nouns])=>{
    const cells=nouns.map((noun,index)=>{
      const article=articleEndings[index]?endingStem+articleEndings[index]:base;
      return `<td>${article} neu<b>${adjectiveEndings[index]}</b> ${noun}</td>`
    }).join('');
    return `<tr><td>${caseName}</td>${cells}</tr>`
  }).join('');
  return `<details class="possessive-full-table"><summary>${base} — ${person}</summary><div><table><tr><th>Fall</th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>${rows}</table></div></details>`
}).join('');
const topics={
'01':`
<p><b>Im deutschen Hauptsatz steht das konjugierte Verb immer auf Position 2.</b> Position bedeutet Satzglied, nicht einzelnes Wort.</p>
<h3>Grundmuster</h3>
<table><tr><th>Position 1</th><th>Position 2</th><th>Mittelfeld</th><th>Satzende</th></tr>
<tr><td>Ich</td><td><b>arbeite</b></td><td>heute im Büro</td><td>–</td></tr>
<tr><td>Heute</td><td><b>arbeite</b></td><td>ich im Büro</td><td>–</td></tr>
<tr><td>Im Büro</td><td><b>arbeite</b></td><td>ich heute</td><td>–</td></tr></table>
<p>Wenn ein anderes Satzglied an Position 1 steht, folgt direkt das Verb und danach das Subjekt. Dieses Muster heißt <b>Inversion</b>.</p>
<ul><li>Morgen <b>bespreche ich</b> den Bericht.</li><li>Aus diesem Grund <b>ändern wir</b> den Plan.</li><li>Nach der Besprechung <b>fahre ich</b> nach Hause.</li></ul>
<h3>Was darf auf Position 1 stehen?</h3>
<p>Subjekt, Zeitangabe, Ortsangabe, Objekt oder ein längerer Ausdruck. Es darf aber normalerweise nur <b>ein Satzglied</b> vor dem Verb stehen.</p>
<ul><li><b>Den Bericht</b> schicke ich morgen.</li><li><b>Meinem Kollegen</b> erkläre ich die Änderung später.</li><li><b>Wegen des Zeitdrucks</b> verschieben wir die Prüfung.</li></ul>
<h3>Reihenfolge im Mittelfeld</h3>
<p>Eine hilfreiche Grundregel ist <b>TeKaMoLo</b>: temporal – kausal – modal – lokal.</p>
<p>Wir arbeiten <b>heute</b> <b>wegen des Termins</b> <b>besonders konzentriert</b> <b>im Büro</b>.</p>
<p class="wrong-example">Nicht: Heute ich bespreche den Bericht.</p><p>Richtig: Heute <b>bespreche ich</b> den Bericht.</p>
<p><b>Lerntipp:</b> Markiere in jedem Satz zuerst das konjugierte Verb. Prüfe anschließend, ob davor genau ein Satzglied steht.</p>
`,
'02':`
<p>Ein Nebensatz kann nicht allein stehen und wird durch ein Komma vom Hauptsatz getrennt. Das konjugierte Verb steht im Nebensatz <b>am Ende</b>.</p>
<h3>Häufige Einleiter</h3>
<table><tr><th>Einleiter</th><th>Funktion</th><th>Beispiel</th></tr>
<tr><td>dass</td><td>Aussage oder Inhalt</td><td>Ich weiß, dass der Termin morgen <b>stattfindet</b>.</td></tr>
<tr><td>weil / da</td><td>Grund</td><td>Wir warten, weil noch eine Rückmeldung <b>fehlt</b>.</td></tr>
<tr><td>ob</td><td>indirekte Ja-/Nein-Frage</td><td>Ich weiß nicht, ob er heute <b>kommt</b>.</td></tr>
<tr><td>wenn / falls</td><td>Bedingung; wiederholte Handlung</td><td>Wenn ich Zeit <b>habe</b>, rufe ich dich an.</td></tr>
<tr><td>obwohl</td><td>Gegensatz</td><td>Obwohl es spät <b>ist</b>, arbeiten wir weiter.</td></tr>
<tr><td>bevor / nachdem</td><td>zeitliche Reihenfolge</td><td>Nachdem wir geprüft <b>hatten</b>, gaben wir frei.</td></tr></table>
<h3>Nebensatz zuerst</h3>
<p>Steht der Nebensatz am Anfang, zählt er als Position 1. Im Hauptsatz folgt deshalb sofort das Verb.</p>
<ul><li>Weil ich krank bin, <b>bleibe</b> ich zu Hause.</li><li>Wenn die Daten vollständig sind, <b>beginnen</b> wir mit der Auswertung.</li></ul>
<h3>Mehrteilige Verbformen</h3>
<p>Im Nebensatz stehen alle Verbteile am Ende; das konjugierte Hilfs- oder Modalverb steht gewöhnlich zuletzt.</p>
<ul><li>…, weil ich den Bericht <b>geschrieben habe</b>.</li><li>…, weil wir das Problem heute <b>lösen müssen</b>.</li><li>…, obwohl die Anlage gestern <b>ausgefallen ist</b>.</li></ul>
<p class="wrong-example">Nicht: weil ich habe keine Zeit.</p><p>Richtig: weil ich keine Zeit <b>habe</b>.</p>
<p><b>Achtung:</b> <i>denn</i> leitet keinen Nebensatz ein: Ich bleibe zu Hause, denn ich <b>bin</b> krank.</p>
`,
'03':`
<p>Bei trennbaren Verben und mehrteiligen Verbformen entsteht im Hauptsatz eine <b>Verbklammer</b>. Das konjugierte Verb steht an Position 2; der zweite Verbteil steht am Satzende.</p>
<h3>Trennbare Verben</h3>
<ul><li>Ich <b>rufe</b> den Kunden später <b>an</b>.</li><li>Die Besprechung <b>findet</b> morgen <b>statt</b>.</li><li>Wir <b>werten</b> die Ergebnisse sorgfältig <b>aus</b>.</li></ul>
<p>Im Infinitiv und im Nebensatz bleibt das Verb zusammen:</p>
<ul><li>Ich möchte den Kunden <b>anrufen</b>.</li><li>…, weil ich den Kunden später <b>anrufe</b>.</li></ul>
<h3>Perfekt</h3>
<p>Das Partizip II steht am Satzende. Bei trennbaren Verben steht <i>ge</i> zwischen Präfix und Stamm.</p>
<ul><li>Ich <b>habe</b> den Kunden <b>angerufen</b>.</li><li>Wir <b>haben</b> die Ergebnisse <b>ausgewertet</b>.</li></ul>
<h3>Modalverben und Passiv</h3>
<ul><li>Wir <b>müssen</b> das Problem heute <b>lösen</b>.</li><li>Der Bericht <b>wird</b> morgen <b>verschickt</b>.</li><li>Das Ergebnis <b>muss</b> erneut <b>geprüft werden</b>.</li></ul>
<h3>Nicht trennbare Präfixe</h3>
<p><b>be-, emp-, ent-, er-, ge-, miss-, ver-, zer-</b> werden nicht getrennt und erhalten im Partizip normalerweise kein <i>ge-</i>.</p>
<ul><li>Ich <b>verstehe</b> die Frage. / Ich habe die Frage <b>verstanden</b>.</li><li>Wir <b>besprechen</b> den Plan. / Wir haben den Plan <b>besprochen</b>.</li></ul>
<p class="wrong-example">Nicht: Ich habe den Bericht aus gewertet.</p><p>Richtig: Ich habe den Bericht <b>ausgewertet</b>.</p>
`,
'05':`
<p>Der Artikel zeigt Genus, Numerus und Kasus. Lerne ein Nomen deshalb immer zusammen mit seinem Artikel: <b>der Termin, die Aufgabe, das Ergebnis</b>.</p>
<h3>Bestimmter Artikel</h3>
<table><tr><th>Fall</th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td>Nominativ</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Akkusativ</td><td><b>den</b></td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Dativ</td><td>dem</td><td>der</td><td>dem</td><td>den + -n</td></tr>
<tr><td>Genitiv</td><td>des + -(e)s</td><td>der</td><td>des + -(e)s</td><td>der</td></tr></table>
<h3>Unbestimmter und negativer Artikel</h3>
<table><tr><th>Fall</th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th></tr>
<tr><td>Nominativ</td><td>ein / kein</td><td>eine / keine</td><td>ein / kein</td></tr>
<tr><td>Akkusativ</td><td>einen / keinen</td><td>eine / keine</td><td>ein / kein</td></tr>
<tr><td>Dativ</td><td>einem / keinem</td><td>einer / keiner</td><td>einem / keinem</td></tr>
<tr><td>Genitiv</td><td>eines / keines</td><td>einer / keiner</td><td>eines / keines</td></tr></table>
<h3>Possessivartikel: alle Personen</h3>
<p>Der Possessivartikel richtet sich zuerst nach der Person, die etwas besitzt. Seine Endung richtet sich anschließend nach <b>Kasus, Genus und Numerus des folgenden Nomens</b>. Possessivartikel werden wie <i>ein</i> dekliniert.</p>
<table><tr><th>Person</th><th>Grundform</th><th>Beispiel</th></tr>
<tr><td>ich</td><td><b>mein-</b></td><td>mein Projekt</td></tr>
<tr><td>du</td><td><b>dein-</b></td><td>dein Projekt</td></tr>
<tr><td>er</td><td><b>sein-</b></td><td>sein Projekt</td></tr>
<tr><td>sie (Singular)</td><td><b>ihr-</b></td><td>ihr Projekt</td></tr>
<tr><td>es</td><td><b>sein-</b></td><td>sein Projekt</td></tr>
<tr><td>wir</td><td><b>unser-</b></td><td>unser Projekt</td></tr>
<tr><td>ihr</td><td><b>euer-</b></td><td>euer Projekt</td></tr>
<tr><td>sie (Plural)</td><td><b>ihr-</b></td><td>ihr Projekt</td></tr>
<tr><td>Sie (höflich)</td><td><b>Ihr-</b></td><td>Ihr Projekt</td></tr></table>

<h3>Nominativ</h3>
<table><tr><th>Person</th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td>ich</td><td>mein</td><td>meine</td><td>mein</td><td>meine</td></tr>
<tr><td>du</td><td>dein</td><td>deine</td><td>dein</td><td>deine</td></tr>
<tr><td>er</td><td>sein</td><td>seine</td><td>sein</td><td>seine</td></tr>
<tr><td>sie</td><td>ihr</td><td>ihre</td><td>ihr</td><td>ihre</td></tr>
<tr><td>es</td><td>sein</td><td>seine</td><td>sein</td><td>seine</td></tr>
<tr><td>wir</td><td>unser</td><td>unsere</td><td>unser</td><td>unsere</td></tr>
<tr><td>ihr</td><td>euer</td><td>eure</td><td>euer</td><td>eure</td></tr>
<tr><td>sie</td><td>ihr</td><td>ihre</td><td>ihr</td><td>ihre</td></tr>
<tr><td>Sie</td><td>Ihr</td><td>Ihre</td><td>Ihr</td><td>Ihre</td></tr></table>

<h3>Akkusativ</h3>
<table><tr><th>Person</th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td>ich</td><td>meinen</td><td>meine</td><td>mein</td><td>meine</td></tr>
<tr><td>du</td><td>deinen</td><td>deine</td><td>dein</td><td>deine</td></tr>
<tr><td>er</td><td>seinen</td><td>seine</td><td>sein</td><td>seine</td></tr>
<tr><td>sie</td><td>ihren</td><td>ihre</td><td>ihr</td><td>ihre</td></tr>
<tr><td>es</td><td>seinen</td><td>seine</td><td>sein</td><td>seine</td></tr>
<tr><td>wir</td><td>unseren</td><td>unsere</td><td>unser</td><td>unsere</td></tr>
<tr><td>ihr</td><td>euren</td><td>eure</td><td>euer</td><td>eure</td></tr>
<tr><td>sie</td><td>ihren</td><td>ihre</td><td>ihr</td><td>ihre</td></tr>
<tr><td>Sie</td><td>Ihren</td><td>Ihre</td><td>Ihr</td><td>Ihre</td></tr></table>

<h3>Dativ</h3>
<table><tr><th>Person</th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td>ich</td><td>meinem</td><td>meiner</td><td>meinem</td><td>meinen</td></tr>
<tr><td>du</td><td>deinem</td><td>deiner</td><td>deinem</td><td>deinen</td></tr>
<tr><td>er</td><td>seinem</td><td>seiner</td><td>seinem</td><td>seinen</td></tr>
<tr><td>sie</td><td>ihrem</td><td>ihrer</td><td>ihrem</td><td>ihren</td></tr>
<tr><td>es</td><td>seinem</td><td>seiner</td><td>seinem</td><td>seinen</td></tr>
<tr><td>wir</td><td>unserem</td><td>unserer</td><td>unserem</td><td>unseren</td></tr>
<tr><td>ihr</td><td>eurem</td><td>eurer</td><td>eurem</td><td>euren</td></tr>
<tr><td>sie</td><td>ihrem</td><td>ihrer</td><td>ihrem</td><td>ihren</td></tr>
<tr><td>Sie</td><td>Ihrem</td><td>Ihrer</td><td>Ihrem</td><td>Ihren</td></tr></table>
<p><b>Dativ Plural:</b> Das Nomen erhält zusätzlich meistens <b>-n</b>: mit meinen Kollegen, mit unseren Kindern.</p>

<h3>Genitiv</h3>
<table><tr><th>Person</th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td>ich</td><td>meines</td><td>meiner</td><td>meines</td><td>meiner</td></tr>
<tr><td>du</td><td>deines</td><td>deiner</td><td>deines</td><td>deiner</td></tr>
<tr><td>er</td><td>seines</td><td>seiner</td><td>seines</td><td>seiner</td></tr>
<tr><td>sie</td><td>ihres</td><td>ihrer</td><td>ihres</td><td>ihrer</td></tr>
<tr><td>es</td><td>seines</td><td>seiner</td><td>seines</td><td>seiner</td></tr>
<tr><td>wir</td><td>unseres</td><td>unserer</td><td>unseres</td><td>unserer</td></tr>
<tr><td>ihr</td><td>eures</td><td>eurer</td><td>eures</td><td>eurer</td></tr>
<tr><td>sie</td><td>ihres</td><td>ihrer</td><td>ihres</td><td>ihrer</td></tr>
<tr><td>Sie</td><td>Ihres</td><td>Ihrer</td><td>Ihres</td><td>Ihrer</td></tr></table>

<h3>Possessivartikel mit attributivem Adjektiv</h3>
<p>Öffne den gewünschten Possessivartikel. Die fett markierten Buchstaben zeigen jeweils die <b>Adjektivendung</b>. Das Muster entspricht der Deklination nach einem <i>ein-Wort</i>.</p>
<div class="possessive-table-list">${possessiveAdjectiveTables}</div>
<p><b>Wichtig:</b> Im Dativ Plural erhält auch das Nomen meistens ein zusätzliches <b>-n</b>. Deshalb heißt es: <i>mit meinen neuen Kollegen</i>.</p>
<h3>Beispiele mit allen Personen</h3>
<ul>
<li>Ich spreche mit <b>meinem Kollegen</b>.</li>
<li>Du sprichst mit <b>deiner Kollegin</b>.</li>
<li>Er arbeitet an <b>seinem Projekt</b>.</li>
<li>Sie präsentiert <b>ihre Ergebnisse</b>.</li>
<li>Das Unternehmen ändert <b>seine Strategie</b>.</li>
<li>Wir sprechen mit <b>unseren Kunden</b>.</li>
<li>Ihr besprecht <b>eure Aufgaben</b>.</li>
<li>Sie präsentieren <b>ihre Ergebnisse</b>.</li>
<li>Sie besprechen <b>Ihre Entscheidung</b>. (höfliche Anrede)</li>
</ul>
<p><b>Besonderheit bei „euer“:</b> Sobald eine Endung hinzukommt, fällt meistens das zweite <i>e</i> weg: euer, aber <b>eure, euren, eurem, eurer, eures</b>.</p>
<h3>Wann welcher Artikel?</h3>
<ul><li><b>bestimmt:</b> etwas ist bekannt oder wurde bereits erwähnt – Ich habe einen Bericht gelesen. <b>Der Bericht</b> war hilfreich.</li><li><b>unbestimmt:</b> etwas wird erstmals genannt – Ich brauche <b>einen Termin</b>.</li><li><b>kein Artikel:</b> allgemeine Begriffe, Berufe nach <i>sein</i>, Stoffe oder Plural unbestimmt – Sie ist <b>Ingenieurin</b>. Wir brauchen <b>Informationen</b>.</li></ul>
<h3>Genus-Hinweise</h3>
<ul><li>meist feminin: -ung, -heit, -keit, -schaft, -ion, -tät</li><li>meist neutrum: -chen, -lein, -ment, substantivierte Infinitive</li><li>meist maskulin: Tage, Monate, Jahreszeiten und viele Nomen auf -er</li></ul>
<p><b>Achtung:</b> Hinweise haben Ausnahmen. Der sicherste Weg ist, Artikel und Plural mitzulernen.</p>
`,
'06':`
<p>Die Adjektivendung zeigt Genus, Kasus und Numerus – besonders dann, wenn der Artikel diese Information nicht vollständig zeigt.</p>
<h3>Das Grundprinzip</h3>
<ul><li><b>Bestimmter Artikel:</b> Der Artikel zeigt fast alles; das Adjektiv hat meist <b>-e</b> oder <b>-en</b>.</li><li><b>Ein-Wort:</b> Das Adjektiv ergänzt die fehlende Information.</li><li><b>Ohne Artikel:</b> Das Adjektiv trägt die starke Kasusendung.</li></ul>
<h3>Nach bestimmtem Artikel</h3>
<table><tr><th>Form</th><th>Beispiel</th></tr>
<tr><td>Nom. Singular</td><td>der neu<b>e</b> Kollege, die neu<b>e</b> Kollegin, das neu<b>e</b> Projekt</td></tr>
<tr><td>Akk. maskulin</td><td>den neu<b>en</b> Kollegen</td></tr>
<tr><td>alle Dativ-/Genitivformen und Plural</td><td>mit dem neu<b>en</b> Kollegen; die neu<b>en</b> Projekte</td></tr></table>
<h3>Nach ein, kein, mein …</h3>
<ul><li>ein neu<b>er</b> Kollege / eine neu<b>e</b> Kollegin / ein neu<b>es</b> Projekt</li><li>einen neu<b>en</b> Kollegen</li><li>mit einem neu<b>en</b> Kollegen</li><li>meine neu<b>en</b> Aufgaben</li></ul>
<h3>Ohne Artikel</h3>
<ul><li>frisch<b>er</b> Kaffee, kalt<b>es</b> Wasser, neu<b>e</b> Informationen</li><li>mit frisch<b>em</b> Kaffee, bei kalt<b>em</b> Wetter</li></ul>
<h3>Schnelle Methode</h3>
<ol><li>Kasus bestimmen.</li><li>Genus und Numerus bestimmen.</li><li>Artikeltyp erkennen.</li><li>Endung aus der passenden Gruppe wählen.</li></ol>
<p class="wrong-example">Nicht: mit einem interessantem Projekt.</p><p>Richtig: mit einem interessant<b>en</b> Projekt.</p>
<p><b>Merke:</b> Nach <i>dem, der, den, einem, einer</i> steht das Adjektiv fast immer auf <b>-en</b>.</p>
`,
'08':`
<p>Die Zeitform richtet sich nach Zeit, Textsorte und Kommunikationssituation. Im Gespräch dominiert das <b>Perfekt</b>; in schriftlichen Berichten und Erzählungen wird häufiger das <b>Präteritum</b> verwendet.</p>
<h3>Überblick</h3>
<table><tr><th>Zeitform</th><th>Verwendung</th><th>Beispiel</th></tr>
<tr><td>Präsens</td><td>Gegenwart, Gewohnheit, geplante Zukunft</td><td>Ich arbeite heute. / Morgen <b>fahre</b> ich nach Berlin.</td></tr>
<tr><td>Perfekt</td><td>abgeschlossene Vergangenheit im Gespräch</td><td>Ich <b>habe den Bericht geschrieben</b>.</td></tr>
<tr><td>Präteritum</td><td>schriftliche Erzählung; sein, haben, Modalverben auch mündlich</td><td>Ich <b>war</b> müde. Wir <b>mussten</b> warten.</td></tr>
<tr><td>Plusquamperfekt</td><td>Vergangenheit vor einer anderen Vergangenheit</td><td>Ich <b>hatte gegessen</b>, bevor er kam.</td></tr>
<tr><td>Futur I</td><td>Prognose, Versprechen, Vermutung</td><td>Wir <b>werden</b> das morgen <b>prüfen</b>.</td></tr>
<tr><td>Futur II</td><td>vermutlich abgeschlossene Handlung</td><td>Er <b>wird</b> den Bericht bereits <b>geschrieben haben</b>.</td></tr></table>
<h3>Perfekt mit haben oder sein?</h3>
<ul><li><b>haben:</b> die meisten Verben – gearbeitet, gelesen, erklärt</li><li><b>sein:</b> Ortswechsel oder Zustandsänderung – gegangen, gefahren, eingeschlafen, geworden</li><li><b>sein, bleiben, passieren:</b> ebenfalls mit <i>sein</i> – ist gewesen, ist geblieben, ist passiert</li></ul>
<h3>Zeitangaben müssen passen</h3>
<ul><li><b>Gestern habe ich</b> einen Termin gehabt.</li><li><b>Morgen habe ich</b> einen Termin. – Präsens mit Zukunftsbedeutung</li><li><b>Seit drei Jahren arbeite ich</b> hier. – Präsens, weil die Handlung noch andauert</li></ul>
<p class="wrong-example">Nicht: Gestern werde ich den Bericht schreiben.</p><p>Richtig: Gestern <b>habe ich den Bericht geschrieben</b>.</p>
`,
'09':`
<p>Modalverben verändern die Bedeutung eines Vollverbs. Das Modalverb wird konjugiert; der Infinitiv steht im Hauptsatz am Ende.</p>
<table><tr><th>Modalverb</th><th>Bedeutung</th><th>Beispiel</th></tr>
<tr><td>können</td><td>Fähigkeit, Möglichkeit</td><td>Ich <b>kann</b> die Aufgabe <b>lösen</b>.</td></tr>
<tr><td>müssen</td><td>Notwendigkeit</td><td>Wir <b>müssen</b> heute <b>entscheiden</b>.</td></tr>
<tr><td>dürfen</td><td>Erlaubnis</td><td>Sie <b>dürfen</b> hier <b>parken</b>.</td></tr>
<tr><td>sollen</td><td>Auftrag, Empfehlung, fremde Aussage</td><td>Ich <b>soll</b> den Kunden <b>anrufen</b>.</td></tr>
<tr><td>wollen</td><td>Absicht</td><td>Er <b>will</b> das Projekt <b>leiten</b>.</td></tr>
<tr><td>mögen / möchten</td><td>Vorliebe / höflicher Wunsch</td><td>Ich <b>möchte</b> einen Termin <b>vereinbaren</b>.</td></tr></table>
<h3>Nebensatz</h3><p>…, weil wir heute eine Entscheidung <b>treffen müssen</b>.</p>
<h3>Vergangenheit</h3>
<ul><li>Präteritum ist sehr häufig: Ich <b>musste</b> länger arbeiten.</li><li>Perfekt mit Vollverb: Ich <b>habe</b> länger arbeiten <b>müssen</b>. Das nennt man Ersatzinfinitiv.</li><li>Ohne Vollverb: Das <b>habe</b> ich nicht <b>gekonnt</b>.</li></ul>
<h3>Bedeutungsunterschiede</h3>
<ul><li>Du <b>musst nicht</b> kommen. = Es ist nicht notwendig.</li><li>Du <b>darfst nicht</b> kommen. = Es ist verboten.</li></ul>
<p class="wrong-example">Nicht: Ich muss zu arbeiten.</p><p>Richtig: Ich muss <b>arbeiten</b>.</p>
`,
'10':`
<p>Bei reflexiven Verben beziehen sich Subjekt und Reflexivpronomen auf dieselbe Person. Manche Verben sind immer reflexiv, andere nur in bestimmten Bedeutungen.</p>
<h3>Reflexivpronomen</h3>
<table><tr><th>Person</th><th>Akkusativ</th><th>Dativ</th></tr>
<tr><td>ich</td><td>mich</td><td>mir</td></tr><tr><td>du</td><td>dich</td><td>dir</td></tr>
<tr><td>er/sie/es</td><td>sich</td><td>sich</td></tr><tr><td>wir</td><td>uns</td><td>uns</td></tr>
<tr><td>ihr</td><td>euch</td><td>euch</td></tr><tr><td>sie/Sie</td><td>sich</td><td>sich</td></tr></table>
<h3>Akkusativ oder Dativ?</h3>
<ul><li>Kein weiteres Akkusativobjekt: Ich wasche <b>mich</b>.</li><li>Ein Körperteil oder eine Sache ist Akkusativobjekt: Ich wasche <b>mir</b> die Hände.</li><li>Ich kaufe <b>mir</b> ein Fahrrad. – <i>ein Fahrrad</i> ist Akkusativ.</li></ul>
<h3>Häufige feste Verbindungen</h3>
<ul><li>sich <b>für</b> etwas interessieren</li><li>sich <b>an</b> etwas erinnern</li><li>sich <b>über</b> etwas freuen oder ärgern</li><li>sich <b>um</b> etwas kümmern</li><li>sich <b>mit</b> etwas beschäftigen</li><li>sich <b>auf</b> etwas vorbereiten</li></ul>
<p>Beispiele: Ich interessiere <b>mich für Technik</b>. Wir bereiten <b>uns auf das Gespräch</b> vor.</p>
<h3>Reziprok: gegenseitige Handlung</h3>
<p>Wir treffen <b>uns</b>. / Die Kollegen unterstützen <b>einander</b>.</p>
<p class="wrong-example">Nicht: Ich erinnere den Termin.</p><p>Richtig: Ich erinnere <b>mich an den Termin</b>.</p>
`,
'11':`
<p>Relativsätze geben zusätzliche Informationen zu einem Nomen. Sie stehen zwischen Kommas; das konjugierte Verb steht am Ende.</p>
<h3>Wie wählt man das Relativpronomen?</h3>
<ol><li>Genus und Numerus kommen vom Bezugswort.</li><li>Der Kasus ergibt sich aus der Funktion <b>im Relativsatz</b>.</li></ol>
<table><tr><th>Fall</th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td>Nom.</td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Akk.</td><td>den</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td>Dat.</td><td>dem</td><td>der</td><td>dem</td><td>denen</td></tr>
<tr><td>Gen.</td><td>dessen</td><td>deren</td><td>dessen</td><td>deren</td></tr></table>
<ul><li>Der Kollege, <b>der</b> dort arbeitet, hilft mir. – Subjekt</li><li>Der Kollege, <b>den</b> ich sehe, hilft mir. – Akkusativobjekt</li><li>Der Kollege, <b>dem</b> ich helfe, ist neu. – Dativobjekt</li><li>Der Kollege, <b>dessen</b> Auto dort steht, ist neu. – Besitz</li></ul>
<h3>Mit Präposition</h3>
<p>Die Präposition steht vor dem Relativpronomen: Das Projekt, <b>an dem</b> ich arbeite, ist anspruchsvoll. Die Stelle, <b>für die</b> ich mich bewerbe, ist interessant.</p>
<h3>Wo und was</h3>
<ul><li><i>wo</i> nach Ortsangaben: Die Stadt, <b>in der</b> / <b>wo</b> ich wohne …</li><li><i>was</i> nach <i>alles, nichts, etwas, das</i> oder einem ganzen Satz: Alles, <b>was</b> du sagst …</li></ul>
<p class="wrong-example">Nicht: Der Mann, den dort arbeitet …</p><p>Richtig: Der Mann, <b>der</b> dort arbeitet …</p>
`,
'12':`
<p>Im Passiv steht die Handlung oder das Ergebnis im Mittelpunkt, nicht die handelnde Person.</p>
<h3>Vorgangspassiv: werden + Partizip II</h3>
<table><tr><th>Zeit</th><th>Beispiel</th></tr>
<tr><td>Präsens</td><td>Der Bericht <b>wird geprüft</b>.</td></tr>
<tr><td>Präteritum</td><td>Der Bericht <b>wurde geprüft</b>.</td></tr>
<tr><td>Perfekt</td><td>Der Bericht <b>ist geprüft worden</b>.</td></tr>
<tr><td>Plusquamperfekt</td><td>Der Bericht <b>war geprüft worden</b>.</td></tr>
<tr><td>Futur I</td><td>Der Bericht <b>wird geprüft werden</b>.</td></tr></table>
<h3>Zustandspassiv: sein + Partizip II</h3>
<p>Der Bericht <b>ist geprüft</b>. Das Ergebnis der Handlung liegt vor.</p>
<h3>Aktiv in Passiv umformen</h3>
<p>Die Ingenieurin prüft <b>den Bericht</b>. → <b>Der Bericht</b> wird von der Ingenieurin geprüft.</p>
<ul><li>Das Akkusativobjekt wird zum Subjekt.</li><li>Der Täter kann mit <b>von + Dativ</b> genannt werden.</li><li>Ein Mittel oder eine Ursache steht oft mit <b>durch + Akkusativ</b>.</li></ul>
<h3>Passiv mit Modalverb</h3>
<p>Das Ergebnis <b>muss erneut geprüft werden</b>.</p>
<h3>Unpersönliches Passiv</h3>
<p>Heute <b>wird lange gearbeitet</b>. / Den Verletzten <b>wird geholfen</b>.</p>
<p class="wrong-example">Nicht: Der Bericht ist geprüft worden gewesen.</p><p>Für normale Aussagen genügt: Der Bericht <b>ist geprüft worden</b>.</p>
`,
'13':`
<p>Der Konjunktiv II drückt Irrealität, Wünsche, vorsichtige Aussagen, Vorschläge und Höflichkeit aus.</p>
<h3>Formen</h3>
<table><tr><th>Verb</th><th>Konjunktiv II</th><th>Beispiel</th></tr>
<tr><td>haben</td><td>hätte</td><td>Wenn ich mehr Zeit <b>hätte</b> …</td></tr>
<tr><td>sein</td><td>wäre</td><td>Es <b>wäre</b> besser, früher zu beginnen.</td></tr>
<tr><td>können</td><td>könnte</td><td><b>Könnten</b> Sie mir helfen?</td></tr>
<tr><td>müssen</td><td>müsste</td><td>Wir <b>müssten</b> den Plan ändern.</td></tr>
<tr><td>werden</td><td>würde</td><td>Ich <b>würde</b> gern teilnehmen.</td></tr></table>
<p>Bei vielen Vollverben wird <b>würde + Infinitiv</b> verwendet. Bei <i>haben, sein</i> und Modalverben sind die einfachen Formen natürlicher.</p>
<h3>Irreale Gegenwart</h3>
<p>Wenn ich mehr Zeit <b>hätte</b>, <b>würde</b> ich täglich lesen.</p>
<h3>Irreale Vergangenheit</h3>
<p>Wenn ich früher losgefahren <b>wäre</b>, <b>hätte</b> ich den Zug erreicht.</p>
<h3>Höflichkeit und Distanz</h3>
<ul><li><b>Könnten</b> Sie mir bitte die Unterlagen schicken?</li><li>Ich <b>hätte</b> gern einen Termin.</li><li>Ich <b>würde vorschlagen</b>, die Prüfung zu wiederholen.</li></ul>
<h3>Vermutung oder vorsichtige Kritik</h3>
<p>Das <b>könnte</b> zu Verzögerungen führen. / Hier <b>müsste</b> genauer geprüft werden.</p>
<p class="wrong-example">Nicht: Wenn ich hätte mehr Zeit …</p><p>Richtig: Wenn ich mehr Zeit <b>hätte</b> …</p>
`,
'14':`
<p>Konnektoren zeigen die logische Beziehung zwischen Gedanken. Entscheidend ist, welche Satzstruktur der Konnektor verlangt.</p>
<h3>Drei Satzbaumuster</h3>
<table><tr><th>Gruppe</th><th>Konnektoren</th><th>Verbposition</th><th>Beispiel</th></tr>
<tr><td>0-Position</td><td>und, aber, oder, denn, sondern</td><td>normaler Hauptsatz</td><td>Ich bleibe, denn ich <b>habe</b> Zeit.</td></tr>
<tr><td>Position 1</td><td>deshalb, trotzdem, außerdem, danach, sonst</td><td>Verb direkt danach</td><td>Es regnet. Trotzdem <b>fahre</b> ich.</td></tr>
<tr><td>Nebensatz</td><td>weil, obwohl, wenn, während, sodass</td><td>Verb am Ende</td><td>Ich bleibe, weil es <b>regnet</b>.</td></tr></table>

<h3>Logische Funktionen</h3>
<table><tr><th>Funktion</th><th>Möglichkeiten</th></tr>
<tr><td>Grund</td><td>weil, da, denn, nämlich</td></tr>
<tr><td>Folge</td><td>deshalb, daher, dadurch, sodass</td></tr>
<tr><td>Gegensatz</td><td>aber, jedoch, obwohl, trotzdem, während</td></tr>
<tr><td>Bedingung</td><td>wenn, falls, sofern</td></tr>
<tr><td>Ergänzung</td><td>außerdem, zudem, darüber hinaus</td></tr>
<tr><td>Ziel</td><td>damit; um … zu</td></tr>
<tr><td>Alternative</td><td>entweder … oder; andernfalls</td></tr></table>
<h3>Wichtige Paare</h3>
<ul><li><b>obwohl</b> + Nebensatz: Obwohl es regnet, fahre ich.</li><li><b>trotzdem</b> + Hauptsatz: Es regnet. Trotzdem fahre ich.</li><li><b>weil</b> nennt den Grund; <b>deshalb</b> nennt die Folge.</li><li><b>nicht nur …, sondern auch</b>: Feedback soll nicht nur richtig, sondern auch höflich formuliert sein.</li></ul>
<p><b>C1-Tipp:</b> Nutze Konnektoren nach Bedeutung. Viele verschiedene Konnektoren machen einen Text nicht automatisch besser; die logische Beziehung muss stimmen.</p>
`,
'15':`
<p><b>Kein</b> verneint ein Nomen mit unbestimmtem oder ohne Artikel. <b>Nicht</b> verneint Verben, Adjektive, bestimmte Nomen oder einzelne Satzteile.</p>
<h3>Kein</h3>
<ul><li>Ich habe <b>keine Zeit</b>.</li><li>Wir haben <b>keinen Termin</b>.</li><li>Das ist <b>kein Problem</b>.</li></ul>
<p><i>Kein</i> wird wie <i>ein</i> dekliniert: kein, keine, keinen, keinem, keiner …</p>
<h3>Nicht</h3>
<table><tr><th>Was wird verneint?</th><th>Beispiel</th></tr>
<tr><td>Adjektiv</td><td>Die Erklärung ist <b>nicht verständlich</b>.</td></tr>
<tr><td>Präpositionalgruppe</td><td>Ich fahre <b>nicht mit dem Auto</b>.</td></tr>
<tr><td>bestimmtes Nomen</td><td>Ich meine <b>nicht den ersten Bericht</b>.</td></tr>
<tr><td>Verb oder ganzer Satz</td><td>Ich komme heute <b>nicht</b>.</td></tr></table>
<h3>Position von nicht</h3>
<p><i>Nicht</i> steht normalerweise direkt vor dem Teil, der verneint wird. Bei der Satzverneinung steht es eher spät, aber vor dem letzten Verbteil.</p>
<ul><li>Ich habe den Bericht <b>nicht geschrieben</b>.</li><li>Ich rufe den Kunden heute <b>nicht an</b>.</li><li><b>Nicht ich</b>, sondern mein Kollege hat entschieden.</li></ul>
<h3>Sonderfälle</h3>
<ul><li>noch nicht = bisher nicht: Der Bericht ist <b>noch nicht</b> fertig.</li><li>nicht mehr = früher ja, jetzt nein: Ich arbeite dort <b>nicht mehr</b>.</li><li>gar nicht verstärkt die Negation.</li></ul>
<p class="wrong-example">Nicht: Ich habe nicht Zeit.</p><p>Richtig: Ich habe <b>keine Zeit</b>.</p>
`,
'16':`
<p>Kommas strukturieren den Satz und zeigen, welche Wörter zusammengehören.</p>
<h3>Pflichtkomma bei Nebensätzen</h3>
<ul><li>Ich weiß, <b>dass</b> der Termin stattfindet.</li><li><b>Wenn</b> ich Zeit habe, rufe ich an.</li><li>Wir warten, <b>weil</b> noch Daten fehlen.</li></ul>
<h3>Relativsätze und Einschübe</h3>
<ul><li>Der Bericht, <b>den ich gestern erhalten habe</b>, ist vollständig.</li><li>Frau Meier, <b>unsere Projektleiterin</b>, eröffnet die Sitzung.</li></ul>
<h3>Infinitivgruppen</h3>
<p>Ein Komma ist Pflicht bei <b>um, ohne, statt/anstatt, außer, als + zu</b> sowie bei angekündigten oder von einem Nomen abhängigen Infinitivgruppen.</p>
<ul><li>Ich lerne täglich, <b>um sicherer zu sprechen</b>.</li><li>Er ging, <b>ohne sich zu verabschieden</b>.</li><li>Wir haben den Wunsch, <b>das Projekt fortzusetzen</b>.</li><li>Ich bitte dich darum, <b>pünktlich zu kommen</b>.</li></ul>
<h3>Aufzählungen</h3>
<p>Wir benötigen Zeit, Personal, Budget und klare Zuständigkeiten. Vor <i>und</i> oder <i>oder</i> steht in einer einfachen Aufzählung kein Komma.</p>
<h3>Hauptsätze</h3>
<ul><li>Vor <i>aber, sondern, doch, jedoch</i> steht ein Komma: Ich komme, <b>aber</b> ich bleibe nicht lange.</li><li>Vor <i>und/oder</i> kann ein Komma zur Gliederung stehen, ist aber oft nicht nötig.</li></ul>
<h3>Semikolon</h3>
<p>Das Semikolon verbindet zwei eng zusammengehörige Hauptsätze stärker als ein Punkt, aber schwächer als ein Komma: Die Daten sind vollständig; die Auswertung kann beginnen.</p>
<p class="wrong-example">Nicht: Ich glaube dass das stimmt.</p><p>Richtig: Ich glaube, <b>dass</b> das stimmt.</p>
`,
'17':`
<p>Alle deutschen Nomen werden großgeschrieben. Lerne jedes neue Nomen mit <b>Artikel, Plural und einem Beispielsatz</b>.</p>
<h3>Großschreibung</h3>
<ul><li>konkrete und abstrakte Nomen: der Tisch, die Erfahrung, das Problem</li><li>substantivierte Verben: das <b>Lesen</b>, beim <b>Arbeiten</b>, zum <b>Essen</b></li><li>substantivierte Adjektive: etwas <b>Neues</b>, der <b>Verantwortliche</b></li></ul>
<h3>Pluralmuster</h3>
<table><tr><th>Muster</th><th>Beispiel</th></tr>
<tr><td>-e, oft mit Umlaut</td><td>der Tag – die Tage; der Plan – die Pläne</td></tr>
<tr><td>-er, oft mit Umlaut</td><td>das Kind – die Kinder; das Buch – die Bücher</td></tr>
<tr><td>-(e)n</td><td>die Aufgabe – die Aufgaben; die Frau – die Frauen</td></tr>
<tr><td>-s</td><td>das Auto – die Autos; das Team – die Teams</td></tr>
<tr><td>ohne Endung, teils Umlaut</td><td>der Fehler – die Fehler; der Vater – die Väter</td></tr></table>
<p>Es gibt keine vollständig zuverlässige Pluralregel. Die Endung muss mitgelernt werden.</p>
<h3>Dativ Plural</h3>
<p>Im Dativ Plural kommt normalerweise <b>-n</b> an das Nomen, wenn der Plural nicht bereits auf -n oder -s endet.</p>
<ul><li>mit den Kind<b>ern</b></li><li>bei den Kolleg<b>en</b></li><li>mit den Auto<b>s</b> – kein zusätzliches -n</li></ul>
<h3>N-Deklination</h3>
<p>Einige maskuline Personenbezeichnungen erhalten außer im Nominativ Singular -(e)n:</p>
<ul><li>der Kollege – ich sehe <b>den Kollegen</b> – ich helfe <b>dem Kollegen</b></li><li>der Kunde – mit <b>dem Kunden</b></li><li>der Experte – die Meinung <b>des Experten</b></li></ul>
<h3>Zusammengesetzte Nomen</h3>
<p>Das letzte Wort bestimmt Artikel und Plural: <b>die</b> Firma + <b>die Führung</b> = <b>die Firmenführung</b>.</p>
<p class="wrong-example">Nicht: Firmen Führung oder Team Event.</p><p>Richtig: <b>Firmenführung</b>, <b>Teamevent</b>.</p>
`,
'18':`
<p>Der Infinitiv mit <i>zu</i> ermöglicht, eine Handlung kompakt auszudrücken. Das Subjekt der Infinitivgruppe ist normalerweise mit einem Satzteil im Hauptsatz identisch.</p>
<h3>Typische Auslöser</h3>
<table><tr><th>Gruppe</th><th>Beispiel</th></tr>
<tr><td>Verben</td><td>Ich versuche, täglich Deutsch <b>zu sprechen</b>.</td></tr>
<tr><td>Adjektive</td><td>Es ist wichtig, regelmäßig <b>zu üben</b>.</td></tr>
<tr><td>Nomen</td><td>Ich habe den Wunsch, flüssiger <b>zu sprechen</b>.</td></tr>
<tr><td>um/ohne/statt</td><td>Ich übe, um sicherer <b>zu werden</b>.</td></tr></table>
<h3>Trennbare Verben</h3>
<p><i>zu</i> steht zwischen Präfix und Stamm: anzurufen, aufzustehen, teilzunehmen.</p>
<ul><li>Ich habe vor, morgen früher <b>aufzustehen</b>.</li><li>Er versucht, den Kunden <b>anzurufen</b>.</li></ul>
<h3>Kein zu</h3>
<ul><li>nach Modalverben: Ich muss heute länger <b>arbeiten</b>.</li><li>nach <i>lassen</i>: Ich lasse das Gerät <b>prüfen</b>.</li><li>nach Wahrnehmungsverben: Ich höre ihn <b>sprechen</b>.</li><li>nach Bewegungsverben in festen Verbindungen: Ich gehe <b>einkaufen</b>.</li></ul>
<h3>um … zu oder damit?</h3>
<ul><li>Gleiches Subjekt: Ich lerne Deutsch, <b>um bessere Chancen zu haben</b>.</li><li>Verschiedene Subjekte: Ich spreche langsam, <b>damit du mich verstehst</b>.</li></ul>
<h3>Komma</h3>
<p>Bei <i>um, ohne, statt, außer, als + zu</i> steht immer ein Komma. In anderen Fällen hängt die Kommasetzung von Struktur und Verständlichkeit ab; nach einem ankündigenden Wort oder Nomen ist es Pflicht.</p>
<p class="wrong-example">Nicht: Ich versuche jeden Tag Deutsch zu sprechen ohne Fehler machen.</p><p>Richtig: Ich versuche, jeden Tag Deutsch <b>zu sprechen, ohne Fehler zu machen</b>.</p>
`
};
document.querySelectorAll('.grammar-reference details').forEach(details=>{
 const number=details.querySelector('summary span')?.textContent?.trim();
 const body=details.querySelector(':scope > div');
 if(number&&body&&topics[number])body.innerHTML=topics[number]
});
})();