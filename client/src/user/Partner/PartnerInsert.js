import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";

import { createPartnerHandler, getPartnerBriefInfo } from "../../modules/partner";
import { changeBar } from "../../modules/topbar";
import Comment from "../../utils/Comment";
import { lim_kor, lim_al, lim_Specialc } from "../../utils/options";

const PartnerInsert = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const stdId = useSelector(state => state.user.authResult.stdId);
  
  const [partnerName, setPartnerName] = useState("");
  const [partnerDetail, setPartnerDetail] = useState("");
  const [partnerPhoto, setPartnerPhoto] = useState([]);
  const [selectionReason, setSelectionReason] = useState("");
  const [relationship, setRelationship] = useState("");
  const [gender, setGender] = useState("남성");
  const [partnerBirth, setPartnerBirth] = useState("");

  //param function
  const cancel = debounce(() => {
    const res = window.confirm("취소하시겠습니까?");
    if (res === true) {
      history.replace("/user/partner");
    }
    else {
      return;
    }
  }, 800);

  const submit = debounce((e) => {
    e.preventDefault();

    if (
      partnerName === "" || 
      partnerDetail === "" ||
      partnerPhoto[0] === undefined || 
      selectionReason === "" ||
      relationship === "" ||
      gender === "" ||
      partnerBirth === ""
    ) {
      alert("모든 항목을 입력해주세요.");
    } else {  //모든 항목을 입력했을 때.
      if (lim_kor.test(partnerName) && lim_al.test(partnerName)) {
        alert("이름은 한글/영문만 입력해주세요.");
        return;
      } else if(lim_Specialc.test(relationship)) {
        alert("관계 란에는 특수문자 입력이 불가능합니다.");
        return;
      } else if(lim_Specialc.test(selectionReason)) {
        alert("선정이유 란에는 특수문자 입력이 불가능합니다.");
        return;
      } else {
        const res = window.confirm("등록하시겠습니까?");
        if (res === true) {
          createPartner();
        }
        return;
      }
    }
  }, 800);

  //button action
  const createPartner = async() => {

    //create formdata
    const formData = new FormData();
    formData.append("stdId", stdId);
    formData.append("partnerName", (partnerName).replaceAll(" ",""));
    formData.append("partnerDetail", partnerDetail);
    formData.append("partnerPhoto", partnerPhoto[0]);
    formData.append("selectionReason", selectionReason);
    formData.append("relationship", relationship);
    formData.append("gender", gender);
    formData.append("partnerBirth", partnerBirth);

    await dispatch(createPartnerHandler(formData))
    .then(async() => { 
      await dispatch(getPartnerBriefInfo(stdId))  //GET PARTNER-LIST
      .then(() => history.replace("/user/partner"));
    });
  };

  useEffect(() => {
    dispatch(
      changeBar(
        "cancel", 
        { title: "파트너 등록", data: null }, 
        "create", 
        cancel, 
        submit, 
        "h250"
      )
    );  //상단바 변경
  }, [cancel, dispatch, submit, partnerName,partnerDetail,partnerPhoto,selectionReason,relationship,gender,partnerBirth]);
  
  return (      
    <form action="/partner/create" className="partner_form" encType="multipart/form-data" method="post" onSubmit={(e) => submit(e)}>
      <Comment sub="P a r t n e r" main={"파트너를\n등록해요!"}/>

      <select className="inputSelect" name="partnerDetail" value={partnerDetail||''} onChange={(e) => setPartnerDetail(e.target.value)}>
        <option>파트너 구분</option>
        <option value="d">장애인</option>
        <option value="p">임산부</option>
        <option value="c">아동</option>
        <option value="e">노인</option>
        <option value="o">일반인</option>
      </select>

      <input className="input" type="text" name="partnerName" value={partnerName||''} onChange={(e) => setPartnerName(e.target.value)} placeholder="파트너 이름"/>

      <span id="form_gender">
        <label htmlFor="man" id={gender==="남성"?"genderChecked":"noneChecked"}>남성</label>
        <input type="radio" className="radio" name="gender" id="man" value="남성" onChange={(e) => setGender(e.target.value)} defaultChecked="true"/>
        <label htmlFor="woman" id={gender==="여성"?"genderChecked":"noneChecked"}>여성</label>
        <input type="radio" className="radio" name="gender" id="woman" value="여성" onChange={(e) => setGender(e.target.value)}/>
      </span>

      <input className="inputDate" type="date" name="partnerBirth" value={partnerBirth||''} onChange={(e) => setPartnerBirth(e.target.value)}></input>

      <input className="input" type="text" name="relationship" value={relationship||''} onChange={(e) => setRelationship(e.target.value)} placeholder="파트너와의 관계"/>

      <div id="reason_wrap">
        <textarea className="inputText" name="selectionReason" placeholder="선정 이유" onChange={(e) => setSelectionReason(e.target.value)} value={selectionReason||''}></textarea>
      </div>

      <label className="btn" htmlFor="partnerPhoto">파트너 사진 등록</label>
      <input className="inputFile" type="file" id="partnerPhoto" accept="image/*" src={partnerPhoto||''} onChange={(e) => setPartnerPhoto(e.target.files)}></input>
    </form>
  );
};

export default PartnerInsert;