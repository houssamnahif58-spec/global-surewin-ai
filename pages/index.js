import {useEffect,useState} from "react"

export default function Home(){

const [matches,setMatches]=useState([])

useEffect(()=>{

fetch("/api/matches")
.then(res=>res.json())
.then(data=>{
setMatches(data.top10)
})

},[])

return(

<div style={{padding:40,fontFamily:"Arial"}}>

<h1>⚽ AI Football Predictions</h1>
<h2>Top 10 Matches (90-97%)</h2>

{matches.map((m,i)=>(

<div key={i} style={{
border:"1px solid #333",
padding:20,
marginBottom:15,
borderRadius:10
}}>

<h3>{m.home} vs {m.away}</h3>

<p>League: {m.league}</p>

<p>Exact Score: {m.prediction.score}</p>

<p>Over/Under: {m.prediction.over}</p>

<p>BTTS: {m.prediction.btts}</p>

<p>xG: {m.stats.xgHome} - {m.stats.xgAway}</p>

<p>Win Probability: {m.stats.winHome}</p>

<p>Confidence: {m.confidence}%</p>

</div>

))}

</div>

)

}
