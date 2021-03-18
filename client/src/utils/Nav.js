import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
    return (
        <nav>
            <Link>활동</Link>
            <Link>피드</Link>
            <Link>홈</Link>
            <Link>랭킹</Link>
            <Link>마이페이지</Link>
        </nav>
    )
}

export default Nav
