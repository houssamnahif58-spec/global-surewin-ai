import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data));
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>⚽ SureWin AI</h1>

      {matches.map((match) => (
        <Link key={match.id} href={`/match/${match.id}`}>
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
              cursor: "pointer",
              background: "#f9f9f9",
            }}
          >
            <h3>
              {match.home} vs {match.away}
            </h3>
            <p>🏆 {match.competition}</p>
            <p>📅 {new Date(match.date).toLocaleString()}</p>
            <p>📊 Status: {match.status}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
