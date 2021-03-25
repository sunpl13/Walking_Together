import {React, useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux'
import {authHandler} from '../modules/user'
import {useHistory, withRouter} from 'react-router-dom'

//SpecialComponent : 감쌀 컴포넌트
//option : null - 아무나 출입가능한 페이지, true - 로그인한 유저만 출입가능, false - 로그인한 유저는 접속 불가
//adminRoute : 관리자만 접속할 수 있는 옵션
export default (SpecialComponent, option, adminRoute = null) => {

    const AuthCheck = (props) => {
        const dispatch = useDispatch();
        const token = JSON.parse(localStorage.getItem('token'));
        const {pending, error} = useSelector(state => ({
            pending : state.user.pending,
            error : state.user.error
        }),
        shallowEqual
        )
        const history = useHistory();   

        console.log(pending)
  


        useEffect(() => {
            dispatch(authHandler(token, option, adminRoute, history))        // 페이지간 인증
        }, []);


        if(pending) return <div>로딩중...</div>;
        if(error) return <div>에러발생!</div>;
        return <SpecialComponent {...props}/>
    };


    
    return withRouter(AuthCheck);
}
