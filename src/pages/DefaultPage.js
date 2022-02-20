import React, { useState } from 'react'
import RenderColumn from '../asset/RenderColumn'
import RenderColumnTrigger from '../asset/RenderColumnTrigger'
function DefaultPage() {

    let name = 'Let\'s get started'
    let start = [<RenderColumn name={name} />]

    const [columnlist, setColumnlist] = useState(start)
    console.log(typeof (columnlist))
    var temp = columnlist
    console.log(temp)
    return (
        <div className='d-flex pageContainer ms-1'>
            {temp.map((column, index) => {
                return (
                    <div className="col-sm-4 col-md-3" key={index}>
                        {column}
                    </div>
                )
                })
            }
            
            <div className=" col-sm-4 col-md-3 ms-1 mt-1">
            <RenderColumnTrigger  columnlist={columnlist} setColumnlist={setColumnlist} />
            </div>
         </div>
    )
}

export default DefaultPage
