import React, { useState, useRef } from 'react'
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import './columnstyle.css'
import autosize from 'autosize';
import TextArea from './AutoText'
import { checkActionCode } from '@firebase/auth';
import './musicstyle.css';


function RenderMusicPlayerComponent(props) {
    const [normalInput, setNormalInput] = useState('');
    const [song, setSong] = useState(undefined);
    const [more, setMore] = useState(0)
    const [selected, setSelected] = useState(undefined)
    const [saved, setSaved] = useState(undefined)
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;


    function search() {
        if (selected != undefined) {
            document.getElementById("item" + selected).classList.remove("selected")
            setSelected(undefined)
        }

        var musicList = []
        setMore(0)
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

    function playAudio(track, index) {
        if (index == -1) {
            var player = document.getElementById('player')
            if (player.src == track.previewUrl) {
                if (player.paused) {
                    player.play()
                } else {
                    player.pause()
                }
            } else {
                player.src = track.previewUrl
                player.load()
                player.play()
            }
        } else {
            if (selected == undefined) {
                console.log("undefined")
                setSelected(index)
                document.getElementById("item" + index).classList.add("selected")
            } else {
                document.getElementById("item" + selected).classList.remove("selected")
                setSelected(index)
                document.getElementById("item" + index).classList.add("selected")
            }
            var player = document.getElementById('player')
            if (player.src == track.previewUrl) {
                if (player.paused) {
                    player.play()
                } else {
                    player.pause()
                }
            } else {
                player.src = track.previewUrl
                player.load()
                player.play()
            }
        }
    }

    function save() {
        let savedSong = song[selected]
        setSaved(savedSong)
        setSong(undefined)
    }

    function edit() {
        setNormalInput('')
        setSong(undefined)
        setSaved(undefined)
        setSelected(undefined)
        setMore(0)
    }

    var header = () => {
        if (song == undefined && saved == undefined) {
            return (
                <div>
                    <div>Search for a music:</div>
                    <audio id="player" src="123"></audio>
                    <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput} />
                    <div className='d-flex justify-content-between'>
                        <button onClick={() => { search() }} className='btn btn-primary mt-2 mb-2'><i class="fa fa-music" aria-hidden="true"></i> Search</button>
                    </div>
                </div>
            )
        } else if (selected == undefined) {
            return (
                <div>
                    <div>Search for a music:</div>
                    <audio id="player" src="123"></audio>
                    <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput} />
                    <div className='d-flex justify-content-between'>
                        <button onClick={() => { search() }} className='btn btn-primary mt-2 mb-2'><i class="fa fa-music" aria-hidden="true"></i> Search</button>
                        {/* <button onClick={() => { save() }} className='btn btn-secondary mt-2 mb-2'>Save</button> */}
                    </div>
                </div>
            )
        } else if (saved == undefined) {
            return (
                <div>
                    <div>Search for a music:</div>
                    <audio id="player" src="123"></audio>
                    <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput} />
                    <div className='d-flex justify-content-between'>
                        <button onClick={() => { search() }} className='btn btn-primary mt-2 mb-2'><i class="fa fa-music" aria-hidden="true"></i> Search</button>
                        <button onClick={() => { save() }} className='btn btn-secondary mt-2 mb-2'>Save</button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className='d-flex flex-row border mb-1 p-1 justify-content-between' id={saved}>
                        <audio id="player" src="123"></audio>
                        <div className='d-flex flex-row'>
                            <img className='musicCover' src={saved.artworkUrl100} alt={saved.trackName} title={saved.trackName} onClick={() => { playAudio(saved, -1) }} />
                            <div className='ps-2'>
                                <div>Name: {saved.trackName}</div>
                                <div>Artist: {saved.artistName}</div>
                                <div>Collection: {saved.collectionName}</div>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => { edit() }} className='btn btn-secondary mt-2 mb-2'>Edit</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    var music = () => {
        if (saved != undefined) {
            return (
                <div></div>
            )
        } else if (song == undefined) {
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
                                <div className='d-flex flex-row border mb-1 p-1' id={"item" + index}>
                                    <img className='musicCover' src={item.artworkUrl100} alt={item.trackName} title={item.trackName} onClick={() => { playAudio(item, index) }} />
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
                                <div className='d-flex flex-row border mb-1 p-1' id={"item" + index}>
                                    <img className='musicCover' src={item.artworkUrl100} alt={item.trackName} title={item.trackName} onClick={() => { playAudio(item, index) }} />
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
            {header()}
            {music()}
        </div>
    )
}

export default RenderMusicPlayerComponent
