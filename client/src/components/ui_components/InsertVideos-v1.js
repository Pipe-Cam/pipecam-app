import React, {useState, useEffect} from 'react'

function InsertVideos() {
    const mediaElementSchema = {
        id: '',
        placeholder: '',
        value: '',
        description: ''
    }

    const [mediaElementArr, setMediaElementArr] = useState([{
        ...mediaElementSchema,
        id: 'video_url_1',
        placeholder: 'Video #1'
    }])

    useEffect(()=>{
        console.log(mediaElementArr)
    },[])

    useEffect(()=>{
        console.log(mediaElementArr)
    },[mediaElementArr])

    useEffect(()=>{
        console.log(mediaElementArr)
    },[,mediaElementArr])



    const addElement = (e) => {
        console.log("addElement")
        let elemNumber = mediaElementArr.length + 1
        let tmpMediaElementArr = mediaElementArr

        let newElem = {
            ...mediaElementSchema,
            id: `video_url_${elemNumber}`,
            placeholder: `Video #${elemNumber}`
        }

        tmpMediaElementArr.push(newElem)

        setMediaElementArr(tmpMediaElementArr)
    }

    return(
        <>
            <div>
                {/* insert videos... */}
                <MediaElements {...{mediaElementArr}}/>
                <div className="row py-2">
                    <div className="col-12 text-right">
                        <button className="btn btn-secondary text-white" onClick={addElement}>+</button>
                    </div>
                </div>
            </div>  
        </>
    )
}    

export default InsertVideos

const MediaElements = (props) => {
    const {mediaElementArr} = props
    return(
        <>
            {mediaElementArr.map((item, index) => {
                return(
                    <>
                        <div className="row" key={JSON.stringify(item) + index.toString()}>
                            <div className="col-6">
                                <label for={item.id}>URL ({item.placeholder})</label>
                                <input className="form-control" type="text" id={item.id} name={item.id} placeholder={'url'} defaultValue={item.value}/>
                            </div>
                            <div className="col-6">
                                <label for={`${item.id}_description`}>Description ({item.placeholder})</label>
                                <input className="form-control" type="text" id={`${item.id}_description`} name={`${item.id}_description`} placeholder={'description'} defaultValue={item.description}/>
                            </div>
                        </div>
                    </>
                )
            })}
        </>
    )
}

// const MediaElement = (props) => {
//     const {item, index} = props
//     return(
//         <>
//             <input className="" type="text" id={`video_url_${index + 1}`} placeholder={`Video #${index + 1}`}/>
//         </>
//     )
// }


/*
    const [videoURLs, setVideoURLs] = useState([1])
    const [inputCount, setElementCount] = useState(1)

    const generateElementArr = (num) => {
        var inputArr = []
        for(let i=num; i === 0; i--){
            inputArr.push(i.toString())
        }
        return inputArr
    }

    useEffect(()=>{
        setElementCount(inputCount + 1)
        console.log(generateElementArr(5))
    },[])

    useEffect(()=>{
        console.log(videoURLs)
    },[videoURLs])
return (
        <div>
            insert videos...
            {generateElementArr(inputCount).map((item, index) => {
                return(
                    <>
                        <div className="row">
                            <div className="col-12">
                                <MediaElement {...{item, index}}/>
                            </div>
                        </div>
                    </>
                )
            })}
            <div className="row py-2">
                <div className="col-12 text-right">
                    <button className="btn btn-secondary text-white" onClick={()=>{setElementCount(inputCount + 1)}}>+</button>
                </div>
            </div>
        </div>
    )
}
*/ 