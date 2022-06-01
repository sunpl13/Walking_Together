import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../../styles/certification.scss";
import { debounce } from "lodash";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

const Certification = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const stdId = useSelector((state) => state.user.authResult.stdId);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const url = process.env.REACT_APP_SERVER;

  const submit = debounce(async() => {
    if (from === undefined || to === undefined) {
      alert("기간을 지정해주세요.");
    } else {
      const replaceFrom = from.replaceAll("-","/");
      const replaceTo = to.replaceAll("-","/");

      await axios
      .post(`${url}/feed/certification?stdId=${stdId}&from=${replaceFrom}&to=${replaceTo}`, {}, {
        headers : {
          'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(async(res) => {
        if (res.data.data.length !== 0) {
          history.replace({
            pathname: '/user/certification-action',
            state: {
              res: res.data,
              from: replaceFrom,
              to: replaceTo
            }
          });
        } else {
          alert("검색 결과가 없습니다.");
        }
      })
    }
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "null",
        { title: "인증서발급", data: null },
        "null",
        "null",
        "null",
        "h550"
      )
    ); //상단바 변경
  }, [dispatch]);

  return (
    <div id="certificationWrap">
      <Comment sub="C e r t i f i c a t i o n" main={"인증서를\n발급받아요!"}/>
      
      <div id="certification">
        <div id="inputSet">
          <input
            className="inputSelect"
            type="date"
            name="fromInput"
            id="fromInput"
            value={from || ""}
            onChange={(e) => setFrom(e.target.value)}
          />
          <label htmlFor="fromInput">부터</label>
        </div>
        <div id="inputSet">
          <input
            className="inputSelect"
            type="date"
            name="toInput"
            id="toInput"
            value={to || ""}
            onChange={(e) => setTo(e.target.value)}
          />
          <label htmlFor="fromInput">까지</label>
        </div>

        <div id="messages">
          <p>활동 기간을 선택한 후</p>
          <p>조회 버튼을 눌러주세요.</p>
        </div>

        <button onClick={submit} className="btn">조회</button>
      </div>
    </div>
  );
};

export default Certification;
