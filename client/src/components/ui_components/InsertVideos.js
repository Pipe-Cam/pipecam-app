import React, { useState, useRef } from "react";
// import {Link} from 'react-router-dom'

function InsertVideos() {
    const [videoLinks, setVideoLinks] = useState([])
    const videoUrlRef = useRef(null)

    const handleAddLink = () => {
        if(videoUrlRef.current.value && JSON.stringify(videoUrlRef.current.value) !== ""){
            console.log(videoUrlRef.current.value)
            setVideoLinks([...videoLinks, videoUrlRef.current.value])
            videoUrlRef.current.value = ''
        }
    }

    return (
        <>
            <div>
                <div className="row">
                    <div className="col-11">
                        <input ref={videoUrlRef} className="form-control" type="text" placeholder="e.g. http://www.example.com/video.mp4" />
                    </div>
                    <div className="col-1">
                        <button className="btn btn-secondary" onClick={handleAddLink}>+</button>
                    </div>
                </div>
                    {videoLinks.map(item=>{
                        return(
                            <div className="row" key={`${item}${Math.random(99999)}`}>
                                <div className="col-12"><a href={item} target="_blank">{item}</a></div>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default InsertVideos
