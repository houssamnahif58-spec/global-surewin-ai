import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MatchPage() {
  const router = useRouter();
  const { id } = router.query;

  const [match, setMatch] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((m) => m.id == id);
        setMatch(found);

        if (found) {
          const homePower = Math.random() * 3;
          const awayPower = Math.random() * 3;

          const homeScore = Math.round(homePower);
          const awayScore = Math.round(awayPower);

          const winner =
            homeScore > awayScore
              ? "🏠 فوز صاحب الأرض"
              : homeScore < awayScore
              ? "🚗 فوز الضيف"
              : "🤝 تعادل";

          const over25 =
            homeScore + awayScore > 2 ? "Over 2.5 ✅" : "Under 2.5 ❌";

          const btts =
            homeScore > 0 && awayScore > 0
              ? "BTTS: Yes ✅"
              : "BTTS: No ❌";

          setPrediction({
            winner,
            exact: `${homeScore} - ${awayScore}`,
            over25,
            btts,
            homeProb: Math.floor((homeScore / 5) * 100),
            awayProb: Math.floor((awayScore / 5) * 100),
          });
        }
      });
  }, [id]);

  if (!match || !prediction) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>
        {match.home} vs {match.away}
      </h2>

      <p>🏆 {match.competition}</p>
      <p>📅 {new Date(match.date).toLocaleString()}</p>

      <hr />

      <h3>🔮 التوقع الاحترافي:</h3>

      <h2>{prediction.winner}</h2>

      <p>🎯 Exact Score: {prediction.exact}</p>

      <p>📊 {prediction.over25}</p>

      <p>⚽ {prediction.btts}</p>

      <p>📈 نسبة فوز صاحب الأرض: {prediction.homeProb}%</p>
      <p>📉 نسبة فوز الضيف: {prediction.awayProb}%</p>
    </div>
  );
}
