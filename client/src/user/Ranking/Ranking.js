import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from '../../utils/TopBar';
import { CgProfile } from "react-icons/cg";
import '../../styles/ranking.scss';

import Winners_Flatline from "../../source/Winners_Flatline.svg";

const Ranking = () => {
    const [ranking, setRanking] = useState([])

    useEffect(() => {
        refresh()
        return {}
    }, [])

    //refresh
    const refresh = async() => {
        await axios.get(`/ranking`,
         {
            headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
        })
        .then((res) => {
            setRanking(res.data.data)
        })
    }

    return (
        <div id="ranking">
            <header>
                <TopBar
                    left="null" 
                    center={{title:"랭킹", data:null}} 
                    right="refresh" 
                    lfunc={null}
                    rfunc={refresh}
                    size="small"/>
            </header>
            <div className="svg_wrapper">
                <img src={Winners_Flatline} height="250" width="250" id="ranking_bottom_svg" alt="ranking"></img>
            </div>

            <div id="items">
                {ranking.length!==0 ?
                    ranking.map((item, index) => {
                        return (
                            <span id={"p"+(index+1)} key={index+1}>
                                <span id="rank">{index+1}</span><br/>

                                <CgProfile size=
                                {index===0 ? "110" : "90"}
                                color="#9a9a9a"/><br/>
                                
                                <span id="name">{(item.name).slice(0, 1)+"O"+(item.name).slice(2, 3)}</span><br/>
                                <span id="dept">{item.department}</span><br/>
                                <span id="stdId">{item.stdId}</span><br/>
                                <span id="distance">{item.totalDistance}km</span><br/>
                            </span>
                    )})
                :
                    <p>랭킹 정보가 없습니다.</p>
                }
            </div>
        </div>
    );
};

export default Ranking;