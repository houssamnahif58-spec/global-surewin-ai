export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/matches",
      {
        headers: {
          "X-Auth-Token": process.env.API_KEY,
        },
      }
    );

    const data = await response.json();

    if (!data.matches) {
      return res.status(200).json([]);
    }

    const matches = data.matches.slice(0, 20).map((match) => ({
      id: match.id,
      date: match.utcDate,
      home: match.homeTeam.name,
      away: match.awayTeam.name,
      competition: match.competition.name,
      status: match.status,
    }));

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: "API error" });
  }
}
