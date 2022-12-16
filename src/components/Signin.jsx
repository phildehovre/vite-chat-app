import React, { useEffect } from 'react'
import './Signin.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebase'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { createUser } from '../utils/db'
import { useNavigate } from 'react-router-dom'
import { uuidv4 } from '@firebase/util'

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

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    }

    const { handleSubmit, register } = useForm({ resolver: yupResolver(schema) })
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth)

    const onSubmit = (data) => {
        if (type === 'signup') {
            createUserWithEmailAndPassword(data.email, data.password)
                .then(({ user }) => {
                    createUser(user.uid, data)
                }).catch((err) => { console.log(err) })
            if (user && !loading) navigate('/')
        }
        console.log('submitting', type)
        if (type === 'login') {
            alert('Need to implement login functionality')
        }
    }

    return (
        <div>
            {type === 'signup' &&
                <>
                    <form className='signin-ctn' onSubmit={handleSubmit(onSubmit)}>
                        <label>First Name</label>
                        <input type='text' name='firstname' {...register('firstname')} />
                        <label>Last Name</label>
                        <input type='text' name='lastname' {...register('lastname')} />
                        <label>E-mail</label>
                        <input type='text' name='email' {...register('email')} />
                        <label>Password</label>
                        <input type='password' name='password' {...register('password')} />
                        <label>Confirm your password</label>
                        <input type='password' name='passwordConfirm' {...register('passwordConfirm')} />
                        <button type='submit'>Sign in</button>
                    </form>
                    {error && <p style={{ color: 'salmon' }}>{error.message}</p>}
                    <p>Already a member? <Link to='/login'>Login!</Link></p>
                </>
            }
            {type === 'login' &&
                < form className='signin-ctn' onSubmit={handleSubmit(onSubmit)}>
                    <label>E-mail</label>
                    <input type='text' name='email' {...register('email')} />
                    <label>Password</label>
                    <input type='password' name='password' {...register('password')} />
                    <button type='submit'>Log in</button>
                    {error && <p style={{ ciolor: 'salmon' }}>{error.message}</p>}
                </form>
            }
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div >
    )
}

export default Signin

