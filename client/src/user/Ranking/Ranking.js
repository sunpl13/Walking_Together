import React, { useEffect, setState } from 'react';

const Ranking = () => {
    const [ranking, setRanking] = setState({})

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/ranking`)
        .then((res) => {
            setRanking(res.data);
        })
    }, [])

    return (
        <div>
            <h1>ranking</h1>

            {ranking.map((item, index) => {
                return (
                    <div id={index}>
                        <p>{index}</p>
                        <img src={item.profile} alt="프로필이미지"/>
                        <p>{item.name}</p>
                        <p>{item.department}</p>
                        <p>{item.stdId}</p>
                        <p>{item.totalDistance}</p>
                        <p>{(item.totalDistance)/3}시간</p>
                    </div>
                )})}
        </div>
    );
};

export default Ranking;