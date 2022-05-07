import React, { useState, useRef } from 'react'
import * as FaIcons from "react-icons/fa";
import EditableInput from './EditableInput';
import * as BsIcons from "react-icons/bs";
import './columnstyle.css'
import autosize from 'autosize';
import TextArea from './AutoText'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";


function RenderCalendarComponent(props) {
    const [normalInput, setNormalInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    var pos = props.pos
    var setupID = 'normaltext-setup' + pos;
    var showID = 'normaltext-show' + pos;
    var inputID = 'component-normal-textinput' + pos;

    return (
        <div>
            <div id={setupID}>
                <div className='d-flex justify-content-between'>
                    <div>Start Time:
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="p"
                            timeIntervals={15}
                            dateFormat="Pp"
                        />
                    </div>
                    <div>End Time:
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            minDate={startDate}
                            minTime={startDate}
                            maxTime={setHours(setMinutes(new Date(), 59), 23)}
                            showTimeSelect
                            timeFormat="p"
                            timeIntervals={15}
                            dateFormat="Pp"
                        />
                        {/* minTime={() => { 
                        if (startDate.getFullYear() == endDate.getFullYear() && startDate.getMonth() == endDate.getMonth() && startDate.getDay() == endDate.getDay()) {
                            console.log(startDate.getFullYear(), startDate.getMonth(), startDate.getDay())
                            return setHours(setMinutes(new Date(), startDate.getMinutes()), startDate.getHours())
                        } else {
                            return setHours(setMinutes(new Date(), 0), 0)
                        }
                    }} */}
                    </div>
                </div>
                <div>Event: <TextArea className="note form-control " id={inputID} normalInput={normalInput} setNormalInput={setNormalInput} /></div>

                <div className='d-flex flex-row-reverse'>
                    <button onClick={() => { setupTextBox() }} className='btn add-widget mt-2'>Save</button>
                </div>
            </div>
            <div id={showID} className='d-none '>

                <div>
                    <div>{normalInput}: </div>
                    <div className='d-flex'>
                        <div className='calendar-displaytime'>
                            <p>From <b>{startDate.toISOString().split('T')[0]} {startDate.toLocaleTimeString()}</b></p>
                        </div>
                        <div className='calendar-displaytime ms-1'>
                            <p>to <b>{endDate.toISOString().split('T')[0]} {endDate.toLocaleTimeString()}</b></p>
                        </div>
                        <div className='btn float-end' onClick={() => {
                            document.getElementById(setupID).classList.remove("d-none")
                            document.getElementById(showID).classList.add('d-none')
                        }}><BsIcons.BsPencilSquare /></div>
                    </div>
                </div>
            </div>
        </div>
    )

    function setupTextBox() {
        document.getElementById(setupID).classList.add('d-none')
        document.getElementById(showID).classList.remove('d-none')
    }
}

export default RenderCalendarComponent