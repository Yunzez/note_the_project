import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function PublicLoginPage(props) {
    console.log('in public login')
    return (
        <div>npm install firebase
            login new user
            {/* have to give onClick a function instead of a call back, else it will run on the first time */}
            <Link to='/home' onClick={() => {
                props.setLogin(true)
            }}  >Skip Login for now</Link>
        </div>
    )
}

export default PublicLoginPage
