export default async function handler(req, res) {
  const API_KEY = process.env.FOOTBALL_API_KEY;

  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?date=" +
        new Date().toISOString().split("T")[0],
      {
        method: "GET",
        headers: {
          "x-apisports-key": API_KEY,
        },
      }
    );

    const data = await response.json();

    if (!data.response) {
      return res.status(400).json({ error: "No matches found" });
    }

    const filteredMatches = data.response
      .filter((match) => match.league.country !== "World")
      .slice(0, 10)
      .map((match) => ({
        league: match.league.name,
        home: match.teams.home.name,
        away: match.teams.away.name,
        date: match.fixture.date,
      }));

    res.status(200).json(filteredMatches);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
