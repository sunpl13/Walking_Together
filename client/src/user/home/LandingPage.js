import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import '../../styles/landing.scss'

function LandingPage() {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            const token = localStorage.getItem("token");
            if(token === null) {
                history.push('/login')
            } else {
            history.push('/home')
                }
        }, 5000)
    }, [history])

    return (
        <div id="landing_back">
            <p id="landing_logo">Walking Together</p>
        </div>
    )
}

export default LandingPage
