'use client'
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/login');
  }
  return ( 
    <Button
      onClick={onClick}
      variant="auth"
      className="w-[200px] outline outline-1"
    >
      Login
    </Button>
   );
}
 
export default LoginButton;