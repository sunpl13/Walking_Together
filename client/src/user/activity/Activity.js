import {React, useState} from 'react'

function Activity() {
    const [distance, setdistance] = useState("")

    return (
        <div>
            <div className = "distanceContainer">
                <span>{distance}KM</span>
            </div>
            <div>여기에 맵이 들어가요</div>
        </div>
    )
}

export default Activity
