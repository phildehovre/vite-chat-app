import './Modal.scss'

import React from 'react'

function Modal(props) {

    const { children, showModal } = props


    return (
        <div className='modal-ctn'>{children}</div>
    )
}

export default Modal