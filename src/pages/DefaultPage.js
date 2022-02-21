import React, { useState, useEffect } from 'react'
import RenderColumn from '../asset/RenderColumn'
import RenderColumnTrigger from '../asset/RenderColumnTrigger'
import RenderSelectedPage from './RenderSelectedPage'
import {Outlet, useParams } from 'react-router-dom'

// it preloads all the pages
function DefaultPage(props) {
    // const { currentPageID } = useParams()
    // const [output, setOutput] = useState([])
    // var output = props.output;
    // var setOutput = props.setOutput;
    // var pageList = props.pageList;
    // var pageListRendered = {};
    // pageList.map((page, index) => {
    //     var pageID = page.id
    //     pageListRendered[pageID] = <RenderSelectedPage page={page} />
    // })
    
    // console.log(currentPageID, pageListRendered[currentPageID])
    // //setOutput(pageListRendered[currentPageID]) 
    

    // console.log('inside the render page, rendering page' + currentPageID)
    // useEffect(() => {
        
    //         console.log('in use effect')
    //         setOutput(pageListRendered[currentPageID]);
    //         console.log('set output to ' + output)
    //         return(<div>{output}</div>)
    //   }, [currentPageID]);
    

    //   console.log(!output)
    // if(!output){
    //     setOutput(<div>'select a page to get started'</div>)
    // }


    //   console.log(output)
    return (<div><Outlet/></div>)

   //return (<div>testing <Outlet/></div>)


}

export default DefaultPage
