export default async function handler(req, res) {

const API_KEY = process.env.API_KEY

const response = await fetch(
"https://api.football-data.org/v4/matches",
{
headers: { "X-Auth-Token": API_KEY }
}
)

const data = await response.json()

function superAIV3(match){

const seed = match.id

const homePower = (seed % 10) + 1
const awayPower = ((seed * 7) % 10) + 1

let homeGoals = Math.round(homePower * 0.4)
let awayGoals = Math.round(awayPower * 0.4)

if(homeGoals > 4) homeGoals = 4
if(awayGoals > 4) awayGoals = 4

const totalGoals = homeGoals + awayGoals

let prediction

if(homeGoals > awayGoals){
prediction = "Home Win"
}else if(awayGoals > homeGoals){
prediction = "Away Win"
}else{
prediction = "Draw"
}

const confidence =
80 + ((homePower + awayPower) % 15)

return {

prediction,
exactScore: `${homeGoals}-${awayGoals}`,
over25: totalGoals > 2 ? "Over 2.5" : "Under 2.5",
btts: homeGoals > 0 && awayGoals > 0 ? "Yes" : "No",
confidence

}

}

const matches = data.matches
.filter(m => m.status === "TIMED")
.map(m => {

const ai = superAIV3(m)

return {

id: m.id,
home: m.homeTeam.name,
away: m.awayTeam.name,
competition: m.competition.name,
date: m.utcDate,

prediction: ai.prediction,
exactScore: ai.exactScore,
over25: ai.over25,
btts: ai.btts,
confidence: ai.confidence

}

})
.sort((a,b)=>b.confidence-a.confidence)
.slice(0,10)

res.status(200).json(matches)

}
