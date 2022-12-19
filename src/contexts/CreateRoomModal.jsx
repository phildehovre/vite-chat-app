import React, { useState } from 'react'

export const CreateRoomContext = React.createContext()

function CreateRoomModalProvider({ children }) {

    const [showModal, setShowModal] = useState(false)

    const values = {
        showModal, setShowModal
    }

    return (
        <CreateRoomContext.Provider value={values}>
            <div>{children}</div>
        </CreateRoomContext.Provider>
    )
}

export default CreateRoomModalProvider