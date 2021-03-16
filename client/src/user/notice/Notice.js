import {React, useState} from 'react'
import {FaSearch} from 'react-icons'

function Notice() {
    
    const [notice, setnotice] = useState([])

    const allList = notice.map(
        item => (
            <tr key = {item.id}>
                <td>{item.title}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
            </tr>
        )
    )

    return (
        <div>
            <div>
                <input type = "text"></input>
                <FaSearch/>
            </div>
            <table></table>
        </div>
    )
}

export default Notice
