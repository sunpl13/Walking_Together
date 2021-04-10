import React, { useState } from 'react';
import axios from 'axios';

const PartnerInfo = () => {
    const [res,setRes] = useState([]);

    //filter state
    const [keyword, setKeyword] = useState("");
    const [partnerDetail, setPartnerDetail] = useState("");

    const detailOption = [
        {code: "d", name: "장애인" },
        {code: "p", name: "임산부" },
        {code: "c", name: "아동"},
        {code: "e", name: "어르신"},
        {code: "o", name: "일반인"}
    ]

    //button
    const search = () => {
        axios.get(`/admin/partnerInfo?keyword=${keyword}&partnerDetail=${partnerDetail}`)
        .then((res) => {
            if(res.data.data.length===0) {
                alert("조회 내용이 없습니다.")
            } else {
                setRes(res.data.data)
            }
        })
    }

    const excel = () => {
        //엑셀 출력
    }

    //change action
    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const changePartnerDetail = (e) => {
        setPartnerDetail(e.target.value);
    }

    return (
        <div>
            <div id="filter">
                <table>
                    <tbody>
                        <tr>
                            <td>이름/학번</td>
                            <td><input type="text" name="keyword" id="keyword" value={keyword} onChange={changeKeyword}/></td>

                            <td><button onClick={search}>조회</button></td>
                        </tr>

                        <tr>
                            <td>파트너구분</td>
                            <td>
                                <select value={partnerDetail} onChange={changePartnerDetail}>
                                    <option value="">선택</option>
                                    {detailOption.map((detail) => {
                                        return <option key={detail.code} value={detail.code}>{detail.name}</option>
                                    })}
                                </select>
                            </td>

                            <td><button onClick={excel}>excel</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div id="res">
                <table>
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>학생이름</th>
                            <th>학번</th>
                            <th>학과</th>
                            <th>파트너이름</th>
                            <th>성별</th>
                            <th>생년월일</th>
                            <th>관계</th>
                        </tr>
                    </thead>

                    <tbody>
                        {res.length!==0 ?
                            res.map((data, index) => {
                                return (
                                    <tr key={index+1}>
                                        <td>{index+1}</td>
                                        <td>{data.stdName}</td>
                                        <td>{data.stdId}</td>
                                        <td>{data.department}</td>
                                        <td>{data.partnerName}</td>
                                        <td>{data.gender}</td>
                                        <td>{data.partnerBirth}</td>
                                        <td>{data.relation}</td>
                                    </tr>
                            )})
                        : 
                            <tr>
                                <td colSpan="9">
                                    파트너 정보가 없습니다.
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PartnerInfo;