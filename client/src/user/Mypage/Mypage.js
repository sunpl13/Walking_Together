import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

const Mypage = () => {
    const stdId = localStorage.getItem('stdId');
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/mypage?stdId=${stdId}`)
        .then((res) => setUserInfo(res.data))
    }, [])

    return (
        <div>
            <Link to='/update_info'>
                <table>
                    <tr>
                        <td rowspan="4"><img src={userInfo.profilePicture}/></td>
                        <td><p>{userInfo.name}</p></td>
                    </tr>
                    <tr>
                        <td><p>{userInfo.department}</p></td>
                    </tr>
                    <tr>
                        <td><p>{stdId}</p></td>
                    </tr>
                    <tr>
                        <td><p>{userInfo.totalTime}</p></td>
                    </tr>
                </table>
            </Link>

            <Link to='/partner'>파트너 정보</Link>
            <Link to='/certification'>인증서 발급</Link>
            <Link to='/secession'>탈퇴하기</Link>
        </div>
    )
}

export default Mypage;