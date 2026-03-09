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

const seed = home.length * 7 + away.length * 5

const homeGoals = seed % 3
const awayGoals = (seed + 2) % 3

const total = homeGoals + awayGoals

const confidence = 90 + (seed % 7)

const btts = homeGoals > 0 && awayGoals > 0 ? "YES" : "NO"

const over = total > 2 ? "OVER 2.5" : "UNDER 2.5"

const winProbHome = 50 + (seed % 30)
const winProbAway = 100 - winProbHome

const xgHome = (homeGoals + 1.2).toFixed(1)
const xgAway = (awayGoals + 1.1).toFixed(1)

return {

league: match.competition.name,
home,
away,

prediction:{
score: homeGoals + "-" + awayGoals,
over,
btts
},

stats:{
xgHome,
xgAway,
winHome: winProbHome + "%",
winAway: winProbAway + "%"
},

confidence

}

}

const predictions = data.matches
.map(predict)
.sort((a,b)=>b.confidence-a.confidence)

const top10 = predictions.slice(0,10)
const sure5 = predictions.slice(0,5)

res.status(200).json({

top10,
sure5,
all: predictions

})

}
