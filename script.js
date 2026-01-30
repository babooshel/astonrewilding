fetch("/events/example-event.md")
  .then(res => res.text())
  .then(text => {
    const container = document.getElementById("events-container");
    container.innerHTML = `
      <div class="event-card">
        <h3>Community Planting Day</h3>
        <p>${text.replace(/---[^]*?---/, "").trim()}</p>
      </div>
    `;
  })
  .catch(() => {
    document.getElementById("events-container").innerText =
      "Events will appear here soon.";
  });
