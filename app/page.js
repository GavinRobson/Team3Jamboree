import PlayGameButton from "@/components/home/play-game-button";
import SignOutButton from "@/components/home/sign-out-button";
import LoginButton from "@/components/home/login-button";
import LoadSaveButton from "@/components/home/load-save-button";
import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export default async function Home() {
  const session = await auth();
  const user = await getUserById(session?.user?.id);
  console.log(user)
  return (
    <div style = {{margin: 0, alignItems: "center", backgroundImage: "url(/StartScreen.png)", backgroundSize: "cover", backgroundPosition: "center", height: "100vh", overflow: "hidden"}} >
      <div style={{ textAlign: "center", padding: "10px 20px",marginTop: "100px"}}> 
        <p style={{fontSize: '34px'}}>Welcome to </p>
        <h1 style={{fontSize: '54px'}}>The College Experience Game </h1>
        <p>Move your cursor to control your character and survive as long as possible</p>
        {(user?.score !== undefined && user?.score !== null) && (<p className="mt-32 text-xl">High Score: {user?.score}</p>)}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: `${user?.score !== undefined ? '30px' : '100px'}`}}>
          <PlayGameButton  user={user}/>
          {session 
            ? (
              <>
                {user.gameState !== null && (
                  <LoadSaveButton user={user}/>
                )}
                <SignOutButton />
              </>
          ) : (
            <LoginButton />
          )
          }
        </div>
      </div>
    </div>
  );
}
