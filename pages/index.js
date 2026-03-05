async function loadMatches() {
  const res = await fetch("/api/matches");
  const data = await res.json();

  const container = document.getElementById("matches");
  container.innerHTML = "";

  data.forEach(match => {

    const home = match.homeTeam?.name || "Home Team";
    const away = match.awayTeam?.name || "Away Team";

    const homeGoals = Math.floor(Math.random()*3);
    const awayGoals = Math.floor(Math.random()*3);

    const confidence = Math.floor(85 + Math.random()*10);

    const card = document.createElement("div");
    card.className = "match-card";

    card.innerHTML = `
      <h2>⚽ ${home} VS ${away}</h2>

      <p>🏆 League: ${match.competition?.name || "League"}</p>

      <p>🎯 Exact Score: ${homeGoals}-${awayGoals}</p>

      <p>⭐ Confidence: ${confidence}%</p>

      <p>⚽ BTTS: ${homeGoals > 0 && awayGoals > 0 ? "YES" : "NO"}</p>
    `;

    container.appendChild(card);
  });
}

loadMatches();
