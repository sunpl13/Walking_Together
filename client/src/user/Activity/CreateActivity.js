import React, { useState, useEffect } from 'react';

import { getPartner } from '../../../modules/activity';

const CreateActivity = ({match}) => {

    const [partners,setPartners] = useState({});

    useEffect(() => {
        const res = dispatch(getPartner(match.params.stdId));
        setPartners(res);
    },[])

    return (
        <div>
            <form>
                <table>
                    <tr>
                        <td>활동일</td>
                        <td><input type="date" /></td>
                    </tr>
                    <tr>
                        <td>파트너</td>
                        <td>
                            <select>
                                {partners.map((partner) => {
                                    return (
                                        <option value={partner.partnerId}>{partner.partnerName}({partner.division}/{partner.partnerBirth})</option>
                                    )
                                })}
                            </select>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
};

export default CreateActivity;