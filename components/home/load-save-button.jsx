import { Button } from "../ui/button";

const LoadSaveButton = (user) => {
  if (!user) {
    return null;
  }
  
  if (!user.gameState) {
    return null;
  }

  return ( 
    <Button variant="auth" className="outline outline-1 w-[200px]">
      Load Save
    </Button>
   );
}
 
export default LoadSaveButton;