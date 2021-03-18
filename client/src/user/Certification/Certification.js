import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';


//******* capture t e s t ********

const Certification = () => {
    //const [활동내역, set활동내역] = useState({});
    const captureRef = useRef();
    const [url, setUrl] = useState();

    useEffect(() => {
        console.log('jj');
    }, [url])
    
    const getScreenshot = () => {
        html2canvas(captureRef.current)
        .then(canvas => {
            const capture = canvas.toDataURL("image/png");
            const image = capture.replace("data:image/png;base64,","");
            const param = {
                img : image
            }
            setUrl(capture);
            console.log(capture);
        })}

    return (
        <div>
            <div id="capture" ref={captureRef} >
                <p>캡쳐 이미지</p><br/><br/><br/>
                <p>test</p>
                {/*활동내역.map((활동) => {
                    <div>
                        
                    </div>
                })*/}
            </div>
            <a href={url} download>다운로드</a>
            <button onClick={getScreenshot}>Get Screenshot</button>
        </div>
    );
};

export default Certification;