import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import '../../styles/landing.scss'

function LandingPage() {
    const history = useHistory();
    const token = localStorage.getItem("token")

    const goLogin = useCallback(() => {
        if(token === null) {
            history.push('/login')
        } else {
            history.push('/home')
        }
    }, [token, history])

    useEffect(() => {
        setTimeout(goLogin, 5000)
    }, [goLogin])

    return (
        <div id="landing_back">
            <p id="landing_logo">Walking Together</p>
        </div>
    )
}

export default LandingPage
