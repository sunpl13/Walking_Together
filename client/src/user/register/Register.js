import axios from 'axios';
import {React,useState} from 'react'
import {useHistory} from 'react-router-dom'

function Register() {

    const history = useHistory();
    
    const [agree1, setAgree1] = useState(false);                                //회원정보 동의
    const [agree2, setAgree2] = useState(false);                                //개인정보 수집 및 이용동의
    const [agree3, setAgree3] = useState(false);                                //위치정보 동의
    const [email, setemail] = useState("");
    const isAgreedAll = agree1 && agree2 && agree3;

    const handleCheckAll = (e) => {
      setAgree1(e.target.checked);
      setAgree2(e.target.checked);
      setAgree3(e.target.checked);
    };


    // placeholder so that you can implement your own validation
  const emailLooksValid = email.length > 5;
  const isDisabled = !isAgreedAll || !emailLooksValid;


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


    return (
        <div>
            <div>
                <div>
                    <input type="checkbox" name="total_agree" value="total_agree" checked={isAgreedAll} onChange={handleCheckAll} />
                    <label>전체 동의</label>
                </div>
                <div>
                <input type="checkbox" name="agree1" value="agree1" checked={agree1} onChange={(e) => setAgree1(e.target.checked)} />
                    <label>회원 약관</label>
                    <span>전체보기</span>
                </div>
                <div>
                <input type="checkbox" name="agree2" value="agree2" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} />
                    <label>개인정보 수집 및 이용</label>
                    <span>전체보기</span>
                </div>
                <div>
                <input type="checkbox" name="agree3" value="agree3" checked={agree3} onChange={(e) => setAgree3(e.target.checked)} />
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
            <button name="button" name = "button" disabled = {isDisabled} onClick = {clickFunction}>인증코드 발송</button>
            </div>
        </div>
    )
}

export default Register
