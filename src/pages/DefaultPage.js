import React, { useState } from 'react'
import RenderColumn from '../asset/RenderColumn'
import RenderColumnTrigger from '../asset/RenderColumnTrigger'
function DefaultPage() {
    let columnList = []

    const [columnlist, setColumnlist] = useState(columnList)
    if (columnlist.length <= 4) {

    }

    let name = 'Your first List'
    return (
        <div className='d-flex pageContainer ms-1'>
            <RenderColumn name={name}/>
            <RenderColumnTrigger />
            

        </div>
    )
}

export default DefaultPage
