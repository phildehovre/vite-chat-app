import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from '../components/Chat'
import RoomList from '../components/RoomList'
import Signin from '../components/Signin'
import Spinner from '../components/Spinner'
import { auth } from '../config/firebase'
import { RoomContext } from '../contexts/RoomContext'
import { useRoomsByOwner } from '../utils/db'




function HomePage() {

    const [user] = useAuthState(auth)
    const { data: userRooms, isLoading: isUserRoomsLoading, error: userRoomsError } = useRoomsByOwner(user?.uid)
    const { data: participantRooms, isLoading: isParticipantRoomsLoading, error: participantRoomsError } = useRoomsByOwner(user?.uid)

    console.log(participantRooms ? participantRooms : '')

    return (
        <div className='homepage-ctn' style={{ display: 'flex', justifyContent: 'center' }}>
            {userRooms && !isUserRoomsLoading &&
                participantRooms && !isParticipantRoomsLoading
                ? <RoomList rooms={[...userRooms, participantRooms]} />
                : <Spinner />
            }
            {user
                ? <Chat />
                : <Signin />
            }

        </div>
    )
}

export default HomePage