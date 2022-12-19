import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import './RoomList.scss'

function RoomListItem({ room, index }) {

    const [isHovered, setIsHOvered] = useState(false)

    const params = useParams()

    console.log(params)

    const handleHover = (i) => {
        setIsHOvered(i)
    }

    return (
        <div
            onClick={() => handleRoomSelection(room.id)}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover()}
            className='room_item-ctn'
        >{room.roomName}
            {
                isHovered === index &&
                <div className='room_tools-ctn'>
                    <Link to={`/roomsettings/${room.id}`}>
                        <FontAwesomeIcon
                            className='fa-icon'
                            icon={faCog}
                        />
                    </Link>
                    <FontAwesomeIcon
                        className='fa-icon'
                        icon={faTrash} />
                </div>
            }
        </div>

    )
}

export default RoomListItem
