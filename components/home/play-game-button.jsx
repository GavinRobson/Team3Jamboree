'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

const PlayGameButton = (user) => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const onClick = () => {
    user.user.gameState !== null ? setModalOpen(!modalOpen) : router.push(`/game?u=${user.user.id}`)
  };
  
  return ( 
    <>
      <button 
        className="bg-slate-600 hover:bg-slate-400 p-2 rounded-lg"
        onClick={onClick}
        style={{ width: "200px" }}
        >
        New Game!
      </button>
      {modalOpen && (
      <div className="absolute top-0 w-screen h-screen items-center flex justify-center bg-black/50">
        <div className="w-2/5 h-3/5 bg-gray-300 items-center rounded-lg pt-4">
          <div className="flex flex-col space-y-4">
            <p className="text-4xl underline font-bold">You are about to start a new game</p>
            <p className="text-2xl font-semibold underline">This will override any previously saved games</p>
            <p className="text-xl">Are you sure you want to continue?</p>
          </div>
          <div className="h-1/2 flex items-center justify-center">
            <div className="flex flex-row space-x-4">
              <Button
                className="outline outline-1 w-[200px]"
                variant="auth"
                onClick={() => {router.push(`/game?u=${user.user.id}`)}}
                >
                YES, proceed
              </Button>
              <Button
                onClick={onClick}
                className="outline outline-1 w-[200px] outline-black"
                variant="destructive"
                >
                NO, go back
              </Button>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
   );
}
 
export default PlayGameButton;