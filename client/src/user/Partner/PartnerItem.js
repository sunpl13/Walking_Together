import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";

import { checkPartnerDetail } from "../../utils/Function";
import { getPartnerDetailInfo } from "../../modules/partner";

const PartnerItem = ({state}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [detail, setDetail] = useState("");

  useEffect(() => {
    setDetail(checkPartnerDetail(state.partnerDetail));
  }, [state]);

  const itemClick = debounce(async() => {
    await dispatch(getPartnerDetailInfo(state.partnerId))
    .then(() => {
      history.replace(`/user/partner-datail/${state.partnerId}`);
    });
  }, 800);

  return (
    <span id="partner_item" onClick={itemClick}>
      <p className="name">{state.partnerName}</p>
      <p className="detail">{detail}</p>
      <p className="birth">{(state.partnerBirth).replaceAll("/","-")}</p>
    </span>
  );
};

export default PartnerItem;