import { faCog, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { RoomContext } from '../contexts/RoomContext'
import './RoomList.scss'
import RoomListItem from './RoomListItem'

function RoomList(props) {

    const { rooms } = props
    const { setRoomId } = useContext(RoomContext)


    const handleRoomSelection = (id) => {
        setRoomId(id)
    }

    const renderRooms = () => {
        return rooms.map((room, i) => {
            return (
                <RoomListItem
                    room={room}
                    key={i}
                    index={i}
                    handleRoomSelection={handleRoomSelection}
                />
            )
        })
    }

    return (
        <div className='roomlist-ctn'>{renderRooms()}</div>
    )
}

export default RoomList