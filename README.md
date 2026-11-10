# 📋 Clipboard History Manager

A lightweight Chrome extension that automatically saves the text you copy, so you can find and reuse it later.

## Features

- Automatically saves text copied on any web page
- Stores the last 100 items (duplicates move to the top)
- Search through your history
- Click any item to copy it again
- Delete single items or clear everything
- Shows the source website and how long ago you copied it
- Dark-themed popup

## Compatibility

Works on any Chromium-based browser: Chrome, Edge, Brave, Opera.
  

## Installation (Developer Mode)

1. Download or clone this repository:
   ```bash
   git clone https://github.com/Chamuditha-12/clipboard-history-manager.git
   ```
2. Open Chrome and go to `chrome://extensions`
3. Turn on **Developer mode** (top right)
4. Click **Load unpacked** and select the project folder
5. Pin the extension and click its icon to open your history

## Usage

1. Copy text on any website as usual (Ctrl+C / Cmd+C)
2. Click the extension icon to see your history
3. Click an item to copy it again, or use ✕ to delete it

## Project Structure

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration (Manifest V3) |
| `content.js` | Detects copy events and saves text |
| `popup.html` | Popup layout and styling |
| `popup.js` | Popup logic: search, copy, delete, clear |

## Privacy

All data is stored **locally** in your browser using `chrome.storage.local`. Nothing is sent to any server. Note that anything you copy (including sensitive text) is saved, so use **Clear All History** when needed.

## Permissions

- `storage`: save your clipboard history locally
- Content script on all sites: needed to detect copy events

## License

MIT, see [LICENSE](LICENSE).
