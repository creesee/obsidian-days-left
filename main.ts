import { Plugin, PluginSettingTab, App, Setting, moment, Editor, MarkdownView, Notice, Modal, TextComponent, MarkdownRenderChild } from 'obsidian';
import { EditorView, WidgetType, Decoration, DecorationSet, ViewPlugin, ViewUpdate } from "@codemirror/view";
import { RangeSetBuilder, StateEffect } from "@codemirror/state";

// ==========================================================
// 1. SŁOWNIKI TŁUMACZEŃ (i18n)
// ==========================================================
const i18n: Record<string, any> = {
    "en": { today: "Today", tomorrow: "Tomorrow", yesterday: "Yesterday", past: (days: number) => `${days} ${days === 1 ? "day" : "days"} ago`, future: (days: number) => `${days} ${days === 1 ? "day" : "days"}`, missingDate: "Provide a target date (e.g. ", missingDateClose: ")", openNote: "Open note (Ctrl+click for new tab)", gotIt: "Got it", defaultEvent: "Upcoming event", notifHeader: "Notification!" },
    "pl": { today: "Dzisiaj", tomorrow: "Jutro", yesterday: "Wczoraj", past: (days: number) => `${days} ${days === 1 ? "dzień" : "dni"} temu`, future: (days: number) => `${days} ${days === 1 ? "dzień" : "dni"}`, missingDate: "Podaj datę docelową (np. ", missingDateClose: ")", openNote: "Otwórz notatkę (Ctrl+click dla nowej karty)", gotIt: "Zrozumiałem", defaultEvent: "Wydarzenie", notifHeader: "Powiadomienie!" },
    "es": { today: "Hoy", tomorrow: "Mañana", yesterday: "Ayer", past: (days: number) => `Hace ${days} ${days === 1 ? "día" : "días"}`, future: (days: number) => `${days} ${days === 1 ? "día" : "días"}`, missingDate: "Indica una fecha (ej. ", missingDateClose: ")", openNote: "Abrir nota (Ctrl+clic nueva pestaña)", gotIt: "Entendido", defaultEvent: "Próximo evento", notifHeader: "¡Notificación!" },
    "fr": { today: "Aujourd'hui", tomorrow: "Demain", yesterday: "Hier", past: (days: number) => `Il y a ${days} ${days <= 1 ? "jour" : "jours"}`, future: (days: number) => `${days} ${days <= 1 ? "jour" : "jours"}`, missingDate: "Indiquez la date (ex. ", missingDateClose: ")", openNote: "Ouvrir la note (Ctrl+clic nouvel onglet)", gotIt: "Compris", defaultEvent: "Événement à venir", notifHeader: "Notification !" },
    "de": { today: "Heute", tomorrow: "Morgen", yesterday: "Gestern", past: (days: number) => `Vor ${days} ${days === 1 ? "Tag" : "Tagen"}`, future: (days: number) => `${days} ${days === 1 ? "Tag" : "Tage"}`, missingDate: "Datum angeben (z.B. ", missingDateClose: ")", openNote: "Notiz öffnen (Strg+Klick für neuen Tab)", gotIt: "Verstanden", defaultEvent: "Anstehendes Ereignis", notifHeader: "Benachrichtigung!" },
    "ja": { today: "今日", tomorrow: "明日", yesterday: "昨日", past: (days: number) => `${days}日前`, future: (days: number) => `${days}日`, missingDate: "日付を指定してください（例: ", missingDateClose: "）", openNote: "ノートを開く (Ctrl+クリックで新しいタブ)", gotIt: "了解", defaultEvent: "イベント", notifHeader: "通知！" },
    "uk": { today: "Сьогодні", tomorrow: "Завтра", yesterday: "Вчора", past: (days: number) => { let noun = "днів"; if (days % 10 === 1 && days % 100 !== 11) noun = "день"; else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) noun = "дні"; return `${days} ${noun} тому`; }, future: (days: number) => { let noun = "днів"; if (days % 10 === 1 && days % 100 !== 11) noun = "день"; else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) noun = "дні"; return `${days} ${noun}`; }, missingDate: "Вкажіть цільову дату (напр. ", missingDateClose: ")", openNote: "Відкрити нотатку (Ctrl+клік для нової вкладки)", gotIt: "Зрозуміло", defaultEvent: "Майбутня подія", notifHeader: "Сповіщення!" },
    "zh": { today: "今天", tomorrow: "明天", yesterday: "昨天", past: (days: number) => `${days} 天前`, future: (days: number) => `${days} 天`, missingDate: "提供目标日期（例如：", missingDateClose: "）", openNote: "打开笔记 (Ctrl+点击在新标签页打开)", gotIt: "知道了", defaultEvent: "即将到来的事件", notifHeader: "通知！" }
};

const settingsI18n: Record<string, any> = {
    "en": { langTitle: "Language", langName: "Select language", langDesc: "Changes the language of output texts.", instTitle: "Instructions", instTip: "Tip: Use commands to insert code blocks or inline tags quickly.", hotkeyBtn: "Configure hotkeys", globTitle: "Global configuration", globDefColor: "Default counter color", globDefColorDesc: "Color for future events.", globPastColor: "Past events color", globPastColorDesc: "Color for past events.", globHideOnPast: "Hide past events", globHideOnPastDesc: "true: removes the counter entirely. false: displays 'X days ago'.", globShowDaysText: "Show 'days' text", globShowDaysTextDesc: "true: '5 days'. false: just the number '5'.", globToday: "Use Today/Tomorrow text", globTodayDesc: "true: 'Today' / 'Tomorrow'. false: '0 days' / '1 day'.", globShowFinal: "Show final date", globShowFinalDesc: "true: shows the target date below the counter (code blocks only).", globFormat: "Final date format", globFormatDesc: "Date format styling. Example: 'YYYY-MM-DD' -> 2026-12-24.", momentLinkText: "Moment.js docs", spotTitle: "Spotlight mode", spotDays: "Spotlight threshold", spotDaysDesc: "Number of days before the event to apply highlight styling.", spotColor: "Spotlight color", spotColorDesc: "Color used when in spotlight zone.", spotBold: "Spotlight bold text", spotBoldDesc: "true: apply bold weight when in spotlight zone.", alertTitle: "Spotlight alerts", alertType: "Spotlight alert type", alertTypeDesc: "notice: popup. modal: large window. none: disabled.", alertNotice: "Notice", alertModal: "Modal", alertNone: "None", alertDuration: "Notice duration", alertDurationDesc: "Time in seconds before notice disappears (0 = stays until clicked).", resetTitle: "Reset settings", resetBtn: "Restore defaults", resetMsg: "Are you sure you want to restore all settings to their default values?", resetConfirm: "Yes, restore", resetCancel: "Cancel" },
    "pl": { langTitle: "Język", langName: "Wybierz język", langDesc: "Zmienia język wyświetlanych tekstów.", instTitle: "Instrukcja", instTip: "Wskazówka: Używaj komend (Commands) dla szybkiego wstawiania bloków i tagów.", hotkeyBtn: "Konfiguruj skróty", globTitle: "Konfiguracja globalna", globDefColor: "Standardowy kolor", globDefColorDesc: "Kolor dla przyszłych wydarzeń.", globPastColor: "Kolor przeszłych wydarzeń", globPastColorDesc: "Kolor dla minionych dat.", globHideOnPast: "Ukryj minione wydarzenia", globHideOnPastDesc: "true: całkowicie ukrywa licznik. false: pokazuje 'X dni temu'.", globShowDaysText: "Pokazuj tekst 'dni'", globShowDaysTextDesc: "true: np. '5 dni'. false: wyświetla samo '5'.", globToday: "Używaj Dziś/Jutro", globTodayDesc: "true: 'Dzisiaj' / 'Jutro'. false: '0 dni' / '1 dzień'.", globShowFinal: "Pokazuj datę końcową", globShowFinalDesc: "true: wyświetla datę pod licznikiem (tylko w blokach kodu).", globFormat: "Format daty końcowej", globFormatDesc: "Format wyświetlania. Np.: 'YYYY-MM-DD' -> 2026-12-24.", momentLinkText: "Dokumentacja Moment.js", spotTitle: "Tryb Spotlight (Wyróżnienie)", spotDays: "Próg Spotlight", spotDaysDesc: "Liczba dni przed wydarzeniem, od której tekst zmienia wygląd.", spotColor: "Kolor Spotlight", spotColorDesc: "Kolor tekstu w strefie Spotlight.", spotBold: "Pogrubienie Spotlight", spotBoldDesc: "true: tekst w strefie Spotlight jest gruby.", alertTitle: "Powiadomienia Spotlight", alertType: "Typ powiadomienia", alertTypeDesc: "notice: dyskretny dymek. modal: duże okno na środku. none: brak.", alertNotice: "Dymek (Notice)", alertModal: "Okno (Modal)", alertNone: "Brak", alertDuration: "Czas trwania dymka (Notice)", alertDurationDesc: "Czas w sekundach (0 = nie znika do momentu kliknięcia).", resetTitle: "Zresetuj ustawienia", resetBtn: "Przywróć domyślne", resetMsg: "Czy na pewno chcesz przywrócić wszystkie ustawienia do wartości domyślnych?", resetConfirm: "Tak, przywróć", resetCancel: "Anuluj" },
    "es": { langTitle: "Idioma", langName: "Seleccionar idioma", langDesc: "Cambia el idioma de los textos.", instTitle: "Instrucciones", instTip: "Consejo: Usa comandos para insertar rápido.", hotkeyBtn: "Configurar atajos", globTitle: "Configuración global", globDefColor: "Color predeterminado", globDefColorDesc: "Eventos futuros.", globPastColor: "Color pasado", globPastColorDesc: "Eventos pasados.", globHideOnPast: "Ocultar eventos pasados", globHideOnPastDesc: "true: oculta. false: 'hace X días'.", globShowDaysText: "Mostrar texto 'días'", globShowDaysTextDesc: "true/false.", globToday: "Usar texto Hoy/Mañana", globTodayDesc: "true/false.", globShowFinal: "Mostrar fecha final", globShowFinalDesc: "true/false.", globFormat: "Formato de fecha", globFormatDesc: "Ej: 'YYYY-MM-DD'.", momentLinkText: "Docs Moment.js", spotTitle: "Modo Spotlight", spotDays: "Días Spotlight", spotDaysDesc: "Días antes.", spotColor: "Color Spotlight", spotColorDesc: "Color.", spotBold: "Texto en negrita", spotBoldDesc: "true/false.", alertTitle: "Alertas Spotlight", alertType: "Tipo de alerta", alertTypeDesc: "notice / modal / none.", alertNotice: "Aviso", alertModal: "Ventana", alertNone: "Ninguno", alertDuration: "Duración del aviso", alertDurationDesc: "Segundos (0 = infinito).", resetTitle: "Restablecer ajustes", resetBtn: "Restaurar valores", resetMsg: "¿Estás seguro de restaurar los valores predeterminados?", resetConfirm: "Sí, restaurar", resetCancel: "Cancelar" },
    "fr": { langTitle: "Langue", langName: "Sélectionner la langue", langDesc: "Change la langue du texte.", instTitle: "Instructions", instTip: "Astuce: Utilisez les commandes.", hotkeyBtn: "Configurer les raccourcis", globTitle: "Configuration globale", globDefColor: "Couleur par défaut", globDefColorDesc: "Événements futurs.", globPastColor: "Couleur passée", globPastColorDesc: "Événements passés.", globHideOnPast: "Masquer les événements passés", globHideOnPastDesc: "true/false.", globShowDaysText: "Afficher le texte 'jours'", globShowDaysTextDesc: "true/false.", globToday: "Utiliser Aujourd'hui/Demain", globTodayDesc: "true/false.", globShowFinal: "Afficher la date de fin", globShowFinalDesc: "true/false.", globFormat: "Format de la date", globFormatDesc: "Ex: 'YYYY-MM-DD'.", momentLinkText: "Docs Moment.js", spotTitle: "Mode Spotlight", spotDays: "Seuil Spotlight", spotDaysDesc: "Jours avant.", spotColor: "Couleur Spotlight", spotColorDesc: "Couleur.", spotBold: "Texte en gras", spotBoldDesc: "true/false.", alertTitle: "Alertes Spotlight", alertType: "Type d'alerte", alertTypeDesc: "notice / modal / none.", alertNotice: "Notice", alertModal: "Modal", alertNone: "Aucun", alertDuration: "Durée de la notice", alertDurationDesc: "Secondes.", resetTitle: "Réinitialiser les paramètres", resetBtn: "Restaurer par défaut", resetMsg: "Voulez-vous vraiment restaurer les paramètres par défaut ?", resetConfirm: "Oui", resetCancel: "Annuler" },
    "de": { langTitle: "Sprache", langName: "Sprache auswählen", langDesc: "Textsprache ändern.", instTitle: "Anleitung", instTip: "Tipp: Verwende Befehle.", hotkeyBtn: "Tastenkürzel konfigurieren", globTitle: "Globale Konfiguration", globDefColor: "Standardfarbe", globDefColorDesc: "Zukünftige Ereignisse.", globPastColor: "Vergangene Farbe", globPastColorDesc: "Vergangene Ereignisse.", globHideOnPast: "Vergangene ausblenden", globHideOnPastDesc: "true/false.", globShowDaysText: "Tage-Text anzeigen", globShowDaysTextDesc: "true/false.", globToday: "Heute/Morgen verwenden", globTodayDesc: "true/false.", globShowFinal: "Enddatum anzeigen", globShowFinalDesc: "true/false.", globFormat: "Datumsformat", globFormatDesc: "Z.B.: 'YYYY-MM-DD'.", momentLinkText: "Moment.js Docs", spotTitle: "Spotlight-Modus", spotDays: "Spotlight-Tage", spotDaysDesc: "Tage vorher.", spotColor: "Spotlight-Farbe", spotColorDesc: "Farbe.", spotBold: "Fetter Text", spotBoldDesc: "true/false.", alertTitle: "Spotlight-Alarme", alertType: "Alarmtyp", alertTypeDesc: "notice / modal / none.", alertNotice: "Benachrichtigung", alertModal: "Fenster", alertNone: "Keiner", alertDuration: "Dauer", alertDurationDesc: "Sekunden.", resetTitle: "Einstellungen zurücksetzen", resetBtn: "Standardwerte", resetMsg: "Sind Sie sicher, dass Sie die Standardwerte wiederherstellen möchten?", resetConfirm: "Ja", resetCancel: "Abbrechen" },
    "ja": { langTitle: "言語", langName: "言語を選択", langDesc: "テキストの言語を変更。", instTitle: "使い方", instTip: "ヒント: コマンドを使用。", hotkeyBtn: "ホットキー設定", globTitle: "グローバル設定", globDefColor: "デフォルトの色", globDefColorDesc: "未来のイベント。", globPastColor: "過去の色", globPastColorDesc: "過去のイベント。", globHideOnPast: "過去のイベントを隠す", globHideOnPastDesc: "true/false。", globShowDaysText: "「日」テキストを表示", globShowDaysTextDesc: "true/false。", globToday: "今日/明日を使用", globTodayDesc: "true/false。", globShowFinal: "終了日を表示", globShowFinalDesc: "true/false。", globFormat: "日付フォーマット", globFormatDesc: "例: 'YYYY-MM-DD'。", momentLinkText: "Moment.js ドキュメント", spotTitle: "Spotlightモード", spotDays: "Spotlightのしきい値", spotDaysDesc: "日数。", spotColor: "Spotlightの色", spotColorDesc: "色。", spotBold: "太字にする", spotBoldDesc: "true/false。", alertTitle: "Spotlightアラート", alertType: "アラートタイプ", alertTypeDesc: "notice / modal / none。", alertNotice: "通知", alertModal: "モーダル", alertNone: "なし", alertDuration: "通知の表示時間", alertDurationDesc: "秒（0 = 無限）。", resetTitle: "設定をリセット", resetBtn: "デフォルトに戻す", resetMsg: "すべての設定をデフォルトに戻してもよろしいですか？", resetConfirm: "はい", resetCancel: "キャンセル" },
    "uk": { langTitle: "Мова", langName: "Виберіть мову", langDesc: "Змінює мову текстів.", instTitle: "Інструкція", instTip: "Підказка: Використовуйте команди.", hotkeyBtn: "Налаштувати гарячі клавіші", globTitle: "Глобальна конфігурація", globDefColor: "Стандартний колір", globDefColorDesc: "Майбутні події.", globPastColor: "Колір минулих", globPastColorDesc: "Минулі події.", globHideOnPast: "Приховати минулі", globHideOnPastDesc: "true/false.", globShowDaysText: "Показувати текст 'днів'", globShowDaysTextDesc: "true/false.", globToday: "Використовувати Сьогодні", globTodayDesc: "true/false.", globShowFinal: "Показувати кінцеву дату", globShowFinalDesc: "true/false.", globFormat: "Формат дати", globFormatDesc: "Напр: 'YYYY-MM-DD'.", momentLinkText: "Документація Moment.js", spotTitle: "Режим Spotlight", spotDays: "Поріг Spotlight", spotDaysDesc: "Днів до.", spotColor: "Колір Spotlight", spotColorDesc: "Колір.", spotBold: "Жирний текст", spotBoldDesc: "true/false.", alertTitle: "Сповіщення Spotlight", alertType: "Тип сповіщення", alertTypeDesc: "notice / modal / none.", alertNotice: "Повідомлення", alertModal: "Вікно", alertNone: "Немає", alertDuration: "Тривалість повідомлення", alertDurationDesc: "Секунди.", resetTitle: "Скинути налаштування", resetBtn: "Відновити замовчування", resetMsg: "Ви впевнені, що хочете відновити всі налаштування за замовчуванням?", resetConfirm: "Так", resetCancel: "Скасувати" },
    "zh": { langTitle: "语言", langName: "选择语言", langDesc: "更改输出文本的语言。", instTitle: "说明", instTip: "提示：使用命令快速插入代码块。", hotkeyBtn: "配置快捷键", globTitle: "全局配置", globDefColor: "默认计数器颜色", globDefColorDesc: "未来事件的颜色。", globPastColor: "过去事件颜色", globPastColorDesc: "过去事件的颜色。", globHideOnPast: "隐藏过去事件", globHideOnPastDesc: "true/false.", globShowDaysText: "显示“天”文本", globShowDaysTextDesc: "true/false.", globToday: "使用今天/明天文本", globTodayDesc: "true/false.", globShowFinal: "显示最终日期", globShowFinalDesc: "true/false.", globFormat: "最终日期格式", globFormatDesc: "例如：'YYYY-MM-DD'。", momentLinkText: "Moment.js 文档", spotTitle: "Spotlight 模式", spotDays: "Spotlight 阈值", spotDaysDesc: "事件发生前的天数。", spotColor: "Spotlight 颜色", spotColorDesc: "颜色。", spotBold: "加粗文本", spotBoldDesc: "true/false.", alertTitle: "Spotlight 警报", alertType: "警报类型", alertTypeDesc: "notice / modal / none.", alertNotice: "通知", alertModal: "弹窗", alertNone: "无", alertDuration: "通知持续时间", alertDurationDesc: "秒数（0 = 一直显示）。", resetTitle: "重置设置", resetBtn: "恢复默认值", resetMsg: "您确定要将所有设置恢复为默认值吗？", resetConfirm: "是的，恢复", resetCancel: "取消" }
};

interface DaysLeftSettings {
    language: string; dayCounterColor: string; dayCounterColorPast: string; hideOnPast: boolean;
    showDaysText: boolean; todayTomorrow: boolean; showFinalDate: boolean; finalDateFormat: string;
    spotlightDays: string; spotlightColor: string; spotlightBold: boolean;
    spotlightAlert: string; spotlightAlertDuration: number;
}

const DEFAULT_SETTINGS: DaysLeftSettings = {
    language: 'en', dayCounterColor: 'var(--text-normal)', dayCounterColorPast: 'var(--text-faint)', hideOnPast: false,
    showDaysText: true, todayTomorrow: true, showFinalDate: true, finalDateFormat: 'D MMMM YYYY | dddd',
    spotlightDays: '2', spotlightColor: '#af4b4b', spotlightBold: true,
    spotlightAlert: 'none', spotlightAlertDuration: 30
}

function renderMissingDateError(container: HTMLElement, suggestion: string, isInline: boolean, lang: any) {
    container.empty();
    container.addClass("daysleft-error");
    container.appendText(lang.missingDate);
    container.createEl("code", { text: isInline ? suggestion : `to: ${suggestion}` });
    container.appendText(lang.missingDateClose);
}

// MECHANIZM ODŚWIEŻANIA LIVE PREVIEW (CM6)
const pluginUpdateEffect = StateEffect.define<null>();

// ==========================================================
// 2. MODAL I POWIADOMIENIA
// ==========================================================
class ResetConfirmModal extends Modal {
    constructor(app: App, private langDict: any, private onConfirm: () => void) { super(app); }
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
        confirmBtn.addEventListener("click", () => { this.onConfirm(); this.close(); });
    }
    onClose() { this.contentEl.empty(); }
}

class CountdownAlertModal extends Modal {
    constructor(app: App, private title: string, private msg: string, private sourcePath: string, private lang: any, private isActive: boolean) { super(app); }
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
            noteBtn.addEventListener("click", (e: MouseEvent) => {
                const newLeaf = e.ctrlKey || e.metaKey;
                this.app.workspace.openLinkText(this.sourcePath, "", newLeaf);
                this.close();
            });
        }
        const okBtn = btnRow.createEl("button", { text: this.lang.gotIt });
        okBtn.addEventListener("click", () => this.close());
    }
    onClose() { this.contentEl.empty(); }
}

function triggerNotification(plugin: DaysLeftPlugin, text: string, diffDays: number, type: string, uniqueId: string, sourcePath: string, lang: any, durationSec: number) {
    if (plugin.notifiedSet.has(uniqueId)) return;
    plugin.notifiedSet.add(uniqueId);
    
    let msg = diffDays === 0 ? lang.today : (diffDays < 0 ? lang.past(Math.abs(diffDays)) : lang.future(diffDays));
    const eventTitle = text || lang.defaultEvent;
    const activeFile = plugin.app.workspace.getActiveFile();
    const isActive = activeFile && activeFile.path === sourcePath;

    if (type === "modal") {
        new CountdownAlertModal(plugin.app, eventTitle, msg, sourcePath, lang, isActive).open();
    } else if (type === "notice") {
        const durationMs = durationSec === 0 ? 0 : durationSec * 1000;
        const notice = new Notice("", durationMs);
        notice.noticeEl.empty();
        
        const wrapper = notice.noticeEl.createDiv({ cls: "daysleft-notice-container" });
        wrapper.createDiv({ text: "Days left", cls: "daysleft-notice-subtitle" });
        wrapper.createDiv({ text: lang.notifHeader, cls: "daysleft-notice-title" });
        wrapper.createDiv({ text: eventTitle, cls: "daysleft-notice-event" });
        wrapper.createDiv({ text: msg });
        
        if (!isActive) {
            const link = wrapper.createDiv({ text: `🔗 ${lang.openNote}`, cls: "daysleft-notice-link" });
            wrapper.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                const newLeaf = e.ctrlKey || e.metaKey;
                plugin.app.workspace.openLinkText(sourcePath, "", newLeaf);
                notice.hide();
            });
        }
    }
}

// ==========================================================
// 3. WIDGETY I KOMPONENTY RENDERUJĄCE (LIVE RELOAD)
// ==========================================================

// Logika renderująca blok kodu (````daysleft`)
class DaysLeftBlock extends MarkdownRenderChild {
    constructor(containerEl: HTMLElement, private source: string, private plugin: DaysLeftPlugin, private ctxPath: string) { super(containerEl); }
    onload() {
        this.plugin.activeBlocks.push(this);
        this.render();
    }
    onunload() {
        this.plugin.activeBlocks = this.plugin.activeBlocks.filter(b => b !== this);
    }
    render() {
        this.containerEl.empty();
        const config = this.plugin.parseConfig(this.source);
        const langCode = i18n[config.language] ? config.language : "en";
        const lang = i18n[langCode];
        const toDate = moment(config.to);
        
        if (!config.to || !toDate.isValid()) {
            const errDiv = this.containerEl.createDiv();
            errDiv.addClass("daysleft-block-container");
            renderMissingDateError(errDiv, moment().add(7, 'days').format('YYYY-MM-DD'), false, lang);
            return;
        }

        const diffDays = toDate.diff(moment().startOf('day'), 'days');
        if (diffDays < 0 && config.hideOnPast) { this.containerEl.style.display = "none"; return; }
        else { this.containerEl.style.display = ""; }

        const container = this.containerEl.createDiv({ cls: "daysleft-block-container" });
        if (config.text) container.createDiv({ text: config.text, cls: "daysleft-block-text" });

        const absDays = Math.abs(diffDays);
        let displayValue = (config.todayTomorrow && diffDays === 0) ? lang.today :
                           (config.todayTomorrow && diffDays === 1) ? lang.tomorrow :
                           (config.todayTomorrow && diffDays === -1) ? lang.yesterday :
                           (config.showDaysText ? (diffDays < 0 ? lang.past(absDays) : lang.future(absDays)) : diffDays.toString());

        const countEl = container.createDiv({ text: displayValue, cls: "daysleft-block-counter" });

        const spotlightDays = parseInt(config.spotlightDays);
        const isSpotlight = !isNaN(spotlightDays) && diffDays >= 0 && diffDays <= spotlightDays;

        if (isSpotlight) {
            countEl.style.color = config.spotlightColor;
            if (config.spotlightBold) countEl.style.fontWeight = "bold";

            if (config.spotlightAlert === "notice" || config.spotlightAlert === "modal") {
                const uniqueId = `block-${this.ctxPath}-${config.to}-${config.text}-${diffDays}`;
                let isActivelyEditing = false;
                const activeView = this.plugin.app.workspace.getActiveViewOfType(MarkdownView);
                
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
            const dateStr = toDate.locale(langCode === "uk" ? "uk" : (langCode === "zh" ? "zh-cn" : langCode)).format(config.finalDateFormat);
            container.createDiv({ text: dateStr.charAt(0).toUpperCase() + dateStr.slice(1), cls: "daysleft-block-date" });
        }
    }
}

// Logika renderująca znacznik inline w Reading View (Tryb Czytania)
class DaysLeftInlineReading extends MarkdownRenderChild {
    constructor(containerEl: HTMLElement, private dateStr: string, private plugin: DaysLeftPlugin, private sourcePath: string) { super(containerEl); }
    onload() {
        this.plugin.activeInlines.push(this);
        this.render();
    }
    onunload() {
        this.plugin.activeInlines = this.plugin.activeInlines.filter(i => i !== this);
    }
    render() {
        this.containerEl.empty();
        const span = this.plugin.createInlineSpan(this.dateStr, this.sourcePath);
        this.containerEl.appendChild(span);
    }
}

// Logika renderująca znacznik inline w Live Preview (Edytorze)
class InlineCountdownWidget extends WidgetType {
    constructor(private dateStr: string, private plugin: DaysLeftPlugin) { super(); }
    
    eq(other: InlineCountdownWidget) { return false; } 

    toDOM(view: EditorView): HTMLElement {
        const activeFile = this.plugin.app.workspace.getActiveFile();
        return this.plugin.createInlineSpan(this.dateStr, activeFile ? activeFile.path : "Unknown");
    }
}

export function buildInlineCountdownExtension(plugin: DaysLeftPlugin) {
    return ViewPlugin.fromClass(class {
        decorations: DecorationSet;
        constructor(view: EditorView) { this.decorations = this.buildDecorations(view); }
        update(update: ViewUpdate) { 
            if (update.docChanged || update.viewportChanged || update.selectionSet || update.transactions.some(t => t.effects.some(e => e.is(pluginUpdateEffect)))) { 
                this.decorations = this.buildDecorations(update.view); 
            } 
        }
        buildDecorations(view: EditorView): DecorationSet {
            const builder = new RangeSetBuilder<Decoration>();
            const regex = /`dl:([^`]+)?`/g;
            for (let { from, to } of view.visibleRanges) {
                const text = view.state.doc.sliceString(from, to);
                let match;
                while ((match = regex.exec(text)) !== null) {
                    const start = from + match.index;
                    const end = start + match[0].length;
                    let hasCursorInside = false;
                    for (const range of view.state.selection.ranges) if (range.head >= start && range.head <= end) hasCursorInside = true;
                    if (!hasCursorInside) builder.add(start, end, Decoration.replace({ widget: new InlineCountdownWidget(match[1] || "", plugin) }));
                }
            }
            return builder.finish();
        }
    }, { decorations: v => v.decorations });
}

// ==========================================================
// 4. GŁÓWNA KLASA WTYCZKI
// ==========================================================
export default class DaysLeftPlugin extends Plugin {
    settings: DaysLeftSettings;
    notifiedSet: Set<string> = new Set(); 
    lastCheckDate: string;
    
    activeBlocks: DaysLeftBlock[] = [];
    activeInlines: DaysLeftInlineReading[] = [];

    async onload() {
        await this.loadSettings();
        this.addSettingTab(new DaysLeftSettingTab(this.app, this));

        this.lastCheckDate = moment().format("YYYY-MM-DD");
        this.app.workspace.onLayoutReady(() => { this.scanVaultForCountdowns(); });

        this.registerInterval(window.setInterval(() => {
            const today = moment().format("YYYY-MM-DD");
            if (this.lastCheckDate !== today) {
                this.lastCheckDate = today;
                this.notifiedSet.clear();
                this.scanVaultForCountdowns();
            }
        }, 60 * 1000));

        this.addCommand({
            id: 'insert-block',
            name: 'Insert countdown block',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                const placeholder = "```daysleft\ntext: Event description\nto: YYYY-MM-DD\n```\n";
                const cursor = editor.getCursor();
                editor.replaceRange(placeholder, cursor);
                editor.setSelection({ line: cursor.line + 2, ch: 4 }, { line: cursor.line + 2, ch: 14 });
            }
        });

        this.addCommand({
            id: 'insert-inline',
            name: 'Insert inline countdown',
            editorCallback: (editor: Editor, view: MarkdownView) => {
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

    createInlineSpan(dateStr: string, sourcePath: string): HTMLElement {
        const span = document.createElement("span");
        span.addClass("daysleft-inline");
        
        const config = this.parseConfig(`to: ${dateStr.trim()}`);
        const langCode = i18n[config.language] ? config.language : "en";
        const lang = i18n[langCode];
        const toDate = moment(dateStr.trim());
        
        if (!dateStr || !toDate.isValid()) {
            renderMissingDateError(span, moment().add(7, 'days').format('YYYY-MM-DD'), true, lang);
            return span;
        }

        const diffDays = toDate.diff(moment().startOf('day'), 'days');
        if (diffDays < 0 && config.hideOnPast) { span.style.display = "none"; return span; }
        else { span.style.display = ""; }

        const absDays = Math.abs(diffDays);
        span.textContent = (config.todayTomorrow && diffDays === 0) ? lang.today.toLowerCase() :
                           (config.todayTomorrow && diffDays === 1) ? lang.tomorrow.toLowerCase() :
                           (config.todayTomorrow && diffDays === -1) ? lang.yesterday.toLowerCase() :
                           (config.showDaysText ? (diffDays < 0 ? lang.past(absDays) : lang.future(absDays)) : diffDays.toString());

        const spotlightDays = parseInt(config.spotlightDays);
        const isSpotlight = !isNaN(spotlightDays) && diffDays >= 0 && diffDays <= spotlightDays;

        if (isSpotlight) {
            span.style.color = config.spotlightColor;
            if (config.spotlightBold) span.style.fontWeight = "bold";

            if (config.spotlightAlert === "notice" || config.spotlightAlert === "modal") {
                const uniqueId = `inline-${sourcePath}-${config.to}-${diffDays}`;
                if (this.app.workspace.getActiveFile()?.path === sourcePath) {
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

    parseConfig(source: string): any {
        const localParams: Record<string, string> = {};
        source.split("\n").forEach(line => {
            const parts = line.split(":");
            if (parts.length >= 2) localParams[parts[0].trim()] = parts.slice(1).join(":").trim();
        });
        const getVal = (key: keyof DaysLeftSettings): any => (localParams[key] !== undefined && localParams[key] !== "") ? localParams[key] : this.settings[key];

        return {
            language: String(getVal("language")), text: localParams["text"] || "", to: localParams["to"] || "", from: localParams["from"] || "{today}",
            dayCounterColor: String(getVal("dayCounterColor")), dayCounterColorPast: String(getVal("dayCounterColorPast")),
            hideOnPast: String(getVal("hideOnPast")).toLowerCase() === "true", showDaysText: String(getVal("showDaysText")).toLowerCase() === "true",
            todayTomorrow: String(getVal("todayTomorrow")).toLowerCase() === "true", showFinalDate: String(getVal("showFinalDate")).toLowerCase() === "true",
            finalDateFormat: String(getVal("finalDateFormat")), spotlightDays: parseInt(String(getVal("spotlightDays"))),
            spotlightColor: String(getVal("spotlightColor")), spotlightBold: String(getVal("spotlightBold")).toLowerCase() === "true",
            spotlightAlert: String(getVal("spotlightAlert")).toLowerCase(), spotlightAlertDuration: parseInt(String(getVal("spotlightAlertDuration"))),
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

    checkAndTriggerFromScan(config: any, sourcePath: string, type: string) {
        const toDate = moment(config.to);
        if (!config.to || !toDate.isValid()) return;
        const diffDays = toDate.diff(config.from === "{today}" ? moment().startOf('day') : moment(config.from), 'days');
        if (diffDays < 0 && config.hideOnPast) return;
        
        if (!isNaN(parseInt(config.spotlightDays)) && diffDays >= 0 && diffDays <= parseInt(config.spotlightDays) && (config.spotlightAlert === "notice" || config.spotlightAlert === "modal")) {
            const langCode = i18n[config.language] ? config.language : "en";
            triggerNotification(this, config.text, diffDays, config.spotlightAlert, `${type}-${sourcePath}-${config.to}-${config.text}-${diffDays}`, sourcePath, i18n[langCode], config.spotlightAlertDuration);
        }
    }

    refreshOpenViews() {
        this.activeBlocks.forEach(b => b.render());
        this.activeInlines.forEach(i => i.render());
        this.app.workspace.iterateAllLeaves((leaf) => {
            if (leaf.view instanceof MarkdownView) {
                const editor = leaf.view.editor as any;
                if (editor.cm) {
                    editor.cm.dispatch({ effects: pluginUpdateEffect.of(null) });
                }
            }
        });
    }

    async loadSettings() { this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData()); }
    async saveSettings() { 
        await this.saveData(this.settings);
        this.refreshOpenViews(); 
    }
}

// ==========================================================
// 5. MENU USTAWIEŃ 
// ==========================================================
class DaysLeftSettingTab extends PluginSettingTab {
    plugin: DaysLeftPlugin;
    constructor(app: App, plugin: DaysLeftPlugin) { super(app, plugin); this.plugin = plugin; }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();
        
        const langCode = settingsI18n[this.plugin.settings.language] ? this.plugin.settings.language : "en";
        const t = settingsI18n[langCode] || settingsI18n["en"];
        
        const makeSelectable = (setting: Setting) => {
            setting.nameEl.style.userSelect = "text"; setting.nameEl.style.webkitUserSelect = "text";
            setting.descEl.style.userSelect = "text"; setting.descEl.style.webkitUserSelect = "text";
            return setting;
        };

        const createDesc = (paramName: string, paramValue: any, descContent: string | DocumentFragment) => {
            const frag = document.createDocumentFragment();
            const descContainer = frag.createDiv({ style: "margin-bottom: 6px; opacity: 0.9;" });
            if (typeof descContent === "string") descContainer.innerText = descContent;
            else descContainer.appendChild(descContent);

            const paramContainer = frag.createDiv({ style: "font-size: 0.9em; color: var(--text-muted);" });
            paramContainer.appendText("Parameter: ");
            paramContainer.createEl("code", { text: `${paramName}: ${paramValue}` });
            return frag;
        };

        const bindSetting = (container: HTMLElement, name: string, paramName: keyof DaysLeftSettings, descText: string, type: 'text' | 'toggle' | 'dropdown' | 'color', options?: Record<string, string>) => {
            const s = new Setting(container).setName(name);
            makeSelectable(s);
            
			const getDescContent = () => {
                let content: string | DocumentFragment = descText;
                if (paramName === 'finalDateFormat') {
                    const frag = document.createDocumentFragment();
                    frag.appendText(descText + " ");
                    frag.createEl("a", { 
                        text: t.momentLinkText || "Moment.js docs", 
                        href: "https://momentjs.com/docs/#/displaying/format/",
                        attr: { target: "_blank" } // Wymusza otwarcie w domyślnej przeglądarce internetowej
                    });
                    content = frag;
                }
                return content;
            };
			
            s.setDesc(createDesc(paramName, this.plugin.settings[paramName], getDescContent()));

            if (type === 'text') {
                s.addText(textEl => textEl.setValue(String(this.plugin.settings[paramName])).onChange(async v => {
                    (this.plugin.settings as any)[paramName] = paramName === 'spotlightAlertDuration' ? (isNaN(parseInt(v)) ? 30 : parseInt(v)) : v;
                    await this.plugin.saveSettings();
                    s.setDesc(createDesc(paramName, (this.plugin.settings as any)[paramName], getDescContent()));
                }));
            } else if (type === 'color') {
                let textComponent: TextComponent;
                s.addText(textEl => {
                    textComponent = textEl;
                    textEl.setValue(String(this.plugin.settings[paramName])).onChange(async v => {
                        (this.plugin.settings as any)[paramName] = v; await this.plugin.saveSettings();
                        s.setDesc(createDesc(paramName, v, getDescContent()));
                    });
                });
                s.addColorPicker(colorPicker => colorPicker.setValue(String(this.plugin.settings[paramName])).onChange(async v => {
                    (this.plugin.settings as any)[paramName] = v; await this.plugin.saveSettings();
                    s.setDesc(createDesc(paramName, v, getDescContent()));
                    textComponent.setValue(v);
                }));
            } else if (type === 'toggle') {
                s.addToggle(toggleEl => toggleEl.setValue(Boolean(this.plugin.settings[paramName])).onChange(async v => {
                    (this.plugin.settings as any)[paramName] = v; await this.plugin.saveSettings(); s.setDesc(createDesc(paramName, v, getDescContent()));
                }));
            } else if (type === 'dropdown' && options) {
                s.addDropdown(d => {
                    for (const [key, val] of Object.entries(options)) d.addOption(key, val);
                    d.setValue(String(this.plugin.settings[paramName])).onChange(async v => {
                        (this.plugin.settings as any)[paramName] = v; await this.plugin.saveSettings(); s.setDesc(createDesc(paramName, v, getDescContent()));
                    });
                });
            }
        };

        containerEl.createEl('h2', {text: t.langTitle});
        const langSetting = new Setting(containerEl).setName(t.langName);
        makeSelectable(langSetting);
        langSetting.setDesc(createDesc("language", this.plugin.settings.language, t.langDesc));
        langSetting.addDropdown(d => d
            .addOption('en', 'English (en)').addOption('pl', 'Polski (pl)')
            .addOption('es', 'Español (es)').addOption('fr', 'Français (fr)')
            .addOption('de', 'Deutsch (de)').addOption('ja', '日本語 (ja)')
            .addOption('uk', 'Українська (uk)').addOption('zh', '中文 (zh)')
            .setValue(this.plugin.settings.language)
            .onChange(async v => { this.plugin.settings.language = v; await this.plugin.saveSettings(); this.display(); })
        );

        containerEl.createEl('h2', {text: t.instTitle});
        new Setting(containerEl)
            .setName(t.hotkeyBtn)
            .setDesc("Open hotkeys configuration for Days left commands.")
            .addButton(btn => btn
                .setButtonText("⚙️ Hotkeys")
                .onClick(() => {
                    try {
                        const settingTab = (this.app as any).setting;
                        settingTab.openTabById('hotkeys');
                        const tab = settingTab.activeTab;
                        if (tab && tab.searchComponent) {
                            tab.searchComponent.setValue("Days left");
                            tab.updateHotkeyVisibility();
                        }
                    } catch (e) {
                        new Notice("Open Settings and navigate to Hotkeys, then search for 'Days left'.");
                    }
                })
            );

        const info = containerEl.createDiv({ cls: "daysleft-settings-info" });
        info.createEl("p", { text: t.instTip });
        info.createEl("pre", { text: "```daysleft\ntext: Upcoming trip\nto: 2026-12-24\n```", cls: "daysleft-settings-pre" });
        info.createEl("pre", { text: "`dl:2026-12-24`", cls: "daysleft-settings-pre" });

        containerEl.createEl('h2', {text: t.globTitle});
        bindSetting(containerEl, t.globDefColor, 'dayCounterColor', t.globDefColorDesc, 'color');
        bindSetting(containerEl, t.globPastColor, 'dayCounterColorPast', t.globPastColorDesc, 'color');
        bindSetting(containerEl, t.globHideOnPast, 'hideOnPast', t.globHideOnPastDesc, 'toggle');
        bindSetting(containerEl, t.globShowDaysText, 'showDaysText', t.globShowDaysTextDesc, 'toggle');
        bindSetting(containerEl, t.globToday, 'todayTomorrow', t.globTodayDesc, 'toggle');
        bindSetting(containerEl, t.globShowFinal, 'showFinalDate', t.globShowFinalDesc, 'toggle');
        bindSetting(containerEl, t.globFormat, 'finalDateFormat', t.globFormatDesc, 'text');

        containerEl.createEl('h2', {text: t.spotTitle});
        bindSetting(containerEl, t.spotDays, 'spotlightDays', t.spotDaysDesc, 'text');
        bindSetting(containerEl, t.spotColor, 'spotlightColor', t.spotColorDesc, 'color');
        bindSetting(containerEl, t.spotBold, 'spotlightBold', t.spotBoldDesc, 'toggle');

        containerEl.createEl('h2', {text: t.alertTitle});
        bindSetting(containerEl, t.alertType, 'spotlightAlert', t.alertTypeDesc, 'dropdown', {'none': t.alertNone, 'notice': t.alertNotice, 'modal': t.alertModal});
        bindSetting(containerEl, t.alertDuration, 'spotlightAlertDuration', t.alertDurationDesc, 'text');

        containerEl.createEl('h2', {text: t.resetTitle});
        new Setting(containerEl)
            .setName(t.resetBtn)
            .addButton(btn => btn
                .setButtonText(t.resetBtn)
                .setWarning()
                .onClick(() => {
                    new ResetConfirmModal(this.app, t, async () => {
                        this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS);
                        await this.plugin.saveSettings();
                        this.display();
                    }).open();
                })
            );
    }
}