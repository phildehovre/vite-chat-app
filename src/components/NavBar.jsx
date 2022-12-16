import React from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'
import { auth } from '../config/firebase'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'

function NavBar() {


    const [user] = useAuthState(auth)
    const [signOut, loading, error] = useSignOut(auth)

    const signOutWithGoogle = () => {
        signOut().then((res) => {
            console.log('sucessfully logged out')
        })
    }

    return (
        <div className='navbar-ctn'>
            <h1 className='logo-ctn'>ChatApp</h1>
            <div className='links-ctn'>
                <Link className='link-btn' to='/'>Home</Link>

                {user
                    ? <>
                        <p>Welcome, {user.auth.currentUser.email}</p>
                        <button onClick={signOutWithGoogle}>Sign out</button>
                    </>
                    : <Link className='link-btn' to='/signup'>Sign up</Link>
                }
            </div>
        </div>
    )
}

export default NavBar