import React from 'react'
import { useNavigate } from 'react-router-dom'

function Setting(props) {
    const navigate = useNavigate()
    if (props.user) {
        return (
            <div>
                this is setting
            </div>
        )
    } else {
        navigate("/")
        window.location.reload(true)
    }
}

export default Setting
