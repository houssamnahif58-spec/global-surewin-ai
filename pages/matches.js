import { useEffect, useState } from "react"

export default function Matches(){

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

<div style={{padding:"30px",fontFamily:"Arial"}}>

<h1>🔥 Today's Best Predictions</h1>

{matches.map((m,i)=>(
<div key={i} style={{
border:"1px solid #ddd",
marginTop:"20px",
padding:"20px",
borderRadius:"10px"
}}>

<h2>{m.home} VS {m.away}</h2>

<p>🏆 League: {m.league}</p>

<p>🎯 Exact Score: {m.score}</p>

<p>📊 AI Confidence: {m.confidence}%</p>

</div>
))}

</div>

)

}
