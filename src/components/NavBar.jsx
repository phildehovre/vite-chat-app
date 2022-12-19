import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.scss'
import { auth } from '../config/firebase'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { CreateRoomContext } from '../contexts/CreateRoomModal'

function NavBar() {


    const [user] = useAuthState(auth)
    const [signOut, loading, error] = useSignOut(auth)
    const { setShowModal } = useContext(CreateRoomContext)

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

                {user &&
                    <button className='navbar-btn' onClick={() => setShowModal(true)}>Create Room!
                        <FontAwesomeIcon icon={faPlus} color='grey' />
                    </button>
                }
                {user
                    ? <>
                        {/* <p>Welcome, {user.auth.currentUser.email}</p> */}
                        <button onClick={signOutWithGoogle}>Sign out</button>
                    </>
                    : <>
                        <Link className='link-btn' to='/signup'>Sign up</Link>
                    </>
                }
            </div>
        </div>
    )
}

export default NavBar