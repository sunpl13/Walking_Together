import React, { useEffect, setState } from 'react';
import { HiOutlineRefresh } from "react-icons/hi";

const Ranking = () => {
    const [ranking, setRanking] = setState([])

    useEffect(() => {
        refresh();
    }, [])

    //refresh
    const refresh = () => {
        axios.get(`/ranking`)
        .then((res) => {
            setRanking(res.data);
        })
    }

    return (
        <div>
            <h1>ranking</h1>
            <HiOutlineRefresh onClick={refresh}/>
            {ranking[0]===undefined ?
                ranking.map((item, index) => {
                    return (
                        <div id={index+1}>
                            <p>{index+1}</p>
                            <img src={item.profile} alt="프로필이미지"/>
                            <p>{item.name}</p>
                            <p>{item.department}</p>
                            <p>{item.stdId}</p>
                            <p>{item.totalDistance}</p>
                            <p>{(item.totalDistance)/3}시간</p>
                        </div>
                )})
            :
                <p>랭킹 정보가 없습니다.</p>
            }
        </div>
    );
};

export default Ranking;