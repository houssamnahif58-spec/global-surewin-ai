export default async function handler(req, res) {

const response = await fetch(
"https://api.football-data.org/v4/matches",
{
headers:{
"X-Auth-Token":process.env.API_KEY
}
}
)

const data = await response.json()

function predict(match){

const home = match.homeTeam.name
const away = match.awayTeam.name

const seed = home.length + away.length

const homeGoals = seed % 3
const awayGoals = (seed + 1) % 3

const total = homeGoals + awayGoals

const confidence = 90 + (seed % 7)

const btts = homeGoals > 0 && awayGoals > 0 ? "YES" : "NO"

const over = total > 2 ? "OVER 2.5" : "UNDER 2.5"

return {
home,
away,
league: match.competition.name,
score: homeGoals + "-" + awayGoals,
btts,
over,
confidence
}

}

const predictions = data.matches
.map(predict)
.sort((a,b)=>b.confidence-a.confidence)
.slice(0,10)

res.status(200).json(predictions)

}
