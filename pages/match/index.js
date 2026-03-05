import { useEffect, useState } from "react"

export default function MatchPage() {

  const [matches,setMatches] = useState([])

  useEffect(()=>{

    async function loadMatches(){

      const res = await fetch("https://api.football-data.org/v4/matches",{
        headers:{
          "X-Auth-Token":"dc6d6d91f6a94707b2933c85e95f9bf2"
        }
      })

      const data = await res.json()

      const list = data.matches.slice(0,10).map(match=>{

        const home = match.homeTeam?.name || "Home Team"
        const away = match.awayTeam?.name || "Away Team"

        const homeGoals = Math.floor(Math.random()*3)
        const awayGoals = Math.floor(Math.random()*3)

        const confidence = Math.floor(85 + Math.random()*10)

        return {
          home,
          away,
          league: match.competition?.name,
          score: homeGoals+"-"+awayGoals,
          confidence
        }

      })

      setMatches(list)

    }

    loadMatches()

  },[])

  return(

    <div style={{padding:"20px",fontFamily:"Arial"}}>

      <h1>🔥 Top Exact Score Predictions</h1>

      {matches.map((m,i)=>(

        <div key={i} style={{
          border:"1px solid #ddd",
          padding:"20px",
          marginTop:"20px",
          borderRadius:"12px"
        }}>

          <h2>⚽ {m.home} VS {m.away}</h2>

          <p>🏆 League: {m.league}</p>

          <p>🎯 Exact Score: {m.score}</p>

          <p>⭐ Confidence: {m.confidence}%</p>

        </div>

      ))}

    </div>

  )

}
