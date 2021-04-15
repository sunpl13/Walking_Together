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
        {code: 2, name: "전체 걷기" },
        {code: 0, name: "일반 걷기" },
        {code: 1, name: "돌봄 걷기" }
    ]

    const search = () => {
        if(from===""||to==="") {
            alert("조회 기간을 지정해주세요.")
        } else {
            if(keyword==="") {
                axios.get(`/admin/activityInfo?from=${from.replaceAll("-","/")}&to=${to.replaceAll("-","/")}&activityDivision=${activityDivision}`)
                .then((response) => {
                    if(response.data.data.length!==0) {
                        setRes(response.data.data)
                    }
                    else {
                        setRes([])
                        alert("결과가 없습니다.")
                    }
                })
            } else {
                axios.get(`/admin/activityInfo?keyword=${keyword}&from=${from.replaceAll("-","/")}&to=${to.replaceAll("-","/")}&activityDivision=${activityDivision}`)
                .then((response) => {
                    if(response.data.data.length!==0) {
                        setRes(response.data.data)
                    }
                    else {
                        setRes([])
                        alert("결과가 없습니다.")
                    }
                })
            }
        }
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
            <div id="headerWrap">
                <span className="admin_title" id="title"># 회원 활동</span>
            </div>

            {/* filter */}
            <div id="filter">
                <div id="filterWrap">
                    <label>기간</label>
                    <input type="date" value={from} onChange={changeFrom}/>~
                    <input type="date" value={to} onChange={changeTo}/>
                </div>

                <button onClick={search} className="admin_btn_blue" id="r1">조회</button>
            </div>
            
            <div id="filter">
                <div id="filterWrap">
                    <label>이름/학번</label>
                    <input type="text" name="keyword" id="keyword" value={keyword} onChange={changeKeyword}/>
                </div>

                <div id="filterWrap">
                    <label>활동 구분</label>
                    <select onChange={changeActivityDivision} defaultValue='2' value={activityDivision}>
                        {divisionOption.map((division) => {
                            return <option key={division.code} value={division.code}>{division.name}</option>
                        })}
                    </select>
                </div>

                <button onClick={excel} className="admin_btn_green" id="r1">excel</button>
            </div>
            
            
            {/* search */}
            <div id="activityTableWrap" className="wrapper">
                <table id="activityTable" className="table">
                    <thead>
                        <tr>
                            <th id="thNo">no</th>
                            <th id="thName">이름</th>
                            <th id="thId">학번</th>
                            <th id="thDept">학과</th>
                            <th id="thDate">활동일</th>
                            <th id="thTime">시작 시간</th>
                            <th id="thTime">종료 시간</th>
                            <th id="thDistance">활동 거리</th>
                            <th id="thName">파트너</th>
                            <th id="thButton">상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                    { res.length!==0 ?
                        res.map((data, index)=>{
                            return (
                                <tr key={data.activityId}>
                                    <td>{index+1}</td>
                                    <td>{data.stdName}</td>
                                    <td>{data.stdId}</td>
                                    <td>{data.department}</td>
                                    <td>{data.activityDate}</td>
                                    <td>{data.startTime.slice(6,8)+":"+data.startTime.slice(8,10)+":"+data.startTime.slice(10,12)}</td>
                                    <td>
                                        {data.endTime!==null ? 
                                        data.endTime.slice(6,8)+":"+data.endTime.slice(8,10)+":"+data.endTime.slice(10,12)
                                        : "-"}
                                    </td>
                                    <td>{data.totalDistance}km</td>
                                    <td>{data.partnerName}</td>
                                    <td><Link to={`/admin/user-activity-detail/${data.activityId}`}>상세보기</Link></td>
                                </tr>
                            )
                        })
                    :
                        <tr>
                            <td colSpan="10">
                                활동 정보가 없습니다.
                            </td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserActivity;