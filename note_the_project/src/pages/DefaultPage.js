import React, { useState } from 'react'
import RenderColumn from '../asset/RenderColumn'

function DefaultPage() {
    let columnList = []

    const [columnlist, setColumnlist] = useState(columnList)
    if (columnlist.length <= 4) {

    }

    let name = 'Your first List'
    return (
        <div className='row ms-1'>
            <RenderColumn name={name}/>
            
            
            
        </div>
    )
}

export default DefaultPage
