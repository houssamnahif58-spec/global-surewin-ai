export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?next=20",
      {
        headers: {
          "x-apisports-key": process.env.API_KEY,
        },
      }
    );

    const data = await response.json();

    if (!data.response) {
      return res.status(200).json([]);
    }

    const matches = data.response.map((match) => ({
      id: match.fixture.id,
      date: match.fixture.date,
      home: match.teams.home.name,
      away: match.teams.away.name,
      league: match.league.name,
      country: match.league.country,
      status: match.fixture.status.short,
    }));

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
