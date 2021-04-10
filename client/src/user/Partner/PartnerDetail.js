import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { deletePartnerHandler } from '../../modules/partner';
import TopBar from '../../utils/TopBar';
import { checkPartnerDetail } from "../../utils/Function";

const PartnerDetail = ({match}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const partner = useSelector(state => state.partner.partnerDetail);

    //state
    const [partnerId] = useState(match.params.partnerId);
    
    const [detail, setDetail] = useState("");

    // //action
    // const deletePartner = () => {
    //     const confirm = window.confirm("파트너 정보를 삭제하시겠습니까?")
    //     if(confirm === false) {
    //         return;
    //     } else {
    //         dispatch(deletePartnerHandler(partnerId))
    //         .then(() => {
    //             alert("파트너 삭제가 완료되었습니다.")
    //         })
    //     }
    // }

    //param function
    function goBack() {
        history.push('/partner')
    }

    //useEffect
    useEffect(() => {
        setDetail(checkPartnerDetail(partner.partnerDetail))
    }, [])
    
    return (
        <div>
            {/* top bar */}
            <TopBar 
            left="null" 
            center={{title:partner.partnerName, data:null}} 
            right="cancel" 
            lfunc={null}
            rfunc={goBack}
            size="small"/>

            <table>
                <tbody>
                    <tr>
                        <td>파트너 구분</td>
                        <td>{detail}</td>
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
                            <img src={partner.partnerPhoto||''} alt="파트너 이미지"></img>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div>
                <Link to={`/partner-update/${partnerId}`}>수정</Link>
                {/* <button onClick={() => deletePartner()}>삭제</button> */}
            </div>
        </div>
    );
};

export default PartnerDetail;