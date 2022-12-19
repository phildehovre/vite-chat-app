import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { auth } from '../config/firebase'

function RoomSettingsPage() {

    const params = useParams()
    const [user] = useAuthState(auth)



    return (
        <div>RoomSettingsPage</div>

    )
}

export default RoomSettingsPage
