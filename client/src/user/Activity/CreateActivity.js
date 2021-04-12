import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPartner } from '../../modules/activity';

const CreateActivity = ({match}) => {
    const res = useSelector(state => state.activityReducer.partner.partners);
    console.log(res);
 
    const list = res.map((item, index) => {
        return (<option key = {index}>{item.partnerName}</option>)
    })

    return (
        <div>
            <form>
                <table>
                    <tbody>
                    <tr>
                        <td>활동일</td>
                        <td><input type="date" /></td>
                    </tr>
                    <tr>
                        <td>파트너</td>
                         <td>
                            <select>
                        {list}
                            </select>
                        </td> 
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default CreateActivity;