import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

const PartnerDetail = () => {
    /*
    상세정보 조회할 파트너정보 전역관리 불러오기

    const { 파트너 } = useSelector(~~~);

    const deletePartner = () => {
        axios.post(~~~삭제)        
    }
    */
    return (
        <div>
            <table>
                <tr>
                    <td>파트너 구분</td>
                    <td>{파트너.파트너구분}</td>
                </tr>
                <tr>
                    <td>성별</td>
                    <td>{파트너.파트너성별}</td>
                </tr>
                <tr>
                    <td>생년월일</td>
                    <td>{파트너.파트너생년월일}</td>
                </tr>
                <tr>
                    <td>관계</td>
                    <td>{파트너.파트너관계}</td>
                </tr>
                <tr>
                    <td>선정이유</td>
                    <td>{파트너.파트너선정이유}</td>
                </tr>
                <tr>
                    <td>파트너 사진</td>
                    <td>{파트너.파트너사진}</td>
                </tr>
            </table>

            <Link to='/partner-action'>수정</Link>
            <button onClick={() => deletePartner()}>삭제</button>
        </div>
    );
};

export default PartnerDetail;