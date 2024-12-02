import { auth } from '@/auth';
import HomeButton from '@/components/home/home-button'
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }) => {
  const session = await auth();
  if (session) {
    redirect('/');
  }

  return (
    <div className="w-screen h-screen bg-[url('/StartScreen.png')] bg-center bg-cover">
      <HomeButton />
      {children}
    </div>
  )
}

export default AuthLayout;