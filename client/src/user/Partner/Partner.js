import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { debounce } from "lodash";

import PartnerItem from '../Partner/PartnerItem';
import { changeBar } from '../../modules/topbar';

import '../../styles/partner.scss';

const Partner = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const partner = useSelector(state => state.partner.briefPartner.partnerList);  //PARTNER-LIST

    //param function
    const goBack = debounce(() => {
        history.push('/user/mypage');
    }, 800);

    const goCreatePartner = debounce(() => {
        history.push(`/user/partner-insert`);
    }, 800);

    useEffect(() => {
        dispatch(changeBar("back", {title:"파트너",data:null}, "plus", goBack, goCreatePartner, "small"));  //상단바 변경
    },[dispatch, goBack, goCreatePartner]);

    return (
        <table id="partner_table">
            <tbody>
                { partner !== undefined ?
                partner.map((res) => {
                    return (
                        <PartnerItem state={res} key={res.partnerId}/>  //PARTNER-INFO-ITEM
                    )
                })
                : 
                <tr>
                    <td>파트너 정보가 없습니다.</td>
                </tr>
                }
            </tbody>
        </table>
    );
};

export default Partner;