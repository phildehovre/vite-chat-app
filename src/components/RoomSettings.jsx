import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useParams } from 'react-router-dom'
import { auth } from '../config/firebase'
import { updateRoom, useRoomByParticipant } from '../utils/db'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import './RoomSettings.scss'

const schema = yup.object().shape({
    roomName: yup.string().required(),
    roomDescription: yup.string().required()
})

function RoomSettingsPage() {

    const params = useParams()
    const [user] = useAuthState(auth)
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const {
        data: roomData,
        isLoading: isRoomLoading,
        error: roomError
    } = useRoomByParticipant(params.roomid, user?.uid)

    const onSubmit = (data) => {
        console.log(data)
        updateRoom(params.roomid, data)
    }

    return (
        <div className='room_settings-ctn'>
            <form className='settings_form-ctn' onSubmit={handleSubmit(onSubmit)}>
                <h3 className='settings_section-label'>Room details</h3>
                {roomData && !isRoomLoading
                    ? <input name='roomName' type='text' {...register('roomName')}
                        defaultValue={roomData.roomName}
                    />
                    : <input type='text' />
                }
                {roomData && !isRoomLoading
                    ? <input name='roomDescription' type='text' {...register('roomDescription')} defaultValue={roomData.roomDescription} />
                    : <input type='text' />
                }
                {roomData && !isRoomLoading
                    ? <input name='roomParticipants' type='text' {...register('roomParticipants')} defaultValue={'Participants'} />
                    : <input type='text' />
                }
                <button type='submit'>Save</button>
            </form>
            <form className='settings_form-ctn' onSubmit={handleSubmit(onSubmit)}>
                <h3 className='settings_section-label'>Admin Settings</h3>
                {roomData && !isRoomLoading &&
                    // ? <input type='text' {...register('Admin1')} defaultValue={roomData.roomName} />
                    < input type='text' />
                }
                {roomData && !isRoomLoading &&
                    // ? <input type='text' {...register('description')} defaultValue={roomData.roomDescription} />
                    < input type='text' />
                }
                {roomData && !isRoomLoading &&
                    // ? <input type='text' {...register('participants')} defaultValue={'Participants'} />
                    < input type='text' />
                }
                <button type='submit'>Save</button>
            </form>

        </div>

    )
}

export default RoomSettingsPage
