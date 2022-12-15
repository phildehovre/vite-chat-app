import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { addMessage, useMessagesByOwner } from '../utils/db'
import './Chat.scss'
import { useForm } from 'react-hook-form'
import ChatMessage from './ChatMessage'
import './ChatMessage.scss'

function Chat() {

    const [user] = useAuthState(auth)
    const { register, handleSubmit, reset, formState, submittedData } = useForm()

    const { data, isLoading, Error } = useMessagesByOwner()

    console.log(data ? data : '')

    const onSubmit = (d) => {
        const { uid, photoURL } = user
        addMessage(d.chatInput, uid, photoURL)
    }

    React.useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ chatInput: '' });
        }
    }, [formState, submittedData, reset]);


    const renderChatbox = () => {
        if (data && !isLoading) {
            return data.map((msg, i) => {
                return (
                    <ChatMessage key={msg.id} msg={msg} />
                )

            }
            )
        }
    }

    return (
        <div className='chat-ctn'>
            {data
                ? <div className='messages-ctn'>{renderChatbox()}</div>
                : <h1>Loading...</h1>
            }
            <form className='chat-input' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("chatInput")} type='text' />
                <button
                >Send</button>
            </form>
        </div>
    )
}

export default Chat