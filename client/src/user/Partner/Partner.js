import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PartnerItem from '../Partner/PartnerItem';
import TopBar from '../../utils/TopBar';

import '../../styles/partner.scss';

const Partner = () => {
    const history = useHistory();
    const partner = useSelector(state => state.partner.briefPartner);  //PARTNER-LIST

    const [timer, setTimer] = useState(0); // 디바운싱 타이머

    //param function
    function goBack() {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                history.push('/user/mypage');
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

    function goCreatePartner() {
        // 디바운싱
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            try {
                history.push(`/user/partner-insert`);
            } catch (e) {
                console.error('error', e);
            }
        }, 800);

        setTimer(newTimer);
    };

    return (
        <div>
            <header>
                <TopBar
                    left="back" 
                    center={{title:"파트너", data:null}} 
                    right="plus" 
                    lfunc={goBack}
                    rfunc={goCreatePartner}
                    size="small"/>
            </header>
            <table id="partner_table">
                <tbody>
                    { partner.length!==0 ?
                    partner.map((res) => {
                        return (
                            <PartnerItem state={res} key={res.partnerId}/>  //PARTNER-INFO-ITEM
                        )
                    })
                    : "파트너 정보가 없습니다."
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Partner;