import React, { useEffect } from 'react'
import './Signin.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAuth, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebase'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { createUser } from '../utils/db'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

const schema = yup.object().shape({
    email: yup.string().required('Your email is required'),
    password: yup.string().min(8).required('You must enter a valid password'),
});


function Login(props) {

    const { type } = props

    const navigate = useNavigate()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    }

    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);


    const handleLogin = (data) => {
        const { password, email } = data
        signInWithEmailAndPassword(email, password).then((userCredentials) => {
            navigate('/')
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    console.log(errors)
    return (
        <div>

            < form className='signin-ctn' onSubmit={handleSubmit(handleLogin)}>
                <label>E-mail</label>
                <input type='text' name='email' {...register('email')} />
                <label>Password</label>
                <input type='password' name='password' {...register('password')} />
                <button type='submit'>{loading ? <Spinner /> : 'Sign in'}</button>
                {error && <p style={{ ciolor: 'salmon' }}>{error.message}</p>}
            </form>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div >
    )
}

export default Login

