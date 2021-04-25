import React from 'react'
import TopBar from './TopBar'

const MainContainer = ({header, children}) => {
    return (
        <div>
            {header && (
                <TopBar
                left ={header.left}
                center = {header.center}
                right = {header.right}
                lfunc = {header.lfunc}
                rfunc = {header.rfunc}
                size = {header.size}
                />    
            )}
            {children}
        </div>
    )
}

export default MainContainer
