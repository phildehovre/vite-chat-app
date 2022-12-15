import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../config/firebase'
import React from 'react'
import './Signin.scss'

function Signin() {

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider);
    }


    return (
        <div>
            <form className='signin-ctn'>
                <label>E-mail</label>
                <input type='text' name='email' />
                <label>Password</label>
                <input type='text' name='password' />
                <label>Confirm your password</label>
                <input type='text' name='passwordConfirm' />
            </form>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}

export default Signin

