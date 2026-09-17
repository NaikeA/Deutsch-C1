(function(){
  const topics=[
    'dein Morgen','dein Abend','deine Schlafgewohnheiten','deine Wochenplanung','Zeitdruck',
    'Pünktlichkeit','Ordnung im Alltag','Hausarbeit','Kochen unter der Woche','gemeinsame Mahlzeiten',
    'Lebensmitteleinkauf','Online-Shopping','bewusster Konsum','Sparen im Alltag','unerwartete Ausgaben',
    'deine Wohnung','gute Nachbarschaft','Lärm im Wohngebiet','Umziehen','Wohnen in der Stadt',
    'Wohnen auf dem Land','öffentliche Verkehrsmittel','Autofahren','Radfahren','Reisen mit der Bahn',
    'der tägliche Arbeitsweg','Verspätungen','Urlaubsplanung','eine spontane Reise','dein Lieblingsort',
    'körperliche Bewegung','gesunde Ernährung','Erholung','Stressbewältigung','Arztbesuche',
    'eine neue Gewohnheit','Motivation','Selbstdisziplin','deine persönliche Energie','digitale Pausen',
    'Freundschaften','Familienkontakte','neue Bekanntschaften','Gastfreundschaft','Missverständnisse',
    'Konflikte im Alltag','Entschuldigungen','Grenzen setzen','um Hilfe bitten','anderen helfen',
    'Teamarbeit','Besprechungen','Feedback geben','Feedback annehmen','berufliche Weiterbildung',
    'ein schwieriger Arbeitstag','Verantwortung im Beruf','gute Führung','faire Bezahlung','Arbeitszufriedenheit',
    'Homeoffice','Jobsuche','berufliche Veränderungen','eine wichtige Entscheidung','ein persönliches Ziel',
    'Deutschlernen','eine schwierige Unterhaltung','Telefonate auf Deutsch','Small Talk','deine Aussprache',
    'Fehler beim Sprechen','neue Wörter lernen','Nachrichten und Medien','soziale Netzwerke','künstliche Intelligenz',
    'Datenschutz','dein Smartphone','hilfreiche Apps','Online-Kommunikation','technische Probleme',
    'Freizeitgestaltung','Lesen','Musik','Filme und Serien','Sportveranstaltungen',
    'ein Wochenende mit Freunden','ein ruhiger Sonntag','Feste und Traditionen','Essen im Restaurant','Kulturveranstaltungen',
    'das Wetter','der Winter in Deutschland','Natur in deiner Umgebung','Umweltschutz','Mülltrennung',
    'Energieverbrauch','ehrenamtliches Engagement','Respekt im Alltag','kulturelle Unterschiede','Integration',
    'Heimat','Zugehörigkeit','Selbstvertrauen','Dankbarkeit','Enttäuschung',
    'Unsicherheit','Erfolg','Misserfolg','Geduld','Mut'
  ];
  const frames=[
    topic=>`Welche Rolle spielt „${topic}“ in deinem Alltag? Nenne ein konkretes Beispiel.`,
    topic=>`Beschreibe eine persönliche Erfahrung zum Thema „${topic}“ und erkläre, was du daraus gelernt hast.`,
    topic=>`Was funktioniert für dich beim Thema „${topic}“ gut, und was möchtest du verändern?`,
    topic=>`Welche Vor- und Nachteile verbindest du mit „${topic}“? Begründe deine Meinung.`,
    topic=>`Erinnere dich an eine schwierige Situation rund um „${topic}“. Wie hast du reagiert?`,
    topic=>`Wie hat sich deine Einstellung zu „${topic}“ in den vergangenen Jahren verändert?`,
    topic=>`Welche Empfehlung würdest du einer anderen Person zum Thema „${topic}“ geben?`,
    topic=>`Stell dir vor, du könntest beim Thema „${topic}“ sofort etwas verbessern. Was würdest du tun und warum?`,
    topic=>`Welche Gefühle verbindest du mit „${topic}“? Beschreibe ihre Ursachen möglichst genau.`,
    topic=>`Führe ein kurzes Pro-und-Contra-Argument zum Thema „${topic}“ und formuliere anschließend dein Fazit.`
  ];
  window.GERMAN_WRITING_PROMPTS=topics.flatMap(topic=>frames.map(frame=>frame(topic)));
})();
