import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { addMessage, useMessagesByOwner } from '../utils/db'
import './Chat.scss'
import { useForm } from 'react-hook-form'
import ChatMessage from './ChatMessage'
import './ChatMessage.scss'
import { useIsMutating } from 'react-query'

function Chat() {

    const [user] = useAuthState(auth)
    const { register, handleSubmit, reset, formState, submittedData } = useForm()

    const { data, isLoading, Error } = useMessagesByOwner()
    const scrollRef = useRef()

    useEffect(() => {
        if (data && data.length > 0 && !isLoading) {
            scrollRef.current.scrollIntoView({ behaviour: 'smooth' })
        }
    })


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
        if (data && data.length !== 0 && !isLoading) {
            return data.map((msg, i) => {
                return (
                    <>
                        <ChatMessage key={i} msg={msg} />
                        {data.length - 1 === i &&
                            <div ref={scrollRef}></div>
                        }
                    </>
                )
            }
            )
        }
        return (
            <p>Start the conversation!</p>
        )
    }

    return (
        <div className='chat-ctn'>
            {data
                ? <>
                    <div className='messages-ctn'>
                        {renderChatbox()}
                    </div>
                    <form className='chat-input' onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("chatInput")} type='text' />
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