import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { changePartnerHandler, getPartnerBriefInfo } from '../../modules/partner';
import TopBar from '../../utils/TopBar';

const PartnerUpdate = ({match}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const ref = useRef();

    const stdId = localStorage.getItem('user_info').replace(/"/g,"");

    const partner = useSelector(state => state.partner.partnerDetail)  //PARTNER-LIST
    const partnerId = useState(match.params.partnerId);

    const [partnerName, setPartnerName] = useState(partner.partnerName);
    const [partnerDetail, setPartnerDetail] = useState(partner.partnerDetail);
    const [partnerPhoto, setPartnerPhoto] = useState([]);
    const [selectionReason, setSelectionReason] = useState(partner.selectionReason);
    const [relationship, setRelationship] = useState(partner.relationship);
    const [gender, setGender] = useState(partner.gender);
    const [partnerBirth, setPartnerBirth] = useState(partner.partnerBirth);

    //submit function
    function submit(e) {
        e.preventDefault();

        if(partnerName===""||partnerDetail===""||partnerPhoto[0]===undefined||selectionReason===""||relationship===""||gender===""||partnerBirth===""){
            alert("모든 항목을 기입해주세요.");
        } else {
            const res = window.confirm("등록하시겠습니까?");
            if(res===true) {
                updatePartner()
            }
        }
    }

    //param function
    const updatePartner = async() => {
        //create formdata
        const formData = new FormData();
        formData.append("partnerId", partnerId[0]);
        formData.append("partnerName", partnerName);
        formData.append("partnerDetail", partnerDetail);
        formData.append("partnerPhoto", partnerPhoto[0]);
        formData.append("selectionReason", selectionReason);
        formData.append("relationship", relationship);
        formData.append("gender", gender);
        formData.append("partnerBirth", partnerBirth);

        await dispatch(changePartnerHandler(formData))
        .then(async() => {
            await dispatch(getPartnerBriefInfo(stdId))
            .then(() => {
                alert("정보 수정이 완료되었습니다.")
                history.push('/partner')
            })
        })
    }

    function cancel() {
        const res = window.confirm("취소하시겠습니까?")
        if(res === true) {
            history.push('/partner')
        }else{
            return;
        }
    }

    return (
        <div>
            {/* top bar */}
            <TopBar 
            left="cancel" 
            center={{title:"파트너 수정", data:null}} 
            right="create" 
            lfunc={cancel}
            rfunc={submit}
            size="small"/>
            
            <form action="/partner/change" className="partner_form" id={ref} encType="multipart/form-data" method="post" onSubmit={(e) => submit(e)}>
                <label>파트너 구분</label>
                <select value={partnerDetail||''} onChange={(e) => setPartnerDetail(e.target.value)}>
                    <option>선택</option>
                    <option value="d">장애인</option>
                    <option value="p">임산부</option>
                    <option value="c">아동</option>
                    <option value="e">노인</option>
                    <option value="o">일반인</option>
                </select>
                <br/>

                <label>이름</label>
                <input type="text" value={partnerName||''} onChange={(e) => setPartnerName(e.target.value)}/>
                <br/>

                <label>성별</label>
                <span id="form_gender">
                    <label htmlFor="man" id="small_label">남성</label>
                    <input type="radio" name="gender" id="man" className="radio" value="남성" onChange={(e) => setGender(e.target.value)} checked={gender==="남성"? "checked" : ""}/>
                    <label htmlFor="woman" id="small_label">여성</label>
                    <input type="radio" name="gender" id="woman" className="radio" value="여성" onChange={(e) => setGender(e.target.value)} checked={gender==="여성"? "checked" : ""}/>
                </span>
                <br/>

                <label>생년월일</label>
                <input type="date" value={(partnerBirth).replaceAll("/", "-")||''} onChange={(e) => setPartnerBirth(e.target.value)}></input>
                <br/>

                <label>관계</label>
                <input type="text" value={relationship||''} onChange={(e) => setRelationship(e.target.value)}/>
                <br/>

                <div id="reason_wrap">
                    <label>선정이유</label>
                    <textarea onChange={(e) => setSelectionReason(e.target.value)} value={selectionReason||''}></textarea>
                </div>
                <br/>

                <label>파트너 사진</label>
                <input type="file" accept="image/*" src={partnerPhoto||''} onChange={(e) => setPartnerPhoto(e.target.files)}></input>
                <br/>

                <input type="hidden" name="partnerId" value={partnerId}/>
            </form>
        </div>
    );
};

export default PartnerUpdate;