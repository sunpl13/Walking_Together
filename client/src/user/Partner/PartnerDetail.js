import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deletePartnerHandler } from '../../modules/partner';

const PartnerDetail = () => {
    const dispatch = useDispatch()
    const partner = useSelector(state => state.partner.partnerDetail);

    const deletePartner = () => {
        dispatch(deletePartnerHandler(partner.partnerId))
    }
    
    return (
        <div>
            <TopBar left="back" center={{title:partner.partnerName, data:null}} right="cancel" size="small"/>

            <table>
                <tr>
                    <td>파트너 구분</td>
                    <td>{partner.partnerDivision}</td>
                </tr>
                <tr>
                    <td>성별</td>
                    <td>{partner.gender}</td>
                </tr>
                <tr>
                    <td>생년월일</td>
                    <td>{partner.partnerBirth}</td>
                </tr>
                <tr>
                    <td>관계</td>
                    <td>{partner.relationship}</td>
                </tr>
                <tr>
                    <td>선정이유</td>
                    <td>{partner.selectionReason}</td>
                </tr>
                <tr>
                    <td>파트너 사진</td>
                    <td>
                        <img src={partner.partnerPhoto}></img>
                    </td>
                </tr>
            </table>

            <Link to='/partner-action'>수정</Link>
            <button onClick={() => deletePartner()}>삭제</button>
        </div>
    );
};

export default PartnerDetail;