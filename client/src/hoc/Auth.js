import {React, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import {authHandler} from '../modules/user'
import {useHistory, withRouter} from 'react-router-dom'

//SpecialComponent : 감쌀 컴포넌트
//option : null - 아무나 출입가능한 페이지, true - 로그인한 유저만 출입가능, false - 로그인한 유저는 접속 불가
//adminRoute : 관리자만 접속할 수 있는 옵션
export default function Auth (SpecialComponent, option, adminRoute = null) {

    const AuthCheck = (props) => {
        const [pending, setpending] = useState(true)
        const dispatch = useDispatch();
        const history = useHistory();   
  


        useEffect(() => {
            dispatch(authHandler(option, adminRoute, history))        // 페이지간 인증
            .then(() => setpending(false))

        }, [dispatch,history]);


        if(pending) return <div>.</div>
        return <SpecialComponent {...props}/>
       
        
 
        
    };


    
    return withRouter(AuthCheck);
}