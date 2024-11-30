import { signOut } from "@/auth";

const SignOutButton = () => {
  return ( 
      <form
        action={ async () => {
          'use server';
          await signOut({ redirectTo: '/auth/login', redirect: true });
        }}
      >
        <button 
          className="bg-slate-600 hover:bg-slate-400 p-2 rounded-lg"
          type='submit'
          style={{ width: "200px" }}
        >
          Sign Out
        </button>
      </form>
   );
}
 
export default SignOutButton;