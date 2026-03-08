import { useEffect, useState } from "react"

export default function Home() {

const [matches,setMatches] = useState([])

useEffect(()=>{

async function load(){

const res = await fetch("/api/matches")
const data = await res.json()

setMatches(data)

}

load()

},[])

return(

<div style={{fontFamily:"Arial",padding:"20px"}}>

<h1>⚽ AI Football Predictions</h1>
<h3>Top Matches Today</h3>

{matches.map((m,i)=>(

<div key={i} style={{
border:"1px solid #ddd",
padding:"20px",
marginTop:"15px",
borderRadius:"10px"
}}>

<h2>{m.home} VS {m.away}</h2>

<p>🏆 League: {m.league}</p>

<p>🎯 Exact Score: {m.score}</p>

<p>⚽ BTTS: {m.btts}</p>

<p>📊 Over/Under 2.5: {m.over}</p>

<p>⭐ Confidence: {m.confidence}%</p>

</div>

))}

</div>

)

}
