import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import TopBar from '../../utils/TopBar';
import { checkPartnerDetail } from "../../utils/Function";

const PartnerDetail = ({match}) => {
    const history = useHistory();

    const [timer, setTimer] = useState(0); // 디바운싱 타이머

    const partner = useSelector(state => state.partner.partnerDetail);

    //state
    const [partnerId] = useState(match.params.partnerId);
    const [detail, setDetail] = useState("");

    //param function
    function goBack() {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                history.push('/user/partner');
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

    //useEffect
    useEffect(() => {
        setDetail(checkPartnerDetail(partner.partnerDetail));
    }, [partner]);
    
    return (
        <div>
            <header>
            {/* top bar */}
                <TopBar 
                    left="null" 
                    center={{title:partner.partnerName, data:null}} 
                    right="cancel" 
                    lfunc={null}
                    rfunc={goBack}
                    size="small"/>
            </header>
            <div id="partner_detail">
                <table id="partner_detail_table">
                    <tbody>
                        <tr>
                            <td className="td1">파트너 구분</td>
                            <td className="td2">{detail}</td>
                        </tr>
                        <tr>
                            <td className="td1">성별</td>
                            <td className="td2">{partner.gender}</td>
                        </tr>
                        <tr>
                            <td className="td1">생년월일</td>
                            <td className="td2">{partner.partnerBirth}</td>
                        </tr>
                        <tr>
                            <td className="td1">관계</td>
                            <td className="td2">{partner.relationship}</td>
                        </tr>
                        <tr>
                            <td className="td1">선정이유</td>
                            <td className="td2">{partner.selectionReason}</td>
                        </tr>
                        <tr>
                            <td className="td1">파트너 사진</td>
                            <td className="td2">
                            {partner.partnerPhoto!==null?<img src={partner.partnerPhoto} alt="파트너 이미지"/>:null}
                            </td>
                        </tr>
                    </tbody>
                </table>
                
                <div>
                    <Link to={`/user/partner-update/${partnerId}`} className="user_btn_blue">수정</Link>
                </div>
            </div>
        </div>
    );
};

export default PartnerDetail;