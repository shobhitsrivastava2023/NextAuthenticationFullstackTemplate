import React from 'react'
import { auth, signOut } from '../../../../auth'
const page = async () => {
    const session = await auth();
  return (
    <div>
       welcome {session?.user.name}
        <form action={async () => {
          "use server";
          await signOut(); 
        }}>
          <button type='submit'>
            Signout

          </button>
        </form>
      
    </div>
  )
}

export default page
