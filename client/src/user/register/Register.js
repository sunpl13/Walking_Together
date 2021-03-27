import axios from 'axios';
import {React,useState} from 'react'
import {useHistory} from 'react-router-dom'

function Register() {

    const history = useHistory();
    
    // const [disabled, setDisabled] = useState('disabled');
    const [agree1, setAgree1] = useState(false);                                //회원정보 동의
    const [agree2, setAgree2] = useState(false);                                //개인정보 수집 및 이용동의
    const [agree3, setAgree3] = useState(false);                                //위치정보 동의
    const [total, settotal] = useState(false);                                   //전체 동의
    const [email, setemail] = useState("");

    // const buttonState = useCallback(() => {
    //   if((agree1===true)&&(agree2===true)&&(agree3===true)){
    //     settotal(true);
    //     setDisabled('');
    //   }
    //   else {
    //     setDisabled('disabled');
    //   }
    // },[agree1,agree2,agree3,total]);

 
     
    // useEffect(() => {
    //   buttonState();
    // }, [buttonState])

    const totalchange = () => {
        if(total ===true) {                                                         //전체동의가 true라면 다시 클릭 했을때 전부 unchecked
            settotal(!total);
            setAgree1(!agree1);
            setAgree2(!agree2);
            setAgree3(!agree3);
        } else{                                                                     //그외(하나만 체크되 있거나 아무것도 없다면) 전부 checked로 만듬
        settotal(true);
        setAgree1(true);
        setAgree2(true);
        setAgree3(true);
        // setDisabled('');
    }
  }

    const clickFunction = () => {
      axios.get(`/signup/authNum?email=${email}`)
      .then(res => {
        if(window.confirm("인증번호 전송이 완료되었습니다")){
          history.push({
            pathname : 'registerauth',
            state : {state : res.data,
              email : email
            }
          })
         
        }
      })
      .catch(err => {console.log(err)})
   }

    const EmailHandler = (e) => {
      setemail(e.currentTarget.value)
    }
  
    const changeState1 = () => {
      setAgree1(!agree1);
    }
  
    const changeState2 = () => {
      setAgree2(!agree2);
    }
    
    const changeState3 = () => {
      setAgree3(!agree3);
    }
  

 
  


    return (
        <div>
            <div>
                <div>
                    <input type="checkbox" name="total_agree" value="total_agree" checked={total} onChange={totalchange} />
                    <label>전체 동의</label>
                </div>
                <div>
                <input type="checkbox" name="agree1" value="agree1" checked={agree1} onChange={changeState1} />
                    <label>회원 약관</label>
                    <span>전체보기</span>
                </div>
                <div>
                <input type="checkbox" name="agree2" value="agree2" checked={agree2} onChange={changeState2} />
                    <label>개인정보 수집 및 이용</label>
                    <span>전체보기</span>
                </div>
                <div>
                <input type="checkbox" name="agree3" value="agree3" checked={agree3} onChange={changeState3} />
                    <label>위치 정보 이용 동의</label>
                    <span>전체보기</span>
                </div>
            </div>
            <br/>
            입력해주신 이메일 정보는 회원가입 시 이메일로 설정됩니다.
            <br/>
            <div>
              <label>이메일</label>
            <input type = "email" onChange = {EmailHandler}/>
            <button name="button" onClick = {clickFunction}>인증코드 발송</button>
            </div>
        </div>
    )
}

export default Register
