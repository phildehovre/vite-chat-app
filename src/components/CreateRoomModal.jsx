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
import { RoomContext } from '../contexts/RoomContext'

const schema = yup.object().shape({
    roomName: yup.string().required('You must choose a name for your room.'),
    roomDescription: yup.string().required('Please describe the subject and/or rules of the room.')
})

function CreateRoomModal(props) {

    const [submitting, setSubmitting] = useState(false)
    const [user] = useAuthState(auth)
    const { setRoomId, roomId } = useContext(RoomContext)
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
        addRoom(data, user.uid).then((res) => {
            setSubmitting(false)
            setShowModal(false)
        });

    }



    return (
        <Modal showModal={showModal}>
            <div className='room_modal-ctn'>
                <h2>Name your room: </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type='text' autoComplete='off'
                        name='roomName'
                        {...register('roomName')} />
                    {errors.roomName && <p className='form-error'>{errors.roomName.message}</p>}
                    <h2>Describe your room: </h2>
                    <input
                        type='text'
                        name='roomDescription' autoComplete='off'
                        {...register('roomDescription')} />
                    {errors.description && <p className='form-error'>{errors.description.message}</p>}
                    <h2>Visibility: </h2>
                    <select
                        name='roomType' autoComplete='off'
                        {...register('roomType')}>
                        <option className='visibility-option' value='public'>Public</option>
                        <option value='private'>Private</option>
                        <option value='hidden'>Hidden</option>
                    </select>
                    <button
                        type='submit'>{addRoom.isLoading ? <Spinner /> : 'Create room'}</button>
                </form>
                <FontAwesomeIcon className='close-btn' icon={faClose} onClick={() => setShowModal(false)} />
            </div>
        </Modal>
    )
}

export default CreateRoomModal