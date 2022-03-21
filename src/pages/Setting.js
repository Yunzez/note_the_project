import React from 'react'
import { useNavigate } from 'react-router-dom'

function Setting(props) {
    const navigate = useNavigate()
    if (props.user) {
        return (
            <div>
                <h3 className='ms-2'> Setting</h3>
                <ul className="list-group m-2">
                    <li className="list-group-item mb-1">Cras justo odio</li>
                    <li className="list-group-item mb-1">Dapibus ac facilisis in</li>
                    <li className="list-group-item mb-1">Morbi leo risus</li>
                    <li className="list-group-item mb-1">Porta ac consectetur ac</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
        )
    } else {
        navigate("/")
        window.location.reload(true)
    }
}

export default Setting
