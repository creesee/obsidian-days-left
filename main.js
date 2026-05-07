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

// WtyczkiKody/daysleft/main.ts
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
  "en": { today: "Today", tomorrow: "Tomorrow", yesterday: "Yesterday", past: (days) => `${days} ${days === 1 ? "day" : "days"} ago`, future: (days) => `${days} ${days === 1 ? "day" : "days"}`, missingDate: "Provide a target date (e.g. ", missingDateClose: ")", openNote: "Open note (Ctrl+click for new tab)", gotIt: "Got it", defaultEvent: "Upcoming event", notifHeader: "Notification!" },
  "pl": { today: "Dzisiaj", tomorrow: "Jutro", yesterday: "Wczoraj", past: (days) => `${days} ${days === 1 ? "dzie\u0144" : "dni"} temu`, future: (days) => `${days} ${days === 1 ? "dzie\u0144" : "dni"}`, missingDate: "Podaj dat\u0119 docelow\u0105 (np. ", missingDateClose: ")", openNote: "Otw\xF3rz notatk\u0119 (Ctrl+click dla nowej karty)", gotIt: "Zrozumia\u0142em", defaultEvent: "Wydarzenie", notifHeader: "Powiadomienie!" },
  "es": { today: "Hoy", tomorrow: "Ma\xF1ana", yesterday: "Ayer", past: (days) => `Hace ${days} ${days === 1 ? "d\xEDa" : "d\xEDas"}`, future: (days) => `${days} ${days === 1 ? "d\xEDa" : "d\xEDas"}`, missingDate: "Indica una fecha (ej. ", missingDateClose: ")", openNote: "Abrir nota (Ctrl+clic nueva pesta\xF1a)", gotIt: "Entendido", defaultEvent: "Pr\xF3ximo evento", notifHeader: "\xA1Notificaci\xF3n!" },
  "fr": { today: "Aujourd'hui", tomorrow: "Demain", yesterday: "Hier", past: (days) => `Il y a ${days} ${days <= 1 ? "jour" : "jours"}`, future: (days) => `${days} ${days <= 1 ? "jour" : "jours"}`, missingDate: "Indiquez la date (ex. ", missingDateClose: ")", openNote: "Ouvrir la note (Ctrl+clic nouvel onglet)", gotIt: "Compris", defaultEvent: "\xC9v\xE9nement \xE0 venir", notifHeader: "Notification !" },
  "de": { today: "Heute", tomorrow: "Morgen", yesterday: "Gestern", past: (days) => `Vor ${days} ${days === 1 ? "Tag" : "Tagen"}`, future: (days) => `${days} ${days === 1 ? "Tag" : "Tage"}`, missingDate: "Datum angeben (z.B. ", missingDateClose: ")", openNote: "Notiz \xF6ffnen (Strg+Klick f\xFCr neuen Tab)", gotIt: "Verstanden", defaultEvent: "Anstehendes Ereignis", notifHeader: "Benachrichtigung!" },
  "ja": { today: "\u4ECA\u65E5", tomorrow: "\u660E\u65E5", yesterday: "\u6628\u65E5", past: (days) => `${days}\u65E5\u524D`, future: (days) => `${days}\u65E5`, missingDate: "\u65E5\u4ED8\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\uFF08\u4F8B: ", missingDateClose: "\uFF09", openNote: "\u30CE\u30FC\u30C8\u3092\u958B\u304F (Ctrl+\u30AF\u30EA\u30C3\u30AF\u3067\u65B0\u3057\u3044\u30BF\u30D6)", gotIt: "\u4E86\u89E3", defaultEvent: "\u30A4\u30D9\u30F3\u30C8", notifHeader: "\u901A\u77E5\uFF01" },
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
  }, missingDate: "\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u0446\u0456\u043B\u044C\u043E\u0432\u0443 \u0434\u0430\u0442\u0443 (\u043D\u0430\u043F\u0440. ", missingDateClose: ")", openNote: "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043D\u043E\u0442\u0430\u0442\u043A\u0443 (Ctrl+\u043A\u043B\u0456\u043A \u0434\u043B\u044F \u043D\u043E\u0432\u043E\u0457 \u0432\u043A\u043B\u0430\u0434\u043A\u0438)", gotIt: "\u0417\u0440\u043E\u0437\u0443\u043C\u0456\u043B\u043E", defaultEvent: "\u041C\u0430\u0439\u0431\u0443\u0442\u043D\u044F \u043F\u043E\u0434\u0456\u044F", notifHeader: "\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F!" },
  "zh": { today: "\u4ECA\u5929", tomorrow: "\u660E\u5929", yesterday: "\u6628\u5929", past: (days) => `${days} \u5929\u524D`, future: (days) => `${days} \u5929`, missingDate: "\u63D0\u4F9B\u76EE\u6807\u65E5\u671F\uFF08\u4F8B\u5982\uFF1A", missingDateClose: "\uFF09", openNote: "\u6253\u5F00\u7B14\u8BB0 (Ctrl+\u70B9\u51FB\u5728\u65B0\u6807\u7B7E\u9875\u6253\u5F00)", gotIt: "\u77E5\u9053\u4E86", defaultEvent: "\u5373\u5C06\u5230\u6765\u7684\u4E8B\u4EF6", notifHeader: "\u901A\u77E5\uFF01" }
};
var settingsI18n = {
  "en": { langTitle: "Language", langName: "Select language", langDesc: "Changes the language of output texts.", instTitle: "Instructions", instTip: "Tip: Use commands to insert code blocks or inline tags quickly.", hotkeyBtn: "Configure hotkeys", globTitle: "Global configuration", globDefColor: "Default counter color", globDefColorDesc: "Color for future events.", globPastColor: "Past events color", globPastColorDesc: "Color for past events.", globHideOnPast: "Hide past events", globHideOnPastDesc: "true: removes the counter entirely. false: displays 'X days ago'.", globShowDaysText: "Show 'days' text", globShowDaysTextDesc: "true: '5 days'. false: just the number '5'.", globToday: "Use Today/Tomorrow text", globTodayDesc: "true: 'Today' / 'Tomorrow'. false: '0 days' / '1 day'.", globShowFinal: "Show final date", globShowFinalDesc: "true: shows the target date below the counter (code blocks only).", globFormat: "Final date format", globFormatDesc: "Date format styling. Example: 'YYYY-MM-DD' -> 2026-12-24.", momentLinkText: "Moment.js docs", spotTitle: "Spotlight mode", spotDays: "Spotlight threshold", spotDaysDesc: "Number of days before the event to apply highlight styling.", spotColor: "Spotlight color", spotColorDesc: "Color used when in spotlight zone.", spotBold: "Spotlight bold text", spotBoldDesc: "true: apply bold weight when in spotlight zone.", alertTitle: "Spotlight alerts", alertType: "Spotlight alert type", alertTypeDesc: "notice: popup. modal: large window. none: disabled.", alertNotice: "Notice", alertModal: "Modal", alertNone: "None", alertDuration: "Notice duration", alertDurationDesc: "Time in seconds before notice disappears (0 = stays until clicked).", resetTitle: "Reset settings", resetBtn: "Restore defaults", resetMsg: "Are you sure you want to restore all settings to their default values?", resetConfirm: "Yes, restore", resetCancel: "Cancel" },
  "pl": { langTitle: "J\u0119zyk", langName: "Wybierz j\u0119zyk", langDesc: "Zmienia j\u0119zyk wy\u015Bwietlanych tekst\xF3w.", instTitle: "Instrukcja", instTip: "Wskaz\xF3wka: U\u017Cywaj komend (Commands) dla szybkiego wstawiania blok\xF3w i tag\xF3w.", hotkeyBtn: "Konfiguruj skr\xF3ty", globTitle: "Konfiguracja globalna", globDefColor: "Standardowy kolor", globDefColorDesc: "Kolor dla przysz\u0142ych wydarze\u0144.", globPastColor: "Kolor przesz\u0142ych wydarze\u0144", globPastColorDesc: "Kolor dla minionych dat.", globHideOnPast: "Ukryj minione wydarzenia", globHideOnPastDesc: "true: ca\u0142kowicie ukrywa licznik. false: pokazuje 'X dni temu'.", globShowDaysText: "Pokazuj tekst 'dni'", globShowDaysTextDesc: "true: np. '5 dni'. false: wy\u015Bwietla samo '5'.", globToday: "U\u017Cywaj Dzi\u015B/Jutro", globTodayDesc: "true: 'Dzisiaj' / 'Jutro'. false: '0 dni' / '1 dzie\u0144'.", globShowFinal: "Pokazuj dat\u0119 ko\u0144cow\u0105", globShowFinalDesc: "true: wy\u015Bwietla dat\u0119 pod licznikiem (tylko w blokach kodu).", globFormat: "Format daty ko\u0144cowej", globFormatDesc: "Format wy\u015Bwietlania. Np.: 'YYYY-MM-DD' -> 2026-12-24.", momentLinkText: "Dokumentacja Moment.js", spotTitle: "Tryb Spotlight (Wyr\xF3\u017Cnienie)", spotDays: "Pr\xF3g Spotlight", spotDaysDesc: "Liczba dni przed wydarzeniem, od kt\xF3rej tekst zmienia wygl\u0105d.", spotColor: "Kolor Spotlight", spotColorDesc: "Kolor tekstu w strefie Spotlight.", spotBold: "Pogrubienie Spotlight", spotBoldDesc: "true: tekst w strefie Spotlight jest gruby.", alertTitle: "Powiadomienia Spotlight", alertType: "Typ powiadomienia", alertTypeDesc: "notice: dyskretny dymek. modal: du\u017Ce okno na \u015Brodku. none: brak.", alertNotice: "Dymek (Notice)", alertModal: "Okno (Modal)", alertNone: "Brak", alertDuration: "Czas trwania dymka (Notice)", alertDurationDesc: "Czas w sekundach (0 = nie znika do momentu klikni\u0119cia).", resetTitle: "Zresetuj ustawienia", resetBtn: "Przywr\xF3\u0107 domy\u015Blne", resetMsg: "Czy na pewno chcesz przywr\xF3ci\u0107 wszystkie ustawienia do warto\u015Bci domy\u015Blnych?", resetConfirm: "Tak, przywr\xF3\u0107", resetCancel: "Anuluj" },
  "es": { langTitle: "Idioma", langName: "Seleccionar idioma", langDesc: "Cambia el idioma de los textos.", instTitle: "Instrucciones", instTip: "Consejo: Usa comandos para insertar r\xE1pido.", hotkeyBtn: "Configurar atajos", globTitle: "Configuraci\xF3n global", globDefColor: "Color predeterminado", globDefColorDesc: "Eventos futuros.", globPastColor: "Color pasado", globPastColorDesc: "Eventos pasados.", globHideOnPast: "Ocultar eventos pasados", globHideOnPastDesc: "true: oculta. false: 'hace X d\xEDas'.", globShowDaysText: "Mostrar texto 'd\xEDas'", globShowDaysTextDesc: "true/false.", globToday: "Usar texto Hoy/Ma\xF1ana", globTodayDesc: "true/false.", globShowFinal: "Mostrar fecha final", globShowFinalDesc: "true/false.", globFormat: "Formato de fecha", globFormatDesc: "Ej: 'YYYY-MM-DD'.", momentLinkText: "Docs Moment.js", spotTitle: "Modo Spotlight", spotDays: "D\xEDas Spotlight", spotDaysDesc: "D\xEDas antes.", spotColor: "Color Spotlight", spotColorDesc: "Color.", spotBold: "Texto en negrita", spotBoldDesc: "true/false.", alertTitle: "Alertas Spotlight", alertType: "Tipo de alerta", alertTypeDesc: "notice / modal / none.", alertNotice: "Aviso", alertModal: "Ventana", alertNone: "Ninguno", alertDuration: "Duraci\xF3n del aviso", alertDurationDesc: "Segundos (0 = infinito).", resetTitle: "Restablecer ajustes", resetBtn: "Restaurar valores", resetMsg: "\xBFEst\xE1s seguro de restaurar los valores predeterminados?", resetConfirm: "S\xED, restaurar", resetCancel: "Cancelar" },
  "fr": { langTitle: "Langue", langName: "S\xE9lectionner la langue", langDesc: "Change la langue du texte.", instTitle: "Instructions", instTip: "Astuce: Utilisez les commandes.", hotkeyBtn: "Configurer les raccourcis", globTitle: "Configuration globale", globDefColor: "Couleur par d\xE9faut", globDefColorDesc: "\xC9v\xE9nements futurs.", globPastColor: "Couleur pass\xE9e", globPastColorDesc: "\xC9v\xE9nements pass\xE9s.", globHideOnPast: "Masquer les \xE9v\xE9nements pass\xE9s", globHideOnPastDesc: "true/false.", globShowDaysText: "Afficher le texte 'jours'", globShowDaysTextDesc: "true/false.", globToday: "Utiliser Aujourd'hui/Demain", globTodayDesc: "true/false.", globShowFinal: "Afficher la date de fin", globShowFinalDesc: "true/false.", globFormat: "Format de la date", globFormatDesc: "Ex: 'YYYY-MM-DD'.", momentLinkText: "Docs Moment.js", spotTitle: "Mode Spotlight", spotDays: "Seuil Spotlight", spotDaysDesc: "Jours avant.", spotColor: "Couleur Spotlight", spotColorDesc: "Couleur.", spotBold: "Texte en gras", spotBoldDesc: "true/false.", alertTitle: "Alertes Spotlight", alertType: "Type d'alerte", alertTypeDesc: "notice / modal / none.", alertNotice: "Notice", alertModal: "Modal", alertNone: "Aucun", alertDuration: "Dur\xE9e de la notice", alertDurationDesc: "Secondes.", resetTitle: "R\xE9initialiser les param\xE8tres", resetBtn: "Restaurer par d\xE9faut", resetMsg: "Voulez-vous vraiment restaurer les param\xE8tres par d\xE9faut ?", resetConfirm: "Oui", resetCancel: "Annuler" },
  "de": { langTitle: "Sprache", langName: "Sprache ausw\xE4hlen", langDesc: "Textsprache \xE4ndern.", instTitle: "Anleitung", instTip: "Tipp: Verwende Befehle.", hotkeyBtn: "Tastenk\xFCrzel konfigurieren", globTitle: "Globale Konfiguration", globDefColor: "Standardfarbe", globDefColorDesc: "Zuk\xFCnftige Ereignisse.", globPastColor: "Vergangene Farbe", globPastColorDesc: "Vergangene Ereignisse.", globHideOnPast: "Vergangene ausblenden", globHideOnPastDesc: "true/false.", globShowDaysText: "Tage-Text anzeigen", globShowDaysTextDesc: "true/false.", globToday: "Heute/Morgen verwenden", globTodayDesc: "true/false.", globShowFinal: "Enddatum anzeigen", globShowFinalDesc: "true/false.", globFormat: "Datumsformat", globFormatDesc: "Z.B.: 'YYYY-MM-DD'.", momentLinkText: "Moment.js Docs", spotTitle: "Spotlight-Modus", spotDays: "Spotlight-Tage", spotDaysDesc: "Tage vorher.", spotColor: "Spotlight-Farbe", spotColorDesc: "Farbe.", spotBold: "Fetter Text", spotBoldDesc: "true/false.", alertTitle: "Spotlight-Alarme", alertType: "Alarmtyp", alertTypeDesc: "notice / modal / none.", alertNotice: "Benachrichtigung", alertModal: "Fenster", alertNone: "Keiner", alertDuration: "Dauer", alertDurationDesc: "Sekunden.", resetTitle: "Einstellungen zur\xFCcksetzen", resetBtn: "Standardwerte", resetMsg: "Sind Sie sicher, dass Sie die Standardwerte wiederherstellen m\xF6chten?", resetConfirm: "Ja", resetCancel: "Abbrechen" },
  "ja": { langTitle: "\u8A00\u8A9E", langName: "\u8A00\u8A9E\u3092\u9078\u629E", langDesc: "\u30C6\u30AD\u30B9\u30C8\u306E\u8A00\u8A9E\u3092\u5909\u66F4\u3002", instTitle: "\u4F7F\u3044\u65B9", instTip: "\u30D2\u30F3\u30C8: \u30B3\u30DE\u30F3\u30C9\u3092\u4F7F\u7528\u3002", hotkeyBtn: "\u30DB\u30C3\u30C8\u30AD\u30FC\u8A2D\u5B9A", globTitle: "\u30B0\u30ED\u30FC\u30D0\u30EB\u8A2D\u5B9A", globDefColor: "\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u8272", globDefColorDesc: "\u672A\u6765\u306E\u30A4\u30D9\u30F3\u30C8\u3002", globPastColor: "\u904E\u53BB\u306E\u8272", globPastColorDesc: "\u904E\u53BB\u306E\u30A4\u30D9\u30F3\u30C8\u3002", globHideOnPast: "\u904E\u53BB\u306E\u30A4\u30D9\u30F3\u30C8\u3092\u96A0\u3059", globHideOnPastDesc: "true/false\u3002", globShowDaysText: "\u300C\u65E5\u300D\u30C6\u30AD\u30B9\u30C8\u3092\u8868\u793A", globShowDaysTextDesc: "true/false\u3002", globToday: "\u4ECA\u65E5/\u660E\u65E5\u3092\u4F7F\u7528", globTodayDesc: "true/false\u3002", globShowFinal: "\u7D42\u4E86\u65E5\u3092\u8868\u793A", globShowFinalDesc: "true/false\u3002", globFormat: "\u65E5\u4ED8\u30D5\u30A9\u30FC\u30DE\u30C3\u30C8", globFormatDesc: "\u4F8B: 'YYYY-MM-DD'\u3002", momentLinkText: "Moment.js \u30C9\u30AD\u30E5\u30E1\u30F3\u30C8", spotTitle: "Spotlight\u30E2\u30FC\u30C9", spotDays: "Spotlight\u306E\u3057\u304D\u3044\u5024", spotDaysDesc: "\u65E5\u6570\u3002", spotColor: "Spotlight\u306E\u8272", spotColorDesc: "\u8272\u3002", spotBold: "\u592A\u5B57\u306B\u3059\u308B", spotBoldDesc: "true/false\u3002", alertTitle: "Spotlight\u30A2\u30E9\u30FC\u30C8", alertType: "\u30A2\u30E9\u30FC\u30C8\u30BF\u30A4\u30D7", alertTypeDesc: "notice / modal / none\u3002", alertNotice: "\u901A\u77E5", alertModal: "\u30E2\u30FC\u30C0\u30EB", alertNone: "\u306A\u3057", alertDuration: "\u901A\u77E5\u306E\u8868\u793A\u6642\u9593", alertDurationDesc: "\u79D2\uFF080 = \u7121\u9650\uFF09\u3002", resetTitle: "\u8A2D\u5B9A\u3092\u30EA\u30BB\u30C3\u30C8", resetBtn: "\u30C7\u30D5\u30A9\u30EB\u30C8\u306B\u623B\u3059", resetMsg: "\u3059\u3079\u3066\u306E\u8A2D\u5B9A\u3092\u30C7\u30D5\u30A9\u30EB\u30C8\u306B\u623B\u3057\u3066\u3082\u3088\u308D\u3057\u3044\u3067\u3059\u304B\uFF1F", resetConfirm: "\u306F\u3044", resetCancel: "\u30AD\u30E3\u30F3\u30BB\u30EB" },
  "uk": { langTitle: "\u041C\u043E\u0432\u0430", langName: "\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044C \u043C\u043E\u0432\u0443", langDesc: "\u0417\u043C\u0456\u043D\u044E\u0454 \u043C\u043E\u0432\u0443 \u0442\u0435\u043A\u0441\u0442\u0456\u0432.", instTitle: "\u0406\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0456\u044F", instTip: "\u041F\u0456\u0434\u043A\u0430\u0437\u043A\u0430: \u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0439\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0438.", hotkeyBtn: "\u041D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u0442\u0438 \u0433\u0430\u0440\u044F\u0447\u0456 \u043A\u043B\u0430\u0432\u0456\u0448\u0456", globTitle: "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u0430 \u043A\u043E\u043D\u0444\u0456\u0433\u0443\u0440\u0430\u0446\u0456\u044F", globDefColor: "\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u0438\u0439 \u043A\u043E\u043B\u0456\u0440", globDefColorDesc: "\u041C\u0430\u0439\u0431\u0443\u0442\u043D\u0456 \u043F\u043E\u0434\u0456\u0457.", globPastColor: "\u041A\u043E\u043B\u0456\u0440 \u043C\u0438\u043D\u0443\u043B\u0438\u0445", globPastColorDesc: "\u041C\u0438\u043D\u0443\u043B\u0456 \u043F\u043E\u0434\u0456\u0457.", globHideOnPast: "\u041F\u0440\u0438\u0445\u043E\u0432\u0430\u0442\u0438 \u043C\u0438\u043D\u0443\u043B\u0456", globHideOnPastDesc: "true/false.", globShowDaysText: "\u041F\u043E\u043A\u0430\u0437\u0443\u0432\u0430\u0442\u0438 \u0442\u0435\u043A\u0441\u0442 '\u0434\u043D\u0456\u0432'", globShowDaysTextDesc: "true/false.", globToday: "\u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456", globTodayDesc: "true/false.", globShowFinal: "\u041F\u043E\u043A\u0430\u0437\u0443\u0432\u0430\u0442\u0438 \u043A\u0456\u043D\u0446\u0435\u0432\u0443 \u0434\u0430\u0442\u0443", globShowFinalDesc: "true/false.", globFormat: "\u0424\u043E\u0440\u043C\u0430\u0442 \u0434\u0430\u0442\u0438", globFormatDesc: "\u041D\u0430\u043F\u0440: 'YYYY-MM-DD'.", momentLinkText: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0456\u044F Moment.js", spotTitle: "\u0420\u0435\u0436\u0438\u043C Spotlight", spotDays: "\u041F\u043E\u0440\u0456\u0433 Spotlight", spotDaysDesc: "\u0414\u043D\u0456\u0432 \u0434\u043E.", spotColor: "\u041A\u043E\u043B\u0456\u0440 Spotlight", spotColorDesc: "\u041A\u043E\u043B\u0456\u0440.", spotBold: "\u0416\u0438\u0440\u043D\u0438\u0439 \u0442\u0435\u043A\u0441\u0442", spotBoldDesc: "true/false.", alertTitle: "\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F Spotlight", alertType: "\u0422\u0438\u043F \u0441\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F", alertTypeDesc: "notice / modal / none.", alertNotice: "\u041F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F", alertModal: "\u0412\u0456\u043A\u043D\u043E", alertNone: "\u041D\u0435\u043C\u0430\u0454", alertDuration: "\u0422\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F", alertDurationDesc: "\u0421\u0435\u043A\u0443\u043D\u0434\u0438.", resetTitle: "\u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F", resetBtn: "\u0412\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438 \u0437\u0430\u043C\u043E\u0432\u0447\u0443\u0432\u0430\u043D\u043D\u044F", resetMsg: "\u0412\u0438 \u0432\u043F\u0435\u0432\u043D\u0435\u043D\u0456, \u0449\u043E \u0445\u043E\u0447\u0435\u0442\u0435 \u0432\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438 \u0432\u0441\u0456 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0437\u0430 \u0437\u0430\u043C\u043E\u0432\u0447\u0443\u0432\u0430\u043D\u043D\u044F\u043C?", resetConfirm: "\u0422\u0430\u043A", resetCancel: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438" },
  "zh": { langTitle: "\u8BED\u8A00", langName: "\u9009\u62E9\u8BED\u8A00", langDesc: "\u66F4\u6539\u8F93\u51FA\u6587\u672C\u7684\u8BED\u8A00\u3002", instTitle: "\u8BF4\u660E", instTip: "\u63D0\u793A\uFF1A\u4F7F\u7528\u547D\u4EE4\u5FEB\u901F\u63D2\u5165\u4EE3\u7801\u5757\u3002", hotkeyBtn: "\u914D\u7F6E\u5FEB\u6377\u952E", globTitle: "\u5168\u5C40\u914D\u7F6E", globDefColor: "\u9ED8\u8BA4\u8BA1\u6570\u5668\u989C\u8272", globDefColorDesc: "\u672A\u6765\u4E8B\u4EF6\u7684\u989C\u8272\u3002", globPastColor: "\u8FC7\u53BB\u4E8B\u4EF6\u989C\u8272", globPastColorDesc: "\u8FC7\u53BB\u4E8B\u4EF6\u7684\u989C\u8272\u3002", globHideOnPast: "\u9690\u85CF\u8FC7\u53BB\u4E8B\u4EF6", globHideOnPastDesc: "true/false.", globShowDaysText: "\u663E\u793A\u201C\u5929\u201D\u6587\u672C", globShowDaysTextDesc: "true/false.", globToday: "\u4F7F\u7528\u4ECA\u5929/\u660E\u5929\u6587\u672C", globTodayDesc: "true/false.", globShowFinal: "\u663E\u793A\u6700\u7EC8\u65E5\u671F", globShowFinalDesc: "true/false.", globFormat: "\u6700\u7EC8\u65E5\u671F\u683C\u5F0F", globFormatDesc: "\u4F8B\u5982\uFF1A'YYYY-MM-DD'\u3002", momentLinkText: "Moment.js \u6587\u6863", spotTitle: "Spotlight \u6A21\u5F0F", spotDays: "Spotlight \u9608\u503C", spotDaysDesc: "\u4E8B\u4EF6\u53D1\u751F\u524D\u7684\u5929\u6570\u3002", spotColor: "Spotlight \u989C\u8272", spotColorDesc: "\u989C\u8272\u3002", spotBold: "\u52A0\u7C97\u6587\u672C", spotBoldDesc: "true/false.", alertTitle: "Spotlight \u8B66\u62A5", alertType: "\u8B66\u62A5\u7C7B\u578B", alertTypeDesc: "notice / modal / none.", alertNotice: "\u901A\u77E5", alertModal: "\u5F39\u7A97", alertNone: "\u65E0", alertDuration: "\u901A\u77E5\u6301\u7EED\u65F6\u95F4", alertDurationDesc: "\u79D2\u6570\uFF080 = \u4E00\u76F4\u663E\u793A\uFF09\u3002", resetTitle: "\u91CD\u7F6E\u8BBE\u7F6E", resetBtn: "\u6062\u590D\u9ED8\u8BA4\u503C", resetMsg: "\u60A8\u786E\u5B9A\u8981\u5C06\u6240\u6709\u8BBE\u7F6E\u6062\u590D\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F", resetConfirm: "\u662F\u7684\uFF0C\u6062\u590D", resetCancel: "\u53D6\u6D88" }
};
var DEFAULT_SETTINGS = {
  language: "en",
  dayCounterColor: "var(--text-normal)",
  dayCounterColorPast: "var(--text-faint)",
  hideOnPast: false,
  showDaysText: true,
  todayTomorrow: true,
  showFinalDate: true,
  finalDateFormat: "D MMMM YYYY | dddd",
  spotlightDays: "2",
  spotlightColor: "#af4b4b",
  spotlightBold: true,
  spotlightAlert: "none",
  spotlightAlertDuration: 30
};
function renderMissingDateError(container, suggestion, isInline, lang) {
  container.empty();
  container.addClass("daysleft-error");
  container.appendText(lang.missingDate);
  container.createEl("code", { text: isInline ? suggestion : `to: ${suggestion}` });
  container.appendText(lang.missingDateClose);
}
var pluginUpdateEffect = import_state.StateEffect.define();
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
    cancelBtn.addEventListener("click", () => this.close());
    const confirmBtn = btnRow.createEl("button", { text: this.langDict.resetConfirm });
    confirmBtn.style.color = "var(--text-error)";
    confirmBtn.style.borderColor = "var(--text-error)";
    confirmBtn.addEventListener("click", () => {
      this.onConfirm();
      this.close();
    });
  }
  onClose() {
    this.contentEl.empty();
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
    container.createDiv({ text: "Days left", cls: "daysleft-modal-subtitle" });
    container.createEl("h1", { text: this.lang.notifHeader, cls: "daysleft-modal-title" });
    container.createEl("h2", { text: this.title });
    container.createEl("p", { text: this.msg, cls: "daysleft-modal-message" });
    const btnRow = container.createDiv({ cls: "daysleft-modal-btn-row" });
    if (!this.isActive) {
      const noteBtn = btnRow.createEl("button", { text: this.lang.openNote });
      noteBtn.addEventListener("click", (e) => {
        const newLeaf = e.ctrlKey || e.metaKey;
        this.app.workspace.openLinkText(this.sourcePath, "", newLeaf);
        this.close();
      });
    }
    const okBtn = btnRow.createEl("button", { text: this.lang.gotIt });
    okBtn.addEventListener("click", () => this.close());
  }
  onClose() {
    this.contentEl.empty();
  }
};
function triggerNotification(plugin, text, diffDays, type, uniqueId, sourcePath, lang, durationSec) {
  if (plugin.notifiedSet.has(uniqueId)) return;
  plugin.notifiedSet.add(uniqueId);
  let msg = diffDays === 0 ? lang.today : diffDays < 0 ? lang.past(Math.abs(diffDays)) : lang.future(diffDays);
  const eventTitle = text || lang.defaultEvent;
  const activeFile = plugin.app.workspace.getActiveFile();
  const isActive = activeFile && activeFile.path === sourcePath;
  if (type === "modal") {
    new CountdownAlertModal(plugin.app, eventTitle, msg, sourcePath, lang, isActive).open();
  } else if (type === "notice") {
    const durationMs = durationSec === 0 ? 0 : durationSec * 1e3;
    const notice = new import_obsidian.Notice("", durationMs);
    notice.noticeEl.empty();
    const wrapper = notice.noticeEl.createDiv({ cls: "daysleft-notice-container" });
    wrapper.createDiv({ text: "Days left", cls: "daysleft-notice-subtitle" });
    wrapper.createDiv({ text: lang.notifHeader, cls: "daysleft-notice-title" });
    wrapper.createDiv({ text: eventTitle, cls: "daysleft-notice-event" });
    wrapper.createDiv({ text: msg });
    if (!isActive) {
      const link = wrapper.createDiv({ text: `\u{1F517} ${lang.openNote}`, cls: "daysleft-notice-link" });
      wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        const newLeaf = e.ctrlKey || e.metaKey;
        plugin.app.workspace.openLinkText(sourcePath, "", newLeaf);
        notice.hide();
      });
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
    const config = this.plugin.parseConfig(this.source);
    const langCode = i18n[config.language] ? config.language : "en";
    const lang = i18n[langCode];
    const toDate = (0, import_obsidian.moment)(config.to);
    if (!config.to || !toDate.isValid()) {
      const errDiv = this.containerEl.createDiv();
      errDiv.addClass("daysleft-block-container");
      renderMissingDateError(errDiv, (0, import_obsidian.moment)().add(7, "days").format("YYYY-MM-DD"), false, lang);
      return;
    }
    const diffDays = toDate.diff((0, import_obsidian.moment)().startOf("day"), "days");
    if (diffDays < 0 && config.hideOnPast) {
      this.containerEl.style.display = "none";
      return;
    } else {
      this.containerEl.style.display = "";
    }
    const container = this.containerEl.createDiv({ cls: "daysleft-block-container" });
    if (config.text) container.createDiv({ text: config.text, cls: "daysleft-block-text" });
    const absDays = Math.abs(diffDays);
    let displayValue = config.todayTomorrow && diffDays === 0 ? lang.today : config.todayTomorrow && diffDays === 1 ? lang.tomorrow : config.todayTomorrow && diffDays === -1 ? lang.yesterday : config.showDaysText ? diffDays < 0 ? lang.past(absDays) : lang.future(absDays) : diffDays.toString();
    const countEl = container.createDiv({ text: displayValue, cls: "daysleft-block-counter" });
    const spotlightDays = parseInt(config.spotlightDays);
    const isSpotlight = !isNaN(spotlightDays) && diffDays >= 0 && diffDays <= spotlightDays;
    if (isSpotlight) {
      countEl.style.color = config.spotlightColor;
      if (config.spotlightBold) countEl.style.fontWeight = "bold";
      if (config.spotlightAlert === "notice" || config.spotlightAlert === "modal") {
        const uniqueId = `block-${this.ctxPath}-${config.to}-${config.text}-${diffDays}`;
        let isActivelyEditing = false;
        const activeView = this.plugin.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (activeView && activeView.file && activeView.file.path === this.ctxPath) {
          isActivelyEditing = true;
        }
        if (isActivelyEditing) {
          this.plugin.notifiedSet.add(uniqueId);
        } else {
          triggerNotification(this.plugin, config.text, diffDays, config.spotlightAlert, uniqueId, this.ctxPath, lang, config.spotlightAlertDuration);
        }
      }
    } else {
      countEl.style.color = diffDays < 0 ? config.dayCounterColorPast : config.dayCounterColor;
    }
    if (config.showFinalDate && config.to) {
      const dateStr = toDate.locale(langCode === "uk" ? "uk" : langCode === "zh" ? "zh-cn" : langCode).format(config.finalDateFormat);
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
    const span = this.plugin.createInlineSpan(this.dateStr, this.sourcePath);
    this.containerEl.appendChild(span);
  }
};
var InlineCountdownWidget = class extends import_view.WidgetType {
  constructor(dateStr, plugin) {
    super();
    __publicField(this, "dateStr", dateStr);
    __publicField(this, "plugin", plugin);
  }
  eq(other) {
    return false;
  }
  toDOM(view) {
    const activeFile = this.plugin.app.workspace.getActiveFile();
    return this.plugin.createInlineSpan(this.dateStr, activeFile ? activeFile.path : "Unknown");
  }
};
function buildInlineCountdownExtension(plugin) {
  return import_view.ViewPlugin.fromClass(class {
    constructor(view) {
      __publicField(this, "decorations");
      this.decorations = this.buildDecorations(view);
    }
    update(update) {
      if (update.docChanged || update.viewportChanged || update.selectionSet || update.transactions.some((t) => t.effects.some((e) => e.is(pluginUpdateEffect)))) {
        this.decorations = this.buildDecorations(update.view);
      }
    }
    buildDecorations(view) {
      const builder = new import_state.RangeSetBuilder();
      const regex = /`dl:([^`]+)?`/g;
      for (let { from, to } of view.visibleRanges) {
        const text = view.state.doc.sliceString(from, to);
        let match;
        while ((match = regex.exec(text)) !== null) {
          const start = from + match.index;
          const end = start + match[0].length;
          let hasCursorInside = false;
          for (const range of view.state.selection.ranges) if (range.head >= start && range.head <= end) hasCursorInside = true;
          if (!hasCursorInside) builder.add(start, end, import_view.Decoration.replace({ widget: new InlineCountdownWidget(match[1] || "", plugin) }));
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
    __publicField(this, "lastCheckDate");
    __publicField(this, "activeBlocks", []);
    __publicField(this, "activeInlines", []);
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
      editorCallback: (editor, view) => {
        const placeholder = "```daysleft\ntext: Event description\nto: YYYY-MM-DD\n```\n";
        const cursor = editor.getCursor();
        editor.replaceRange(placeholder, cursor);
        editor.setSelection({ line: cursor.line + 2, ch: 4 }, { line: cursor.line + 2, ch: 14 });
      }
    });
    this.addCommand({
      id: "insert-inline",
      name: "Insert inline countdown",
      editorCallback: (editor, view) => {
        const placeholder = "`dl:YYYY-MM-DD`";
        const cursor = editor.getCursor();
        editor.replaceRange(placeholder, cursor);
        editor.setSelection({ line: cursor.line, ch: cursor.ch + 4 }, { line: cursor.line, ch: cursor.ch + 14 });
      }
    });
    this.registerEditorExtension(buildInlineCountdownExtension(this));
    this.registerMarkdownCodeBlockProcessor("daysleft", (source, el, ctx) => {
      ctx.addChild(new DaysLeftBlock(el, source, this, ctx.sourcePath));
    });
    this.registerMarkdownPostProcessor((el, ctx) => {
      const codeBlocks = Array.from(el.querySelectorAll("code"));
      for (const codeEl of codeBlocks) {
        const text = codeEl.innerText.trim();
        if (text.startsWith("dl:")) {
          const span = document.createElement("span");
          codeEl.replaceWith(span);
          const dateStr = text.substring(3).trim();
          ctx.addChild(new DaysLeftInlineReading(span, dateStr, this, ctx.sourcePath));
        }
      }
    });
  }
  createInlineSpan(dateStr, sourcePath) {
    var _a;
    const span = document.createElement("span");
    span.addClass("daysleft-inline");
    const config = this.parseConfig(`to: ${dateStr.trim()}`);
    const langCode = i18n[config.language] ? config.language : "en";
    const lang = i18n[langCode];
    const toDate = (0, import_obsidian.moment)(dateStr.trim());
    if (!dateStr || !toDate.isValid()) {
      renderMissingDateError(span, (0, import_obsidian.moment)().add(7, "days").format("YYYY-MM-DD"), true, lang);
      return span;
    }
    const diffDays = toDate.diff((0, import_obsidian.moment)().startOf("day"), "days");
    if (diffDays < 0 && config.hideOnPast) {
      span.style.display = "none";
      return span;
    } else {
      span.style.display = "";
    }
    const absDays = Math.abs(diffDays);
    span.textContent = config.todayTomorrow && diffDays === 0 ? lang.today.toLowerCase() : config.todayTomorrow && diffDays === 1 ? lang.tomorrow.toLowerCase() : config.todayTomorrow && diffDays === -1 ? lang.yesterday.toLowerCase() : config.showDaysText ? diffDays < 0 ? lang.past(absDays) : lang.future(absDays) : diffDays.toString();
    const spotlightDays = parseInt(config.spotlightDays);
    const isSpotlight = !isNaN(spotlightDays) && diffDays >= 0 && diffDays <= spotlightDays;
    if (isSpotlight) {
      span.style.color = config.spotlightColor;
      if (config.spotlightBold) span.style.fontWeight = "bold";
      if (config.spotlightAlert === "notice" || config.spotlightAlert === "modal") {
        const uniqueId = `inline-${sourcePath}-${config.to}-${diffDays}`;
        if (((_a = this.app.workspace.getActiveFile()) == null ? void 0 : _a.path) === sourcePath) {
          this.notifiedSet.add(uniqueId);
        } else {
          triggerNotification(this, "", diffDays, config.spotlightAlert, uniqueId, sourcePath, lang, config.spotlightAlertDuration);
        }
      }
    } else {
      span.style.color = diffDays < 0 ? config.dayCounterColorPast : config.dayCounterColor;
      span.style.fontWeight = "normal";
    }
    return span;
  }
  parseConfig(source) {
    const localParams = {};
    source.split("\n").forEach((line) => {
      const parts = line.split(":");
      if (parts.length >= 2) localParams[parts[0].trim()] = parts.slice(1).join(":").trim();
    });
    const getVal = (key) => localParams[key] !== void 0 && localParams[key] !== "" ? localParams[key] : this.settings[key];
    return {
      language: String(getVal("language")),
      text: localParams["text"] || "",
      to: localParams["to"] || "",
      from: localParams["from"] || "{today}",
      dayCounterColor: String(getVal("dayCounterColor")),
      dayCounterColorPast: String(getVal("dayCounterColorPast")),
      hideOnPast: String(getVal("hideOnPast")).toLowerCase() === "true",
      showDaysText: String(getVal("showDaysText")).toLowerCase() === "true",
      todayTomorrow: String(getVal("todayTomorrow")).toLowerCase() === "true",
      showFinalDate: String(getVal("showFinalDate")).toLowerCase() === "true",
      finalDateFormat: String(getVal("finalDateFormat")),
      spotlightDays: parseInt(String(getVal("spotlightDays"))),
      spotlightColor: String(getVal("spotlightColor")),
      spotlightBold: String(getVal("spotlightBold")).toLowerCase() === "true",
      spotlightAlert: String(getVal("spotlightAlert")).toLowerCase(),
      spotlightAlertDuration: parseInt(String(getVal("spotlightAlertDuration")))
    };
  }
  async scanVaultForCountdowns() {
    const files = this.app.vault.getMarkdownFiles();
    for (const file of files) {
      const content = await this.app.vault.cachedRead(file);
      const blockRegex = /```daysleft\n([\s\S]*?)```/g;
      let match;
      while ((match = blockRegex.exec(content)) !== null) this.checkAndTriggerFromScan(this.parseConfig(match[1]), file.path, "block");
      const inlineRegex = /`dl:([^`]+)?`/g;
      while ((match = inlineRegex.exec(content)) !== null) this.checkAndTriggerFromScan(this.parseConfig(`to: ${match[1] || ""}`), file.path, "inline");
    }
  }
  checkAndTriggerFromScan(config, sourcePath, type) {
    const toDate = (0, import_obsidian.moment)(config.to);
    if (!config.to || !toDate.isValid()) return;
    const diffDays = toDate.diff(config.from === "{today}" ? (0, import_obsidian.moment)().startOf("day") : (0, import_obsidian.moment)(config.from), "days");
    if (diffDays < 0 && config.hideOnPast) return;
    if (!isNaN(parseInt(config.spotlightDays)) && diffDays >= 0 && diffDays <= parseInt(config.spotlightDays) && (config.spotlightAlert === "notice" || config.spotlightAlert === "modal")) {
      const langCode = i18n[config.language] ? config.language : "en";
      triggerNotification(this, config.text, diffDays, config.spotlightAlert, `${type}-${sourcePath}-${config.to}-${config.text}-${diffDays}`, sourcePath, i18n[langCode], config.spotlightAlertDuration);
    }
  }
  refreshOpenViews() {
    this.activeBlocks.forEach((b) => b.render());
    this.activeInlines.forEach((i) => i.render());
    this.app.workspace.iterateAllLeaves((leaf) => {
      if (leaf.view instanceof import_obsidian.MarkdownView) {
        const editor = leaf.view.editor;
        if (editor.cm) {
          editor.cm.dispatch({ effects: pluginUpdateEffect.of(null) });
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
};
var DaysLeftSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    __publicField(this, "plugin");
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const langCode = settingsI18n[this.plugin.settings.language] ? this.plugin.settings.language : "en";
    const t = settingsI18n[langCode] || settingsI18n["en"];
    const makeSelectable = (setting) => {
      setting.nameEl.style.userSelect = "text";
      setting.nameEl.style.webkitUserSelect = "text";
      setting.descEl.style.userSelect = "text";
      setting.descEl.style.webkitUserSelect = "text";
      return setting;
    };
    const createDesc = (paramName, paramValue, descContent) => {
      const frag = document.createDocumentFragment();
      const descContainer = frag.createDiv({ style: "margin-bottom: 6px; opacity: 0.9;" });
      if (typeof descContent === "string") descContainer.innerText = descContent;
      else descContainer.appendChild(descContent);
      const paramContainer = frag.createDiv({ style: "font-size: 0.9em; color: var(--text-muted);" });
      paramContainer.appendText("Parameter: ");
      paramContainer.createEl("code", { text: `${paramName}: ${paramValue}` });
      return frag;
    };
    const bindSetting = (container, name, paramName, descText, type, options) => {
      const s = new import_obsidian.Setting(container).setName(name);
      makeSelectable(s);
      const getDescContent = () => {
        let content = descText;
        if (paramName === "finalDateFormat") {
          const frag = document.createDocumentFragment();
          frag.appendText(descText + " ");
          frag.createEl("a", {
            text: t.momentLinkText || "Moment.js docs",
            href: "https://momentjs.com/docs/#/displaying/format/",
            attr: { target: "_blank" }
            // Wymusza otwarcie w domyślnej przeglądarce internetowej
          });
          content = frag;
        }
        return content;
      };
      s.setDesc(createDesc(paramName, this.plugin.settings[paramName], getDescContent()));
      if (type === "text") {
        s.addText((textEl) => textEl.setValue(String(this.plugin.settings[paramName])).onChange(async (v) => {
          this.plugin.settings[paramName] = paramName === "spotlightAlertDuration" ? isNaN(parseInt(v)) ? 30 : parseInt(v) : v;
          await this.plugin.saveSettings();
          s.setDesc(createDesc(paramName, this.plugin.settings[paramName], getDescContent()));
        }));
      } else if (type === "color") {
        let textComponent;
        s.addText((textEl) => {
          textComponent = textEl;
          textEl.setValue(String(this.plugin.settings[paramName])).onChange(async (v) => {
            this.plugin.settings[paramName] = v;
            await this.plugin.saveSettings();
            s.setDesc(createDesc(paramName, v, getDescContent()));
          });
        });
        s.addColorPicker((colorPicker) => colorPicker.setValue(String(this.plugin.settings[paramName])).onChange(async (v) => {
          this.plugin.settings[paramName] = v;
          await this.plugin.saveSettings();
          s.setDesc(createDesc(paramName, v, getDescContent()));
          textComponent.setValue(v);
        }));
      } else if (type === "toggle") {
        s.addToggle((toggleEl) => toggleEl.setValue(Boolean(this.plugin.settings[paramName])).onChange(async (v) => {
          this.plugin.settings[paramName] = v;
          await this.plugin.saveSettings();
          s.setDesc(createDesc(paramName, v, getDescContent()));
        }));
      } else if (type === "dropdown" && options) {
        s.addDropdown((d) => {
          for (const [key, val] of Object.entries(options)) d.addOption(key, val);
          d.setValue(String(this.plugin.settings[paramName])).onChange(async (v) => {
            this.plugin.settings[paramName] = v;
            await this.plugin.saveSettings();
            s.setDesc(createDesc(paramName, v, getDescContent()));
          });
        });
      }
    };
    containerEl.createEl("h2", { text: t.langTitle });
    const langSetting = new import_obsidian.Setting(containerEl).setName(t.langName);
    makeSelectable(langSetting);
    langSetting.setDesc(createDesc("language", this.plugin.settings.language, t.langDesc));
    langSetting.addDropdown(
      (d) => d.addOption("en", "English (en)").addOption("pl", "Polski (pl)").addOption("es", "Espa\xF1ol (es)").addOption("fr", "Fran\xE7ais (fr)").addOption("de", "Deutsch (de)").addOption("ja", "\u65E5\u672C\u8A9E (ja)").addOption("uk", "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430 (uk)").addOption("zh", "\u4E2D\u6587 (zh)").setValue(this.plugin.settings.language).onChange(async (v) => {
        this.plugin.settings.language = v;
        await this.plugin.saveSettings();
        this.display();
      })
    );
    containerEl.createEl("h2", { text: t.instTitle });
    new import_obsidian.Setting(containerEl).setName(t.hotkeyBtn).setDesc("Open hotkeys configuration for Days left commands.").addButton(
      (btn) => btn.setButtonText("\u2699\uFE0F Hotkeys").onClick(() => {
        try {
          const settingTab = this.app.setting;
          settingTab.openTabById("hotkeys");
          const tab = settingTab.activeTab;
          if (tab && tab.searchComponent) {
            tab.searchComponent.setValue("Days left");
            tab.updateHotkeyVisibility();
          }
        } catch (e) {
          new import_obsidian.Notice("Open Settings and navigate to Hotkeys, then search for 'Days left'.");
        }
      })
    );
    const info = containerEl.createDiv({ cls: "daysleft-settings-info" });
    info.createEl("p", { text: t.instTip });
    info.createEl("pre", { text: "```daysleft\ntext: Upcoming trip\nto: 2026-12-24\n```", cls: "daysleft-settings-pre" });
    info.createEl("pre", { text: "`dl:2026-12-24`", cls: "daysleft-settings-pre" });
    containerEl.createEl("h2", { text: t.globTitle });
    bindSetting(containerEl, t.globDefColor, "dayCounterColor", t.globDefColorDesc, "color");
    bindSetting(containerEl, t.globPastColor, "dayCounterColorPast", t.globPastColorDesc, "color");
    bindSetting(containerEl, t.globHideOnPast, "hideOnPast", t.globHideOnPastDesc, "toggle");
    bindSetting(containerEl, t.globShowDaysText, "showDaysText", t.globShowDaysTextDesc, "toggle");
    bindSetting(containerEl, t.globToday, "todayTomorrow", t.globTodayDesc, "toggle");
    bindSetting(containerEl, t.globShowFinal, "showFinalDate", t.globShowFinalDesc, "toggle");
    bindSetting(containerEl, t.globFormat, "finalDateFormat", t.globFormatDesc, "text");
    containerEl.createEl("h2", { text: t.spotTitle });
    bindSetting(containerEl, t.spotDays, "spotlightDays", t.spotDaysDesc, "text");
    bindSetting(containerEl, t.spotColor, "spotlightColor", t.spotColorDesc, "color");
    bindSetting(containerEl, t.spotBold, "spotlightBold", t.spotBoldDesc, "toggle");
    containerEl.createEl("h2", { text: t.alertTitle });
    bindSetting(containerEl, t.alertType, "spotlightAlert", t.alertTypeDesc, "dropdown", { "none": t.alertNone, "notice": t.alertNotice, "modal": t.alertModal });
    bindSetting(containerEl, t.alertDuration, "spotlightAlertDuration", t.alertDurationDesc, "text");
    containerEl.createEl("h2", { text: t.resetTitle });
    new import_obsidian.Setting(containerEl).setName(t.resetBtn).addButton(
      (btn) => btn.setButtonText(t.resetBtn).setWarning().onClick(() => {
        new ResetConfirmModal(this.app, t, async () => {
          this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS);
          await this.plugin.saveSettings();
          this.display();
        }).open();
      })
    );
  }
};
