import {React, useState} from 'react'

function ActivityRegister() {
    const [picture, setpicture] = useState("")


    return (
        <div>
            <div className = "picture_container">

            </div>
            <button>다시촬영</button>
            <button>등록</button>
        </div>
    )
}

export default ActivityRegister
