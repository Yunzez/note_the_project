import React, { useState, useRef } from 'react'
import * as FaIcons from "react-icons/fa";
import EditableInput from './EditableInput';
import * as BsIcons from "react-icons/bs";
import './columnstyle.css'
import autosize from 'autosize';
import TextArea from './AutoText'
import { Progress } from 'reactstrap';
import { checkActionCode } from '@firebase/auth';
import './musicstyle.css';


function RenderMusicPlayerComponent(props) {
    const [normalInput, setNormalInput] = useState('');
    const [song, setSong] = useState(undefined);
    const [more, setMore] = useState(0)
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;
    const state = { previewAudio: new Audio() };

    function search() {
        var musicList = []
        setMore(0)
        if (!state.previewAudio.paused) {
            state.previewAudio.pause();
        }
        fetch("https://itunes.apple.com/search?term=" + normalInput.trim())
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
        } else if (song.length > 5 && more == 0) {
            const song5 = song.slice(0, 5)
            return (
                <div>
                    <div className="d-flex flex-column">
                        {song5.map((item, index) => {
                            return (
                                <div className='d-flex flex-row border mb-1 p-1'>
                                    <img className='musicCover' src={item.artworkUrl100} alt={item.trackName} title={item.trackName} onClick={() => { playAudio(item) }} />
                                    <div className='ps-2'>
                                        <div>Name: {item.trackName}</div>
                                        <div>Artist: {item.artistName}</div>
                                        <div>Collection: {item.collectionName}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='btn btn-secondary justify-content-center' onClick={() => setMore(1)}>
                        show more result...
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="d-flex flex-column">
                        {song.map((item, index) => {
                            return (
                                <div className='d-flex flex-row border mb-1 p-1'>
                                    <img className='musicCover' src={item.artworkUrl100} alt={item.trackName} title={item.trackName} onClick={() => { playAudio(item) }} />
                                    <div className='ps-2'>
                                        <div>Name: {item.trackName}</div>
                                        <div>Artist: {item.artistName}</div>
                                        <div>Collection: {item.collectionName}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div>Search for a music:</div>
            <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput} />
            <button onClick={() => { search() }} className='btn btn-primary mt-2 mb-2'><i class="fa fa-music" aria-hidden="true"></i> Search</button>
            {music()}
            {/* <form class="form-inline" method="GET" action="https://itunes.apple.com/search">
            </form> */}
        </div>
    )
}

export default RenderMusicPlayerComponent
