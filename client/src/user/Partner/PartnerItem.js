import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { checkPartnerDetail } from "../../utils/Function";
import { getPartnerDetailInfo } from '../../modules/partner';

const PartnerItem = ({state}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [detail, setDetail] = useState("");

    useEffect(() => {
        setDetail(checkPartnerDetail(state.partnerDetail))
    }, [state])

    const itemClick = async() => {
        await dispatch(getPartnerDetailInfo(state.partnerId))
        .then(() => {
            history.push(`/partner-datail/${state.partnerId}`)
        })
    }

    return (
        <div>
                <p onClick={itemClick}>
                    {state.partnerName} ({detail}/{state.partnerBirth})
                </p>
        </div>
    );
};

export default PartnerItem;