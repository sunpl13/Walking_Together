import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkPartnerDetail } from "../../utils/Function";
import { getPartnerDetailInfo } from '../../modules/partner';

import { IoIosArrowForward } from "react-icons/io";

const PartnerItem = ({state}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [timer, setTimer] = useState(0); // 디바운싱 타이머

    const [detail, setDetail] = useState("");

    useEffect(() => {
        setDetail(checkPartnerDetail(state.partnerDetail));
    }, [state]);

    const itemClick = async() => {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                await dispatch(getPartnerDetailInfo(state.partnerId))
                .then(() => {
                    history.push(`/user/partner-datail/${state.partnerId}`);
                });
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

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