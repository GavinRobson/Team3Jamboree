import { signOut } from "@/auth";
import { Button } from "../ui/button";

const SignOutButton = () => {
  return ( 
      <form
        action={ async () => {
          'use server';
          await signOut({ redirectTo: '/auth/login', redirect: true });
        }}
      >
        <Button
          variant="auth"
          type="submit"
          className="w-[200px] outline outline-1"
        >
          Sign Out
        </Button>
      </form>
   );
}
 
export default SignOutButton;