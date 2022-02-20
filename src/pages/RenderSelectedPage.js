import { linearProgressClasses } from '@mui/material'
import React from 'react'
import DefaultPage from './DefaultPage'

function RenderSelectedPage(props) {
    console.log('hellp there ' + props.pageList)
    var redirectID = props.id;
    var idcount = 0;
    if (props.pageList){
        return (
            <div>
                
                {props.pageList.map((line, index) => {
                    var key = toString(idcount)
                    if((line.key.id) == redirectID){
                        return (
                            <div key={index}>
                                <DefaultPage page={line}/>
                            </div>
                        )
                    }else{
                        idcount = idcount+1;
                    }
                   
                })}
    
            </div>
        )
    }else{
        return(
            <div>
                
            </div>
        )
    }
    

}

export default RenderSelectedPage