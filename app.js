const btn = document.getElementById("searchBtn");
const input = document.getElementById("queryInput");
const statusBox = document.getElementById("statusBox");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");

function showStatus(msg) {
  statusBox.classList.remove("hidden");
  statusBox.textContent = msg;
}

function showResult(data) {
  resultBox.classList.remove("hidden");
  resultText.textContent = typeof data === "string" ? data : JSON.stringify(data, null, 2);
}

btn.addEventListener("click", async () => {
  const q = input.value.trim();
  if (!q) {
    showStatus("❌ Please enter something first.");
    return;
  }

  resultBox.classList.add("hidden");
  showStatus("⏳ Fetching...");

  try {
    // 👇 This calls Vercel serverless proxy
    const res = await fetch(`/api/proxy?query=${encodeURIComponent(q)}`);

    if (!res.ok) {
      const txt = await res.text();
      showStatus("❌ Error: " + res.status);
      showResult(txt);
      return;
    }

    const data = await res.json();
    showStatus("✅ Success!");
    showResult(data);

  } catch (err) {
    showStatus("❌ Fetch Error: Failed to fetch");
    showResult(String(err));
  }
});