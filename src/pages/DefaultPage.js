import React, { useState } from 'react'
import RenderColumn from '../asset/RenderColumn'
import RenderColumnTrigger from '../asset/RenderColumnTrigger'
function DefaultPage() {

    let name = 'Your first List'
    let start = [<RenderColumn name={name} />]

    const [columnlist, setColumnlist] = useState(start)
    console.log(typeof(columnlist))
    var temp = columnlist
    console.log(temp)
    return (
        <div className='d-flex pageContainer ms-1'>
            {temp.map((column, index) => {
                return (
                    <span className="col-sm-4" key={index}>
                        {column}
                    </span>
                )
            })}
            <RenderColumnTrigger columnlist={columnlist} setColumnlist={setColumnlist}/>


        </div>
    )
}

export default DefaultPage
