import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faLock, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { deleteRoom } from '../utils/db'
import { RoomContext } from '../contexts/RoomContext'


function RoomListItem({ room, index, handleRoomSelection }) {

    const [isHovered, setIsHOvered] = useState(false)
    const { setRoomId } = useContext(RoomContext)

    const [user] = useAuthState(auth)

    const handleHover = (i) => {
        setIsHOvered(i)
    }

    const handleDeleteRoom = (roomId) => {
        deleteRoom(roomId, user.uid)
        setRoomId(undefined)
    }


    return (
        <div
            onClick={() => handleRoomSelection(room.id)}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover('')}
            className='room_item-ctn'
        >
            {room.roomType === 'private' &&
                <div className={`fa-lock${isHovered === index ? ' bounce' : ''}`}>
                    <FontAwesomeIcon icon={faLock} color='orange' />
                </div>
            }
            <p>
                {room.roomName}
            </p>
            {
                isHovered === index &&
                <div className='room_tools-ctn'>
                    <Link to={`/roomsettings/${room.id}`}>
                        <FontAwesomeIcon
                            className='fa-icon'
                            icon={faCog}
                            color='white'
                        />
                    </Link>
                    <FontAwesomeIcon
                        className='fa-icon'
                        icon={faTrash}
                        onClick={() => handleDeleteRoom(room.id)}
                    />
                </div>
            }
        </div>

    )
}

export default RoomListItem
