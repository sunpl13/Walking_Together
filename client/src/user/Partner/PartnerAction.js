import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createPartnerHandler, changePartnerHandler } from '../../modules/partner';

const PartnerAction = ({type}) => {
    const dispatch = useDispatch();
    const stdId = localStorage.getItem('user_info');

    const partnerInfo = useSelector(state => state.partner.partnerInfo)
    const [partnerName, setPartnerName] = useState(partnerInfo.partnerName);
    const [partnerDetail, setPartnerDetail] = useState(partnerInfo.partnerDetail);
    const [partnerPhoto, setPartnerPhoto] = useState(partnerInfo.partnerPhoto);
    const [selectionReason, setSelectionReason] = useState(partnerInfo.selectionReason);
    const [relationship, setRelationship] = useState(partnerInfo.relationship);
    const [gender, setGender] = useState(partnerInfo.gender);
    const [partnerBirth, setPartnerBirth] = useState(partnerInfo.partnerBirth);

    useEffect(() => {
        if (type=="update"){
            console.log("update");
        }
        else {
            console.log("insert");
        }
    },[])

    //changeAction
    const nameChange = (e) => {
        setPartnerName(e.target.value);
    }

    const detailChange = (e) => {
        setPartnerDetail(e.target.value);
    }

    const photoChange = (e) => {
        setPartnerPhoto(e.target.value);
    }

    const reasonChange = (e) => {
        setSelectionReason(e.target.value);
    }

    const relationChange = (e) => {
        setRelationship(e.target.value);
    }

    const genderChange = (e) => {
        setGender(e.target.value);
    }
    
    const birthChange = (e) => {
        setPartnerBirth(e.target.value);
    }

    //button action
    const createPartner = () => {
        dispatch(createPartnerHandler(
            stdId,
            partnerName,
            partnerDetail,
            partnerPhoto,
            selectionReason,
            relationship,
            gender,
            partnerBirth
        ))
    }
    
    return (
        <div>
            <button onClick={createPartner}>생성</button>
            <table>
                <tr>
                    <td>파트너 구분</td>
                    <td>
                        <select value={partnerDetail} onChange={detailChange}>
                            <option>선택</option>
                            <option value="장애인">장애인</option>
                            <option value="임산부">임산부</option>
                            <option value="아동">아동</option>
                            <option value="노인">노인</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>
                        <input type="text" value={partnerName} onChange={nameChange}/>
                    </td>
                </tr>
                <tr>
                    <td>성별</td>
                    <td>
                        <input type="radio" name="gender" id="man" value="man" onChange={genderChange} checked={gender=="man"? "checked" : ""}/>
                        <label for="man">남성</label>
                        <input type="radio" name="gender" id="woman" value="woman" onChange={genderChange} checked={gender=="woman"? "checked" : ""}/>
                        <label for="woman">여성</label>
                    </td>
                </tr>
                <tr>
                    <td>생년월일</td>
                    <td>
                        <input type="date" value={partnerBirth} onChange={birthChange}></input>
                    </td>
                </tr>
                <tr>
                    <td>관계</td>
                    <td>
                        <input type="text" value={relationship} onChange={relationChange}/>
                    </td>
                </tr>
                <tr>
                    <td>선정이유</td>
                    <td>
                        <textarea onChange={reasonChange}>{selectionReason}</textarea>
                    </td>
                </tr>
                <tr>
                    <td>파트너 사진</td>
                    <td>
                        <img src={partnerPhoto} />
                        <input type="image" src={partnerPhoto} onChange={photoChange}>사진 변경</input>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default PartnerAction;