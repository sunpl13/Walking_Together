import React from 'react';
import department from '../../utils/options';

const UpdateInfo = () => {
    const save = () => {
        axios.post(~~~) //업데이트된 비밀번호, 이미지 넘김
        .then(() => {
            alert('완료');
            //mypage로 이동
        })
    }
    return (
        <div>
            <h1>학과 변경</h1>
            <img src={기존이미지} alt="등록된 이미지가 없습니다" />

            <h1>프로필 사진 변경</h1>
            <img src={기존이미지} alt="등록된 이미지가 없습니다" />
            <input type="file"></input>

            <h1>비밀번호 변경</h1>
            <input type="password" id="password" name="password"></input>
            <input type="password" id="passwordCheck" name="passwordCheck"></input>

            <button onClick={save}>저장</button>
        </div>
    );
};

export default UpdateInfo;