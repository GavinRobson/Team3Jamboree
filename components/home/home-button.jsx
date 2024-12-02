'use client';
import { useRouter } from "next/navigation";
import { HomeIcon } from "lucide-react";
const HomeButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/');
  }
  return ( 
      <HomeIcon 
        className="absolute m-2 text-white hover:text-white/80 cursor-pointer"
        onClick={onClick}
      />
   );
}
 
export default HomeButton;