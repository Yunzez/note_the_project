import React, { useState, useRef, useEffect } from 'react'
import BeatLoader from "react-spinners/BeatLoader";
import './columnstyle.css'
function RenderBookMarkComponent(props) {

    const [input, setInput] = useState('');
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    var fulllink = "https://note-the-project-n.herokuapp.com/user/getwebmeta?url="
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
                <div className="card p-2">
                    <div className='row'>
                        <div className='col-2'>
                            <img className='web-image' src={items.image}></img>
                        </div>
                        <div className='col-10'>
                            <div className='mb-1 webbookmark-title' ><a target="_blank" href={items.url}>{items.title}</a></div>
                            <div><p class="text-muted webbookmark-des">{items.des}</p></div>
                        </div>
                    </div>
                </div>

            ) : (
                <div className="card p-2">
                    <label for="basic-url">Website URL:</label>
                    
                    <div class="input-group">
                        <input type="text" class="form-control" id={inputID} input={input} onChange={() => { setInput(fulllink + document.getElementById(inputID).value); console.log(input) }} aria-describedby="basic-addon3"></input>
                    </div>
                    
                    <div className='btn btn-primary mt-1' onClick={() => { GetWebData() }}>
                        <div id={spinID} className="d-none">
                            <BeatLoader size={15} margin={4}/>
                        </div>
                        <p id={hidetextID}>Generate Bookmark</p>
                        
                        </div>
                    
                </div>

            )}

        </React.Fragment>
    )


    function GetWebData() {
        document.getElementById(spinID).classList.toggle('d-none')
        document.getElementById(hidetextID).classList.toggle('d-none')
        // var fulllink = "http://localhost:3001/user/getwebmeta/?url=" + pureURL
        var currInput = input
        currInput = currInput.replace('', ' ')
        console.log(currInput)
        fetch(currInput)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                    console.log(result)
                    // document.getElementById(hidetextID).classList.toggle('d-none')
                    // document.getElementById(spinID).classList.toggle('d-none')
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