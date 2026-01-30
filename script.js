fetch("/events/example-event.md")
  .then(res => res.text())
  .then(text => {
    document.getElementById("events-container").innerHTML = `
      <div class="card">
        <h3>Community Planting Day</h3>
        <p>${text.replace(/---[\\s\\S]*?---/, "")}</p>
      </div>
    `;
  });
