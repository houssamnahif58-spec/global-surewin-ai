export default async function handler(req,res){

const response = await fetch("https://api.football-data.org/v4/matches",{
headers:{
"X-Auth-Token":process.env.FOOTBALL_API_KEY
}
})

const data = await response.json()

const matches = data.matches.map(m=>{

const homeAttack = Math.random()*3
const awayAttack = Math.random()*3

const homeDefense = Math.random()*3
const awayDefense = Math.random()*3

const homeScore = Math.round(homeAttack + awayDefense/2)
const awayScore = Math.round(awayAttack + homeDefense/2)

const total = homeScore + awayScore

let over25 = total > 2 ? "Over 2.5 ✅" : "Under 2.5 ❌"

let btts = homeScore>0 && awayScore>0 ? "Yes" : "No"

const confidence = Math.abs(homeScore-awayScore)*20 + 60

return{

id:m.id,
home:m.homeTeam.name,
away:m.awayTeam.name,
competition:m.competition.name,
date:m.utcDate,

exactScore:`${homeScore}-${awayScore}`,
confidence:Math.min(confidence,95),

over25,
btts

}

})

const filtered = matches
.filter(m=>m.confidence>70)
.sort((a,b)=>b.confidence-a.confidence)
.slice(0,10)

res.status(200).json(filtered)

}
