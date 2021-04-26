import {React, useState, useEffect} from 'react';
import moment from 'moment';
import axios from 'axios';
import { useHistory } from 'react-router';
import {useDispatch} from 'react-redux';

import { changeBar } from '../../modules/topbar';
import '../../styles/find.scss';
import { debounce } from "lodash";

const FindPassword = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [birth, setbirth] = useState("");
    const [stdId, setstdId] = useState("");
    const [Name, setName] = useState("");

    const NameHandler = (e) => {
        setName(e.currentTarget.value);
    };

    const stdIdHandler = (e) => {
        setstdId(e.currentTarget.value);
    };

    const findpasswordHandler = debounce(() => {
        axios.post('/findpassword', {
            stdId : stdId,
            name : Name,
            birth : birth
        })
        .then(res => {if(res.data.status === "200") {
            if(window.confirm(res.data.message)) {
                history.push({
                    pathname : '/findresult',
                    state : {email : res.data.email}
                })
            }
        } else {
            alert(res.data.message);
        }}
            
        )
        .catch(err => err);
    }, 800);

    const goBack = debounce(() => {
        history.goBack();
    }, 800);

    useEffect(() => {
        dispatch(changeBar("back", {title:"비밀번호 찾기", data:null}, "null", goBack, "null", "small"));  //상단바 변경
    }, [dispatch, goBack])

    return (
        <div className = "find" >
            <form className = "find_input">
                <input type = "text" value = {stdId} onChange = {stdIdHandler} placeholder = "학번"/>
                <input type = "text" value = {Name} onChange = {NameHandler} placeholder = "이름"/>
                <input type = "date" onChange = {(e)=> {setbirth(moment(e.target.value).format('YYYYMMDD'))}} placeholder = "생년월일"/>
            </form>
            <button onClick ={findpasswordHandler}>임시 비밀번호 발송</button>
        </div>
    );
};

export default FindPassword;