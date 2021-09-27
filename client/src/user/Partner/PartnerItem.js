import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { debounce } from "lodash";

import { checkPartnerDetail } from "../../utils/Function";
import { getPartnerDetailInfo } from "../../modules/partner";

import { IoIosArrowForward } from "react-icons/io";

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
    <tr id="partner_item" onClick={itemClick}>
      <td className="tdName">
        {state.partnerName}
      </td>
      <td className="tdInfo">
        ({detail}/{(state.partnerBirth).replaceAll("/","-")})
      </td>
      <td className="tdGo">
        <IoIosArrowForward size="18"/>
      </td>
    </tr>
  );
};

export default PartnerItem;