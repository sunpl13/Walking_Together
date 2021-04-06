import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getPartnerDetailInfo, deletePartnerHandler, changePartnerHandler } from '../../modules/partner';
import TopBar from '../../utils/TopBar'

const PartnerDetail = ({match, history}) => {
    const dispatch = useDispatch()

    const partner = useSelector(state => state.partner.partnerDetail);
    const partnerId = match.params.partnerId;
    const [updateState, setUpdateState] = useState(false);

    //state
    const [partnerName, setPartnerName] = useState(partner.partnerName);
    const [partnerDetail, setPartnerDetail] = useState(partner.partnerDetail);
    const [partnerPhoto, setPartnerPhoto] = useState(partner.partnerPhoto);
    const [selectionReason, setSelectionReason] = useState(partner.selectionReason);
    const [relationship, setRelationship] = useState(partner.relationship);
    const [gender, setGender] = useState(partner.gender);
    const [partnerBirth, setPartnerBirth] = useState(partner.partnerBirth);
    
    const [detail, setDetail] = useState("");

    //action
    const deletePartner = () => {
        const confirm = window.confirm("파트너 정보를 삭제하시겠습니까?")
        if(confirm === false) {
            return;
        } else {
            dispatch(deletePartnerHandler(partner.partnerId))
            .then(() => {
                alert("파트너 삭제가 완료되었습니다.")
            })
        }
    }

    //param function
    function goBack() {
        history.push('/partner')
    }

    function cancel() {
        const res = window.confirm("취소하시겠습니까?")
        if(res === true) {
            setUpdateState(false);
        }else{
            return;
        }
    }

    //submit function
    function submit(e) {
        e.preventDefault();

        const res = window.confirm("등록하시겠습니까?");

        if(res===true) {
            updatePartner()
        }
    }

    //button action
    const updatePartner = async() => {

        //create formdata
        const formData = new FormData();
        formData.append("partnerId", partnerId);
        formData.append("partnerName", partnerName);
        formData.append("partnerDetail", partnerDetail);
        formData.append("partnerPhoto", partnerPhoto[0]);
        formData.append("selectionReason", selectionReason);
        formData.append("relationship", relationship);
        formData.append("gender", gender);
        formData.append("partnerBirth", partnerBirth);

        await dispatch(changePartnerHandler(formData))
        .then(() => { history.push(`/partner-detail/${partnerId}`) })
    }

    //useEffect
    useEffect(() => {
        dispatch(getPartnerDetailInfo(partnerId))

        if(partnerDetail==="e") {
            setDetail("노약자")
        } else if(partnerDetail==="o") {
            setDetail("일반인")
        } else if(partnerDetail==="d") {
            setDetail("장애인")
        } else if(partnerDetail==="c") {
            setDetail("아동")
        } else if(partnerDetail==="f") {
            setDetail("임산부")
        }
    }, [partnerId])
    
    return (
        <div>
            {/* top bar */}
            {updateState===false ?
                <TopBar 
                left="null" 
                center={{title:partner.partnerName, data:null}} 
                right="cancel" 
                lfunc={null}
                rfunc={goBack}
                size="small"/>
            :
                <TopBar 
                left="cancel" 
                center={{title:"파트너 수정", data:null}} 
                right="create" 
                lfunc={cancel}
                rfunc={updatePartner}
                size="small"/>
            }


            {updateState===false ?
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
                                <img src={partner.partnerPhoto} alt="파트너 이미지"></img>
                            </td>
                        </tr>
                    </tbody>
                </table>
            :
                <form action="/partner/change" encType="multipart/form-data" method="post" onSubmit={(e) => submit(e)}>
                    <table>
                        <tr>
                            <td>파트너 구분</td>
                            <td>
                                <select value={partnerDetail||''} onChange={(e) => setPartnerDetail(e.target.value)}>
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
                                <input type="text" value={partnerName||''} onChange={(e) => setPartnerName(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>성별</td>
                            <td>
                                <input type="radio" name="gender" id="man" value="man" onChange={(e) => setGender(e.target.value)} checked={gender==="man"? "checked" : ""}/>
                                <label htmlFor="man">남성</label>
                                <input type="radio" name="gender" id="woman" value="woman" onChange={(e) => setGender(e.target.value)} checked={gender==="woman"? "checked" : ""}/>
                                <label htmlFor="woman">여성</label>
                            </td>
                        </tr>
                        <tr>
                            <td>생년월일</td>
                            <td>
                                <input type="date" value={(partnerBirth).replaceAll("/", "-")||''} onChange={(e) => setPartnerBirth(e.target.value)}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>관계</td>
                            <td>
                                <input type="text" value={relationship||''} onChange={(e) => setRelationship(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>선정이유</td>
                            <td>
                                <textarea onChange={(e) => setSelectionReason(e.target.value)} value={selectionReason||''}></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>파트너 사진</td>
                            <td>
                                {partnerPhoto!=="" ? 
                                <img src={partnerPhoto} alt="프로필" />
                                : "기본"}
                                <input type="file" accept="image/*" src={partnerPhoto||''} onChange={(e) => setPartnerPhoto(e.target.files)}></input>
                            </td>
                        </tr>
                    </table>
                </form>
            }

            <button onClick={() => setUpdateState(true)}>수정</button>
            <button onClick={() => deletePartner()}>삭제</button>
        </div>
    );
};

export default PartnerDetail;