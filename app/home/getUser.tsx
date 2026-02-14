import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function getUser() {
    const router = useRouter()
    const [user, setUser] = useState<string | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setUser(storedUser);
      }, []);
    
      if(user){
        router.push("/home")
      }
  return (
    <div>
      
    </div>
  )
}

export default getUser
