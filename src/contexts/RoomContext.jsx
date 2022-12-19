import React, { useState } from 'react'

export const RoomContext = React.createContext()

function RoomContextProvider({ children }) {

    const [roomId, setRoomId] = useState('mHCsbpaIgOl2PUnCS6kE')

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