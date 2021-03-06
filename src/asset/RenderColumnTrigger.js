import React, { useState } from 'react'
import './columnstyle.css'

import RenderColumn from './RenderColumn';

function RenderColumnTrigger(props) {
    console.log('trigger for ' + props.id)
    var pageList = props.pageList;
    var setPageList = props.setPageList;
    var columnlist = props.columnlist;
    var setColumnlist = props.setColumnlist;
    var db = props.db;
    var user = props.user;
    var pageID = props.id
    let deleteColumn= props.deleteColumn
    let setDeletePos = props.setDeletePos

    const [input, setInput] = useState('')
    // give the window choice a hook
    const [window, setWindow] = useState(true)

    // create the first window user will see when enter
    var smallSenseBar = (
        <button className="btn btn-primary" onClick={handleOnClickExtend} >Add another column</button>
    )

    // create the second window 
    var declareWindow = (
        <div className='column-trigger p-1'>
            <div className="form-group">
                <p className="mb-1">New column:</p>
                <input className="form-control mb-1 input-name" aria-describedby="emailHelp" placeholder="Column name" onChange={
                    () => { setInput(document.getElementsByClassName('input-name')[0].value) }}></input>
            </div>
            <button className="btn btn-primary" onClick={handleOnClickSecond} >Go</button>
        </div>
    )

    // handle first click -- extend the window
    function handleOnClickExtend(e) {
        e.preventDefault();
        setWindow(!window);
    }

    // handle second click -- shrink the window and add data to the list
    function handleOnClickSecond(e) {
        e.preventDefault();

        //update new column
        var replaceColumn = [];
        var pos = columnlist.length
        var newcolumn = <RenderColumn pageID={props.id} db={db} user={user} pageList={pageList} setPageList={setPageList} name={input} pos={pos + 1} deleteColumn={deleteColumn} setDeletePos = {setDeletePos}/>
        columnlist.map(function (column, index) {
            replaceColumn.push(column)
        })
        replaceColumn.push(newcolumn)
        setColumnlist(replaceColumn);

        //update database pagelist
        var replacePageList = [];

        pageList.map((page, index) => {
            replacePageList[page.id] = page
        })

        var pageID;
        replacePageList.map((page, index) => {
            var columnCount = 0
            if (page.id == props.id) {
                var usedPage = page
                while (usedPage[columnCount]) {
                    columnCount = columnCount + 1
                }
                page[columnCount] = {
                    name: input,
                    widgets: []
                }
                replacePageList[page.id] = page
                pageID = page.id;
            }
        })

        // connect server
        var updateTarget = replacePageList[pageID]
        db.collection("users").doc(user.uid).collection("pages")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, pageID)
                    if (doc.id == pageID) {
                        console.log('found page')
                        db.collection("users").doc(user.uid).collection("pages").doc(pageID.toString()).set(updateTarget).then(() => {
                            console.log("column successfully added!");

                        }).catch((error) => {
                            console.error("Error removing document: ", error);
                        });
                    }
                })
            });


        console.log(replacePageList)
        setPageList(replacePageList);

        setInput('')
        setWindow(!window);


    }


    // return trigger
    if (window) {
        return smallSenseBar;
    } else {
        return declareWindow;
    }



}


export default RenderColumnTrigger
