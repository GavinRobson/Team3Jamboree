import PlayGameButton from "@/components/home/play-game-button";

const buttons = (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "150px"}}>
    <PlayGameButton  />
    <button className="bg-slate-600 hover:bg-slate-400 p-2 rounded-lg" style={{ width: "200px" }} >Load Save</button> </div>
)

const startPage = (
 <div style={{ textAlign: "center", padding: "10px 20px",marginTop: "100px"}}> 
  <p style={{fontSize: '34px'}}>Welcome to </p>
  <h1 style={{fontSize: '54px'}}>The College Experience Game </h1>
  <p>Move your cursor to control your character and survive as long as possible</p>
  {buttons}
 </div>
)

export default function Home() {
  return (
    <div >
      {startPage}
    </div>
  );
}
