import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPartnerBriefInfo } from '../../modules/partner';
import PartnerItem from '../Partner/PartnerItem';
import TopBar from '../../utils/TopBar';

const Partner = () => {
    const dispatch = useDispatch()

    const partner = useSelector(state => state.partner.briefPartner)  //PARTNER-LIST

    useEffect(() => {
        const stdId = (localStorage.getItem('user_info')).replace(/\"/g, "");  //USER-ID
        dispatch(getPartnerBriefInfo(stdId))  //GET PARTNER-LIST
    }, [stdId])

    return (
        <div>
            <TopBar left="back" center={{title:"파트너", data:null}} right="plus" size="small"/>
            {
            partner.map((res) => {
                return (
                    <PartnerItem state={res} />  //PARTNER-INFO-ITEM
                )
            })
            }
        </div>
    );
};

export default Partner;