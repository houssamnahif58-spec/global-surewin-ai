export default async function handler(req, res) {

const response = await fetch("https://api.football-data.org/v4/matches", {
headers: {
"X-Auth-Token": process.env.API_KEY
}
})

const data = await response.json()

if(!data.matches){
return res.status(200).json([])
}

const matches = data.matches.map(m => {

const homeScore = Math.floor(Math.random()*3)
const awayScore = Math.floor(Math.random()*3)

const total = homeScore + awayScore

return {
id: m.id,
home: m.homeTeam.name,
away: m.awayTeam.name,
competition: m.competition.name,
date: m.utcDate,

exactScore: `${homeScore}-${awayScore}`,

confidence: Math.floor(Math.random()*25)+70,

btts: homeScore>0 && awayScore>0 ? "Yes" : "No",

over25: total>2 ? "Over 2.5" : "Under 2.5"
}

})

res.status(200).json(matches)

}
