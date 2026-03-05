import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MatchPage() {
  const router = useRouter();
  const { id } = router.query;

  const [match, setMatch] = useState(null);
  const [prediction, setPrediction] = useState("");

  useEffect(() => {
    if (!id) return;

    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((m) => m.id == id);
        setMatch(found);

        if (found) {
          const random = Math.random();
          if (random > 0.66) setPrediction("🏠 فوز صاحب الأرض");
          else if (random > 0.33) setPrediction("🚗 فوز الضيف");
          else setPrediction("🤝 تعادل");
        }
      });
  }, [id]);

  if (!match) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>
        {match.home} vs {match.away}
      </h2>

      <p>🏆 {match.competition}</p>
      <p>📅 {new Date(match.date).toLocaleString()}</p>

      <h3 style={{ marginTop: 20 }}>🔮 التوقع:</h3>
      <h2 style={{ color: "green" }}>{prediction}</h2>
    </div>
  );
}
