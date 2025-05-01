import Navbar from "../components/navbar"; 
import { redirect } from 'next/navigation'
import { createClient } from '@utils/supabase/server'
import Image from "next/image";
import Link from "next/link";


export default async function dashboard() {
  const supabase = await createClient()
  const zindex=7
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return(
    <>
      <div className="min-h-screen bg-black">
              <Navbar /> 
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p> Welcome {data.user.user_metadata?.username}, This is supposed to be the dashboard!</p>
      </div>
      <Link href="https://www.youtube.com/watch?v=XmsRDSgXFp0">
        <div className="flex flex-wrap gap-24">
           {[...Array(7)].map((_, gridindex) => (
              <div className="relative w-[200px] h-[200px]" key={gridindex}>
                    {[...Array(6)].map((_, index) => (
                      <Image
                        key={index}
                        src="/book.avif"
                        alt={`Image ${index + 1}`}
                        width={200}
                        height={200}
                        className="absolute top-5 left-32"
                        style={{
                          transform: `translate(-${index * 13}px, -${index * 8}px)`,
                          zIndex: zindex - index,
                        }}
                      />
                       ))}
                    </div>
                   ))}
                </div>
            </Link>
      </div>
  

  </>
  )
}