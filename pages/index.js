import {useEffect,useState} from "react"

export default function Home(){

const [matches,setMatches] = useState([])

useEffect(()=>{

fetch("/api/matches")
.then(res=>res.json())
.then(data=>setMatches(data))

},[])

return(

<div style={{padding:"20px",fontFamily:"Arial"}}>

<h1>🔥 Top Exact Score Predictions</h1>

{matches.map(m=>(

<div key={m.id} style={{
border:"1px solid #ddd",
padding:"15px",
marginBottom:"15px",
borderRadius:"10px"
}}>

<h2>{m.home} vs {m.away}</h2>

<p>🏆 {m.competition}</p>

<p>🎯 Exact Score: {m.exactScore}</p>

<p>⭐ Confidence: {m.confidence}%</p>

<p>⚽ BTTS: {m.btts}</p>

<p>📊 {m.over25}</p>

</div>

))}

</div>

)

}
