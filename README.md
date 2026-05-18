# ⏳ Days Left

**Days Left** is a highly customizable countdown and count-up timer for Obsidian. Keep track of upcoming deadlines, exciting future events, or see how many days have passed since important milestones—right inside your notes.

With its smart **Spotlight mode** and proactive alerts, your notes become dynamic dashboards that actively remind you of what matters most.

<img width="698" height="118" alt="days left obsidian plugin preview" src="https://github.com/user-attachments/assets/c94a3574-c873-4ec7-a9b4-9917e0db12c2" />

---

## 💡 Why use "Days Left"?
Static dates in notes easily get lost. You write "Project due on 2026-10-15", but unless you check it daily, it sneaks up on you. **Days Left** solves this by:
1. **Making time visible:** See exactly how many days remain (e.g., "5 days left") or how much time has passed (e.g., "14 days ago").
2. **Highlighting urgency:** The **Spotlight mode** automatically changes the color and font weight of the counter when a deadline approaches.
3. **Proactive reminders:** Get smart, non-intrusive notifications when an event enters the critical "Spotlight" zone, even if the note is closed.


---

## ✨ Key features
- **Two display modes:** Beautiful, centered code blocks for major events, and subtle inline tags to embed counters directly into sentences.
- **Dynamic & Static tracking:**
- Count down to a future date (`to:`).
  - Count days elapsed since a past date (`to:`).
  - Calculate the exact duration between two dates (`from:` and `to:`).
  - Track an ongoing streak from a specific date until today (`from:`).
- **Spotlight mode:** Set a threshold (e.g., 3 days). When an event is within this range, the counter visually transforms to grab your attention.
- **Smart notifications:** Choose between a discrete popup (Notice) or a full-screen alert (Modal) when a deadline hits the Spotlight zone.
- **Live refresh:** Any changes made in the settings immediately update all visible counters in real-time.
- **Multi-language support:** Output text automatically adapts to your preferred language (English, Polish, Spanish, French, German, Japanese, Ukrainian, Chinese).
- **Customizable aesthetics:** Control colors, formats, text variations ("Yesterday/Today/Tomorrow" vs. "-1/0/1 day"), and visibility of past events.
- **Global & local settings:** Define your default styles in the plugin settings, but override them for specific events right in the note!

---

## 🚀 How to use

You can insert counters manually or use the built-in Obsidian commands (`Ctrl/Cmd + P` -> *Insert countdown block*) to generate it instantly.

### 1. Code blocks (For major events)
Create a `daysleft` code block. It supports multiple parameters, but only `to` is strictly required.

```daysleft
text: Flight to Tokyo! ✈️
to: 2026-05-24
language:en
```

**Result:** Displays a large, centered counter saying "5 days left" (or "Today!") below the text "Flight to Tokyo! ✈️", with the final formatted date underneath.

### 2. Inline counters (For seamless text integration)
Use the following inline syntax inside your sentences or task lists:
```markdown
- [ ] Submit the tax report ⏳ `dl:2026-04-30`
```

*(Note: Simply type the letters **dl:** followed by the target date, all wrapped in single backticks).*

**Result:** The tag renders seamlessly as "5 days" (or "5 days ago" / "Today" depending on the date), making it perfect for tracking task deadlines.

---

## 🔦 Spotlight mode & smart alerts
This is where the magic happens. 

In the plugin settings, you can configure the **Spotlight threshold** (e.g., `2` days). 
* When your event is more than 2 days away, it uses the standard color.
* When it hits the 2-day mark, it enters **Spotlight mode**. The text changes to your designated `spotlightColor` and can become bold.
* **Alerts:** If enabled, Obsidian will proactively notify you (via Notice or Modal).

**The Smart Engine:**
* **No typing spam:** If you are actively editing the `daysleft` block, the plugin stays quiet. It will only alert you later or upon restarting the app.
* **Day rollover:** Leave Obsidian open overnight? The plugin automatically checks for new Spotlight events at midnight!
* **Quick navigation:** Click a Spotlight notice to instantly open the note containing the deadline. Hold `Ctrl/Cmd` while clicking to open it in a new tab!

---

## ⚙️ Configuration parameters (Local overrides)
You can configure global defaults in the Obsidian Settings menu. However, you can also override **any** global setting locally inside a specific code block!

Here are the parameters you can use inside a `daysleft` block:

| Parameter                | Example Value               | Description                                                                                       |
| :----------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------ |
| `text`                   | `My Birthday`               | A label displayed above the counter.                                                              |
| `to`                     | `2026-10-15`                | The target date (YYYY-MM-DD format).                                                              |
| `from`                   | `2004-11-04`                | The starting date. Defaults to today's date.                                                      |
| `language`               | `en`, `es`, `pl`...         | Forces a specific language for this counter.                                                      |
| `dayCounterColor`        | `blue`, `#4CAF50`           | Color for future events.                                                                          |
| `dayCounterColorPast`    | `gray`, `var(--text-faint)` | Color for events that have already passed.                                                        |
| `hideOnPast`             | `true` / `false`            | `true`: the counter completely disappears after the date passes.                                  |
| `spotlightDays`          | `3`                         | Number of days before the event to trigger Spotlight mode.                                        |
| `spotlightColor`         | `red`                       | Color of the counter when in the Spotlight zone.                                                  |
| `spotlightBold`          | `true` / `false`            | Makes the counter bold when in the Spotlight zone.                                                |
| `spotlightAlert`         | `notice` / `modal` / `none` | Override the notification type for this specific event.                                           |
| `spotlightAlertDuration` | `30`                        | Notice duration in seconds. `0` keeps it open until clicked.                                      |
| `showDaysText`           | `true` / `false`            | `true`: shows "5 days left". `false`: shows just the number "5".                                  |
| `todayTomorrow`          | `true` / `false`            | `true`: shows "Today/Tomorrow". `false`: shows "0/1 days".                                        |
| `showFinalDate`          | `true` / `false`            | Displays the target date below the block counter.                                                 |
| `finalDateFormat`        | `D MMMM YYYY`               | Formats the final date (Uses [Moment.js syntax](https://momentjs.com/docs/#/displaying/format/)). |

⚠️ Note on Spotlight: Spotlight styling and alerts work ONLY for dynamic upcoming events. If you use the from: parameter (duration mode), Spotlight features are automatically disabled for that specific block.

### Example of local override:
````markdown
```daysleft
text: Extremely urgent deadline!
to: 2026-05-10
spotlightColor: #ff0000
spotlightAlert: modal
todayTomorrow: false
```
````


## 🌍 Supported languages
The plugin automatically formats plurals and grammar rules according to the selected language:
* 🇬🇧 English (`en`)
* 🇵🇱 Polish (`pl`)
* 🇪🇸 Spanish (`es`)
* 🇫🇷 French (`fr`)
* 🇩🇪 German (`de`)
* 🇯🇵 Japanese (`ja`)
* 🇺🇦 Ukrainian (`uk`)
* 🇨🇳 Chinese (`zh`)

---

## 📥 Installation

**From Obsidian Community Plugins (Recommended):**
1. Open **Settings** -> **Community plugins**.
2. Turn off **Restricted mode**.
3. Click **Browse** and search for **Days Left**.
4. Click **Install**, then **Enable**.

**Manual installation:**
1. Download the latest release (`main.js`, `manifest.json`, `styles.css`) from the [GitHub Releases page](https://github.com/creesee/obsidian-days-left/releases).
2. Place the files in your vault's plugins folder: `.obsidian/plugins/days-left/`.
3. Reload Obsidian and enable the plugin in Settings.

---

## 🤝 Contributing and support
**Days Left** is designed and maintained by **creesee**. 

If you find a bug, have a feature request, or want to contribute a new language translation, feel free to open an Issue or a Pull Request on the GitHub repository!

If you love this plugin and it helps you stay organized, consider leaving a ⭐ on GitHub! If you'd like to support my work and fuel future updates, you can treat me to a coffee:

☕ **[Buy me a coffee! (buycoffee.to/creesee)](https://buycoffee.to/creesee)**
