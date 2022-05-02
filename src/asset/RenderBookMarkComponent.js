import React, { useState, useRef, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
function RenderBookMarkComponent(props) {

    const [input, setInput] = useState('');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pureURL, setPureURL] = useState('')

    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var spinID = 'spin' + pos;
    var hidetextID = "hidetext" + pos;
    var inputID = 'component-normal-textinput' + pos;


    const [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()


    return (
        <React.Fragment>
            {isLoaded ? (
                <div>{items.des}</div>
            ) : (
                <div className="card p-2">
                <label for="basic-url">Website URL:</label>
                <div class="input-group">
                    <input type="text" class="form-control" id={inputID} input={input} onChange={() => { setInput(document.getElementById(inputID).value) }} aria-describedby="basic-addon3"></input>
                </div>
                <div className='btn btn-primary mt-1' onClick={() => { GetWebData() }}>
                    <div id={spinID} className="d-none">
                        <ClipLoader size={50} />
                    </div>
                    <p id={hidetextID}>Generate Bookmark</p></div>
            </div>
                
            )}

        </React.Fragment>
    )


    function GetWebData() {
        document.getElementById(spinID).classList.toggle('d-none')
        document.getElementById(hidetextID).classList.toggle('d-none')
        var currInput = input;
        setPureURL(currInput.replace(' ', ''));
        var fulllink = "http://localhost:3001/user/getwebmeta/?url=" + pureURL
        // var fulllink= "https://note-the-project-n.herokuapp.com/user/getwebmeta?url=" + pureURL
        fulllink = fulllink.replace(' ', '')
        console.log(fulllink)
        fetch(fulllink)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    console.log(items)
                    document.getElementById(hidetextID).classList.toggle('d-none')
                    document.getElementById(spinID).classList.toggle('d-none')
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )

    }
}

export default RenderBookMarkComponent