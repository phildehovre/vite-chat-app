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
    firstname: yup.string().required('Your first name is required'),
    lastname: yup.string().required('Your last name is required'),
    email: yup.string().required('Your email is required'),
    password: yup.string().min(8).required('You must enter a valid password'),
    passwordConfirm: yup.string().oneOf([yup.ref("password")], 'The passwords must be matching')
});


function Signin(props) {

    const { type } = props

    const navigate = useNavigate()
    const Auth = getAuth()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    }

    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)
    const [signInWithEmailAndPassword, signedInUser, signInIsLoading, signedInError] = useSignInWithEmailAndPassword(auth)


    const onSubmit = (data) => {
        if (type === 'signup') {
            createUserWithEmailAndPassword(data.email, data.password)
                .then((userCredentials) => {
                    createUser(userCredentials.user.uid, data).then(() => {
                        navigate('/')
                    })
                }).catch((err) => { console.log(err) })
            if (user && !loading) navigate('/')
        }
    }
    const handleLogin = (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                // navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }


    return (
        <div>
            {type === 'signup' &&
                <>
                    <form className='signin-ctn' onSubmit={handleSubmit(onSubmit)}>
                        <label>First Name</label>
                        <input type='text' name='firstname' {...register('firstname')} />
                        <p className='form-error'>{errors.firstname?.message}</p>
                        <label>Last Name</label>
                        <input type='text' name='lastname' {...register('lastname')} />
                        <p className='form-error'>{errors.lastname?.message}</p>
                        <label>E-mail</label>
                        <p className='form-error'>{errors.email?.message}</p>
                        <input type='text' name='email' {...register('email')} />
                        <label>Password</label>
                        <p className='form-error'>{errors.password?.message}</p>
                        <input type='password' name='password' {...register('password')} />
                        <label>Confirm your password</label>
                        <p className='form-error'>{errors.passwordConfirm?.message}</p>
                        <input type='password' name='passwordConfirm' {...register('passwordConfirm')} />
                        <button type='submit'>{loading ? <Spinner /> : 'Sign in'}</button>
                    </form>
                    {error && <p style={{ color: 'salmon' }}>{error.message}</p>}
                    <p>Already a member? <Link to='/login'>Login!</Link></p>
                </>
            }
            {type === 'login' &&
                < form className='signin-ctn' onSubmit={handleLogin}>
                    <label>E-mail</label>
                    <input type='text' name='email' {...register('email')} />
                    <label>Password</label>
                    <input type='password' name='password' {...register('password')} />
                    <button type='submit'>{signInIsLoading ? <Spinner /> : 'Sign in'}</button>
                    {error && <p style={{ ciolor: 'salmon' }}>{error.message}</p>}
                </form>
            }
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div >
    )
}

export default Signin

