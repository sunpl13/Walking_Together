import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";
import { CgProfile } from "react-icons/cg";

import {
  changePartnerHandler,
  getPartnerBriefInfo,
} from "../../modules/partner";
import { changeBar } from "../../modules/topbar";
import { lim_kor, lim_al, lim_Specialc } from "../../utils/options";

const PartnerUpdate = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();

  const stdId = useSelector((state) => state.user.authResult.stdId);

  const partner = useSelector((state) => state.partner.partnerDetail); //PARTNER-LIST
  const partnerId = useState(match.params.partnerId);

  const [partnerName, setPartnerName] = useState(partner.partnerName);
  const [partnerDetail, setPartnerDetail] = useState(partner.partnerDetail);
  const [partnerPhoto, setPartnerPhoto] = useState([]);
  const [selectionReason, setSelectionReason] = useState(
    partner.selectionReason
  );
  const [relationship, setRelationship] = useState(partner.relationship);
  const [gender, setGender] = useState(partner.gender);
  const [partnerBirth, setPartnerBirth] = useState(partner.partnerBirth);

  console.log(partner.partnerImage);

  //submit function
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
    } else {
      //모든 항목을 입력했을 때.
      if (lim_kor.test(partnerName) && lim_al.test(partnerName)) {
        alert("이름은 한글/영문만 입력해주세요.");
        return;
      } else if (lim_Specialc.test(relationship)) {
        alert("특수문자는 ~ ! * ? : ; . , 만 가능합니다");
        return;
      } else if (lim_Specialc.test(selectionReason)) {
        alert("특수문자는 ~ ! * ? : ; . , 만 가능합니다");
        return;
      } else {
        const res = window.confirm("등록하시겠습니까?");
        if (res === true) {
          updatePartner();
        }
        return;
      }
    }
  }, 800);

  //param function
  const updatePartner = debounce(async () => {
    //create formdata
    const formData = new FormData();
    formData.append("partnerId", partnerId[0]);
    formData.append("partnerName", partnerName.replaceAll(" ", ""));
    formData.append("partnerDetail", partnerDetail);
    formData.append("partnerPhoto", partnerPhoto[0]);
    formData.append("selectionReason", selectionReason);
    formData.append("relationship", relationship);
    formData.append("gender", gender);
    formData.append("partnerBirth", partnerBirth);

    await dispatch(changePartnerHandler(formData)).then(async () => {
      await dispatch(getPartnerBriefInfo(stdId)).then(() => {
        alert("정보 수정이 완료되었습니다.");
        history.replace("/user/partner");
      });
    });
  }, 800);

  const cancel = debounce(() => {
    const res = window.confirm("취소하시겠습니까?");
    if (res === true) {
      history.replace("/user/partner");
    } else {
      return;
    }
  }, 800);

  useEffect(() => {
    dispatch(
      changeBar(
        "cancel",
        { title: "파트너 수정", data: null },
        "create",
        cancel,
        submit,
        "small"
      )
    ); //상단바 변경
  }, [
    cancel,
    dispatch,
    submit,
    partnerName,
    partnerDetail,
    partnerPhoto,
    selectionReason,
    relationship,
    gender,
    partnerBirth,
  ]);

  return (
    <form
      action="/partner/change"
      className="partner_form"
      id={ref}
      encType="multipart/form-data"
      method="post"
      onSubmit={(e) => submit(e)}
    >
      <div className="mypageInputWrap" id="profileImage">
        <div id="preview">
          {partner.partnerImage !== null ? (
            <img src={partner.partnerImage} alt="프로필 이미지" />
          ) : (
            <CgProfile size={100} color="#9a9a9a" />
          )}
        </div>

        <div id="inputDiv">
          <label id="fileBtn" htmlFor="inputFile">
            새로운 이미지 선택
          </label>
          <input
            className="inputFile"
            type="file"
            accept="image/*"
            src={partnerPhoto || ""}
            onChange={(e) => setPartnerPhoto(e.target.files)}
          ></input>
        </div>
      </div>
      <label>파트너 구분</label>
      <select
        className="inputSelect"
        value={partnerDetail || ""}
        onChange={(e) => setPartnerDetail(e.target.value)}
      >
        <option>선택</option>
        <option value="d">장애인</option>
        <option value="p">임산부</option>
        <option value="c">아동</option>
        <option value="e">노인</option>
        <option value="o">일반인</option>
      </select>
      <br />

      <label>이름</label>
      <input
        className="input"
        type="text"
        value={partnerName || ""}
        onChange={(e) => setPartnerName(e.target.value)}
      />
      <br />

      <label>성별</label>
      <span id="form_gender">
        <label htmlFor="man" id="small_label">
          남성
        </label>
        <input
          type="radio"
          name="gender"
          id="man"
          className="radio"
          value="남성"
          onChange={(e) => setGender(e.target.value)}
          checked={gender === "남성" ? "checked" : ""}
        />
        <label htmlFor="woman" id="small_label">
          여성
        </label>
        <input
          type="radio"
          name="gender"
          id="woman"
          className="radio"
          value="여성"
          onChange={(e) => setGender(e.target.value)}
          checked={gender === "여성" ? "checked" : ""}
        />
      </span>
      <br />

      <label>생년월일</label>
      <input
        className="inputDate"
        type="date"
        value={partnerBirth.replaceAll("/", "-") || ""}
        onChange={(e) => setPartnerBirth(e.target.value)}
      ></input>
      <br />

      <label>관계</label>
      <input
        className="input"
        type="text"
        value={relationship || ""}
        onChange={(e) => setRelationship(e.target.value)}
      />
      <br />

      <div id="reason_wrap">
        <label>선정이유</label>
        <textarea
          className="inputText"
          onChange={(e) => setSelectionReason(e.target.value)}
          value={selectionReason || ""}
        ></textarea>
      </div>
      <br />

      <br />

      <input type="hidden" name="partnerId" value={partnerId} />
    </form>
  );
};

export default PartnerUpdate;
