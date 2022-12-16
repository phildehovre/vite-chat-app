import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from '../components/Chat'
import Signin from '../components/Signin'
import { auth } from '../config/firebase'




function HomePage() {

    const [user] = useAuthState(auth)


    return (
        <div>
            {user
                ? <Chat />
                : <Signin />
            }
        </div>
    )
}

export default HomePage