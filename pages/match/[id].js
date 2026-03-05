import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Match(){

const router = useRouter()
const { id } = router.query

const [match,setMatch] = useState(null)

useEffect(()=>{

fetch("/api/matches")
.then(res=>res.json())
.then(data=>{
const m = data.find(x=>x.id==id)
setMatch(m)
})

},[id])

if(!match) return <p>Loading...</p>

return (

<div style={{padding:"20px",fontFamily:"Arial"}}>

<h1>{match.home} vs {match.away}</h1>

<p>🏆 {match.competition}</p>

<p>📅 {new Date(match.date).toLocaleString()}</p>

<hr/>

<h2>🔮 AI Prediction</h2>

<h3>{match.prediction}</h3>

<p>🎯 Exact Score: {match.exactScore}</p>

<p>⭐ Confidence: {match.confidence}%</p>

<p>⚽ BTTS: {match.btts}</p>

<p>📊 {match.over25}</p>

</div>

)

}
