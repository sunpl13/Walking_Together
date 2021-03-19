import React, { useState } from 'react';
import axios from 'axios';

const PartnerInfo = () => {
    const [res,setRes] = useState([]);

    //filter state
    const [keyword, setKeyword] = useState("");
    const [partnerDivision, setPartnerDivision] = useState("");

    const divisionOption = [
        {code: "d", name: "장애인" },
        {code: "p", name: "임산부" },
        {code: "c", name: "아동"},
        {code: "e", name: "어르신"}
    ]

    //button
    const search = () => {
        axios.get(`${process.env.REACT_APP_URL}/admin/partnerInfo?keyword=${keyword}&partnerDivision=${partnerDivision}`)
        .then((res) => setRes(res.data))
    }

    const excel = () => {
        //엑셀 출력
    }

    //change action
    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const changePartnerDivision = (e) => {
        setPartnerDivision(e.target.value);
    }

    return (
        <div>
            <div id="filter">
                <table>
                    <tr>
                        <td>이름/학번</td>
                        <td><input type="text" name="keyword" id="keyword" value={keyword} onChange={changeKeyword}/></td>

                        <td><button onClick={search}>조회</button></td>
                    </tr>

                    <tr>
                        <td>파트너구분</td>
                        <td>
                            <select value={partnerDivision} onChange={changePartnerDivision}>
                                {divisionOption.map((division) => {
                                    return <option value={division.code}>{division.name}</option>
                                })}
                            </select>
                        </td>

                        <td><button onClick={excel}>excel</button></td>
                    </tr>
                </table>
            </div>
            
            <div id="res">
                <table>
                    <tr>
                        <th>no</th>
                        <th>학생이름</th>
                        <th>학번</th>
                        <th>학과</th>
                        <th>파트너이름</th>
                        <th>성별</th>
                        <th>생년월일</th>
                        <th>관계</th>
                        <th>구분</th>
                    </tr>

                    {res.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{data.stdName}</td>
                                <td>{data.stdId}</td>
                                <td>{data.department}</td>
                                <td>{data.partnerName}</td>
                                <td>{data.gender}</td>
                                <td>{data.partnerBirth}</td>
                                <td>{data.relation}</td>
                                <td>{data.partnerDivision}</td>
                            </tr>
                    )})}
                </table>
            </div>
        </div>
    );
};

export default PartnerInfo;