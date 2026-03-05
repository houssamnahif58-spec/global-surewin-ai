import Link from "next/link"

export default function Home() {

  return (

    <div style={{textAlign:"center",padding:"40px",fontFamily:"Arial"}}>

      <h1>🔥 SUPER AI Football Predictions</h1>

      <p>Best Exact Score Predictions From AI</p>

      <br/>

      <Link href="/match">
        <button style={{
          padding:"15px 30px",
          fontSize:"18px",
          background:"black",
          color:"white",
          borderRadius:"10px",
          border:"none"
        }}>
          View Predictions
        </button>
      </Link>

    </div>

  )

}
