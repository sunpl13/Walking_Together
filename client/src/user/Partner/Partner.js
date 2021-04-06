import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPartnerBriefInfo } from '../../modules/partner';
import PartnerItem from '../Partner/PartnerItem';
import TopBar from '../../utils/TopBar';

const Partner = ({history}) => {
    const dispatch = useDispatch()

    const partner = useSelector(state => state.partner.briefPartner)  //PARTNER-LIST

    //param function
    function goBack() {
        history.push('/mypage')
    }

    function goCreatePartner() {
        history.push(`/partner-action/create`)
    }

    //useEffect
    useEffect(() => {
        dispatch(getPartnerBriefInfo((localStorage.getItem('user_info')).replace(/"/g, "")))  //GET PARTNER-LIST
    }, [])

    return (
        <div>
            <TopBar 
            left="back" 
            center={{title:"파트너", data:null}} 
            right="plus" 
            lfunc={goBack}
            rfunc={goCreatePartner}
            size="small"/>
            
            { partner!=null ?
            partner.map((res) => {
                return (
                    <PartnerItem state={res} key={res.partnerId}/>  //PARTNER-INFO-ITEM
                )
            })
            : "파트너 정보가 없습니다."
            }
        </div>
    );
};

export default Partner;