import React, { useState } from 'react';
import { Link } from "react-router-dom";

const UserActivity = () => {
    const [res,setRes] = useState([]);

    //filter state
    const [keyword, setKeyword] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const search = () => {
        //axios.get(`${process.env.REACT_APP_URL}/admin/activityInfo?keyword=${keyword}&from=${from}&to=${to}`)
        //.then((res) => setRes(res.data))
    }

    const excel = () => {
        //엑셀 출력
    }

    //change action
    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const changeFrom = (e) => {
        setFrom(e.target.value);
    }

    const changeTo = (e) => {
        setTo(e.target.value);
    }

    return (
        <div>

            {/* filter */}
            <div>
                <table>
                    <tr>
                        <td>기간</td>
                        <td>
                            <input type="date" value={from} onChange={changeFrom}/>~
                            <input type="date" value={to} onChange={changeTo}/>
                        </td>

                        <td><button onClick={search}>조회</button></td>
                        <td><button onClick={excel}>excel</button></td>
                    </tr>

                    <tr>
                        <td>이름/학번</td>
                        <td><input type="text" name="keyword" id="keyword" value={keyword} onChange={changeKeyword}/></td>
                    </tr>
                </table>
            </div>
            
            
            {/* search */}
            <div>
                <table>
                    <tr>
                        <th>no</th>
                        <th>이름</th>
                        <th>학번</th>
                        <th>학과</th>
                        <th>활동일</th>
                        <th>시작시간</th>
                        <th>종료시간</th>
                        <th>km(시간)</th>
                        <th>파트너</th>
                        <th>상세보기</th>
                    </tr>
                    {
                        res.map((data, index)=>{
                            <tr key={data.activityId}>
                                <td>{index}</td>
                                <td>{data.stdName}</td>
                                <td>{data.stdId}</td>
                                <td>{data.department}</td>
                                <td>{data.activityDate}</td>
                                <td>{data.startTime}</td>
                                <td>{data.endTime}</td>
                                <td>{data.totalDistance}km ({(data.totalDistance)/3})</td>
                                <td>{data.partnerName}</td>
                                <td><Link to={`admin/user-activity-detail?activityId=${data.activityId}`}>상세보기</Link></td>
                            </tr>
                        })
                    }
                </table>
            </div>
        </div>
    );
};

export default UserActivity;