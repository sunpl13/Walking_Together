import {React,useState} from 'react'
import moment from 'moment'
import axios from 'axios'
import { useHistory } from 'react-router'
import TopBar from '../../utils/TopBar'
import '../../styles/find.scss'

function FindPassword() {

    const history = useHistory();


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
    
        <div className = "find">
            <header>
                <TopBar
                    left="null" 
                    center={{title:"회원가입", data:null}} 
                    right="null" 
                    lfunc={null}
                    rfunc={null}
                    size="small"/>
            </header>
        <form className = "find_input">
            
            <input type = "text" value = {stdId} onChange = {stdIdHandler} placeholder = "학번"/>

            <input type = "text" value = {Name} onChange = {NameHandler} placeholder = "이름"/>
            
            <input type = "date" onChange = {(e)=> {setbirth(moment(e.target.value).format('YYYYMMDD'))}} placeholder = "생년월일"/>

             </form>
             <button onClick ={findpasswordHandler}>임시 비밀번호 발송</button>
        </div>
    )
}

export default FindPassword
