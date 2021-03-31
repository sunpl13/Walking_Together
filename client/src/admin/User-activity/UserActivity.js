import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const UserActivity = () => {
    const [res,setRes] = useState([]);

    //filter state
    const [keyword, setKeyword] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [activityDivision, setActivityDivision] = useState(0);

    const divisionOption = [
        {code: 0, name: "일반 걷기" },
        {code: 1, name: "돌봄 걷기" }
    ]

    const search = () => {
        axios.get(`/admin/activityInfo?keyword=${keyword}&from=${from}&to=${to}&activityDivision=${activityDivision}`)
        .then((response) => {
            if(response.data.status===200) {
                setRes(response.data.data)
            }
            else {
                alert("에러가 발생했습니다.")
            }
        })
    }

    const excel = () => {
        //엑셀 출력
    }

    //change action
    const changeKeyword = (e) => {  //keyword change
        setKeyword(e.target.value);
    }

    const changeFrom = (e) => {  //from change
        setFrom(e.target.value);
    }

    const changeTo = (e) => {  //to change
        setTo(e.target.value);
    }

    const changeActivityDivision = (e) => {  //ativityDivision change
        setActivityDivision(e.target.value)
    }

    return (
        <div>

            {/* filter */}
            <div>
                <table>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>기간</td>
                            <td>
                                <input type="date" value={from} onChange={changeFrom}/>~
                                <input type="date" value={to} onChange={changeTo}/>
                            </td>
                            <td>
                                <select value={activityDivision} onChange={changeActivityDivision}>
                                    {divisionOption.map((division) => {
                                        return <option value={division.code}>{division.name}</option>
                                    })}
                                </select>
                            </td>

                            <td><button onClick={search}>조회</button></td>
                            <td><button onClick={excel}>excel</button></td>
                        </tr>

                        <tr>
                            <td>이름/학번</td>
                            <td><input type="text" name="keyword" id="keyword" value={keyword} onChange={changeKeyword}/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            
            {/* search */}
            <div>
                <table>
                    <thead>
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
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserActivity;