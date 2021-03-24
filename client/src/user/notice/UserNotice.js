import {React, useState} from 'react'
import {FaSearch} from 'react-icons/fa';

function UserNotice() {

    const [search, setsearch] = useState("");
    const [notice, setnotice] = useState([]);

    const onChangeHandler = e => {
        setsearch(e.target.value)
    }



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

export default UserNotice
