import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import TopBar from '../../utils/TopBar';
import '../../styles/certification.scss';

const Certification = () => {
    const history = useHistory();

    const stdId = localStorage.getItem('user_info')
    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    const submit = async() => {
        if(from===undefined||to===undefined) {
            alert("기간을 지정해주세요.")
        } else {
            const replaceFrom = from.replaceAll("-","/")
            const replaceTo = to.replaceAll("-","/")

            await axios.post(`/feed/certification?stdId=${stdId}&from=${replaceFrom}&to=${replaceTo}`, {}, {
                headers : {'Authorization' : `Bearer ${localStorage.getItem("token")}`}
            }).then(async(res) => {
                if(res.data.data.length!==0) {
                    history.push({
                        pathname: '/user/certification-action',
                        state: {
                            res: res.data,
                            from: replaceFrom,
                            to: replaceTo
                        }
                    })
                } else {
                    alert("검색 결과가 없습니다.")
                }
            })
        }
    }

    return (
        <div id="certificationWrap">
            <header>
                <TopBar
                    left="null" 
                    center={{title:"인증서 발급", data:null}} 
                    right="null" 
                    lfunc={null}
                    rfunc={null}
                    size="small"/>
            </header>
            <div id="certification">
                <div id="pSet">
                    <p>활동 기간을 선택한 후</p>
                    <p>조회 버튼을 눌러주세요.</p>
                </div>

                <div id="inputSet">
                    <input className="inputSelect" type="date" name="fromInput" id="fromInput" value={from||''} onChange={(e) => setFrom(e.target.value)}/>
                    <label htmlFor="fromInput">부터</label>
                </div>
                <div id="inputSet">
                    <input className="inputSelect" type="date" name="toInput" id="toInput" value={to||''} onChange={(e) => setTo(e.target.value)}/>
                    <label htmlFor="fromInput">까지</label>
                </div>
                
                <div id="buttonSet">
                    <button onClick={submit} className="user_btn_blue">조회</button>
                </div>
            </div>
        </div>
    );
};

export default Certification;