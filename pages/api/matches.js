export default async function handler(req, res) {

const API_KEY = process.env.API_KEY

const response = await fetch(
"https://api.football-data.org/v4/matches",
{
headers: { "X-Auth-Token": API_KEY }
}
)

const data = await response.json()

function superAI(match){

const seed = match.id

const homeStrength = (seed % 5) + 1
const awayStrength = ((seed * 3) % 5) + 1

let homeGoals = Math.round(homeStrength * 0.6)
let awayGoals = Math.round(awayStrength * 0.6)

if(homeGoals > 4) homeGoals = 4
if(awayGoals > 4) awayGoals = 4

const total = homeGoals + awayGoals

const confidence =
75 + ((homeStrength + awayStrength) % 20)

return {

prediction:
homeGoals > awayGoals
? "Home Win"
: awayGoals > homeGoals
? "Away Win"
: "Draw",

exactScore: `${homeGoals}-${awayGoals}`,

over25: total > 2
? "Over 2.5"
: "Under 2.5",

btts:
homeGoals > 0 && awayGoals > 0
? "Yes"
: "No",

confidence

}

}

const matches = data.matches
.filter(m => m.status === "TIMED")
.map(m => {

const ai = superAI(m)

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
