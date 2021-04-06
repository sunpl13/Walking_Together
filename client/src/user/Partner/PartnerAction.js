import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createPartnerHandler } from '../../modules/partner';
import TopBar from '../../utils/TopBar';

const PartnerAction = ({history}) => {
    const dispatch = useDispatch();

    const stdId = localStorage.getItem('user_info').replace(/"/g,"");
    
    const [partnerName, setPartnerName] = useState("");
    const [partnerDetail, setPartnerDetail] = useState("");
    const [partnerPhoto, setPartnerPhoto] = useState([]);
    const [selectionReason, setSelectionReason] = useState("");
    const [relationship, setRelationship] = useState("");
    const [gender, setGender] = useState("");
    const [partnerBirth, setPartnerBirth] = useState("");

    //param function
    function cancel() {
        const res = window.confirm("취소하시겠습니까?");
        if(res===true) {
            return history.goBack();
        }
        else {
            return;
        }
    }

    function submit(e) {
        e.preventDefault();

        const res = window.confirm("등록하시겠습니까?");

        if(res===true) {
            createPartner()
        }
    }

    //button action
    const createPartner = async() => {

        //create formdata
        const formData = new FormData();
        formData.append("stdId", stdId);
        formData.append("partnerName", partnerName);
        formData.append("partnerDetail", partnerDetail);
        formData.append("partnerPhoto", partnerPhoto[0]);
        formData.append("selectionReason", selectionReason);
        formData.append("relationship", relationship);
        formData.append("gender", gender);
        formData.append("partnerBirth", partnerBirth);

        await dispatch(createPartnerHandler(formData))
        .then(() => { history.push('/partner') })
    }
    
    return (
        <div>
            <TopBar 
            left="cancel" 
            center={{title:"파트너 등록", data:null}} 
            right="create" 
            lfunc={cancel}
            rfunc={submit}
            size="small"/>

            <form action="/partner/create" encType="multipart/form-data" method="post" onSubmit={(e) => submit(e)}>
                <table>
                    <tbody>
                        <tr>
                            <td>파트너 구분</td>
                            <td>
                                <select name="partnerDetail" value={partnerDetail||''} onChange={(e) => setPartnerDetail(e.target.value)}>
                                    <option>선택</option>
                                    <option value="d">장애인</option>
                                    <option value="p">임산부</option>
                                    <option value="c">아동</option>
                                    <option value="e">노인</option>
                                    <option value="o">일반인</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td>
                                <input type="text" name="partnerName" value={partnerName||''} onChange={(e) => setPartnerName(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>성별</td>
                            <td>
                                <input type="radio" name="gender" id="man" value="남성" onChange={(e) => setGender(e.target.value)} checked={gender==="man"? "checked" : ""}/>
                                <label htmlFor="man">남성</label>
                                <input type="radio" name="gender" id="woman" value="여성" onChange={(e) => setGender(e.target.value)} checked={gender==="woman"? "checked" : ""}/>
                                <label htmlFor="woman">여성</label>
                            </td>
                        </tr>
                        <tr>
                            <td>생년월일</td>
                            <td>
                                <input type="date" name="partnerBirth" value={partnerBirth||''} onChange={(e) => setPartnerBirth(e.target.value)}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>관계</td>
                            <td>
                                <input type="text" name="relationship" value={relationship||''} onChange={(e) => setRelationship(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>선정이유</td>
                            <td>
                                <textarea name="selectionReason" onChange={(e) => setSelectionReason(e.target.value)} value={selectionReason||''}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>파트너 사진</td>
                            <td>
                                <input type="file" name="partnerPhoto" accept="image/*" src={partnerPhoto||''} onChange={(e) => setPartnerPhoto(e.target.files)}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default PartnerAction;