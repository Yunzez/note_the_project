import React from 'react'
import { useNavigate } from 'react-router-dom'

function Favorite(props) {
    const navigate = useNavigate()
    const pageList = props.pageList
    const like = props.like
    if (props.user) {
        return (
            <div>
                <h3 className='ms-2'> Favorite</h3>
                {pageList.map((item, index) => {
                    if (like.indexOf(pageList[index].id) > -1) {
                        return (
                            <div className="list-group-item ms-3 me-3"><a href={"/pages/" + pageList[index].id}>{item.title}</a></div>
                        )
                    }
                    
                })}
            </div>
        )
    } else {
        navigate("/")
        window.location.reload(true)
    }
}

export default Favorite
