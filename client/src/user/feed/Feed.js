import {React, useState} from 'react'
import Select from 'react-select'
import {sort} from '../find_id/options'

function Feed() {
    const [FeedInfo, setFeedInfo] = useState([])

    const list = FeedInfo.map(
        item => (
            <table key = {item.id}>
                <tr>
                    <td>날짜</td>
                    <td>진행상태</td>
                </tr>
                <tr>
                    <td>3km</td>
                    <td>파트너 명</td>
                </tr>
            </table>
        )
    )
    return (
        <div>
            <Select options = {sort}/>
            <button>활동 생성</button>
            <div>
                여기에 list 입력
            </div>
        </div>
    )
}

export default Feed
