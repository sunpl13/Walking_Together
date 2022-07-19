import React, { useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import { debounce } from "lodash";

import "../../styles/admin.scss";

const PartnerInfo = () => {
  const [res,setRes] = useState([]);
  const url = process.env.REACT_APP_SERVER;

  //filter state
  const [keyword, setKeyword] = useState("");
  const [partnerDetail, setPartnerDetail] = useState("");

  const detailOption = [
    {code: "d", name: "장애인" },
    {code: "p", name: "임산부" },
    {code: "c", name: "아동"},
    {code: "e", name: "어르신"},
    {code: "o", name: "일반인"}
  ];

  //button
  const search = debounce(async() => {
    try {
      const res = await axios
      .get(`${url}/admin/partnerInfo?keyword=${keyword}&partnerDetail=${partnerDetail}`, {
        headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
      })
  
      if (res.data.data.length === 0) {
        alert("조회 결과가 없습니다.");
        setRes([]);
      } else {
        setRes(res.data.data);
      }

    } catch(err) {
      console.log(err)
    }

  }, 800);

  //change action
  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const changePartnerDetail = (e) => {
    setPartnerDetail(e.target.value);
  };

  //엑셀 출력
  const headers = [
    { label: '이름', key: 'stdName' },
    { label: '학번', key: 'stdId' },
    { label: '학과', key: 'department' },
    { label: '파트너 이름', key: 'partnerName'},
    { label: '파트너 구분', key: 'partnerDivision'},
    { label: '파트너 성별', key: 'gender'},
    { label: '파트너 생년월일', key: 'partnerBirth'},
    { label: '파트너와의 관계', key: 'relation'}
  ];


  return (
    <div>
      <div id="headerWrap">
        <span className="admin_title" id="title"># 파트너 정보</span>
      </div>

      <div id="filter">
        <div id="filterWrap">
          <label>이름/학번</label>
          <input type="text" name="keyword" id="keyword" value={keyword} onChange={changeKeyword}/>
        </div>

        <div id="filterWrap">
          <label>파트너구분</label>
          <select value={partnerDetail} onChange={changePartnerDetail}>
            <option value="">전체</option>
            {detailOption.map((detail) => {
              return <option key={detail.code} value={detail.code}>{detail.name}</option>
            })}
          </select>
        </div>

        <button onClick={search} className="admin_btn_blue" id="r2">조회</button>
        <CSVLink className="admin_btn_green" id="r1" data={res} headers={headers} filename="partner-info.csv">Excel</CSVLink>
      </div>
      
      <div id="partnerTableWrap" className="wrapper">
        <table id="partnerTable" className="table">
          <thead>
            <tr>
              <th id="thNo">no</th>
              <th id="thName">학생이름</th>
              <th id="thId">학번</th>
              <th id="thDept">학과</th>
              <th id="thName">파트너이름</th>
              <th id="thGender">성별</th>
              <th id="thBirth">생년월일</th>
              <th id="thRelation">관계</th>
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