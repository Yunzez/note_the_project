import React, { useState, useRef } from 'react'
import * as FaIcons from "react-icons/fa";
import EditableInput from './EditableInput';
import * as BsIcons from "react-icons/bs";
import './columnstyle.css'
import autosize from 'autosize';
import TextArea from './AutoText'
import { Progress } from 'reactstrap';
import { checkActionCode } from '@firebase/auth';


function RenderMusicPlayerComponent(props) {
    const [normalInput, setNormalInput] = useState('');
    const [song, setSong] = useState(undefined);
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;
    const state = { previewAudio: new Audio() };

    function search() {
        var musicList = []
        fetch("https://itunes.apple.com/search?term=" + normalInput + "&media=music")
            .then(response => response.json())
            .then(data => {
                data.results.forEach(element => {
                    musicList.push(element);
                });
                setSong(musicList);
                console.log(song)
            })
    }

    function playAudio(track) {
        if (state.previewAudio.src !== track.previewUrl) { //if a new track to play
            state.previewAudio.pause(); //pause current
            state.previewAudio.src = track.previewUrl
            // new Audio(track.previewUrl); //create new audio
            state.previewAudio.play(); //play new
        }
        else {
            if (state.previewAudio.paused) {
                state.previewAudio.play();
            } else {
                state.previewAudio.pause();
            }
        }
    }

    var music = () => {
        if (song == undefined) {
            return (
                <div>
                    Search music from iTunes database
                </div>
            )
        } else if (song.length == 0) {
            return (
                <div>
                    No results found, please try again
                </div>
            )
        } else {
            return (
                <div className="d-flex flex-wrap">
                    {song.map((item, index) => {
                        return (
                            <div>
                                <img src={item.artworkUrl100} alt={item.trackName} title={item.trackName} onClick={() => { playAudio(item) }} />
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    return (
        <div>
            <div>Search for a music:</div>
            <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput} />
            <button onClick={() => { search() }} className='btn add-widget mt-2'><i class="fa fa-music" aria-hidden="true"></i> Search</button>
            {music()}
            {/* <form class="form-inline" method="GET" action="https://itunes.apple.com/search">
            </form> */}
        </div>
    )
}

export default RenderMusicPlayerComponent
