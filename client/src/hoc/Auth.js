import {React, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {authHandler} from '../modules/user'
import {withRouter} from 'react-router-dom'

//SpecialComponent : 감쌀 컴포넌트
//option : null - 아무나 출입가능한 페이지, true - 로그인한 유저만 출입가능, false - 로그인한 유저는 접속 불가
//adminRoute : 관리자만 접속할 수 있는 옵션
export default (SpecialComponent, option, adminRoute = null) => {

    const AuthCheck = (props) => {
        const dispatch = useDispatch();
        const token = JSON.parse(localStorage.getItem('token'));
        const aaa = useSelector(state => state.user.isAuth);
    
  


        useEffect(() => {
            if(!token) {                        //토큰이 없다면 로그인페이지로 이동
                props.history.push('/login')
            } else {
            dispatch(authHandler(token))        // 있다면 인증
            console.log(aaa)
            }
        }, []);
        
        return <SpecialComponent {...props}/>
    };

    return withRouter(AuthCheck);
}
