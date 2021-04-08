import React from 'react';
import { useSelector } from 'react-redux';
import PartnerItem from '../Partner/PartnerItem';
import TopBar from '../../utils/TopBar';

const Partner = ({history}) => {
    const partner = useSelector(state => state.partner.briefPartner)  //PARTNER-LIST

    //param function
    function goBack() {
        history.push('/mypage')
    }

    function goCreatePartner() {
        history.push(`/partner-insert`)
    }

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