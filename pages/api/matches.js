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

const strongMatches = data.matches
.filter(m => m.status === "TIMED")
.slice(0,20)
.map(m => {

const attackHome = Math.random()*2.5
const attackAway = Math.random()*2.5

const homeGoals = Math.round(attackHome)
const awayGoals = Math.round(attackAway)

const total = homeGoals + awayGoals

const confidence =
Math.min(95,
Math.round((attackHome+attackAway)*20)
)

return {

id: m.id,

home: m.homeTeam.name,

away: m.awayTeam.name,

competition: m.competition.name,

date: m.utcDate,

prediction: homeGoals>awayGoals
? "Home Win"
: awayGoals>homeGoals
? "Away Win"
: "Draw",

exactScore: `${homeGoals}-${awayGoals}`,

over25: total>2 ? "Over 2.5" : "Under 2.5",

btts: homeGoals>0 && awayGoals>0 ? "Yes" : "No",

confidence: confidence

}

})

res.status(200).json(strongMatches)

}
