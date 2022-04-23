import React, { useState, useRef, useEffect } from 'react'
function RenderBookMarkComponent(props) {

    const [input, setInput] = useState('');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pureURL, setPureURL] = useState('')
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;




    return (
        <div className="card p-2">
            <label for="basic-url">Website URL:</label>
            <div class="input-group">
                <input type="text" class="form-control" id={inputID} input={input} onChange={() => { setInput(document.getElementById(inputID).value) }} aria-describedby="basic-addon3"></input>
            </div>
            <div className='btn btn-primary mt-1' onClick={() => { GetWebData() }}>Generate Bookmark</div>
        </div>
    )


    function GetWebData() {
        var currInput = input;
        setPureURL(currInput.replace('', ' '));

        

    }
}

export default RenderBookMarkComponent