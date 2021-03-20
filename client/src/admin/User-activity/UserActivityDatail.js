import React, { useEffect } from 'react';

const UserActivityDatail = ({match}) => {
    const [res,setRes] = useState({});

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/admin/activityInfo/detail?activityId=${match.params.activityId}`)
        .then((res) => setRes(res.data))
    },[])

    return (
        <div>
            <table>
                <tr>
                    <td>이름</td>
                    <td>{res.stdName}</td>
                </tr>
                <tr>
                    <td>학과</td>
                    <td>{res.dapartment}</td>
                </tr>
                <tr>
                    <td>학번</td>
                    <td>{res.stdId}</td>
                </tr>
                <tr>
                    <td>활동일</td>
                    <td>{res.activityDate}</td>
                </tr>
                <tr>
                    <td>파트너</td>
                    <td>{res.partnerName}</td>
                </tr>
                <tr>
                    <td>시작시간</td>
                    <td>{res.startTime}</td>
                </tr>
                <tr>
                    <td>종료시간</td>
                    <td>{res.endTime}</td>
                </tr>
                <tr>
                    <td>소감</td>
                    <td>{res.review}</td>
                </tr>
            </table>
            <div>
                {res.totalDistance}
                {(res.totalDistance/3)}시간
                <img src={res.mapPicture} />
            </div>
        </div>
    );
};

export default UserActivityDatail;