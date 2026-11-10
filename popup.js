document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("historyContainer");
  const searchBox = document.getElementById("searchBox");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const toast = document.getElementById("toast");

  let allHistory = [];

  await loadHistory();

  searchBox.addEventListener("input", () => {
    const query = searchBox.value.toLowerCase();
    const filtered = allHistory.filter((item) =>
      item.text.toLowerCase().includes(query)
    );
    renderHistory(filtered);
  });

  clearAllBtn.addEventListener("click", async () => {
    if (confirm("Clear all clipboard history?")) {
      await chrome.storage.local.set({ clipboardHistory: [] });
      allHistory = [];
      renderHistory([]);
    }
  });

  async function loadHistory() {
    const { clipboardHistory = [] } = await chrome.storage.local.get("clipboardHistory");
    allHistory = clipboardHistory;
    renderHistory(allHistory);
  }

  function renderHistory(items) {
    container.innerHTML = "";

    if (items.length === 0) {
      container.innerHTML = "<p style='font-size:12px;color:#999;'>No clipboard history yet. Copy some text to get started!</p>";
      return;
    }

    items.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "item";

      const timeAgo = getTimeAgo(item.timestamp);

      div.innerHTML = `
        <div class="item-text">${escapeHtml(item.text)}</div>
        <div class="item-meta">
          <span>${escapeHtml(item.source)} · ${timeAgo}</span>
          <button class="delete-btn" data-timestamp="${item.timestamp}">✕</button>
        </div>
      `;

      div.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) return;
        copyToClipboard(item.text);
      });

      container.appendChild(div);
    });

    container.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const timestamp = parseFloat(e.target.dataset.timestamp);
        allHistory = allHistory.filter((item) => item.timestamp !== timestamp);
        await chrome.storage.local.set({ clipboardHistory: allHistory });
        renderHistory(allHistory);
      });
    });
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      showToast();
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  function showToast() {
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 1200);
  }

  function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
});