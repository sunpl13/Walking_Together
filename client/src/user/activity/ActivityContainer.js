import {React,useState} from 'react'

function ActivityContainer() {
    const [toggle, settoggle] = useState(false)

    return (
        <div>
            <button>종료</button>
        </div>
    )
}

export default ActivityContainer
