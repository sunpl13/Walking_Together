import React, { useState } from 'react';
import { useSelector } from "react-redux";

const PartnerAction = ({type}) => {
    /*

    const [파트너,set파트너] = useState({});

    useEffect(() => {
        if (type=="update"){
            const { 전역파트너 } = useSelector(~~~);  //상세정보 조회할 전역관리 파트너정보 불러오기
            set파트너(전역파트너);
        }
        else {

        }
    },[])

    const 등록 = () => {
        set파트너(~~~);
        axios.post(~~~~~);
    }
    */
    return (
        <div>
            <table>
                <tr>
                    <td>파트너 구분</td>
                    <td>
                        <select value={파트너.파트너구분}>
                            <option value="장애인">장애인</option>
                            <option value="임산부">임산부</option>
                            <option value="아동">아동</option>
                            <option value="노인">노인</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>이름</td>
                    <td>
                        <input type="text" value={파트너.파트너이름} />
                    </td>
                </tr>
                <tr>
                    <td>성별</td>
                    <td>
                        <input type="radio" name="성별" id="성별1" value="남" checked={파트너.파트너성별=="남"? "checked" : ""}/>
                        <label for="성별1">남성</label>
                        <input type="radio" name="성별" id="성별2" value="여" checked={파트너.파트너성별=="여"? "checked" : ""}/>
                        <label for="성별2">여성</label>
                            
                            {파트너.파트너성별}
                    </td>
                </tr>
                <tr>
                    <td>생년월일</td>
                    <td>
                        <input type="date" value={파트너.파트너생년월일}></input>
                    </td>
                </tr>
                <tr>
                    <td>관계</td>
                    <td>
                        <input type="text" value={파트너.파트너관계} />
                    </td>
                </tr>
                <tr>
                    <td>선정이유</td>
                    <td>
                        <textarea>{파트너.파트너선정이유}</textarea>
                    </td>
                </tr>
                <tr>
                    <td>파트너 사진</td>
                    <td>
                        <img src={파트너.파트너사진} />
                        <input type="image" src={파트너.파트너사진}>사진 변경</input>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default PartnerAction;