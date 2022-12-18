import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { CreateRoomContext } from '../contexts/CreateRoomModal'
import Modal from './Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { addRoom, useAddRoom } from '../utils/db'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import Spinner from './Spinner'

const schema = yup.object().shape({
    roomName: yup.string().required('You must choose a name for your room.'),
    roomDescription: yup.string().required('Please describe the subject and/or rules of the room.')
})

function CreateRoomModal(props) {

    const [submitting, setSubmitting] = useState(false)
    const [user] = useAuthState(auth)
    const { showModal, setShowModal } = useContext(CreateRoomContext)
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (e.target.className === 'modal-ctn') {
                setShowModal(false)
            }
        })
    })

    const onSubmit = (data) => {
        setSubmitting(true)
        addRoom(data, user.uid).then(() => {
            setSubmitting(false)
            setShowModal(false)
        })

    }

    console.log(submitting)

    return (
        <Modal showModal={showModal}>
            <div className='room_modal-ctn'>
                <h3>Name your room: </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type='text' name='roomName' {...register('roomName')} />
                    {errors.roomName && <p className='form-error'>{errors.roomName.message}</p>}
                    <input type='text' name='roomDescription' {...register('roomDescription')} />
                    {errors.description && <p className='form-error'>{errors.description.message}</p>}
                    <button type='submit'>{submitting ? <Spinner /> : 'Create room'}</button>
                    {/* <button type='submit'>{'Create room'}</button> */}
                </form>
                <FontAwesomeIcon className='close-btn' icon={faClose} onClick={() => setShowModal(false)} />
            </div>
        </Modal>
    )
}

export default CreateRoomModal