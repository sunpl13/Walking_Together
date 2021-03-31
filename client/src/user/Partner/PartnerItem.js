import React from 'react';
import { Link } from 'react-router-dom';

const PartnerItem = ({state}) => {
    return (
        <div>
            <p>{state.partnerName} ({state.partnerDivision}/{state.partnerBirth})</p>
            <Link to='/partner-datail/partnerId'/>
        </div>
    );
};

export default PartnerItem;