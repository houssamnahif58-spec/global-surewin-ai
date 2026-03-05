const strongMatches = data.matches
.filter(m => m.status === "TIMED")
.slice(0,20)
.map(m => {

const seed = m.id

const homeGoals = seed % 3
const awayGoals = (seed * 2) % 3

const total = homeGoals + awayGoals

const confidence = 70 + (seed % 25)

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
