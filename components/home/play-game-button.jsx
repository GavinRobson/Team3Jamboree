'use client';

import { useRouter } from "next/navigation";

const PlayGameButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/game');
  };
  
  return ( 
    <button 
      className="bg-slate-600 hover:bg-slate-400 p-2 rounded-lg"
      onClick={onClick}
    >
      Play Now
    </button>
   );
}
 
export default PlayGameButton;