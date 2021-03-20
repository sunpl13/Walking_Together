import React, { useState } from 'react';
import axios from 'axios';

const UserInfo = () => {
    const [res,setRes] = useState([]);

    //filter state
    const [keyword, setKeyword] = useState("");

    //button
    const search = () => {
        axios.get(`${process.env.REACT_APP_URL}/admin/userInfo?keyword=${keyword}`)
        .then((res) => setRes(res.data))
    }

    //change action
    const changeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    return (
        <div>

            {/* filter */}
            <div>
                <table>
                    <tr>
                        <td>이름/학번</td>
                        <td>
                            <input type="text" name="keyword" id="keyword" value={keyword} onChange={changeKeyword}/>
                        </td>

                        <td>
                            <button onClick={search}>조회</button>
                        </td>
                    </tr>
                </table>
            </div>
            
            
            {/* search */}
            <div>
                <table>
                    <tr>
                        <th>no</th>
                        <th>이름</th>
                        <th>학번</th>
                        <th>학과</th>
                        <th>이메일</th>
                        <th>생년월일</th>
                        <th>연락처</th>
                    </tr>
                    {
                        res.map((data, index)=>{
                            <tr key={data.stdId}>
                                <td>{index}</td>
                                <td>{data.stdName}</td>
                                <td>{data.stdId}</td>
                                <td>{data.department}</td>
                                <td>{data.email}</td>
                                <td>{data.stdBirth}</td>
                                <td>{data.pNumber}</td>
                            </tr>
                        })
                    }
                </table>
            </div>
        </div>
    );
};

export default UserInfo;