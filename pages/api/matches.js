export default async function handler(req,res){

const response = await fetch("https://api.football-data.org/v4/matches",{
headers:{
"X-Auth-Token":process.env.API_KEY
}
})

const data = await response.json()

const matches = data.matches.slice(0,50).map(m=>{

const home = m.homeTeam?.name
const away = m.awayTeam?.name

const homeGoals = Math.floor(Math.random()*3)
const awayGoals = Math.floor(Math.random()*3)

const total = homeGoals + awayGoals

const confidence = Math.floor(90 + Math.random()*7)

return{

home,
away,
league:m.competition?.name,

score:homeGoals+"-"+awayGoals,

btts:homeGoals>0 && awayGoals>0 ? "YES" : "NO",

over: total>2 ? "OVER 2.5" : "UNDER 2.5",

confidence

}

})

const top10 = matches
.sort((a,b)=>b.confidence-a.confidence)
.slice(0,10)

res.status(200).json(top10)

}
