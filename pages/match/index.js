export default async function handler(req, res) {

const response = await fetch("https://api.football-data.org/v4/matches", {
headers: {
"X-Auth-Token": process.env.API_KEY
}
})

const data = await response.json()

const matches = data.matches.slice(0,10).map(m=>{

const home = m.homeTeam.name
const away = m.awayTeam.name

const homeGoals = Math.floor(Math.random()*3)
const awayGoals = Math.floor(Math.random()*3)

const exactScore = `${homeGoals}-${awayGoals}`

const bets = ["HOME WIN","AWAY WIN","DRAW","OVER 2.5"]

return {
homeTeam: home,
awayTeam: away,
exactScore: exactScore,
bestBet: bets[Math.floor(Math.random()*bets.length)],
confidence: Math.floor(Math.random()*20)+80+"%"
}

})

res.status(200).json(matches)

}
