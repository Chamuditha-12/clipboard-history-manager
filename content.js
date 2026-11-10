const MAX_HISTORY_ITEMS = 100;

document.addEventListener("copy", async () => {
  // සුළු delay එකක් - browser ට actual selection එක clipboard එකට යවන්න වෙලාව දෙන්න
  setTimeout(async () => {
    const selectedText = window.getSelection().toString().trim();
    if (!selectedText) return;

    const { clipboardHistory = [] } = await chrome.storage.local.get("clipboardHistory");

    // Duplicate check - කලින් copy කරපු එකම text එකක් නම් ඉවත් කරලා අලුතින් top එකට දාන්න
    const filtered = clipboardHistory.filter((item) => item.text !== selectedText);

    const newItem = {
      text: selectedText,
      timestamp: Date.now(),
      source: window.location.hostname,
    };

    const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    await chrome.storage.local.set({ clipboardHistory: updated });
  }, 50);
});