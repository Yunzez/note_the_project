import React, { useState, useEffect } from 'react'
import DefaultPage from './DefaultPage'
import RenderColumnTrigger from '../asset/RenderColumnTrigger'
import RenderColumn from '../asset/RenderColumn'
import * as FcIcons from "react-icons/fc";
import * as FaIcons from "react-icons/fa";
import { useParams } from 'react-router'
function RenderSelectedPage(props) {
    const { currentPageID } = useParams()
    var user = props.user
    var db = props.db
    var output = props.output;
    var setOutput = props.setOutput;
    var pageList = props.pageList;
    var setPageList = props.setPageList;
    var pageListRendered = {};
    pageList.map((page, index) => {
        var pageID = page.id
        pageListRendered[pageID] = <ConstructPage page={page} pageID={pageID} />
    })


    useEffect(() => {
        setOutput(pageListRendered[currentPageID]);
        console.log('set output to ' + output)
        return (<div>{output}</div>)
    }, [currentPageID]);





    function ConstructPage(props) {
        const [deletePos, setDeletePos] = useState(-1)
        var page = props.page
        var columnCount = 0;
        var temp = [];
        let pageID = props.pageID

        while (page[columnCount]) {
            let name = page[columnCount].name

            // to match with render column trigger, which also has a pos to define the location of each column 
            var pos = columnCount + 1
            let newColumn = <RenderColumn name={name} db={db} pageID={page.id} user={user} pageList={pageList} setPageList={setPageList} pos={pos} deleteColumn={deleteColumn} setDeletePos={setDeletePos} />
            temp.push(newColumn)
            columnCount = columnCount + 1;
        }
        const [columnlist, setColumnlist] = useState(temp)

        function deleteColumn(pos) {
            console.log(pos)
            console.log("deleting")
            if (pos >= 0) {
                let newPageList = [];
                console.log(pageList)
                pageList.map((item) => {
                    if (item.id == pageID) {
                        delete item[pos - 1]
                    }
                    newPageList.push(item)
                })

                let newColumnList = []
                for (let i in columnlist){
                    if (i != pos-1){
                        newColumnList.push(columnlist[i])
                    }
                }
                setColumnlist(newColumnList)
                console.log(newPageList)
                setPageList(newPageList)
            }

        }

        var IconDetector = () => {
            if (page.icon == 'Ok') {
                console.log('icon ok')
                return (
                    <div><FcIcons.FcOk /></div>
                )
            } else {
                return (<div><FaIcons.FaFileAlt /></div>)
            }
        }
        console.log(IconDetector)
        return (
            <div>
                <div className='container d-flex card-body'>
                    <div className='h5 ms-3 '><IconDetector /></div>
                    <p className='h4 ms-1'>{page.title}</p>
                </div>

                <div className='d-flex pageContainer ms-1'>
                    {columnlist.map((column, index) => {
                        return (
                            <div className="col-sm-4 col-md-3" key={index}>
                                {column}
                            </div>
                        )
                    })
                    }

                    <div className=" col-sm-4 col-md-3 ms-1 mt-1">
                        <RenderColumnTrigger pageList={pageList} setPageList={setPageList} columnlist={columnlist} setColumnlist={setColumnlist} id={page.id} db={db} user={user} deleteColumn={deleteColumn} setDeletePos={setDeletePos} />
                    </div>
                </div>
            </div>
        )
    }


    return (<div> {output}</div>)

}

export default RenderSelectedPage