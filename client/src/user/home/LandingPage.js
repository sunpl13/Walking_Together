import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import '../../styles/landing.scss'

function LandingPage() {
    const history = useHistory();

    useEffect(() => {
        setTimeout(goLogin, 5000)
    }, [])

    const goLogin = () => {
        history.push('/login')
    }

    return (
        <div id="landing_back">
            <p id="landing_logo">Walking Together</p>
        </div>
    )
}

export default LandingPage
