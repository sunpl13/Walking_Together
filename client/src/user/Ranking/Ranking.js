import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import "../../styles/ranking.scss";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";

import Winners_Flatline from "../../source/Winners_Flatline.svg";

const Ranking = () => {
  const dispatch = useDispatch();
  const [ranking, setRanking] = useState([]);
  const url = process.env.REACT_APP_SERVER;

  useEffect(() => {
    dispatch(
      changeBar(
        "null", 
        { title: "랭킹", data: null }, 
        "null", 
        "null", 
        "null", 
        "h250"
      )
    );
    axios
    .get(`${url}/ranking`, {
      headers : {
        'Authorization' : `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then((res) => {
      setRanking(res.data.data);
    });
    return {};
  }, [dispatch, url]);

  return (
    <div id="ranking">
      <Comment sub="R a n k" main={"활동 거리\nTop10을 확인해요!"}/>

      <div id="items">
        { ranking.length !== 0 ?
          ranking.map((item, index) => {
            if (index < 3) {   //1~3
              return (
                <div id={"p"+(index+1)} key={index+1}>
                  <span id="rank">{index+1}</span><br/>
                  <span id="name">{(item.name).slice(0, 1)+"O"+(item.name).slice(2, 3)}</span><br/>
                  <span id="dept">{item.department}</span><br/>
                  <span id="stdId">{(item.stdId).slice(0, 4)+"*****"+(item.stdId).slice(9,10)}</span><br/>
                  <span id="distance">{item.totalDistance}m</span><br/>
                </div>
              )
            } else {   /// 4~10
              return (
                <table id={"p"+(index+1)} key={index+1} className="rank_table">
                  <tbody>
                    <tr>
                      <td rowSpan="2" id="rank">{index+1}</td>
                      <td id="name">{(item.name).slice(0, 1)+"O"+(item.name).slice(2, 3)}</td>
                      <td id="dept">{item.department}</td>
                    </tr>
                    <tr>
                      <td id="distance">{item.totalDistance}m</td>
                      <td id="stdId">{(item.stdId).slice(0, 4)+"*****"+(item.stdId).slice(9,10)}</td>
                    </tr>
                  </tbody>
                </table>
              )
            }
          })
        :
        <div>
            <div className="svg_wrapper">
              <img src={Winners_Flatline} height="250" width="250" id="ranking_bottom_svg" alt="ranking"></img>
            </div>
            <p>랭킹 정보가 없습니다.</p>
          </div>
        }
      </div>
    </div>
  );
};

export default Ranking;