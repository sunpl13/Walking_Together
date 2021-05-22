import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";

import { changeBar } from '../../modules/topbar';
import { checkPartnerDetail } from "../../utils/Function";
import { deletePartnerHandler, getPartnerBriefInfo } from '../../modules/partner';

const PartnerDetail = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const stdId = useSelector(state => state.user.authResult.stdId);
    const partner = useSelector(state => state.partner.partnerDetail);

    //state
    const [partnerId] = useState(match.params.partnerId);
    const [detail, setDetail] = useState("");

    //param function
    const goBack = debounce(() => {
        history.push('/user/partner');
    }, 800);

    //go partner update
    const goPartnerUpdate = debounce(() => {
        history.push(`/user/partner-update/${partnerId}`);
    }, 800);

    //delete partner
    const delPartner = debounce(async() => {
        await dispatch(deletePartnerHandler(partnerId))
        .then(() => {
            dispatch(getPartnerBriefInfo(stdId));
            history.push('/user/partner');
        })
    }, 800);

    //useEffect
    useEffect(() => {
        dispatch(changeBar("null", {title:partner.partnerName, data:null}, "cancel", "null", goBack, "small"));  //상단바 변경
        setDetail(checkPartnerDetail(partner.partnerDetail));
    }, [partner, dispatch, goBack]);
    
    return (
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
                    {/* <tr>
                        <td className="td1">파트너 사진</td>
                        <td className="td2">
                        {partner.partnerPhoto!==null?<img src={partner.partnerPhoto} alt="파트너 이미지"/>:null}
                        </td>
                    </tr> */}
                </tbody>
            </table>
            
            <div>
                <button onClick={goPartnerUpdate} className="user_btn_blue">수정</button>
                <button onClick={delPartner} className="user_btn_blue">삭제</button>
            </div>
        </div>
    );
};

export default PartnerDetail;