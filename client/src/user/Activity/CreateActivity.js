import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'
import { checkPartnerDetail } from "../../utils/Function";
import TopBar from '../../utils/TopBar';

import '../../styles/activity.scss'
import Notifications_Flatline from '../../source/Notifications_Flatline.svg';

const CreateActivity = () => {
    const history = useHistory();

    const partners = useSelector(state => state.activityReducer.partner)

    const [partnerId, setPartnerId] = useState(0)

    //param function
    function goBack() {
        history.goBack()
    }

    function createActivity() {  //사진과 한 번에 보내야 하므로 일단 로컬스토리지에 저장
        if(partnerId===0) {
            alert("파트너를 선택해주세요.");
        } else {
            const res = window.confirm("등록하시겠습니까?");
            if(res) {
                localStorage.setItem('partnerId', partnerId)
                history.push('/activity-register')
            } else {
                return;
            }
        }
    }

    const today = new Date();
    const year = today.getFullYear().toString();
    const month = (today.getMonth()+1).toString();
    const date = today.getDate().toString();

    return (
        <div id="create_activity">
            <TopBar
            left="cancel"
            center={{title:"활동생성", data:null}} 
            right="create" 
            lfunc={goBack}
            rfunc={createActivity}
            size="small"/>

            <form className="create_activity_form">
                <div id="create_activity_wrap">
                    <label className="tdActTitle">활동일</label>
                    <span className="tdActCon">{year+"/"+month+"/"+date}</span>
                </div>
                <br />
                
                <div id="create_activity_wrap">
                    <label className="tdActTitle">파트너</label>
                    <select className="tdActCon" onChange={(e) => setPartnerId(e.target.value)}>
                        <option value={0}>선택</option>
                        {partners.length!==0 ?
                            partners.map((partner) => {
                                return (
                                    <option key={partner.partnerId} value={partner.partnerId}>
                                        {partner.partnerName}({checkPartnerDetail(partner.partnerDetail)})
                                    </option>
                                    )
                            })
                        :
                            <option>파트너 없음</option>
                        }
                    </select>
                </div>
            </form>

            <img src={Notifications_Flatline} height="250" width="250" id="bottom_svg" alt="walking"></img>
        </div>
    );
};

export default CreateActivity;