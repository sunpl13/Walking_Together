import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PartnerItem = ({state}) => {
    const [detail, setDetail] = useState("");

    useEffect(() => {
        if(state.partnerDetail==="e") {
            setDetail("노약자")
        } else if(state.partnerDetail==="o") {
            setDetail("일반인")
        } else if(state.partnerDetail==="d") {
            setDetail("장애인")
        } else if(state.partnerDetail==="c") {
            setDetail("아동")
        } else if(state.partnerDetail==="f") {
            setDetail("임산부")
        }
    }, [])

    return (
        <div>
            <Link to={`/partner-datail/${state.partnerId}`}>
                <p>{state.partnerName} ({detail}/{state.partnerBirth})</p>
            </Link>
        </div>
    );
};

export default PartnerItem;