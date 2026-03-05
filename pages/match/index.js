import { useEffect, useState } from "react"

export default function Home() {

  const [matches,setMatches] = useState([])

  useEffect(()=>{
    loadMatches()
  },[])

  async function loadMatches(){

    const res = await fetch("/api/matches")
    const data = await res.json()

    setMatches(data)

  }

  function createPrediction(match){

    const home = match.homeTeam?.name || match.home_name || match.teams?.home?.name || "Team A"
    const away = match.awayTeam?.name || match.away_name || match.teams?.away?.name || "Team B"

    const homeGoals = Math.floor(Math.random()*3)
    const awayGoals = Math.floor(Math.random()*3)

    const confidence = Math.floor(90 + Math.random()*9)

    return {
      home,
      away,
      score:`${homeGoals}-${awayGoals}`,
      confidence
    }

  }

  return (

    <div style={{padding:"20px",fontFamily:"Arial"}}>

      <h1>🔥 Top Exact Score Predictions</h1>

      {matches.map((m,i)=>{

        const p = createPrediction(m)

        return(

          <div key={i} style={{
            border:"1px solid #ddd",
            borderRadius:"10px",
            padding:"15px",
            marginBottom:"15px"
          }}>

            <h2>⚽ {p.home} VS {p.away}</h2>

            <p>🏆 League: {m.competition?.name || m.league || "League"}</p>

            <p>🎯 Exact Score: {p.score}</p>

            <p>⭐ Confidence: {p.confidence}%</p>

            <p>⚽ BTTS: {Math.random()>0.5?"YES":"NO"}</p>

          </div>

        )

      })}

    </div>

  )

}
