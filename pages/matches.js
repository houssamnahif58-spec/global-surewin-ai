import {useEffect,useState} from "react"

export default function Matches(){

const [matches,setMatches]=useState([])

useEffect(()=>{

fetch("/api/matches")
.then(res=>res.json())
.then(data=>{
setMatches(data.all)
})

},[])

return(

<div style={{padding:40,fontFamily:"Arial"}}>

<h1>All AI Predictions</h1>

{matches.map((m,i)=>(

<div key={i} style={{
border:"1px solid #444",
padding:20,
marginBottom:10
}}>

<h3>{m.home} vs {m.away}</h3>

<p>Score Prediction: {m.prediction.score}</p>

<p>BTTS: {m.prediction.btts}</p>

<p>Over/Under: {m.prediction.over}</p>

<p>xG: {m.stats.xgHome} - {m.stats.xgAway}</p>

<p>Confidence: {m.confidence}%</p>

</div>

))}

</div>

)

}
