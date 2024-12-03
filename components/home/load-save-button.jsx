'use client';

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LoadSaveButton = (user) => {
  const router = useRouter();
  const onClick = () => {
    const gameState = user.user.gameState
    router.push(`/game?u=${user.user.id}&checkpoint=${gameState.checkpoint}&score=${gameState.score}&health=${gameState.health}&currentWeapon=${gameState.currentWeapon}&id=${gameState.id}`)
  }
  return ( 
    <Button 
      onClick={onClick}
      variant="auth" 
      className="outline outline-1 w-[200px]"
    >
      Load Save
    </Button>
   );
}
 
export default LoadSaveButton;