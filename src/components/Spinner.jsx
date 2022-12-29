import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './Spinner.scss'

function Spinner() {
    return (
        <FontAwesomeIcon className='spinner-ctn' icon={faSpinner} />
    )
}

export default Spinner