import { faCog, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { RoomContext } from '../contexts/RoomContext'
import './RoomList.scss'

function RoomList(props) {

    const { rooms } = props
    const { setRoomId } = useContext(RoomContext)
    const [isHovered, setIsHOvered] = useState(false)

    const handleHover = (i) => {
        setIsHOvered(i)
    }

    const handleRoomSelection = (id) => {
        setRoomId(id)
    }

    const renderRooms = () => {
        return rooms.map((room, i) => {
            return (
                <div key={i}
                    onClick={() => handleRoomSelection(room.id)}
                    onMouseEnter={() => handleHover(i)}
                    onMouseLeave={() => handleHover()}
                    className='room-ctn'
                >{room.roomName}
                    {
                        isHovered === i &&
                        <div className='room_tools-ctn'>
                            <FontAwesomeIcon className='fa-icon' icon={faCog} />
                            <FontAwesomeIcon className='fa-icon' icon={faTrash} />
                        </div>
                    }
                </div>
            )
        })
    }

    return (
        <div className='roomlist-ctn'>{renderRooms()}</div>
    )
}

export default RoomList