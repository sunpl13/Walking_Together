import axios from 'axios';
import {React,useState} from 'react';
import {useHistory} from 'react-router-dom';
import {FaAngleRight} from 'react-icons/fa';
import '../../styles/register.scss';
import TopBar from '../../utils/TopBar';

function Register() {

    const history = useHistory();

    const [timer, setTimer] = useState(0); // 디바운싱 타이머
    
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
      // 디바운싱
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(async () => {
        try {
          axios.get(`/signup/authNum?email=${email}`)
          .then(res => {
              if(res.data.status === 404) {
                alert(res.data.message);
              } else if(res.data.status === 400) {
                alert(res.data.message);
              } else if(res.data.status === 200) {
                if(window.confirm("인증번호 전송이 완료되었습니다")){
                  history.push({
                    pathname : 'registerauth',
                    state : {state : res.data,
                      email : email
                    }
                  });
                }
              }
          })
          .catch(err => {console.log(err)})
        } catch (e) {
            console.error('error', e);
        }
      }, 800);

      setTimer(newTimer);
   };

    const EmailHandler = (e) => {
      setemail(e.currentTarget.value);
    };

    function goBack() {
      // 디바운싱
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(async () => {
        try {
          history.goBack();
        } catch (e) {
            console.error('error', e);
        }
      }, 800);

      setTimer(newTimer);
    };


    return (
        <div className = "register">
          <header>
            <TopBar
            left="back" 
            center={{title:"회원가입", data:null}} 
            right="null" 
            lfunc={goBack}
            rfunc={null}
            size="small"/>
          </header>
          <div className = "register_coment">
            Walking Together<br/>
            서비스 약관에 동의해 주세요.
          </div>
            <div className = "check_container">
                <div className = "total">
                    <input type="checkbox" name="total_agree" value="total_agree" checked={isAgreedAll} onChange={handleCheckAll} />
                    <label>전체 동의</label>
                    <p>전체동의는 필수 및 선택 정보에 대한 동의도 포함 되어 있으며, 개별적으로도 동의를 선택하실 수 있습니다.
                      선택항복에 대한 동의를 거부하시는 경우에도 서비스는 이용이 가능합니다.</p>
                </div>
                <div>
                  <div>
                    <input type="checkbox" name="agree1" value="agree1" checked={agree1} onChange={(e) => setAgree1(e.target.checked)} />
                        <label>회원 약관</label>
                        <span><FaAngleRight onClick = {() => {history.push('/memberstipulation')}}/></span>
                  </div>
                  <div>
                    <input type="checkbox" name="agree2" value="agree2" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} />
                        <label>개인정보 수집 및 이용</label>
                        <span><FaAngleRight onClick = {() => {history.push('/infostipulation')}}/></span>
                  </div>
                  <div>
                    <input type="checkbox" name="agree3" value="agree3" checked={agree3} onChange={(e) => setAgree3(e.target.checked)} />
                        <label>위치 정보 이용 동의</label>
                        <span><FaAngleRight onClick = {() => {history.push('/locationstipulation')}}/></span>
                  </div>
                </div>
            </div>
            <div className = "email_container">
            <input type = "email" onChange = {EmailHandler} placeholder = "이메일"/>
            <button name="button" disabled = {isDisabled} onClick = {clickFunction}>인증코드 발송</button>
            <p>입력해주신 이메일 정보는 회원가입 시 이메일로 설정됩니다.</p>
            </div>
 
        </div>
    );
};

export default Register;