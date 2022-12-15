import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from '../components/Chat'
import { auth } from '../config/firebase'




function HomePage() {

    const [user] = useAuthState(auth)


    return (
        <div>
            {user
                ? <Chat />
                : <h1>Loading...</h1>
            }
        </div>
    )
}

export default HomePage