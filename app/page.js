import PlayGameButton from "@/components/home/play-game-button";
import SignOutButton from "@/components/home/sign-out-button";

const buttons = (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "150px"}}>
    <PlayGameButton  />
    <button className="bg-slate-600 hover:bg-slate-400 p-2 rounded-lg" style={{ width: "200px" }} >Load Save</button>
    <SignOutButton />
  </div>
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
    <div style = {{margin: 0, alignItems: "center", backgroundImage: "url(StartScreen.png)", backgroundSize: "cover", backgroundPosition: "center", height: "100vh", overflow: "hidden"}} >
      {startPage}
    </div>
  );
}
