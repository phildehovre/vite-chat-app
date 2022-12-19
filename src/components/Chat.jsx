import React, { useContext, useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { useForm } from 'react-hook-form'
import { uuidv4 } from '@firebase/util'

import { addMessage, useMessagesByRoom, useRoomByParticipant } from '../utils/db'
import { RoomContext } from '../contexts/RoomContext'
import Spinner from './Spinner'
import ChatMessage from './ChatMessage'
import './Chat.scss'
import './ChatMessage.scss'

function Chat() {


    const [user] = useAuthState(auth)
    const { register, handleSubmit, reset, formState, submittedData } = useForm()
    const { roomId } = useContext(RoomContext)

    const { data, isLoading, error } = useMessagesByRoom(roomId, user.uid)
    const scrollRef = useRef()

    useEffect(() => {
        if (data && data.length > 0 && !isLoading) {
            scrollRef.current.scrollIntoView({ behaviour: 'smooth' })
        }
    })

    const {
        data: roomData,
        isLoading: isRoomLoading,
        error: roomError
    } = useRoomByParticipant(roomId, user.uid)


    const onSubmit = (d) => {
        const { uid, photoURL } = user
        addMessage(d.chatInput, roomId, uid, photoURL)
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ chatInput: '' });
        }
    }, [formState, submittedData, reset]);


    const renderChatbox = () => {
        if (data && data.length !== 0 && !isLoading) {
            return data.map((msg, i) => {
                return (
                    <>
                        <ChatMessage key={uuidv4()} msg={msg} />
                        {data.length - 1 === i &&
                            <div ref={scrollRef}></div>
                        }
                    </>
                )
            }
            )
        }
        return (
            <h4>Start the conversation!</h4>
        )
    }

    return (
        <div className='chat-ctn'>
            {roomData && !isRoomLoading
                ? <h3 className='roomName'>{roomData.roomName}</h3>
                : <Spinner />
            }
            {data
                ? <>
                    <div className='messages-ctn'>
                        {renderChatbox()}
                    </div>
                    <form className='chat-input' onSubmit={handleSubmit(onSubmit)}>
                        <input autoComplete='off' {...register("chatInput")} type='text' />
                        <button
                        >Send</button>
                        <div></div>
                    </form>
                </>
                : <h1>Loading...</h1>
            }
        </div>
    )
}

export default Chat