import React, { useState } from 'react';
import CertificationAction from './CertificationAction';

const Certification = () => {
    const stdId = localStorage.getItem('user_info').replace(/"/g,"")

    const [activityList, setActivityList] = useState([])
    
    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    //
    const getCertification = () => {
        axios.post('/feed/certification', {
            stdId: stdId,
            from: from,
            to: to
        }).then((res) => {
            setActivityList(res.data)
        })
    }

    return (
        <div>
            <p>활동 기간을 선택한 후, 조회 버튼을 눌러주세요.</p>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)}/>~
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)}/>
            <button onClick={getCertification}>조회</button>

            <CertificationAction data={activityList}/>
        </div>
    );
};

export default Certification;