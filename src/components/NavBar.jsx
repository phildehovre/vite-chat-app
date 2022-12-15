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
            <Link to='/'>Home</Link>
            <Link to='/signup'>Sign up</Link>
            {user &&
                <p>Welcome, {user.auth.currentUser.email}</p>
            }
            <button onClick={signOutWithGoogle}>Sign out</button>
        </div>
    )
}

export default NavBar