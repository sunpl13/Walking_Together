import {React, useState} from 'react'

function ActivityRegister() {
    const [picture, setpicture] = useState("")


    return (
        <div>
            <div className = "picture_container">
                사진은 여기에 넣으면 댑니다
            </div>
            <button>다시촬영</button>
            <button>등록</button>
        </div>
    )
}

export default ActivityRegister
