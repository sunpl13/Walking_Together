import {React,useState} from 'react'
import moment from 'moment'
import axios from 'axios'
import { useHistory } from 'react-router'

function FindPassword() {

    const history = useHistory();

    const style = {
        display : "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
    }

    const [birth, setbirth] = useState("");
    const [stdId, setstdId] = useState("");
    const [Name, setName] = useState("");

    const NameHandler = (e) => {
        setName(e.currentTarget.value)
    };

    const stdIdHandler = (e) => {
        setstdId(e.currentTarget.value)
    };


 

    const findpasswordHandler = () => {
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
            alert(res.data.message)
        }}
            
        )
        .catch(err => err)
    }

    /*
    if(res.data.status == 200) {
        if(window.confirm(res.data.message)) {
            history.push({
                pathname : '/findresult',
                state : {email : res.data.email}
            })
        }
    } else {
        alert(res.data.message)
    }
*/
    return (
    
        <div style = {style}>
        <form>
            
        <label>학번</label>
            <input type = "text" value = {stdId} onChange = {stdIdHandler}/>

            <label>이름</label>
            <input type = "text" value = {Name} onChange = {NameHandler}/>
            
            <label>생년월일</label>
            <input type = "date" onChange = {(e)=> {setbirth(moment(e.target.value).format('YYYYMMDD'))}}/>
             </form>
             <button onClick ={findpasswordHandler}>임시 비밀번호 발송</button>
        </div>
    )
}

export default FindPassword
