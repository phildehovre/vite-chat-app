import React, { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import Chat from '../components/Chat'
import RoomList from '../components/RoomList'
import Signin from '../components/Signin'
import Spinner from '../components/Spinner'
import { auth } from '../config/firebase'
import { RoomContext } from '../contexts/RoomContext'
import { useRoomsByOwner, useRoomsByParticipant } from '../utils/db'




function HomePage() {

    const [user] = useAuthState(auth)
    const { data: userRooms, isLoading: isUserRoomsLoading, error: userRoomsError } = useRoomsByOwner(user?.uid)
    const { data: participantRooms, isLoading: isParticipantRoomsLoading, error: participantRoomsError } = useRoomsByParticipant(user?.uid)
    const { roomId } = useContext(RoomContext)

    return (
        <div className='homepage-ctn' style={{ display: 'flex', justifyContent: 'center' }}>
            {userRooms && !isUserRoomsLoading &&
                participantRooms && !isParticipantRoomsLoading
                ? <RoomList rooms={[...userRooms, ...participantRooms]} />
                : <Spinner />
            }
            {user && roomId
                ? <Chat roomId={roomId} />
                : <Signin />
            }
        </div>
    )
}

export default HomePage