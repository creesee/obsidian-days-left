var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// WtyczkiKody/days-left/main.ts
var main_exports = {};
__export(main_exports, {
  buildInlineCountdownExtension: () => buildInlineCountdownExtension,
  default: () => DaysLeftPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var import_view = require("@codemirror/view");
var import_state = require("@codemirror/state");
var i18n = {
  "en": { today: "Today", tomorrow: "Tomorrow", yesterday: "Yesterday", past: (days) => `${days} ${days === 1 ? "day" : "days"} ago`, future: (days) => `${days} ${days === 1 ? "day" : "days"}`, missingDate: "Hey, this is the Days Left plugin! Please provide the 'to:' or 'from:' parameter, or both (e.g. ", missingDateClose: ")", openNote: "Open note", defaultEvent: "Upcoming event", notifHeader: "Notification!" },
  "pl": { today: "Dzisiaj", tomorrow: "Jutro", yesterday: "Wczoraj", past: (days) => `${days} ${days === 1 ? "dzie\u0144" : "dni"} temu`, future: (days) => `${days} ${days === 1 ? "dzie\u0144" : "dni"}`, missingDate: "Hej, tu wtyczka Days Left! Nale\u017Cy poda\u0107 parametr 'to:' lub 'from:', albo oba (np. ", missingDateClose: ")", openNote: "Otw\xF3rz notatk\u0119", defaultEvent: "Wydarzenie", notifHeader: "Powiadomienie!" },
  "es": { today: "Hoy", tomorrow: "Ma\xF1ana", yesterday: "Ayer", past: (days) => `Hace ${days} ${days === 1 ? "d\xEDa" : "d\xEDas"}`, future: (days) => `${days} ${days === 1 ? "d\xEDa" : "d\xEDas"}`, missingDate: "\xA1Hola, este es el plugin Days Left! Proporciona el par\xE1metro 'to:' o 'from:', o ambos (ej. ", missingDateClose: ")", openNote: "Abrir nota", defaultEvent: "Pr\xF3ximo evento", notifHeader: "\xA1Notificaci\xF3n!" },
  "fr": { today: "Aujourd'hui", tomorrow: "Demain", yesterday: "Hier", past: (days) => `Il y a ${days} ${days <= 1 ? "jour" : "jours"}`, future: (days) => `${days} ${days <= 1 ? "jour" : "jours"}`, missingDate: "H\xE9, c'est le plugin Days Left ! Veuillez fournir le param\xE8tre 'to:' ou 'from:', ou les deux (ex. ", missingDateClose: ")", openNote: "Ouvrir la note", defaultEvent: "\xC9v\xE9nement \xE0 venir", notifHeader: "Notification !" },
  "de": { today: "Heute", tomorrow: "Morgen", yesterday: "Gestern", past: (days) => `Vor ${days} ${days === 1 ? "Tag" : "Tagen"}`, future: (days) => `${days} ${days === 1 ? "Tag" : "Tage"}`, missingDate: "Hey, dies ist das Days Left Plugin! Bitte gib den 'to:' oder 'from:' Parameter an, oder beide (z.B. ", missingDateClose: ")", openNote: "Notiz \xF6ffnen", defaultEvent: "Anstehendes Ereignis", notifHeader: "Benachrichtigung!" },
  "ja": { today: "\u4ECA\u65E5", tomorrow: "\u660E\u65E5", yesterday: "\u6628\u65E5", past: (days) => `${days}\u65E5\u524D`, future: (days) => `${days}\u65E5`, missingDate: "\u3053\u3093\u306B\u3061\u306F\u3001Days Left \u30D7\u30E9\u30B0\u30A4\u30F3\u3067\u3059\uFF01 'to:' \u307E\u305F\u306F 'from:' \u30D1\u30E9\u30E1\u30FC\u30BF\u3001\u3042\u308B\u3044\u306F\u4E21\u65B9\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\uFF08\u4F8B: ", missingDateClose: "\uFF09", openNote: "\u30CE\u30FC\u30C8\u3092\u958B\u304F", defaultEvent: "\u30A4\u30D9\u30F3\u30C8", notifHeader: "\u901A\u77E5\uFF01" },
  "uk": { today: "\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456", tomorrow: "\u0417\u0430\u0432\u0442\u0440\u0430", yesterday: "\u0412\u0447\u043E\u0440\u0430", past: (days) => {
    let noun = "\u0434\u043D\u0456\u0432";
    if (days % 10 === 1 && days % 100 !== 11) noun = "\u0434\u0435\u043D\u044C";
    else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) noun = "\u0434\u043D\u0456";
    return `${days} ${noun} \u0442\u043E\u043C\u0443`;
  }, future: (days) => {
    let noun = "\u0434\u043D\u0456\u0432";
    if (days % 10 === 1 && days % 100 !== 11) noun = "\u0434\u0435\u043D\u044C";
    else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) noun = "\u0434\u043D\u0456";
    return `${days} ${noun}`;
  }, missingDate: "\u0413\u0435\u0439, \u0446\u0435 \u043F\u043B\u0430\u0433\u0456\u043D Days Left! \u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0432\u043A\u0430\u0436\u0456\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 'to:' \u0430\u0431\u043E 'from:', \u0430\u0431\u043E \u043E\u0431\u0438\u0434\u0432\u0430 (\u043D\u0430\u043F\u0440. ", missingDateClose: ")", openNote: "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043D\u043E\u0442\u0430\u0442\u043A\u0443", defaultEvent: "\u041C\u0430\u0439\u0431\u0443\u0442\u043D\u044F \u043F\u043E\u0434\u0456\u044F", notifHeader: "\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F!" },
  "zh": { today: "\u4ECA\u5929", tomorrow: "\u660E\u5929", yesterday: "\u6628\u5929", past: (days) => `${days} \u5929\u524D`, future: (days) => `${days} \u5929`, missingDate: "\u563F\uFF0C\u8FD9\u662F Days Left \u63D2\u4EF6\uFF01\u8BF7\u63D0\u4F9B 'to:' \u6216 'from:' \u53C2\u6570\uFF0C\u6216\u4E24\u8005\u90FD\u63D0\u4F9B\uFF08\u4F8B\u5982 ", missingDateClose: "\uFF09", openNote: "\u6253\u5F00\u7B14\u8BB0", defaultEvent: "\u5373\u5C06\u5230\u6765\u7684\u4E8B\u4EF6", notifHeader: "\u901A\u77E5\uFF01" }
};
var settingsI18n = {
  "en": { uiLangName: "Settings interface language", uiLangDesc: "Changes the language of this configurations panel.", langTitle: "Plugin language", langName: "Counter display language", langDesc: "Changes the language of countdown outputs in notes.", instTitle: "Instructions & shortcuts preview", instTip: "Tip: Below is a live preview of the block generated by your shortcut settings:", hotkeyBtn: "Configure hotkeys", globTitle: "Global configuration", globDefText: "Event label (text)", globDefTextDesc: "No default value. Toggle inclusion in hotkey.", globTo: "Target date (to)", globToDesc: "Target date for the countdown. No global value.", globFrom: "Starting date (from)", globFromDesc: "If set, calculates a duration instead of dynamic countdown. No global value.", globDefColor: "Default counter color", globDefColorDesc: "Color for future events.", globPastColor: "Past events color", globPastColorDesc: "Color for elapsed dates.", globHideOnPast: "Hide past events", globHideOnPastDesc: "true: hides the counter entirely when elapsed. false: displays time passed.", globShowDaysText: "Show 'days' unit", globShowDaysTextDesc: "true: displays '5 days'. false: displays just the number '5'.", globToday: "Format Yesterday/Today/Tomorrow", globTodayDesc: "true: uses text ('Yesterday'/'Today'/'Tomorrow'). false: uses numbers.", globShowFinal: "Show target date", globShowFinalDesc: "true: displays the exact date below the counter.", globFormat: "Final date format", globFormatDesc: "Formatting style for final date using {{link}} tokens.", spotTitle: "Spotlight mode (highlight)", spotDays: "Spotlight threshold", spotDaysDesc: "Number of days before the event to trigger highlight styling. Note: Works ONLY for dynamic upcoming events (no 'from' parameter).", spotColor: "Spotlight color", spotColorDesc: "Text color applied within the spotlight zone.", spotBold: "Spotlight bold text", spotBoldDesc: "true: bolds the counter within the spotlight zone.", alertTitle: "Spotlight alerts", alertType: "Alert type", alertTypeDesc: "notice: popup bubble. modal: large window panel. none: disabled.", alertDuration: "Notice duration", alertDurationDesc: "Time in seconds (applies ONLY to 'notice' type alerts). Set 0 to persist.", resetTitle: "Reset settings", resetBtn: "Restore defaults", resetMsg: "Are you sure you want to restore all settings to default values?", resetConfirm: "Yes, restore", resetCancel: "Cancel", tplHeaderParam: "Parameter", tplHeaderValue: "Default value", tplHeaderShortcut: "In hotkey", supportTitle: "Support development", supportDesc: "If you enjoy using this plugin and would like to support my work, please consider buying me a coffee. Thank you!", supportBtn: "Buy me a coffee \u2764", eg: "e.g." },
  "pl": { uiLangName: "J\u0119zyk ustawie\u0144 wtyczki", uiLangDesc: "Zmienia j\u0119zyk menu konfiguracyjnego w tym panelu.", langTitle: "Ustawienia j\u0119zyka", langName: "J\u0119zyk wy\u015Bwietlania licznika", langDesc: "Zmienia j\u0119zyk komunikat\xF3w odliczania wewn\u0105trz notatek.", instTitle: "Instrukcja i podgl\u0105d skr\xF3tu", instTip: "Wskaz\xF3wka: Poni\u017Cej znajduje si\u0119 podgl\u0105d bloku generowanego przez Tw\xF3j skr\xF3t blokowy:", hotkeyBtn: "Konfiguruj skr\xF3ty", globTitle: "Globalna konfiguracja", globDefText: "Nazwa wydarzenia (text)", globDefTextDesc: "Brak warto\u015Bci domy\u015Blnej. Ustaw czy dodawa\u0107 parametr w skr\xF3cie.", globTo: "Data docelowa (to)", globToDesc: "Data docelowa odliczania. Brak warto\u015Bci globalnej.", globFrom: "Data pocz\u0105tkowa (from)", globFromDesc: "Je\u015Bli podana, oblicza czas trwania zamiast odliczania. Brak warto\u015Bci globalnej.", globDefColor: "Standardowy kolor", globDefColorDesc: "Kolor licznika dla przysz\u0142ych wydarze\u0144.", globPastColor: "Kolor przesz\u0142ych", globPastColorDesc: "Kolor licznika dla minionych dat.", globHideOnPast: "Ukryj minione", globHideOnPastDesc: "true: ca\u0142kowicie ukrywa licznik po up\u0142ywie daty. false: pokazuje miniony czas.", globShowDaysText: "Pokazuj tekst 'dni'", globShowDaysTextDesc: "true: np. '5 dni'. false: wy\u015Bwietla samo '5'.", globToday: "Format Wczoraj/Dzi\u015B/Jutro", globTodayDesc: "true: s\u0142owa ('Wczoraj' / 'Dzisiaj' / 'Jutro'). false: liczby.", globShowFinal: "Pokazuj dat\u0119 ko\u0144cow\u0105", globShowFinalDesc: "true: wy\u015Bwietla dat\u0119 pod licznikiem (z 'to' lub 'from').", globFormat: "Format daty ko\u0144cowej", globFormatDesc: "Format wy\u015Bwietlania daty (tokeny {{link}}).", spotTitle: "Tryb Spotlight (wyr\xF3\u017Cnienie)", spotDays: "Pr\xF3g Spotlight", spotDaysDesc: "Liczba dni przed wydarzeniem, od kt\xF3rej tekst zmienia wygl\u0105d. Uwaga: Dzia\u0142a TYLKO dla nadchodz\u0105cych wydarze\u0144 (nie zadzia\u0142a z parametrem 'from').", spotColor: "Kolor Spotlight", spotColorDesc: "Kolor tekstu w strefie Spotlight.", spotBold: "Pogrubienie Spotlight", spotBoldDesc: "true: tekst w strefie Spotlight jest pogrubiony.", alertTitle: "Powiadomienia Spotlight", alertType: "Typ powiadomienia", alertTypeDesc: "notice: dyskretny dymek. modal: du\u017Ce okno na \u015Brodku. none: brak.", alertDuration: "Czas dymka", alertDurationDesc: "Czas wy\u015Bwietlania w sekundach (dotyczy WY\u0141\u0104CZNIE powiadomie\u0144 Notice). 0 = sta\u0142e.", resetTitle: "Zresetuj ustawienia", resetBtn: "Przywr\xF3\u0107 domy\u015Blne", resetMsg: "Czy na pewno chcesz przywr\xF3ci\u0107 wszystkie ustawienia do warto\u015Bci domy\u015Blnych?", resetConfirm: "Tak, przywr\xF3\u0107", resetCancel: "Anuluj", tplHeaderParam: "Parametr", tplHeaderValue: "Warto\u015B\u0107 domy\u015Blna", tplHeaderShortcut: "W skr\xF3cie", supportTitle: "Wsparcie rozwoju", supportDesc: "Je\u015Bli podoba Ci si\u0119 ta wtyczka i chcesz wesprze\u0107 moj\u0105 prac\u0119, postaw mi wirtualn\u0105 kaw\u0119. Dzi\u0119kuj\u0119!", supportBtn: "Postaw mi kaw\u0119 \u2764", eg: "np." },
  "es": { uiLangName: "Idioma de configuraci\xF3n", uiLangDesc: "Cambia el idioma de este panel.", langTitle: "Idioma del plugin", langName: "Idioma del contador", langDesc: "Cambia el idioma en las notas.", instTitle: "Instrucciones y atajos", instTip: "Vista previa del bloque:", hotkeyBtn: "Configurar atajos", globTitle: "Configuraci\xF3n global", globDefText: "Etiqueta (text)", globDefTextDesc: "Sin valor predeterminado.", globTo: "Fecha objetivo (to)", globToDesc: "Fecha objetivo para la cuenta regresiva. Sin valor.", globFrom: "Fecha de inicio (from)", globFromDesc: "Si se establece, calcula una duraci\xF3n en lugar de una cuenta regresiva.", globDefColor: "Color predeterminado", globDefColorDesc: "Color para futuros.", globPastColor: "Color pasado", globPastColorDesc: "Color para eventos pasados.", globHideOnPast: "Ocultar pasados", globHideOnPastDesc: "true: oculta todo. false: muestra tiempo pasado.", globShowDaysText: "Mostrar unidad", globShowDaysTextDesc: "true: '5 d\xEDas'. false: solo '5'.", globToday: "Formato Ayer/Hoy/Ma\xF1ana", globTodayDesc: "true: palabras. false: n\xFAmeros.", globShowFinal: "Mostrar fecha", globShowFinalDesc: "Muestra la fecha final debajo.", globFormat: "Formato de fecha", globFormatDesc: "Estilo de formato de fecha final (tokens {{link}}).", spotTitle: "Modo Spotlight", spotDays: "Umbral", spotDaysDesc: "D\xEDas antes para resaltar. Nota: Funciona SOLO para pr\xF3ximos eventos din\xE1micos (sin par\xE1metro 'from').", spotColor: "Color Spotlight", spotColorDesc: "Color de texto resaltado.", spotBold: "Texto en negrita", spotBoldDesc: "Aplica negrita al resaltar.", alertTitle: "Alertas Spotlight", alertType: "Tipo de alerta", alertTypeDesc: "notice / modal / none.", alertDuration: "Duraci\xF3n de aviso", alertDurationDesc: "Segundos (solo 'notice').", resetTitle: "Restablecer configuraci\xF3n", resetBtn: "Restaurar", resetMsg: "\xBFRestaurar valores predeterminados?", resetConfirm: "S\xED", resetCancel: "Cancelar", tplHeaderParam: "Par\xE1metro", tplHeaderValue: "Valor predeterminado", tplHeaderShortcut: "En atajo", supportTitle: "Apoyar desarrollo", supportDesc: "\xA1Considera invitarme a un caf\xE9!", supportBtn: "Inv\xEDtame a un caf\xE9 \u2764", eg: "ej." },
  "fr": { uiLangName: "Langue des param\xE8tres", uiLangDesc: "Change la langue du panneau.", langTitle: "Langue du plugin", langName: "Langue du compteur", langDesc: "Change la langue dans les notes.", instTitle: "Instructions et raccourcis", instTip: "Aper\xE7u du bloc g\xE9n\xE9r\xE9 :", hotkeyBtn: "Configurer", globTitle: "Configuration globale", globDefText: "\xC9tiquette (text)", globDefTextDesc: "Pas de valeur par d\xE9faut.", globTo: "Date cible (to)", globToDesc: "Date cible du compte \xE0 rebours.", globFrom: "Date de d\xE9but (from)", globFromDesc: "Si d\xE9finie, calcule une dur\xE9e au lieu d'un compte \xE0 rebours.", globDefColor: "Couleur par d\xE9faut", globDefColorDesc: "Couleur \xE9v\xE9nements futurs.", globPastColor: "Couleur pass\xE9e", globPastColorDesc: "Couleur \xE9v\xE9nements pass\xE9s.", globHideOnPast: "Masquer pass\xE9s", globHideOnPastDesc: "true: masque. false: montre temps pass\xE9.", globShowDaysText: "Afficher l'unit\xE9", globShowDaysTextDesc: "true: '5 jours'. false: '5'.", globToday: "Format Hier/Aujourd'hui/Demain", globTodayDesc: "true: texte. false: nombres.", globShowFinal: "Afficher date fin", globShowFinalDesc: "Affiche la date exacte.", globFormat: "Format date", globFormatDesc: "Style de formatage pour la date de fin (jetons {{link}}).", spotTitle: "Mode Spotlight", spotDays: "Seuil Spotlight", spotDaysDesc: "Jours avant surbrillance. Note: Fonctionne UNIQUEMENT pour les \xE9v\xE9nements \xE0 venir (sans param\xE8tre 'from').", spotColor: "Couleur Spotlight", spotColorDesc: "Couleur de surbrillance.", spotBold: "Texte en gras", spotBoldDesc: "Applique le texte en gras.", alertTitle: "Alertes Spotlight", alertType: "Type", alertTypeDesc: "notice / modal / none.", alertDuration: "Dur\xE9e notice", alertDurationDesc: "Secondes (seulement 'notice').", resetTitle: "R\xE9initialiser les param\xE8tres", resetBtn: "Restaurer", resetMsg: "Restaurer par d\xE9faut ?", resetConfirm: "Oui", resetCancel: "Annuler", tplHeaderParam: "Param\xE8tre", tplHeaderValue: "Valeur par d\xE9faut", tplHeaderShortcut: "Raccourci", supportTitle: "Soutenir le d\xE9veloppement", supportDesc: "Pensez \xE0 m'offrir un caf\xE9. Merci !", supportBtn: "M'offrir un caf\xE9 \u2764", eg: "ex." },
  "de": { uiLangName: "Einstellungssprache", uiLangDesc: "\xC4ndert die Sprache dieses Panels.", langTitle: "Plugin-Sprache", langName: "Z\xE4hlersprache", langDesc: "\xC4ndert die Sprache in den Notizen.", instTitle: "Anleitung & Shortcuts", instTip: "Vorschau des generierten Blocks:", hotkeyBtn: "Tastenk\xFCrzel", globTitle: "Globale Konfiguration", globDefText: "Ereignisname (text)", globDefTextDesc: "Kein Standardwert.", globTo: "Zieldatum (to)", globToDesc: "Zieldatum f\xFCr den Countdown.", globFrom: "Startdatum (from)", globFromDesc: "Wenn festgelegt, wird eine Dauer statt eines Countdowns berechnet.", globDefColor: "Standardfarbe", globDefColorDesc: "Farbe f\xFCr Zukunft.", globPastColor: "Farbe f\xFCr Vergangenheit", globPastColorDesc: "Farbe f\xFCr vergangene Daten.", globHideOnPast: "Vergangene ausblenden", globHideOnPastDesc: "true: ausblenden. false: vergangene Zeit anzeigen.", globShowDaysText: "Einheit anzeigen", globShowDaysTextDesc: "true: '5 Tage'. false: '5'.", globToday: "Gestern/Heute/Morgen", globTodayDesc: "true: W\xF6rter. false: Zahlen.", globShowFinal: "Zieldatum zeigen", globShowFinalDesc: "Zeigt das genaue Datum an.", globFormat: "Datumsformat", globFormatDesc: "Formatierung f\xFCr Enddatum ({{link}} Tokens).", spotTitle: "Spotlight-Modus", spotDays: "Schwellenwert", spotDaysDesc: "Tage vorher f\xFCr Hervorhebung. Hinweis: Funktioniert NUR f\xFCr zuk\xFCnftige Ereignisse (ohne 'from' Parameter).", spotColor: "Spotlight-Farbe", spotColorDesc: "Farbe der Hervorhebung.", spotBold: "Fetter Text", spotBoldDesc: "Macht den Text fett.", alertTitle: "Spotlight-Alarme", alertType: "Typ", alertTypeDesc: "notice / modal / none.", alertDuration: "Anzeigedauer", alertDurationDesc: "Sekunden (nur f\xFCr 'notice').", resetTitle: "Einstellungen zur\xFCcksetzen", resetBtn: "Standardwerte", resetMsg: "Standardwerte wiederherstellen?", resetConfirm: "Ja", resetCancel: "Abbrechen", tplHeaderParam: "Parameter", tplHeaderValue: "Standard", tplHeaderShortcut: "Im K\xFCrzel", supportTitle: "Entwicklung unterst\xFCtzen", supportDesc: "Spendier mir einen Kaffee. Danke!", supportBtn: "Spendier mir einen Kaffee \u2764", eg: "z.B." },
  "ja": { uiLangName: "\u8A2D\u5B9A\u8A00\u8A9E", uiLangDesc: "\u3053\u306E\u30D1\u30CD\u30EB\u306E\u8A00\u8A9E\u3092\u5909\u66F4\u3057\u307E\u3059\u3002", langTitle: "\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u8A00\u8A9E", langName: "\u30AB\u30A6\u30F3\u30BF\u30FC\u306E\u8A00\u8A9E", langDesc: "\u30CE\u30FC\u30C8\u5185\u306E\u51FA\u529B\u8A00\u8A9E\u3092\u5909\u66F4\u3057\u307E\u3059\u3002", instTitle: "\u4F7F\u3044\u65B9\u3068\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8", instTip: "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u306E\u30D7\u30EC\u30D3\u30E5\u30FC:", hotkeyBtn: "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u8A2D\u5B9A", globTitle: "\u30B0\u30ED\u30FC\u30D0\u30EB\u8A2D\u5B9A", globDefText: "\u30A4\u30D9\u30F3\u30C8\u540D (text)", globDefTextDesc: "\u30C7\u30D5\u30A9\u30EB\u30C8\u5024\u306F\u3042\u308A\u307E\u305B\u3093\u3002", globTo: "\u76EE\u6A19\u65E5 (to)", globToDesc: "\u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u306E\u76EE\u6A19\u65E5\u3002\u30C7\u30D5\u30A9\u30EB\u30C8\u5024\u306F\u3042\u308A\u307E\u305B\u3093\u3002", globFrom: "\u958B\u59CB\u65E5 (from)", globFromDesc: "\u8A2D\u5B9A\u3059\u308B\u3068\u3001\u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u306E\u4EE3\u308F\u308A\u306B\u671F\u9593\u3092\u8A08\u7B97\u3057\u307E\u3059\u3002", globDefColor: "\u30C7\u30D5\u30A9\u30EB\u30C8\u8272", globDefColorDesc: "\u672A\u6765\u306E\u30A4\u30D9\u30F3\u30C8\u8272\u3002", globPastColor: "\u904E\u53BB\u306E\u8272", globPastColorDesc: "\u904E\u53BB\u306E\u30A4\u30D9\u30F3\u30C8\u8272\u3002", globHideOnPast: "\u904E\u53BB\u3092\u96A0\u3059", globHideOnPastDesc: "true: \u5B8C\u5168\u306B\u96A0\u3059\u3002false: \u7D4C\u904E\u6642\u9593\u3092\u8868\u793A\u3002", globShowDaysText: "\u5358\u4F4D\u3092\u8868\u793A", globShowDaysTextDesc: "true: '5\u65E5'\u3002false: '5'\u3002", globToday: "\u6628\u65E5/\u4ECA\u65E5/\u660E\u65E5", globTodayDesc: "true: \u30C6\u30AD\u30B9\u30C8\u3002false: \u6570\u5B57\u3002", globShowFinal: "\u7D42\u4E86\u65E5\u3092\u8868\u793A", globShowFinalDesc: "\u6B63\u78BA\u306A\u65E5\u4ED8\u3092\u8868\u793A\u3057\u307E\u3059\u3002", globFormat: "\u65E5\u4ED8\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8", globFormatDesc: "\u7D42\u4E86\u65E5\u306E\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8 ({{link}} \u30C8\u30FC\u30AF\u30F3)\u3002", spotTitle: "Spotlight \u30E2\u30FC\u30C9", spotDays: "\u3057\u304D\u3044\u5024", spotDaysDesc: "\u30CF\u30A4\u30E9\u30A4\u30C8\u3092\u9069\u7528\u3059\u308B\u65E5\u6570\u3002 \u6CE8\u610F: \u5C06\u6765\u306E\u30A4\u30D9\u30F3\u30C8\u306E\u307F\u6A5F\u80FD\u3057\u307E\u3059\uFF08'from' \u30D1\u30E9\u30E1\u30FC\u30BF\u306A\u3057\uFF09\u3002", spotColor: "Spotlight \u306E\u8272", spotColorDesc: "\u30CF\u30A4\u30E9\u30A4\u30C8\u306E\u8272\u3002", spotBold: "\u592A\u5B57", spotBoldDesc: "\u592A\u5B57\u306B\u3057\u307E\u3059\u3002", alertTitle: "Spotlight \u30A2\u30E9\u30FC\u30C8", alertType: "\u30BF\u30A4\u30D7", alertTypeDesc: "notice / modal / none\u3002", alertDuration: "\u901A\u77E5\u306E\u9577\u3055", alertDurationDesc: "\u79D2 (notice\u306E\u307F)\u3002", resetTitle: "\u8A2D\u5B9A\u3092\u30EA\u30BB\u30C3\u30C8", resetBtn: "\u30C7\u30D5\u30A9\u30EB\u30C8\u306B\u623B\u3059", resetMsg: "\u30C7\u30D5\u30A9\u30EB\u30C8\u306B\u623B\u3057\u307E\u3059\u304B\uFF1F", resetConfirm: "\u306F\u3044", resetCancel: "\u30AD\u30E3\u30F3\u30BB\u30EB", tplHeaderParam: "\u30D1\u30E9\u30E1\u30FC\u30BF", tplHeaderValue: "\u30C7\u30D5\u30A9\u30EB\u30C8", tplHeaderShortcut: "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8", supportTitle: "\u958B\u767A\u652F\u63F4", supportDesc: "\u30B3\u30FC\u30D2\u30FC\u3092\u3054\u99B3\u8D70\u3057\u3066\u3044\u305F\u3060\u3051\u308B\u3068\u5B09\u3057\u3044\u3067\u3059\uFF01", supportBtn: "\u30B3\u30FC\u30D2\u30FC\u3092\u3054\u99B3\u8D70\u3059\u308B \u2764", eg: "\u4F8B:" },
  "uk": { uiLangName: "\u041C\u043E\u0432\u0430 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u044C", uiLangDesc: "\u0417\u043C\u0456\u043D\u044E\u0454 \u043C\u043E\u0432\u0443 \u0446\u0456\u0454\u0457 \u043F\u0430\u043D\u0435\u043B\u0456.", langTitle: "\u041C\u043E\u0432\u0430 \u043F\u043B\u0430\u0433\u0456\u043D\u0430", langName: "\u041C\u043E\u0432\u0430 \u043B\u0456\u0447\u0438\u043B\u044C\u043D\u0438\u043A\u0430", langDesc: "\u0417\u043C\u0456\u043D\u044E\u0454 \u043C\u043E\u0432\u0443 \u0432 \u043D\u043E\u0442\u0430\u0442\u043A\u0430\u0445.", instTitle: "\u0406\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u044F \u0442\u0430 \u044F\u0440\u043B\u0438\u043A\u0438", instTip: "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434 \u044F\u0440\u043B\u0438\u043A\u0430:", hotkeyBtn: "\u0413\u0430\u0440\u044F\u0447\u0456 \u043A\u043B\u0430\u0432\u0456\u0448\u0456", globTitle: "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u0430 \u043A\u043E\u043D\u0444\u0456\u0433\u0443\u0440\u0430\u0446\u0456\u044F", globDefText: "\u041D\u0430\u0437\u0432\u0430 (text)", globDefTextDesc: "\u041D\u0435\u043C\u0430\u0454 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0437\u0430 \u0437\u0430\u043C\u043E\u0432\u0447\u0443\u0432\u0430\u043D\u043D\u044F\u043C.", globTo: "\u041A\u0456\u043D\u0446\u0435\u0432\u0430 \u0434\u0430\u0442\u0430 (to)", globToDesc: "\u041D\u0435\u043C\u0430\u0454 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0437\u0430 \u0437\u0430\u043C\u043E\u0432\u0447\u0443\u0432\u0430\u043D\u043D\u044F\u043C.", globFrom: "\u041F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0430 \u0434\u0430\u0442\u0430 (from)", globFromDesc: "\u042F\u043A\u0449\u043E \u0432\u043A\u0430\u0437\u0430\u043D\u043E, \u043E\u0431\u0447\u0438\u0441\u043B\u044E\u0454 \u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u0437\u0430\u043C\u0456\u0441\u0442\u044C \u0437\u0432\u043E\u0440\u043E\u0442\u043D\u043E\u0433\u043E \u0432\u0456\u0434\u043B\u0456\u043A\u0443.", globDefColor: "\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0438\u0439 \u043A\u043E\u043B\u0456\u0440", globDefColorDesc: "\u0414\u043B\u044F \u043C\u0430\u0439\u0431\u0443\u0442\u043D\u0456\u0445 \u043F\u043E\u0434\u0456\u0439.", globPastColor: "\u041A\u043E\u043B\u0456\u0440 \u043C\u0438\u043D\u0443\u043B\u0438\u0445", globPastColorDesc: "\u0414\u043B\u044F \u043C\u0438\u043D\u0443\u043B\u0438\u0445 \u043F\u043E\u0434\u0456\u0439.", globHideOnPast: "\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438 \u043C\u0438\u043D\u0443\u043B\u0456", globHideOnPastDesc: "true: \u043F\u0440\u0438\u0445\u043E\u0432\u0443\u0454. false: \u043F\u043E\u043A\u0430\u0437\u0443\u0454 \u0447\u0430\u0441.", globShowDaysText: "\u041F\u043E\u043A\u0430\u0437\u0443\u0432\u0430\u0442\u0438 \u043E\u0434\u0438\u043D\u0438\u0446\u0456", globShowDaysTextDesc: "true: '5 \u0434.'. false: '5'.", globToday: "\u0412\u0447\u043E\u0440\u0430/\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456/\u0417\u0430\u0432\u0442\u0440\u0430", globTodayDesc: "true: \u0441\u043B\u043E\u0432\u0430. false: \u0447\u0438\u0441\u043B\u0430.", globShowFinal: "\u041A\u0456\u043D\u0446\u0435\u0432\u0430 \u0434\u0430\u0442\u0430", globShowFinalDesc: "\u041F\u043E\u043A\u0430\u0437\u0443\u0432\u0430\u0442\u0438 \u0442\u043E\u0447\u043D\u0443 \u0434\u0430\u0442\u0443.", globFormat: "\u0424\u043E\u0440\u043C\u0430\u0442 \u0434\u0430\u0442\u0438", globFormatDesc: "\u0421\u0442\u0438\u043B\u044C \u0444\u043E\u0440\u043C\u0430\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u043A\u0456\u043D\u0446\u0435\u0432\u043E\u0457 \u0434\u0430\u0442\u0438 (\u0442\u043E\u043A\u0435\u043D\u0438 {{link}}).", spotTitle: "\u0420\u0435\u0436\u0438\u043C Spotlight", spotDays: "\u041F\u043E\u0440\u0456\u0433", spotDaysDesc: "\u0414\u043D\u0456\u0432 \u0434\u043E \u043F\u043E\u0434\u0456\u0457 \u0434\u043B\u044F \u0432\u0438\u0434\u0456\u043B\u0435\u043D\u043D\u044F. \u041F\u0440\u0438\u043C\u0456\u0442\u043A\u0430: \u041F\u0440\u0430\u0446\u044E\u0454 \u0422\u0406\u041B\u042C\u041A\u0418 \u0434\u043B\u044F \u043C\u0430\u0439\u0431\u0443\u0442\u043D\u0456\u0445 \u043F\u043E\u0434\u0456\u0439 (\u0431\u0435\u0437 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u0430 'from').", spotColor: "\u041A\u043E\u043B\u0456\u0440 Spotlight", spotColorDesc: "\u041A\u043E\u043B\u0456\u0440 \u0432\u0438\u0434\u0456\u043B\u0435\u043D\u043D\u044F.", spotBold: "\u0416\u0438\u0440\u043D\u0438\u0439", spotBoldDesc: "\u0420\u043E\u0431\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0436\u0438\u0440\u043D\u0438\u043C.", alertTitle: "\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F Spotlight", alertType: "\u0422\u0438\u043F", alertTypeDesc: "notice / modal / none.", alertDuration: "\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C (\u0441)", alertDurationDesc: "\u0421\u0435\u043A\u0443\u043D\u0434\u0438 (\u043B\u0438\u0448\u0435 \u0434\u043B\u044F notice).", resetTitle: "\u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F", resetBtn: "\u0412\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438", resetMsg: "\u0412\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438 \u0437\u0430 \u0437\u0430\u043C\u043E\u0432\u0447\u0443\u0432\u0430\u043D\u043D\u044F\u043C?", resetConfirm: "\u0422\u0430\u043A", resetCancel: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438", tplHeaderParam: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440", tplHeaderValue: "\u0417\u043D\u0430\u0447\u0435\u043D\u043D\u044F", tplHeaderShortcut: "\u042F\u0440\u043B\u0438\u043A", supportTitle: "\u041F\u0456\u0434\u0442\u0440\u0438\u043C\u043A\u0430", supportDesc: "\u0411\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u043A\u0443\u043F\u0456\u0442\u044C \u043C\u0435\u043D\u0456 \u043A\u0430\u0432\u0443. \u0414\u044F\u043A\u0443\u044E!", supportBtn: "\u041A\u0443\u043F\u0438\u0442\u0438 \u043C\u0435\u043D\u0456 \u043A\u0430\u0432\u0443 \u2764", eg: "\u043D\u0430\u043F\u0440." },
  "zh": { uiLangName: "\u8BBE\u7F6E\u8BED\u8A00", uiLangDesc: "\u66F4\u6539\u6B64\u9762\u677F\u7684\u8BED\u8A00\u3002", langTitle: "\u63D2\u4EF6\u8BED\u8A00", langName: "\u8BA1\u6570\u5668\u8BED\u8A00", langDesc: "\u66F4\u6539\u7B14\u8BB0\u4E2D\u7684\u8F93\u51FA\u8BED\u8A00\u3002", instTitle: "\u8BF4\u660E\u4E0E\u5FEB\u6377\u952E", instTip: "\u5FEB\u6377\u952E\u751F\u6210\u7684\u5757\u9884\u89C8:", hotkeyBtn: "\u914D\u7F6E\u5FEB\u6377\u952E", globTitle: "\u5168\u5C40\u914D\u7F6E", globDefText: "\u4E8B\u4EF6\u6807\u7B7E (text)", globDefTextDesc: "\u65E0\u9ED8\u8BA4\u503C\u3002", globTo: "\u76EE\u6807\u65E5\u671F (to)", globToDesc: "\u65E0\u9ED8\u8BA4\u503C\u3002", globFrom: "\u5F00\u59CB\u65E5\u671F (from)", globFromDesc: "\u5982\u679C\u8BBE\u7F6E\uFF0C\u5C06\u8BA1\u7B97\u6301\u7EED\u65F6\u95F4\u800C\u4E0D\u662F\u5012\u8BA1\u65F6\u3002", globDefColor: "\u9ED8\u8BA4\u989C\u8272", globDefColorDesc: "\u672A\u6765\u4E8B\u4EF6\u7684\u989C\u8272\u3002", globPastColor: "\u8FC7\u53BB\u989C\u8272", globPastColorDesc: "\u8FC7\u53BB\u4E8B\u4EF6\u7684\u989C\u8272\u3002", globHideOnPast: "\u9690\u85CF\u8FC7\u53BB", globHideOnPastDesc: "true: \u5B8C\u5168\u9690\u85CF\u3002 false: \u663E\u793A\u7ECF\u8FC7\u7684\u65F6\u95F4\u3002", globShowDaysText: "\u663E\u793A\u5355\u4F4D", globShowDaysTextDesc: "true: '5 \u5929'\u3002 false: '5'\u3002", globToday: "\u6628\u5929/\u4ECA\u5929/\u660E\u5929", globTodayDesc: "true: \u6587\u5B57\u3002 false: \u6570\u5B57\u3002", globShowFinal: "\u663E\u793A\u65E5\u671F", globShowFinalDesc: "\u663E\u793A\u51C6\u786E\u7684\u7ED3\u675F\u65E5\u671F\u3002", globFormat: "\u65E5\u671F\u683C\u5F0F", globFormatDesc: "\u7ED3\u675F\u65E5\u671F\u683C\u5F0F (\u4F7F\u7528 {{link}} \u4EE4\u724C)\u3002", spotTitle: "Spotlight \u6A21\u5F0F", spotDays: "\u9608\u503C", spotDaysDesc: "\u9AD8\u4EAE\u663E\u793A\u7684\u5929\u6570\u3002\u6CE8\u610F\uFF1A\u4EC5\u9002\u7528\u4E8E\u5373\u5C06\u5230\u6765\u7684\u52A8\u6001\u4E8B\u4EF6\uFF08\u65E0 'from' \u53C2\u6570\uFF09\u3002", spotColor: "\u989C\u8272", spotColorDesc: "\u9AD8\u4EAE\u989C\u8272\u3002", spotBold: "\u52A0\u7C97", spotBoldDesc: "\u52A0\u7C97\u6587\u672C\u3002", alertTitle: "Spotlight \u8B66\u62A5", alertType: "\u7C7B\u578B", alertTypeDesc: "notice / modal / none.", alertDuration: "\u901A\u77E5\u65F6\u95F4 (\u79D2)", alertDurationDesc: "\u4EC5\u9650 'notice' \u7C7B\u578B\u3002", resetTitle: "\u91CD\u7F6E\u8BBE\u7F6E", resetBtn: "\u6062\u590D\u9ED8\u8BA4", resetMsg: "\u786E\u5B9A\u8981\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E\u5417\uFF1F", resetConfirm: "\u786E\u5B9A", resetCancel: "\u53D6\u6D88", tplHeaderParam: "\u53C2\u6570", tplHeaderValue: "\u9ED8\u8BA4\u503C", tplHeaderShortcut: "\u5FEB\u6377\u952E", supportTitle: "\u652F\u6301\u5F00\u53D1", supportDesc: "\u8BF7\u8003\u8651\u8BF7\u6211\u559D\u676F\u5496\u5561\u3002\u8C22\u8C22\uFF01", supportBtn: "\u8BF7\u6211\u559D\u676F\u5496\u5561 \u2764", eg: "\u4F8B\u5982" }
};
var DEFAULT_SETTINGS = {
  uiLanguage: "en",
  language: "en",
  dayCounterColor: "var(--text-normal)",
  dayCounterColorPast: "var(--text-faint)",
  hideOnPast: false,
  showDaysText: true,
  todayTomorrow: true,
  showFinalDate: true,
  finalDateFormat: "D MMMM YYYY | dddd",
  spotlightDays: 2,
  spotlightColor: "#c86a6a",
  spotlightBold: true,
  spotlightAlert: "notice",
  spotlightAlertDuration: 30,
  templateIncludeLanguage: false,
  templateIncludeText: true,
  templateIncludeTo: true,
  templateIncludeFrom: false,
  templateIncludeDayCounterColor: false,
  templateIncludeDayCounterColorPast: false,
  templateIncludeHideOnPast: false,
  templateIncludeShowDaysText: false,
  templateIncludeTodayTomorrow: false,
  templateIncludeShowFinalDate: false,
  templateIncludeFinalDateFormat: false,
  templateIncludeSpotlightDays: false,
  templateIncludeSpotlightColor: false,
  templateIncludeSpotlightBold: false,
  templateIncludeSpotlightAlert: false,
  templateIncludeSpotlightAlertDuration: false
};
var pluginUpdateEffect = import_state.StateEffect.define();
function renderMissingDateError(container, isInline, lang) {
  container.empty();
  container.addClass("daysleft-error");
  container.createSpan({ text: lang.missingDate });
  container.createEl("code", { text: isInline ? "2025-10-08" : "to: 2025-10-08" });
  container.createSpan({ text: lang.missingDateClose });
}
var ResetConfirmModal = class extends import_obsidian.Modal {
  constructor(app, langDict, onConfirm) {
    super(app);
    __publicField(this, "langDict", langDict);
    __publicField(this, "onConfirm", onConfirm);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    const container = contentEl.createDiv({ cls: "daysleft-modal-container" });
    container.createEl("h2", { text: this.langDict.resetTitle });
    container.createEl("p", { text: this.langDict.resetMsg });
    const btnRow = container.createDiv({ cls: "daysleft-modal-btn-row" });
    const cancelBtn = btnRow.createEl("button", { text: this.langDict.resetCancel });
    cancelBtn.onclick = () => this.close();
    const confirmBtn = btnRow.createEl("button", { text: this.langDict.resetConfirm });
    confirmBtn.style.color = "var(--text-error)";
    confirmBtn.style.borderColor = "var(--text-error)";
    confirmBtn.onclick = () => {
      this.onConfirm();
      this.close();
    };
  }
};
var CountdownAlertModal = class extends import_obsidian.Modal {
  constructor(app, title, msg, sourcePath, lang, isActive) {
    super(app);
    __publicField(this, "title", title);
    __publicField(this, "msg", msg);
    __publicField(this, "sourcePath", sourcePath);
    __publicField(this, "lang", lang);
    __publicField(this, "isActive", isActive);
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    const container = contentEl.createDiv({ cls: "daysleft-modal-container" });
    container.createDiv({ text: "Days Left", cls: "daysleft-modal-subtitle" });
    container.createEl("h1", { text: this.lang.notifHeader, cls: "daysleft-modal-title" });
    container.createEl("h2", { text: this.title });
    container.createEl("p", { text: this.msg, cls: "daysleft-modal-message" });
    if (!this.isActive) {
      const btn = container.createEl("button", { text: this.lang.openNote, cls: "mod-cta" });
      btn.onclick = () => {
        this.app.workspace.openLinkText(this.sourcePath, "", true);
        this.close();
      };
    }
  }
};
function triggerNotification(plugin, text, diffDays, type, uniqueId, sourcePath, lang, durationSec) {
  if (plugin.notifiedSet.has(uniqueId)) return;
  plugin.notifiedSet.add(uniqueId);
  let msg = (config, diff, lg) => {
    if (config && diff === 0) return lg.today;
    if (config && diff === 1) return lg.tomorrow;
    if (config && diff === -1) return lg.yesterday;
    return diff < 0 ? lg.past(Math.abs(diff)) : lg.future(diff);
  };
  const message = msg(true, diffDays, lang);
  const activeFile = plugin.app.workspace.getActiveFile();
  const isActive = activeFile && activeFile.path === sourcePath;
  if (type === "modal") {
    new CountdownAlertModal(plugin.app, text || lang.defaultEvent, message, sourcePath, lang, isActive).open();
  } else if (type === "notice") {
    const notice = new import_obsidian.Notice("", durationSec === 0 ? 0 : durationSec * 1e3);
    notice.noticeEl.empty();
    const wrapper = notice.noticeEl.createDiv({ cls: "daysleft-notice-container" });
    wrapper.createDiv({ text: text || lang.defaultEvent, cls: "daysleft-notice-event" });
    wrapper.createDiv({ text: message });
    if (!isActive) {
      wrapper.onclick = () => plugin.app.workspace.openLinkText(sourcePath, "", true);
    }
  }
}
var DaysLeftBlock = class extends import_obsidian.MarkdownRenderChild {
  constructor(containerEl, source, plugin, ctxPath) {
    super(containerEl);
    __publicField(this, "source", source);
    __publicField(this, "plugin", plugin);
    __publicField(this, "ctxPath", ctxPath);
  }
  onload() {
    this.plugin.activeBlocks.push(this);
    this.render();
  }
  onunload() {
    this.plugin.activeBlocks = this.plugin.activeBlocks.filter((b) => b !== this);
  }
  render() {
    this.containerEl.empty();
    const conf = this.plugin.parseConfig(this.source);
    const lang = i18n[conf.language] || i18n["en"];
    const hasTo = conf.to && (0, import_obsidian.moment)(conf.to).isValid();
    const hasFrom = conf.from && (0, import_obsidian.moment)(conf.from).isValid();
    if (!hasTo && !hasFrom) {
      renderMissingDateError(this.containerEl, false, lang);
      return;
    }
    let diff = 0;
    let targetForFinalDate = (0, import_obsidian.moment)();
    if (hasTo && hasFrom) {
      diff = (0, import_obsidian.moment)(conf.to).startOf("day").diff((0, import_obsidian.moment)(conf.from).startOf("day"), "days");
      targetForFinalDate = (0, import_obsidian.moment)(conf.to).startOf("day");
    } else if (hasTo) {
      diff = (0, import_obsidian.moment)(conf.to).startOf("day").diff((0, import_obsidian.moment)().startOf("day"), "days");
      targetForFinalDate = (0, import_obsidian.moment)(conf.to).startOf("day");
    } else if (hasFrom) {
      diff = (0, import_obsidian.moment)().startOf("day").diff((0, import_obsidian.moment)(conf.from).startOf("day"), "days");
      targetForFinalDate = (0, import_obsidian.moment)(conf.from).startOf("day");
    }
    const isStaticOrDuration = hasFrom;
    if (diff < 0 && conf.hideOnPast && !isStaticOrDuration) {
      this.containerEl.style.display = "none";
      return;
    }
    const container = this.containerEl.createDiv({ cls: "daysleft-block-container" });
    if (conf.text) container.createDiv({ text: conf.text, cls: "daysleft-block-text" });
    const absD = Math.abs(diff);
    let disp = "";
    if (isStaticOrDuration) {
      disp = conf.showDaysText ? lang.future(absD) : absD.toString();
    } else {
      disp = conf.todayTomorrow && diff === 0 ? lang.today : conf.todayTomorrow && diff === 1 ? lang.tomorrow : conf.todayTomorrow && diff === -1 ? lang.yesterday : conf.showDaysText ? diff < 0 ? lang.past(absD) : lang.future(absD) : diff.toString();
    }
    const cntEl = container.createDiv({ text: disp, cls: "daysleft-block-counter" });
    const isSpot = !isStaticOrDuration && diff >= 0 && diff <= conf.spotlightDays;
    if (isSpot) {
      cntEl.style.color = conf.spotlightColor;
      if (conf.spotlightBold) cntEl.style.fontWeight = "bold";
    } else {
      cntEl.style.color = diff < 0 && !isStaticOrDuration ? conf.dayCounterColorPast : conf.dayCounterColor;
    }
    if (conf.showFinalDate) {
      const dateStr = targetForFinalDate.locale(conf.language === "uk" ? "uk" : conf.language === "zh" ? "zh-cn" : conf.language).format(conf.finalDateFormat);
      container.createDiv({ text: dateStr.charAt(0).toUpperCase() + dateStr.slice(1), cls: "daysleft-block-date" });
    }
  }
};
var DaysLeftInlineReading = class extends import_obsidian.MarkdownRenderChild {
  constructor(containerEl, dateStr, plugin, sourcePath) {
    super(containerEl);
    __publicField(this, "dateStr", dateStr);
    __publicField(this, "plugin", plugin);
    __publicField(this, "sourcePath", sourcePath);
  }
  onload() {
    this.plugin.activeInlines.push(this);
    this.render();
  }
  onunload() {
    this.plugin.activeInlines = this.plugin.activeInlines.filter((i) => i !== this);
  }
  render() {
    this.containerEl.empty();
    this.containerEl.appendChild(this.plugin.createInlineSpan(this.dateStr, this.sourcePath));
  }
};
var InlineCountdownWidget = class extends import_view.WidgetType {
  constructor(date, plugin) {
    super();
    __publicField(this, "date", date);
    __publicField(this, "plugin", plugin);
  }
  toDOM(view) {
    const span = this.plugin.createInlineSpan(this.date, "");
    span.style.cursor = "text";
    span.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const pos = view.posAtDOM(span);
      if (pos !== null) {
        view.dispatch({ selection: { anchor: pos + 4 } });
        view.focus();
      }
    });
    return span;
  }
};
function buildInlineCountdownExtension(plugin) {
  return import_view.ViewPlugin.fromClass(class {
    constructor(view) {
      __publicField(this, "decorations");
      this.decorations = this.build(view);
    }
    update(update) {
      if (update.docChanged || update.viewportChanged || update.selectionSet) this.decorations = this.build(update.view);
    }
    build(view) {
      const builder = new import_state.RangeSetBuilder();
      const regex = /`dl:([^`]+)?`/g;
      for (let { from, to } of view.visibleRanges) {
        const text = view.state.doc.sliceString(from, to);
        let match;
        while ((match = regex.exec(text)) !== null) {
          const dateStr = match[1] ? match[1].trim() : "";
          if (dateStr === "") continue;
          const start = from + match.index;
          const end = start + match[0].length;
          let hasCursorInside = false;
          for (const range of view.state.selection.ranges) {
            if (range.head >= start && range.head <= end) hasCursorInside = true;
          }
          if (!hasCursorInside) {
            builder.add(start, end, import_view.Decoration.replace({ widget: new InlineCountdownWidget(dateStr, plugin) }));
          }
        }
      }
      return builder.finish();
    }
  }, { decorations: (v) => v.decorations });
}
var DaysLeftPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    __publicField(this, "settings");
    __publicField(this, "notifiedSet", /* @__PURE__ */ new Set());
    __publicField(this, "activeBlocks", []);
    __publicField(this, "activeInlines", []);
    __publicField(this, "lastCheckDate");
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new DaysLeftSettingTab(this.app, this));
    this.lastCheckDate = (0, import_obsidian.moment)().format("YYYY-MM-DD");
    this.app.workspace.onLayoutReady(() => {
      this.scanVaultForCountdowns();
    });
    this.registerInterval(window.setInterval(() => {
      const today = (0, import_obsidian.moment)().format("YYYY-MM-DD");
      if (this.lastCheckDate !== today) {
        this.lastCheckDate = today;
        this.notifiedSet.clear();
        this.scanVaultForCountdowns();
      }
    }, 60 * 1e3));
    this.addCommand({
      id: "insert-block",
      name: "Insert countdown block",
      editorCallback: (editor) => {
        const s = this.settings;
        const lines = ["```daysleft"];
        if (s.templateIncludeText) lines.push("text: ");
        if (s.templateIncludeTo) lines.push("to: YYYY-MM-DD");
        if (s.templateIncludeFrom) lines.push("from: YYYY-MM-DD");
        if (s.templateIncludeLanguage) lines.push("language: ");
        if (s.templateIncludeDayCounterColor) lines.push("dayCounterColor: ");
        if (s.templateIncludeDayCounterColorPast) lines.push("dayCounterColorPast: ");
        if (s.templateIncludeHideOnPast) lines.push("hideOnPast: ");
        if (s.templateIncludeShowDaysText) lines.push("showDaysText: ");
        if (s.templateIncludeTodayTomorrow) lines.push("todayTomorrow: ");
        if (s.templateIncludeShowFinalDate) lines.push("showFinalDate: ");
        if (s.templateIncludeFinalDateFormat) lines.push("finalDateFormat: ");
        if (s.templateIncludeSpotlightDays) lines.push("spotlightDays: ");
        if (s.templateIncludeSpotlightColor) lines.push("spotlightColor: ");
        if (s.templateIncludeSpotlightBold) lines.push("spotlightBold: ");
        if (s.templateIncludeSpotlightAlert) lines.push("spotlightAlert: ");
        if (s.templateIncludeSpotlightAlertDuration) lines.push("spotlightAlertDuration: ");
        lines.push("```");
        const placeholder = lines.join("\n") + "\n";
        const cursor = editor.getCursor();
        editor.replaceRange(placeholder, cursor);
        const toLineIndex = lines.findIndex((l) => l.startsWith("to:"));
        const fromLineIndex = lines.findIndex((l) => l.startsWith("from:"));
        if (toLineIndex !== -1) {
          editor.setSelection({ line: cursor.line + toLineIndex, ch: 4 }, { line: cursor.line + toLineIndex, ch: 14 });
        } else if (fromLineIndex !== -1) {
          editor.setSelection({ line: cursor.line + fromLineIndex, ch: 6 }, { line: cursor.line + fromLineIndex, ch: 16 });
        }
      }
    });
    this.registerMarkdownCodeBlockProcessor("daysleft", (source, el, ctx) => ctx.addChild(new DaysLeftBlock(el, source, this, ctx.sourcePath)));
    this.registerEditorExtension(buildInlineCountdownExtension(this));
    this.registerMarkdownPostProcessor((el, ctx) => {
      const codeBlocks = Array.from(el.querySelectorAll("code"));
      for (const codeEl of codeBlocks) {
        const text = codeEl.innerText.trim();
        if (text.startsWith("dl:")) {
          const dateStr = text.substring(3).trim();
          if (dateStr === "") continue;
          const span = document.createElement("span");
          codeEl.replaceWith(span);
          ctx.addChild(new DaysLeftInlineReading(span, dateStr, this, ctx.sourcePath));
        }
      }
    });
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
    this.refreshOpenViews();
  }
  refreshOpenViews() {
    this.activeBlocks.forEach((b) => b.render());
    this.activeInlines.forEach((i) => i.render());
  }
  parseConfig(source) {
    const local = {};
    source.split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx !== -1) {
        const key = line.substring(0, idx).trim();
        const val = line.substring(idx + 1).trim();
        local[key] = val;
      }
    });
    const getStr = (k, globalK) => local[k] !== void 0 && local[k] !== "" ? local[k] : String(this.settings[globalK]);
    const getBool = (k, globalK) => {
      if (local[k] !== void 0 && local[k] !== "") return local[k].toLowerCase() === "true";
      return Boolean(this.settings[globalK]);
    };
    const getNum = (k, globalK) => {
      if (local[k] !== void 0 && local[k] !== "") return parseInt(local[k]);
      return Number(this.settings[globalK]);
    };
    return {
      language: getStr("language", "language"),
      text: local["text"] || "",
      to: local["to"] || "",
      from: local["from"] || "",
      dayCounterColor: getStr("dayCounterColor", "dayCounterColor"),
      dayCounterColorPast: getStr("dayCounterColorPast", "dayCounterColorPast"),
      hideOnPast: getBool("hideOnPast", "hideOnPast"),
      showDaysText: getBool("showDaysText", "showDaysText"),
      todayTomorrow: getBool("todayTomorrow", "todayTomorrow"),
      showFinalDate: getBool("showFinalDate", "showFinalDate"),
      finalDateFormat: getStr("finalDateFormat", "finalDateFormat"),
      spotlightDays: getNum("spotlightDays", "spotlightDays"),
      spotlightColor: getStr("spotlightColor", "spotlightColor"),
      spotlightBold: getBool("spotlightBold", "spotlightBold"),
      spotlightAlert: getStr("spotlightAlert", "spotlightAlert"),
      spotlightAlertDuration: getNum("spotlightAlertDuration", "spotlightAlertDuration")
    };
  }
  createInlineSpan(dateStr, sourcePath) {
    const span = document.createElement("span");
    span.addClass("daysleft-inline");
    const config = this.parseConfig(`to: ${dateStr.trim()}`);
    const lang = i18n[config.language] || i18n["en"];
    const toDate = (0, import_obsidian.moment)(dateStr.trim());
    if (!dateStr || !toDate.isValid()) {
      renderMissingDateError(span, true, lang);
      return span;
    }
    const diffDays = toDate.diff((0, import_obsidian.moment)().startOf("day"), "days");
    if (diffDays < 0 && config.hideOnPast) {
      span.style.display = "none";
      return span;
    }
    const absDays = Math.abs(diffDays);
    span.textContent = config.todayTomorrow && diffDays === 0 ? lang.today.toLowerCase() : config.todayTomorrow && diffDays === 1 ? lang.tomorrow.toLowerCase() : config.todayTomorrow && diffDays === -1 ? lang.yesterday.toLowerCase() : config.showDaysText ? diffDays < 0 ? lang.past(absDays) : lang.future(absDays) : diffDays.toString();
    if (diffDays >= 0 && diffDays <= config.spotlightDays) {
      span.style.color = config.spotlightColor;
      if (config.spotlightBold) span.style.fontWeight = "bold";
    } else {
      span.style.color = diffDays < 0 ? config.dayCounterColorPast : config.dayCounterColor;
    }
    return span;
  }
  async scanVaultForCountdowns() {
    const files = this.app.vault.getMarkdownFiles();
    for (const file of files) {
      const content = await this.app.vault.cachedRead(file);
      const blockRegex = /```daysleft\n([\s\S]*?)```/g;
      let match;
      while ((match = blockRegex.exec(content)) !== null) this.checkAndTriggerFromScan(this.parseConfig(match[1]), file.path, "block");
      const inlineRegex = /`dl:([^`]+)?`/g;
      while ((match = inlineRegex.exec(content)) !== null) {
        const dateStr = match[1] ? match[1].trim() : "";
        if (dateStr !== "") this.checkAndTriggerFromScan(this.parseConfig(`to: ${dateStr}`), file.path, "inline");
      }
    }
  }
  checkAndTriggerFromScan(config, sourcePath, type) {
    if (config.from) return;
    const toDate = (0, import_obsidian.moment)(config.to);
    if (!config.to || !toDate.isValid()) return;
    const diffDays = toDate.diff((0, import_obsidian.moment)().startOf("day"), "days");
    if (diffDays < 0 && config.hideOnPast) return;
    if (!isNaN(config.spotlightDays) && diffDays >= 0 && diffDays <= config.spotlightDays && config.spotlightAlert !== "none") {
      const langCode = i18n[config.language] ? config.language : "en";
      triggerNotification(this, config.text, diffDays, config.spotlightAlert, `${type}-${sourcePath}-${config.to}-${config.text}-${diffDays}`, sourcePath, i18n[langCode], config.spotlightAlertDuration);
    }
  }
};
var DaysLeftSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    __publicField(this, "plugin");
    __publicField(this, "updateExampleFn", null);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const uiLangCode = this.plugin.settings.uiLanguage || "en";
    const t = settingsI18n[uiLangCode] || settingsI18n["en"];
    const style = document.createElement("style");
    style.innerHTML = `
            .dl-header-box { margin-bottom: 25px; border-bottom: 1px solid var(--background-modifier-border); padding-bottom: 15px; }
            .dl-title-header { margin: 0; color: var(--text-accent); font-weight: 800; font-size: 2.2em; }
            .dl-table { width: 100%; border-collapse: collapse; margin-top: 15px; border: 1px solid var(--background-modifier-border); border-radius: 6px; overflow: hidden; table-layout: fixed; }
            .dl-table th { background: var(--background-secondary-alt); padding: 12px; text-align: left; font-size: 0.8em; text-transform: uppercase; border-bottom: 2px solid var(--background-modifier-border); color: var(--text-muted); font-weight: bold; }
            .dl-table td { padding: 12px; border-bottom: 1px solid var(--background-modifier-border); vertical-align: middle; }
            .dl-table tr:hover { background: var(--background-primary-alt); }
            .dl-param-name { font-weight: bold; color: var(--text-normal); display: block; font-size: 0.95em; margin-bottom: 2px; }
            .dl-param-desc { font-size: 0.82em; color: var(--text-muted); line-height: 1.4; display: block; margin-bottom: 6px; }
            .dl-preview-code { font-family: var(--font-monospace); font-size: 0.8em; background: var(--background-secondary); padding: 4px 8px; border-radius: 4px; border: 1px solid var(--background-modifier-border); color: var(--text-accent); user-select: all; display: inline-block; margin-bottom: 2px; }
            .dl-center { text-align: center; display: flex; justify-content: center; align-items: center; height: 100%; }
            .dl-pre-box { background: var(--background-secondary); padding: 15px; border-radius: 8px; border: 1px solid var(--background-modifier-border); margin: 15px 0; border-left: 4px solid var(--text-success); min-height: 290px; display: flex; flex-direction: column; }
            .dl-example { font-size: 0.82em; color: var(--text-muted); margin-top: 5px; display: block; font-style: italic; }
        `;
    document.head.appendChild(style);
    const headerBox = containerEl.createDiv({ cls: "dl-header-box" });
    headerBox.createEl("h1", { text: "Days Left", cls: "dl-title-header" });
    containerEl.createEl("h2", { text: t.langTitle });
    new import_obsidian.Setting(containerEl).setName(t.uiLangName).setDesc(t.uiLangDesc).addDropdown(
      (d) => d.addOption("en", "English").addOption("pl", "Polski").addOption("es", "Espa\xF1ol").addOption("fr", "Fran\xE7ais").addOption("de", "Deutsch").addOption("ja", "\u65E5\u672C\u8A9E").addOption("uk", "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430").addOption("zh", "\u4E2D\u6587").setValue(this.plugin.settings.uiLanguage).onChange(async (v) => {
        this.plugin.settings.uiLanguage = v;
        await this.plugin.saveSettings();
        this.display();
      })
    );
    containerEl.createEl("hr");
    containerEl.createEl("h2", { text: t.instTitle });
    const info = containerEl.createDiv({ cls: "dl-pre-box" });
    info.createEl("p", { text: t.instTip, style: "margin: 0 0 10px 0; font-size: 0.85em;" });
    const previewEl = info.createEl("pre", { style: "margin: 0; color: var(--text-success); flex-grow: 1;" });
    const refreshPreview = () => {
      const s = this.plugin.settings;
      const previewLines = ["```daysleft"];
      if (s.templateIncludeText) previewLines.push("text: ");
      if (s.templateIncludeTo) previewLines.push(`to: YYYY-MM-DD`);
      if (s.templateIncludeFrom) previewLines.push(`from: YYYY-MM-DD`);
      if (s.templateIncludeLanguage) previewLines.push("language: ");
      if (s.templateIncludeDayCounterColor) previewLines.push("dayCounterColor: ");
      if (s.templateIncludeDayCounterColorPast) previewLines.push("dayCounterColorPast: ");
      if (s.templateIncludeHideOnPast) previewLines.push("hideOnPast: ");
      if (s.templateIncludeShowDaysText) previewLines.push("showDaysText: ");
      if (s.templateIncludeTodayTomorrow) previewLines.push("todayTomorrow: ");
      if (s.templateIncludeShowFinalDate) previewLines.push("showFinalDate: ");
      if (s.templateIncludeFinalDateFormat) previewLines.push("finalDateFormat: ");
      if (s.templateIncludeSpotlightDays) previewLines.push("spotlightDays: ");
      if (s.templateIncludeSpotlightColor) previewLines.push("spotlightColor: ");
      if (s.templateIncludeSpotlightBold) previewLines.push("spotlightBold: ");
      if (s.templateIncludeSpotlightAlert) previewLines.push("spotlightAlert: ");
      if (s.templateIncludeSpotlightAlertDuration) previewLines.push("spotlightAlertDuration: ");
      previewLines.push("```");
      previewEl.innerText = previewLines.join("\n");
    };
    refreshPreview();
    new import_obsidian.Setting(containerEl).setName(t.hotkeyBtn).addButton((b) => b.setButtonText("\u2699\uFE0F Hotkeys").onClick(() => {
      var _a;
      const tab = this.app.setting;
      tab.openTabById("hotkeys");
      if ((_a = tab.activeTab) == null ? void 0 : _a.searchComponent) {
        tab.activeTab.searchComponent.setValue("Days left");
        tab.activeTab.updateHotkeyVisibility();
      }
    }));
    containerEl.createEl("hr");
    const addRow = (parent, name, desc, key, type, tplKey, options) => {
      const tr = parent.createEl("tr");
      const td1 = tr.createEl("td", { style: "width: 50%; vertical-align: top;" });
      td1.createSpan({ text: name, cls: "dl-param-name" });
      const descSpan = td1.createSpan({ cls: "dl-param-desc" });
      if (desc.includes("{{link}}")) {
        const parts = desc.split("{{link}}");
        descSpan.appendText(parts[0]);
        descSpan.createEl("a", { text: "Moment.js", href: "https://momentjs.com/docs/#/displaying/format/", attr: { target: "_blank" } });
        descSpan.appendText(parts[1]);
      } else {
        descSpan.innerText = desc;
      }
      const codePreview = td1.createEl("code", { cls: "dl-preview-code" });
      const exampleDiv = td1.createSpan({ cls: "dl-example", style: "display: none;" });
      const updateRowVisuals = (val) => {
        if (type === "none") {
          codePreview.innerText = `${key}: `;
          exampleDiv.style.display = "none";
        } else {
          codePreview.innerText = `${key}: ${val}`;
          if (key === "finalDateFormat") {
            exampleDiv.style.display = "block";
            const egStr = t.eg || "e.g.";
            let l = this.plugin.settings.language;
            if (l === "uk") l = "uk";
            else if (l === "zh") l = "zh-cn";
            const exampleDate = (0, import_obsidian.moment)("2025-10-08").locale(l).format(val || "YYYY-MM-DD");
            exampleDiv.innerText = `${egStr} ${exampleDate}`;
            this.updateExampleFn = () => updateRowVisuals(val);
          } else {
            exampleDiv.style.display = "none";
          }
        }
        refreshPreview();
      };
      updateRowVisuals(type === "none" ? "" : this.plugin.settings[key]);
      const td2 = tr.createEl("td", { style: "width: 35%; vertical-align: top;" });
      if (type === "none") {
        td2.createSpan({ text: "-" });
      } else if (type === "text") {
        const input = new import_obsidian.TextComponent(td2).setValue(String(this.plugin.settings[key])).onChange(async (v) => {
          this.plugin.settings[key] = v;
          await this.plugin.saveSettings();
          updateRowVisuals(v);
        });
        input.inputEl.style.width = "100%";
      } else if (type === "color") {
        const wrapper = td2.createDiv({ style: "display: flex; gap: 8px; align-items: center;" });
        const input = new import_obsidian.TextComponent(wrapper).setValue(String(this.plugin.settings[key])).onChange(async (v) => {
          this.plugin.settings[key] = v;
          await this.plugin.saveSettings();
          if (/^#[0-9A-F]{6}$/i.test(v)) cp.value = v;
          updateRowVisuals(v);
        });
        input.inputEl.style.width = "100%";
        const cp = wrapper.createEl("input", { type: "color" });
        const initVal = String(this.plugin.settings[key]);
        if (/^#[0-9A-F]{6}$/i.test(initVal)) cp.value = initVal;
        else cp.value = "#000000";
        cp.onchange = async () => {
          input.setValue(cp.value);
          this.plugin.settings[key] = cp.value;
          await this.plugin.saveSettings();
          updateRowVisuals(cp.value);
        };
      } else if (type === "toggle") {
        new import_obsidian.ToggleComponent(td2).setValue(Boolean(this.plugin.settings[key])).onChange(async (v) => {
          this.plugin.settings[key] = v;
          await this.plugin.saveSettings();
          updateRowVisuals(v);
        });
      } else if (type === "dropdown") {
        const sel = td2.createEl("select", { cls: "dropdown" });
        Object.entries(options).forEach(([k, v]) => sel.createEl("option", { value: k, text: String(v) }));
        sel.value = String(this.plugin.settings[key]);
        sel.onchange = async () => {
          this.plugin.settings[key] = sel.value;
          await this.plugin.saveSettings();
          updateRowVisuals(sel.value);
          if (key === "language" && this.updateExampleFn) this.updateExampleFn();
        };
      }
      const td3 = tr.createEl("td", { style: "width: 15%; vertical-align: top;" });
      const centerDiv = td3.createDiv({ cls: "dl-center" });
      if (tplKey) {
        new import_obsidian.ToggleComponent(centerDiv).setValue(Boolean(this.plugin.settings[tplKey])).onChange(async (v) => {
          this.plugin.settings[tplKey] = v;
          await this.plugin.saveSettings();
          refreshPreview();
        });
      } else if (key === "text") {
        new import_obsidian.ToggleComponent(centerDiv).setValue(Boolean(this.plugin.settings.templateIncludeText)).onChange(async (v) => {
          this.plugin.settings.templateIncludeText = v;
          await this.plugin.saveSettings();
          refreshPreview();
        });
      } else if (key === "to") {
        new import_obsidian.ToggleComponent(centerDiv).setValue(Boolean(this.plugin.settings.templateIncludeTo)).onChange(async (v) => {
          this.plugin.settings.templateIncludeTo = v;
          await this.plugin.saveSettings();
          refreshPreview();
        });
      } else if (key === "from") {
        new import_obsidian.ToggleComponent(centerDiv).setValue(Boolean(this.plugin.settings.templateIncludeFrom)).onChange(async (v) => {
          this.plugin.settings.templateIncludeFrom = v;
          await this.plugin.saveSettings();
          refreshPreview();
        });
      }
    };
    containerEl.createEl("h2", { text: t.globTitle });
    const tableG = containerEl.createEl("table", { cls: "dl-table" });
    const theadG = tableG.createEl("thead");
    const hrG = theadG.createEl("tr");
    hrG.createEl("th", { text: t.tplHeaderParam });
    hrG.createEl("th", { text: t.tplHeaderValue });
    hrG.createEl("th", { text: t.tplHeaderShortcut, style: "text-align: center;" });
    const tbodyG = tableG.createEl("tbody");
    addRow(tbodyG, t.globDefText, t.globDefTextDesc, "text", "none", "templateIncludeText");
    addRow(tbodyG, t.globTo, t.globToDesc, "to", "none", "templateIncludeTo");
    addRow(tbodyG, t.globFrom, t.globFromDesc, "from", "none", "templateIncludeFrom");
    addRow(tbodyG, t.langName, t.langDesc, "language", "dropdown", "templateIncludeLanguage", { en: "English (en)", pl: "Polski (pl)", es: "Espa\xF1ol (es)", fr: "Fran\xE7ais (fr)", de: "Deutsch (de)", ja: "\u65E5\u672C\u8A9E (ja)", uk: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 (uk)", zh: "\u4E2D\u6587 (zh)" });
    addRow(tbodyG, t.globDefColor, t.globDefColorDesc, "dayCounterColor", "color", "templateIncludeDayCounterColor");
    addRow(tbodyG, t.globPastColor, t.globPastColorDesc, "dayCounterColorPast", "color", "templateIncludeDayCounterColorPast");
    addRow(tbodyG, t.globHideOnPast, t.globHideOnPastDesc, "hideOnPast", "toggle", "templateIncludeHideOnPast");
    addRow(tbodyG, t.globShowDaysText, t.globShowDaysTextDesc, "showDaysText", "toggle", "templateIncludeShowDaysText");
    addRow(tbodyG, t.globToday, t.globTodayDesc, "todayTomorrow", "toggle", "templateIncludeTodayTomorrow");
    addRow(tbodyG, t.globShowFinal, t.globShowFinalDesc, "showFinalDate", "toggle", "templateIncludeShowFinalDate");
    addRow(tbodyG, t.globFormat, t.globFormatDesc, "finalDateFormat", "text", "templateIncludeFinalDateFormat");
    containerEl.createEl("hr");
    containerEl.createEl("h2", { text: t.spotTitle });
    const tableS = containerEl.createEl("table", { cls: "dl-table", style: "margin-top: 0;" });
    const tbodyS = tableS.createEl("tbody");
    addRow(tbodyS, t.spotDays, t.spotDaysDesc, "spotlightDays", "text", "templateIncludeSpotlightDays");
    addRow(tbodyS, t.spotColor, t.spotColorDesc, "spotlightColor", "color", "templateIncludeSpotlightColor");
    addRow(tbodyS, t.spotBold, t.spotBoldDesc, "spotlightBold", "toggle", "templateIncludeSpotlightBold");
    containerEl.createEl("hr");
    containerEl.createEl("h2", { text: t.alertTitle });
    const tableA = containerEl.createEl("table", { cls: "dl-table", style: "margin-top: 0;" });
    const tbodyA = tableA.createEl("tbody");
    addRow(tbodyA, t.alertType, t.alertTypeDesc, "spotlightAlert", "dropdown", "templateIncludeSpotlightAlert", { none: "None", notice: "Notice", modal: "Modal" });
    addRow(tbodyA, t.alertDuration, t.alertDurationDesc, "spotlightAlertDuration", "text", "templateIncludeSpotlightAlertDuration");
    containerEl.createEl("hr");
    const footer = containerEl.createDiv({ style: "display: flex; justify-content: space-between; align-items: center; margin-top: 30px;" });
    new import_obsidian.Setting(footer).setName(t.resetTitle).addButton((b) => b.setButtonText(t.resetBtn).setWarning().onClick(() => {
      new ResetConfirmModal(this.app, t, async () => {
        this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS);
        await this.plugin.saveSettings();
        this.display();
      }).open();
    }));
    containerEl.createEl("hr");
    containerEl.createEl("h2", { text: t.supportTitle, style: "margin-top: 30px;" });
    const coffeeBox = containerEl.createDiv({ style: "text-align: center; margin-top: 25px; padding: 15px;" });
    coffeeBox.createEl("p", { text: t.supportDesc, style: "font-size: 0.9em; margin-bottom: 15px;" });
    coffeeBox.createEl("p", { text: "made with \u2764 by creesee", style: "font-style: italic; color: var(--text-muted); font-size: 0.9em; margin-bottom: 10px; margin-top: 0;" });
    const coffeeBtn = coffeeBox.createEl("button", { text: t.supportBtn });
    coffeeBtn.style.cssText = "background: #FFDD00; color: #000; font-weight: bold; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 0.95em;";
    coffeeBtn.onclick = () => window.open("https://buycoffee.to/creesee", "_blank");
  }
};
