import React from 'react'
import '../../styles/activity-start.scss';
import {useHistory} from 'react-router-dom'

function ActivityStart() {

    const history = useHistory();


    return (
        <div>
            <button className = "circle" onClick = {() => {history.push('/createactivity')}}>시작</button>
        </div>
    )
}

export default ActivityStart
