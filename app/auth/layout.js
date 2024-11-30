import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }) => {
  const session = await auth();
  if (session) {
    redirect('/');
  }

  return (
    <div className="w-screen h-screen bg-gray-700">
      {children}
    </div>
  )
}

export default AuthLayout;