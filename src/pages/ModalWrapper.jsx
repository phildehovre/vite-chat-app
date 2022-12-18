import React, { useContext } from 'react'
import CreateRoomModal from '../components/CreateRoomModal'
import { CreateRoomContext } from '../contexts/CreateRoomModal'

function ModalWrapper() {

    const { showModal } = useContext(CreateRoomContext)



    return (
        <>
            {showModal &&
                <CreateRoomModal showModal={showModal} />
            }
        </>
    )
}

export default ModalWrapper