import Link from "next/link"

export default function Home(){

return(

<div style={{fontFamily:"Arial",padding:"30px"}}>

<h1>⚽ SUPER AI Predictions</h1>
<p>Best Football Predictions In The World</p>

<br/>

<Link href="/matches">
<button style={{
padding:"15px",
fontSize:"18px",
background:"black",
color:"white",
borderRadius:"10px"
}}>
View Today's Predictions
</button>
</Link>

</div>

)

}
