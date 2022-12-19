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
    const { data: rooms, isLoading: isRoomsLoading, error: roomsError } = useRoomsByOwner(user?.uid)


    return (
        <div className='homepage-ctn' style={{ display: 'flex', justifyContent: 'center' }}>
            {rooms && !isRoomsLoading
                ? <RoomList rooms={rooms} />
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