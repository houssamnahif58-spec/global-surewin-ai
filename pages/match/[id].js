import { useRouter } from "next/router";

export default function MatchPage() {

const router = useRouter();
const { id } = router.query;

const matches = [
{
id:1,
home:"Tottenham Hotspur",
away:"Crystal Palace",
league:"Premier League",
date:"05/03/2026 20:00"
},
{
id:2,
home:"Barcelona",
away:"Valencia",
league:"La Liga",
date:"06/03/2026 21:00"
},
{
id:3,
home:"AC Milan",
away:"Lazio",
league:"Serie A",
date:"06/03/2026 19:00"
}
];

const match = matches.find(m => m.id == id);

if(!match){
return <h2>Loading...</h2>
}

const homeChance = Math.floor(Math.random()*50)+30;
const drawChance = Math.floor(Math.random()*20)+10;
const awayChance = 100 - homeChance - drawChance;

const homeScore = Math.floor(Math.random()*3);
const awayScore = Math.floor(Math.random()*3);

const exactScore = homeScore + " - " + awayScore;

let bestBet="";

if(homeChance > awayChance && homeChance > drawChance){
bestBet="فوز صاحب الأرض";
}else if(awayChance > homeChance){
bestBet="فوز الفريق الضيف";
}else{
bestBet="تعادل";
}

const confidence = Math.floor(Math.random()*25)+75;

let analysis="";

if(homeChance > awayChance){
analysis="الفريق صاحب الأرض يبدو أقوى حسب الإحصائيات.";
}else if(awayChance > homeChance){
analysis="الفريق الضيف قد يفاجئ صاحب الأرض.";
}else{
analysis="المباراة متقاربة جداً.";
}

return(

<div style={{padding:"20px",fontFamily:"Arial"}}>

<h1>{match.home} vs {match.away}</h1>

<p>🏆 {match.league}</p>

<p>📅 {match.date}</p>

<h2>🔮 التوقع</h2>

<h3>🎯 النتيجة المتوقعة: {exactScore}</h3>

<p>📊 فوز صاحب الأرض: {homeChance}%</p>

<p>🤝 تعادل: {drawChance}%</p>

<p>📊 فوز الضيف: {awayChance}%</p>

<p>⭐ نسبة الثقة: {confidence}%</p>

<p>🔥 أفضل رهان: {bestBet}</p>

<p>🧠 التحليل: {analysis}</p>

</div>

)

}
