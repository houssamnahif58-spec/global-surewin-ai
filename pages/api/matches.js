export default function handler(req, res) {

function predictScore(home, away) {

let baseHome = Math.floor(Math.random() * 3);
let baseAway = Math.floor(Math.random() * 3);

let confidence = 90 + Math.floor(Math.random() * 10);

return {
homeTeam: home,
awayTeam: away,
exactScore: baseHome + "-" + baseAway,
confidence: confidence + "%"
};

}

const matches = [

{ home: "Real Madrid", away: "Barcelona" },
{ home: "Manchester City", away: "Liverpool" },
{ home: "Arsenal", away: "Chelsea" },
{ home: "PSG", away: "Marseille" },
{ home: "Bayern Munich", away: "Dortmund" },
{ home: "Juventus", away: "AC Milan" },
{ home: "Inter", away: "Napoli" },
{ home: "Atletico Madrid", away: "Sevilla" },
{ home: "Roma", away: "Lazio" },
{ home: "Tottenham", away: "Newcastle" },
{ home: "Ajax", away: "PSV" },
{ home: "Benfica", away: "Porto" }

];

const predictions = matches.map(m => predictScore(m.home, m.away));

res.status(200).json(predictions);

}
