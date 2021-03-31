import React, { useState } from 'react';
import axios from 'axios';

const UserInfo = () => {
    const [res,setRes] = useState([]);

    //filter state
    const [keyword, setKeyword] = useState("");

    //button
    const search = () => {
        axios.get(`/admin/userinfo?keyword=${keyword}`)
        .then((response) => {
            if(response.data.status===200) {
                setRes(response.data.data)
            }
            else {
                alert("에러가 발생했습니다.")
            }
        })
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
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>이름/학번</td>
                            <td>
                                <input type="text" name="keyword" id="keyword" value={keyword} onChange={changeKeyword}/>
                            </td>

                            <td>
                                <button onClick={search}>조회</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            
            {/* search */}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>이름</th>
                            <th>학번</th>
                            <th>학과</th>
                            <th>이메일</th>
                            <th>생년월일</th>
                            <th>연락처</th>
                        </tr>
                    </thead>
                    <tbody>
                    {   
                        res.map((data, index)=>{
                            return (
                                <tr key={data.stdId}>
                                    <td>{index+1}</td>
                                    <td>{data.stdName}</td>
                                    <td>{data.stdId}</td>
                                    <td>{data.department}</td>
                                    <td>{data.email}</td>
                                    <td>{data.birth}</td>
                                    <td>{data.pNumber}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserInfo;