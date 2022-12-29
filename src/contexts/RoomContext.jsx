import React, { useState, useEffect } from 'react'

export const RoomContext = React.createContext()

function RoomContextProvider({ children }) {

    const [roomId, setRoomId] = useState('OCacsKVLncKpkkZ7OyAI')

    useEffect(() => {
        if (!roomId) {
            setRoomId('OCacsKVLncKpkkZ7OyAI')
        }
    })

    const values = {
        roomId, setRoomId
    }

    return (
        <RoomContext.Provider value={values}>
            {children}
        </RoomContext.Provider>
    )
}

export default RoomContextProvider