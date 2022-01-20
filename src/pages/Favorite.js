import React from 'react'
import { useNavigate } from 'react-router-dom'

function Favorite(props) {
    const navigate = useNavigate()
    if (props.user) {
        return (
            <div>
                this is favorite
            </div>
        )
    } else {
        navigate("/")
        window.location.reload(true)
    }
}

export default Favorite
