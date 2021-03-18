import {React, useState} from 'react'

function SmallNotice() {
    const [notice, setnotice] = useState([])

    const list = notice.map(                //td style-left : none으로 좌우 테두리 없애기
        item => (
            <tr key = {item.id}>
                <td>{item.title}</td>
                <td>{item.date}</td>
            </tr>
        )
    )


    return (
        <table>
            
        </table>
    )
}

export default SmallNotice
