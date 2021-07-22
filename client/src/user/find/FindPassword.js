import { React, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { changeBar } from '../../modules/topbar';
import '../../styles/find.scss';
import { debounce } from "lodash";

const FindPassword = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const ref = useRef();
    const [birth, setbirth] = useState("");
    const [stdId, setstdId] = useState("");
    const [Name, setName] = useState("");
    const url = process.env.REACT_APP_SERVER;
    const NameHandler = (e) => {
        setName(e.currentTarget.value);
    };

    const stdIdHandler = (e) => {
        setstdId(e.currentTarget.value);
    };

    const findpasswordHandler = debounce(() => {
        axios.post(`${url}/findpassword`, {
            stdId: stdId,
            name: Name,
            birth: birth
        }).then(res => {
            alert(res.data.message)
            history.replace({
                pathname: '/user1/findresult',
                state: { email: res.data.data.email }
            })
        }).catch(err => {
            if (err.response.data.code === 400) {
                alert(err.response.data.message)
            }
        });
    }, 800);

    const goBack = debounce(() => {
        history.replace('/login');
    }, 800);

    useEffect(() => {
        dispatch(changeBar("back", { title: "비밀번호 찾기", data: null }, "null", goBack, "null", "small"));  //상단바 변경
    }, [dispatch, goBack])

    return (
        <div className="find" >
            <form className="find_input">
                <input type="text" value={stdId} onChange={stdIdHandler} placeholder="학번" />
                <input type="text" value={Name} onChange={NameHandler} placeholder="이름" />
                <input type="text" 
                onChange={(e) => { setbirth(moment(e.target.value).format('YYYYMMDD')) }} 
                ref = {ref}
                placeholder="생년월일" 
                onFocus={() => (ref.current.type = "date")} 
                onBlur={() => (ref.current.type = "text")} />
            </form>
            <button onClick={findpasswordHandler}>임시 비밀번호 발송</button>
        </div>
    );
};

export default FindPassword;